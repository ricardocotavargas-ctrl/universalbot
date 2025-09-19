const express = require('express');
const router = express.Router();

// Importamos los servicios refactorizados
const UniversalBotService = require('../services/UniversalBotService');
const WhatsAppService = require('../services/WhatsAppService');

// Creamos una instancia única del BotService para inyectarla
const botService = new UniversalBotService();
const whatsappService = new WhatsAppService(botService); // ¡INYECCIÓN!

// Ruta para el webhook de WhatsApp
router.post('/whatsapp', async (req, res) => {
  try {
    await whatsappService.handleIncomingMessage(req, res);
  } catch (error) {
    console.error('❌ Error in WhatsApp webhook route:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Ruta para verificación del webhook
router.get('/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('✅ WhatsApp webhook verified');
    res.status(200).send(challenge);
  } else {
    console.warn('⚠️ WhatsApp webhook verification failed');
    res.sendStatus(403);
  }
});

module.exports = router;