import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
  alpha,
  useMediaQuery,
  LinearProgress,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Button,
  Alert,
  Snackbar,
  Skeleton,
  Paper,
  Stack,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material';
import {
  TrendingUp,
  People,
  Chat,
  AttachMoney,
  ShoppingCart,
  Inventory,
  Notifications,
  Analytics,
  SmartToy,
  Timeline,
  BarChart,
  PieChart,
  Refresh,
  Download,
  Share,
  WhatsApp,
  Instagram,
  Facebook,
  Email,
  ArrowUpward,
  ArrowDownward,
  RocketLaunch,
  Star,
  GppGood,
  AccessTime,
  VerifiedUser,
  PointOfSale,
  AccountBalance,
  AutoGraph,
  Inventory2,
  Campaign,
  Schedule,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  LocalOffer,
  Receipt,
  Group,
  Message,
  AccountCircle,
  CalendarToday,
  ArrowForward
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// 🔥 CONSTANTES Y CONFIGURACIÓN
const API_ENDPOINTS = {
  metrics: '/api/analytics/metrics',
  financial: '/api/financial/dashboard',
  conversions: '/api/analytics/conversions',
  sales: '/api/sales',
  insights: '/api/ai/insights'
};

// 🔥 HOOK PERSONALIZADO PARA DATOS DEL DASHBOARD
const useDashboardData = (timeRange = 'week') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchWithAuth = async (url) => {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Error fetching data');
    return response.json();
  };

  const getFallbackData = () => ({
    overview: {
      revenue: { current: 52340, previous: 45680, growth: 14.6, target: 60000 },
      customers: { current: 1245, previous: 1120, growth: 11.2, target: 1500 },
      conversion: { current: 3.4, previous: 2.9, growth: 17.2, target: 4.0 },
      messages: { current: 156, previous: 142, growth: 9.9, target: 200 },
      inventory: { current: 89, previous: 82, growth: 8.5, target: 95 },
      satisfaction: { current: 4.8, previous: 4.6, growth: 4.3, target: 4.9 }
    },
    financial: {
      totalSales: 52340,
      totalTransactions: 1247,
      netProfit: 28700,
      totalExpenses: 23640,
      cashFlow: 45000
    },
    channels: [
      { name: 'WhatsApp', value: 45, growth: 12, color: '#25D366', icon: WhatsApp, volume: 234 },
      { name: 'Instagram', value: 32, growth: 8, color: '#E4405F', icon: Instagram, volume: 167 },
      { name: 'Facebook', value: 28, growth: -2, color: '#1877F2', icon: Facebook, volume: 145 },
      { name: 'Email', value: 18, growth: 5, color: '#EA4335', icon: Email, volume: 89 }
    ],
    analytics: {
      revenueData: [12000, 19000, 15000, 22000, 18000, 23450, 28000, 32000, 29000, 35000, 38000, 42000],
      customerData: [25, 30, 28, 35, 40, 45, 48, 52, 55, 58, 62, 65],
      conversionData: [2.1, 2.4, 2.2, 2.8, 2.6, 3.1, 3.4, 3.2, 3.6, 3.8, 4.0, 4.2],
      interactionVolume: [45, 52, 48, 61, 55, 49, 67, 58, 62, 71, 65, 69]
    },
    insights: [
      {
        id: 1,
        type: 'success',
        title: 'Tendencia Positiva Detectada',
        message: 'El crecimiento de ingresos ha superado las proyecciones en un 15% este mes.',
        confidence: 0.94,
        action: 'Mantener estrategia actual',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        priority: 'high'
      },
      {
        id: 2,
        type: 'opportunity',
        title: 'Oportunidad en Instagram',
        message: 'El engagement en Instagram ha aumentado un 25%. Considera aumentar el presupuesto en esta plataforma.',
        confidence: 0.82,
        action: 'Optimizar campañas',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        priority: 'medium'
      },
      {
        id: 3,
        type: 'warning',
        title: 'Atención: Stock Bajo',
        message: '3 productos están por debajo del nivel mínimo de inventario.',
        confidence: 0.76,
        action: 'Revisar inventario',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        priority: 'high'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'sale',
        title: 'Nueva venta realizada',
        description: 'Venta #2845 por $450.00',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        user: 'María González',
        amount: 450.00,
        status: 'completed'
      },
      {
        id: 2,
        type: 'customer',
        title: 'Nuevo cliente registrado',
        description: 'Carlos Rodríguez se registró en el sistema',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        user: 'Sistema',
        status: 'success'
      },
      {
        id: 3,
        type: 'inventory',
        title: 'Alerta de inventario',
        description: 'Producto "Laptop Dell" por debajo del mínimo',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        user: 'Sistema',
        status: 'warning'
      },
      {
        id: 4,
        type: 'message',
        title: 'Mensaje automático enviado',
        description: 'Respuesta automática a consulta de WhatsApp',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        user: 'Bot IA',
        status: 'completed'
      }
    ],
    performance: {
      responseTime: 2.4,
      uptime: 99.9,
      accuracy: 94.2,
      automation: 87.5
    }
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Reemplazar con llamadas reales a tus APIs cuando estén listas
      // const [metrics, financial, conversions] = await Promise.all([
      //   fetchWithAuth(`${API_ENDPOINTS.metrics}?range=${timeRange}`),
      //   fetchWithAuth(`${API_ENDPOINTS.financial}?range=${timeRange}`),
      //   fetchWithAuth(`${API_ENDPOINTS.conversions}?range=${timeRange}`)
      // ]);

      // Simular carga de datos
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Por ahora usamos datos mock, pero estructurados para tu API
      setData(getFallbackData());
    } catch (err) {
      setError(err.message);
      setData(getFallbackData());
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// 🔥 COMPONENTES DEL DASHBOARD

const ChangeIndicator = ({ value }) => {
  if (value > 0) {
    return <ArrowUpward sx={{ fontSize: 16, color: '#10b981' }} />;
  }
  if (value < 0) {
    return <ArrowDownward sx={{ fontSize: 16, color: '#ef4444' }} />;
  }
  return <TrendingUp sx={{ fontSize: 16, color: '#6b7280' }} />;
};

const ProgressBar = ({ value, color, height = 8 }) => (
  <Box sx={{ 
    width: '100%', 
    height, 
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
    mb: 1
  }}>
    <Box
      sx={{
        width: `${value}%`,
        height: '100%',
        background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
        borderRadius: 4,
        transition: 'width 0.5s ease-in-out'
      }}
    />
  </Box>
);

const StatCard = React.memo(({ 
  title, 
  value, 
  change, 
  subtitle, 
  icon: Icon, 
  color = '#2563eb', 
  chart,
  target,
  loading = false 
}) => {
  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    if (typeof num === 'number' && num < 10) {
      return num.toFixed(1);
    }
    if (typeof num === 'number') {
      return num.toLocaleString();
    }
    return num;
  };

  if (loading) {
    return (
      <Card sx={{ 
        borderRadius: '16px',
        p: 3,
        height: '100%',
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
        border: '1px solid #f1f5f9',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
      }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    );
  }

  const progress = target ? (value / target) * 100 : 0;

  return (
    <Card 
      sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
        border: '1px solid #f1f5f9',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.12)'
        },
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h2" fontWeight={800} sx={{ 
              mb: 1,
              background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}>
              {formatNumber(value)}
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: '#1f2937', fontSize: { xs: '0.9rem', md: '1rem' } }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
              borderRadius: '12px',
              border: `1px solid ${alpha(color, 0.1)}`
            }}
          >
            <Icon sx={{ fontSize: { xs: 24, md: 28 }, color: color }} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ChangeIndicator value={change} />
            <Chip 
              label={`${change > 0 ? '+' : ''}${change}%`} 
              size="small"
              sx={{ 
                background: change > 0 ? 
                  'rgba(16, 185, 129, 0.1)' : 
                  'rgba(239, 68, 68, 0.1)',
                color: change > 0 ? '#10b981' : '#ef4444',
                fontWeight: 700,
                fontSize: '0.75rem',
                border: `1px solid ${change > 0 ? 
                  'rgba(16, 185, 129, 0.2)' : 
                  'rgba(239, 68, 68, 0.2)'}`
              }}
            />
          </Box>
          
          {target && (
            <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
              Meta: {formatNumber(target)}
            </Typography>
          )}
        </Box>

        {target && (
          <Box sx={{ mt: 2 }}>
            <ProgressBar value={Math.min(progress, 100)} color={color} />
            <Typography variant="caption" sx={{ color: '#6b7280' }}>
              {progress.toFixed(1)}% del objetivo
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
});

// 🔥 GRAFICO CORREGIDO - BARRAS DE ABAJO HACIA ARRIBA
const PerformanceChart = ({ data, timeRange, onTimeRangeChange, loading = false }) => {
  const revenueData = data?.revenueData || [12000, 19000, 15000, 22000, 18000, 23450, 28000, 32000, 29000, 35000, 38000, 42000];
  const interactionData = data?.interactionVolume || [45, 52, 48, 61, 55, 49, 67, 58, 62, 71, 65, 69];
  const maxRevenue = Math.max(...revenueData);
  const maxInteractions = Math.max(...interactionData);

  // Etiquetas según el rango de tiempo
  const getLabels = () => {
    switch (timeRange) {
      case 'week':
        return ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
      case 'month':
        return ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
      case 'quarter':
        return ['Mes 1', 'Mes 2', 'Mes 3'];
      case 'year':
        return ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      default:
        return revenueData.map((_, i) => `Día ${i + 1}`);
    }
  };

  const labels = getLabels();

  if (loading) {
    return (
      <Card sx={{ 
        p: 3, 
        height: 400,
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
        border: '1px solid #f1f5f9',
        borderRadius: '16px'
      }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    );
  }

  return (
    <Card sx={{ 
      height: '100%',
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
      border: '1px solid #f1f5f9',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937' }}>
              📊 Rendimiento General
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.8rem' }}>
              Ingresos vs Interacciones - Comparativa visual
            </Typography>
          </Box>
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
                onClick={() => onTimeRangeChange(range)}
                size="small"
                sx={{
                  background: timeRange === range ? 
                    'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'transparent',
                  color: timeRange === range ? 'white' : '#6b7280',
                  borderColor: timeRange === range ? 'transparent' : '#e5e7eb',
                  fontSize: '0.75rem'
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Gráfico de Barras Corregido - De abajo hacia arriba */}
        <Box sx={{ height: 250, display: 'flex', alignItems: 'end', gap: 1, mb: 3, px: 1 }}>
          {revenueData.slice(0, labels.length).map((value, index) => (
            <Box key={index} sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-end'
            }}>
              {/* Barra de Ingresos */}
              <Tooltip title={`Ingresos: $${value.toLocaleString()}`} arrow>
                <Box
                  sx={{
                    width: '70%',
                    minWidth: '12px',
                    height: `${(value / maxRevenue) * 100}%`,
                    background: 'linear-gradient(180deg, #2563eb 0%, rgba(37, 99, 235, 0.8) 100%)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    marginBottom: '2px',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      background: 'linear-gradient(180deg, #2563eb 0%, rgba(37, 99, 235, 1) 100%)'
                    }
                  }}
                />
              </Tooltip>

              {/* Barra de Interacciones */}
              <Tooltip title={`Interacciones: ${interactionData[index]}`} arrow>
                <Box
                  sx={{
                    width: '70%',
                    minWidth: '12px',
                    height: `${(interactionData[index] / maxInteractions) * 60}%`,
                    background: 'linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.8) 100%)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      background: 'linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 1) 100%)'
                    }
                  }}
                />
              </Tooltip>

              <Typography variant="caption" sx={{ 
                mt: 1, 
                fontWeight: 600, 
                color: '#6b7280',
                fontSize: '0.7rem'
              }}>
                {labels[index]}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Leyenda del Gráfico */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, backgroundColor: '#2563eb', borderRadius: '2px' }} />
              <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
                Ingresos ($)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, backgroundColor: '#10b981', borderRadius: '2px' }} />
              <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
                Interacciones
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />
            <Typography variant="body2" fontWeight={600} sx={{ color: '#10b981', fontSize: '0.8rem' }}>
              +{((revenueData[revenueData.length - 1] - revenueData[0]) / revenueData[0] * 100).toFixed(1)}% crecimiento
            </Typography>
          </Box>
        </Box>

        {/* Información Adicional */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: 2,
          p: 2,
          background: 'rgba(248, 250, 252, 0.8)',
          borderRadius: '8px',
          border: '1px solid #f1f5f9'
        }}>
          <Box>
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
              Ingreso Promedio
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: '#1f2937' }}>
              ${(revenueData.reduce((a, b) => a + b, 0) / revenueData.length).toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
              Interacciones Totales
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: '#1f2937' }}>
              {interactionData.reduce((a, b) => a + b, 0)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
              Mejor Día
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: '#1f2937' }}>
              ${Math.max(...revenueData).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// ... (Los otros componentes se mantienen igual: ChannelPerformance, AIInsightCard, RecentActivity, etc.)
// Solo voy a incluir los componentes esenciales para no hacer el código demasiado largo

const ChannelPerformance = React.memo(({ channel, loading = false }) => {
  const IconComponent = channel?.icon;
  
  if (loading) {
    return (
      <Card sx={{ 
        p: 2, 
        height: 100,
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
        border: '1px solid #f1f5f9',
        borderRadius: '12px'
      }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    );
  }

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${alpha(channel.color, 0.1)} 0%, ${alpha('#ffffff', 0.8)} 100%)`,
        border: `1px solid ${alpha(channel.color, 0.2)}`,
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: alpha(channel.color, 0.4),
          boxShadow: `0 8px 32px ${alpha(channel.color, 0.15)}`
        },
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            sx={{
              p: 1,
              background: alpha(channel.color, 0.1),
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconComponent sx={{ fontSize: 20, color: channel.color }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937', fontSize: '0.9rem' }}>
              {channel.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h4" fontWeight={800} sx={{ color: channel.color, fontSize: '1.25rem' }}>
                {channel.value}%
              </Typography>
              <Chip 
                label={`${channel.growth > 0 ? '+' : ''}${channel.growth}%`} 
                size="small"
                sx={{ 
                  background: channel.growth > 0 ? 
                    'rgba(16, 185, 129, 0.1)' : 
                    'rgba(239, 68, 68, 0.1)',
                  color: channel.growth > 0 ? '#10b981' : '#ef4444',
                  fontWeight: 600,
                  fontSize: '0.7rem'
                }}
              />
            </Box>
          </Box>
        </Box>

        <ProgressBar value={channel.value} color={channel.color} height={6} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
            Participación
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem', fontWeight: 600 }}>
            {channel.volume} interacciones
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
});

// 🔥 COMPONENTE PRINCIPAL DEL DASHBOARD
const Dashboard = () => {
  const { user } = useAuth();
  const isMobile = useMediaQuery('(max-width:900px)');
  
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('week');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  const { data: dashboardData, loading, error, refetch } = useDashboardData(timeRange);

  const showNotification = useCallback((message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  }, []);

  const handleRefresh = useCallback(async () => {
    await refetch();
    showNotification('Datos actualizados correctamente', 'success');
  }, [refetch, showNotification]);

  // Memoizar valores computados
  const mainMetrics = useMemo(() => [
    {
      icon: AttachMoney,
      title: "Ingresos Totales",
      value: dashboardData?.financial?.totalSales || dashboardData?.overview?.revenue?.current,
      change: dashboardData?.overview?.revenue?.growth,
      subtitle: "Ingresos mensuales",
      color: "#10b981",
      target: dashboardData?.overview?.revenue?.target
    },
    {
      icon: People,
      title: "Clientes Activos",
      value: dashboardData?.overview?.customers?.current,
      change: dashboardData?.overview?.customers?.growth,
      subtitle: "Base de clientes",
      color: "#2563eb",
      target: dashboardData?.overview?.customers?.target
    },
    {
      icon: TrendingUp,
      title: "Tasa Conversión",
      value: dashboardData?.overview?.conversion?.current,
      change: dashboardData?.overview?.conversion?.growth,
      subtitle: "Eficiencia de ventas",
      color: "#f59e0b",
      target: dashboardData?.overview?.conversion?.target
    },
    {
      icon: Chat,
      title: "Interacciones",
      value: dashboardData?.overview?.messages?.current,
      change: dashboardData?.overview?.messages?.growth,
      subtitle: "Mensajes hoy",
      color: "#8b5cf6",
      target: dashboardData?.overview?.messages?.target
    },
    {
      icon: Inventory,
      title: "Inventario",
      value: dashboardData?.overview?.inventory?.current,
      change: dashboardData?.overview?.inventory?.growth,
      subtitle: "Nivel de stock",
      color: "#ec4899",
      target: dashboardData?.overview?.inventory?.target
    },
    {
      icon: Star,
      title: "Satisfacción",
      value: dashboardData?.overview?.satisfaction?.current,
      change: dashboardData?.overview?.satisfaction?.growth,
      subtitle: "Calificación promedio",
      color: "#06b6d4",
      target: dashboardData?.overview?.satisfaction?.target
    }
  ], [dashboardData]);

  if (loading && !dashboardData) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Analytics sx={{ fontSize: 60, color: '#2563eb', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#6b7280' }}>
            Cargando dashboard...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        py: 1
      }}>
        <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4, px: isMobile ? 2 : 3 }}>
          {/* Header del Dashboard */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 3,
              mb: 4
            }}>
              <Box>
                <Typography 
                  variant={isMobile ? "h4" : "h2"} 
                  fontWeight={800} 
                  gutterBottom
                  sx={{ 
                    background: 'linear-gradient(135deg, #1e293b 0%, #374151 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    lineHeight: 1.2
                  }}
                >
                  Dashboard Executive
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, color: '#6b7280' }}>
                  Tiempo real • {user?.business?.name || 'Tu Negocio'} • {new Date().toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    icon={<SmartToy />} 
                    label="IA Activa" 
                    sx={{ 
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      color: 'white'
                    }}
                  />
                  <Chip 
                    label="Tiempo Real" 
                    sx={{ 
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white'
                    }}
                  />
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Actualizar datos">
                  <IconButton onClick={handleRefresh} sx={{ 
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
                    border: '1px solid rgba(37, 99, 235, 0.1)',
                    '&:hover': { 
                      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)'
                    }
                  }}>
                    <Refresh sx={{ color: '#2563eb' }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Tabs 
              value={activeTab} 
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                borderBottom: '1px solid #f1f5f9',
                '& .MuiTab-root': {
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  minHeight: 48,
                  color: '#6b7280',
                  '&.Mui-selected': {
                    color: '#2563eb'
                  }
                }
              }}
            >
              <Tab icon={<Analytics />} label="Visión General" />
              <Tab icon={<BarChart />} label="Análisis Detallado" />
              <Tab icon={<Timeline />} label="Tendencias" />
              <Tab icon={<SmartToy />} label="IA & Automatización" />
            </Tabs>
          </Box>

          {error && (
            <Alert severity="warning" sx={{ mb: 3, borderRadius: '8px' }}>
              {error} - Mostrando datos de demostración
            </Alert>
          )}

          {/* Grid Principal del Dashboard */}
          <Grid container spacing={3}>
            {/* Métricas principales - 6 tarjetas */}
            {mainMetrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={metric.title}>
                <StatCard {...metric} loading={loading} />
              </Grid>
            ))}

            {/* Gráfica principal de rendimiento CORREGIDA */}
            <Grid item xs={12} lg={8}>
              <PerformanceChart 
                data={dashboardData?.analytics}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
                loading={loading}
              />
            </Grid>

            {/* Canales de performance */}
            <Grid item xs={12} lg={4}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937' }}>
                📊 Performance por Canal
              </Typography>
              <Grid container spacing={2}>
                {(loading ? Array(4).fill({}) : dashboardData?.channels || []).map((channel, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <ChannelPerformance channel={channel} loading={loading} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Insights de IA */}
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#1f2937' }}>
                <SmartToy sx={{ color: '#2563eb' }} />
                Inteligencia Artificial & Recomendaciones
              </Typography>
              <Grid container spacing={3}>
                {(loading ? Array(3).fill({}) : dashboardData?.insights || []).map((insight, index) => (
                  <Grid item xs={12} md={6} lg={4} key={insight.id || index}>
                    <AIInsightCard insight={insight} loading={loading} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={notification.severity} sx={{ borderRadius: '8px' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;
