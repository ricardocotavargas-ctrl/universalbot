import React from 'react';
import { Box, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionTab = motion(Tab);

const navigationItems = [
  { label: 'RESUMEN', path: '/dashboard' },
  { label: 'EMPRESAS', path: '/companies' },
  { label: 'CLIENTES', path: '/clients' },
  { label: 'SERVICIOS', path: '/services' },
  { label: 'INTERACCIONES', path: '/interactions' },
  { label: 'VENTAS', path: '/sales' },
  { label: 'REPORTES', path: '/reports' },
  { label: 'FLUJOS IA', path: '/ai-flows' },
  { label: 'CONFIGURACIÓN', path: '/settings' },
];

const TopNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const currentTab = navigationItems.findIndex(item => 
    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
  );

  const handleTabChange = (event, newValue) => {
    navigate(navigationItems[newValue].path);
  };

  return (
    <Box sx={{ 
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      mb: 4,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
    }}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant={isMobile ? 'scrollable' : 'fullWidth'}
        scrollButtons="auto"
        sx={{
          minHeight: '70px',
          '& .MuiTab-root': {
            minHeight: '70px',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#cbd5e1',
            textTransform: 'none',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            '&.Mui-selected': {
              color: '#ffffff',
              fontWeight: 700,
            },
            '&:hover': {
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.1)',
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#6366f1',
            height: '4px',
            borderRadius: '4px 4px 0 0',
            background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)'
          }
        }}
      >
        {navigationItems.map((item, index) => (
          <MotionTab
            key={item.path}
            label={item.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TopNavigation;