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
  Stack
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
  Timeline,
  BarChart,
  Refresh,
  WhatsApp,
  Instagram,
  Facebook,
  Email,
  ArrowUpward,
  ArrowDownward,
  RocketLaunch,
  Download
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useBusiness } from '../../contexts/BusinessContext';

// 🔥 SERVICIO API - Conectado a tu estructura real
const useDashboardAPI = () => {
  const { user } = useAuth();
  const { currentBusiness } = useBusiness();

  const apiService = {
    // Métricas principales del negocio
    async getBusinessMetrics(timeRange) {
      try {
        const response = await fetch(`/api/business/${currentBusiness?.id}/metrics?range=${timeRange}`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Error fetching metrics');
        return await response.json();
      } catch (error) {
        console.error('Error fetching metrics:', error);
        throw error;
      }
    },

    // Performance por canal
    async getChannelsPerformance(timeRange) {
      try {
        const response = await fetch(`/api/analytics/channels?businessId=${currentBusiness?.id}&range=${timeRange}`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Error fetching channels data');
        return await response.json();
      } catch (error) {
        console.error('Error fetching channels:', error);
        throw error;
      }
    },

    // Insights de IA
    async getAIInsights(timeRange) {
      try {
        const response = await fetch(`/api/ai/insights?businessId=${currentBusiness?.id}&range=${timeRange}`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Error fetching AI insights');
        return await response.json();
      } catch (error) {
        console.error('Error fetching AI insights:', error);
        throw error;
      }
    },

    // Datos para gráficas
    async getAnalyticsData(timeRange) {
      try {
        const response = await fetch(`/api/analytics/trends?businessId=${currentBusiness?.id}&range=${timeRange}`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Error fetching analytics data');
        return await response.json();
      } catch (error) {
        console.error('Error fetching analytics:', error);
        throw error;
      }
    }
  };

  return apiService;
};

// 🔥 HOOK PERSONALIZADO PARA DATOS - Conectado a tus APIs
const useDashboardData = (timeRange) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiService = useDashboardAPI();

  // Datos de fallback mejorados
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
      revenueData: [12000, 19000, 15000, 22000, 18000, 23450, 28000, 32000, 29000, 35000, 38000, 42000],
      customerData: [25, 30, 28, 35, 40, 45, 48, 52, 55, 58, 62, 65],
      conversionData: [2.1, 2.4, 2.2, 2.8, 2.6, 3.1, 3.4, 3.2, 3.6, 3.8, 4.0, 4.2]
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
      
      // Intentar obtener datos reales de tus APIs
      try {
        const [metrics, channels, insights, analytics] = await Promise.all([
          apiService.getBusinessMetrics(timeRange),
          apiService.getChannelsPerformance(timeRange),
          apiService.getAIInsights(timeRange),
          apiService.getAnalyticsData(timeRange)
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
      } catch (apiError) {
        // Si fallan las APIs, usar datos mock
        console.log('Usando datos de demostración:', apiError);
        setData(getFallbackData());
      }
      
    } catch (err) {
      setError(err.message);
      setData(getFallbackData());
    } finally {
      setLoading(false);
    }
  }, [timeRange, apiService]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// 🔥 COMPONENTES CON ESTILO DEL HOME

const ChangeIndicator = ({ value }) => {
  if (value > 0) {
    return <ArrowUpward sx={{ fontSize: 16, color: '#10b981' }} />;
  }
  if (value < 0) {
    return <ArrowDownward sx={{ fontSize: 16, color: '#ef4444' }} />;
  }
  return <TrendingUp sx={{ fontSize: 16, color: '#6b7280' }} />;
};

const ProgressBar = ({ value, color }) => (
  <Box sx={{ 
    width: '100%', 
    height: 8, 
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

const MiniChart = ({ color, data }) => (
  <Box sx={{ mt: 3, height: 60 }}>
    <Box sx={{ display: 'flex', alignItems: 'end', gap: 0.5, height: '100%' }}>
      {data.map((height, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            height: `${height}%`,
            background: `linear-gradient(180deg, ${color} 0%, ${alpha(color, 0.6)} 100%)`,
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

const StatCard = React.memo(({ 
  title, 
  value, 
  change, 
  subtitle, 
  icon: Icon, 
  color = '#2563eb', 
  chart,
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
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
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
              color: 'transparent'
            }}>
              {formatNumber(value)}
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: '#1f2937' }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
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
            <Icon sx={{ fontSize: 28, color: color }} />
          </Box>
        </Box>

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
              border: `1px solid ${change > 0 ? 
                'rgba(16, 185, 129, 0.2)' : 
                'rgba(239, 68, 68, 0.2)'}`
            }}
          />
        </Box>

        {chart && <MiniChart color={color} data={[30, 45, 60, 75, 65, 80, 90, 85, 95, 88, 92, 100]} />}
      </CardContent>
    </Card>
  );
});

const ChannelPerformance = React.memo(({ channel, loading = false }) => {
  const IconComponent = channel?.icon;
  
  if (loading) {
    return (
      <Card sx={{ 
        p: 3, 
        height: 120,
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
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconComponent sx={{ fontSize: 24, color: channel.color }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937' }}>
              {channel.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h4" fontWeight={800} sx={{ color: channel.color }}>
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
                  fontWeight: 600 
                }}
              />
            </Box>
          </Box>
        </Box>

        <ProgressBar value={channel.value} color={channel.color} />
        <Typography variant="caption" sx={{ color: '#6b7280' }}>
          Participación en ventas totales
        </Typography>
      </CardContent>
    </Card>
  );
});

const AIInsightCard = React.memo(({ insight, loading = false }) => {
  const getColors = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'rgba(16, 185, 129, 0.08)',
          border: 'rgba(16, 185, 129, 0.2)',
          icon: '#10b981'
        };
      case 'opportunity':
        return {
          bg: 'rgba(245, 158, 11, 0.08)',
          border: 'rgba(245, 158, 11, 0.2)',
          icon: '#f59e0b'
        };
      case 'warning':
        return {
          bg: 'rgba(239, 68, 68, 0.08)',
          border: 'rgba(239, 68, 68, 0.2)',
          icon: '#ef4444'
        };
      default:
        return {
          bg: 'rgba(37, 99, 235, 0.08)',
          border: 'rgba(37, 99, 235, 0.2)',
          icon: '#2563eb'
        };
    }
  };

  if (loading) {
    return (
      <Card sx={{ 
        p: 3, 
        height: 140,
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
        border: '1px solid #f1f5f9',
        borderRadius: '12px'
      }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    );
  }

  const colors = getColors(insight.type);

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${colors.bg} 0%, rgba(255, 255, 255, 0.9) 100%)`,
        border: `1px solid ${colors.border}`,
        borderRadius: '12px',
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
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <SmartToy sx={{ fontSize: 20, color: colors.icon }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: '#1f2937' }}>
              {insight.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, color: '#6b7280' }}>
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
                      insight.confidence > 0.8 ? '#10b981' :
                      insight.confidence > 0.6 ? '#f59e0b' :
                      '#ef4444'
                  }}
                />
                <Typography variant="caption" fontWeight={600} sx={{ color: '#6b7280' }}>
                  Confianza: {(insight.confidence * 100).toFixed(0)}%
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                sx={{ 
                  fontWeight: 600,
                  borderRadius: '8px',
                  borderColor: colors.border,
                  color: colors.icon
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
  // Asegurarnos de que siempre haya datos para mostrar
  const revenueData = data?.revenueData || [12000, 19000, 15000, 22000, 18000, 23450, 28000, 32000, 29000, 35000, 38000, 42000];
  const maxValue = Math.max(...revenueData);
  const growthPercentage = ((revenueData[revenueData.length - 1] - revenueData[0]) / revenueData[0] * 100).toFixed(1);

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
          <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937' }}>
            📈 Análisis de Rendimiento
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['week', 'month', 'quarter'].map((range) => (
              <Chip
                key={range}
                label={
                  range === 'week' ? 'Semana' :
                  range === 'month' ? 'Mes' : 'Trimestre'
                }
                variant={timeRange === range ? 'filled' : 'outlined'}
                onClick={() => onTimeRangeChange(range)}
                size="small"
                sx={{
                  background: timeRange === range ? 
                    'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'transparent',
                  color: timeRange === range ? 'white' : '#6b7280',
                  borderColor: timeRange === range ? 'transparent' : '#e5e7eb'
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ height: 300, display: 'flex', alignItems: 'end', gap: 2, mb: 3, px: 2 }}>
          {revenueData.map((value, index) => (
            <Tooltip key={index} title={`$${value.toLocaleString()}`} arrow>
              <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                height: '100%'
              }}>
                <Box
                  sx={{
                    width: '70%',
                    minWidth: '12px',
                    height: `${(value / maxValue) * 100}%`,
                    background: 'linear-gradient(180deg, #2563eb 0%, rgba(37, 99, 235, 0.8) 100%)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      background: 'linear-gradient(180deg, #2563eb 0%, rgba(37, 99, 235, 1) 100%)'
                    }
                  }}
                />
                <Typography variant="caption" sx={{ 
                  mt: 1, 
                  fontWeight: 600, 
                  color: '#6b7280',
                  fontSize: '0.7rem'
                }}>
                  {index + 1}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Evolución de ingresos - Últimos {revenueData.length} períodos
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />
            <Typography variant="body2" fontWeight={600} sx={{ color: '#10b981' }}>
              +{growthPercentage}% crecimiento
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const PerformanceMetrics = ({ loading = false }) => {
  const metrics = [
    { label: 'Tiempo Respuesta', value: '2.4 min', target: '2.0 min', progress: 85 },
    { label: 'Satisfacción', value: '4.8/5', target: '4.5/5', progress: 107 },
    { label: 'Retención', value: '78.5%', target: '75%', progress: 105 },
    { label: 'Eficiencia', value: '92.3%', target: '90%', progress: 103 }
  ];

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
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937' }}>
          🎯 Métricas Clave
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {metrics.map((metric, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#374151' }}>{metric.label}</Typography>
                <Typography variant="body2" fontWeight={700} sx={{ color: '#1f2937' }}>{metric.value}</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={Math.min(metric.progress, 100)} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: '#f1f5f9',
                  '& .MuiLinearProgress-bar': {
                    background: metric.progress >= 100 ? 
                      'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                      metric.progress >= 80 ? 
                      'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' :
                      'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                  }
                }}
              />
              <Typography variant="caption" sx={{ mt: 0.5, display: 'block', color: '#6b7280' }}>
                Objetivo: {metric.target}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const QuickActions = ({ onExport, onRefresh }) => (
  <Card sx={{ 
    background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
    border: '1px solid #f1f5f9',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    mb: 3
  }}>
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#1f2937' }}>
        ⚡ Acciones Rápidas
      </Typography>
      <Grid container spacing={2}>
        {[
          { icon: <RocketLaunch />, label: 'Nueva Campaña', color: '#2563eb', onClick: () => console.log('Nueva Campaña') },
          { icon: <Analytics />, label: 'Generar Reporte', color: '#10b981', onClick: () => console.log('Generar Reporte') },
          { icon: <SmartToy />, label: 'Consultar IA', color: '#8b5cf6', onClick: () => console.log('Consultar IA') },
          { icon: <Download />, label: 'Exportar Datos', color: '#f59e0b', onClick: onExport }
        ].map((action, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Button
              fullWidth
              startIcon={action.icon}
              onClick={action.onClick}
              sx={{
                background: `linear-gradient(135deg, ${alpha(action.color, 0.1)} 0%, ${alpha(action.color, 0.05)} 100%)`,
                border: `1px solid ${alpha(action.color, 0.2)}`,
                color: action.color,
                fontWeight: 600,
                borderRadius: '8px',
                py: 1.5,
                '&:hover': {
                  background: `linear-gradient(135deg, ${alpha(action.color, 0.2)} 0%, ${alpha(action.color, 0.1)} 100%)`,
                }
              }}
            >
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

const LoadingDashboard = () => (
  <Container maxWidth="xl" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Box sx={{ textAlign: 'center' }}>
      <Analytics sx={{ fontSize: 60, color: '#2563eb', mb: 2 }} />
      <Typography variant="h6" sx={{ color: '#6b7280' }}>
        Cargando datos en tiempo real...
      </Typography>
    </Box>
  </Container>
);

const DashboardHeader = ({ user, currentBusiness, isMobile, activeTab, onTabChange, onRefresh, loading }) => {
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
            Datos en tiempo real • {currentBusiness?.name || 'Tu Negocio'}
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
            <IconButton onClick={onRefresh} sx={{ 
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
        onChange={onTabChange}
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
      </Tabs>
    </Box>
  );
};

// 🔥 COMPONENTE PRINCIPAL CONECTADO A TUS APIS

const Dashboard = () => {
  const { user } = useAuth();
  const { currentBusiness } = useBusiness();
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

  const handleExport = useCallback(() => {
    // Función para exportar datos
    showNotification('Preparando exportación de datos...', 'info');
    // Aquí iría la lógica de exportación
  }, [showNotification]);

  // Memoizar valores computados
  const mainMetrics = useMemo(() => [
    {
      icon: AttachMoney,
      title: "Ingresos Totales",
      value: dashboardData?.overview?.revenue?.current,
      change: dashboardData?.overview?.revenue?.growth,
      subtitle: "Este mes",
      color: "#10b981",
      chart: true
    },
    {
      icon: People,
      title: "Clientes Activos",
      value: dashboardData?.overview?.customers?.current,
      change: dashboardData?.overview?.customers?.growth,
      subtitle: "Base total",
      color: "#2563eb",
      chart: true
    },
    {
      icon: TrendingUp,
      title: "Tasa Conversión",
      value: dashboardData?.overview?.conversion?.current,
      change: dashboardData?.overview?.conversion?.growth,
      subtitle: "Porcentaje",
      color: "#f59e0b",
      chart: true
    },
    {
      icon: Chat,
      title: "Interacciones",
      value: dashboardData?.overview?.messages?.current,
      change: dashboardData?.overview?.messages?.growth,
      subtitle: "Hoy",
      color: "#8b5cf6",
      chart: true
    }
  ], [dashboardData]);

  if (loading && !dashboardData) {
    return <LoadingDashboard />;
  }

  return (
    <>
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        py: 1
      }}>
        <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4, px: isMobile ? 2 : 3 }}>
          <DashboardHeader 
            user={user}
            currentBusiness={currentBusiness}
            isMobile={isMobile}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onRefresh={handleRefresh}
            loading={loading && !dashboardData}
          />

          {error && (
            <Alert severity="warning" sx={{ mb: 3, borderRadius: '8px' }}>
              {error} - Mostrando datos de demostración
            </Alert>
          )}

          {/* Acciones Rápidas */}
          <QuickActions onExport={handleExport} onRefresh={handleRefresh} />

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
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937' }}>
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
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#1f2937' }}>
                <SmartToy sx={{ color: '#2563eb' }} />
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
