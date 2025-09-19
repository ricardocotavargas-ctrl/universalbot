const { Pool } = require('pg');

class HealthcareService {
    constructor(config) {
        this.config = config;
        this.db = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
    }

    async handleAppointment(customerId, message, entities) {
        try {
            const appointmentInfo = this.extractAppointmentInfo(message);
            
            if (!appointmentInfo.service_type) {
                return "¿Para qué servicio te gustaría agendar la cita? Tenemos: consulta general, chequeo, especialista, etc.";
            }

            const availableSlots = await this.checkAvailability(appointmentInfo);
            
            if (availableSlots.length === 0) {
                return "No hay disponibilidad para esa fecha. ¿Te gustaría elegir otra fecha?";
            }

            return this.formatAvailabilityResponse(availableSlots, appointmentInfo.service_type);
        } catch (error) {
            console.error('Error handling appointment:', error);
            return "Lo siento, estoy teniendo problemas para agendar tu cita. Por favor, intenta nuevamente.";
        }
    }

    async handlePrescription(customerId, message, entities) {
        try {
            const patientId = this.extractPatientId(message);
            if (!patientId) {
                return "Para consultar tu receta, necesito tu número de identificación o número de paciente.";
            }

            const prescription = await this.getPrescriptionInfo(patientId);
            if (!prescription) {
                return "No encontré recetas activas para ese número de identificación.";
            }

            return this.formatPrescriptionResponse(prescription);
        } catch (error) {
            console.error('Error handling prescription:', error);
            return "Lo siento, estoy teniendo problemas para consultar tu receta. Por favor, intenta nuevamente.";
        }
    }

    async handleEmergency(customerId, message, entities) {
        const emergencyNumber = this.config.emergency_number || "911";
        return `⚠️ Para emergencias médicas inmediatas, por favor llama al ${emergencyNumber} directamente. ¿Necesitas ayuda para contactar emergencias?`;
    }

    async checkAvailability(appointmentInfo) {
        const { date, service_type } = appointmentInfo;
        
        const result = await this.db.query(
            `SELECT * FROM appointments 
             WHERE date = $1 AND service_type = $2 AND status = 'available'
             ORDER BY start_time`,
            [date, service_type]
        );

        return result.rows;
    }

    async getPrescriptionInfo(patientId) {
        const result = await this.db.query(
            `SELECT * FROM prescriptions 
             WHERE patient_id = $1 AND expiration_date > NOW()
             ORDER BY created_at DESC LIMIT 1`,
            [patientId]
        );
        return result.rows[0];
    }

    extractAppointmentInfo(message) {
        return {
            date: this.extractDate(message),
            service_type: this.extractServiceType(message),
            urgency: this.extractUrgency(message)
        };
    }

    extractDate(message) {
        const dateMatch = message.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
        return dateMatch ? new Date(dateMatch[3], dateMatch[2] - 1, dateMatch[1]) : new Date();
    }

    extractServiceType(message) {
        if (/(consulta|general|médico)/i.test(message)) return "consulta_general";
        if (/(chequeo|examen|análisis)/i.test(message)) return "chequeo";
        if (/(especialista|cardiólogo|pediatra)/i.test(message)) return "especialista";
        return null;
    }

    extractPatientId(message) {
        const idMatch = message.match(/(cedula|id|identificación|número)\s*[:]?\s*(\d+)/i);
        return idMatch ? idMatch[2] : null;
    }

    formatAvailabilityResponse(slots, serviceType) {
        let response = `Horarios disponibles para ${serviceType}:\n\n`;
        
        slots.forEach((slot, index) => {
            response += `${index + 1}. ${slot.start_time} - ${slot.end_time}\n`;
        });

        response += "\n¿Cuál horario prefieres? Responde con el número.";
        return response;
    }

    formatPrescriptionResponse(prescription) {
        return `💊 Receta Médica\n\nMedicamento: ${prescription.medication_name}\nDosis: ${prescription.dosage}\nCantidad: ${prescription.quantity}\nInstrucciones: ${prescription.instructions}\nVálida hasta: ${new Date(prescription.expiration_date).toLocaleDateString()}`;
    }
}

module.exports = HealthcareService;