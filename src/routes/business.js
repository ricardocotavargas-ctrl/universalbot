const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const Interaction = require('../models/Interaction');

// Analytics endpoint para gráficos
router.get('/:id/analytics', async (req, res) => {
  try {
    const businessId = req.params.id;
    const { period = '7days' } = req.query;

    const interaction = new Interaction();
    
    const [conversationTrend, platformDistribution, performanceMetrics] = await Promise.all([
      interaction.getConversationTrend(businessId, period),
      interaction.getPlatformDistribution(businessId),
      interaction.getPerformanceMetrics(businessId)
    ]);

    res.json({
      conversationTrend,
      platformDistribution,
      performanceMetrics
    });

  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get business interactions
router.get('/:id/interactions', async (req, res) => {
  try {
    const businessId = req.params.id;
    const limit = parseInt(req.query.limit) || 10;

    const interaction = new Interaction();
    const interactions = await interaction.findByBusiness(businessId, limit);

    res.json(interactions);

  } catch (error) {
    console.error('Error getting business interactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;