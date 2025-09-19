const axios = require('axios');

// Simula un mensaje de WhatsApp entrante
const simulateIncomingMessage = async (fromNumber, messageBody) => {
    try {
        console.log(`📤 Enviando mensaje de prueba de ${fromNumber}: "${messageBody}"`);

        // Simula el formato de webhook de Twilio
        const payload = new URLSearchParams();
        payload.append('From', fromNumber);
        payload.append('Body', messageBody);
        payload.append('To', 'whatsapp:+1234567890'); // Tu número de Twilio (fake para prueba)

        // Configuración para axios
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };

        // ¡ESTA URL DEBE SER LA DE TU SERVIDOR LOCAL!
        // Si usas localhost:3000, sería:
        const localWebhookUrl = 'http://localhost:3000/webhook/whatsapp';

        // Envía la solicitud POST a tu propio webhook
        const response = await axios.post(localWebhookUrl, payload, config);

        console.log('✅ Mensaje de prueba enviado. Respuesta del servidor:', response.status, response.statusText);
        console.log('📋 Deberías ver el procesamiento del mensaje en los logs de tu servidor.');

    } catch (error) {
        console.error('❌ Error enviando mensaje de prueba:', error.message);
        if (error.response) {
            console.error('Detalles del error:', error.response.status, error.response.data);
        }
    }
};

// --- EJECUCIÓN ---
// Lee los argumentos de la línea de comandos
const fromNumber = process.argv[2] || 'whatsapp:+584123456789'; // Número por defecto
const message = process.argv[3] || 'Hola, quiero comprar zapatos negros'; // Mensaje por defecto

// Ejecuta la simulación
simulateIncomingMessage(fromNumber, message);