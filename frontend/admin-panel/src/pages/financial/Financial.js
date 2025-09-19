// frontend/admin-panel/src/pages/financial/Financial.js
import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardContent,
  Button, Tabs, Tab, Chip
} from '@mui/material';
import {
  TrendingUp, TrendingDown, AccountBalance,
  ShowChart, PieChart, Receipt, Download
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import FinancialDashboard from './components/FinancialDashboard';

const Financial = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [financialData, setFinancialData] = useState({
    revenue: 0,
    expenses: 0,
    profit: 0,
    cashFlow: 0,
    balanceSheet: {},
    financialReports: []
  });

  // Datos de ejemplo
  const mockData = {
    revenue: 1250.00,
    expenses: 875.00,
    profit: 375.00,
    cashFlow: 225.00,
    balanceSheet: {
      assets: 1850.00,
      liabilities: 950.00,
      equity: 900000.00
    },
    trends: {
      revenue: '+15%',
      expenses: '+8%',
      profit: '+25%'
    }
  };

  useEffect(() => {
    setFinancialData({
      revenue: mockData.revenue,
      expenses: mockData.expenses,
      profit: mockData.profit,
      cashFlow: mockData.cashFlow,
      balanceSheet: mockData.balanceSheet,
      financialReports: [],
      trends: mockData.trends
    });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const FinancialCard = ({ icon, title, value, trend, color = 'primary' }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={`${color}.main`}>
              {formatCurrency(value)}
            </Typography>
            {trend && (
              <Chip
                label={trend}
                size="small"
                color={trend.includes('+') ? 'success' : 'error'}
                variant="outlined"
                sx={{ mt: 1 }}
              />
            )}
          </Box>
          <Box sx={{ color: `${color}.main` }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard Financiero
        </Typography>
        <Typography color="text.secondary">
          Análisis completo de la situación financiera de la empresa
        </Typography>
      </Box>

      {/* KPIs Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <FinancialCard
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            title="Ingresos"
            value={financialData.revenue}
            trend={financialData.trends?.revenue}
            color="success"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FinancialCard
            icon={<TrendingDown sx={{ fontSize: 40 }} />}
            title="Gastos"
            value={financialData.expenses}
            trend={financialData.trends?.expenses}
            color="error"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FinancialCard
            icon={<AccountBalance sx={{ fontSize: 40 }} />}
            title="Utilidad Neta"
            value={financialData.profit}
            trend={financialData.trends?.profit}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FinancialCard
            icon={<ShowChart sx={{ fontSize: 40 }} />}
            title="Flujo de Efectivo"
            value={financialData.cashFlow}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Balance Sheet Summary */}
      <UBCard title="Balance General Resumido" sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="success.main" gutterBottom>
                Activos
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {formatCurrency(financialData.balanceSheet.assets)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="error.main" gutterBottom>
                Pasivos
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {formatCurrency(financialData.balanceSheet.liabilities)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Patrimonio
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {formatCurrency(financialData.balanceSheet.equity)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </UBCard>

      {/* Navegación */}
      <UBCard>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Dashboard" />
          <Tab label="Estado de Resultados" />
          <Tab label="Balance General" />
          <Tab label="Flujo de Efectivo" />
          <Tab label="Reportes" />
          <Tab label="Gestión de Gastos" />
        </Tabs>

        {activeTab === 0 && <FinancialDashboard data={financialData} />}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>Estado de Resultados</Typography>
            {/* Contenido del estado de resultados */}
          </Box>
        )}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>Balance General</Typography>
            {/* Contenido del balance general */}
          </Box>
        )}
        {activeTab === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>Flujo de Efectivo</Typography>
            {/* Contenido del flujo de efectivo */}
          </Box>
        )}
        {activeTab === 4 && (
          <Box>
            <Typography variant="h6" gutterBottom>Reportes Financieros</Typography>
            {/* Generador de reportes */}
          </Box>
        )}
        {activeTab === 5 && (
          <Box>
            <Typography variant="h6" gutterBottom>Gestión de Gastos</Typography>
            {/* Gestión de gastos */}
          </Box>
        )}
      </UBCard>

      {/* Acciones Rápidas */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Download />}
            onClick={() => window.location.href = '/financial/profit-loss'}
          >
            Descargar P&G
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Download />}
            onClick={() => window.location.href = '/financial/balance-sheet'}
          >
            Descargar Balance
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Download />}
            onClick={() => window.location.href = '/financial/cash-flow'}
          >
            Descargar Flujo
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Receipt />}
            onClick={() => window.location.href = '/financial/expenses'}
          >
            Registrar Gasto
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Financial;