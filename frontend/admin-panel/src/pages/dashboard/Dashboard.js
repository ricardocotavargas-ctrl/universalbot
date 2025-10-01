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
  useMediaQuery
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
  Facebook
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Datos realistas y útiles
  const dashboardData = {
    user: {
      name: user?.first_name || 'Usuario',
      business: user?.business?.name || 'Tu Negocio'
    },
    metrics: {
      todaySales: 2340,
      monthlySales: 52340,
      newCustomers: 12,
      pendingMessages: 8,
      conversionRate: 3.2,
      customerSatisfaction: 4.7
    },
    channels: [
      { name: 'WhatsApp', value: 45, icon: WhatsApp, color: '#25D366' },
      { name: 'Email', value: 28, icon: Email, color: '#EA4335' },
      { name: 'Instagram', value: 32, icon: Instagram, color: '#E4405F' },
      { name: 'Facebook', value: 18, icon: Facebook, color: '#1877F2' }
    ],
    recentActivity: [
      { action: 'Venta completada', amount: 120, customer: 'María González', time: 'Hace 5 min' },
      { action: 'Nuevo mensaje', customer: 'Carlos Rodríguez', time: 'Hace 15 min' },
      { action: 'Cliente registrado', customer: 'Ana Martínez', time: 'Hace 1 hora' }
    ]
  };

  // Componente de métrica simple y clara
  const MetricCard = ({ title, value, subtitle, icon: Icon, color = 'primary' }) => (
    <Card 
      sx={{ 
        height: '100%',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 2,
        background: theme.palette.background.paper,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: alpha(theme.palette[color].main, 0.3),
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={600} color={`${color}.main`}>
              {value}
            </Typography>
            <Typography variant="h6" fontWeight={500} sx={{ mt: 1 }}>
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1.5,
              background: alpha(theme.palette[color].main, 0.1),
              borderRadius: 2
            }}
          >
            <Icon sx={{ fontSize: 24, color: `${color}.main` }} />
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  // Componente de canal de comunicación
  const ChannelCard = ({ channel }) => {
    const IconComponent = channel.icon;
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 2,
          background: theme.palette.background.paper,
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: alpha(channel.color, 0.3)
          }
        }}
      >
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
          <IconComponent sx={{ fontSize: 20, color: channel.color }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" fontWeight={500}>
            {channel.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {channel.value} mensajes
          </Typography>
        </Box>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#4CAF50'
          }}
        />
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3, px: isMobile ? 2 : 3 }}>
      {/* Header limpio y profesional */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          fontWeight={600} 
          gutterBottom
          color="text.primary"
        >
          Buen día, {dashboardData.user.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Resumen de {dashboardData.user.business} • {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Typography>
      </Box>

      {/* Grid principal */}
      <Grid container spacing={3}>
        {/* Métricas principales */}
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={AttachMoney}
            title="Ventas Hoy"
            value={`$${dashboardData.metrics.todaySales}`}
            subtitle="Total del día de hoy"
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={ShoppingCart}
            title="Ventas Mensuales"
            value={`$${dashboardData.metrics.monthlySales.toLocaleString()}`}
            subtitle="Este mes"
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={People}
            title="Nuevos Clientes"
            value={dashboardData.metrics.newCustomers}
            subtitle="Este mes"
            color="info"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={Chat}
            title="Mensajes"
            value={dashboardData.metrics.pendingMessages}
            subtitle="Por responder"
            color="warning"
          />
        </Grid>

        {/* Sección de canales de comunicación */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Canales de Comunicación
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Estado de tus canales de mensajería
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {dashboardData.channels.map((channel, index) => (
                  <ChannelCard key={index} channel={channel} />
                ))}
              </Box>

              <Box sx={{ mt: 3, p: 2, background: alpha(theme.palette.primary.main, 0.02), borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" align="center">
                  <strong>123 mensajes</strong> recibidos hoy • <strong>45 respondidos</strong>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Actividad reciente */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Actividad Reciente
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Últimas acciones en tu negocio
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {dashboardData.recentActivity.map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      p: 2,
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 2
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        mt: 1,
                        flexShrink: 0
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={500}>
                        {activity.action}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {activity.customer}
                        {activity.amount && ` • $${activity.amount}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Resumen financiero simple */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Resumen Financiero
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1">Ingresos del Mes</Typography>
                  <Typography variant="h6" color="success.main" fontWeight={600}>
                    ${dashboardData.metrics.monthlySales.toLocaleString()}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1">Tasa de Conversión</Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {dashboardData.metrics.conversionRate}%
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1">Satisfacción del Cliente</Typography>
                  <Typography variant="h6" color="warning.main" fontWeight={600}>
                    {dashboardData.metrics.customerSatisfaction}/5
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3, p: 2, background: alpha(theme.palette.success.main, 0.05), borderRadius: 2 }}>
                <Typography variant="body2" color="success.main" align="center" fontWeight={500}>
                  📈 Tendencia positiva este mes
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Inventario rápido */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Estado de Inventario
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                {[
                  { product: 'Producto Premium', stock: 45, status: 'good' },
                  { product: 'Servicio Básico', stock: 15, status: 'warning' },
                  { product: 'Kit Inicial', stock: 89, status: 'good' }
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      border: `1px solid ${
                        item.status === 'good' ? 
                        alpha(theme.palette.success.main, 0.2) : 
                        alpha(theme.palette.warning.main, 0.2)
                      }`,
                      borderRadius: 2,
                      background: item.status === 'good' ? 
                        alpha(theme.palette.success.main, 0.05) : 
                        alpha(theme.palette.warning.main, 0.05)
                    }}
                  >
                    <Typography variant="body1" fontWeight={500}>
                      {item.product}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      fontWeight={600}
                      color={item.status === 'good' ? 'success.main' : 'warning.main'}
                    >
                      {item.stock} unidades
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 3, p: 2, background: alpha(theme.palette.info.main, 0.05), borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" align="center">
                  <strong>2 productos</strong> necesitan atención
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Mensaje de cierre limpio */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Actualizado por última vez hoy a las {new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
