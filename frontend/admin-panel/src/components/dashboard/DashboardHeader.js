import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Container
} from '@mui/material';
import {
  Refresh,
  Notifications,
  Settings
} from '@mui/icons-material';
import { premiumStyles } from '../../design-system/styles';

const DashboardHeader = ({ 
  title = "Panel de Control", 
  subtitle,
  stats,
  onRefresh,
  onSettings,
  onNotifications,
  botActive = true
}) => {
  return (
    <Box sx={{
      ...premiumStyles.gradientPremium,
      color: 'white',
      pt: { xs: 6, md: 8 },
      pb: { xs: 8, md: 10 },
      px: 3,
      mb: 4,
      borderRadius: '0 0 40px 40px',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)',
      }
    }}>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          flexWrap: 'wrap',
          gap: 4
        }}>
          {/* Texto principal */}
          <Box sx={{ flex: 1, minWidth: '300px' }}>
            <Typography 
              variant="h1"
              gutterBottom 
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography 
                variant="h5" 
                sx={{ 
                  opacity: 0.9,
                  fontWeight: 400,
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  maxWidth: '600px',
                  mb: 3
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          {/* Stats y controles */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 3,
            flexWrap: 'wrap'
          }}>
            {/* Botones de control */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              background: 'rgba(255, 255, 255, 0.15)',
              padding: 2,
              borderRadius: 20,
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Chip 
                label={botActive ? "BOT ACTIVO" : "BOT INACTIVO"} 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'white',
                  background: botActive ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                }}
              />

              <IconButton onClick={onRefresh} sx={{ color: 'white' }}>
                <Refresh />
              </IconButton>

              <IconButton onClick={onNotifications} sx={{ color: 'white' }}>
                <Notifications />
              </IconButton>

              <IconButton onClick={onSettings} sx={{ color: 'white' }}>
                <Settings />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardHeader;