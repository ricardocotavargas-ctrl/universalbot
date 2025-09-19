import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, IconButton,
  Tabs, Tab, LinearProgress, Alert, Avatar, Tooltip
} from '@mui/material';
import {
  AttachMoney, CalendarToday, Person, Payment, TrendingUp,
  TrendingDown, Add, Edit, Delete, Visibility, Download,
  FilterList, AccountBalance, Schedule, Warning
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import { formatCurrency, formatDate, formatDateTime } from '../../utils/formatters';

const Receivables = () => {
  const [receivables, setReceivables] = useState([]);
  const [clients, setClients] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedReceivable, setSelectedReceivable] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    client: 'all',
    daysOverdue: 'all'
  });

  // Datos de ejemplo para cuentas por cobrar
  const mockReceivables = [
    {
      id: 1,
      client: 'María González',
      clientId: 'C001',
      saleId: 'V-2024-00125',
      saleDate: '2024-05-15',
      dueDate: '2024-06-15',
      originalAmount: 1250,
      pendingAmount: 1250,
      status: 'pending',
      paymentTerms: '30 días',
      creditDays: 30,
      daysOverdue: 0,
      payments: [],
      notes: 'Venta a crédito - Electrodomésticos'
    },
    {
      id: 2,
      client: 'Carlos Rodríguez',
      clientId: 'C002',
      saleId: 'V-2024-00130',
      saleDate: '2024-05-10',
      dueDate: '2024-05-25',
      originalAmount: 850,
      pendingAmount: 850,
      status: 'overdue',
      paymentTerms: '15 días',
      creditDays: 15,
      daysOverdue: 5,
      payments: [],
      notes: 'Venta a crédito - Herramientas'
    },
    {
      id: 3,
      client: 'Ana Martínez',
      clientId: 'C003',
      saleId: 'V-2024-00145',
      saleDate: '2024-05-05',
      dueDate: '2024-06-05',
      originalAmount: 2100,
      pendingAmount: 1050,
      status: 'partial',
      paymentTerms: '30 días',
      creditDays: 30,
      daysOverdue: 0,
      payments: [
        { id: 1, date: '2024-05-20', amount: 1050, method: 'transferencia' }
      ],
      notes: 'Venta a crédito - Muebles de oficina'
    },
    {
      id: 4,
      client: 'Juan López',
      clientId: 'C004',
      saleId: 'V-2024-00150',
      saleDate: '2024-04-20',
      dueDate: '2024-05-20',
      originalAmount: 350,
      pendingAmount: 350,
      status: 'overdue',
      paymentTerms: '30 días',
      creditDays: 30,
      daysOverdue: 10,
      payments: [],
      notes: 'Venta a crédito - Materiales'
    }
  ];

  const mockClients = [
    { id: 'C001', name: 'María González', creditLimit: 5000, currentBalance: 1250 },
    { id: 'C002', name: 'Carlos Rodríguez', creditLimit: 3000, currentBalance: 850 },
    { id: 'C003', name: 'Ana Martínez', creditLimit: 10000, currentBalance: 1050 },
    { id: 'C004', name: 'Juan López', creditLimit: 2000, currentBalance: 350 }
  ];

  useEffect(() => {
    setReceivables(mockReceivables);
    setClients(mockClients);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'partial': return 'warning';
      case 'overdue': return 'error';
      case 'pending': return 'info';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Pagado';
      case 'partial': return 'Pago Parcial';
      case 'overdue': return 'Vencido';
      case 'pending': return 'Pendiente';
      default: return 'Desconocido';
    }
  };

  const getDaysOverdueColor = (days) => {
    if (days === 0) return 'default';
    if (days <= 7) return 'warning';
    if (days <= 30) return 'error';
    return 'error';
  };

  const calculateAging = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const filteredReceivables = receivables.filter(receivable => {
    const matchesStatus = filters.status === 'all' || receivable.status === filters.status;
    const matchesClient = filters.client === 'all' || receivable.clientId === filters.client;
    const matchesDays = filters.daysOverdue === 'all' || 
      (filters.daysOverdue === 'overdue' && receivable.daysOverdue > 0) ||
      (filters.daysOverdue === 'due_soon' && receivable.daysOverdue <= 0 && calculateAging(receivable.dueDate) <= 7);

    return matchesStatus && matchesClient && matchesDays;
  });

  const totals = {
    totalPending: receivables.reduce((sum, r) => sum + r.pendingAmount, 0),
    totalOverdue: receivables.filter(r => r.status === 'overdue').reduce((sum, r) => sum + r.pendingAmount, 0),
    totalDueSoon: receivables.filter(r => r.status === 'pending' && calculateAging(r.dueDate) <= 7).reduce((sum, r) => sum + r.pendingAmount, 0)
  };

  const handleAddPayment = (receivable) => {
    setSelectedReceivable(receivable);
    setOpenPaymentDialog(true);
  };

  const handleViewDetails = (receivable) => {
    setSelectedReceivable(receivable);
    setOpenDetailsDialog(true);
  };

  const processPayment = (paymentData) => {
    // Lógica para procesar el pago
    console.log('Procesando pago:', paymentData);
    setOpenPaymentDialog(false);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Cuentas por Cobrar
        </Typography>
        <Typography color="text.secondary">
          Gestión de créditos y pagos pendientes de clientes
        </Typography>
      </Box>

      {/* Alertas importantes */}
      {totals.totalOverdue > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">
            Tienes {receivables.filter(r => r.status === 'overdue').length} cuentas vencidas por un total de {formatCurrency(totals.totalOverdue)}
          </Typography>
        </Alert>
      )}

      {/* KPIs principales */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccountBalance color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total por Cobrar</Typography>
              </Box>
              <Typography variant="h4">{formatCurrency(totals.totalPending)}</Typography>
              <Typography variant="body2" color="text.secondary">
                {receivables.length} cuentas activas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Warning color="error" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Vencidas</Typography>
              </Box>
              <Typography variant="h4" color="error.main">
                {formatCurrency(totals.totalOverdue)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {receivables.filter(r => r.status === 'overdue').length} cuentas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Schedule color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Por Vencer</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {formatCurrency(totals.totalDueSoon)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {receivables.filter(r => r.status === 'pending' && calculateAging(r.dueDate) <= 7).length} cuentas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros y controles */}
      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              label="Estado"
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="pending">Pendientes</MenuItem>
              <MenuItem value="partial">Parciales</MenuItem>
              <MenuItem value="overdue">Vencidas</MenuItem>
              <MenuItem value="paid">Pagadas</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Cliente</InputLabel>
            <Select
              value={filters.client}
              onChange={(e) => setFilters({ ...filters, client: e.target.value })}
              label="Cliente"
            >
              <MenuItem value="all">Todos los clientes</MenuItem>
              {clients.map(client => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Vencimiento</InputLabel>
            <Select
              value={filters.daysOverdue}
              onChange={(e) => setFilters({ ...filters, daysOverdue: e.target.value })}
              label="Vencimiento"
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="overdue">Vencidas</MenuItem>
              <MenuItem value="due_soon">Por vencer (7 días)</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" startIcon={<Download />}>
            Exportar Reporte
          </Button>

          <Button variant="outlined" startIcon={<FilterList />}>
            Más Filtros
          </Button>
        </Box>
      </UBCard>

      {/* Tabs de navegación */}
      <UBCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<AccountBalance />} label="Todas las Cuentas" />
            <Tab icon={<Warning />} label="Cuentas Vencidas" />
            <Tab icon={<Schedule />} label="Por Vencer" />
            <Tab icon={<TrendingUp />} label="Historial de Pagos" />
          </Tabs>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Venta</TableCell>
                <TableCell>Fecha Vencimiento</TableCell>
                <TableCell align="right">Monto Original</TableCell>
                <TableCell align="right">Saldo Pendiente</TableCell>
                <TableCell align="center">Días de Vencimiento</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReceivables.map((receivable) => (
                <TableRow key={receivable.id} sx={{ 
                  bgcolor: receivable.status === 'overdue' ? 'error.light' : 'transparent',
                  '&:hover': { bgcolor: receivable.status === 'overdue' ? 'error.light' : 'action.hover' }
                }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                        {receivable.client.charAt(0)}
                      </Avatar>
                      {receivable.client}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{receivable.saleId}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(receivable.saleDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      {formatDate(receivable.dueDate)}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(receivable.originalAmount)}
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold">
                      {formatCurrency(receivable.pendingAmount)}
                    </Typography>
                    {receivable.status === 'partial' && (
                      <Typography variant="caption" color="text.secondary">
                        ({Math.round((receivable.pendingAmount / receivable.originalAmount) * 100)}% pendiente)
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {receivable.daysOverdue > 0 ? (
                      <Chip
                        label={`${receivable.daysOverdue} días`}
                        color={getDaysOverdueColor(receivable.daysOverdue)}
                        size="small"
                      />
                    ) : (
                      <Chip
                        label="Al día"
                        color="success"
                        size="small"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={getStatusText(receivable.status)}
                      color={getStatusColor(receivable.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Registrar Pago">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleAddPayment(receivable)}
                        >
                          <Payment />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Ver Detalles">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(receivable)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredReceivables.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <AccountBalance sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No hay cuentas por cobrar que coincidan con los filtros
            </Typography>
          </Box>
        )}
      </UBCard>

      {/* Resumen de envejecimiento */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Envejecimiento de Cuentas
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  { label: 'Al día', amount: 2500, color: 'success' },
                  { label: '1-7 días', amount: 1200, color: 'warning' },
                  { label: '8-30 días', amount: 850, color: 'error' },
                  { label: '+30 días', amount: 350, color: 'error' }
                ].map((item, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{item.label}</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(item.amount)}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(item.amount / 4900) * 100}
                      color={item.color}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Próximos Vencimientos
              </Typography>
              <Box sx={{ mt: 2 }}>
                {receivables
                  .filter(r => r.status === 'pending' && calculateAging(r.dueDate) <= 7)
                  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                  .slice(0, 5)
                  .map((receivable) => (
                    <Box key={receivable.id} sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      mb: 2, 
                      p: 1, 
                      bgcolor: 'warning.light', 
                      borderRadius: 1 
                    }}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {receivable.client}
                        </Typography>
                        <Typography variant="caption">
                          Vence: {formatDate(receivable.dueDate)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(receivable.pendingAmount)}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Diálogo para registrar pago */}
      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Registrar Pago - {selectedReceivable?.client}
        </DialogTitle>
        <DialogContent>
          {selectedReceivable && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Saldo pendiente: {formatCurrency(selectedReceivable.pendingAmount)}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Monto del Pago"
                  type="number"
                  InputProps={{ 
                    startAdornment: '$',
                    inputProps: { max: selectedReceivable.pendingAmount }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha del Pago"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Método de Pago</InputLabel>
                  <Select label="Método de Pago">
                    <MenuItem value="efectivo">Efectivo</MenuItem>
                    <MenuItem value="transferencia">Transferencia</MenuItem>
                    <MenuItem value="tarjeta">Tarjeta de Crédito/Débito</MenuItem>
                    <MenuItem value="cheque">Cheque</MenuItem>
                    <MenuItem value="otros">Otros</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Número de Referencia"
                  placeholder="Número de transacción o referencia"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notas"
                  multiline
                  rows={2}
                  placeholder="Observaciones adicionales del pago..."
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => processPayment(selectedReceivable)}>
            Registrar Pago
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para ver detalles */}
      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Detalles de Cuenta - {selectedReceivable?.client}
        </DialogTitle>
        <DialogContent>
          {selectedReceivable && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Información de la Venta</Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="body2"><strong>Número de Venta:</strong> {selectedReceivable.saleId}</Typography>
                  <Typography variant="body2"><strong>Fecha de Venta:</strong> {formatDate(selectedReceivable.saleDate)}</Typography>
                  <Typography variant="body2"><strong>Términos de Pago:</strong> {selectedReceivable.paymentTerms}</Typography>
                  <Typography variant="body2"><strong>Monto Original:</strong> {formatCurrency(selectedReceivable.originalAmount)}</Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Estado Actual</Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="body2"><strong>Saldo Pendiente:</strong> {formatCurrency(selectedReceivable.pendingAmount)}</Typography>
                  <Typography variant="body2"><strong>Fecha de Vencimiento:</strong> {formatDate(selectedReceivable.dueDate)}</Typography>
                  <Typography variant="body2"><strong>Días de Vencimiento:</strong> {selectedReceivable.daysOverdue} días</Typography>
                  <Typography variant="body2"><strong>Estado:</strong> 
                    <Chip label={getStatusText(selectedReceivable.status)} color={getStatusColor(selectedReceivable.status)} size="small" sx={{ ml: 1 }} />
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Historial de Pagos</Typography>
                {selectedReceivable.payments.length > 0 ? (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Fecha</TableCell>
                          <TableCell>Método</TableCell>
                          <TableCell align="right">Monto</TableCell>
                          <TableCell>Referencia</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedReceivable.payments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>{formatDate(payment.date)}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell align="right">{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>{payment.reference || 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No hay pagos registrados
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Notas</Typography>
                <Typography variant="body2">{selectedReceivable.notes}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailsDialog(false)}>Cerrar</Button>
          <Button variant="outlined" onClick={() => handleAddPayment(selectedReceivable)}>
            Registrar Pago
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Receivables;