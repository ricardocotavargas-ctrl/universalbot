import React from 'react';
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
  IconButton
} from '@mui/material';
import {
  TrendingUp,
  People,
  Chat,
  AttachMoney,
  ShoppingCart,
  Inventory,
  Email,
  WhatsApp,
  Instagram,
  Facebook,
  Notifications,
  Schedule,
  BarChart,
  Rocket
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const ModernDashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Datos reales de la plataforma
  const platformData = {
    user: {
      name: user?.first_name || 'Usuario',
      business: user?.business?.name || 'Mi Negocio',
      plan: 'Premium',
      since: '2024'
    },
    performance: {
      totalRevenue: 52340,
      todayRevenue: 2340,
      activeCustomers: 285,
      newCustomers: 12,
      conversionRate: 3.4,
      messageResponse: 89.2
    },
    channels: [
      { name: 'WhatsApp', messages: 1240, responses: 1180, status: 'active', color: '#25D366', icon: WhatsApp },
      { name: 'Facebook', messages: 890, responses: 820, status: 'active', color: '#1877F2', icon: Facebook },
      { name: 'Instagram', messages: 670, responses: 610, status: 'active', color: '#E4405F', icon: Instagram },
      { name: 'Email', messages: 450, responses: 430, status: 'active', color: '#EA4335', icon: Email }
    ],
    quickStats: [
      { label: 'Mensajes Hoy', value: 156, change: '+12%', icon: Chat, color: 'primary' },
      { label: 'Ventas Pendientes', value: 8, change: '-2%', icon: ShoppingCart, color: 'warning' },
      { label: 'Clientes Activos', value: 45, change: '+5%', icon: People, color: 'success' },
      { label: 'Tasa Conversión', value: '3.4%', change: '+0.2%', icon: TrendingUp, color: 'info' }
    ]
  };

  // Componente de tarjeta de métrica moderna
  const ModernMetricCard = ({ label, value, change, icon: Icon, color = 'primary' }) => (
    <Card 
      sx={{ 
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.15)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 32px ${alpha(theme.palette[color].main, 0.15)}`
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} color={`${color}.main`}>
              {value}
            </Typography>
            <Typography variant="body1" fontWeight={600} sx={{ mt: 1, color: 'text.primary' }}>
              {label}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              background: alpha(theme.palette[color].main, 0.1),
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon sx={{ fontSize: 28, color: `${color}.main` }} />
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label={change} 
            size="small"
            sx={{ 
              background: change.includes('+') ? 
                alpha(theme.palette.success.main, 0.1) : 
                alpha(theme.palette.warning.main, 0.1),
              color: change.includes('+') ? 
                theme.palette.success.main : 
                theme.palette.warning.main,
              fontWeight: 600,
              border: `1px solid ${
                change.includes('+') ? 
                alpha(theme.palette.success.main, 0.2) : 
                alpha(theme.palette.warning.main, 0.2)
              }`
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );

  // Componente de canal de comunicación moderno
  const ModernChannelCard = ({ channel }) => {
    const IconComponent = channel.icon;
    const effectiveness = ((channel.responses / channel.messages) * 100).toFixed(1);
    
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
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Respuestas
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {channel.responses}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">
                Efectividad
              </Typography>
              <Typography variant="h6" fontWeight={700} color="success.main">
                {effectiveness}%
              </Typography>
            </Box>
          </Box>

          {/* Barra de progreso de efectividad */}
          <Box sx={{ 
            width: '100%', 
            height: 6, 
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            borderRadius: 3,
            overflow: 'hidden'
          }}>
            <Box
              sx={{
                width: `${effectiveness}%`,
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

  // Componente de resumen de rendimiento
  const PerformanceOverview = () => (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 3,
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rocket sx={{ color: theme.palette.primary.main }} />
          Resumen de Rendimiento
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[
            { 
              label: 'Ingresos Totales', 
              value: `$${platformData.performance.totalRevenue.toLocaleString()}`,
              subtitle: 'Ingresos acumulados este mes',
              color: 'success'
            },
            { 
              label: 'Clientes Activos', 
              value: platformData.performance.activeCustomers,
              subtitle: 'Clientes interactuando con tu negocio',
              color: 'primary'
            },
            { 
              label: 'Tasa de Respuesta', 
              value: `${platformData.performance.messageResponse}%`,
              subtitle: 'Mensajes respondidos oportunamente',
              color: 'info'
            }
          ].map((item, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="body1" fontWeight={600}>
                  {item.label}
                </Typography>
                <Typography variant="h6" fontWeight={800} color={`${item.color}.main`}>
                  {item.value}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {item.subtitle}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ 
          mt: 3, 
          p: 2, 
          background: alpha(theme.palette.success.main, 0.05),
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`
        }}>
          <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 600 }}>
            🎯 Tu negocio está creciendo un 12% este mes
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  // Componente de actividad reciente
  const RecentActivity = () => (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
        borderRadius: 3,
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Schedule sx={{ color: theme.palette.secondary.main }} />
          Actividad Reciente
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { 
              action: 'Nueva venta completada', 
              details: 'Cliente: María González • $120',
              time: 'Hace 5 minutos',
              type: 'sale'
            },
            { 
              action: 'Mensaje de WhatsApp respondido', 
              details: 'Consulta sobre servicios premium',
              time: 'Hace 15 minutos',
              type: 'message'
            },
            { 
              action: 'Nuevo cliente registrado', 
              details: 'Carlos Rodríguez • Empresa ABC',
              time: 'Hace 1 hora',
              type: 'customer'
            },
            { 
              action: 'Campaña enviada exitosamente', 
              details: '245 mensajes entregados',
              time: 'Hace 2 horas',
              type: 'campaign'
            }
          ].map((activity, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                p: 2,
                background: alpha(theme.palette.background.paper, 0.5),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.02)
                }
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 
                    activity.type === 'sale' ? theme.palette.success.main :
                    activity.type === 'message' ? theme.palette.primary.main :
                    activity.type === 'customer' ? theme.palette.info.main :
                    theme.palette.warning.main,
                  mt: 1,
                  flexShrink: 0
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight={600}>
                  {activity.action}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {activity.details}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  {activity.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4, px: isMobile ? 1 : 3 }}>
      {/* Header moderno */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          borderRadius: 3,
          p: 4,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
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
            ¡Bienvenido, {platformData.user.name}! 🚀
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Resumen completo de {platformData.user.business} • {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip 
              label={`Plan ${platformData.user.plan}`} 
              color="primary" 
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            <Chip 
              label={`Miembro desde ${platformData.user.since}`} 
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>
      </Box>

      {/* Grid principal */}
      <Grid container spacing={3}>
        {/* Métricas rápidas */}
        {platformData.quickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ModernMetricCard {...stat} />
          </Grid>
        ))}

        {/* Canales de comunicación */}
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
            📊 Centro de Comunicaciones
          </Typography>
          <Grid container spacing={3}>
            {platformData.channels.map((channel, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <ModernChannelCard channel={channel} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Resumen de rendimiento */}
        <Grid item xs={12} lg={4}>
          <PerformanceOverview />
        </Grid>

        {/* Actividad reciente */}
        <Grid item xs={12} lg={8}>
          <RecentActivity />
        </Grid>

        {/* Información adicional */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
              border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
              borderRadius: 3,
              height: '100%'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <BarChart sx={{ color: theme.palette.info.main }} />
                Insights del Negocio
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { metric: 'Crecimiento Mensual', value: '+12.5%', trend: 'up' },
                  { metric: 'Clientes Recurrentes', value: '68%', trend: 'up' },
                  { metric: 'Tiempo Respuesta', value: '2.4 min', trend: 'down' },
                  { metric: 'Satisfacción', value: '4.8/5', trend: 'up' }
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" fontWeight={500}>
                      {item.metric}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" fontWeight={700}>
                        {item.value}
                      </Typography>
                      <TrendingUp 
                        sx={{ 
                          fontSize: 16, 
                          color: item.trend === 'up' ? 'success.main' : 'warning.main',
                          transform: item.trend === 'down' ? 'rotate(180deg)' : 'none'
                        }} 
                      />
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ 
                mt: 3, 
                p: 2, 
                background: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 2,
                textAlign: 'center'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  💡 Todos los indicadores en verde
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer motivacional */}
      <Box sx={{ 
        mt: 4, 
        p: 3, 
        background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
        textAlign: 'center'
      }}>
        <Typography variant="h6" fontWeight={800} gutterBottom sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.primary.main} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>
          ¡Sigue así! Tu negocio está en excelente estado 🎉
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Revisa regularmente tus métricas para mantener este crecimiento
        </Typography>
      </Box>
    </Container>
  );
};

export default ModernDashboard;
