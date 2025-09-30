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
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp,
  People,
  Chat
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import { useAuth } from '../../contexts/AuthContext';

// Componentes de Widgets
import CommunicationsCenter from './widgets/CommunicationsCenter';
import FinancialOverview from './widgets/FinancialOverview';
import QuickActions from './widgets/QuickActions';
import PerformanceMetrics from './widgets/PerformanceMetrics';
import SalesAnalytics from './widgets/SalesAnalytics';
import CustomerInsights from './widgets/CustomerInsights';
import InventoryAlerts from './widgets/InventoryAlerts';
import RecentActivity from './widgets/RecentActivity';

// Componente de Widget Sólido
const ProfessionalWidget = ({ title, children }) => {
  const theme = useTheme();
  
  return (
    <Paper
      sx={{
        height: '100%',
        position: 'relative',
        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
        borderRadius: 2,
        overflow: 'hidden',
        background: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }
      }}
    >
      {/* Header Limpio */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.main, 0.02)} 0%,
            ${alpha(theme.palette.primary.main, 0.01)} 100%
          )`
        }}
      >
        <Typography 
          variant="h6" 
          fontWeight={600}
          color="primary.main"
        >
          {title}
        </Typography>
      </Box>

      {/* Contenido */}
      <Box sx={{ 
        p: 3,
        height: 'calc(100% - 80px)',
        overflow: 'auto'
      }}>
        {children}
      </Box>
    </Paper>
  );
};

// Componente principal del Dashboard
const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Configuración fija y profesional
  const widgetsConfig = [
    {
      id: 'communicationsCenter',
      title: 'Centro de Comunicaciones',
      component: <CommunicationsCenter isMobile={isMobile} />,
      gridSize: { xs: 12, md: 8 }
    },
    {
      id: 'financialOverview',
      title: 'Resumen Financiero',
      component: <FinancialOverview isMobile={isMobile} />,
      gridSize: { xs: 12, md: 4 }
    },
    {
      id: 'quickActions',
      title: 'Acciones Rápidas',
      component: <QuickActions isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    },
    {
      id: 'performanceMetrics',
      title: 'Métricas de Rendimiento',
      component: <PerformanceMetrics isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    },
    {
      id: 'salesAnalytics',
      title: 'Análisis de Ventas',
      component: <SalesAnalytics isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    },
    {
      id: 'customerInsights',
      title: 'Información de Clientes',
      component: <CustomerInsights isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    },
    {
      id: 'inventoryAlerts',
      title: 'Alertas de Inventario',
      component: <InventoryAlerts isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    },
    {
      id: 'recentActivity',
      title: 'Actividad Reciente',
      component: <RecentActivity isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ pb: 6, px: isMobile ? 2 : 3 }}>
      {/* Header Profesional */}
      <Box sx={{ mb: 4, pt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
            Panel de Control
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Bienvenido, {user?.business?.name || user?.first_name || 'Usuario'}
          </Typography>
          
          {/* Estadísticas del Header */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip 
              icon={<TrendingUp />}
              label="Ventas del día: $2,340" 
              color="success" 
              variant="outlined" 
            />
            <Chip 
              icon={<People />}
              label="12 nuevos clientes" 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              icon={<Chat />}
              label="45 mensajes pendientes" 
              color="warning" 
              variant="outlined" 
            />
          </Box>
        </Box>

        {/* Información de Fecha */}
        <Box sx={{ 
          p: 2,
          background: alpha(theme.palette.primary.main, 0.02),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
        </Box>
      </Box>

      {/* Grid de Widgets Organizado */}
      <Grid container spacing={3}>
        {widgetsConfig.map((widget) => (
          <Grid 
            item 
            xs={widget.gridSize.xs} 
            md={widget.gridSize.md} 
            key={widget.id}
          >
            <ProfessionalWidget title={widget.title}>
              {widget.component}
            </ProfessionalWidget>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
