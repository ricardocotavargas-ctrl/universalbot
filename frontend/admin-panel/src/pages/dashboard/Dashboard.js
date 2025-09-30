import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
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

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Grid fijo y ordenado
  const widgets = [
    {
      id: 'communicationsCenter',
      component: <CommunicationsCenter isMobile={isMobile} />,
      gridSize: { xs: 12, lg: 8 }
    },
    {
      id: 'financialOverview', 
      component: <FinancialOverview isMobile={isMobile} />,
      gridSize: { xs: 12, lg: 4 }
    },
    {
      id: 'quickActions',
      component: <QuickActions isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    },
    {
      id: 'performanceMetrics',
      component: <PerformanceMetrics isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    },
    {
      id: 'salesAnalytics',
      component: <SalesAnalytics isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    },
    {
      id: 'customerInsights',
      component: <CustomerInsights isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    },
    {
      id: 'inventoryAlerts',
      component: <InventoryAlerts isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    },
    {
      id: 'recentActivity',
      component: <RecentActivity isMobile={isMobile} />,
      gridSize: { xs: 12, md: 6 }
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 3, px: isMobile ? 2 : 3 }}>
      {/* Header mínimo */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Bienvenido, {user?.name || user?.email || 'Usuario'}
        </Typography>
      </Box>

      {/* Grid simple */}
      <Grid container spacing={3}>
        {widgets.map((widget) => (
          <Grid item {...widget.gridSize} key={widget.id}>
            {widget.component}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
