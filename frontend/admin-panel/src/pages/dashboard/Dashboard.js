import React, { useState, useEffect } from 'react';
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
  Avatar,
  AvatarGroup,
  Tooltip,
  Button
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
  MoreVert,
  WhatsApp,
  Instagram,
  Facebook,
  Email,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const AdvancedDashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('week');
  const [dashboardData, setDashboardData] = useState(null);
  const [aiInsights, setAiInsights] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    // Simular carga de datos reales
    const data = {
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
      performance: {
        responseTime: 2.4,
        satisfaction: 4.8,
        retention: 78.5,
        efficiency: 92.3
      },
      analytics: {
        revenueData: [12000, 19000, 15000, 22000, 18000, 23450, 28000, 32000, 28500, 31000, 29500, 35000],
        customerData: [25, 30, 28, 35, 40, 45, 48, 52, 49, 55, 58, 62],
        conversionData: [2.1, 2.4, 2.2, 2.8, 2.6, 3.1, 3.4, 3.2, 3.6, 3.4, 3.8, 4.1]
      }
    };

    const insights = [
      {
        type: 'success',
        title: 'Tendencia Positiva Detectada',
        message: 'El crecimiento de ingresos ha superado las proyecciones en un 15% este mes.',
        confidence: 0.94,
        action: 'Mantener estrategia actual'
      },
      {
        type: 'opportunity',
        title: 'Oportunidad de Optimización',
        message: 'Los clientes de Instagram tienen 3x mayor tasa de conversión. Recomiendo incrementar presencia.',
        confidence: 0.87,
        action: 'Aumentar presupuesto Instagram'
      },
      {
        type: 'alert',
        title: 'Atención Requerida',
        message: 'Tiempo de respuesta aumentó 15% esta semana. Revisar capacidad del equipo.',
        confidence: 0.76,
        action: 'Optimizar flujo de trabajo'
      }
    ];

    setDashboardData(data);
    setAiInsights(insights);
  };

  const StatCard = ({ title, value, change, subtitle, icon: Icon, color = 'primary', chart }) => (
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
        }
      }}
    >
      <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h2" fontWeight={800} color={`${color}.main`} sx={{ mb: 1 }}>
              {typeof value === 'number' ? value.toLocaleString() : value}
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
          {change > 0 ? (
            <ArrowUpward sx={{ fontSize: 16, color: 'success.main' }} />
          ) : (
            <ArrowDownward sx={{ fontSize: 16, color: 'error.main' }} />
          )}
          <Chip 
            label={`${change > 0 ? '+' : ''}${change}%`} 
            size="small"
            sx={{ 
              background: change > 0 ? 
                alpha(theme.palette.success.main, 0.1) : 
                alpha(theme.palette.error.main, 0.1),
              color: change > 0 ? 'success.main' : 'error.main',
              fontWeight: 700,
              border: `1px solid ${change > 0 ? 
                alpha(theme.palette.success.main, 0.2) : 
                alpha(theme.palette.error.main, 0.2)}`
            }}
          />
        </Box>

        {chart && (
          <Box sx={{ mt: 3, height: 60 }}>
            {/* Mini gráfica */}
            <Box sx={{ display: 'flex', alignItems: 'end', gap: 0.5, height: '100%' }}>
              {[30, 45, 60, 75, 65, 80, 90, 85, 95, 88, 92, 100].map((height, index) => (
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
        )}
      </CardContent>

      {/* Efecto de fondo */}
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
    </Card>
  );

  const ChannelPerformance = ({ channel }) => {
    const IconComponent = channel.icon;
    
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
          }
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
                width: `${channel.value}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${channel.color} 0%, ${alpha(channel.color, 0.7)} 100%)`,
                borderRadius: 4,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  animation: 'shimmer 2s infinite'
                }
              }}
            />
          </Box>

          <Typography variant="caption" color="text.secondary">
            Participación en ventas totales
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const AIInsightCard = ({ insight, index }) => (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${
          insight.type === 'success' ? alpha(theme.palette.success.main, 0.08) :
          insight.type === 'opportunity' ? alpha(theme.palette.warning.main, 0.08) :
          alpha(theme.palette.error.main, 0.08)
        } 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
        border: `1px solid ${
          insight.type === 'success' ? alpha(theme.palette.success.main, 0.2) :
          insight.type === 'opportunity' ? alpha(theme.palette.warning.main, 0.2) :
          alpha(theme.palette.error.main, 0.2)
        }`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateX(8px)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              p: 1.5,
              background: 
                insight.type === 'success' ? alpha(theme.palette.success.main, 0.1) :
                insight.type === 'opportunity' ? alpha(theme.palette.warning.main, 0.1) :
                alpha(theme.palette.error.main, 0.1),
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <SmartToy sx={{ 
              fontSize: 20, 
              color: 
                insight.type === 'success' ? theme.palette.success.main :
                insight.type === 'opportunity' ? theme.palette.warning.main :
                theme.palette.error.main
            }} />
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

  const AnalyticsChart = () => (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>
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
                onClick={() => setTimeRange(range)}
                size="small"
              />
            ))}
          </Box>
        </div>

        <Box sx={{ height: 300, display: 'flex', alignItems: 'end', gap: 2, mb: 3 }}>
          {dashboardData?.analytics.revenueData.slice(-12).map((value, index) => (
            <Tooltip key={index} title={`$${value.toLocaleString()}`} arrow>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '80%',
                    height: `${(value / 40000) * 100}%`,
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
                  {index + 1}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Evolución de ingresos últimos 12 períodos
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

  if (!dashboardData) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Analytics sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6">
            Cargando dashboard avanzado...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4, px: isMobile ? 1 : 3 }}>
      {/* Header avanzado */}
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
              Análisis inteligente en tiempo real • {user?.business?.name || 'Tu Negocio'}
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
              <Chip 
                label="Actualizado ahora" 
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Actualizar datos">
              <IconButton sx={{ 
                background: alpha(theme.palette.primary.main, 0.1),
                '&:hover': { background: alpha(theme.palette.primary.main, 0.2) }
              }}>
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip title="Exportar reporte">
              <IconButton sx={{ 
                background: alpha(theme.palette.success.main, 0.1),
                '&:hover': { background: alpha(theme.palette.success.main, 0.2) }
              }}>
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="Compartir">
              <IconButton sx={{ 
                background: alpha(theme.palette.info.main, 0.1),
                '&:hover': { background: alpha(theme.palette.info.main, 0.2) }
              }}>
                <Share />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Tabs de navegación */}
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
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
          <Tab icon={<People />} label="Clientes" />
        </Tabs>
      </Box>

      {/* Grid principal */}
      <Grid container spacing={3}>
        {/* Métricas principales */}
        <Grid item xs={12} lg={3}>
          <StatCard
            icon={AttachMoney}
            title="Ingresos Totales"
            value={dashboardData.overview.revenue.current}
            change={dashboardData.overview.revenue.growth}
            subtitle="Este mes"
            color="success"
            chart={true}
          />
        </Grid>
        
        <Grid item xs={12} lg={3}>
          <StatCard
            icon={People}
            title="Clientes Activos"
            value={dashboardData.overview.customers.current}
            change={dashboardData.overview.customers.growth}
            subtitle="Base total"
            color="primary"
            chart={true}
          />
        </Grid>
        
        <Grid item xs={12} lg={3}>
          <StatCard
            icon={TrendingUp}
            title="Tasa Conversión"
            value={dashboardData.overview.conversion.current}
            change={dashboardData.overview.conversion.growth}
            subtitle="Porcentaje"
            color="warning"
            chart={true}
          />
        </Grid>
        
        <Grid item xs={12} lg={3}>
          <StatCard
            icon={Chat}
            title="Interacciones"
            value={dashboardData.overview.messages.current}
            change={dashboardData.overview.messages.growth}
            subtitle="Hoy"
            color="info"
            chart={true}
          />
        </Grid>

        {/* Gráfica principal */}
        <Grid item xs={12} lg={8}>
          <AnalyticsChart />
        </Grid>

        {/* Canales de performance */}
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
            📊 Performance por Canal
          </Typography>
          <Grid container spacing={2}>
            {dashboardData.channels.map((channel, index) => (
              <Grid item xs={12} key={index}>
                <ChannelPerformance channel={channel} />
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
            {aiInsights.map((insight, index) => (
              <Grid item xs={12} key={index}>
                <AIInsightCard insight={insight} index={index} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Métricas de performance */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                🎯 Métricas Clave
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  { label: 'Tiempo Respuesta', value: '2.4 min', target: '2.0 min', progress: 85 },
                  { label: 'Satisfacción', value: '4.8/5', target: '4.5/5', progress: 107 },
                  { label: 'Retención', value: '78.5%', target: '75%', progress: 105 },
                  { label: 'Eficiencia', value: '92.3%', target: '90%', progress: 103 }
                ].map((metric, index) => (
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
        </Grid>
      </Grid>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </Container>
  );
};

export default Dashboard;
