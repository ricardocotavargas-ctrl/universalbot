import React from 'react';
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Home,
  ChevronRight,
  Settings,
  Notifications,
  Refresh
} from '@mui/icons-material';

const PremiumLayout = ({ 
  children, 
  title = "Dashboard",
  subtitle = "Resumen general",
  breadcrumbs = [],
  onRefresh,
  onSettings,
  onNotifications,
  stats
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
      pb: 6
    }}>
      {/* Header con Glassmorphism */}
      <Box sx={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
        py: 3,
        px: 3,
        mb: 4,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}>
        <Container maxWidth="xl">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            separator={<ChevronRight fontSize="small" />} 
            sx={{ mb: 2 }}
          >
            <Link
              color="inherit"
              href="/dashboard"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}
            >
              <Home sx={{ mr: 0.5, fontSize: 20 }} />
              Dashboard
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <Typography
                key={index}
                color={index === breadcrumbs.length - 1 ? 'text.primary' : 'text.secondary'}
                sx={{ fontWeight: index === breadcrumbs.length - 1 ? 600 : 400 }}
              >
                {crumb}
              </Typography>
            ))}
          </Breadcrumbs>

          {/* Título y controles */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 3
          }}>
            <Box>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body1" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>

            {/* Controles */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              flexWrap: 'wrap'
            }}>
              {stats && (
                <Box sx={{ 
                  display: { xs: 'none', md: 'flex' }, 
                  gap: 2,
                  background: 'rgba(99, 102, 241, 0.1)',
                  padding: 1.5,
                  borderRadius: 3
                }}>
                  {Object.entries(stats).slice(0, 3).map(([key, value]) => (
                    <Box key={key} sx={{ textAlign: 'center', minWidth: '80px' }}>
                      <Typography variant="h6" fontWeight="bold" color="primary.main">
                        {value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {key}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              <IconButton onClick={onRefresh} color="primary">
                <Refresh />
              </IconButton>

              <IconButton onClick={onNotifications}>
                <Notifications />
              </IconButton>

              <IconButton onClick={onSettings}>
                <Settings />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Contenido */}
      <Container maxWidth="xl">
        {children}
      </Container>
    </Box>
  );
};

export default PremiumLayout;