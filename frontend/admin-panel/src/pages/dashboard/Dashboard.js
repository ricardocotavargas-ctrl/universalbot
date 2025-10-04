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
  Skeleton
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
  ArrowDownward
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// 🔥 CONSTANTES Y CONFIGURACIÓN
const API_ENDPOINTS = {
  metrics: '/api/business/metrics',
  channels: '/api/channels/performance',
  insights: '/api/ai/insights',
  analytics: '/api/analytics/trends'
};

const TIME_RANGES = [
  { value: 'today', label: 'Hoy' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
  { value: 'quarter', label: 'Trimestre' }
];

// 🔥 HOOK PERSONALIZADO PARA DATOS
const useDashboardData = (timeRange) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWithTimeout = async (url, params = {}, timeout = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const queryString = new URLSearchParams(params).toString();
      const fullUrl = queryString ? `${url}?${queryString}` : url;
      
      const response = await fetch(fullUrl, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } finally {
      clearTimeout(id);
    }
  };

  const getFallbackData = () => ({
    overview: {
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
    analytics: {
      revenueData: [12000, 19000, 15000, 22000, 18000, 23450, 28000],
      customerData: [25, 30, 28, 35, 40, 45, 48],
      conversionData: [2.1, 2.4, 2.2, 2.8, 2.6, 3.1, 3.4]
    },
    insights: [
      {
        type: 'success',
        title: 'Tendencia Positiva Detectada',
        message: 'El crecimiento de ingresos ha superado las proyecciones en un 15% este mes.',
        confidence: 0.94,
        action: 'Mantener estrategia actual'
      },
      {
        type: 'opportunity',
        title: 'Oportunidad en Instagram',
        message: 'El engagement en Instagram ha aumentado un 25%. Considera aumentar el presupuesto en esta plataforma.',
        confidence: 0.82,
        action: 'Optimizar campañas'
      },
      {
        type: 'warning',
        title: 'Atención: Tasa de Conversión',
        message: 'La tasa de conversión ha disminuido ligeramente. Revisa el funnel de ventas.',
        confidence: 0.76,
        action: 'Revisar funnel'
      }
    ]
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [metrics, channels, insights, analytics] = await Promise.all([
        fetchWithTimeout(API_ENDPOINTS.metrics, { timeRange }),
        fetchWithTimeout(API_ENDPOINTS.channels, { timeRange }),
        fetchWithTimeout(API_ENDPOINTS.insights, { timeRange }),
        fetchWithTimeout(API_ENDPOINTS.analytics, { timeRange })
      ]);

      setData({
        overview: {
          revenue: metrics.revenue || { current: 0, previous: 0, growth: 0 },
          customers: metrics.customers || { current: 0, previous: 0, growth: 0 },
          conversion: metrics.conversion || { current: 0, previous: 0, growth: 0 },
          messages: metrics.messages || { current: 0, previous: 0, growth: 0 }
        },
        channels: channels || [],
        analytics: analytics || {},
        insights: insights || []
      });
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

// 🔥 COMPONENTES MEJORADOS

const ChangeIndicator = ({ value }) => {
  if (value > 0) {
    return <ArrowUpward sx={{ fontSize: 16, color: 'success.main' }} />;
  }
  if (value < 0) {
    return <ArrowDownward sx={{ fontSize: 16, color: 'error.main' }} />;
  }
  return <TrendingUp sx={{ fontSize: 16, color: 'text.secondary' }} />;
};

const ProgressBar = ({ value, color }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      width: '100%', 
      height: 8, 
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      borderRadius: 4,
      overflow: 'hidden',
      mb: 1
    }}>
      <Box
        sx={{
          width: `${value}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
          borderRadius: 4,
          transition: 'width 0.5s ease-in-out'
        }}
      />
    </Box>
  );
};

const MiniChart = ({ color, data }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ mt: 3, height: 60 }}>
      <Box sx={{ display: 'flex', alignItems: 'end', gap: 0.5, height: '100%' }}>
        {data.map((height, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              height: `${height}%`,
              background: `linear-gradient(180deg, ${alpha(theme.palette[color].main, 0.8)} 0%, ${alpha(theme.palette[color].main, 0.4)} 100%)`,
              borderRadius: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const BackgroundGlow = ({ color }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 120,
        height: 120,
        background: `radial-gradient(circle, ${alpha(theme.palette[color].main, 0.1)} 0%, transparent 70%)`,
        borderRadius: '50%'
      }}
    />
  );
};

const StatCard = React.memo(({ 
  title, 
  value, 
  change, 
  subtitle, 
  icon: Icon, 
  color = 'primary', 
  chart,
  loading = false 
}) => {
  const theme = useTheme();

  const getChangeColor = (change) => {
    return change > 0 
      ? alpha(theme.palette.success.main, 0.1) 
      : alpha(theme.palette.error.main, 0.1);
  };

  const getChangeBorderColor = (change) => {
    return change > 0 
      ? alpha(theme.palette.success.main, 0.2) 
      : alpha(theme.palette.error.main, 0.2);
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    if (typeof num === 'number') {
      return num.toLocaleString();
    }
    return num;
  };

  if (loading) {
    return (
      <Card sx={{ borderRadius: 3, p: 3, height: 200 }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
        },
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h2" fontWeight={800} color={`${color}.main`} sx={{ mb: 1 }}>
              {formatNumber(value)}
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.15)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette[color].main, 0.1)}`
            }}
          >
            <Icon sx={{ fontSize: 28, color: `${color}.main` }} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ChangeIndicator value={change} />
          <Chip 
            label={`${change > 0 ? '+' : ''}${change}%`} 
            size="small"
            sx={{ 
              background: getChangeColor(change),
              color: change > 0 ? 'success.main' : 'error.main',
              fontWeight: 700,
              border: `1px solid ${getChangeBorderColor(change)}`
            }}
          />
        </Box>

        {chart && <MiniChart color={color} data={[30, 45, 60, 75, 65, 80, 90, 85, 95, 88, 92, 100]} />}
      </CardContent>

      <BackgroundGlow color={color} />
    </Card>
  );
});

const ChannelPerformance = React.memo(({ channel, loading = false }) => {
  const theme = useTheme();
  const IconComponent = channel?.icon;
  
  if (loading) {
    return (
      <Card sx={{ p: 3, height: 120 }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    );
  }

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${alpha(channel.color, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
        border: `1px solid ${alpha(channel.color, 0.2)}`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: alpha(channel.color, 0.4),
          boxShadow: `0 12px 40px ${alpha(channel.color, 0.15)}`
        },
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              background: alpha(channel.color, 0.1),
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconComponent sx={{ fontSize: 24, color: channel.color }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              {channel.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h4" fontWeight={800} color={channel.color}>
                {channel.value}%
              </Typography>
              <Chip 
                label={`${channel.growth > 0 ? '+' : ''}${channel.growth}%`} 
                size="small"
                color={channel.growth > 0 ? 'success' : 'error'}
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>
        </Box>

        <ProgressBar value={channel.value} color={channel.color} />
        <Typography variant="caption" color="text.secondary">
          Participación en ventas totales
        </Typography>
      </CardContent>
    </Card>
  );
});

const AIInsightCard = React.memo(({ insight, loading = false }) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Card sx={{ p: 3, height: 140 }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    );
  }

  const getColors = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: alpha(theme.palette.success.main, 0.08),
          border: alpha(theme.palette.success.main, 0.2),
          icon: theme.palette.success.main
        };
      case 'opportunity':
        return {
          bg: alpha(theme.palette.warning.main, 0.08),
          border: alpha(theme.palette.warning.main, 0.2),
          icon: theme.palette.warning.main
        };
      case 'warning':
        return {
          bg: alpha(theme.palette.error.main, 0.08),
          border: alpha(theme.palette.error.main, 0.2),
          icon: theme.palette.error.main
        };
      default:
        return {
          bg: alpha(theme.palette.primary.main, 0.08),
          border: alpha(theme.palette.primary.main, 0.2),
          icon: theme.palette.primary.main
        };
    }
  };

  const colors = getColors(insight.type);

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${colors.bg} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
        border: `1px solid ${colors.border}`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateX(8px)'
        },
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              p: 1.5,
              background: alpha(colors.icon, 0.1),
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <SmartToy sx={{ fontSize: 20, color: colors.icon }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              {insight.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
              {insight.message}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: 
                      insight.confidence > 0.8 ? theme.palette.success.main :
                      insight.confidence > 0.6 ? theme.palette.warning.main :
                      theme.palette.error.main
                  }}
                />
                <Typography variant="caption" fontWeight={600}>
                  Confianza: {(insight.confidence * 100).toFixed(0)}%
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                sx={{ 
                  fontWeight: 600,
                  borderRadius: 2
                }}
              >
                {insight.action}
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

const AnalyticsChart = ({ data, timeRange, onTimeRangeChange, loading = false }) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Card sx={{ p: 3, height: 400 }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    );
  }

  const revenueData = data?.revenueData || [12000, 19000, 15000, 22000, 18000, 23450, 28000];
  const maxValue = Math.max(...revenueData);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            📈 Análisis de Rendimiento
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {TIME_RANGES.map((range) => (
              <Chip
                key={range.value}
                label={range.label}
                variant={timeRange === range.value ? 'filled' : 'outlined'}
                onClick={() => onTimeRangeChange(range.value)}
                size="small"
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ height: 300, display: 'flex', alignItems: 'end', gap: 2, mb: 3 }}>
          {revenueData.map((value, index) => (
            <Tooltip key={index} title={`$${value.toLocaleString()}`} arrow>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '80%',
                    height: `${(value / maxValue) * 100}%`,
                    background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.6)} 100%)`,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`
                    }
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1, fontWeight: 600 }}>
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][index]}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Evolución de ingresos semanal
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
            <Typography variant="body2" fontWeight={600} color="success.main">
              +14.6% crecimiento
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const PerformanceMetrics = ({ loading = false }) => {
  const theme = useTheme();

  const metrics = [
    { label: 'Tiempo Respuesta', value: '2.4 min', target: '2.0 min', progress: 85 },
    { label: 'Satisfacción', value: '4.8/5', target: '4.5/5', progress: 107 },
    { label: 'Retención', value: '78.5%', target: '75%', progress: 105 },
    { label: 'Eficiencia', value: '92.3%', target: '90%', progress: 103 }
  ];

  if (loading) {
    return (
      <Card sx={{ p: 3, height: 400 }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
          🎯 Métricas Clave
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {metrics.map((metric, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>{metric.label}</Typography>
                <Typography variant="body2" fontWeight={700}>{metric.value}</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={Math.min(metric.progress, 100)} 
                color={metric.progress >= 100 ? 'success' : metric.progress >= 80 ? 'warning' : 'error'}
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1)
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                Objetivo: {metric.target}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const LoadingDashboard = () => (
  <Container maxWidth="xl" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Box sx={{ textAlign: 'center' }}>
      <Analytics sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6">
        Cargando datos en tiempo real...
      </Typography>
    </Box>
  </Container>
);

const DashboardHeader = ({ user, isMobile, activeTab, onTabChange, onRefresh, loading }) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" height={60} width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={30} width="40%" sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={48} />
      </Box>
    );
  }

  return (
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
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.2
            }}
          >
            Dashboard Executive
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Datos en tiempo real • {user?.business?.name || 'Tu Negocio'}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip 
              icon={<SmartToy />} 
              label="IA Activa" 
              color="primary" 
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            <Chip 
              label="Tiempo Real" 
              color="success" 
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Actualizar datos">
            <IconButton onClick={onRefresh} sx={{ 
              background: alpha(theme.palette.primary.main, 0.1),
              '&:hover': { background: alpha(theme.palette.primary.main, 0.2) }
            }}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Tabs 
        value={activeTab} 
        onChange={onTabChange}
        sx={{
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          '& .MuiTab-root': {
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '1rem',
            minHeight: 48
          }
        }}
      >
        <Tab icon={<Analytics />} label="Visión General" />
        <Tab icon={<BarChart />} label="Análisis Detallado" />
        <Tab icon={<Timeline />} label="Tendencias" />
      </Tabs>
    </Box>
  );
};

// 🔥 COMPONENTE PRINCIPAL MEJORADO

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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
      value: dashboardData?.overview?.revenue?.current,
      change: dashboardData?.overview?.revenue?.growth,
      subtitle: "Este mes",
      color: "success",
      chart: true
    },
    {
      icon: People,
      title: "Clientes Activos",
      value: dashboardData?.overview?.customers?.current,
      change: dashboardData?.overview?.customers?.growth,
      subtitle: "Base total",
      color: "primary",
      chart: true
    },
    {
      icon: TrendingUp,
      title: "Tasa Conversión",
      value: dashboardData?.overview?.conversion?.current,
      change: dashboardData?.overview?.conversion?.growth,
      subtitle: "Porcentaje",
      color: "warning",
      chart: true
    },
    {
      icon: Chat,
      title: "Interacciones",
      value: dashboardData?.overview?.messages?.current,
      change: dashboardData?.overview?.messages?.growth,
      subtitle: "Hoy",
      color: "info",
      chart: true
    }
  ], [dashboardData]);

  if (loading && !dashboardData) {
    return <LoadingDashboard />;
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4, px: isMobile ? 1 : 3 }}>
        <DashboardHeader 
          user={user}
          isMobile={isMobile}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onRefresh={handleRefresh}
          loading={loading && !dashboardData}
        />

        {error && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {error} - Mostrando datos de demostración
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Métricas principales */}
          {mainMetrics.map((metric, index) => (
            <Grid item xs={12} sm={6} lg={3} key={metric.title}>
              <StatCard {...metric} loading={loading} />
            </Grid>
          ))}

          {/* Gráfica principal */}
          <Grid item xs={12} lg={8}>
            <AnalyticsChart 
              data={dashboardData?.analytics}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
              loading={loading}
            />
          </Grid>

          {/* Canales de performance */}
          <Grid item xs={12} lg={4}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              📊 Performance por Canal
            </Typography>
            <Grid container spacing={2}>
              {(loading ? Array(4).fill({}) : dashboardData?.channels || []).map((channel, index) => (
                <Grid item xs={12} key={index}>
                  <ChannelPerformance channel={channel} loading={loading} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Insights de IA */}
          <Grid item xs={12} lg={8}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmartToy color="primary" />
              Inteligencia Artificial & Recomendaciones
            </Typography>
            <Grid container spacing={3}>
              {(loading ? Array(3).fill({}) : dashboardData?.insights || []).map((insight, index) => (
                <Grid item xs={12} key={index}>
                  <AIInsightCard insight={insight} loading={loading} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Métricas de performance */}
          <Grid item xs={12} lg={4}>
            <PerformanceMetrics loading={loading} />
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;
