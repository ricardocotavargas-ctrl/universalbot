const Business = require('../models/Business');
const Customer = require('../models/Customer');

class WhatsAppService {
  constructor(botService) {
    this.botService = botService;
    this.provider = process.env.WHATSAPP_PROVIDER || 'none';
    this.initializeProvider();
  }

  initializeProvider() {
    if (this.provider === 'twilio' && process.env.TWILIO_ACCOUNT_SID) {
      try {
        const twilio = require('twilio');
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        console.log('✅ Twilio client initialized for WhatsApp');
      } catch (error) {
        console.warn('⚠️ Twilio not available, using mock mode:', error.message);
        this.provider = 'mock';
      }
    } else {
      console.log('ℹ️ WhatsApp running in mock mode');
      this.provider = 'mock';
    }
  }

  async handleIncomingMessage(req, res) {
    try {
      const { From, Body } = req.body;
      console.log(`📨 WhatsApp message from ${From}: "${Body}"`);

      // 1. SIMULAR tenant para pruebas - ¡ESTO ES TEMPORAL!
      // En producción, esto vendría del middleware basado en el número de WhatsApp
      req.tenant = { 
        id: 1, 
        business_name: 'Business de Prueba',
        industry: 'ecommerce'
      };
      console.log('⚠️  Usando tenant de prueba para desarrollo:', req.tenant.id);

      // 2. Get first active business for this tenant
      const businessModel = new Business();
      const businesses = await businessModel.findByTenant(req.tenant.id);
      
      if (!businesses || businesses.length === 0) {
        console.warn(`No businesses found for tenant ${req.tenant.id}`);
        return res.status(200).send('OK');
      }

      const business = businesses[0];
      console.log(`🏢 Business identificado: ${business.name} (ID: ${business.id})
  `);

      // 3. Get or create customer
      const customerModel = new Customer();
      let customer = await customerModel.findByPhone(business.id, From);
      
      if (!customer) {
        customer = await customerModel.create({
          business_id: business.id,
          phone_number: From,
          platform: 'whatsapp'
        });
        console.log(`👤 New customer created: ${customer.id}`);
      }

      // 4. Process message with bot service
      if (this.botService && this.botService.processMessage) {
        const botResponse = await this.botService.processMessage(
          business.id,
          customer.id,
          Body,
          'whatsapp'
        );

        // 5. Send response if available
        if (botResponse && botResponse.text) {
          await this.sendMessage(business.id, From, botResponse.text);
        }
      } else {
        console.warn('Bot service not available for message processing');
      }

      res.status(200).send('OK');

    } catch (error) {
      console.error('❌ Error handling incoming WhatsApp message:', error);
      res.status(500).send('Error processing message');
    }
  }

  async sendMessage(businessId, to, message) {
    try {
      if (this.provider === 'mock') {
        console.log(`📤 [MOCK] WhatsApp to ${to}: ${message.substring(0, 50)}...`);
        return { status: 'sent', sid: 'mock_' + Date.now() };
      }

      const messageData = {
        body: message,
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: to
      };

      const result = await this.client.messages.create(messageData);
      console.log(`✅ WhatsApp message sent: ${result.sid}`);
      
      return result;

    } catch (error) {
      console.error('❌ Error sending WhatsApp message:', error);
      throw error;
    }
  }

  async sendTemplateMessage(businessId, to, templateName, parameters) {
    if (this.provider === 'mock') {
      console.log(`📨 [MOCK] Template "${templateName}" to ${to}`);
      return { sid: 'mock_template_' + Date.now() };
    }

    try {
      // Implementación real de templates con Twilio
      const message = `Template: ${templateName} with ${JSON.stringify(parameters)}`;
      return await this.sendMessage(businessId, to, message);
    } catch (error) {
      console.error('Error sending template message:', error);
      throw error;
    }
  }
}

module.exports = WhatsAppService;