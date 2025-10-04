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
  MenuItem,
  Select,
  FormControl
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
  ViewModule,
  ShowChart,
  TrendingFlat
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// 🔥 CONSTANTES Y CONFIGURACIÓN
const API_ENDPOINTS = {
  metrics: '/api/analytics/metrics',
  kpis: '/api/analytics/kpis',
  insights: '/api/ai/insights',
  recentActivity: '/api/analytics/recent-activity',
  channels: '/api/analytics/channels',
  performance: '/api/analytics/performance',
  financial: '/api/financial/dashboard',
  sales: '/api/analytics/conversions'
};

// 🔥 HOOK PERSONALIZADO PARA DATOS DEL DASHBOARD
const useDashboardData = (timeRange = 'week', activeTab = 0) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Datos específicos para cada tab
  const getTabData = (tabIndex) => {
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
    switch (tabIndex) {
      case 0: // Visión General
        return {
          ...baseData,
          analytics: {
            revenueData: [12000, 15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 48000],
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            title: 'Ingresos Anuales 2024',
            description: 'Evolución mensual de ingresos totales'
          },
          insights: [
            {
              id: 1,
              type: 'success',
              title: 'Crecimiento Sostenido',
              message: 'Los ingresos han crecido un 15% este trimestre compared to el anterior.',
              confidence: 0.94,
              action: 'Ver reporte',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              priority: 'high'
            }
          ],
          recentActivity: [
            {
              id: 1,
              type: 'sale',
              title: 'Venta premium realizada',
              description: 'Venta #2845 por $1,250.00',
              timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
              user: 'María González',
              amount: 1250.00,
              status: 'completed'
            }
          ]
        };

      case 1: // Análisis Detallado
        return {
          ...baseData,
          analytics: {
            revenueData: [45, 52, 48, 61, 55, 58, 62, 65, 59, 63, 67, 70],
            labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
            title: 'Conversiones por Hora - Hoy',
            description: 'Distribución de conversiones durante el día'
          },
          insights: [
            {
              id: 2,
              type: 'opportunity',
              title: 'Pico de Conversiones',
              message: 'Las horas de 16:00-18:00 muestran mayor tasa de conversión (23%).',
              confidence: 0.87,
              action: 'Optimizar horarios',
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
              priority: 'medium'
            }
          ],
          detailedMetrics: {
            conversionByChannel: { whatsapp: 234, email: 45, sms: 12 },
            popularProducts: ['iPhone 13', 'Curso Inglés', 'Consulta Médica'],
            customerSegments: ['Nuevos', 'Recurrentes', 'VIP']
          }
        };

      case 2: // Tendencias
        return {
          ...baseData,
          analytics: {
            revenueData: [2.1, 2.4, 2.2, 2.8, 2.6, 3.1, 3.4, 3.2, 3.6, 3.8, 4.0, 4.2],
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12'],
            title: 'Tasa de Conversión Semanal',
            description: 'Evolución de la eficiencia en conversiones'
          },
          insights: [
            {
              id: 3,
              type: 'success',
              title: 'Tendencia Alcista',
              message: 'La tasa de conversión ha mejorado consistentemente 12 semanas seguidas.',
              confidence: 0.92,
              action: 'Analizar causas',
              timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
              priority: 'high'
            }
          ],
          trends: {
            growthRate: '+12.5% mensual',
            seasonality: 'Picos los viernes',
            prediction: 'Crecimiento continuo'
          }
        };

      case 3: // IA & Automatización
        return {
          ...baseData,
          analytics: {
            revenueData: [75, 78, 82, 85, 87, 89, 92, 94, 92, 95, 96, 98],
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            title: 'Eficiencia de Automatización IA',
            description: 'Porcentaje de procesos automatizados mensualmente'
          },
          insights: [
            {
              id: 4,
              type: 'success',
              title: 'Automatización Óptima',
              message: '98% de los procesos están automatizados, ahorrando 40h/semana.',
              confidence: 0.96,
              action: 'Expandir automatización',
              timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
              priority: 'high'
            }
          ],
          automation: {
            processes: 24,
            timeSaved: '40h/semana',
            accuracy: '94.2%',
            coverage: '98%'
          }
        };

      default:
        return baseData;
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Reemplazar con llamadas reales a tus APIs
      // const metrics = await fetch(`${API_ENDPOINTS.metrics}?range=${timeRange}`).then(r => r.json());
      // const financial = await fetch(`${API_ENDPOINTS.financial}?range=${timeRange}`).then(r => r.json());
      
      setData(getTabData(activeTab));
    } catch (err) {
      setError(err.message);
      setData(getTabData(activeTab));
    } finally {
      setLoading(false);
    }
  }, [timeRange, activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// 🔥 COMPONENTES MEJORADOS DEL DASHBOARD

const ChangeIndicator = ({ value }) => {
  if (value > 0) {
    return <ArrowUpward sx={{ fontSize: 16, color: '#10b981' }} />;
  }
  if (value < 0) {
    return <ArrowDownward sx={{ fontSize: 16, color: '#ef4444' }} />;
  }
  return <TrendingFlat sx={{ fontSize: 16, color: '#6b7280' }} />;
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
        p: 3,
        height: '100%',
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
        border: '1px solid #f1f5f9',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
      }}>
        <Skeleton variant="rectangular" height={120} />
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
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight={800} sx={{ 
              mb: 1,
              background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: { xs: '1.75rem', md: '2rem' },
              lineHeight: 1.2
            }}>
              {formatNumber(value)}
            </Typography>
            <Typography variant="h6" fontWeight={700} sx={{ 
              mb: 0.5, 
              color: '#1f2937', 
              fontSize: { xs: '0.9rem', md: '1rem' } 
            }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#6b7280', 
              fontSize: { xs: '0.8rem', md: '0.9rem' } 
            }}>
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1.5,
              background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
              borderRadius: '12px',
              border: `1px solid ${alpha(color, 0.1)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon sx={{ fontSize: { xs: 20, md: 24 }, color: color }} />
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
                height: 24,
                border: `1px solid ${change > 0 ? 
                  'rgba(16, 185, 129, 0.2)' : 
                  'rgba(239, 68, 68, 0.2)'}`
              }}
            />
          </Box>
          
          {target && (
            <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600, fontSize: '0.75rem' }}>
              Meta: {formatNumber(target)}
            </Typography>
          )}
        </Box>

        {target && (
          <Box sx={{ mt: 2 }}>
            <ProgressBar value={Math.min(progress, 100)} color={color} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
                {progress.toFixed(1)}% del objetivo
              </Typography>
              <Typography variant="caption" fontWeight={600} sx={{ 
                color: progress >= 100 ? '#10b981' : progress >= 80 ? '#f59e0b' : '#ef4444',
                fontSize: '0.75rem'
              }}>
                {progress >= 100 ? '✅ Logrado' : 'En progreso'}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
});

// 🔥 GRAFICO CORREGIDO - Barras de abajo hacia arriba
const PerformanceChart = ({ data, timeRange, onTimeRangeChange, title, description, loading = false }) => {
  const revenueData = data?.revenueData || [12000, 15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 48000];
  const labels = data?.labels || ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const maxValue = Math.max(...revenueData);
  const minValue = Math.min(...revenueData);

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
            <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937', mb: 0.5 }}>
              {title || '📈 Rendimiento'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.8rem' }}>
              {description || 'Métricas de rendimiento en tiempo real'}
            </Typography>
          </Box>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={timeRange}
              onChange={(e) => onTimeRangeChange(e.target.value)}
              sx={{
                fontSize: '0.8rem',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            >
              <MenuItem value="week">Semana</MenuItem>
              <MenuItem value="month">Mes</MenuItem>
              <MenuItem value="quarter">Trimestre</MenuItem>
              <MenuItem value="year">Año</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Gráfico corregido - barras de abajo hacia arriba */}
        <Box sx={{ 
          height: 250, 
          display: 'flex', 
          alignItems: 'end', // Esto asegura que las barras crezcan desde abajo
          gap: 1, 
          mb: 3, 
          px: 1,
          position: 'relative'
        }}>
          {/* Línea de base */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 30,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: '#e5e7eb',
              zIndex: 1
            }}
          />
          
          {revenueData.map((value, index) => {
            const percentage = (value / maxValue) * 100;
            const isGrowth = index === 0 ? true : value > revenueData[index - 1];
            
            return (
              <Tooltip 
                key={index} 
                title={`${labels[index]}: $${value.toLocaleString()}`} 
                arrow
                placement="top"
              >
                <Box sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end', // Barras crecen desde abajo
                  position: 'relative',
                  zIndex: 2
                }}>
                  <Box
                    sx={{
                      width: '70%',
                      minWidth: '12px',
                      height: `${percentage}%`,
                      background: isGrowth ? 
                        'linear-gradient(180deg, #10b981 0%, #059669 100%)' :
                        'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 12px ${alpha(isGrowth ? '#10b981' : '#ef4444', 0.3)}`
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '20%',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                        borderRadius: '4px 4px 0 0'
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ 
                    mt: 1, 
                    fontWeight: 600, 
                    color: '#6b7280',
                    fontSize: '0.7rem',
                    textAlign: 'center'
                  }}>
                    {labels[index]}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: isGrowth ? '#10b981' : '#ef4444',
                    fontSize: '0.6rem',
                    fontWeight: 700
                  }}>
                    {isGrowth && index > 0 ? '↑' : index > 0 ? '↓' : '•'}
                  </Typography>
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
          <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.8rem' }}>
            {revenueData.length} períodos analizados
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />
            <Typography variant="body2" fontWeight={600} sx={{ color: '#10b981', fontSize: '0.8rem' }}>
              +{((revenueData[revenueData.length - 1] - revenueData[0]) / revenueData[0] * 100).toFixed(1)}% crecimiento total
            </Typography>
          </Box>
        </Box>

        {/* Leyenda */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '2px', background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)' }} />
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
              Crecimiento
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '2px', background: 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)' }} />
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
              Decrecimiento
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// 🔥 COMPONENTES ADICIONALES (manteniendo los mismos que antes pero optimizados)

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

// 🔥 COMPONENTE PRINCIPAL MEJORADO

const Dashboard = () => {
  const { user } = useAuth();
  const isMobile = useMediaQuery('(max-width:900px)');
  
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('month');
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

  // 🔥 MÉTRICAS SIMÉTRICAS Y BALANCEADAS
  const mainMetrics = useMemo(() => {
    const baseMetrics = [
      {
        icon: AttachMoney,
        title: "Ingresos",
        value: dashboardData?.overview?.revenue?.current,
        change: dashboardData?.overview?.revenue?.growth,
        subtitle: "Totales mensuales",
        color: "#10b981",
        target: dashboardData?.overview?.revenue?.target
      },
      {
        icon: People,
        title: "Clientes",
        value: dashboardData?.overview?.customers?.current,
        change: dashboardData?.overview?.customers?.growth,
        subtitle: "Base activa",
        color: "#2563eb",
        target: dashboardData?.overview?.customers?.target
      },
      {
        icon: TrendingUp,
        title: "Conversión",
        value: dashboardData?.overview?.conversion?.current,
        change: dashboardData?.overview?.conversion?.growth,
        subtitle: "Tasa eficiencia",
        color: "#f59e0b",
        target: dashboardData?.overview?.conversion?.target
      },
      {
        icon: Chat,
        title: "Mensajes",
        value: dashboardData?.overview?.messages?.current,
        change: dashboardData?.overview?.messages?.growth,
        subtitle: "Interacciones hoy",
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
        subtitle: "Calificación clients",
        color: "#06b6d4",
        target: dashboardData?.overview?.satisfaction?.target
      }
    ];

    return baseMetrics;
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
                  {activeTab === 0 && 'Dashboard Executive'}
                  {activeTab === 1 && 'Análisis Detallado'}
                  {activeTab === 2 && 'Tendencias & Proyecciones'}
                  {activeTab === 3 && 'IA & Automatización'}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, color: '#6b7280' }}>
                  {activeTab === 0 && 'Visión general del negocio en tiempo real'}
                  {activeTab === 1 && 'Métricas detalladas y análisis avanzado'}
                  {activeTab === 2 && 'Patrones históricos y proyecciones futuras'}
                  {activeTab === 3 && 'Inteligencia artificial y automatización'}
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
              <Tab icon={<ViewModule />} label="Visión General" />
              <Tab icon={<Analytics />} label="Análisis Detallado" />
              <Tab icon={<ShowChart />} label="Tendencias" />
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
              <Grid item xs={12} sm={6} md={4} lg={2} key={metric.title}>
                <StatCard {...metric} loading={loading} />
              </Grid>
            ))}

            {/* Gráfica principal MEJORADA */}
            <Grid item xs={12} lg={8}>
              <PerformanceChart 
                data={dashboardData?.analytics}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
                title={dashboardData?.analytics?.title}
                description={dashboardData?.analytics?.description}
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

            {/* Contenido específico por tab */}
            {activeTab === 1 && (
              <Grid item xs={12}>
                <Card sx={{ p: 3, background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid #bae6fd' }}>
                  <Typography variant="h6" fontWeight={700} sx={{ color: '#0369a1', mb: 2 }}>
                    🔍 Análisis Detallado - Conversiones por Canal
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#0c4a6e' }}>
                    Análisis avanzado de conversiones segmentado por canales y productos más populares.
                  </Typography>
                </Card>
              </Grid>
            )}

            {activeTab === 2 && (
              <Grid item xs={12}>
                <Card sx={{ p: 3, background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '1px solid #bbf7d0' }}>
                  <Typography variant="h6" fontWeight={700} sx={{ color: '#166534', mb: 2 }}>
                    📈 Tendencias - Crecimiento Sostenido
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#14532d' }}>
                    Identificación de patrones estacionales y proyecciones de crecimiento basadas en datos históricos.
                  </Typography>
                </Card>
              </Grid>
            )}

            {activeTab === 3 && (
              <Grid item xs={12}>
                <Card sx={{ p: 3, background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', border: '1px solid #e9d5ff' }}>
                  <Typography variant="h6" fontWeight={700} sx={{ color: '#7e22ce', mb: 2 }}>
                    🤖 IA & Automatización - Eficiencia Máxima
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b21a8' }}>
                    Sistema de inteligencia artificial procesando 24/7 con 98% de precisión y ahorro de 40h semanales.
                  </Typography>
                </Card>
              </Grid>
            )}
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
