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
  MoreVert,
  ViewModule,
  TableChart,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// 🔥 CONSTANTES Y CONFIGURACIÓN
const API_ENDPOINTS = {
  metrics: '/api/analytics/metrics',
  conversions: '/api/analytics/conversions',
  financial: '/api/financial/dashboard',
  sales: '/api/sales',
  recentActivity: '/api/analytics/recent-activity'
};

// 🔥 HOOK PERSONALIZADO PARA DATOS DEL DASHBOARD
const useDashboardData = (timeRange = 'week', activeTab = 0) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Datos realistas basados en tus APIs
  const getRealisticData = (tabIndex) => {
    const baseData = {
      overview: {
        revenue: { current: 52340, previous: 45680, growth: 14.6, target: 60000 },
        customers: { current: 1245, previous: 1120, growth: 11.2, target: 1500 },
        conversion: { current: 3.4, previous: 2.9, growth: 17.2, target: 4.0 },
        messages: { current: 156, previous: 142, growth: 9.9, target: 200 },
        inventory: { current: 89, previous: 82, growth: 8.5, target: 95 },
        satisfaction: { current: 4.7, previous: 4.6, growth: 2.2, target: 4.9 }
      },
      financial: {
        totalSales: 52340,
        totalTransactions: 234,
        netProfit: 28700,
        expenses: 15640,
        cashFlow: 13200,
        receivables: 8400
      },
      analytics: {
        total_conversations: 1247,
        conversion_rate: 23.4,
        avg_response_time: '2.3min',
        customer_satisfaction: 4.7,
        revenue_trend: [12000, 15000, 18000, 21000, 24000, 28000, 32000, 35000, 38000, 42000, 45000, 52340],
        interaction_volume: [45, 52, 48, 61, 55, 49, 67, 72, 65, 78, 82, 89]
      }
    };

    // Datos específicos por pestaña
    if (tabIndex === 0) { // Visión General
      return {
        ...baseData,
        channels: [
          { name: 'WhatsApp', value: 45, growth: 12, color: '#25D366', icon: WhatsApp, volume: 234 },
          { name: 'Instagram', value: 32, growth: 8, color: '#E4405F', icon: Instagram, volume: 167 },
          { name: 'Facebook', value: 28, growth: -2, color: '#1877F2', icon: Facebook, volume: 145 },
          { name: 'Email', value: 18, growth: 5, color: '#EA4335', icon: Email, volume: 89 }
        ],
        insights: [
          {
            id: 1,
            type: 'success',
            title: 'Crecimiento Excepcional',
            message: 'Los ingresos han superado las proyecciones en un 15% este mes. Tendencia positiva detectada en todas las métricas.',
            confidence: 0.94,
            action: 'Mantener estrategia',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            priority: 'high'
          },
          {
            id: 2,
            type: 'opportunity',
            title: 'Instagram en Crecimiento',
            message: 'El engagement en Instagram aumentó 25%. Oportunidad para expandir campañas en esta plataforma.',
            confidence: 0.82,
            action: 'Optimizar campañas',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            priority: 'medium'
          }
        ]
      };
    } else if (tabIndex === 1) { // Análisis Detallado
      return {
        ...baseData,
        detailedMetrics: {
          byChannel: {
            whatsapp: { conversions: 234, revenue: 28450, growth: 15 },
            instagram: { conversions: 167, revenue: 15680, growth: 25 },
            facebook: { conversions: 145, revenue: 13200, growth: -2 },
            email: { conversions: 89, revenue: 8450, growth: 8 }
          },
          hourlyPerformance: Array.from({length: 24}, (_, i) => ({
            hour: i,
            conversions: Math.floor(Math.random() * 15) + 5,
            revenue: Math.floor(Math.random() * 2000) + 500
          })),
          productPerformance: [
            { product: 'iPhone 13', conversions: 89, revenue: 53400, margin: 35 },
            { product: 'Curso Inglés', conversions: 45, revenue: 9000, margin: 60 },
            { product: 'Consulta Médica', conversions: 67, revenue: 3350, margin: 45 }
          ]
        }
      };
    } else if (tabIndex === 2) { // Tendencias
      return {
        ...baseData,
        trends: {
          revenueGrowth: [12, 15, 18, 21, 24, 28, 32, 35, 38, 42, 45, 52],
          customerGrowth: [856, 923, 987, 1045, 1120, 1189, 1245, 1312, 1389, 1456, 1523, 1589],
          conversionTrend: [2.1, 2.4, 2.2, 2.8, 2.6, 3.1, 3.4, 3.2, 3.6, 3.8, 4.0, 4.2],
          seasonalPattern: Array.from({length: 12}, (_, i) => ({
            month: i,
            revenue: Math.floor(Math.random() * 30000) + 20000,
            customers: Math.floor(Math.random() * 500) + 800
          }))
        }
      };
    } else { // IA & Automatización
      return {
        ...baseData,
        automation: {
          processes: [
            { name: 'Respuestas Automáticas', efficiency: 92, timeSaved: 45 },
            { name: 'Segmentación Clientes', efficiency: 87, timeSaved: 32 },
            { name: 'Análisis Ventas', efficiency: 95, timeSaved: 28 },
            { name: 'Alertas Inventario', efficiency: 89, timeSaved: 15 }
          ],
          aiPerformance: {
            accuracy: 94.2,
            responseTime: 2.3,
            automationRate: 87.5,
            costReduction: 35.8
          },
          recommendations: [
            {
              type: 'optimization',
              title: 'Optimizar Horarios de Publicación',
              impact: 'high',
              description: 'Publicar entre 7-9 PM aumenta engagement un 23%',
              implementation: '2 días'
            }
          ]
        }
      };
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular llamada a API real
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // TODO: Reemplazar con llamadas reales a tus APIs
      // const responses = await Promise.all([
      //   fetch(`${API_ENDPOINTS.metrics}?range=${timeRange}`),
      //   fetch(`${API_ENDPOINTS.conversions}?range=${timeRange}`),
      //   fetch(`${API_ENDPOINTS.financial}?range=${timeRange}`)
      // ]);
      
      // const [metrics, conversions, financial] = await Promise.all(
      //   responses.map(r => r.json())
      // );

      setData(getRealisticData(activeTab));
    } catch (err) {
      setError(err.message);
      setData(getRealisticData(activeTab));
    } finally {
      setLoading(false);
    }
  }, [timeRange, activeTab]);

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
  target,
  loading = false,
  format = 'number'
}) => {
  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    
    if (format === 'currency') {
      if (num >= 1000000) {
        return `$${(num / 1000000).toFixed(1)}M`;
      }
      if (num >= 1000) {
        return `$${(num / 1000).toFixed(1)}K`;
      }
      return `$${num.toLocaleString()}`;
    }
    
    if (format === 'percentage') {
      return `${num}%`;
    }
    
    if (format === 'decimal') {
      return num.toFixed(1);
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

// 🔥 GRÁFICO CORREGIDO - Barras de abajo hacia arriba
const PerformanceChart = ({ data, timeRange, onTimeRangeChange, title = "Rendimiento de Ingresos", loading = false }) => {
  const revenueData = data?.revenue_trend || [12000, 15000, 18000, 21000, 24000, 28000, 32000, 35000, 38000, 42000, 45000, 52340];
  const maxValue = Math.max(...revenueData);
  const minValue = Math.min(...revenueData);
  
  // Calcular crecimiento total
  const totalGrowth = ((revenueData[revenueData.length - 1] - revenueData[0]) / revenueData[0]) * 100;

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
                  range === 'week' ? '7D' :
                  range === 'month' ? '30D' : 
                  range === 'quarter' ? '90D' : '1A'
                }
                variant={timeRange === range ? 'filled' : 'outlined'}
                onClick={() => onTimeRangeChange(range)}
                size="small"
                sx={{
                  background: timeRange === range ? 
                    'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'transparent',
                  color: timeRange === range ? 'white' : '#6b7280',
                  borderColor: timeRange === range ? 'transparent' : '#e5e7eb',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              />
            ))}
          </Box>
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
          <Box sx={{
            position: 'absolute',
            bottom: 30,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: '#e5e7eb',
            zIndex: 1
          }} />
          
          {revenueData.map((value, index) => {
            const height = ((value - minValue) / (maxValue - minValue)) * 100;
            const isLatest = index === revenueData.length - 1;
            
            return (
              <Tooltip 
                key={index} 
                title={
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      Período {index + 1}
                    </Typography>
                    <Typography variant="body2">
                      Ingresos: ${value.toLocaleString()}
                    </Typography>
                    {isLatest && (
                      <Typography variant="caption" sx={{ color: '#10b981' }}>
                        Último registro
                      </Typography>
                    )}
                  </Box>
                } 
                arrow
              >
                <Box sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  height: '100%',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <Box
                    sx={{
                      width: '70%',
                      minWidth: '12px',
                      height: `${height}%`,
                      background: isLatest 
                        ? 'linear-gradient(180deg, #10b981 0%, #059669 100%)' 
                        : 'linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                      },
                      '&::after': isLatest ? {
                        content: '""',
                        position: 'absolute',
                        top: -4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)'
                      } : {}
                    }}
                  />
                  <Typography variant="caption" sx={{ 
                    mt: 1, 
                    fontWeight: 600, 
                    color: isLatest ? '#10b981' : '#6b7280',
                    fontSize: '0.7rem'
                  }}>
                    {index + 1}
                  </Typography>
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        {/* Información del gráfico */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          px: 1,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.8rem', mb: 0.5 }}>
              Evolución de {revenueData.length} períodos
            </Typography>
            <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.7rem' }}>
              Desde ${revenueData[0].toLocaleString()} hasta ${revenueData[revenueData.length - 1].toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp sx={{ fontSize: 16, color: totalGrowth >= 0 ? '#10b981' : '#ef4444' }} />
            <Typography variant="body2" fontWeight={600} sx={{ 
              color: totalGrowth >= 0 ? '#10b981' : '#ef4444',
              fontSize: '0.8rem' 
            }}>
              {totalGrowth >= 0 ? '+' : ''}{totalGrowth.toFixed(1)}% crecimiento total
            </Typography>
          </Box>
        </Box>

        {/* Leyenda */}
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          mt: 2, 
          px: 1,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 2, background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }} />
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
              Períodos anteriores
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 2, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }} />
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
              Último período
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// 🔥 COMPONENTES ESPECÍFICOS POR PESTAÑA

const OverviewTab = ({ data, loading, timeRange, onTimeRangeChange }) => (
  <Grid container spacing={3}>
    {/* Métricas principales */}
    {[
      {
        icon: AttachMoney,
        title: "Ingresos Totales",
        value: data?.overview?.revenue?.current,
        change: data?.overview?.revenue?.growth,
        subtitle: "Ingresos mensuales",
        color: "#10b981",
        target: data?.overview?.revenue?.target,
        format: 'currency'
      },
      {
        icon: People,
        title: "Clientes Activos",
        value: data?.overview?.customers?.current,
        change: data?.overview?.customers?.growth,
        subtitle: "Base de clientes",
        color: "#2563eb",
        target: data?.overview?.customers?.target
      },
      {
        icon: TrendingUp,
        title: "Tasa Conversión",
        value: data?.overview?.conversion?.current,
        change: data?.overview?.conversion?.growth,
        subtitle: "Eficiencia de ventas",
        color: "#f59e0b",
        target: data?.overview?.conversion?.target,
        format: 'percentage'
      },
      {
        icon: Chat,
        title: "Interacciones",
        value: data?.overview?.messages?.current,
        change: data?.overview?.messages?.growth,
        subtitle: "Mensajes hoy",
        color: "#8b5cf6",
        target: data?.overview?.messages?.target
      },
      {
        icon: Inventory,
        title: "Inventario",
        value: data?.overview?.inventory?.current,
        change: data?.overview?.inventory?.growth,
        subtitle: "Nivel de stock",
        color: "#ec4899",
        target: data?.overview?.inventory?.target,
        format: 'percentage'
      },
      {
        icon: Star,
        title: "Satisfacción",
        value: data?.overview?.satisfaction?.current,
        change: data?.overview?.satisfaction?.growth,
        subtitle: "Calificación promedio",
        color: "#06b6d4",
        target: data?.overview?.satisfaction?.target,
        format: 'decimal'
      }
    ].map((metric, index) => (
      <Grid item xs={12} sm={6} md={4} lg={2} key={metric.title}>
        <StatCard {...metric} loading={loading} />
      </Grid>
    ))}

    {/* Gráfico principal */}
    <Grid item xs={12} lg={8}>
      <PerformanceChart 
        data={data?.analytics}
        timeRange={timeRange}
        onTimeRangeChange={onTimeRangeChange}
        loading={loading}
        title="📈 Tendencias de Ingresos"
      />
    </Grid>

    {/* Canales de performance */}
    <Grid item xs={12} lg={4}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937' }}>
        📊 Performance por Canal
      </Typography>
      <Grid container spacing={2}>
        {(loading ? Array(4).fill({}) : data?.channels || []).map((channel, index) => (
          <Grid item xs={12} key={index}>
            <ChannelPerformance channel={channel} loading={loading} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

const DetailedAnalysisTab = ({ data, loading, timeRange, onTimeRangeChange }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} lg={8}>
      <PerformanceChart 
        data={data?.analytics}
        timeRange={timeRange}
        onTimeRangeChange={onTimeRangeChange}
        loading={loading}
        title="📊 Análisis Detallado de Conversiones"
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
            Métricas de Conversión
          </Typography>
          
          {data?.detailedMetrics?.productPerformance?.map((product, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#374151' }}>
                  {product.product}
                </Typography>
                <Typography variant="body2" fontWeight={700} sx={{ color: '#10b981' }}>
                  ${product.revenue.toLocaleString()}
                </Typography>
              </Box>
              <ProgressBar value={product.margin} color="#10b981" />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  {product.conversions} conversiones
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                  {product.margin}% margen
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Grid>
  </Grid>
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Renderizar contenido basado en la pestaña activa
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <OverviewTab 
            data={dashboardData}
            loading={loading}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        );
      case 1:
        return (
          <DetailedAnalysisTab 
            data={dashboardData}
            loading={loading}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight={700} sx={{ color: '#1f2937', textAlign: 'center', my: 4 }}>
                Análisis de Tendencias - Próximamente
              </Typography>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight={700} sx={{ color: '#1f2937', textAlign: 'center', my: 4 }}>
                IA & Automatización - Próximamente
              </Typography>
            </Grid>
          </Grid>
        );
      default:
        return <OverviewTab data={dashboardData} loading={loading} />;
    }
  };

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

            {/* Pestañas funcionales */}
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
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

          {/* Contenido de las pestañas */}
          {renderTabContent()}
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

// Componente ChannelPerformance (necesario para el código anterior)
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

export default Dashboard;
