// CommunicationsCenter.js - Versión adaptativa
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  Instagram,
  Email,
  TrendingUp
} from '@mui/icons-material';
import UBCard from '../../../components/ui/UBCard';

const CommunicationsCenter = ({ size = 'medium', isMobile = false }) => {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Configuración adaptativa basada en el tamaño
  const getConfig = () => {
    switch (size) {
      case 'small':
        return {
          columns: 1,
          showMetrics: false,
          compact: true,
          fontSize: 'small'
        };
      case 'medium':
        return {
          columns: 2,
          showMetrics: true,
          compact: false,
          fontSize: 'medium'
        };
      case 'large':
        return {
          columns: 3,
          showMetrics: true,
          compact: false,
          fontSize: 'large'
        };
      case 'xlarge':
        return {
          columns: 4,
          showMetrics: true,
          compact: false,
          fontSize: 'large'
        };
      default:
        return {
          columns: 2,
          showMetrics: true,
          compact: false,
          fontSize: 'medium'
        };
    }
  };

  const config = getConfig();

  const channelStats = [
    {
      platform: 'WhatsApp',
      icon: <WhatsApp sx={{ color: '#25D366' }} />,
      connected: true,
      messages: 1240,
      responses: 1180,
      trend: '+12%',
      color: '#25D366'
    },
    {
      platform: 'Facebook',
      icon: <Facebook sx={{ color: '#1877F2' }} />,
      connected: true,
      messages: 890,
      responses: 820,
      trend: '+8%',
      color: '#1877F2'
    },
    {
      platform: 'Instagram',
      icon: <Instagram sx={{ color: '#E4405F' }} />,
      connected: true,
      messages: 670,
      responses: 610,
      trend: '+15%',
      color: '#E4405F'
    },
    {
      platform: 'Email',
      icon: <Email sx={{ color: '#EA4335' }} />,
      connected: true,
      messages: 450,
      responses: 430,
      trend: '+5%',
      color: '#EA4335'
    }
  ];

  const ChannelCard = ({ channel }) => {
    const effectiveness = ((channel.responses / channel.messages) * 100);
    
    return (
      <UBCard sx={{ 
        height: '100%',
        p: config.compact ? 1 : 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {React.cloneElement(channel.icon, { 
            sx: { fontSize: config.compact ? 20 : 24 } 
          })}
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant={config.compact ? "body2" : "body1"} 
              fontWeight={600}
            >
              {channel.platform}
            </Typography>
            <Chip
              label={channel.connected ? 'Conectado' : 'Desconectado'}
              size="small"
              color={channel.connected ? 'success' : 'error'}
              sx={{ height: 20, fontSize: '0.6rem' }}
            />
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

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700} color={channel.color}>
                {channel.messages}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Mensajes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700}>
                {channel.responses}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Respuestas
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {!config.compact && (
          <Box sx={{ mt: 1, textAlign: 'center' }}>
            <Typography variant="caption" fontWeight={600}>
              {effectiveness.toFixed(1)}% efectividad
            </Typography>
          </Box>
        )}
      </UBCard>
    );
  };

  return (
    <Box>
      {!config.compact && (
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Centro de Comunicaciones
        </Typography>
      )}
      
      <Grid container spacing={1}>
        {channelStats.slice(0, config.columns).map((channel, index) => (
          <Grid item xs={12} sm={12} md={12} key={index}>
            <ChannelCard channel={channel} />
          </Grid>
        ))}
      </Grid>

      {config.showMetrics && (
        <Box sx={{ 
          mt: 2, 
          p: 1, 
          background: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 1,
          textAlign: 'center'
        }}>
          <Typography variant="caption" color="text.secondary">
            <strong>3,250 mensajes</strong> • <strong>93.5% efectividad</strong>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CommunicationsCenter;
