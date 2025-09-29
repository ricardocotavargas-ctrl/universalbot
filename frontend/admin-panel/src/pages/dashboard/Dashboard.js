// frontend/admin-panel/src/pages/dashboard/Dashboard.js
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
  Card,
  CardContent,
  LinearProgress,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Badge
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  Instagram,
  Email,
  Chat,
  People,
  TrendingUp,
  Schedule,
  Business,
  AttachMoney,
  Analytics,
  Rocket,
  NotificationsActive,
  AutoAwesome,
  Inventory,
  AccountBalance,
  Receipt,
  Campaign,
  SmartToy,
  Settings,
  Warning,
  CheckCircle,
  Error,
  ShoppingCart,
  Group,
  BarChart,
  MoreVert,
  Notifications,
  CalendarToday,
  LocalOffer
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import UBButton from '../../components/ui/UBButton';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    channels: {
      whatsapp: { connected: true, messages: 1240, responses: 1180, trend: '+12%' },
      facebook: { connected: true, messages: 890, responses: 820, trend: '+8%' },
      instagram: { connected: true, messages: 670, responses: 610, trend: '+15%' },
      email: { connected: true, messages: 450, responses: 430, trend: '+5%' }
    },
    business: {
      revenue: { current: 23450, target: 50000, progress: 47 },
      clients: { total: 284, new: 12, active: 268 },
      conversions: { leads: 156, customers: 42, rate: 26.9 },
      satisfaction: 94.5,
      expenses: 18760,
      profit: 4690
    },
    performance: {
      responseTime: '1.2 min',
      automation: 87.3,
      uptime: 99.9
    },
    inventory: {
      totalProducts: 156,
      lowStock: 8,
      outOfStock: 3,
      totalValue: 45230
    },
    financial: {
      accountsReceivable: 12500,
      accountsPayable: 8700,
      cashFlow: 3800
    }
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'sale', message: 'Nueva venta realizada - $350', time: 'Hace 5 min', user: 'Carlos Rodríguez' },
    { id: 2, type: 'client', message: 'Cliente nuevo registrado', time: 'Hace 12 min', user: 'Ana Martínez' },
    { id: 3, type: 'inventory', message: 'Stock bajo en Café Premium', time: 'Hace 25 min', user: 'Sistema' },
    { id: 4, type: 'payment', message: 'Pago recibido - $1,250', time: 'Hace 1 hora', user: 'María González' },
    { id: 5, type: 'alert', message: 'Recordatorio: Impuestos por pagar', time: 'Hace 2 horas', user: 'Sistema' }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: '5 productos con stock bajo', action: 'Revisar inventario' },
    { id: 2, type: 'error', message: '2 productos agotados', action: 'Reabastecer' },
    { id: 3, type: 'info', message: 'Reporte mensual listo', action: 'Descargar' }
  ]);

  const channelStats = [
    {
      platform: 'WhatsApp',
      icon: <WhatsApp sx={{ color: '#25D366', fontSize: 32 }} />,
      connected: metrics.channels.whatsapp.connected,
      messages: metrics.channels.whatsapp.messages,
      responses: metrics.channels.whatsapp.responses,
      trend: metrics.channels.whatsapp.trend,
      color: '#25D366'
    },
    {
      platform: 'Facebook',
      icon: <Facebook sx={{ color: '#1877F2', fontSize: 32 }} />,
      connected: metrics.channels.facebook.connected,
      messages: metrics.channels.facebook.messages,
      responses: metrics.channels.facebook.responses,
      trend: metrics.channels.facebook.trend,
      color: '#1877F2'
    },
    {
      platform: 'Instagram',
      icon: <Instagram sx={{ color: '#E4405F', fontSize: 32 }} />,
      connected: metrics.channels.instagram.connected,
      messages: metrics.channels.instagram.messages,
      responses: metrics.channels.instagram.responses,
      trend: metrics.channels.instagram.trend,
      color: '#E4405F'
    },
    {
      platform: 'Email',
      icon: <Email sx={{ color: '#EA4335', fontSize: 32 }} />,
      connected: metrics.channels.email.connected,
      messages: metrics.channels.email.messages,
      responses: metrics.channels.email.responses,
      trend: metrics.channels.email.trend,
      color: '#EA4335'
    }
  ];

  const quickActions = [
    {
      label: 'Nueva Venta',
      icon: <ShoppingCart sx={{ fontSize: 24 }} />,
      description: 'Registrar nueva venta',
      color: theme.palette.primary.main,
      path: '/sales/new'
    },
    {
      label: 'Gestión de Inventario',
      icon: <Inventory sx={{ fontSize: 24 }} />,
      description: 'Ver y gestionar productos',
      color: theme.palette.success.main,
      path: '/inventory/products'
    },
    {
      label: 'Reportes Financieros',
      icon: <AccountBalance sx={{ fontSize: 24 }} />,
      description: 'Análisis financiero',
      color: theme.palette.warning.main,
      path: '/financial/reports'
    },
    {
      label: 'Campañas Marketing',
      icon: <Campaign sx={{ fontSize: 24 }} />,
      description: 'Crear campañas',
      color: theme.palette.info.main,
      path: '/marketing/campaigns'
    },
    {
      label: 'Respuestas IA',
      icon: <SmartToy sx={{ fontSize: 24 }} />,
      description: 'Configurar automatizaciones',
      color: theme.palette.success.main,
      path: '/ai-flows'
    },
    {
      label: 'Configuración',
      icon: <Settings sx={{ fontSize: 24 }} />,
      description: 'Ajustes del sistema',
      color: theme.palette.grey[600],
      path: '/settings'
    }
  ];

  const moduleStats = [
    {
      module: 'Ventas',
      icon: <ShoppingCart sx={{ fontSize: 24 }} />,
      value: '125',
      label: 'Ventas este mes',
      trend: '+15%',
      color: 'primary'
    },
    {
      module: 'Inventario',
      icon: <Inventory sx={{ fontSize: 24 }} />,
      value: '156',
      label: 'Productos activos',
      trend: '+8%',
      color: 'success'
    },
    {
      module: 'Clientes',
      icon: <Group sx={{ fontSize: 24 }} />,
      value: '284',
      label: 'Clientes registrados',
      trend: '+12%',
      color: 'info'
    },
    {
      module: 'Finanzas',
      icon: <AttachMoney sx={{ fontSize: 24 }} />,
      value: '$23,450',
      label: 'Ingresos mensuales',
      trend: '+22%',
      color: 'warning'
    }
  ];

  const ChannelCard = ({ channel }) => (
    <UBCard sx={{ 
      height: '100%',
      background: `linear-gradient(135deg, ${alpha(channel.color, 0.1)} 0%, ${alpha(channel.color, 0.05)} 100%)`,
      border: `2px solid ${alpha(channel.color, 0.2)}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        borderColor: alpha(channel.color, 0.4),
        boxShadow: `0 8px 32px ${alpha(channel.color, 0.15)}`
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {channel.icon}
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {channel.platform}
            </Typography>
            <Chip
              label={channel.connected ? 'Conectado' : 'Desconectado'}
              size="small"
              color={channel.connected ? 'success' : 'error'}
              sx={{ height: 20, fontSize: '0.7rem' }}
            />
          </Box>
        </Box>
        <Chip
          label={channel.trend}
          size="small"
          sx={{ 
            backgroundColor: alpha('#059669', 0.2),
            color: '#059669',
            fontWeight: 600
          }}
        />
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color={channel.color}>
              {channel.messages}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mensajes
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700}>
              {channel.responses}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Respuestas
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ 
        background: alpha(theme.palette.background.paper, 0.5),
        borderRadius: 2,
        p: 1.5,
        textAlign: 'center'
      }}>
        <Typography variant="body2" fontWeight={600}>
          {((channel.responses / channel.messages) * 100).toFixed(1)}%
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Tasa de efectividad
        </Typography>
      </Box>
    </UBCard>
  );

  const MetricCard = ({ title, value, subtitle, icon, color = 'primary', progress }) => (
    <UBCard sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
          {progress !== undefined && (
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              color={color}
              sx={{ mt: 1, height: 6, borderRadius: 3 }}
            />
          )}
        </Box>
        <Box sx={{ color: `${color}.main`, fontSize: 40 }}>
          {icon}
        </Box>
      </Box>
    </UBCard>
  );

  const ModuleStatCard = ({ stat }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ 
            background: alpha(theme.palette[stat.color].main, 0.1),
            borderRadius: 2,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box sx={{ color: `${stat.color}.main` }}>
              {stat.icon}
            </Box>
          </Box>
          <Chip
            label={stat.trend}
            size="small"
            color="success"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {stat.value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {stat.label}
        </Typography>
        <Typography variant="caption" color={`${stat.color}.main`} fontWeight={600}>
          {stat.module}
        </Typography>
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ action }) => (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(action.color, 0.1)} 0%, ${alpha(action.color, 0.05)} 100%)`,
        border: `2px solid ${alpha(action.color, 0.2)}`,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: alpha(action.color, 0.4),
          boxShadow: `0 6px 24px ${alpha(action.color, 0.15)}`
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ 
          background: alpha(action.color, 0.2),
          borderRadius: 2,
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {action.icon}
        </Box>
        <Typography variant="h6" fontWeight={600}>
          {action.label}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {action.description}
      </Typography>
      <UBButton
        variant="outlined"
        fullWidth
        size="small"
        sx={{ 
          borderColor: alpha(action.color, 0.3),
          color: action.color,
          '&:hover': {
            borderColor: action.color,
            backgroundColor: alpha(action.color, 0.1)
          }
        }}
      >
        Acceder
      </UBButton>
    </Paper>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'sale': return <ShoppingCart color="success" />;
        case 'client': return <People color="info" />;
        case 'inventory': return <Inventory color="warning" />;
        case 'payment': return <AttachMoney color="success" />;
        case 'alert': return <Warning color="error" />;
        default: return <Notifications color="primary" />;
      }
    };

    return (
      <ListItem sx={{ px: 0 }}>
        <ListItemIcon>
          {getActivityIcon(activity.type)}
        </ListItemIcon>
        <ListItemText
          primary={activity.message}
          secondary={`${activity.time} • ${activity.user}`}
        />
      </ListItem>
    );
  };

  const AlertItem = ({ alert }) => {
    const getAlertIcon = (type) => {
      switch (type) {
        case 'warning': return <Warning color="warning" />;
        case 'error': return <Error color="error" />;
        case 'info': return <CheckCircle color="info" />;
        default: return <Notifications color="primary" />;
      }
    };

    return (
      <ListItem sx={{ px: 0 }}>
        <ListItemIcon>
          {getAlertIcon(alert.type)}
        </ListItemIcon>
        <ListItemText
          primary={alert.message}
          secondary={alert.action}
        />
        <Button size="small" variant="outlined">
          Acción
        </Button>
      </ListItem>
    );
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header Principal */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Bienvenido, {user?.first_name} {user?.last_name} 👋
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Resumen ejecutivo de tu negocio - {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Hoy
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* MÓDULOS PRINCIPALES */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {moduleStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ModuleStatCard stat={stat} />
            </Grid>
          ))}
        </Grid>

        {/* RESUMEN EJECUTIVO MEJORADO */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Ingresos Mensuales"
              value={`$${metrics.business.revenue.current.toLocaleString('es-ES')}`}
              subtitle={`${metrics.business.revenue.progress}% del objetivo`}
              icon={<AttachMoney />}
              color="primary"
              progress={metrics.business.revenue.progress}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Clientes Activos"
              value={metrics.business.clients.active.toLocaleString('es-ES')}
              subtitle={`+${metrics.business.clients.new} nuevos este mes`}
              icon={<People />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Utilidad Neta"
              value={`$${metrics.business.profit.toLocaleString('es-ES')}`}
              subtitle={`${((metrics.business.profit / metrics.business.revenue.current) * 100).toFixed(1)}% de margen`}
              icon={<TrendingUp />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Valor Inventario"
              value={`$${metrics.inventory.totalValue.toLocaleString('es-ES')}`}
              subtitle={`${metrics.inventory.totalProducts} productos`}
              icon={<Inventory />}
              color="info"
            />
          </Grid>
        </Grid>

        {/* CENTRO DE COMUNICACIONES (MANTENIDO) */}
        <UBCard
          title="📊 Centro de Comunicaciones"
          subtitle="Desempeño de todos tus canales de mensajería"
          sx={{ mb: 4 }}
        >
          <Grid container spacing={3}>
            {channelStats.map((channel, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ChannelCard channel={channel} />
              </Grid>
            ))}
          </Grid>
        </UBCard>

        {/* SEGUNDA FILA: ACCIONES RÁPIDAS, ACTIVIDAD Y ALERTAS */}
        <Grid container spacing={3}>
          {/* Acciones Rápidas */}
          <Grid item xs={12} md={6}>
            <UBCard 
              title="⚡ Acciones Inmediatas"
              action={
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              }
            >
              <Grid container spacing={2}>
                {quickActions.map((action, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <QuickActionCard action={action} />
                  </Grid>
                ))}
              </Grid>
            </UBCard>
          </Grid>

          {/* Columna derecha: Actividad y Alertas */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {/* Actividad Reciente */}
              <Grid item xs={12}>
                <UBCard 
                  title="📝 Actividad Reciente"
                  action={
                    <Button size="small" color="primary">
                      Ver todo
                    </Button>
                  }
                >
                  <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {recentActivities.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </List>
                </UBCard>
              </Grid>

              {/* Alertas del Sistema */}
              <Grid item xs={12}>
                <UBCard 
                  title="🚨 Alertas del Sistema"
                  action={
                    <Badge badgeContent={alerts.length} color="error">
                      <Notifications color="action" />
                    </Badge>
                  }
                >
                  <List>
                    {alerts.map((alert) => (
                      <AlertItem key={alert.id} alert={alert} />
                    ))}
                  </List>
                </UBCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* TERCERA FILA: RENDIMIENTO Y ESTADO DEL SISTEMA */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Métricas de Rendimiento */}
          <Grid item xs={12} md={8}>
            <UBCard title="📈 Rendimiento del Sistema">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Schedule sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight={700}>
                      {metrics.performance.responseTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tiempo de respuesta promedio
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <AutoAwesome sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight={700}>
                      {metrics.performance.automation}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mensajes automatizados
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <TrendingUp sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight={700}>
                      {metrics.performance.uptime}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Uptime del sistema
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </UBCard>
          </Grid>

          {/* Estado de Inventario */}
          <Grid item xs={12} md={4}>
            <UBCard title="📦 Estado de Inventario">
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Productos con stock bajo:</Typography>
                  <Typography variant="body2" fontWeight={700} color="warning.main">
                    {metrics.inventory.lowStock}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Productos agotados:</Typography>
                  <Typography variant="body2" fontWeight={700} color="error.main">
                    {metrics.inventory.outOfStock}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Total productos:</Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {metrics.inventory.totalProducts}
                  </Typography>
                </Box>
              </Box>
              <Button variant="contained" fullWidth startIcon={<Inventory />}>
                Gestionar Inventario
              </Button>
            </UBCard>
          </Grid>
        </Grid>

        {/* LÍNEA FINAL: PROMOCIONES O ESTADÍSTICAS RÁPIDAS */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <UBCard
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  💰 Flujo de Caja
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  Balance actual: <strong>${metrics.financial.cashFlow}</strong>
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Por cobrar: ${metrics.financial.accountsReceivable}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Por pagar: ${metrics.financial.accountsPayable}
                  </Typography>
                </Box>
              </Box>
            </UBCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <UBCard
              sx={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white'
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  🎯 Objetivos del Mes
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  {metrics.business.revenue.progress}% completado
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={metrics.business.revenue.progress} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'white'
                    }
                  }}
                />
              </Box>
            </UBCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
