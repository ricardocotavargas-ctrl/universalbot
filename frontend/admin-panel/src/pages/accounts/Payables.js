import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Switch,
  FormControlLabel, IconButton, Tabs, Tab, Alert, LinearProgress,
  Stepper, Step, StepLabel, InputAdornment, Avatar
} from '@mui/material';
import {
  AccountBalanceWallet, Add, Edit, Delete, Payment, Inventory,
  Receipt, CalendarToday, TrendingUp, TrendingDown, AttachMoney,
  Euro, CurrencyExchange, Discount, LocalShipping, Business,
  CheckCircle, Warning, Error, Schedule
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Payables = () => {
  const [payables, setPayables] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPayable, setEditingPayable] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [paymentStep, setPaymentStep] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);

  // Datos de ejemplo
  const mockPayables = [
    {
      id: 1,
      invoiceNumber: 'FAC-001-2024',
      supplier: 'Proveedor ABC',
      amount: 5000,
      currency: 'USD',
      originalAmount: 5000,
      originalCurrency: 'USD',
      dueDate: '2024-06-15',
      issueDate: '2024-05-20',
      status: 'pending',
      discountEarlyPayment: 5,
      discountDays: 10,
      items: [
        { product: 'Café Premium', quantity: 100, unitPrice: 25, total: 2500 },
        { product: 'Té Especial', quantity: 50, unitPrice: 30, total: 1500 },
        { product: 'Azúcar Orgánico', quantity: 200, unitPrice: 5, total: 1000 }
      ],
      paymentTerms: '30 días',
      notes: 'Pago con descuento por pronto pago disponible'
    },
    {
      id: 2,
      invoiceNumber: 'FAC-002-2024',
      supplier: 'Distribuidora XYZ',
      amount: 8200,
      currency: 'EUR',
      originalAmount: 7500,
      originalCurrency: 'EUR',
      dueDate: '2024-06-10',
      issueDate: '2024-05-18',
      status: 'partial',
      discountEarlyPayment: 3,
      discountDays: 7,
      items: [
        { product: 'Leche en Polvo', quantity: 80, unitPrice: 40, total: 3200 },
        { product: 'Chocolate', quantity: 60, unitPrice: 50, total: 3000 },
        { product: 'Vainilla', quantity: 40, unitPrice: 50, total: 2000 }
      ],
      paidAmount: 4000,
      paymentTerms: '15 días',
      notes: 'Pago parcial realizado'
    },
    {
      id: 3,
      invoiceNumber: 'FAC-003-2024',
      supplier: 'Importaciones Global',
      amount: 12000,
      currency: 'USD',
      originalAmount: 12000,
      originalCurrency: 'USD',
      dueDate: '2024-05-25',
      issueDate: '2024-05-05',
      status: 'overdue',
      discountEarlyPayment: 2,
      discountDays: 5,
      items: [
        { product: 'Equipo Café', quantity: 2, unitPrice: 4000, total: 8000 },
        { product: 'Molino Industrial', quantity: 1, unitPrice: 4000, total: 4000 }
      ],
      paymentTerms: '20 días',
      notes: 'Factura vencida - aplicar recargos'
    }
  ];

  const mockSuppliers = [
    { id: 1, name: 'Proveedor ABC', currency: 'USD', paymentTerms: '30 días', contact: 'proveedor@abc.com' },
    { id: 2, name: 'Distribuidora XYZ', currency: 'EUR', paymentTerms: '15 días', contact: 'contacto@xyz.com' },
    { id: 3, name: 'Importaciones Global', currency: 'USD', paymentTerms: '20 días', contact: 'info@global.com' }
  ];

  const mockInventoryItems = [
    { id: 1, name: 'Café Premium', sku: 'CAFE-001', cost: 25, stock: 150, category: 'Bebidas' },
    { id: 2, name: 'Té Especial', sku: 'TE-002', cost: 30, stock: 200, category: 'Bebidas' },
    { id: 3, name: 'Azúcar Orgánico', sku: 'AZU-003', cost: 5, stock: 300, category: 'Endulzantes' },
    { id: 4, name: 'Leche en Polvo', sku: 'LEC-004', cost: 40, stock: 80, category: 'Lácteos' },
    { id: 5, name: 'Chocolate', sku: 'CHO-005', cost: 50, stock: 60, category: 'Dulces' }
  ];

  const currencyRates = {
    USD: 1,
    EUR: 0.92,
    VES: 160.44
  };

  useEffect(() => {
    setPayables(mockPayables);
    setSuppliers(mockSuppliers);
    setInventoryItems(mockInventoryItems);
    
    // Simular tasa de cambio actual
    setExchangeRate(currencyRates[selectedCurrency]);
  }, [selectedCurrency]);

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-VE');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'partial': return 'warning';
      case 'overdue': return 'error';
      default: return 'info';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Pagado';
      case 'partial': return 'Pago Parcial';
      case 'overdue': return 'Vencido';
      default: return 'Pendiente';
    }
  };

  const calculateDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateEarlyPaymentDiscount = (payable) => {
    const daysUntilDue = calculateDaysUntilDue(payable.dueDate);
    if (daysUntilDue <= payable.discountDays && daysUntilDue > 0) {
      const discountAmount = (payable.amount * payable.discountEarlyPayment) / 100;
      return {
        eligible: true,
        discountAmount,
        finalAmount: payable.amount - discountAmount,
        daysLeft: daysUntilDue
      };
    }
    return { eligible: false };
  };

  const handleAddInventory = (items) => {
    // Aquí se integraría con el módulo de inventario
    console.log('Agregando al inventario:', items);
    alert(`¡${items.length} items agregados al inventario exitosamente!`);
  };

  const handlePayment = (payable, amount, currency, isEarlyPayment = false) => {
    const paymentData = {
      payableId: payable.id,
      amount,
      currency,
      date: new Date().toISOString().split('T')[0],
      exchangeRate,
      isEarlyPayment,
      discountApplied: isEarlyPayment ? payable.discountEarlyPayment : 0
    };

    console.log('Procesando pago:', paymentData);
    setPaymentStep(2);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Cuentas por Pagar
        </Typography>
        <Typography color="text.secondary">
          Gestión completa de facturas de proveedores y pagos
        </Typography>
      </Box>

      {/* Alertas y Notificaciones */}
      <Box sx={{ mb: 3 }}>
        <Alert severity="warning" sx={{ mb: 1 }}>
          <strong>Facturas próximas a vencer:</strong> 3 facturas con vencimiento en los próximos 7 días
        </Alert>
        <Alert severity="error" sx={{ mb: 1 }}>
          <strong>Facturas vencidas:</strong> 1 factura con pagos pendientes
        </Alert>
        <Alert severity="info">
          <strong>Tasa de cambio actual:</strong> 1 USD = {formatCurrency(1 * exchangeRate, selectedCurrency)}
        </Alert>
      </Box>

      {/* KPIs y Métricas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccountBalanceWallet color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total por Pagar</Typography>
              </Box>
              <Typography variant="h4">
                {formatCurrency(payables.reduce((sum, p) => sum + p.amount, 0), selectedCurrency)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Warning color="error" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Vencidas</Typography>
              </Box>
              <Typography variant="h4" color="error.main">
                {formatCurrency(payables.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0), selectedCurrency)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Discount color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Descuentos Disponibles</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {formatCurrency(payables.reduce((sum, p) => {
                  const discount = calculateEarlyPaymentDiscount(p);
                  return discount.eligible ? sum + discount.discountAmount : sum;
                }, 0), selectedCurrency)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Inventory color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Items por Recibir</Typography>
              </Box>
              <Typography variant="h4">
                {payables.reduce((sum, p) => sum + p.items.length, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Controles y Filtros */}
      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Estado</InputLabel>
            <Select label="Estado">
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="pending">Pendientes</MenuItem>
              <MenuItem value="partial">Parciales</MenuItem>
              <MenuItem value="overdue">Vencidas</MenuItem>
              <MenuItem value="paid">Pagadas</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Proveedor</InputLabel>
            <Select label="Proveedor">
              <MenuItem value="all">Todos</MenuItem>
              {suppliers.map(supplier => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Moneda</InputLabel>
            <Select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              label="Moneda"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="VES">VES</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Nueva Factura
          </Button>

          <Button variant="outlined" startIcon={<CurrencyExchange />}>
            Actualizar Tasas
          </Button>
        </Box>
      </UBCard>

      {/* Tabs de Navegación */}
      <UBCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<Receipt />} label="Todas las Facturas" />
            <Tab icon={<Inventory />} label="Recepción de Mercancía" />
            <Tab icon={<TrendingUp />} label="Reportes" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Factura</TableCell>
                  <TableCell>Proveedor</TableCell>
                  <TableCell>Fecha Venc.</TableCell>
                  <TableCell align="right">Monto</TableCell>
                  <TableCell align="center">Descuento</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payables.map((payable) => {
                  const daysUntilDue = calculateDaysUntilDue(payable.dueDate);
                  const discountInfo = calculateEarlyPaymentDiscount(payable);
                  const isOverdue = payable.status === 'overdue';

                  return (
                    <TableRow key={payable.id} sx={{ 
                      bgcolor: isOverdue ? 'error.light' : 'transparent',
                      '&:hover': { bgcolor: isOverdue ? 'error.light' : 'action.hover' }
                    }}>
                      <TableCell>
                        <Typography fontWeight="medium">{payable.invoiceNumber}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(payable.issueDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Business sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                          {payable.supplier}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarToday sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                          <Typography color={isOverdue ? 'error.main' : 'inherit'}>
                            {formatDate(payable.dueDate)}
                            {isOverdue && ' ⚠️'}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color={daysUntilDue < 0 ? 'error' : 'text.secondary'}>
                          {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} días vencida` : `${daysUntilDue} días restantes`}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight="bold">
                          {formatCurrency(payable.amount, payable.currency)}
                        </Typography>
                        {payable.currency !== selectedCurrency && (
                          <Typography variant="caption" color="text.secondary">
                            ≈ {formatCurrency(payable.amount * exchangeRate, selectedCurrency)}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {discountInfo.eligible ? (
                          <Chip
                            icon={<Discount />}
                            label={`${payable.discountEarlyPayment}%`}
                            color="success"
                            size="small"
                            variant="outlined"
                          />
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            No disponible
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={getStatusText(payable.status)}
                          color={getStatusColor(payable.status)}
                          size="small"
                        />
                        {payable.status === 'partial' && (
                          <Typography variant="caption" display="block" color="text.secondary">
                            Pagado: {formatCurrency(payable.paidAmount, payable.currency)}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => { setEditingPayable(payable); setOpenDialog(true); }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => { setEditingPayable(payable); setPaymentStep(1); }}
                          >
                            <Payment />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleAddInventory(payable.items)}
                          >
                            <Inventory />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Recepción de Mercancía
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Gestiona la recepción de productos del inventario
            </Typography>
            
            <Grid container spacing={3}>
              {payables.map((payable) => (
                <Grid item xs={12} md={6} key={payable.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6">{payable.invoiceNumber}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {payable.supplier}
                          </Typography>
                        </Box>
                        <Chip
                          label={payable.items.length + ' items'}
                          color="info"
                          size="small"
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        {payable.items.map((item, index) => (
                          <Box key={index} sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            py: 1,
                            borderBottom: index < payable.items.length - 1 ? 1 : 0,
                            borderColor: 'divider'
                          }}>
                            <Box>
                              <Typography variant="body2">{item.product}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.quantity} unidades × {formatCurrency(item.unitPrice)}
                              </Typography>
                            </Box>
                            <Typography variant="body2" fontWeight="bold">
                              {formatCurrency(item.total)}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<LocalShipping />}
                        onClick={() => handleAddInventory(payable.items)}
                      >
                        Recibir Mercancía
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Reportes de Cuentas por Pagar
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Distribución por Proveedor
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={payables}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="supplier" />
                      <YAxis />
                      <Tooltip formatter={(value) => [formatCurrency(value, selectedCurrency), 'Monto']} />
                      <Legend />
                      <Bar dataKey="amount" fill="#8884d8" name="Monto por Pagar" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Tendencia de Pagos
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                      { month: 'Ene', amount: 12000 },
                      { month: 'Feb', amount: 18000 },
                      { month: 'Mar', amount: 15000 },
                      { month: 'Abr', amount: 22000 },
                      { month: 'May', amount: 25000 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [formatCurrency(value, selectedCurrency), 'Monto']} />
                      <Legend />
                      <Line type="monotone" dataKey="amount" stroke="#82ca9d" name="Total por Pagar" />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </UBCard>

      {/* Diálogo para Nueva/Editar Factura */}
      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); setEditingPayable(null); }} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPayable ? 'Editar Factura' : 'Nueva Factura de Proveedor'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Número de Factura" defaultValue={editingPayable?.invoiceNumber} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Proveedor</InputLabel>
                <Select label="Proveedor" defaultValue={editingPayable?.supplier}>
                  {suppliers.map(supplier => (
                    <MenuItem key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha de Emisión"
                type="date"
                InputLabelProps={{ shrink: true }}
                defaultValue={editingPayable?.issueDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha de Vencimiento"
                type="date"
                InputLabelProps={{ shrink: true }}
                defaultValue={editingPayable?.dueDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Moneda</InputLabel>
                <Select label="Moneda" defaultValue={editingPayable?.currency || 'USD'}>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="VES">VES</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Monto Total"
                type="number"
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                defaultValue={editingPayable?.amount}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Descuento por Pronto Pago (%)"
                type="number"
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                defaultValue={editingPayable?.discountEarlyPayment || 0}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Días para Descuento"
                type="number"
                defaultValue={editingPayable?.discountDays || 10}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Términos de Pago"
                defaultValue={editingPayable?.paymentTerms}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notas"
                multiline
                rows={3}
                defaultValue={editingPayable?.notes}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenDialog(false); setEditingPayable(null); }}>Cancelar</Button>
          <Button variant="contained" onClick={() => { setOpenDialog(false); setEditingPayable(null); }}>
            {editingPayable ? 'Actualizar' : 'Crear'} Factura
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para Procesar Pago */}
      <Dialog open={paymentStep > 0} onClose={() => setPaymentStep(0)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Procesar Pago - {editingPayable?.invoiceNumber}
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={paymentStep} sx={{ mb: 3 }}>
            <Step><StepLabel>Seleccionar Método</StepLabel></Step>
            <Step><StepLabel>Confirmar Pago</StepLabel></Step>
            <Step><StepLabel>Completado</StepLabel></Step>
          </Stepper>

          {paymentStep === 1 && editingPayable && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Alert severity="info">
                  <Typography fontWeight="bold">Información de la Factura</Typography>
                  <Typography>Proveedor: {editingPayable.supplier}</Typography>
                  <Typography>Monto: {formatCurrency(editingPayable.amount, editingPayable.currency)}</Typography>
                  <Typography>Vencimiento: {formatDate(editingPayable.dueDate)}</Typography>
                </Alert>
              </Grid>

              {calculateEarlyPaymentDiscount(editingPayable).eligible && (
                <Grid item xs={12}>
                  <Alert severity="success">
                    <Typography fontWeight="bold">¡Descuento por Pronto Pago Disponible!</Typography>
                    <Typography>
                      Ahorro: {formatCurrency(calculateEarlyPaymentDiscount(editingPayable).discountAmount, editingPayable.currency)}
                    </Typography>
                    <Typography>
                      Total con descuento: {formatCurrency(calculateEarlyPaymentDiscount(editingPayable).finalAmount, editingPayable.currency)}
                    </Typography>
                  </Alert>
                </Grid>
              )}

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Método de Pago</InputLabel>
                  <Select label="Método de Pago">
                    <MenuItem value="transfer">Transferencia Bancaria</MenuItem>
                    <MenuItem value="cash">Efectivo</MenuItem>
                    <MenuItem value="check">Cheque</MenuItem>
                    <MenuItem value="credit">Crédito</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monto a Pagar"
                  type="number"
                  defaultValue={calculateEarlyPaymentDiscount(editingPayable).eligible ? 
                    calculateEarlyPaymentDiscount(editingPayable).finalAmount : editingPayable.amount}
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Moneda de Pago</InputLabel>
                  <Select label="Moneda de Pago" defaultValue={editingPayable.currency}>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="VES">VES</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Referencia de Pago"
                  placeholder="Número de transferencia, cheque, etc."
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fecha de Pago"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </Grid>
            </Grid>
          )}

          {paymentStep === 2 && (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                ¡Pago Procesado Exitosamente!
              </Typography>
              <Typography color="text.secondary">
                El pago de {formatCurrency(editingPayable.amount, editingPayable.currency)} ha sido registrado en el sistema.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {paymentStep < 2 && (
            <>
              <Button onClick={() => setPaymentStep(0)}>Cancelar</Button>
              <Button 
                variant="contained" 
                onClick={() => paymentStep === 1 ? handlePayment(editingPayable, editingPayable.amount, editingPayable.currency, true) : setPaymentStep(1)}
              >
                {paymentStep === 0 ? 'Continuar' : 'Confirmar Pago'}
              </Button>
            </>
          )}
          {paymentStep === 2 && (
            <Button onClick={() => { setPaymentStep(0); setEditingPayable(null); }}>
              Finalizar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Payables;