import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, LinearProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem,
  Tabs, Tab, IconButton, Tooltip, Alert, Stepper, Step, StepLabel,
  Accordion, AccordionSummary, AccordionDetails, Checkbox,
  FormControlLabel, RadioGroup, Radio, FormGroup
} from '@mui/material';
import {
  AccountBalance, CompareArrows, CheckCircle, Error, Pending,
  Download, Upload, Refresh, Visibility, Edit, AutoFixHigh,
  ExpandMore, AccountBalanceWallet, Receipt, AttachMoney,
  CalendarToday, AccountTree, TrendingUp, Warning
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const Reconciliation = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [reconciliationStep, setReconciliationStep] = useState(0);
  const [unmatchedTransactions, setUnmatchedTransactions] = useState([]);

  // Datos de ejemplo mejorados
  const mockAccounts = [
    {
      id: 1,
      bank: 'Banco de Venezuela',
      account: '0102-1234-5678-9012',
      balance: 125000,
      systemBalance: 123800,
      lastReconciliation: '2024-05-15',
      status: 'reconciled',
      currency: 'USD',
      type: 'Corriente',
      discrepancies: 0
    },
    {
      id: 2,
      bank: 'Banesco',
      account: '0134-5678-9012-3456',
      balance: 75000,
      systemBalance: 74200,
      lastReconciliation: '2024-05-10',
      status: 'discrepancy',
      currency: 'USD',
      type: 'Ahorros',
      discrepancies: 3
    },
    {
      id: 3,
      bank: 'Mercantil',
      account: '0105-2468-1357-9246',
      balance: 185000,
      systemBalance: 185000,
      lastReconciliation: '2024-04-28',
      status: 'reconciled',
      currency: 'USD',
      type: 'Corriente',
      discrepancies: 0
    },
    {
      id: 4,
      bank: 'Provincial',
      account: '0108-3692-5814-7036',
      balance: 45000,
      systemBalance: 44750,
      lastReconciliation: '2024-05-18',
      status: 'pending',
      currency: 'USD',
      type: 'Corriente',
      discrepancies: 2
    }
  ];

  const mockTransactions = [
    {
      id: 1,
      date: '2024-05-20',
      description: 'Depósito Cliente ABC',
      amount: 2500,
      type: 'credit',
      status: 'matched',
      bankReference: 'DEP-20240520-001',
      systemReference: 'REC-20240520-001',
      account: '0102-1234-5678-9012'
    },
    {
      id: 2,
      date: '2024-05-19',
      description: 'Pago Proveedor XYZ',
      amount: -1500,
      type: 'debit',
      status: 'matched',
      bankReference: 'PAY-20240519-001',
      systemReference: 'PAG-20240519-001',
      account: '0102-1234-5678-9012'
    },
    {
      id: 3,
      date: '2024-05-18',
      description: 'Transferencia entre cuentas',
      amount: 5000,
      type: 'credit',
      status: 'unmatched',
      bankReference: 'TRF-20240518-001',
      systemReference: null,
      account: '0134-5678-9012-3456'
    },
    {
      id: 4,
      date: '2024-05-17',
      description: 'Comisión mensual',
      amount: -25,
      type: 'debit',
      status: 'unmatched',
      bankReference: 'FEE-20240517-001',
      systemReference: null,
      account: '0134-5678-9012-3456'
    },
    {
      id: 5,
      date: '2024-05-16',
      description: 'Pago nómina',
      amount: -8200,
      type: 'debit',
      status: 'matched',
      bankReference: 'PAY-20240516-001',
      systemReference: 'NOM-20240516-001',
      account: '0105-2468-1357-9246'
    }
  ];

  useEffect(() => {
    setAccounts(mockAccounts);
    setTransactions(mockTransactions);
    setUnmatchedTransactions(mockTransactions.filter(t => t.status === 'unmatched'));
  }, []);

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
      case 'reconciled': return 'success';
      case 'pending': return 'warning';
      case 'discrepancy': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'reconciled': return 'Conciliado';
      case 'pending': return 'Pendiente';
      case 'discrepancy': return 'Discrepancias';
      default: return 'Desconocido';
    }
  };

  const getTransactionColor = (amount) => {
    return amount >= 0 ? 'success.main' : 'error.main';
  };

  const getTransactionIcon = (type) => {
    return type === 'credit' ? <TrendingUp /> : <TrendingDown />;
  };

  const calculateDiscrepancy = (account) => {
    return account.balance - account.systemBalance;
  };

  const startReconciliation = (account) => {
    setSelectedAccount(account);
    setReconciliationStep(0);
    setOpenDialog(true);
  };

  const ReconciliationStepper = () => {
    const steps = [
      'Seleccionar Período',
      'Cargar Extracto',
      'Comparar Transacciones',
      'Resolver Diferencias',
      'Finalizar Conciliación'
    ];

    return (
      <Box sx={{ mb: 3 }}>
        <Stepper activeStep={reconciliationStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Conciliación Bancaria
        </Typography>
        <Typography color="text.secondary">
          Armoniza tus registros contables con los estados de cuenta bancarios
        </Typography>
      </Box>

      {/* Alertas importantes */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Warning sx={{ mr: 1 }} />
          <Typography variant="body2">
            <strong>Período de conciliación mensual activo:</strong> 
            Mayo 2024 - Fecha límite: 05/06/2024
          </Typography>
        </Box>
      </Alert>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Total Cuentas
              </Typography>
              <Typography variant="h4">{accounts.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Conciliadas
              </Typography>
              <Typography variant="h4" color="success.main">
                {accounts.filter(a => a.status === 'reconciled').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Con Discrepancias
              </Typography>
              <Typography variant="h4" color="error.main">
                {accounts.filter(a => a.status === 'discrepancy').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Pendientes
              </Typography>
              <Typography variant="h4" color="warning.main">
                {accounts.filter(a => a.status === 'pending').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<AccountBalance />} label="Cuentas Bancarias" />
            <Tab icon={<CompareArrows />} label="Transacciones" />
            <Tab icon={<Warning />} label="Discrepancias" />
            <Tab icon={<TrendingUp />} label="Reportes" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Filtrar por Estado</InputLabel>
                <Select label="Filtrar por Estado">
                  <MenuItem value="all">Todos los estados</MenuItem>
                  <MenuItem value="reconciled">Conciliados</MenuItem>
                  <MenuItem value="pending">Pendientes</MenuItem>
                  <MenuItem value="discrepancy">Con discrepancias</MenuItem>
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

              <Button variant="contained" startIcon={<CompareArrows />}>
                Conciliación Rápida
              </Button>

              <Tooltip title="Forzar sincronización de saldos">
                <IconButton>
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Banco</TableCell>
                    <TableCell>Número de Cuenta</TableCell>
                    <TableCell align="right">Saldo Bancario</TableCell>
                    <TableCell align="right">Saldo en Sistema</TableCell>
                    <TableCell align="right">Diferencia</TableCell>
                    <TableCell align="center">Última Conciliación</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accounts.map((account) => {
                    const discrepancy = calculateDiscrepancy(account);
                    const discrepancyColor = discrepancy === 0 ? 'success' : 'error';
                    
                    return (
                      <TableRow key={account.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccountBalance sx={{ mr: 1, color: 'primary.main' }} />
                            {account.bank}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">{account.account}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {account.type} - {account.currency}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="bold">
                            {formatCurrency(account.balance, account.currency)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography>
                            {formatCurrency(account.systemBalance, account.currency)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography color={discrepancyColor} fontWeight="bold">
                            {formatCurrency(discrepancy, account.currency)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          {account.lastReconciliation ? formatDate(account.lastReconciliation) : 'Nunca'}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={getStatusText(account.status)}
                            color={getStatusColor(account.status)}
                            variant={account.status === 'reconciled' ? 'filled' : 'outlined'}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Iniciar Conciliación">
                              <IconButton 
                                size="small" 
                                color="primary"
                                onClick={() => startReconciliation(account)}
                              >
                                <CompareArrows />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small">
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar Cuenta">
                              <IconButton size="small" color="secondary">
                                <Edit />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Filtrar por Cuenta</InputLabel>
                <Select label="Filtrar por Cuenta">
                  <MenuItem value="all">Todas las cuentas</MenuItem>
                  {accounts.map(account => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.bank} - {account.account}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Estado</InputLabel>
                <Select label="Estado">
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="matched">Conciliados</MenuItem>
                  <MenuItem value="unmatched">Pendientes</MenuItem>
                </Select>
              </FormControl>

              <Button variant="outlined" startIcon={<Download />}>
                Exportar Transacciones
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Referencia Banco</TableCell>
                    <TableCell>Referencia Sistema</TableCell>
                    <TableCell align="right">Monto</TableCell>
                    <TableCell align="center">Cuenta</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id} hover>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.bankReference}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        {transaction.systemReference ? (
                          <Chip
                            label={transaction.systemReference}
                            size="small"
                            variant="outlined"
                            color="success"
                          />
                        ) : (
                          <Chip
                            label="Sin referencia"
                            size="small"
                            variant="outlined"
                            color="warning"
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          {getTransactionIcon(transaction.type)}
                          <Typography
                            color={getTransactionColor(transaction.amount)}
                            fontWeight="bold"
                            sx={{ ml: 0.5 }}
                          >
                            {formatCurrency(transaction.amount)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="caption">
                          {transaction.account}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={transaction.status === 'matched' ? 'Conciliado' : 'Pendiente'}
                          color={transaction.status === 'matched' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small">
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {activeTab === 2 && unmatchedTransactions.length > 0 && (
          <Box>
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography fontWeight="bold">
                Se encontraron {unmatchedTransactions.length} transacciones sin conciliar
              </Typography>
            </Alert>

            <Grid container spacing={3}>
              {unmatchedTransactions.map((transaction) => (
                <Grid item xs={12} md={6} key={transaction.id}>
                  <Card variant="outlined" sx={{ borderColor: 'warning.main' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" color="warning.main">
                            Transacción Pendiente
                          </Typography>
                          <Typography variant="body2">{transaction.description}</Typography>
                        </Box>
                        <Typography
                          color={getTransactionColor(transaction.amount)}
                          fontWeight="bold"
                        >
                          {formatCurrency(transaction.amount)}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Fecha: {formatDate(transaction.date)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Referencia: {transaction.bankReference}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cuenta: {transaction.account}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" variant="outlined" startIcon={<AutoFixHigh />}>
                          Conciliar Automáticamente
                        </Button>
                        <Button size="small" variant="outlined">
                          Crear Manualmente
                        </Button>
                        <Button size="small" variant="outlined" color="error">
                          Marcar como Error
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Resumen de Conciliación
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Total Transacciones:</Typography>
                        <Typography fontWeight="bold">{transactions.length}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Transacciones Conciliadas:</Typography>
                        <Typography fontWeight="bold" color="success.main">
                          {transactions.filter(t => t.status === 'matched').length}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Transacciones Pendientes:</Typography>
                        <Typography fontWeight="bold" color="warning.main">
                          {unmatchedTransactions.length}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Tasa de Conciliación:</Typography>
                        <Typography fontWeight="bold">
                          {((transactions.filter(t => t.status === 'matched').length / transactions.length) * 100).toFixed(1)}%
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
                      Discrepancias por Banco
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {accounts.filter(a => a.discrepancies > 0).map((account) => (
                        <Box key={account.id} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">{account.bank}</Typography>
                            <Typography variant="body2" fontWeight="bold" color="error.main">
                              {account.discrepancies} discrepancias
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(account.discrepancies / Math.max(...accounts.map(a => a.discrepancies))) * 100}
                            color="error"
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </UBCard>

      {/* Diálogo de Conciliación Avanzada */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CompareArrows sx={{ mr: 1, color: 'primary.main' }} />
            Conciliación - {selectedAccount?.bank}
          </Box>
          <Typography variant="body2" color="text.secondary">
            Cuenta: {selectedAccount?.account}
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <ReconciliationStepper />
          
          {reconciliationStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Seleccionar Período de Conciliación
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fecha de inicio"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fecha de fin"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Incluir transacciones pendientes del período anterior"
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {reconciliationStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Cargar Extracto Bancario
              </Typography>
              <Box sx={{ p: 3, border: 2, borderColor: 'grey.300', borderStyle: 'dashed', borderRadius: 2, textAlign: 'center' }}>
                <Upload sx={{ fontSize: 48, color: 'grey.500', mb: 2 }} />
                <Typography gutterBottom>
                  Arrastra tu extracto bancario aquí o haz clic para seleccionar
                </Typography>
                <Button variant="outlined" startIcon={<Upload />}>
                  Seleccionar Archivo
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Formatos soportados: CSV, XLSX, OFX (máx. 10MB)
                </Typography>
              </Box>
            </Box>
          )}

          {reconciliationStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Comparar Transacciones
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                Se encontraron 15 transacciones en el extracto y 12 en el sistema
              </Alert>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Transacciones Conciliadas (10)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Las transacciones que coinciden automáticamente aparecerán aquí.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Transacciones Pendientes (5)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Revise y concilie manualmente las transacciones pendientes.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}

          {reconciliationStep === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Resolver Diferencias
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Diferencia actual: <strong style={{ color: '#d32f2f' }}>{formatCurrency(calculateDiscrepancy(selectedAccount))}</strong>
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  color="warning"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tipo de Diferencia:
                </Typography>
                <RadioGroup>
                  <FormControlLabel value="timing" control={<Radio />} label="Diferencia de timing (transacción en tránsito)" />
                  <FormControlLabel value="error" control={<Radio />} label="Error de registro" />
                  <FormControlLabel value="fee" control={<Radio />} label="Comisión o cargo no registrado" />
                  <FormControlLabel value="other" control={<Radio />} label="Otra diferencia" />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                label="Notas de la diferencia"
                multiline
                rows={3}
                sx={{ mt: 2 }}
                placeholder="Describa la naturaleza de la diferencia..."
              />
            </Box>
          )}

          {reconciliationStep === 4 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Resumen Final
              </Typography>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Resultado de la Conciliación
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Saldo Bancario:</Typography>
                    <Typography fontWeight="bold">{formatCurrency(selectedAccount?.balance)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Saldo Sistema:</Typography>
                    <Typography fontWeight="bold">{formatCurrency(selectedAccount?.systemBalance)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Diferencia:</Typography>
                    <Typography 
                      fontWeight="bold" 
                      color={calculateDiscrepancy(selectedAccount) === 0 ? 'success.main' : 'error.main'}
                    >
                      {formatCurrency(calculateDiscrepancy(selectedAccount))}
                    </Typography>
                  </Box>
                  {calculateDiscrepancy(selectedAccount) === 0 ? (
                    <Alert severity="success">
                      ¡Conciliación exitosa! Los saldos coinciden perfectamente.
                    </Alert>
                  ) : (
                    <Alert severity="warning">
                      La conciliación tiene diferencias pendientes por resolver.
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Generar asiento contable de ajuste automáticamente"
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button 
            onClick={() => reconciliationStep > 0 && setReconciliationStep(reconciliationStep - 1)}
            disabled={reconciliationStep === 0}
          >
            Anterior
          </Button>
          
          <Button 
            variant="contained"
            onClick={() => reconciliationStep < 4 ? setReconciliationStep(reconciliationStep + 1) : setOpenDialog(false)}
          >
            {reconciliationStep === 4 ? 'Finalizar Conciliación' : 'Siguiente'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Reconciliation;