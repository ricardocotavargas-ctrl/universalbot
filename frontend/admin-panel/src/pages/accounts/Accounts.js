// frontend/admin-panel/src/pages/accounts/Accounts.js
import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardContent,
  Button, Chip, Tabs, Tab, Alert
} from '@mui/material';
import {
  AccountBalance, Payments, Receipt, TrendingUp,
  TrendingDown, Warning, Add
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import AccountsDashboard from './components/AccountsDashboard';

const Accounts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [accountsData, setAccountsData] = useState({
    totalPayables: 0,
    totalReceivables: 0,
    bankAccounts: [],
    cashFlow: []
  });

  // Datos de ejemplo
  const mockData = {
    payables: [
      {
        id: 1,
        supplier: 'Proveedor Tech SA',
        amount: 12500.00,
        dueDate: '2024-02-15',
        status: 'pending',
        document: 'FAC-12345'
      },
      {
        id: 2,
        supplier: 'Insumos Industriales',
        amount: 8500.50,
        dueDate: '2024-02-20',
        status: 'pending',
        document: 'FAC-12346'
      }
    ],
    receivables: [
      {
        id: 1,
        client: 'Cliente Corporativo SA',
        amount: 23400.75,
        dueDate: '2024-02-10',
        status: 'overdue',
        document: 'FAC-12347'
      },
      {
        id: 2,
        client: 'Distribuidora Norte',
        amount: 15600.00,
        dueDate: '2024-02-25',
        status: 'pending',
        document: 'FAC-12348'
      }
    ],
    bankAccounts: [
      {
        id: 1,
        bankName: 'Banco Nacional',
        accountNumber: '0198-1234-5678-9012',
        balance: 125000.00,
        currency: 'USD'
      },
      {
        id: 2,
        bankName: 'Banco Mercantil',
        accountNumber: '0105-9876-5432-1098',
        balance: 75000.50,
        currency: 'USD'
      }
    ]
  };

  useEffect(() => {
    const totalPayables = mockData.payables.reduce((sum, payable) => sum + payable.amount, 0);
    const totalReceivables = mockData.receivables.reduce((sum, receivable) => sum + receivable.amount, 0);

    setAccountsData({
      totalPayables,
      totalReceivables,
      bankAccounts: mockData.bankAccounts,
      cashFlow: []
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
              {formatCurrency(value)}
            </Typography>
            {trend && (
              <Chip
                label={trend}
                size="small"
                color={trend.includes('+') ? 'success' : 'error'}
                variant="outlined"
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
          Gestión de Cuentas
        </Typography>
        <Typography color="text.secondary">
          Control de cuentas por pagar, cobrar y bancos
        </Typography>
      </Box>

      {/* Alertas de Vencimientos */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        Tienes 3 facturas vencidas por un total de {formatCurrency(23400.75)}. Revisa la sección de cuentas por cobrar.
      </Alert>

      {/* Métricas Rápidas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<Payments sx={{ fontSize: 40 }} />}
            title="Por Pagar"
            value={accountsData.totalPayables}
            trend="-5% vs mes anterior"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<Receipt sx={{ fontSize: 40 }} />}
            title="Por Cobrar"
            value={accountsData.totalReceivables}
            trend="+12% vs mes anterior"
            color="success"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<AccountBalance sx={{ fontSize: 40 }} />}
            title="Disponible Bancos"
            value={accountsData.bankAccounts.reduce((sum, acc) => sum + acc.balance, 0)}
            color="primary"
          />
        </Grid>
      </Grid>

      {/* Tabs de Navegación */}
      <UBCard>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Resumen" />
          <Tab label="Por Pagar" />
          <Tab label="Por Cobrar" />
          <Tab label="Cuentas Bancarias" />
          <Tab label="Conciliación" />
        </Tabs>

        {activeTab === 0 && <AccountsDashboard data={accountsData} />}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>Cuentas por Pagar</Typography>
            {/* Tabla de cuentas por pagar */}
          </Box>
        )}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>Cuentas por Cobrar</Typography>
            {/* Tabla de cuentas por cobrar */}
          </Box>
        )}
        {activeTab === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>Cuentas Bancarias</Typography>
            {/* Gestión de cuentas bancarias */}
          </Box>
        )}
        {activeTab === 4 && (
          <Box>
            <Typography variant="h6" gutterBottom>Conciliación Bancaria</Typography>
            {/* Herramienta de conciliación */}
          </Box>
        )}
      </UBCard>

      {/* Acciones Rápidas */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            onClick={() => window.location.href = '/accounts/payables'}
          >
            Nueva Cuenta por Pagar
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            onClick={() => window.location.href = '/accounts/receivables'}
          >
            Nueva Cuenta por Cobrar
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            onClick={() => window.location.href = '/accounts/banks'}
          >
            Nueva Cuenta Bancaria
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Accounts;