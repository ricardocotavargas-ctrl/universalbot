import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, TextField, FormControl, InputLabel, Select, MenuItem,
  Tabs, Tab
} from '@mui/material';
import {
  History, AccountBalance, Receipt, TrendingUp, TrendingDown,
  Download, FilterList
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const AccountsHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState(0);

  const mockTransactions = [
    { id: 1, date: '2024-05-20', description: 'Pago a Proveedor ABC', type: 'payment', amount: -2500, account: 'Banesco', status: 'completed' },
    { id: 2, date: '2024-05-19', description: 'Venta #12345', type: 'income', amount: 3500, account: 'Mercantil', status: 'completed' },
    { id: 3, date: '2024-05-18', description: 'Nómina Semanal', type: 'payment', amount: -8200, account: 'Venezuela', status: 'completed' },
    { id: 4, date: '2024-05-17', description: 'Transferencia entre cuentas', type: 'transfer', amount: 5000, account: 'Interna', status: 'completed' },
    { id: 5, date: '2024-05-16', description: 'Compra de Suministros', type: 'payment', amount: -1200, account: 'Provincial', status: 'pending' }
  ];

  useEffect(() => {
    setTransactions(mockTransactions);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-VE');
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'income': return 'success';
      case 'payment': return 'error';
      case 'transfer': return 'info';
      default: return 'default';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'income': return 'Ingreso';
      case 'payment': return 'Pago';
      case 'transfer': return 'Transferencia';
      default: return 'Otro';
    }
  };

  const getStatusColor = (status) => {
    return status === 'completed' ? 'success' : 'warning';
  };

  const filteredTransactions = filterType === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filterType);

  const totals = {
    income: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    payment: transactions.filter(t => t.type === 'payment').reduce((sum, t) => sum + t.amount, 0),
    transfer: transactions.filter(t => t.type === 'transfer').reduce((sum, t) => sum + Math.abs(t.amount), 0)
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Historial de Cuentas
        </Typography>
        <Typography color="text.secondary">
          Registro completo de transacciones y movimientos
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Ingresos</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {formatCurrency(totals.income)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingDown color="error" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Pagos</Typography>
              </Box>
              <Typography variant="h4" color="error.main">
                {formatCurrency(totals.payment)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccountBalance color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Transferencias</Typography>
              </Box>
              <Typography variant="h4">
                {formatCurrency(totals.transfer)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Tipo de Transacción</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Tipo de Transacción"
            >
              <MenuItem value="all">Todos los tipos</MenuItem>
              <MenuItem value="income">Ingresos</MenuItem>
              <MenuItem value="payment">Pagos</MenuItem>
              <MenuItem value="transfer">Transferencias</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Fecha desde"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />
          
          <TextField
            label="Fecha hasta"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />
          
          <Button variant="outlined" startIcon={<Download />}>
            Exportar
          </Button>
        </Box>
      </UBCard>

      <UBCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<Receipt />} label="Todas las Transacciones" />
            <Tab icon={<TrendingUp />} label="Solo Ingresos" />
            <Tab icon={<TrendingDown />} label="Solo Pagos" />
          </Tabs>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell>Cuenta</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeText(transaction.type)}
                      color={getTypeColor(transaction.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color={transaction.amount >= 0 ? 'success.main' : 'error.main'}
                      fontWeight="bold"
                    >
                      {formatCurrency(transaction.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={transaction.status === 'completed' ? 'Completado' : 'Pendiente'}
                      color={getStatusColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button size="small" variant="outlined">
                      Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredTransactions.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <History sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No hay transacciones que coincidan con los filtros
            </Typography>
          </Box>
        )}
      </UBCard>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen del Período
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Total Ingresos:</Typography>
                  <Typography color="success.main" fontWeight="bold">
                    {formatCurrency(totals.income)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Total Pagos:</Typography>
                  <Typography color="error.main" fontWeight="bold">
                    {formatCurrency(totals.payment)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Balance Neto:</Typography>
                  <Typography 
                    color={totals.income + totals.payment >= 0 ? 'success.main' : 'error.main'}
                    fontWeight="bold"
                  >
                    {formatCurrency(totals.income + totals.payment)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estadísticas
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Total Transacciones:</Typography>
                  <Typography fontWeight="bold">{transactions.length}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Transacciones Completadas:</Typography>
                  <Typography fontWeight="bold">
                    {transactions.filter(t => t.status === 'completed').length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Transacciones Pendientes:</Typography>
                  <Typography fontWeight="bold">
                    {transactions.filter(t => t.status === 'pending').length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountsHistory;