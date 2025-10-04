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

// 🔥 HOOK PERSONALIZADO PARA DATOS DEL DASHBOARD
const useDashboardData = (timeRange = 'week', activeTab = 0) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFallbackData = (tabIndex = 0) => {
    const baseData = {
      overview: {
        revenue: { current: 52340, previous: 45680, growth: 14.6, target: 60000 },
        customers: { current: 1245, previous: 1120, growth: 11.2, target: 1500 },
        conversion: { current: 3.4, previous: 2.9, growth: 17.2, target: 4.0 },
        messages: { current: 156, previous: 142, growth: 9.9, target: 200 },
        inventory: { current: 89, previous: 82, growth: 8.5, target: 95 },
        satisfaction: { current: 4.8, previous: 4.6, growth: 4.3, target: 4.9 }
      },
      channels: [
        { name: 'WhatsApp', value: 45, growth: 12, color: '#25D366', icon: WhatsApp, volume: 234 },
        { name: 'Instagram', value: 32, growth: 8, color: '#E4405F', icon: Instagram, volume: 167 },
        { name: 'Facebook', value: 28, growth: -2, color: '#1877F2', icon: Facebook, volume: 145 },
        { name: 'Email', value: 18, growth: 5, color: '#EA4335', icon: Email, volume: 89 }
      ],
      performance: {
        responseTime: 2.4,
        uptime: 99.9,
        accuracy: 94.2,
        automation: 87.5
      },
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
        }
      ],
      insights: [
        {
          id: 1,
          type: 'success',
          title: 'Tendencia Positiva Detectada',
          message: 'El crecimiento de ingresos ha superado las proyecciones en un 15% este mes.',
          confidence: 0.94,
          action: 'Mantener estrategia',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          priority: 'high'
        },
        {
          id: 2,
          type: 'opportunity',
          title: 'Oportunidad en Instagram',
          message: 'El engagement en Instagram ha aumentado un 25%. Considera aumentar el presupuesto.',
          confidence: 0.82,
          action: 'Optimizar campañas',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          priority: 'medium'
        }
      ]
    };

    // Datos específicos por tab
    if (tabIndex === 0) {
      return {
        ...baseData,
        analytics: {
          revenueData: [12000, 19000, 15000, 22000, 18000, 23450, 28000],
          labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
        }
      };
    } else if (tabIndex === 1) {
      return {
        ...baseData,
        analytics: {
          revenueData: [45, 52, 48, 61, 55, 49, 58],
          labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
        },
        detailedMetrics: {
          customerSegments: [
            { segment: 'Nuevos', value: 35, growth: 8 },
            { segment: 'Recurrentes', value: 45, growth: 12 },
            { segment: 'VIP', value: 20, growth: 15 }
          ]
        }
      };
    } else if (tabIndex === 2) {
      return {
        ...baseData,
        analytics: {
          revenueData: [28000, 32000, 29000, 35000, 38000, 42000, 45000],
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul']
        }
      };
    } else {
      return {
        ...baseData,
        analytics: {
          revenueData: [75, 78, 82, 85, 87, 89, 92],
          labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
        },
        automation: {
          processes: [
            { name: 'Respuestas Automáticas', efficiency: 95, timeSaved: 12 },
            { name: 'Gestión de Inventario', efficiency: 88, timeSaved: 8 },
            { name: 'Análisis de Datos', efficiency: 92, timeSaved: 6 }
          ]
        }
      };
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(getFallbackData(activeTab));
    } catch (err) {
      setError(err.message);
      setData(getFallbackData(activeTab));
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData, timeRange, activeTab]);

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
        height: '160px',
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
        height: '160px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h2" fontWeight={800} sx={{ 
              mb: 0.5,
              background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              lineHeight: 1.2
            }}>
              {formatNumber(value)}
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ 
              mb: 0.5, 
              color: '#1f2937', 
              fontSize: { xs: '0.85rem', md: '0.9rem' },
              lineHeight: 1.2
            }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#6b7280', 
              fontSize: { xs: '0.75rem', md: '0.8rem' },
              lineHeight: 1.2
            }}>
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1.5,
              background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
              borderRadius: '10px',
              border: `1px solid ${alpha(color, 0.1)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon sx={{ fontSize: { xs: 20, md: 22 }, color: color }} />
          </Box>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
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
                  fontSize: '0.7rem',
                  height: '20px'
                }}
              />
            </Box>
            
            {target && (
              <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600, fontSize: '0.7rem' }}>
                Meta: {formatNumber(target)}
              </Typography>
            )}
          </Box>

          {target && (
            <Box>
              <ProgressBar value={Math.min(progress, 100)} color={color} height={4} />
              <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
                {progress.toFixed(1)}% del objetivo
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

const ChannelPerformance = React.memo(({ channel, loading = false }) => {
  const IconComponent = channel?.icon;
  
  if (loading || !channel) {
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

const AIInsightCard = React.memo(({ insight, loading = false }) => {
  const getColors = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'rgba(16, 185, 129, 0.08)',
          border: 'rgba(16, 185, 129, 0.2)',
          icon: '#10b981',
          accent: '#10b981'
        };
      case 'opportunity':
        return {
          bg: 'rgba(245, 158, 11, 0.08)',
          border: 'rgba(245, 158, 11, 0.2)',
          icon: '#f59e0b',
          accent: '#f59e0b'
        };
      case 'warning':
        return {
          bg: 'rgba(239, 68, 68, 0.08)',
          border: 'rgba(239, 68, 68, 0.2)',
          icon: '#ef4444',
          accent: '#ef4444'
        };
      default:
        return {
          bg: 'rgba(37, 99, 235, 0.08)',
          border: 'rgba(37, 99, 235, 0.2)',
          icon: '#2563eb',
          accent: '#2563eb'
        };
    }
  };

  if (loading) {
    return (
      <Card sx={{ 
        p: 2, 
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
  const timeAgo = new Date(insight.timestamp).toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${colors.bg} 0%, rgba(255, 255, 255, 0.9) 100%)`,
        border: `1px solid ${colors.border}`,
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateX(4px)'
        },
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              p: 1,
              background: alpha(colors.icon, 0.1),
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <SmartToy sx={{ fontSize: 18, color: colors.icon }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937', fontSize: '0.9rem' }}>
                {insight.title}
              </Typography>
              <Chip 
                label={insight.priority === 'high' ? 'Alta' : 'Media'} 
                size="small"
                sx={{ 
                  height: 20,
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  background: insight.priority === 'high' ? 
                    'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  color: insight.priority === 'high' ? '#ef4444' : '#f59e0b'
                }}
              />
            </Box>
            
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.4, color: '#6b7280', fontSize: '0.8rem' }}>
              {insight.message}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: colors.accent
                    }}
                  />
                  <Typography variant="caption" fontWeight={600} sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
                    {(insight.confidence * 100).toFixed(0)}% confianza
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.7rem' }}>
                  {timeAgo}
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                endIcon={<ArrowForward sx={{ fontSize: 14 }} />}
                sx={{ 
                  fontWeight: 600,
                  borderRadius: '8px',
                  borderColor: colors.border,
                  color: colors.icon,
                  fontSize: '0.75rem',
                  py: 0.5,
                  minWidth: 'auto'
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

const RecentActivity = React.memo(({ activities, loading = false }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'sale':
        return <Receipt sx={{ color: '#10b981', fontSize: 18 }} />;
      case 'customer':
        return <Group sx={{ color: '#3b82f6', fontSize: 18 }} />;
      case 'inventory':
        return <Inventory sx={{ color: '#f59e0b', fontSize: 18 }} />;
      case 'message':
        return <Message sx={{ color: '#8b5cf6', fontSize: 18 }} />;
      default:
        return <Notifications sx={{ color: '#6b7280', fontSize: 18 }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'success':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

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
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Schedule sx={{ fontSize: 20, color: '#2563eb' }} />
          Actividad Reciente
        </Typography>
        
        <List sx={{ p: 0 }}>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem sx={{ px: 0, py: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Box
                    sx={{
                      p: 1,
                      background: alpha(getStatusColor(activity.status), 0.1),
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getActivityIcon(activity.type)}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#1f2937', fontSize: '0.85rem' }}>
                      {activity.title}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                      <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
                        {activity.description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.7rem' }}>
                        {new Date(activity.timestamp).toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && (
                <Divider variant="inset" component="li" sx={{ mx: 0 }} />
              )}
            </React.Fragment>
          ))}
        </List>
        
        <Button 
          fullWidth 
          variant="text" 
          size="small"
          sx={{ 
            mt: 2,
            color: '#2563eb',
            fontWeight: 600,
            fontSize: '0.8rem'
          }}
        >
          Ver toda la actividad
        </Button>
      </CardContent>
    </Card>
  );
});

const PerformanceChart = ({ data, timeRange, onTimeRangeChange, title = "Rendimiento de Ingresos", loading = false }) => {
  const revenueData = data?.revenueData || [12000, 19000, 15000, 22000, 18000, 23450, 28000];
  const labels = data?.labels || ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const maxValue = Math.max(...revenueData);

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
            {title}
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
                  borderColor: timeRange === range ? 'transparent' : '#e5e7eb',
                  fontSize: '0.75rem'
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ height: 250, display: 'flex', alignItems: 'end', gap: 1, mb: 3, px: 1 }}>
          {revenueData.map((value, index) => (
            <Tooltip key={index} title={`${labels[index]}: $${value.toLocaleString()}`} arrow>
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
                  {labels[index]}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
          <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.8rem' }}>
            {timeRange === 'week' ? 'Evolución semanal' : 
             timeRange === 'month' ? 'Evolución mensual' : 'Evolución trimestral'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />
            <Typography variant="body2" fontWeight={600} sx={{ color: '#10b981', fontSize: '0.8rem' }}>
              +{((revenueData[revenueData.length - 1] - revenueData[0]) / revenueData[0] * 100).toFixed(1)}% crecimiento
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const SystemPerformance = ({ performance, loading = false }) => {
  const metrics = [
    { 
      label: 'Tiempo Respuesta', 
      value: `${performance?.responseTime || 0} min`, 
      target: '2.0 min', 
      progress: performance ? (performance.responseTime / 2.0) * 100 : 0,
      color: performance?.responseTime <= 2.0 ? '#10b981' : '#f59e0b',
      icon: <AccessTime />
    },
    { 
      label: 'Disponibilidad', 
      value: `${performance?.uptime || 0}%`, 
      target: '99.9%', 
      progress: performance?.uptime || 0,
      color: performance?.uptime >= 99.9 ? '#10b981' : '#f59e0b',
      icon: <GppGood />
    },
    { 
      label: 'Precisión IA', 
      value: `${performance?.accuracy || 0}%`, 
      target: '95%', 
      progress: performance?.accuracy || 0,
      color: performance?.accuracy >= 95 ? '#10b981' : '#f59e0b',
      icon: <SmartToy />
    },
    { 
      label: 'Automatización', 
      value: `${performance?.automation || 0}%`, 
      target: '90%', 
      progress: performance?.automation || 0,
      color: performance?.automation >= 90 ? '#10b981' : '#f59e0b',
      icon: <AutoGraph />
    }
  ];

  if (loading) {
    return (
      <Card sx={{ 
        p: 3, 
        height: 300,
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
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 1 }}>
          <BarChart sx={{ fontSize: 20, color: '#2563eb' }} />
          Rendimiento del Sistema
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {metrics.map((metric, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ color: metric.color }}>
                    {metric.icon}
                  </Box>
                  <Typography variant="body2" fontWeight={600} sx={{ color: '#374151', fontSize: '0.8rem' }}>
                    {metric.label}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={700} sx={{ color: '#1f2937', fontSize: '0.8rem' }}>
                  {metric.value}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={Math.min(metric.progress, 100)} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: '#f1f5f9',
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(135deg, ${metric.color} 0%, ${alpha(metric.color, 0.8)} 100%)`,
                    borderRadius: 3
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
                  Objetivo: {metric.target}
                </Typography>
                <Typography variant="caption" fontWeight={600} sx={{ 
                  color: metric.progress >= 100 ? '#10b981' : metric.progress >= 80 ? '#f59e0b' : '#ef4444',
                  fontSize: '0.7rem'
                }}>
                  {metric.progress >= 100 ? '✅ Cumplido' : `${metric.progress.toFixed(1)}%`}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const QuickActionsPanel = ({ onAction }) => (
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
          { 
            icon: <RocketLaunch />, 
            label: 'Nueva Venta', 
            color: '#10b981',
            description: 'Registrar venta rápida'
          },
          { 
            icon: <Inventory />, 
            label: 'Gestionar Stock', 
            color: '#f59e0b',
            description: 'Revisar inventario'
          },
          { 
            icon: <Campaign />, 
            label: 'Campaña Marketing', 
            color: '#8b5cf6',
            description: 'Crear campaña IA'
          },
          { 
            icon: <Analytics />, 
            label: 'Reporte Avanzado', 
            color: '#2563eb',
            description: 'Generar análisis'
          }
        ].map((action, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Button
              fullWidth
              onClick={() => onAction?.(action.label)}
              sx={{
                background: `linear-gradient(135deg, ${alpha(action.color, 0.1)} 0%, ${alpha(action.color, 0.05)} 100%)`,
                border: `1px solid ${alpha(action.color, 0.2)}`,
                color: action.color,
                fontWeight: 600,
                borderRadius: '12px',
                py: 2,
                flexDirection: 'column',
                gap: 1,
                '&:hover': {
                  background: `linear-gradient(135deg, ${alpha(action.color, 0.2)} 0%, ${alpha(action.color, 0.1)} 100%)`,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Box sx={{ fontSize: 24 }}>{action.icon}</Box>
              <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.75rem' }}>
                {action.label}
              </Typography>
              <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.65rem' }}>
                {action.description}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

// 🔥 COMPONENTE PRINCIPAL DEL DASHBOARD

const Dashboard = () => {
  const { user } = useAuth();
  const isMobile = useMediaQuery('(max-width:900px)');
  
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('week');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  const { data: dashboardData, loading, error, refetch } = useDashboardData(timeRange, activeTab);

  const showNotification = useCallback((message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  }, []);

  const handleRefresh = useCallback(async () => {
    await refetch();
    showNotification('Datos actualizados correctamente', 'success');
  }, [refetch, showNotification]);

  const handleQuickAction = useCallback((action) => {
    showNotification(`Acción "${action}" iniciada`, 'info');
  }, [showNotification]);

  // Memoizar valores computados
  const mainMetrics = useMemo(() => {
    if (!dashboardData) return [];
    
    return [
      {
        icon: AttachMoney,
        title: "Ingresos Totales",
        value: dashboardData.overview?.revenue?.current || 0,
        change: dashboardData.overview?.revenue?.growth || 0,
        subtitle: "Ingresos mensuales",
        color: "#10b981",
        target: dashboardData.overview?.revenue?.target
      },
      {
        icon: People,
        title: "Clientes Activos",
        value: dashboardData.overview?.customers?.current || 0,
        change: dashboardData.overview?.customers?.growth || 0,
        subtitle: "Base de clientes",
        color: "#2563eb",
        target: dashboardData.overview?.customers?.target
      },
      {
        icon: TrendingUp,
        title: "Tasa Conversión",
        value: dashboardData.overview?.conversion?.current || 0,
        change: dashboardData.overview?.conversion?.growth || 0,
        subtitle: "Eficiencia de ventas",
        color: "#f59e0b",
        target: dashboardData.overview?.conversion?.target
      },
      {
        icon: Chat,
        title: "Interacciones",
        value: dashboardData.overview?.messages?.current || 0,
        change: dashboardData.overview?.messages?.growth || 0,
        subtitle: "Mensajes hoy",
        color: "#8b5cf6",
        target: dashboardData.overview?.messages?.target
      },
      {
        icon: Inventory,
        title: "Inventario",
        value: dashboardData.overview?.inventory?.current || 0,
        change: dashboardData.overview?.inventory?.growth || 0,
        subtitle: "Nivel de stock",
        color: "#ec4899",
        target: dashboardData.overview?.inventory?.target
      },
      {
        icon: Star,
        title: "Satisfacción",
        value: dashboardData.overview?.satisfaction?.current || 0,
        change: dashboardData.overview?.satisfaction?.growth || 0,
        subtitle: "Calificación promedio",
        color: "#06b6d4",
        target: dashboardData.overview?.satisfaction?.target
      }
    ];
  }, [dashboardData]);

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
                  fontSize: '0.9rem',
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

          {/* Acciones Rápidas */}
          <QuickActionsPanel onAction={handleQuickAction} />

          {/* Grid Principal del Dashboard */}
          <Grid container spacing={3}>
            {/* Métricas principales - 6 tarjetas SIMÉTRICAS */}
            {mainMetrics.map((metric, index) => (
              <Grid item xs={6} sm={4} md={4} lg={2} key={metric.title}>
                <StatCard {...metric} loading={loading} />
              </Grid>
            ))}

            {/* Contenido específico por pestaña */}
            <Grid item xs={12} lg={8}>
              <PerformanceChart 
                data={dashboardData?.analytics}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
                title={
                  activeTab === 0 ? "📈 Rendimiento de Ingresos" :
                  activeTab === 1 ? "📊 Análisis de Conversión por Hora" :
                  activeTab === 2 ? "📈 Tendencias de Crecimiento" :
                  "🤖 Eficiencia de Automatización"
                }
                loading={loading}
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <SystemPerformance 
                performance={dashboardData?.performance}
                loading={loading}
              />
            </Grid>

            {/* Canales de performance */}
            <Grid item xs={12} lg={6}>
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

            {/* Actividad reciente */}
            <Grid item xs={12} lg={6}>
              <RecentActivity 
                activities={dashboardData?.recentActivity || []}
                loading={loading}
              />
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
