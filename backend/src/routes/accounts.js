// frontend/admin-panel/src/pages/accounts/Accounts.js
import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardContent,
  Button, Chip, Tabs, Tab, Alert
} from '@mui/material';
import {
  AccountBalance, Payments, Receipt, TrendingUp,
  TrendingDown, Add, Warning
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const Accounts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [accountsData, setAccountsData] = useState({
    totalPayables: 0,
    totalReceivables: 0,
    bankBalance: 0,
    overdueInvoices: 0
  });

  useEffect(() => {
    setAccountsData({
      totalPayables: 21000.50,
      totalReceivables: 39000.75,
      bankBalance: 125000.00,
      overdueInvoices: 3
    });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const StatCard = ({ icon, title, value, trend, color = 'primary' }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={`${color}.main`}>
              {value}
            </Typography>
            {trend && (
              <Chip label={trend} size="small" color={trend.includes('+') ? 'success' : 'error'} />
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
          Gestión de Cuentas
        </Typography>
        <Typography color="text.secondary">
          Control de cuentas por pagar, cobrar y bancos
        </Typography>
      </Box>

      {/* Alertas */}
      {accountsData.overdueInvoices > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">
            {accountsData.overdueInvoices} facturas vencidas. Total: {formatCurrency(12500.00)}
          </Typography>
        </Alert>
      )}

      {/* KPIs */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<Payments sx={{ fontSize: 40 }} />}
            title="Por Pagar"
            value={formatCurrency(accountsData.totalPayables)}
            trend="-5% vs mes anterior"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<Receipt sx={{ fontSize: 40 }} />}
            title="Por Cobrar"
            value={formatCurrency(accountsData.totalReceivables)}
            trend="+12% vs mes anterior"
            color="success"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<AccountBalance sx={{ fontSize: 40 }} />}
            title="Disponible Bancos"
            value={formatCurrency(accountsData.bankBalance)}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<Warning sx={{ fontSize: 40 }} />}
            title="Facturas Vencidas"
            value={accountsData.overdueInvoices}
            color="error"
          />
        </Grid>
      </Grid>

      {/* Navegación */}
      <UBCard>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Resumen" />
          <Tab label="Por Pagar" />
          <Tab label="Por Cobrar" />
          <Tab label="Bancos" />
          <Tab label="Conciliación" />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>Resumen de Cuentas</Typography>
            {/* Contenido del resumen */}
          </Box>
        )}
        {/* ... otros tabs */}
      </UBCard>

      {/* Acciones Rápidas */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Button fullWidth variant="contained" startIcon={<Add />}>
            Nueva Cuenta por Pagar
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button fullWidth variant="contained" startIcon={<Add />}>
            Nueva Cuenta por Cobrar
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button fullWidth variant="contained" startIcon={<Add />}>
            Nueva Cuenta Bancaria
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Accounts;