import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
  useTheme,
  alpha,
  useMediaQuery,
  LinearProgress,
  Avatar,
  AvatarGroup
} from '@mui/material';
import {
  TrendingUp,
  People,
  Chat,
  AttachMoney,
  Analytics,
  Inventory,
  Notifications,
  Email,
  WhatsApp,
  Facebook,
  Instagram,
  ArrowUpward,
  ArrowDownward,
  ShoppingCart,
  BusinessCenter
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Datos modernos y realistas
  const dashboardData = {
    stats: {
      totalSales: 23450,
      newCustomers: 45,
      pendingMessages: 23,
      conversionRate: 3.2,
      monthlyGrowth: 12.5
    },
    revenueTrend: [12000, 19000, 15000, 22000, 18000, 23450],
    salesChannels: [
      { platform: 'WhatsApp', percentage: 42, color: '#25D366', icon: WhatsApp },
      { platform: 'Sitio Web', percentage: 26, color: theme.palette.primary.main },
      { platform: 'Instagram', percentage: 21, color: '#E4405F', icon: Instagram },
      { platform: 'Facebook', percentage: 11, color: '#1877F2', icon: Facebook }
    ],
    weeklyPerformance: [12, 19, 8, 15, 22, 18, 25]
  };

  // Componente de Tarjeta de Métrica Moderna
  const ModernStatCard = ({ icon: Icon, title, value, change, changeType = 'positive', color = 'primary' }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.15)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
        border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
        borderRadius: 3,
        position: 'relative',
        overflow: 'visible',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${alpha(theme.palette[color].main, 0.15)}`
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${theme.palette[color].main}, ${alpha(theme.palette[color].main, 0.5)})`,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12
        }
      }}
    >
      <CardContent sx={{ p: 3, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h3" fontWeight={800} color={`${color}.main`} sx={{ mb: 1 }}>
              {value}
            </Typography>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
              {title}
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
        
        {change && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {changeType === 'positive' ? (
              <ArrowUpward sx={{ fontSize: 16, color: 'success.main' }} />
            ) : (
              <ArrowDownward sx={{ fontSize: 16, color: 'error.main' }} />
            )}
            <Chip 
              label={change} 
              size="small"
              sx={{ 
                background: changeType === 'positive' ? 
                  alpha(theme.palette.success.main, 0.1) : 
                  alpha(theme.palette.error.main, 0.1),
                color: changeType === 'positive' ? 
                  theme.palette.success.main : 
                  theme.palette.error.main,
                fontWeight: 600,
                border: `1px solid ${
                  changeType === 'positive' ? 
                  alpha(theme.palette.success.main, 0.2) : 
                  alpha(theme.palette.error.main, 0.2)
                }`
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );

  // Componente de Gráfica de Ingresos Minimalista
  const RevenueChart = () => (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 3,
        position: 'relative'
      }}
    >
      <CardContent sx={{ p: 3, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            📈 Tendencias de Ingresos
          </Typography>
          <Chip 
            label="+12.5% este mes" 
            size="small" 
            color="success"
            variant="outlined"
          />
        </Box>
        
        {/* Gráfica minimalista con barras */}
        <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 1, mb: 3 }}>
          {dashboardData.revenueTrend.map((value, index) => {
            const height = (value / 25000) * 100;
            return (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <Box
                  sx={{
                    width: '70%',
                    height: `${height}%`,
                    background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.7)} 100%)`,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.9)} 100%)`
                    }
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1, fontWeight: 600 }}>
                  {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'][index]}
                </Typography>
              </Box>
            );
          })}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 1 }}>
          {[
            { label: 'Meta Mensual', value: '$25K', progress: 94 },
            { label: 'Crecimiento', value: '+12.5%', progress: 125 },
            { label: 'Clientes Activos', value: '285', progress: 85 }
          ].map((item, index) => (
            <Box key={index} sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {item.label}
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {item.value}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={item.progress > 100 ? 100 : item.progress} 
                color={item.progress >= 100 ? "success" : "primary"}
                sx={{ 
                  height: 4, 
                  borderRadius: 2,
                  mt: 1,
                  background: alpha(theme.palette.primary.main, 0.1)
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  // Componente de Canales de Venta
  const SalesChannels = () => (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
        borderRadius: 3
      }}
    >
      <CardContent sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
          🛒 Canales de Venta
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 }}>
          {dashboardData.salesChannels.map((channel, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                {channel.icon && (
                  <channel.icon sx={{ color: channel.color, fontSize: 24 }} />
                )}
                <Typography variant="body2" fontWeight={600}>
                  {channel.platform}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ 
                  width: '100%', 
                  height: 12, 
                  backgroundColor: alpha(channel.color, 0.1),
                  borderRadius: 6,
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <Box
                    sx={{
                      width: `${channel.percentage}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${channel.color} 0%, ${alpha(channel.color, 0.8)} 100%)`,
                      borderRadius: 6,
                      transition: 'width 0.8s ease',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(90deg, transparent 0%, ${alpha('#fff', 0.2)} 50%, transparent 100%)`,
                        animation: 'shimmer 2s infinite'
                      }
                    }}
                  />
                </Box>
              </Box>
              <Typography variant="body2" fontWeight={700} sx={{ minWidth: 40, textAlign: 'right' }}>
                {channel.percentage}%
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ 
          p: 2, 
          background: alpha(theme.palette.success.main, 0.05),
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
          textAlign: 'center'
        }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            💡 WhatsApp es tu canal más efectivo
          </Typography>
        </Box>

        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </CardContent>
    </Card>
  );

  // Componente de Rendimiento Semanal
  const WeeklyPerformance = () => (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
        borderRadius: 3
      }}
    >
      <CardContent sx={{ p: 3, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            🚀 Rendimiento Semanal
          </Typography>
          <Chip 
            label="+8 ventas vs semana pasada" 
            size="small" 
            color="success"
          />
        </Box>
        
        {/* Gráfica de rendimiento semanal */}
        <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, height: 150, mb: 3 }}>
          {dashboardData.weeklyPerformance.map((value, index) => {
            const height = (value / 25) * 100;
            const day = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][index];
            const isPeak = value === Math.max(...dashboardData.weeklyPerformance);
            
            return (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <Box
                  sx={{
                    width: '60%',
                    height: `${height}%`,
                    background: isPeak ? 
                      `linear-gradient(180deg, ${theme.palette.success.main} 0%, ${alpha(theme.palette.success.main, 0.7)} 100%)` :
                      `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.7)} 100%)`,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    ...(isPeak && {
                      '&::after': {
                        content: '"🔥"',
                        position: 'absolute',
                        top: -25,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '1.2rem'
                      }
                    })
                  }}
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    mt: 1, 
                    fontWeight: isPeak ? 800 : 600,
                    color: isPeak ? 'success.main' : 'text.primary'
                  }}
                >
                  {day}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  {value}
                </Typography>
              </Box>
            );
          })}
        </Box>
        
        <Box sx={{ 
          mt: 3, 
          p: 2, 
          background: alpha(theme.palette.success.main, 0.05),
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`
        }}>
          <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 600 }}>
            <strong>Domingo</strong> fue tu mejor día con <strong style={{color: theme.palette.success.main}}>25 ventas</strong> 🎉
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  // Componente de Comunicaciones
  const CommunicationsWidget = () => (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
        borderRadius: 3
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chat sx={{ color: theme.palette.warning.main }} />
          Centro de Comunicaciones
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { platform: 'WhatsApp', messages: 45, color: '#25D366', icon: WhatsApp, online: true },
            { platform: 'Email', messages: 28, color: '#EA4335', icon: Email, online: true },
            { platform: 'Instagram', messages: 32, color: '#E4405F', icon: Instagram, online: true },
            { platform: 'Facebook', messages: 18, color: '#1877F2', icon: Facebook, online: true }
          ].map((channel, index) => (
            <Grid item xs={6} key={index}>
              <Box
                sx={{
                  p: 2,
                  textAlign: 'center',
                  background: alpha(channel.color, 0.1),
                  border: `2px solid ${alpha(channel.color, 0.2)}`,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    borderColor: alpha(channel.color, 0.4),
                    boxShadow: `0 8px 25px ${alpha(channel.color, 0.15)}`
                  }
                }}
              >
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <channel.icon sx={{ fontSize: 28, color: channel.color, mb: 1 }} />
                  {channel.online && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 12,
                        height: 12,
                        backgroundColor: '#4CAF50',
                        border: `2px solid ${theme.palette.background.paper}`,
                        borderRadius: '50%'
                      }}
                    />
                  )}
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: channel.color }}>
                  {channel.messages}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>
                  {channel.platform}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ 
          p: 2, 
          background: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 2,
          textAlign: 'center',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            💬 123 mensajes totales • ⚡ 93.5% de efectividad
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  // Componente de Actividad Reciente Moderna
  const RecentActivity = () => (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
        border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
        borderRadius: 3
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
          🔄 Actividad Reciente
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { 
              action: 'Nueva venta realizada', 
              details: 'Cliente: María González - $120', 
              time: 'Hace 5 min', 
              type: 'sale',
              color: theme.palette.success.main,
              icon: ShoppingCart
            },
            { 
              action: 'Mensaje de WhatsApp', 
              details: 'Consulta sobre servicios premium', 
              time: 'Hace 15 min', 
              type: 'message',
              color: '#25D366',
              icon: WhatsApp
            },
            { 
              action: 'Stock actualizado', 
              details: 'Producto X: +50 unidades', 
              time: 'Hace 2 horas', 
              type: 'inventory',
              color: theme.palette.warning.main,
              icon: Inventory
            },
            { 
              action: 'Nuevo cliente registrado', 
              details: 'Carlos Rodríguez - Empresa ABC', 
              time: 'Hace 3 horas', 
              type: 'customer',
              color: theme.palette.info.main,
              icon: BusinessCenter
            }
          ].map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  p: 2,
                  background: alpha(activity.color, 0.05),
                  border: `1px solid ${alpha(activity.color, 0.1)}`,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    borderColor: alpha(activity.color, 0.3),
                    boxShadow: `0 4px 12px ${alpha(activity.color, 0.1)}`
                  }
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    background: alpha(activity.color, 0.1),
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconComponent sx={{ fontSize: 20, color: activity.color }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight={600}>
                    {activity.action}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {activity.details}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 3, px: isMobile ? 1 : 3 }}>
      {/* Header Moderno */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          borderRadius: 3,
          p: 4,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
            borderRadius: '50%'
          }
        }}>
          <Typography 
            variant={isMobile ? "h4" : "h2"} 
            fontWeight={800} 
            gutterBottom
            sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              position: 'relative',
              zIndex: 1
            }}
          >
            ¡Hola, {user?.first_name || 'Usuario'}! 👋
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2, position: 'relative', zIndex: 1 }}>
            Resumen completo de tu negocio • {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <Chip 
              icon={<TrendingUp />} 
              label={`Ventas: $${dashboardData.stats.totalSales.toLocaleString()}`} 
              color="success" 
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            <Chip 
              icon={<People />} 
              label={`${dashboardData.stats.newCustomers} nuevos clientes`} 
              color="primary" 
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            <Chip 
              icon={<Chat />} 
              label={`${dashboardData.stats.pendingMessages} mensajes`} 
              color="warning" 
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>
      </Box>

      {/* Grid Principal */}
      <Grid container spacing={3}>
        {/* Métricas Principales */}
        <Grid item xs={12} sm={6} md={3}>
          <ModernStatCard
            icon={AttachMoney}
            title="Ingresos Totales"
            value={`$${(dashboardData.stats.totalSales / 1000).toFixed(0)}K`}
            change="+12.5%"
            changeType="positive"
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <ModernStatCard
            icon={People}
            title="Nuevos Clientes"
            value={dashboardData.stats.newCustomers}
            change="+8 esta semana"
            changeType="positive"
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <ModernStatCard
            icon={Analytics}
            title="Tasa de Conversión"
            value={`${dashboardData.stats.conversionRate}%`}
            change="+0.4%"
            changeType="positive"
            color="warning"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <ModernStatCard
            icon={Inventory}
            title="Productos Activos"
            value="24"
            change="Todos en stock"
            changeType="positive"
            color="info"
          />
        </Grid>

        {/* Gráfica de Ingresos */}
        <Grid item xs={12} lg={8}>
          <RevenueChart />
        </Grid>

        {/* Canales de Venta */}
        <Grid item xs={12} lg={4}>
          <SalesChannels />
        </Grid>

        {/* Comunicaciones */}
        <Grid item xs={12} md={6}>
          <CommunicationsWidget />
        </Grid>

        {/* Rendimiento Semanal */}
        <Grid item xs={12} md={6}>
          <WeeklyPerformance />
        </Grid>

        {/* Actividad Reciente */}
        <Grid item xs={12}>
          <RecentActivity />
        </Grid>
      </Grid>

      {/* Footer Inspirador */}
      <Box sx={{ 
        mt: 4, 
        p: 3, 
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Typography variant="h6" fontWeight={800} gutterBottom sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>
          🚀 Tu negocio está creciendo increíblemente
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Continúa con este momentum. Revisa tus métricas regularmente para mantener el éxito.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
