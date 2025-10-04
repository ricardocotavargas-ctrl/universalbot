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
  Badge,
  Menu,
  MenuItem
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
  ArrowForward,
  MoreVert
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// 🔥 CONSTANTES Y CONFIGURACIÓN
const API_ENDPOINTS = {
  metrics: '/api/analytics/metrics',
  financial: '/api/financial/dashboard',
  sales: '/api/sales',
  insights: '/api/ai/insights'
};

// 🔥 HOOK PERSONALIZADO PARA DATOS DEL DASHBOARD
const useDashboardData = (timeRange = 'week', activeTab = 0) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Datos de ejemplo mejorados y realistas
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
      }
    };

    // Datos específicos por tab
    if (tabIndex === 0) { // Visión General
      return {
        ...baseData,
        analytics: {
          revenueData: [12000, 19000, 15000, 22000, 18000, 23450, 28000, 32000, 29000, 35000, 38000, 42000],
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        },
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
          }
        ]
      };
    } else if (tabIndex === 1) { // Análisis Detallado
      return {
        ...baseData,
        analytics: {
          revenueData: [45, 52, 48, 61, 55, 49, 58, 62, 59, 65, 68, 72],
          labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
        },
        insights: [
          {
            id: 3,
            type: 'analysis',
            title: 'Análisis de Conversión',
            message: 'La tasa de conversión ha mejorado un 12% en el último trimestre.',
            confidence: 0.88,
            action: 'Ver detalles',
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            priority: 'medium'
          }
        ],
        detailedMetrics: {
          hourlyConversion: [2.1, 2.4, 2.8, 3.1, 2.9, 2.6, 3.2, 3.5, 3.3, 3.0, 2.8, 2.5],
          customerSegments: [
            { segment: 'Nuevos', value: 35, growth: 8 },
            { segment: 'Recurrentes', value: 45, growth: 12 },
            { segment: 'VIP', value: 20, growth: 15 }
          ]
        }
      };
    } else if (tabIndex === 2) { // Tendencias
      return {
        ...baseData,
        analytics: {
          revenueData: [28000, 32000, 29000, 35000, 38000, 42000, 45000, 48000, 52000, 55000, 58000, 62000],
          labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4']
        },
        trends: {
          seasonal: [65, 59, 80, 81, 56, 55, 40, 45, 70, 75, 85, 90],
          growthRate: [12, 15, 8, 20, 18, 22, 15, 25, 20, 18, 22, 25]
        }
      };
    } else { // IA & Automatización
      return {
        ...baseData,
        analytics: {
          revenueData: [75, 78, 82, 85, 87, 89, 92, 94, 95, 96, 97, 98],
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        },
        automation: {
          processes: [
            { name: 'Respuestas Automáticas', efficiency: 95, timeSaved: 12 },
            { name: 'Gestión de Inventario', efficiency: 88, timeSaved: 8 },
            { name: 'Análisis de Datos', efficiency: 92, timeSaved: 6 },
            { name: 'Reportes Automáticos', efficiency: 96, timeSaved: 4 }
          ]
        }
      };
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular llamada a API - Reemplazar con endpoints reales
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Reemplazar con llamadas reales a tus APIs
      // const metrics = await fetch(`${API_ENDPOINTS.metrics}?range=${timeRange}`).then(r => r.json());
      // const financial = await fetch(`${API_ENDPOINTS.financial}?range=${timeRange}`).then(r => r.json());
      
      setData(getFallbackData(activeTab));
    } catch (err) {
      setError(err.message);
      setData(getFallbackData(activeTab));
    } finally {
      setLoading(false);
    }
  }, [timeRange, activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// 🔥 COMPONENTES MEJORADOS

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

// Tarjeta de métricas mejorada con altura fija
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
                  height: '20px',
                  border: `1px solid ${change > 0 ? 
                    'rgba(16, 185, 129, 0.2)' : 
                    'rgba(239, 68, 68, 0.2)'}`
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

// Gráfico de rendimiento CORREGIDO
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
             timeRange === 'month' ? 'Evolución mensual' :
             timeRange === 'quarter' ? 'Evolución trimestral' : 'Evolución anual'}
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

// Componente de pestañas con contenido diferente
const TabContent = ({ activeTab, data, timeRange, onTimeRangeChange, loading }) => {
  switch (activeTab) {
    case 0: // Visión General
      return (
        <>
          <Grid item xs={12} lg={8}>
            <PerformanceChart 
              data={data?.analytics}
              timeRange={timeRange}
              onTimeRangeChange={onTimeRangeChange}
              title="📈 Rendimiento de Ingresos"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <SystemPerformance 
              performance={data?.performance}
              loading={loading}
            />
          </Grid>
        </>
      );
    
    case 1: // Análisis Detallado
      return (
        <>
          <Grid item xs={12} lg={8}>
            <PerformanceChart 
              data={data?.analytics}
              timeRange={timeRange}
              onTimeRangeChange={onTimeRangeChange}
              title="📊 Análisis de Conversión por Hora"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
              border: '1px solid #f1f5f9',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937' }}>
                  Segmentación de Clientes
                </Typography>
                {data?.detailedMetrics?.customerSegments?.map((segment, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ color: '#374151' }}>
                        {segment.segment}
                      </Typography>
                      <Chip 
                        label={`${segment.value}%`} 
                        size="small"
                        sx={{ 
                          background: 'rgba(37, 99, 235, 0.1)',
                          color: '#2563eb',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                    <ProgressBar value={segment.value} color="#2563eb" />
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      Crecimiento: +{segment.growth}%
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </>
      );
    
    case 2: // Tendencias
      return (
        <>
          <Grid item xs={12} lg={8}>
            <PerformanceChart 
              data={data?.analytics}
              timeRange={timeRange}
              onTimeRangeChange={onTimeRangeChange}
              title="📈 Tendencias de Crecimiento Anual"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
              border: '1px solid #f1f5f9',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937' }}>
                  Métricas de Tendencia
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#374151' }}>
                      Crecimiento Promedio
                    </Typography>
                    <Typography variant="h4" fontWeight={800} sx={{ color: '#10b981' }}>
                      +18.5%
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#374151' }}>
                      Estacionalidad
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Alto en Q4, estable en Q2
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </>
      );
    
    case 3: // IA & Automatización
      return (
        <>
          <Grid item xs={12} lg={8}>
            <PerformanceChart 
              data={data?.analytics}
              timeRange={timeRange}
              onTimeRangeChange={onTimeRangeChange}
              title="🤖 Eficiencia de Automatización"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
              border: '1px solid #f1f5f9',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937' }}>
                  Procesos Automatizados
                </Typography>
                {data?.automation?.processes?.map((process, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ color: '#374151' }}>
                        {process.name}
                      </Typography>
                      <Chip 
                        label={`${process.efficiency}%`} 
                        size="small"
                        sx={{ 
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: '#10b981',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                    <ProgressBar value={process.efficiency} color="#10b981" />
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      {process.timeSaved}h/semana ahorrados
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </>
      );
    
    default:
      return null;
  }
};

// Los otros componentes (SystemPerformance, ChannelPerformance, etc.) se mantienen igual que antes
// [Incluir aquí los componentes que no han cambiado...]

// 🔥 COMPONENTE PRINCIPAL DEL DASHBOARD MEJORADO

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

  // Memoizar valores computados - MÉTRICAS SIMÉTRICAS
  const mainMetrics = useMemo(() => [
    {
      icon: AttachMoney,
      title: "Ingresos Totales",
      value: dashboardData?.overview?.revenue?.current,
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
                  <Chip 
                    icon={<VerifiedUser />}
                    label="Sistema Estable" 
                    sx={{ 
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
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

          {/* Grid Principal del Dashboard */}
          <Grid container spacing={3}>
            {/* Métricas principales - 6 tarjetas SIMÉTRICAS */}
            {mainMetrics.map((metric, index) => (
              <Grid item xs={6} sm={4} md={4} lg={2} key={metric.title}>
                <StatCard {...metric} loading={loading} />
              </Grid>
            ))}

            {/* Contenido específico por pestaña */}
            <TabContent 
              activeTab={activeTab}
              data={dashboardData}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
              loading={loading}
            />

            {/* Contenido común para todas las pestañas */}
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

// [Incluir aquí los componentes que faltan: SystemPerformance, ChannelPerformance, RecentActivity, AIInsightCard]
// Estos componentes se mantienen igual que en la versión anterior

export default Dashboard;
