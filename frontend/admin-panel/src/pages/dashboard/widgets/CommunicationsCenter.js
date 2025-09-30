import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
  alpha,
  useTheme,
  LinearProgress,
  useMediaQuery
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  Instagram,
  Email,
  TrendingUp,
  TrendingDown,
  Speed,
  Schedule
} from '@mui/icons-material';
import UBCard from '../../../components/ui/UBCard';

const CommunicationsCenter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const channelStats = [
    {
      platform: 'WhatsApp',
      icon: <WhatsApp sx={{ color: '#25D366', fontSize: 32 }} />,
      connected: true,
      messages: 1240,
      responses: 1180,
      trend: '+12%',
      trendDirection: 'up',
      color: '#25D366',
      status: 'optimal'
    },
    {
      platform: 'Facebook',
      icon: <Facebook sx={{ color: '#1877F2', fontSize: 32 }} />,
      connected: true,
      messages: 890,
      responses: 820,
      trend: '+8%',
      trendDirection: 'up',
      color: '#1877F2',
      status: 'good'
    },
    {
      platform: 'Instagram',
      icon: <Instagram sx={{ color: '#E4405F', fontSize: 32 }} />,
      connected: true,
      messages: 670,
      responses: 610,
      trend: '+15%',
      trendDirection: 'up',
      color: '#E4405F',
      status: 'excellent'
    },
    {
      platform: 'Email',
      icon: <Email sx={{ color: '#EA4335', fontSize: 32 }} />,
      connected: true,
      messages: 450,
      responses: 430,
      trend: '+5%',
      trendDirection: 'up',
      color: '#EA4335',
      status: 'good'
    }
  ];

  const quickStats = {
    totalMessages: 3250,
    totalResponses: 3040,
    effectiveness: 93.5,
    pending: 45,
    responseTime: '2.3 min'
  };

  const performanceMetrics = [
    { metric: 'Tasa de Respuesta', value: 93.5, target: 90, trend: '+3.5%' },
    { metric: 'Tiempo Promedio', value: 2.3, target: 3.0, trend: '-0.7 min' },
    { metric: 'Satisfacción', value: 4.7, target: 4.5, trend: '+0.2' }
  ];

  const ChannelCard = ({ channel }) => {
    const effectiveness = ((channel.responses / channel.messages) * 100);
    const isOptimal = effectiveness > 90;
    const isGood = effectiveness > 75 && effectiveness <= 90;

    return (
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
        {/* Header del Canal */}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {channel.trendDirection === 'up' ? 
              <TrendingUp sx={{ fontSize: 20, color: '#059669' }} /> : 
              <TrendingDown sx={{ fontSize: 20, color: '#DC2626' }} />
            }
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
        </Box>

        {/* Métricas Principales */}
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

        {/* Barra de Progreso y Efectividad */}
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="caption" fontWeight={600}>
              Efectividad
            </Typography>
            <Typography variant="caption" fontWeight={700} color={isOptimal ? 'success.main' : isGood ? 'primary.main' : 'warning.main'}>
              {effectiveness.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={effectiveness}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: alpha(channel.color, 0.2),
              '& .MuiLinearProgress-bar': {
                backgroundColor: channel.color,
                borderRadius: 3
              }
            }}
          />
        </Box>

        {/* Estado de Rendimiento */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
          <Chip
            label={
              channel.status === 'excellent' ? 'Excelente' :
              channel.status === 'optimal' ? 'Óptimo' :
              channel.status === 'good' ? 'Bueno' : 'Regular'
            }
            size="small"
            color={
              channel.status === 'excellent' ? 'success' :
              channel.status === 'optimal' ? 'success' :
              channel.status === 'good' ? 'primary' : 'warning'
            }
            variant="outlined"
            sx={{ height: 20, fontSize: '0.65rem' }}
          />
          <Typography variant="caption" color="text.secondary">
            {channel.responses} de {channel.messages}
          </Typography>
        </Box>
      </UBCard>
    );
  };

  const MetricCard = ({ title, value, subtitle, color = 'primary', icon }) => (
    <Box sx={{ 
      p: 2,
      border: `2px solid ${alpha(theme.palette[color].main, 0.2)}`,
      borderRadius: 2,
      background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
      textAlign: 'center',
      height: '100%'
    }}>
      {icon && (
        <Box sx={{ color: `${color}.main`, mb: 1 }}>
          {icon}
        </Box>
      )}
      <Typography variant="h5" fontWeight={700} color={`${color}.dark`} gutterBottom>
        {typeof value === 'number' ? (value % 1 === 0 ? value : value.toFixed(1)) : value}
        {title.includes('Efectividad') ? '%' : ''}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );

  const PerformanceCard = ({ metric, value, target, trend }) => {
    const isPositive = trend.includes('+');
    const achieved = value >= target;
    
    return (
      <Box sx={{ 
        p: 1.5,
        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
        borderRadius: 2,
        background: alpha(theme.palette.background.paper, 0.5)
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="caption" fontWeight={600}>
            {metric}
          </Typography>
          <Chip
            label={trend}
            size="small"
            color={isPositive ? 'success' : 'error'}
            sx={{ height: 18, fontSize: '0.6rem' }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box>
            <Typography variant="body1" fontWeight={700} color={achieved ? 'success.main' : 'text.primary'}>
              {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Meta: {target}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: achieved ? 'success.main' : 'warning.main'
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      {/* Header */}
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Desempeño de todos tus canales de mensajería
      </Typography>

      {/* Estadísticas Rápidas */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <MetricCard
            title="Mensajes"
            value={quickStats.totalMessages}
            color="primary"
          />
        </Grid>
        <Grid item xs={4}>
          <MetricCard
            title="Efectividad"
            value={`${quickStats.effectiveness}%`}
            color="success"
          />
        </Grid>
        <Grid item xs={4}>
          <MetricCard
            title="Pendientes"
            value={quickStats.pending}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Canales de Comunicación */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {channelStats.map((channel, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <ChannelCard channel={channel} />
          </Grid>
        ))}
      </Grid>

      {/* Métricas de Rendimiento y Resumen */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Métricas de Rendimiento
          </Typography>
          <Grid container spacing={1}>
            {performanceMetrics.map((metric, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <PerformanceCard {...metric} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Resumen General
          </Typography>
          <Box sx={{ 
            p: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Typography variant="h5" fontWeight={700} color="primary.main" gutterBottom>
              {quickStats.effectiveness}%
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Efectividad Total
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 0.5 }}>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {quickStats.totalMessages}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Mensajes
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {quickStats.totalResponses}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Respuestas
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {quickStats.responseTime}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Tiempo
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Estado de Conexión */}
      <Box sx={{ 
        mt: 3, 
        p: 2, 
        background: alpha(theme.palette.success.main, 0.05),
        border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
        borderRadius: 2,
        textAlign: 'center'
      }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Todos los canales conectados</strong> • <strong>93.5% efectividad</strong> • <strong>2.3 min tiempo promedio de respuesta</strong>
        </Typography>
      </Box>
    </Box>
  );
};

export default CommunicationsCenter;
