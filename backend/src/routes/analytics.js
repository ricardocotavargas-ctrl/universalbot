const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { tenantMiddleware } = require('../middleware/tenant');

// Métricas principales
router.get('/metrics', authenticate, tenantMiddleware, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Aquí irían las consultas reales a la base de datos
    const metrics = {
      total_conversations: 1247,
      conversion_rate: 23.4,
      avg_response_time: '2.3min',
      customer_satisfaction: 4.7,
      popular_products: ['iPhone 13', 'Curso Inglés', 'Consulta Médica'],
      revenue_trend: [1200, 1500, 1800, 2100, 2400],
      interaction_volume: [45, 52, 48, 61, 55, 49]
    };

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reporte de conversiones
router.get('/conversions', authenticate, tenantMiddleware, async (req, res) => {
  try {
    const conversions = {
      by_channel: { whatsapp: 234, email: 45, sms: 12 },
      by_hour: Array.from({length: 24}, (_, i) => ({ hour: i, conversions: Math.floor(Math.random() * 20) })),
      by_product: [
        { product: 'iPhone 13', conversions: 89, revenue: 53400 },
        { product: 'Curso Inglés', conversions: 45, revenue: 9000 },
        { product: 'Consulta Médica', conversions: 67, revenue: 3350 }
      ]
    };

    res.json(conversions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;