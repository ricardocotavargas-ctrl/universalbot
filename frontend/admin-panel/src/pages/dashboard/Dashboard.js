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
  Chip,
  Switch,
  FormControlLabel,
  Button,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  TrendingUp,
  People,
  Chat,
  AttachMoney,
  SmartToy,
  Insights,
  Analytics,
  WhatsApp,
  Facebook,
  Instagram,
  Email,
  Refresh,
  Notifications,
  Inventory,
  ShoppingCart
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCharts, setShowCharts] = useState(true);
  const [aiInsights, setAiInsights] = useState([]);

  // Simular carga de datos reales
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // En producción, aquí irían las llamadas a tus APIs reales
      // const response = await fetch('/api/dashboard/data');
      // const data = await response.json();
      
      // Simulamos datos reales mientras se integra con tus APIs
      setTimeout(() => {
        setDashboardData({
          user: {
            name: user?.first_name || 'Usuario',
            business: user?.business?.name || 'Mi Negocio',
            plan: 'Premium'
          },
          metrics: {
            todayRevenue: 2340,
            monthlyRevenue: 52340,
            activeCustomers: 45,
            newCustomers: 12,
            conversionRate: 3.4,
            messageResponseRate: 89.2,
            totalMessages: 156
          },
          channels: [
            { name: 'WhatsApp', messages: 45, status: 'active', color: '#25D366', effectiveness: 94 },
            { name: 'Facebook', messages: 28, status: 'active', color: '#1877F2', effectiveness: 88 },
            { name: 'Instagram', messages: 32, status: 'active', color: '#E4405F', effectiveness: 91 },
            { name: 'Email', messages: 18, status: 'active', color: '#EA4335', effectiveness: 85 }
          ],
          trends: {
            revenue: [12000, 19000, 15000, 22000, 18000, 23450, 28000],
            customers: [25, 30, 28, 35, 40, 45, 48],
            performance: [65, 70, 68, 75, 80, 85, 89]
          }
        });

        setAiInsights([
          {
            type: 'prediction',
            title: 'Crecimiento proyectado',
            message: 'Basado en tendencias actuales, se proyecta un crecimiento del 15% para el próximo mes.',
            confidence: 0.87,
            action: 'Aumentar capacidad de atención'
          },
          {
            type: 'opportunity',
            title: 'Oportunidad detectada',
            message: 'Los clientes de Instagram tienen 3x más probabilidad de comprar. Recomiendo incrementar presencia.',
            confidence: 0.92,
            action: 'Reforzar campañas en Instagram'
          },
          {
            type: 'alert',
            title: 'Atención requerida',
            message: 'Tasa de respuesta ha disminuido 8% esta semana. Recomiendo revisar tiempos de atención.',
            confidence: 0.78,
            action: 'Optimizar flujo de mensajes'
          }
        ]);

        setLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  // Componente de métrica inteligente
  const SmartMetricCard = ({ title, value, change, insight, icon: Icon, color = 'primary' }) => (
    <Card 
      sx={{ 
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 32px ${alpha(theme.palette[color].main, 0.1)}`
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} color={`${color}.main`}>
              {value}
            </Typography>
            <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              background: alpha(theme.palette[color].main, 0.1),
              borderRadius: 3
            }}
          >
            <Icon sx={{ fontSize: 28, color: `${color}.main` }} />
          </Box>
        </Box>

        {change && (
          <Chip 
            label={change} 
            size="small"
            sx={{ 
              background: change.includes('+') ? 
                alpha(theme.palette.success.main, 0.1) : 
                alpha(theme.palette.warning.main, 0.1),
              color: change.includes('+') ? 'success.main' : 'warning.main',
              fontWeight: 600,
              mb: 2
            }}
          />
        )}

        {insight && (
          <Box sx={{ mt: 2, p: 1.5, background: alpha(theme.palette.info.main, 0.05), borderRadius: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>
              🤖 {insight}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  // Componente de canal de comunicación
  const ChannelCard = ({ channel }) => {
    const getIcon = (name) => {
      switch (name) {
        case 'WhatsApp': return WhatsApp;
        case 'Facebook': return Facebook;
        case 'Instagram': return Instagram;
        case 'Email': return Email;
        default: return Chat;
      }
    };
    
    const IconComponent = getIcon(channel.name);

    return (
      <Card
        sx={{
          background: `linear-gradient(135deg, ${alpha(channel.color, 0.1)} 0%, ${alpha(channel.color, 0.05)} 100%)`,
          border: `1px solid ${alpha(channel.color, 0.2)}`,
          borderRadius: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: alpha(channel.color, 0.4)
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
              <Chip 
                label={channel.status === 'active' ? 'Conectado' : 'Desconectado'} 
                size="small"
                color={channel.status === 'active' ? 'success' : 'error'}
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Mensajes
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {channel.messages}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">
                Efectividad
              </Typography>
              <Typography variant="h6" fontWeight={700} color="success.main">
                {channel.effectiveness}%
              </Typography>
            </Box>
          </Box>

          <Box sx={{ 
            width: '100%', 
            height: 6, 
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            borderRadius: 3,
            overflow: 'hidden'
          }}>
            <Box
              sx={{
                width: `${channel.effectiveness}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${channel.color} 0%, ${alpha(channel.color, 0.8)} 100%)`,
                borderRadius: 3
              }}
            />
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Componente de gráfica de ingresos simple
  const RevenueChart = () => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp color="success" />
          Tendencia de Ingresos
        </Typography>
        
        <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 1, mb: 2 }}>
          {dashboardData.trends.revenue.map((value, index) => {
            const height = (value / 30000) * 100;
            return (
              <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '70%',
                    height: `${height}%`,
                    background: `linear-gradient(180deg, ${theme.palette.success.main} 0%, ${alpha(theme.palette.success.main, 0.7)} 100%)`,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1, fontWeight: 600 }}>
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][index]}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Últimos 7 días
          </Typography>
          <Chip 
            label="+12.5% crecimiento" 
            size="small" 
            color="success"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );

  // Componente de insight de IA
  const AIInsightCard = ({ insight, index }) => (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${
          insight.type === 'prediction' ? alpha(theme.palette.info.main, 0.1) :
          insight.type === 'opportunity' ? alpha(theme.palette.success.main, 0.1) :
          alpha(theme.palette.warning.main, 0.1)
        } 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        border: `1px solid ${
          insight.type === 'prediction' ? alpha(theme.palette.info.main, 0.2) :
          insight.type === 'opportunity' ? alpha(theme.palette.success.main, 0.2) :
          alpha(theme.palette.warning.main, 0.2)
        }`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateX(4px)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <SmartToy sx={{ 
            fontSize: 24, 
            color: insight.type === 'prediction' ? 'info.main' :
                   insight.type === 'opportunity' ? 'success.main' : 'warning.main'
          }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              {insight.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {insight.message}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Chip 
                label={`Confianza: ${(insight.confidence * 100).toFixed(0)}%`} 
                size="small"
                color={insight.confidence > 0.8 ? 'success' : insight.confidence > 0.6 ? 'warning' : 'error'}
              />
              <Button 
                variant="outlined" 
                size="small"
                sx={{ fontWeight: 600 }}
              >
                {insight.action}
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  // Vista de carga
  if (loading || !dashboardData) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <SmartToy sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Cargando datos inteligentes...
          </Typography>
          <LinearProgress sx={{ width: 200, mx: 'auto' }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4, px: isMobile ? 1 : 3 }}>
      {/* Header con controles */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3
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
                color: 'transparent'
              }}
            >
              Dashboard Inteligente
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Potenciado por IA • {dashboardData.user.business}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={showCharts}
                  onChange={(e) => setShowCharts(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Analytics />
                  <Typography>Gráficas</Typography>
                </Box>
              }
            />
            <Tooltip title="Actualizar datos">
              <IconButton onClick={loadDashboardData} color="primary">
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Resumen ejecutivo con IA */}
        <Card sx={{ background: alpha(theme.palette.primary.main, 0.02), p: 3, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Insights color="primary" />
            Resumen Ejecutivo con IA
          </Typography>
          <Typography variant="body1">
            Basado en el análisis de tus datos, tu negocio muestra <strong>tendencias positivas</strong> con 
            oportunidades de crecimiento en engagement de clientes y optimización de canales. 
            <strong> Proyección: 15% crecimiento mensual.</strong>
          </Typography>
        </Card>
      </Box>

      {/* Grid principal */}
      <Grid container spacing={3}>
        {/* Métricas principales con IA */}
        <Grid item xs={12} sm={6} md={3}>
          <SmartMetricCard
            icon={AttachMoney}
            title="Ingresos Hoy"
            value={`$${dashboardData.metrics.todayRevenue}`}
            change="+12% vs ayer"
            insight="Proyección: $2,800 para mañana"
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <SmartMetricCard
            icon={People}
            title="Clientes Activos"
            value={dashboardData.metrics.activeCustomers}
            change="+5 esta semana"
            insight="Tendencia de crecimiento estable"
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <SmartMetricCard
            icon={TrendingUp}
            title="Tasa Conversión"
            value={`${dashboardData.metrics.conversionRate}%`}
            change="+0.4%"
            insight="Por encima del promedio del sector"
            color="warning"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <SmartMetricCard
            icon={Chat}
            title="Respuesta"
            value={`${dashboardData.metrics.messageResponseRate}%`}
            change="-2% esta semana"
            insight="Optimizar tiempos de atención"
            color="info"
          />
        </Grid>

        {/* Canales de comunicación */}
        <Grid item xs={12} lg={showCharts ? 6 : 8}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
            📊 Canales de Comunicación
          </Typography>
          <Grid container spacing={2}>
            {dashboardData.channels.map((channel, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <ChannelCard channel={channel} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3, p: 2, background: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
            <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 600 }}>
              💬 {dashboardData.metrics.totalMessages} mensajes hoy • ⚡ {dashboardData.metrics.messageResponseRate}% de efectividad
            </Typography>
          </Box>
        </Grid>

        {/* Gráficas o Vista Rápida */}
        {showCharts ? (
          <>
            <Grid item xs={12} lg={6}>
              <RevenueChart />
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Analytics color="primary" />
                    Rendimiento General
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      { label: 'Eficiencia Operativa', value: 85, color: 'success' },
                      { label: 'Satisfacción Cliente', value: 92, color: 'primary' },
                      { label: 'Velocidad Respuesta', value: 78, color: 'warning' },
                      { label: 'Calidad Servicio', value: 88, color: 'info' }
                    ].map((item, index) => (
                      <Box key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
                          <Typography variant="body2" fontWeight={700}>{item.value}%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={item.value} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            backgroundColor: alpha(theme.palette[item.color].main, 0.1),
                            '& .MuiLinearProgress-bar': {
                              background: `linear-gradient(90deg, ${theme.palette[item.color].main} 0%, ${alpha(theme.palette[item.color].main, 0.8)} 100%)`,
                              borderRadius: 4
                            }
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </>
        ) : (
          // Vista Rápida sin gráficas
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                  Vista Rápida
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={800} color="success.main">
                        ${dashboardData.metrics.monthlyRevenue.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ingresos Mensuales
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={800} color="primary.main">
                        {dashboardData.metrics.newCustomers}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Nuevos Clientes
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Insights de IA */}
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToy color="primary" />
            Recomendaciones de IA
          </Typography>
          <Grid container spacing={3}>
            {aiInsights.map((insight, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <AIInsightCard insight={insight} index={index} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Panel de acciones recomendadas */}
      <Box sx={{ mt: 4 }}>
        <Card sx={{ background: alpha(theme.palette.primary.main, 0.05), p: 3, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
            🚀 Acciones Recomendadas por IA
          </Typography>
          <Grid container spacing={2}>
            {[
              'Optimizar horarios de atención al cliente',
              'Incrementar presupuesto en canales de alto rendimiento',
              'Implementar campañas de remarketing',
              'Capacitar equipo en nuevas funcionalidades',
              'Revisar y ajustar tiempos de respuesta',
              'Expandir presencia en redes sociales'
            ].map((action, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Chip 
                  label={action} 
                  variant="outlined"
                  sx={{ 
                    width: '100%',
                    justifyContent: 'flex-start',
                    height: 'auto',
                    py: 1.5,
                    fontWeight: 600
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};

export default Dashboard;
