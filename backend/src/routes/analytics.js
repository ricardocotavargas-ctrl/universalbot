// backend/src/routes/analytics.js - ENDPOINTS REALES PARA DASHBOARD
const express = require('express');
const router = express.Router();
const AnalyticsService = require('../services/AnalyticsService');

// ✅ ENDPOINT REAL PARA DASHBOARD - SIN AUTENTICACIÓN TEMPORAL
router.get('/dashboard', async (req, res) => {
  try {
    const { timeRange = 'week' } = req.query;
    
    // Business ID temporal - luego vendrá del usuario autenticado
    const businessId = '000000000000000000000001';

    console.log('📊 Solicitando datos REALES del dashboard...');
    
    const [metrics, channels, insights] = await Promise.all([
      AnalyticsService.getDashboardMetrics(businessId, timeRange),
      AnalyticsService.getChannelPerformance(businessId),
      AnalyticsService.getAIInsights(businessId)
    ]);

    const response = {
      success: true,
      data: {
        ...metrics,
        channels,
        insights
      },
      timestamp: new Date().toISOString()
    };

    console.log('✅ Datos REALES del dashboard enviados:', {
      revenue: metrics.realStats.totalRevenue,
      customers: metrics.realStats.totalCustomers,
      sales: metrics.realStats.totalSales
    });

    res.json(response);

  } catch (error) {
    console.error('❌ Error en /analytics/dashboard:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar datos del dashboard: ' + error.message 
    });
  }
});

// ✅ ENDPOINT PARA MÉTRICAS DETALLADAS
router.get('/metrics', async (req, res) => {
  try {
    const businessId = '000000000000000000000001';
    const metrics = await AnalyticsService.getDashboardMetrics(businessId);
    
    res.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error en /analytics/metrics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar métricas' 
    });
  }
});

// ✅ ENDPOINT PARA TENDENCIAS TEMPORALES
router.get('/trends', async (req, res) => {
  try {
    const { period = '30days' } = req.query;
    const businessId = '000000000000000000000001';
    
    const trends = await AnalyticsService.getTimeSeriesData(businessId, period);
    
    res.json({
      success: true,
      data: trends,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error en /analytics/trends:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar tendencias' 
    });
  }
});

// ✅ ENDPOINT PARA PERFORMANCE DE CANALES
router.get('/channels', async (req, res) => {
  try {
    const businessId = '000000000000000000000001';
    const channels = await AnalyticsService.getChannelPerformance(businessId);
    
    res.json({
      success: true,
      data: channels,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error en /analytics/channels:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar datos de canales' 
    });
  }
});

// ✅ ENDPOINT PARA INSIGHTS DE IA
router.get('/insights', async (req, res) => {
  try {
    const businessId = '000000000000000000000001';
    const insights = await AnalyticsService.getAIInsights(businessId);
    
    res.json({
      success: true,
      data: insights,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error en /analytics/insights:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al generar insights' 
    });
  }
});

module.exports = router;
