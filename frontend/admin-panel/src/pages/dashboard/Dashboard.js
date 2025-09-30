import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Paper,
  alpha,
  useTheme,
  IconButton,
  Card,
  CardContent,
  useMediaQuery
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  Instagram,
  Email,
  Chat,
  People,
  TrendingUp,
  AttachMoney,
  Analytics,
  Inventory,
  Notifications,
  Schedule,
  BusinessCenter
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Datos de ejemplo para el dashboard
  const dashboardData = {
    stats: {
      totalSales: 23450,
      newCustomers: 45,
      pendingMessages: 23,
      monthlyGrowth: 12.5
    },
    communications: [
      { platform: 'WhatsApp', icon: WhatsApp, messages: 1240, connected: true, color: '#25D366' },
      { platform: 'Facebook', icon: Facebook, messages: 890, connected: true, color: '#1877F2' },
      { platform: 'Instagram', icon: Instagram, messages: 670, connected: true, color: '#E4405F' },
      { platform: 'Email', icon: Email, messages: 450, connected: true, color: '#EA4335' }
    ],
    financial: {
      revenue: 52340,
      expenses: 28790,
      profit: 23550,
      growth: 8.2
    },
    recentActivity: [
      { action: 'Nueva venta', details: 'Cliente: María González - $120', time: 'Hace 5 min', type: 'sale' },
      { action: 'Mensaje recibido', details: 'WhatsApp: Consulta de servicios', time: 'Hace 15 min', type: 'message' },
      { action: 'Stock actualizado', details: 'Producto X: +50 unidades', time: 'Hace 2 horas', type: 'inventory' }
    ]
  };

  // Componente de Tarjeta de Estadística
  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary' }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
        border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4]
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} color={`${color}.main`}>
              {value}
            </Typography>
            <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
              {title}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: 40, color: `${color}.main`, opacity: 0.8 }} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  // Componente de Canal de Comunicación
  const ChannelCard = ({ channel }) => {
    const IconComponent = channel.icon;
    return (
      <Card 
        sx={{ 
          textAlign: 'center',
          background: `linear-gradient(135deg, ${alpha(channel.color, 0.1)} 0%, ${alpha(channel.color, 0.05)} 100%)`,
          border: `1px solid ${alpha(channel.color, 0.2)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: alpha(channel.color, 0.4)
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <IconComponent sx={{ fontSize: 32, color: channel.color, mb: 2 }} />
          <Typography variant="h5" fontWeight={700} sx={{ color: channel.color }}>
            {channel.messages.toLocaleString()}
          </Typography>
          <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
            {channel.platform}
          </Typography>
          <Chip 
            label={channel.connected ? 'Conectado' : 'Desconectado'} 
            size="small" 
            color={channel.connected ? 'success' : 'error'}
            variant="outlined"
          />
        </CardContent>
      </Card>
    );
  };

  // Componente de Resumen Financiero
  const FinancialOverview = () => (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AttachMoney color="primary" />
          Resumen Financiero
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1">Ingresos Totales</Typography>
            <Typography variant="h6" color="success.main" fontWeight={600}>
              ${dashboardData.financial.revenue.toLocaleString()}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1">Gastos</Typography>
            <Typography variant="h6" color="error.main" fontWeight={600}>
              ${dashboardData.financial.expenses.toLocaleString()}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1">Utilidad Neta</Typography>
            <Typography variant="h6" color="primary.main" fontWeight={600}>
              ${dashboardData.financial.profit.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ 
          p: 2, 
          background: alpha(theme.palette.success.main, 0.1), 
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="success.main" fontWeight={600}>
            📈 Crecimiento del {dashboardData.financial.growth}% este mes
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  // Componente de Actividad Reciente
  const RecentActivity = () => (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Schedule color="primary" />
          Actividad Reciente
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
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                background: alpha(theme.palette.background.paper, 0.5)
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 
                    activity.type === 'sale' ? 'success.main' :
                    activity.type === 'message' ? 'primary.main' : 'warning.main',
                  mt: 1
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight={600}>
                  {activity.action}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {activity.details}
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
  );

  // Componente de Análisis de Ventas
  const SalesAnalytics = () => (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Analytics color="primary" />
          Análisis de Ventas
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="primary.main" fontWeight={700}>
                45
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ventas Hoy
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="success.main" fontWeight={700}>
                285
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Este Mes
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ 
          p: 2, 
          background: alpha(theme.palette.primary.main, 0.05), 
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Producto más vendido:</strong> Servicio Premium (28 ventas)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  // Componente de Gestión de Inventario
  const InventoryManagement = () => (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Inventory color="primary" />
          Gestión de Inventario
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { product: 'Producto Premium', stock: 45, min: 20, status: 'optimal' },
            { product: 'Servicio Básico', stock: 15, min: 25, status: 'low' },
            { product: 'Kit Inicial', stock: 89, min: 30, status: 'optimal' }
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                border: `1px solid ${
                  item.status === 'optimal' ? alpha(theme.palette.success.main, 0.2) : 
                  alpha(theme.palette.warning.main, 0.2)
                }`,
                borderRadius: 2,
                background: item.status === 'optimal' ? 
                  alpha(theme.palette.success.main, 0.05) : 
                  alpha(theme.palette.warning.main, 0.05)
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  {item.product}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock: {item.stock} / Mín: {item.min}
                </Typography>
              </Box>
              <Chip 
                label={item.status === 'optimal' ? 'Óptimo' : 'Stock Bajo'} 
                size="small"
                color={item.status === 'optimal' ? 'success' : 'warning'}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3, px: isMobile ? 2 : 3 }}>
      {/* Header del Dashboard */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          fontWeight={700} 
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          ¡Bienvenido, {user?.first_name || 'Usuario'}!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Resumen completo de tu negocio - {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Typography>
        
        {/* Estadísticas rápidas */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Chip 
            icon={<TrendingUp />} 
            label={`Ventas: $${dashboardData.stats.totalSales.toLocaleString()}`} 
            color="success" 
            variant="outlined" 
          />
          <Chip 
            icon={<People />} 
            label={`${dashboardData.stats.newCustomers} nuevos clientes`} 
            color="primary" 
            variant="outlined" 
          />
          <Chip 
            icon={<Chat />} 
            label={`${dashboardData.stats.pendingMessages} mensajes`} 
            color="warning" 
            variant="outlined" 
          />
        </Box>
      </Box>

      {/* Grid principal del dashboard */}
      <Grid container spacing={3}>
        {/* Estadísticas principales */}
        <Grid item xs={12} md={3}>
          <StatCard
            icon={AttachMoney}
            title="Ventas Totales"
            value={`$${(dashboardData.stats.totalSales / 1000).toFixed(0)}K`}
            subtitle="Este mes"
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} md={3}>
          <StatCard
            icon={People}
            title="Nuevos Clientes"
            value={dashboardData.stats.newCustomers}
            subtitle="Clientes registrados"
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} md={3}>
          <StatCard
            icon={TrendingUp}
            title="Crecimiento"
            value={`+${dashboardData.stats.monthlyGrowth}%`}
            subtitle="Vs mes anterior"
            color="warning"
          />
        </Grid>
        
        <Grid item xs={12} md={3}>
          <StatCard
            icon={BusinessCenter}
            title="Productividad"
            value="94%"
            subtitle="Eficiencia operativa"
            color="info"
          />
        </Grid>

        {/* Centro de Comunicaciones */}
        <Grid item xs={12}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chat color="primary" />
                Centro de Comunicaciones
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Gestión unificada de todos tus canales de mensajería
              </Typography>
              
              <Grid container spacing={2}>
                {dashboardData.communications.map((channel, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <ChannelCard channel={channel} />
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ 
                mt: 3, 
                p: 2, 
                background: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 2,
                textAlign: 'center'
              }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>3,250 mensajes totales</strong> procesados • <strong>93.5%</strong> de efectividad
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Segunda fila de widgets */}
        <Grid item xs={12} md={6}>
          <FinancialOverview />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <SalesAnalytics />
        </Grid>

        {/* Tercera fila de widgets */}
        <Grid item xs={12} md={6}>
          <RecentActivity />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <InventoryManagement />
        </Grid>
      </Grid>

      {/* Mensaje de bienvenida para nuevos usuarios */}
      <Box sx={{ 
        mt: 4, 
        p: 3, 
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        textAlign: 'center'
      }}>
        <Typography variant="h6" fontWeight={600} color="primary.main" gutterBottom>
          🎯 Todo bajo control
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Tu negocio está funcionando de manera óptima. Revisa regularmente este dashboard para mantenerte al tanto del rendimiento.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
