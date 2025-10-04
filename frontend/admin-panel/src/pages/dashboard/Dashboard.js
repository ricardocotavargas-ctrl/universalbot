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
  Snackbar,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  People,
  Chat,
  AttachMoney,
  Analytics,
  SmartToy,
  Refresh,
  Download,
  RocketLaunch,
  ArrowUpward,
  ArrowDownward,
  MoreVert,
  PlayArrow
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useBusiness } from '../../contexts/BusinessContext';

// Servicio de API
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
    getDashboardMetrics: () => makeRequest(`/business/${currentBusiness?.id}/metrics`),
    startCampaign: (data) => makeRequest('/marketing/campaigns', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
    generateReport: () => makeRequest('/reports/generate'),
    exportData: () => makeRequest('/data/export')
  };
};

// Hook de datos
const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = useAPIService();

  const staticData = {
    metrics: {
      revenue: { current: 52340, previous: 45680, growth: 14.6 },
      customers: { current: 1245, previous: 1120, growth: 11.2 },
      conversion: { current: 3.4, previous: 2.9, growth: 17.2 },
      messages: { current: 2847, previous: 2542, growth: 12.0 }
    },
    channels: [
      { name: 'WhatsApp', value: 45, growth: 12 },
      { name: 'Instagram', value: 32, growth: 8 },
      { name: 'Web', value: 15, growth: 5 },
      { name: 'Email', value: 8, growth: 2 }
    ],
    insights: [
      {
        id: 1,
        title: 'Optimización de Inventario',
        description: '3 productos con stock bajo requieren atención inmediata',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Oportunidad de Crecimiento',
        description: 'Segmento de clientes premium muestra alta receptividad',
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Eficiencia Operativa',
        description: 'Tiempo de respuesta mejorado en 15% este mes',
        priority: 'low'
      }
    ]
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      // Simular carga de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(staticData);
    } catch (error) {
      setData(staticData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, refetch: loadData };
};

// Componente de Métrica Minimalista
const MetricCard = ({ title, value, change, icon: Icon, loading }) => {
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
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 120 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 48, height: 48, bgcolor: 'grey.100', borderRadius: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ height: 16, bgcolor: 'grey.100', borderRadius: 1, mb: 1, width: '60%' }} />
            <Box sx={{ height: 24, bgcolor: 'grey.100', borderRadius: 1, mb: 1 }} />
            <Box sx={{ height: 12, bgcolor: 'grey.100', borderRadius: 1, width: '40%' }} />
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 120 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ 
          p: 1.5, 
          bgcolor: 'grey.50', 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200'
        }}>
          <Icon sx={{ fontSize: 24, color: 'text.primary' }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
            {formatValue(value)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {change > 0 ? 
              <ArrowUpward sx={{ fontSize: 16, color: 'success.main' }} /> : 
              <ArrowDownward sx={{ fontSize: 16, color: 'error.main' }} />
            }
            <Typography 
              variant="caption" 
              fontWeight={600}
              sx={{ color: change > 0 ? 'success.main' : 'error.main' }}
            >
              {change > 0 ? '+' : ''}{change}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

// Gráfico de Barras Minimalista
const AnalyticsChart = ({ data, loading }) => {
  if (loading) {
    return (
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 320 }}>
        <Box sx={{ height: '100%', bgcolor: 'grey.50', borderRadius: 1 }} />
      </Card>
    );
  }

  const chartData = [12000, 19000, 15000, 22000, 18000, 23450, 28000, 32000, 29000, 35000, 38000, 42000];
  const maxValue = Math.max(...chartData);
  const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  return (
    <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 320 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          Rendimiento Anual
        </Typography>
        <Button variant="outlined" size="small" startIcon={<Download />}>
          Exportar
        </Button>
      </Box>

      <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 1, mb: 3, px: 1 }}>
        {chartData.map((value, index) => (
          <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              sx={{
                width: '60%',
                height: `${(value / maxValue) * 100}%`,
                bgcolor: 'primary.main',
                borderRadius: '2px 2px 0 0',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            />
            <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary', fontSize: 10 }}>
              {labels[index]}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Evolución de ingresos mensuales
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
          <Typography variant="body2" fontWeight={600} sx={{ color: 'success.main' }}>
            +24.8%
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

// Componente de Canal Simple
const ChannelItem = ({ channel, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          <Box sx={{ width: 40, height: 40, bgcolor: 'grey.100', borderRadius: 1 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ height: 16, bgcolor: 'grey.100', borderRadius: 1, mb: 0.5, width: '60%' }} />
            <Box sx={{ height: 12, bgcolor: 'grey.100', borderRadius: 1, width: '40%' }} />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <Typography variant="body1" fontWeight={500}>
          {channel.name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body1" fontWeight={600}>
          {channel.value}%
        </Typography>
        <Chip 
          label={`${channel.growth > 0 ? '+' : ''}${channel.growth}%`}
          size="small"
          color={channel.growth > 0 ? 'success' : 'error'}
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

// Insight Card Minimalista
const InsightCard = ({ insight, loading }) => {
  if (loading) {
    return (
      <Card sx={{ p: 2.5, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ width: 40, height: 40, bgcolor: 'grey.100', borderRadius: 1 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ height: 16, bgcolor: 'grey.100', borderRadius: 1, mb: 1, width: '70%' }} />
            <Box sx={{ height: 14, bgcolor: 'grey.100', borderRadius: 1, width: '90%' }} />
          </Box>
        </Box>
      </Card>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error.main';
      case 'medium': return 'warning.main';
      case 'low': return 'success.main';
      default: return 'text.secondary';
    }
  };

  return (
    <Card sx={{ p: 2.5, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ 
          width: 8, 
          height: 8, 
          bgcolor: getPriorityColor(insight.priority),
          borderRadius: '50%',
          mt: 1
        }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
            {insight.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.4 }}>
            {insight.description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

// Dashboard Principal
const Dashboard = () => {
  const { currentBusiness } = useBusiness();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const { data, loading, refetch } = useDashboardData();
  const api = useAPIService();

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleAction = async (action) => {
    try {
      switch (action) {
        case 'refresh':
          await refetch();
          showNotification('Datos actualizados', 'success');
          break;
        case 'startCampaign':
          await api.startCampaign({ name: 'Campaña Automatizada' });
          showNotification('Campaña iniciada exitosamente', 'success');
          break;
        case 'generateReport':
          await api.generateReport();
          showNotification('Reporte generado exitosamente', 'success');
          break;
        case 'exportData':
          await api.exportData();
          showNotification('Datos exportados', 'success');
          break;
        default:
          showNotification('Acción ejecutada', 'info');
      }
    } catch (error) {
      showNotification('Error en la acción', 'error');
    }
  };

  const metrics = [
    {
      title: 'Ingresos Totales',
      value: data?.metrics?.revenue.current,
      change: data?.metrics?.revenue.growth,
      icon: AttachMoney
    },
    {
      title: 'Clientes Activos',
      value: data?.metrics?.customers.current,
      change: data?.metrics?.customers.growth,
      icon: People
    },
    {
      title: 'Tasa Conversión',
      value: data?.metrics?.conversion.current,
      change: data?.metrics?.conversion.growth,
      icon: TrendingUp
    },
    {
      title: 'Interacciones',
      value: data?.metrics?.messages.current,
      change: data?.metrics?.messages.growth,
      icon: Chat
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Panel de Control
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {currentBusiness?.name || 'Mi Negocio'} • Resumen ejecutivo
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              startIcon={<Refresh />}
              onClick={() => handleAction('refresh')}
            >
              Actualizar
            </Button>
            <Button 
              variant="contained" 
              startIcon={<RocketLaunch />}
              onClick={() => handleAction('startCampaign')}
            >
              Nueva Acción
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Métricas Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <MetricCard {...metric} loading={loading} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Gráfico Principal */}
        <Grid item xs={12} lg={8}>
          <AnalyticsChart data={data} loading={loading} />
        </Grid>

        {/* Sidebar - Canales e Insights */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: 2, bgcolor: 'background.paper', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Canales de Venta
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {data?.channels?.map((channel, index) => (
                  <ChannelItem key={index} channel={channel} loading={loading} />
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 2, bgcolor: 'background.paper' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Alertas del Sistema
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {data?.insights?.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} loading={loading} />
                ))}
              </Box>
            </CardContent>
          </Card>
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
