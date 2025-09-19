// frontend/admin-panel/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Paper,
  alpha,
  useTheme
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
  AutoAwesome
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
      satisfaction: 94.5
    },
    performance: {
      responseTime: '1.2 min',
      automation: 87.3,
      uptime: 99.9
    }
  });

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
      label: 'Nueva Campaña',
      icon: <Rocket sx={{ fontSize: 24 }} />,
      description: 'Crear campaña multicanal',
      color: theme.palette.primary.main,
      path: '/campaigns'
    },
    {
      label: 'Respuestas IA',
      icon: <AutoAwesome sx={{ fontSize: 24 }} />,
      description: 'Configurar respuestas automáticas',
      color: theme.palette.success.main,
      path: '/ai-flows'
    },
    {
      label: 'Reportes',
      icon: <Analytics sx={{ fontSize: 24 }} />,
      description: 'Generar reportes de performance',
      color: theme.palette.warning.main,
      path: '/reports'
    },
    {
      label: 'Alertas',
      icon: <NotificationsActive sx={{ fontSize: 24 }} />,
      description: 'Configurar notificaciones',
      color: theme.palette.error.main,
      path: '/settings'
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

  const MetricCard = ({ title, value, subtitle, icon, color = 'primary' }) => (
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
        </Box>
        <Box sx={{ color: `${color}.main`, fontSize: 40 }}>
          {icon}
        </Box>
      </Box>
    </UBCard>
  );

  const QuickActionCard = ({ action }) => (
    <Paper
      sx={{
        p: 3,
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
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {action.description}
      </Typography>
      <UBButton
        variant="outlined"
        fullWidth
        sx={{ 
          borderColor: alpha(action.color, 0.3),
          color: action.color,
          '&:hover': {
            borderColor: action.color,
            backgroundColor: alpha(action.color, 0.1)
          }
        }}
      >
        Iniciar
      </UBButton>
    </Paper>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header Principal */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Bienvenido, {user?.first_name} {user?.last_name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Resumen ejecutivo de tu negocio y comunicaciones
          </Typography>
        </Box>

        {/* RESUMEN EJECUTIVO */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Ingresos Mensuales"
              value={`$${metrics.business.revenue.current.toLocaleString('es-ES')}`}
              subtitle={`${metrics.business.revenue.progress}% del objetivo`}
              icon={<AttachMoney />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Clientes Activos"
              value={metrics.business.clients.active.toLocaleString('es-ES')}
              subtitle={`+${metrics.business.clients.new} nuevos`}
              icon={<People />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Tasa de Conversión"
              value={`${metrics.business.conversions.rate}%`}
              subtitle={`${metrics.business.conversions.customers} conversiones`}
              icon={<TrendingUp />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Satisfacción"
              value={`${metrics.business.satisfaction}%`}
              subtitle="Score de clientes"
              icon={<Chat />}
              color="info"
            />
          </Grid>
        </Grid>

        {/* CENTRO DE COMUNICACIONES */}
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

        {/* ACCIONES RÁPIDAS Y RENDIMIENTO */}
        <Grid container spacing={3}>
          {/* Acciones Rápidas */}
          <Grid item xs={12} md={8}>
            <UBCard title="⚡ Acciones Inmediatas">
              <Grid container spacing={2}>
                {quickActions.map((action, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <QuickActionCard action={action} />
                  </Grid>
                ))}
              </Grid>
            </UBCard>
          </Grid>

          {/* Métricas de Rendimiento */}
          <Grid item xs={12} md={4}>
            <UBCard title="📈 Rendimiento del Sistema">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Schedule sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight={700}>
                    {metrics.performance.responseTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tiempo de respuesta
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                  <AutoAwesome sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight={700}>
                    {metrics.performance.automation}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Automatización
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                  <TrendingUp sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight={700}>
                    {metrics.performance.uptime}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Uptime del sistema
                  </Typography>
                </Box>
              </Box>
            </UBCard>
          </Grid>
        </Grid>

        {/* LLAMADO A LA ACCIÓN */}
        <UBCard
          sx={{
            mt: 4,
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Box sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              ¿Listo para automatizar tu comunicación?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Conecta todos tus canales y comienza a responder mensajes automáticamente con IA
            </Typography>
            <UBButton
              variant="contained"
              size="large"
              sx={{
                background: 'white',
                color: 'primary.main',
                px: 4,
                '&:hover': {
                  background: '#f8fafc'
                }
              }}
            >
              Comenzar Ahora
            </UBButton>
          </Box>
        </UBCard>
      </Box>
    </Container>
  );
};

export default Dashboard;