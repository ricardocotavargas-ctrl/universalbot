import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar
} from '@mui/material';
import {
  TrendingUp,
  People,
  Chat,
  AttachMoney,
  ShoppingCart,
  Inventory,
  Analytics,
  SmartToy,
  Refresh,
  Download,
  RocketLaunch,
  WhatsApp,
  Instagram,
  Facebook,
  Email,
  ArrowUpward,
  ArrowDownward,
  PlayArrow,
  Pause,
  Stop,
  Add,
  Edit,
  Delete
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useBusiness } from '../../contexts/BusinessContext';

// Servicio de API conectado a tu backend
const useAPIService = () => {
  const { user } = useAuth();
  const { currentBusiness } = useBusiness();

  const makeRequest = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`/api${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
          'X-Business-ID': currentBusiness?.id
        },
        ...options
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  return {
    // Métricas del dashboard
    getDashboardMetrics: (range = 'week') => 
      makeRequest(`/business/${currentBusiness?.id}/metrics?range=${range}`),

    // Performance de canales
    getChannelsPerformance: () => 
      makeRequest(`/analytics/channels?businessId=${currentBusiness?.id}`),

    // Insights de IA
    getAIInsights: () => 
      makeRequest(`/ai/insights?businessId=${currentBusiness?.id}`),

    // Datos para gráficos
    getAnalyticsData: (range = 'week') => 
      makeRequest(`/analytics/trends?businessId=${currentBusiness?.id}&range=${range}`),

    // Acciones del dashboard
    startCampaign: (campaignData) => 
      makeRequest('/marketing/campaigns', { method: 'POST', body: JSON.stringify(campaignData) }),

    generateReport: (reportType) => 
      makeRequest(`/reports/generate?type=${reportType}`),

    exportData: (format = 'csv') => 
      makeRequest(`/data/export?format=${format}`),

    consultAI: (query) => 
      makeRequest('/ai/consult', { method: 'POST', body: JSON.stringify({ query }) })
  };
};

// Hook principal de datos - SIN PARPADEO
const useDashboardData = () => {
  const [data, setData] = useState({
    metrics: null,
    channels: null,
    insights: null,
    analytics: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = useAPIService();

  // Datos de ejemplo estáticos - no cambian
  const staticData = {
    metrics: {
      revenue: { current: 52340, previous: 45680, growth: 14.6 },
      customers: { current: 1245, previous: 1120, growth: 11.2 },
      conversion: { current: 3.4, previous: 2.9, growth: 17.2 },
      messages: { current: 156, previous: 142, growth: 9.9 }
    },
    channels: [
      { name: 'WhatsApp', value: 45, growth: 12, color: '#25D366', icon: WhatsApp },
      { name: 'Instagram', value: 32, growth: 8, color: '#E4405F', icon: Instagram },
      { name: 'Facebook', value: 28, growth: -2, color: '#1877F2', icon: Facebook },
      { name: 'Email', value: 18, growth: 5, color: '#EA4335', icon: Email }
    ],
    insights: [
      {
        id: 1,
        type: 'success',
        title: 'Tendencia Positiva Detectada',
        message: 'El crecimiento de ingresos ha superado las proyecciones en un 15% este mes.',
        confidence: 0.94,
        action: 'expandCampaign',
        actionLabel: 'Expandir Campaña'
      },
      {
        id: 2,
        type: 'opportunity',
        title: 'Oportunidad en Instagram',
        message: 'El engagement en Instagram ha aumentado un 25%. Considera aumentar el presupuesto.',
        confidence: 0.82,
        action: 'optimizeCampaign',
        actionLabel: 'Optimizar'
      },
      {
        id: 3,
        type: 'warning',
        title: 'Atención: Tasa de Conversión',
        message: 'La tasa de conversión ha disminuido. Revisa el funnel de ventas.',
        confidence: 0.76,
        action: 'reviewFunnel',
        actionLabel: 'Revisar'
      }
    ],
    analytics: {
      revenueData: [12000, 19000, 15000, 22000, 18000, 23450, 28000],
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
    }
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar cargar datos reales, si falla usar datos estáticos
      try {
        const [metrics, channels, insights, analytics] = await Promise.all([
          api.getDashboardMetrics().catch(() => staticData.metrics),
          api.getChannelsPerformance().catch(() => staticData.channels),
          api.getAIInsights().catch(() => staticData.insights),
          api.getAnalyticsData().catch(() => staticData.analytics)
        ]);

        setData({
          metrics: metrics || staticData.metrics,
          channels: channels || staticData.channels,
          insights: insights || staticData.insights,
          analytics: analytics || staticData.analytics
        });
      } catch {
        // Si todo falla, usar datos estáticos
        setData(staticData);
      }
    } catch (err) {
      setError(err.message);
      setData(staticData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refetch: loadData };
};

// Componente de Tarjeta de Métrica
const MetricCard = ({ title, value, change, icon: Icon, color = '#2563eb', loading }) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
      return val.toLocaleString();
    }
    return val;
  };

  if (loading) {
    return (
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 140 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 60, height: 60, bgcolor: 'grey.200', borderRadius: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ height: 20, bgcolor: 'grey.200', borderRadius: 1, mb: 1 }} />
            <Box sx={{ height: 30, bgcolor: 'grey.200', borderRadius: 1, mb: 1 }} />
            <Box sx={{ height: 16, bgcolor: 'grey.200', borderRadius: 1, width: '60%' }} />
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 140 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ 
          p: 1.5, 
          bgcolor: `${color}10`, 
          borderRadius: 2,
          border: `1px solid ${color}20`
        }}>
          <Icon sx={{ fontSize: 32, color }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={800} sx={{ color }}>
            {formatValue(value)}
          </Typography>
          <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {change > 0 ? <ArrowUpward sx={{ fontSize: 16, color: '#10b981' }} /> : <ArrowDownward sx={{ fontSize: 16, color: '#ef4444' }} />}
            <Chip 
              label={`${change > 0 ? '+' : ''}${change}%`} 
              size="small"
              sx={{ 
                bgcolor: change > 0 ? '#10b98120' : '#ef444420',
                color: change > 0 ? '#10b981' : '#ef4444',
                fontWeight: 600
              }}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

// Componente de Canal
const ChannelCard = ({ channel, loading }) => {
  if (loading) {
    return (
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 40, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ height: 20, bgcolor: 'grey.200', borderRadius: 1, mb: 1 }} />
            <Box sx={{ height: 8, bgcolor: 'grey.200', borderRadius: 2 }} />
          </Box>
        </Box>
      </Card>
    );
  }

  const IconComponent = channel.icon;

  return (
    <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ 
          p: 1, 
          bgcolor: `${channel.color}10`, 
          borderRadius: 1.5,
          border: `1px solid ${channel.color}20`
        }}>
          <IconComponent sx={{ fontSize: 24, color: channel.color }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" fontWeight={600}>
            {channel.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h6" fontWeight={800} sx={{ color: channel.color }}>
              {channel.value}%
            </Typography>
            <Chip 
              label={`${channel.growth > 0 ? '+' : ''}${channel.growth}%`} 
              size="small"
              sx={{ 
                bgcolor: channel.growth > 0 ? '#10b98120' : '#ef444420',
                color: channel.growth > 0 ? '#10b981' : '#ef4444',
                fontSize: '0.7rem'
              }}
            />
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={channel.value} 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              bgcolor: '#f1f5f9',
              '& .MuiLinearProgress-bar': {
                bgcolor: channel.color,
                borderRadius: 3
              }
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

// Componente de Insight de IA
const InsightCard = ({ insight, onAction, loading }) => {
  if (loading) {
    return (
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ width: 40, height: 40, bgcolor: 'grey.200', borderRadius: 1 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ height: 20, bgcolor: 'grey.200', borderRadius: 1, mb: 1, width: '70%' }} />
            <Box sx={{ height: 16, bgcolor: 'grey.200', borderRadius: 1, mb: 2, width: '90%' }} />
            <Box sx={{ height: 32, bgcolor: 'grey.200', borderRadius: 1, width: '120px' }} />
          </Box>
        </Box>
      </Card>
    );
  }

  const getColors = (type) => {
    switch (type) {
      case 'success': return { bg: '#10b98110', border: '#10b98130', color: '#10b981' };
      case 'opportunity': return { bg: '#f59e0b10', border: '#f59e0b30', color: '#f59e0b' };
      case 'warning': return { bg: '#ef444410', border: '#ef444430', color: '#ef4444' };
      default: return { bg: '#2563eb10', border: '#2563eb30', color: '#2563eb' };
    }
  };

  const colors = getColors(insight.type);

  return (
    <Card sx={{ 
      p: 3, 
      borderRadius: 2, 
      bgcolor: colors.bg,
      border: `1px solid ${colors.border}`
    }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <SmartToy sx={{ fontSize: 24, color: colors.color, mt: 0.5 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
            {insight.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.5 }}>
            {insight.message}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip 
              label={`${(insight.confidence * 100).toFixed(0)}% confianza`} 
              size="small"
              sx={{ 
                bgcolor: `${colors.color}20`,
                color: colors.color,
                fontWeight: 600
              }}
            />
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => onAction(insight.action, insight)}
              sx={{ 
                borderColor: colors.color,
                color: colors.color,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: `${colors.color}10`,
                  borderColor: colors.color
                }
              }}
            >
              {insight.actionLabel}
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

// Componente de Gráfico Simple
const SimpleChart = ({ data, loading }) => {
  if (loading) {
    return (
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 300 }}>
        <Box sx={{ height: '100%', bgcolor: 'grey.100', borderRadius: 1 }} />
      </Card>
    );
  }

  const maxValue = Math.max(...data.revenueData);
  const growth = ((data.revenueData[data.revenueData.length - 1] - data.revenueData[0]) / data.revenueData[0] * 100).toFixed(1);

  return (
    <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 300 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
        Rendimiento de Ingresos
      </Typography>
      
      <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 1, mb: 3 }}>
        {data.revenueData.map((value, index) => (
          <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              sx={{
                width: '70%',
                height: `${(value / maxValue) * 100}%`,
                bgcolor: '#2563eb',
                borderRadius: '4px 4px 0 0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#1d4ed8',
                  transform: 'scale(1.05)'
                }
              }}
            />
            <Typography variant="caption" sx={{ mt: 1, fontWeight: 600, color: 'text.secondary' }}>
              {data.labels[index]}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Últimos 7 días
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />
          <Typography variant="body2" fontWeight={600} sx={{ color: '#10b981' }}>
            +{growth}% crecimiento
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

// Botones de Acción Principales
const ActionButtons = ({ onAction }) => {
  const actions = [
    {
      icon: <RocketLaunch />,
      label: 'Nueva Campaña',
      color: '#2563eb',
      action: 'startCampaign'
    },
    {
      icon: <Analytics />,
      label: 'Generar Reporte',
      color: '#10b981',
      action: 'generateReport'
    },
    {
      icon: <SmartToy />,
      label: 'Consultar IA',
      color: '#8b5cf6',
      action: 'consultAI'
    },
    {
      icon: <Download />,
      label: 'Exportar Datos',
      color: '#f59e0b',
      action: 'exportData'
    }
  ];

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
      {actions.map((action, index) => (
        <Button
          key={index}
          startIcon={action.icon}
          onClick={() => onAction(action.action)}
          sx={{
            bgcolor: `${action.color}10`,
            border: `1px solid ${action.color}30`,
            color: action.color,
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            py: 1.5,
            '&:hover': {
              bgcolor: `${action.color}20`,
              borderColor: action.color
            }
          }}
        >
          {action.label}
        </Button>
      ))}
    </Box>
  );
};

// Dashboard Principal
const Dashboard = () => {
  const { user } = useAuth();
  const { currentBusiness } = useBusiness();
  const isMobile = useMediaQuery('(max-width:768px)');
  
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const { data, loading, error, refetch } = useDashboardData();
  const api = useAPIService();

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleAction = async (action, data = null) => {
    try {
      switch (action) {
        case 'startCampaign':
          await api.startCampaign({ name: 'Nueva Campaña', platform: 'all' });
          showNotification('Campaña iniciada exitosamente', 'success');
          break;

        case 'generateReport':
          await api.generateReport('dashboard');
          showNotification('Reporte generado exitosamente', 'success');
          break;

        case 'consultAI':
          await api.consultAI('Analizar rendimiento del negocio');
          showNotification('Consulta enviada a IA', 'info');
          break;

        case 'exportData':
          await api.exportData('csv');
          showNotification('Datos exportados exitosamente', 'success');
          break;

        case 'expandCampaign':
          showNotification('Expandiendo campaña...', 'info');
          break;

        case 'optimizeCampaign':
          showNotification('Optimizando campaña...', 'info');
          break;

        case 'reviewFunnel':
          showNotification('Revisando funnel de ventas...', 'warning');
          break;

        case 'refresh':
          await refetch();
          showNotification('Datos actualizados', 'success');
          break;

        default:
          showNotification(`Acción ${action} ejecutada`, 'info');
      }
    } catch (error) {
      showNotification(`Error en ${action}: ${error.message}`, 'error');
    }
  };

  const metrics = [
    {
      title: 'Ingresos Totales',
      value: data.metrics?.revenue.current,
      change: data.metrics?.revenue.growth,
      icon: AttachMoney,
      color: '#10b981'
    },
    {
      title: 'Clientes Activos',
      value: data.metrics?.customers.current,
      change: data.metrics?.customers.growth,
      icon: People,
      color: '#2563eb'
    },
    {
      title: 'Tasa Conversión',
      value: data.metrics?.conversion.current,
      change: data.metrics?.conversion.growth,
      icon: TrendingUp,
      color: '#f59e0b'
    },
    {
      title: 'Interacciones',
      value: data.metrics?.messages.current,
      change: data.metrics?.messages.growth,
      icon: Chat,
      color: '#8b5cf6'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
              Dashboard Ejecutivo
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              {currentBusiness?.name || 'Mi Negocio'} • Datos en tiempo real
            </Typography>
          </Box>
          <IconButton 
            onClick={() => handleAction('refresh')}
            sx={{ 
              bgcolor: 'primary.50',
              '&:hover': { bgcolor: 'primary.100' }
            }}
          >
            <Refresh />
          </IconButton>
        </Box>

        <ActionButtons onAction={handleAction} />
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error} - Mostrando datos de demostración
        </Alert>
      )}

      {/* Métricas Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <MetricCard {...metric} loading={loading} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Gráfico y Canales */}
        <Grid item xs={12} lg={8}>
          <SimpleChart data={data.analytics} loading={loading} />
        </Grid>

        <Grid item xs={12} lg={4}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Performance por Canal
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {data.channels?.map((channel, index) => (
              <ChannelCard key={index} channel={channel} loading={loading} />
            ))}
          </Box>
        </Grid>

        {/* Insights de IA */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Insights de Inteligencia Artificial
          </Typography>
          <Grid container spacing={2}>
            {data.insights?.map((insight, index) => (
              <Grid item xs={12} md={6} lg={4} key={insight.id || index}>
                <InsightCard 
                  insight={insight} 
                  onAction={handleAction}
                  loading={loading}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
