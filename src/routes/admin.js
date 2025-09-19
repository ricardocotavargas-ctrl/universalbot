const express = require('express');
const Business = require('../models/Business');
const User = require('../models/User');
const Interaction = require('../models/Interaction');

const router = express.Router();
const businessModel = new Business();
const userModel = new User();
const interactionModel = new Interaction();

// Get all businesses for admin
router.get('/businesses', async (req, res) => {
  try {
    const { page = 1, limit = 10, industry } = req.query;
    const offset = (page - 1) * limit;

    let businesses;
    if (industry) {
      businesses = await businessModel.search('', industry);
    } else {
      businesses = await businessModel.findAll(parseInt(limit), offset);
    }

    const total = businesses.length;

    res.json({
      success: true,
      data: businesses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get businesses error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get business by ID
router.get('/businesses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const business = await businessModel.findById(id);

    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }

    res.json({
      success: true,
      data: business
    });

  } catch (error) {
    console.error('Get business error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Create new business
router.post('/businesses', async (req, res) => {
  try {
    const { name, industry, description, config, settings } = req.body;

    if (!name || !industry) {
      return res.status(400).json({
        success: false,
        error: 'Name and industry are required'
      });
    }

    const business = await businessModel.create({
      name,
      industry,
      description: description || '',
      config: config || {},
      settings: settings || {
        whatsapp_enabled: true,
        auto_responses: true,
        human_handoff: true
      }
    });

    res.status(201).json({
      success: true,
      data: business
    });

  } catch (error) {
    console.error('Create business error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update business
router.put('/businesses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const business = await businessModel.update(id, updates);

    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }

    res.json({
      success: true,
      data: business
    });

  } catch (error) {
    console.error('Update business error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Delete business
router.delete('/businesses/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const business = await businessModel.delete(id);

    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }

    res.json({
      success: true,
      message: 'Business deleted successfully'
    });

  } catch (error) {
    console.error('Delete business error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get business statistics
router.get('/businesses/:id/stats', async (req, res) => {
  try {
    const { id } = req.params;
    const { start_date, end_date } = req.query;

    const startDate = start_date ? new Date(start_date) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = end_date ? new Date(end_date) : new Date();

    const [intentStats, satisfactionStats, dailyStats, userCount, interactionCount] = await Promise.all([
      interactionModel.getIntentStats(id, startDate, endDate),
      interactionModel.getSatisfactionStats(id, startDate, endDate),
      interactionModel.getDailyStats(id, 30),
      userModel.countByBusiness(id),
      interactionModel.countByBusiness(id)
    ]);

    res.json({
      success: true,
      data: {
        intent_stats: intentStats,
        satisfaction_stats: satisfactionStats,
        daily_stats: dailyStats,
        user_count: userCount,
        interaction_count: interactionCount,
        period: {
          start: startDate,
          end: endDate
        }
      }
    });

  } catch (error) {
    console.error('Get business stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get industry statistics
router.get('/industries/stats', async (req, res) => {
  try {
    const stats = await businessModel.getIndustryStats();

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get industry stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Search businesses
router.get('/search/businesses', async (req, res) => {
  try {
    const { q, industry, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const businesses = await businessModel.search(q, industry);
    const total = businesses.length;

    res.json({
      success: true,
      data: businesses.slice(offset, offset + parseInt(limit)),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Search businesses error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;