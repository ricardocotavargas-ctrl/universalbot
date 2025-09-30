import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
  alpha,
  useTheme
  useTheme,
  LinearProgress,
  IconButton,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  Instagram,
  Email
  Email,
  MoreVert,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';
import UBCard from '../../../components/ui/UBCard';

const CommunicationsCenter = () => {
const CommunicationsCenter = ({ isMobile = false }) => {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const channelStats = [
    {
      platform: 'WhatsApp',
      icon: <WhatsApp sx={{ color: '#25D366', fontSize: 32 }} />,
      icon: <WhatsApp sx={{ color: '#25D366', fontSize: isMobile ? 24 : 32 }} />,
      connected: true,
      messages: 1240,
      responses: 1180,
      trend: '+12%',
      color: '#25D366'
      trendDirection: 'up',
      color: '#25D366',
      status: 'optimal'
    },
    {
      platform: 'Facebook',
      icon: <Facebook sx={{ color: '#1877F2', fontSize: 32 }} />,
      icon: <Facebook sx={{ color: '#1877F2', fontSize: isMobile ? 24 : 32 }} />,
      connected: true,
      messages: 890,
      responses: 820,
      trend: '+8%',
      color: '#1877F2'
      trendDirection: 'up',
      color: '#1877F2',
      status: 'good'
    },
    {
      platform: 'Instagram',
      icon: <Instagram sx={{ color: '#E4405F', fontSize: 32 }} />,
      icon: <Instagram sx={{ color: '#E4405F', fontSize: isMobile ? 24 : 32 }} />,
      connected: true,
      messages: 670,
      responses: 610,
      trend: '+15%',
      color: '#E4405F'
      trendDirection: 'up',
      color: '#E4405F',
      status: 'excellent'
    },
    {
      platform: 'Email',
      icon: <Email sx={{ color: '#EA4335', fontSize: 32 }} />,
      icon: <Email sx={{ color: '#EA4335', fontSize: isMobile ? 24 : 32 }} />,
      connected: true,
      messages: 450,
      responses: 430,
      trend: '+5%',
      color: '#EA4335'
      trendDirection: 'up',
      color: '#EA4335',
      status: 'good'
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
          transform: isMobile ? 'none' : 'translateY(-4px)',
          borderColor: alpha(channel.color, 0.4),
          boxShadow: `0 8px 32px ${alpha(channel.color, 0.15)}`
        },
        p: isMobile ? 1.5 : 2
      }}>
        {/* Header del Canal */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: isMobile ? 2 : 3 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
            {channel.icon}
            <Box>
              <Typography 
                variant={isMobile ? "subtitle2" : "h6"} 
                fontWeight={600}
                sx={{ fontSize: isMobile ? '0.9rem' : '1.1rem' }}
              >
                {isSmallMobile ? channel.platform.substring(0, 4) : channel.platform}
              </Typography>
              <Chip
                label={channel.connected ? 'Conectado' : 'Desconectado'}
                size="small"
                color={channel.connected ? 'success' : 'error'}
                sx={{ 
                  height: isMobile ? 18 : 20, 
                  fontSize: isMobile ? '0.6rem' : '0.7rem',
                  minWidth: isMobile ? 60 : 80
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {channel.trendDirection === 'up' ? 
              <TrendingUp sx={{ fontSize: isMobile ? 16 : 20, color: '#059669' }} /> : 
              <TrendingDown sx={{ fontSize: isMobile ? 16 : 20, color: '#DC2626' }} />
            }
            <Chip
              label={channel.connected ? 'Conectado' : 'Desconectado'}
              label={channel.trend}
              size="small"
              color={channel.connected ? 'success' : 'error'}
              sx={{ height: 20, fontSize: '0.7rem' }}
              sx={{ 
                backgroundColor: alpha('#059669', 0.2),
                color: '#059669',
                fontWeight: 600,
                height: isMobile ? 18 : 20,
                fontSize: isMobile ? '0.6rem' : '0.7rem'
              }}
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
        {/* Métricas Principales */}
        <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: isMobile ? 1.5 : 2 }}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant={isMobile ? "h6" : "h4"} 
                fontWeight={700} 
                color={channel.color}
                sx={{ fontSize: isMobile ? '1.1rem' : '1.5rem' }}
              >
                {isMobile && channel.messages > 1000 ? 
                  `${(channel.messages / 1000).toFixed(1)}k` : 
                  channel.messages.toLocaleString('es-ES')
                }
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ fontSize: isMobile ? '0.6rem' : '0.75rem' }}
              >
                Mensajes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant={isMobile ? "h6" : "h4"} 
                fontWeight={700}
                sx={{ fontSize: isMobile ? '1.1rem' : '1.5rem' }}
              >
                {isMobile && channel.responses > 1000 ? 
                  `${(channel.responses / 1000).toFixed(1)}k` : 
                  channel.responses.toLocaleString('es-ES')
                }
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ fontSize: isMobile ? '0.6rem' : '0.75rem' }}
              >
                Respuestas
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700}>
              {channel.responses}

        {/* Barra de Progreso y Efectividad */}
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
            <Typography 
              variant="caption" 
              fontWeight={600}
              sx={{ fontSize: isMobile ? '0.6rem' : '0.75rem' }}
            >
              Efectividad
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Respuestas
            <Typography 
              variant="caption" 
              fontWeight={700}
              color={isOptimal ? 'success.main' : isGood ? 'primary.main' : 'warning.main'}
              sx={{ fontSize: isMobile ? '0.6rem' : '0.75rem' }}
            >
              {effectiveness.toFixed(1)}%
            </Typography>
          </Box>
        </Grid>
      </Grid>
          <LinearProgress
            variant="determinate"
            value={effectiveness}
            sx={{
              height: isMobile ? 4 : 6,
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
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mt: isMobile ? 1 : 1.5
        }}>
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
            sx={{ 
              height: isMobile ? 18 : 20,
              fontSize: isMobile ? '0.55rem' : '0.65rem'
            }}
          />
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ fontSize: isMobile ? '0.55rem' : '0.65rem' }}
          >
            {channel.responses} de {channel.messages}
          </Typography>
        </Box>
      </UBCard>
    );
  };

  const MetricCard = ({ title, value, subtitle, color = 'primary', icon }) => (
    <Box sx={{ 
      p: isMobile ? 1.5 : 2,
      border: `2px solid ${alpha(theme.palette[color].main, 0.2)}`,
      borderRadius: 2,
      background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
      textAlign: 'center',
      height: '100%'
    }}>
      {icon && (
        <Box sx={{ color: `${color}.main`, mb: 1 }}>
          {React.cloneElement(icon, { sx: { fontSize: isMobile ? 20 : 24 } })}
        </Box>
      )}
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        fontWeight={700} 
        color={`${color}.dark`}
        sx={{ fontSize: isMobile ? '1.1rem' : '1.5rem' }}
        gutterBottom
      >
        {value}
      </Typography>
      <Typography 
        variant={isMobile ? "caption" : "body2"} 
        color="text.secondary" 
        fontWeight={500}
        sx={{ fontSize: isMobile ? '0.7rem' : '0.875rem' }}
        gutterBottom
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ fontSize: isMobile ? '0.6rem' : '0.75rem' }}
        >
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
        background: alpha(theme.palette.background.paper, 0.5),
        p: isMobile ? 1 : 1.5,
        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
        borderRadius: 2,
        p: 1.5,
        textAlign: 'center'
        background: alpha(theme.palette.background.paper, 0.5)
      }}>
        <Typography variant="body2" fontWeight={600}>
          {((channel.responses / channel.messages) * 100).toFixed(1)}%
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Tasa de efectividad
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography 
            variant="caption" 
            fontWeight={600}
            sx={{ fontSize: isMobile ? '0.6rem' : '0.75rem' }}
          >
            {metric}
          </Typography>
          <Chip
            label={trend}
            size="small"
            color={isPositive ? 'success' : 'error'}
            sx={{ 
              height: isMobile ? 16 : 18,
              fontSize: isMobile ? '0.5rem' : '0.6rem'
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box>
            <Typography 
              variant={isMobile ? "body2" : "body1"} 
              fontWeight={700}
              color={achieved ? 'success.main' : 'text.primary'}
              sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }}
            >
              {value}
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ fontSize: isMobile ? '0.55rem' : '0.65rem' }}
            >
              Meta: {target}
            </Typography>
          </Box>
          <Box
            sx={{
              width: isMobile ? 6 : 8,
              height: isMobile ? 6 : 8,
              borderRadius: '50%',
              backgroundColor: achieved ? 'success.main' : 'warning.main'
            }}
          />
        </Box>
      </Box>
    </UBCard>
  );
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Desempeño de todos tus canales de mensajería
      </Typography>
      <Grid container spacing={3}>
      {/* Header Adaptativo */}
      <Box sx={{ mb: isMobile ? 2 : 3 }}>
        <Typography 
          variant={isMobile ? "subtitle1" : "h6"} 
          fontWeight={600}
          gutterBottom
          sx={{ 
            fontSize: isMobile ? '1rem' : '1.25rem',
            mb: isMobile ? 1 : 2
          }}
        >
          {isMobile ? "Centro de Comunicaciones" : "Desempeño de todos tus canales de mensajería"}
        </Typography>

        {/* Estadísticas Rápidas */}
        <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: isMobile ? 2 : 3 }}>
          <Grid item xs={4}>
            <MetricCard
              title="Mensajes"
              value={isMobile && quickStats.totalMessages > 1000 ? 
                `${(quickStats.totalMessages / 1000).toFixed(1)}k` : 
                quickStats.totalMessages.toLocaleString('es-ES')
              }
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
      </Box>

      {/* Canales de Comunicación */}
      <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: isMobile ? 2 : 3 }}>
        {channelStats.map((channel, index) => (
          <Grid item xs={12} sm={6} key={index}>
          <Grid item xs={6} sm={6} md={6} lg={3} key={index}>
            <ChannelCard channel={channel} />
          </Grid>
        ))}
      </Grid>
      
      {/* Resumen General */}
      <Box sx={{ 
        mt: 3, 
        p: 2, 
        background: alpha(theme.palette.primary.main, 0.05),
        borderRadius: 2,
        textAlign: 'center'
      }}>
        <Typography variant="body2" color="text.secondary">
          <strong>3,250 mensajes totales</strong> • <strong>3,040 respuestas</strong> • <strong>93.5% efectividad</strong>
        </Typography>
      </Box>

      {/* Métricas de Rendimiento y Resumen */}
      <Grid container spacing={isMobile ? 1 : 2}>
        <Grid item xs={12} md={8}>
          <Typography 
            variant={isMobile ? "subtitle2" : "subtitle1"} 
            fontWeight={600}
            gutterBottom
            sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }}
          >
            Métricas de Rendimiento
          </Typography>
          <Grid container spacing={isMobile ? 0.5 : 1}>
            {performanceMetrics.map((metric, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <PerformanceCard {...metric} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography 
            variant={isMobile ? "subtitle2" : "subtitle1"} 
            fontWeight={600}
            gutterBottom
            sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }}
          >
            Resumen General
          </Typography>
          <Box sx={{ 
            p: isMobile ? 1.5 : 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              fontWeight={700}
              color="primary.main"
              gutterBottom
              sx={{ fontSize: isMobile ? '1rem' : '1.5rem' }}
            >
              {quickStats.effectiveness}%
            </Typography>
            <Typography 
              variant={isMobile ? "caption" : "body2"} 
              color="text.secondary"
              sx={{ fontSize: isMobile ? '0.7rem' : '0.875rem' }}
              gutterBottom
            >
              Efectividad Total
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mt: isMobile ? 1 : 2,
              gap: 0.5
            }}>
              <Box>
                <Typography 
                  variant={isMobile ? "caption" : "body2"} 
                  fontWeight={600}
                  sx={{ fontSize: isMobile ? '0.6rem' : '0.75rem' }}
                >
                  {quickStats.totalMessages}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontSize: isMobile ? '0.55rem' : '0.65rem' }}
                >
                  Mensajes
                </Typography>
              </Box>
              <Box>
                <Typography 
                  variant={isMobile ? "caption" : "body2"} 
                  fontWeight={600}
                  sx={{ fontSize: isMobile ? '0.6rem' : '0.75rem' }}
                >
                  {quickStats.totalResponses}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontSize: isMobile ? '0.55rem' : '0.65rem' }}
                >
                  Respuestas
                </Typography>
              </Box>
              <Box>
                <Typography 
                  variant={isMobile ? "caption" : "body2"} 
                  fontWeight={600}
                  sx={{ fontSize: isMobile ? '0.6rem' : '0.75rem' }}
                >
                  {quickStats.responseTime}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontSize: isMobile ? '0.55rem' : '0.65rem' }}
                >
                  Tiempo
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Estado de Conexión */}
      {!isMobile && (
        <Box sx={{ 
          mt: 2, 
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
      )}
    </Box>
  );
};

export default CommunicationsCenter;
