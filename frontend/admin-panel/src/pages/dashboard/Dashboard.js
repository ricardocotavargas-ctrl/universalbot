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
  useMediaQuery
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
  Instagram
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// Componentes de gráficas modernas
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Datos modernos y realistas
  const dashboardData = {
    stats: {
      totalSales: 23450,
      newCustomers: 45,
      pendingMessages: 23,
      conversionRate: 3.2
    },
    revenueData: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Ingresos 2024',
          data: [12000, 19000, 15000, 22000, 18000, 23450],
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          fill: true,
          tension: 0.4,
          borderWidth: 3
        }
      ]
    },
    salesChannelData: {
      labels: ['WhatsApp', 'Sitio Web', 'Instagram', 'Facebook'],
      datasets: [
        {
          data: [45, 28, 22, 12],
          backgroundColor: [
            '#25D366',
            theme.palette.primary.main,
            '#E4405F',
            '#1877F2'
          ],
          borderWidth: 0
        }
      ]
    },
    performanceData: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Ventas Semanales',
          data: [12, 19, 8, 15, 22, 18, 25],
          backgroundColor: alpha(theme.palette.success.main, 0.8),
          borderRadius: 8,
          borderSkipped: false
        }
      ]
    }
  };

  // Opciones modernas para las gráficas
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            family: theme.typography.fontFamily
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: alpha(theme.palette.divider, 0.1)
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: theme.typography.fontFamily
          }
        }
      }
    }
  };

  // Componente de Tarjeta de Métrica Moderna
  const ModernStatCard = ({ icon: Icon, title, value, change, color = 'primary' }) => (
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
          <Chip 
            label={change} 
            size="small"
            sx={{ 
              background: alpha(theme.palette.success.main, 0.1),
              color: theme.palette.success.main,
              fontWeight: 600,
              border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
            }}
          />
        )}
      </CardContent>
    </Card>
  );

  // Componente de Gráfica de Ingresos
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
        
        <Box sx={{ height: isMobile ? 250 : 300, position: 'relative' }}>
          <Line 
            data={dashboardData.revenueData} 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: { display: false }
              }
            }} 
          />
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
        
        <Box sx={{ height: isMobile ? 200 : 250, position: 'relative', mb: 3 }}>
          <Doughnut 
            data={dashboardData.salesChannelData} 
            options={doughnutOptions}
          />
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { platform: 'WhatsApp', percentage: 42, color: '#25D366', icon: WhatsApp },
            { platform: 'Sitio Web', percentage: 26, color: theme.palette.primary.main },
            { platform: 'Instagram', percentage: 21, color: '#E4405F', icon: Instagram },
            { platform: 'Facebook', percentage: 11, color: '#1877F2', icon: Facebook }
          ].map((channel, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                {channel.icon && (
                  <channel.icon sx={{ color: channel.color, fontSize: 20 }} />
                )}
                <Typography variant="body2" fontWeight={600}>
                  {channel.platform}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ 
                  width: '100%', 
                  height: 8, 
                  backgroundColor: alpha(channel.color, 0.1),
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <Box
                    sx={{
                      width: `${channel.percentage}%`,
                      height: '100%',
                      backgroundColor: channel.color,
                      borderRadius: 4,
                      transition: 'width 0.8s ease'
                    }}
                  />
                </Box>
              </Box>
              <Typography variant="body2" fontWeight={700} sx={{ minWidth: 40 }}>
                {channel.percentage}%
              </Typography>
            </Box>
          ))}
        </Box>
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
        
        <Box sx={{ height: isMobile ? 200 : 250, position: 'relative' }}>
          <Bar 
            data={dashboardData.performanceData} 
            options={chartOptions}
          />
        </Box>
        
        <Box sx={{ 
          mt: 3, 
          p: 2, 
          background: alpha(theme.palette.success.main, 0.05),
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`
        }}>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            <strong>Domingo</strong> fue tu mejor día con <strong>25 ventas</strong> 🎉
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
            { platform: 'WhatsApp', messages: 45, color: '#25D366', icon: WhatsApp },
            { platform: 'Email', messages: 28, color: '#EA4335', icon: Email },
            { platform: 'Instagram', messages: 32, color: '#E4405F', icon: Instagram },
            { platform: 'Facebook', messages: 18, color: '#1877F2', icon: Facebook }
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
                  '&:hover': {
                    transform: 'scale(1.05)',
                    borderColor: alpha(channel.color, 0.4)
                  }
                }}
              >
                <channel.icon sx={{ fontSize: 24, color: channel.color, mb: 1 }} />
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
          textAlign: 'center'
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
              color: theme.palette.success.main
            },
            { 
              action: 'Mensaje de WhatsApp', 
              details: 'Consulta sobre servicios premium', 
              time: 'Hace 15 min', 
              type: 'message',
              color: '#25D366'
            },
            { 
              action: 'Stock actualizado', 
              details: 'Producto X: +50 unidades', 
              time: 'Hace 2 horas', 
              type: 'inventory',
              color: theme.palette.warning.main
            },
            { 
              action: 'Nuevo cliente registrado', 
              details: 'Carlos Rodríguez - Empresa ABC', 
              time: 'Hace 3 horas', 
              type: 'customer',
              color: theme.palette.info.main
            }
          ].map((activity, index) => (
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
                  borderColor: alpha(activity.color, 0.3)
                }
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: activity.color,
                  mt: 0.5,
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
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
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
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <ModernStatCard
            icon={People}
            title="Nuevos Clientes"
            value={dashboardData.stats.newCustomers}
            change="+8 esta semana"
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <ModernStatCard
            icon={Analytics}
            title="Tasa de Conversión"
            value={`${dashboardData.stats.conversionRate}%`}
            change="+0.4%"
            color="warning"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <ModernStatCard
            icon={Inventory}
            title="Productos Activos"
            value="24"
            change="Todos en stock"
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
