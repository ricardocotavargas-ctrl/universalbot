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
  Divider,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tabs,
  Tab
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
  PlayArrow,
  Inventory,
  ShoppingCart,
  Notifications,
  Email,
  WhatsApp,
  Instagram,
  Facebook,
  CalendarToday,
  Schedule,
  CheckCircle,
  Warning,
  Error
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useBusiness } from '../../contexts/BusinessContext';

// Servicio de API mejorado
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
    // Métricas
    getDashboardMetrics: () => makeRequest(`/business/${currentBusiness?.id}/metrics`),
    
    // Acciones
    startAutomation: (type) => makeRequest('/automation/start', {
      method: 'POST',
      body: JSON.stringify({ type })
    }),
    
    generateReport: (format) => makeRequest(`/reports/generate?format=${format}`),
    
    exportData: (type) => makeRequest(`/data/export?type=${type}`),
    
    // Notificaciones
    getNotifications: () => makeRequest('/notifications'),
    
    markNotificationRead: (id) => makeRequest(`/notifications/${id}/read`, {
      method: 'PUT'
    }),
    
    // Análisis
    getPerformanceData: (period) => makeRequest(`/analytics/performance?period=${period}`)
  };
};

// Hook de datos mejorado
const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const api = useAPIService();

  const staticData = {
    metrics: {
      revenue: { current: 52340, previous: 45680, growth: 14.6, target: 60000 },
      customers: { current: 1245, previous: 1120, growth: 11.2, target: 1500 },
      conversion: { current: 3.4, previous: 2.9, growth: 17.2, target: 4.0 },
      messages: { current: 2847, previous: 2542, growth: 12.0, target: 3000 }
    },
    performance: {
      channels: [
        { name: 'WhatsApp', value: 45, growth: 12, revenue: 23500 },
        { name: 'Instagram', value: 32, growth: 8, revenue: 16800 },
        { name: 'Web', value: 15, growth: 5, revenue: 7800 },
        { name: 'Email', value: 8, growth: 2, revenue: 4200 }
      ],
      trends: [12000, 19000, 15000, 22000, 18000, 23450, 28000, 32000, 29000, 35000, 38000, 42000]
    },
    alerts: [
      {
        id: 1,
        type: 'warning',
        title: 'Stock Bajo',
        message: 'Producto "X" tiene solo 5 unidades en inventario',
        time: 'Hace 2 horas',
        action: 'restock'
      },
      {
        id: 2,
        type: 'success',
        title: 'Meta Alcanzada',
        message: 'Ventas del mes superaron el objetivo en 15%',
        time: 'Hace 1 día',
        action: 'celebrate'
      },
      {
        id: 3,
        type: 'info',
        title: 'Nuevo Lead',
        message: 'Cliente potencial interesado en servicio premium',
        time: 'Hace 3 horas',
        action: 'followup'
      }
    ],
    quickActions: [
      { id: 1, title: 'Nueva Venta', icon: ShoppingCart, action: 'newSale' },
      { id: 2, title: 'Gestión Stock', icon: Inventory, action: 'manageInventory' },
      { id: 3, title: 'Enviar Campaña', icon: Email, action: 'sendCampaign' },
      { id: 4, title: 'Reporte Diario', icon: Analytics, action: 'dailyReport' }
    ]
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      // Simular carga de API
      await new Promise(resolve => setTimeout(resolve, 800));
      setData(staticData);
      setLastUpdate(new Date());
    } catch (error) {
      setData(staticData);
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, lastUpdate, refetch: loadData };
};

// Componente de Métrica Mejorado
const MetricCard = ({ title, value, change, target, icon: Icon, loading, onAction }) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
      return val.toLocaleString();
    }
    return val;
  };

  const progress = target ? (value / target) * 100 : 0;

  if (loading) {
    return (
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 140 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 48, height: 48, bgcolor: 'grey.100', borderRadius: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ height: 16, bgcolor: 'grey.100', borderRadius: 1, mb: 1, width: '60%' }} />
            <Box sx={{ height: 24, bgcolor: 'grey.100', borderRadius: 1, mb: 1 }} />
            <Box sx={{ height: 8, bgcolor: 'grey.100', borderRadius: 2, width: '100%' }} />
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 140 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
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
        <IconButton size="small" onClick={onAction}>
          <MoreVert />
        </IconButton>
      </Box>
      
      {target && (
        <LinearProgress 
          variant="determinate" 
          value={Math.min(progress, 100)} 
          sx={{ 
            mt: 1,
            height: 4,
            borderRadius: 2,
            bgcolor: 'grey.100',
            '& .MuiLinearProgress-bar': {
              bgcolor: progress >= 100 ? 'success.main' : 'primary.main',
              borderRadius: 2
            }
          }}
        />
      )}
    </Card>
  );
};

// Gráfico de Rendimiento Mejorado
const PerformanceChart = ({ data, loading, onTimeRangeChange }) => {
  const [timeRange, setTimeRange] = useState('month');

  if (loading) {
    return (
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 400 }}>
        <Box sx={{ height: '100%', bgcolor: 'grey.50', borderRadius: 1 }} />
      </Card>
    );
  }

  const chartData = data?.trends || [];
  const maxValue = Math.max(...chartData);
  const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
    onTimeRangeChange?.(newRange);
  };

  return (
    <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: 400 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          Rendimiento de Ventas
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {['week', 'month', 'quarter', 'year'].map((range) => (
            <Chip
              key={range}
              label={
                range === 'week' ? 'Semana' :
                range === 'month' ? 'Mes' :
                range === 'quarter' ? 'Trimestre' : 'Año'
              }
              variant={timeRange === range ? 'filled' : 'outlined'}
              onClick={() => handleTimeRangeChange(range)}
              size="small"
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ height: 250, display: 'flex', alignItems: 'end', gap: 0.5, mb: 3, px: 1 }}>
        {chartData.map((value, index) => (
          <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              sx={{
                width: '70%',
                height: `${(value / maxValue) * 100}%`,
                bgcolor: 'primary.main',
                borderRadius: '2px 2px 0 0',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.05)'
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: 'primary.main', borderRadius: 1 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Ingresos Mensuales
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
          <Typography variant="body2" fontWeight={600} sx={{ color: 'success.main' }}>
            +{((chartData[chartData.length - 1] - chartData[0]) / chartData[0] * 100).toFixed(1)}%
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

// Componente de Canal de Ventas
const SalesChannel = ({ channel, loading, onAnalyze }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
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

  const getChannelIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'whatsapp': return WhatsApp;
      case 'instagram': return Instagram;
      case 'facebook': return Facebook;
      case 'email': return Email;
      default: return Analytics;
    }
  };

  const ChannelIcon = getChannelIcon(channel.name);

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      py: 2,
      borderBottom: '1px solid',
      borderColor: 'grey.100',
      '&:last-child': { borderBottom: 'none' }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <Box sx={{ 
          p: 1, 
          bgcolor: 'grey.50', 
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ChannelIcon sx={{ fontSize: 20, color: 'text.primary' }} />
        </Box>
        <Box>
          <Typography variant="body1" fontWeight={500}>
            {channel.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ${channel.revenue.toLocaleString()}
          </Typography>
        </Box>
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
        <IconButton size="small" onClick={() => onAnalyze(channel)}>
          <Analytics />
        </IconButton>
      </Box>
    </Box>
  );
};

// Componente de Alerta Mejorado
const AlertItem = ({ alert, loading, onAction }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, py: 2 }}>
        <Box sx={{ width: 8, height: 8, bgcolor: 'grey.300', borderRadius: '50%', mt: 1 }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ height: 16, bgcolor: 'grey.100', borderRadius: 1, mb: 1, width: '70%' }} />
          <Box sx={{ height: 14, bgcolor: 'grey.100', borderRadius: 1, width: '90%' }} />
          <Box sx={{ height: 12, bgcolor: 'grey.100', borderRadius: 1, width: '40%', mt: 1 }} />
        </Box>
      </Box>
    );
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return Warning;
      case 'error': return Error;
      default: return Notifications;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'success': return 'success.main';
      case 'warning': return 'warning.main';
      case 'error': return 'error.main';
      default: return 'info.main';
    }
  };

  const AlertIcon = getAlertIcon(alert.type);
  const alertColor = getAlertColor(alert.type);

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'flex-start', 
      gap: 2, 
      py: 2,
      borderBottom: '1px solid',
      borderColor: 'grey.100',
      '&:last-child': { borderBottom: 'none' }
    }}>
      <AlertIcon sx={{ fontSize: 20, color: alertColor, mt: 0.5 }} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
          {alert.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, lineHeight: 1.4 }}>
          {alert.message}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {alert.time}
          </Typography>
          <Button 
            size="small" 
            variant="text"
            onClick={() => onAction(alert.action, alert)}
          >
            Acción
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// Acciones Rápidas
const QuickActions = ({ actions, loading, onAction }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        {[1, 2, 3, 4].map((item) => (
          <Box key={item} sx={{ 
            p: 2, 
            bgcolor: 'grey.50', 
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Box sx={{ width: 40, height: 40, bgcolor: 'grey.200', borderRadius: 1, mx: 'auto', mb: 1 }} />
            <Box sx={{ height: 16, bgcolor: 'grey.200', borderRadius: 1, width: '80%', mx: 'auto' }} />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
      {actions.map((action) => {
        const ActionIcon = action.icon;
        return (
          <Card 
            key={action.id}
            sx={{ 
              p: 2, 
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'primary.50',
                borderColor: 'primary.main',
                transform: 'translateY(-2px)'
              }
            }}
            onClick={() => onAction(action.action)}
          >
            <Box sx={{ textAlign: 'center' }}>
              <ActionIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
              <Typography variant="body2" fontWeight={600}>
                {action.title}
              </Typography>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};

// Dashboard Principal Mejorado
const Dashboard = () => {
  const { currentBusiness } = useBusiness();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [activeTab, setActiveTab] = useState(0);
  const { data, loading, lastUpdate, refetch } = useDashboardData();
  const api = useAPIService();

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleAction = async (action, data = null) => {
    try {
      switch (action) {
        case 'refresh':
          await refetch();
          showNotification('Datos actualizados correctamente', 'success');
          break;
          
        case 'newSale':
          showNotification('Iniciando nueva venta...', 'info');
          break;
          
        case 'manageInventory':
          showNotification('Abriendo gestión de inventario', 'info');
          break;
          
        case 'sendCampaign':
          await api.startAutomation('campaign');
          showNotification('Campaña enviada exitosamente', 'success');
          break;
          
        case 'dailyReport':
          await api.generateReport('daily');
          showNotification('Reporte diario generado', 'success');
          break;
          
        case 'restock':
          showNotification('Solicitando reposición de stock...', 'warning');
          break;
          
        case 'celebrate':
          showNotification('¡Felicidades por alcanzar la meta!', 'success');
          break;
          
        case 'followup':
          showNotification('Programando seguimiento con lead...', 'info');
          break;
          
        case 'analyzeChannel':
          showNotification(`Analizando canal: ${data?.name}`, 'info');
          break;
          
        case 'exportData':
          await api.exportData('full');
          showNotification('Datos exportados exitosamente', 'success');
          break;

        default:
          showNotification('Acción ejecutada', 'info');
      }
    } catch (error) {
      showNotification('Error al ejecutar la acción', 'error');
    }
  };

  const handleTimeRangeChange = (range) => {
    showNotification(`Período cambiado a: ${range}`, 'info');
  };

  const metrics = [
    {
      title: 'Ingresos Totales',
      value: data?.metrics?.revenue.current,
      change: data?.metrics?.revenue.growth,
      target: data?.metrics?.revenue.target,
      icon: AttachMoney,
      action: 'viewRevenue'
    },
    {
      title: 'Clientes Activos',
      value: data?.metrics?.customers.current,
      change: data?.metrics?.customers.growth,
      target: data?.metrics?.customers.target,
      icon: People,
      action: 'viewCustomers'
    },
    {
      title: 'Tasa Conversión',
      value: data?.metrics?.conversion.current,
      change: data?.metrics?.conversion.growth,
      target: data?.metrics?.conversion.target,
      icon: TrendingUp,
      action: 'viewConversion'
    },
    {
      title: 'Interacciones',
      value: data?.metrics?.messages.current,
      change: data?.metrics?.messages.growth,
      target: data?.metrics?.messages.target,
      icon: Chat,
      action: 'viewMessages'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Mejorado */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Panel de Control
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {currentBusiness?.name || 'Mi Negocio'} • 
              {lastUpdate && ` Actualizado: ${lastUpdate.toLocaleTimeString()}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              startIcon={<Refresh />}
              onClick={() => handleAction('refresh')}
              disabled={loading}
            >
              Actualizar
            </Button>
            <Button 
              variant="contained" 
              startIcon={<RocketLaunch />}
              onClick={() => handleAction('sendCampaign')}
            >
              Automatizar
            </Button>
          </Box>
        </Box>

        {/* Pestañas */}
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Resumen" />
          <Tab label="Rendimiento" />
          <Tab label="Análisis" />
          <Tab label="Reportes" />
        </Tabs>
      </Box>

      {/* Acciones Rápidas */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Acciones Rápidas
        </Typography>
        <QuickActions 
          actions={data?.quickActions || []} 
          loading={loading}
          onAction={handleAction}
        />
      </Box>

      {/* Métricas Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <MetricCard 
              {...metric} 
              loading={loading}
              onAction={() => handleAction(metric.action)}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Gráfico Principal */}
        <Grid item xs={12} lg={8}>
          <PerformanceChart 
            data={data?.performance} 
            loading={loading}
            onTimeRangeChange={handleTimeRangeChange}
          />
        </Grid>

        {/* Sidebar - Canales y Alertas */}
        <Grid item xs={12} lg={4}>
          {/* Canales de Venta */}
          <Card sx={{ borderRadius: 2, bgcolor: 'background.paper', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                Canales de Venta
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {data?.performance?.channels?.map((channel, index) => (
                  <SalesChannel 
                    key={index} 
                    channel={channel} 
                    loading={loading}
                    onAnalyze={() => handleAction('analyzeChannel', channel)}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Alertas del Sistema */}
          <Card sx={{ borderRadius: 2, bgcolor: 'background.paper' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Alertas del Sistema
                </Typography>
                <Chip 
                  label={data?.alerts?.length || 0} 
                  size="small" 
                  color="primary" 
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {data?.alerts?.map((alert) => (
                  <AlertItem 
                    key={alert.id}
                    alert={alert} 
                    loading={loading}
                    onAction={handleAction}
                  />
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
