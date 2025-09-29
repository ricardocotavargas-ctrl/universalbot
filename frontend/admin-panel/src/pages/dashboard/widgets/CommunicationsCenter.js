import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  Instagram,
  Email
} from '@mui/icons-material';
import UBCard from '../../../components/ui/UBCard';

const CommunicationsCenter = () => {
  const theme = useTheme();

  const channelStats = [
    {
      platform: 'WhatsApp',
      icon: <WhatsApp sx={{ color: '#25D366', fontSize: 32 }} />,
      connected: true,
      messages: 1240,
      responses: 1180,
      trend: '+12%',
      color: '#25D366'
    },
    {
      platform: 'Facebook',
      icon: <Facebook sx={{ color: '#1877F2', fontSize: 32 }} />,
      connected: true,
      messages: 890,
      responses: 820,
      trend: '+8%',
      color: '#1877F2'
    },
    {
      platform: 'Instagram',
      icon: <Instagram sx={{ color: '#E4405F', fontSize: 32 }} />,
      connected: true,
      messages: 670,
      responses: 610,
      trend: '+15%',
      color: '#E4405F'
    },
    {
      platform: 'Email',
      icon: <Email sx={{ color: '#EA4335', fontSize: 32 }} />,
      connected: true,
      messages: 450,
      responses: 430,
      trend: '+5%',
      color: '#EA4335'
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

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Desempeño de todos tus canales de mensajería
      </Typography>
      <Grid container spacing={3}>
        {channelStats.map((channel, index) => (
          <Grid item xs={12} sm={6} key={index}>
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
    </Box>
  );
};

export default CommunicationsCenter;
