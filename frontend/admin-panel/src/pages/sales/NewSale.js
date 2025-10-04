import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Button, TextField, FormControl, InputLabel, Select, MenuItem,
  Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Stepper, Step, StepLabel, Divider, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  InputAdornment, Alert, Snackbar, LinearProgress, Stack,
  alpha, useTheme, Skeleton
} from '@mui/material';
import {
  Add, Remove, Search, Delete, Payment, Receipt,
  PersonAdd, Inventory, WhatsApp, CreditCard, Money, AccountBalance,
  PointOfSale, Smartphone, ShoppingCart, Group,
  ArrowForward, CheckCircle, CurrencyExchange, Print, Send, Close
} from '@mui/icons-material';

import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

// Hook simplificado y funcional
const useSaleData = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/api/sales/sale-data');
      
      if (response.data.success) {
        setClients(response.data.clients || []);
        setProducts(response.data.products || []);
      } else {
        setError(response.data.message || 'Error al cargar datos');
      }
    } catch (err) {
      setError('Error de conexión');
      // Datos de fallback
      setClients([{
        id: 1,
        name: 'Cliente General',
        rif: 'V-00000000-0', 
        phone: '0000000000',
        type: 'regular'
      }]);
      setProducts([{
        id: 1,
        name: 'Producto de Ejemplo',
        code: 'PROD-001',
        price: 10.00,
        stock: 100,
        category: 'General',
        tax: 16
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createClient = async (clientData) => {
    try {
      const response = await api.post('/api/sales/quick-client', clientData);
      
      if (response.data.success) {
        setClients(prev => [...prev, response.data.client]);
        return response.data.client;
      }
      throw new Error(response.data.message || 'Error al crear cliente');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear cliente');
    }
  };

  return { clients, products, loading, error, loadData, createClient };
};

// Componente Principal
const NewSale = () => {
  const theme = useTheme();
  const { user } = useAuth();
  
  const [activeStep, setActiveStep] = useState(0);
  const [saleData, setSaleData] = useState({
    client: null,
    products: [],
    paymentMethod: 'efectivo',
    currency: 'USD',
    exchangeRate: 36.5,
    discounts: 0,
    notes: '',
    shipping: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [processingSale, setProcessingSale] = useState(false);
  const [newClientDialog, setNewClientDialog] = useState(false);
  const [newClientData, setNewClientData] = useState({ name: '', phone: '', rif: '' });
  const [creatingClient, setCreatingClient] = useState(false);

  const { clients, products, loading, error, loadData, createClient } = useSaleData();

  const steps = [
    { label: 'Cliente', description: 'Selecciona o agrega un cliente' },
    { label: 'Productos', description: 'Agrega productos al carrito' },
    { label: 'Pago', description: 'Configura método de pago' },
    { label: 'Confirmar', description: 'Revisa y confirma la venta' }
  ];

  const paymentMethods = [
    { value: 'efectivo', label: 'Efectivo', icon: <Money /> },
    { value: 'transferencia', label: 'Transferencia', icon: <AccountBalance /> },
    { value: 'pago_movil', label: 'Pago Móvil', icon: <Smartphone /> },
    { value: 'tarjeta', label: 'Tarjeta', icon: <CreditCard /> },
    { value: 'divisas', label: 'Divisas', icon: <CurrencyExchange /> }
  ];

  // Cálculos
  const totals = useMemo(() => {
    const subtotal = saleData.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxes = saleData.products.reduce((sum, item) => sum + (item.price * item.quantity * ((item.tax || 16) / 100)), 0);
    const total = subtotal + taxes - saleData.discounts + saleData.shipping;
    return { subtotal, taxes, total };
  }, [saleData.products, saleData.discounts, saleData.shipping]);

  // Handlers
  const handleAddProduct = useCallback((product) => {
    const existing = saleData.products.find(p => p.id === product.id);
    if (existing) {
      setSaleData(prev => ({
        ...prev,
        products: prev.products.map(p => 
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      }));
    } else {
      setSaleData(prev => ({
        ...prev,
        products: [...prev.products, { ...product, quantity: 1 }]
      }));
    }
    setSnackbar({ open: true, message: `✅ ${product.name} agregado`, severity: 'success' });
  }, [saleData.products]);

  const handleRemoveProduct = useCallback((productId) => {
    setSaleData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
  }, []);

  const handleQuantityChange = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) return;
    setSaleData(prev => ({
      ...prev,
      products: prev.products.map(p =>
        p.id === productId ? { ...p, quantity: newQuantity } : p
      )
    }));
  }, []);

  const handleCreateClient = async () => {
    if (!newClientData.name.trim()) {
      setSnackbar({ open: true, message: '❌ El nombre es obligatorio', severity: 'error' });
      return;
    }

    setCreatingClient(true);
    try {
      const client = await createClient(newClientData);
      setSaleData(prev => ({ ...prev, client }));
      setNewClientDialog(false);
      setNewClientData({ name: '', phone: '', rif: '' });
      setSnackbar({ open: true, message: '✅ Cliente creado exitosamente', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `❌ ${error.message}`, severity: 'error' });
    } finally {
      setCreatingClient(false);
    }
  };

  const handleCompleteSale = async () => {
    try {
      setProcessingSale(true);
      const response = await api.post('/api/sales/new-sale', saleData);
      
      if (response.data.success) {
        setSnackbar({ open: true, message: '🎉 Venta completada exitosamente', severity: 'success' });
        
        setTimeout(() => {
          setSaleData({
            client: null,
            products: [],
            paymentMethod: 'efectivo',
            currency: 'USD',
            exchangeRate: 36.5,
            discounts: 0,
            notes: '',
            shipping: 0
          });
          setActiveStep(0);
          loadData();
        }, 2000);
      } else {
        throw new Error(response.data.message || 'Error al procesar la venta');
      }
    } catch (error) {
      setSnackbar({ open: true, message: `❌ ${error.response?.data?.message || error.message}`, severity: 'error' });
    } finally {
      setProcessingSale(false);
    }
  };

  // Filtros
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(product => 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients;
    return clients.filter(client => 
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.rif?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  // Render steps
  const renderClientStep = () => (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
        <Group sx={{ mr: 1, color: theme.palette.primary.main }} />
        Seleccionar Cliente
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: '#6b7280', mr: 1 }} />
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<PersonAdd />}
            onClick={() => setNewClientDialog(true)}
            sx={{ height: '56px' }}
          >
            Nuevo Cliente
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredClients.map((client) => (
          <Grid item xs={12} md={6} key={client.id}>
            <Card
              sx={{
                border: `2px solid ${saleData.client?.id === client.id ? theme.palette.primary.main : '#e5e7eb'}`,
                borderRadius: '12px',
                cursor: 'pointer'
              }}
              onClick={() => setSaleData(prev => ({ ...prev, client }))}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: saleData.client?.id === client.id ? theme.palette.primary.main : '#6b7280' }}>
                    {client.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700}>{client.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      {client.rif} • {client.phone}
                    </Typography>
                  </Box>
                  {saleData.client?.id === client.id && (
                    <CheckCircle sx={{ color: theme.palette.primary.main }} />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={newClientDialog} onClose={() => setNewClientDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Crear Nuevo Cliente</Typography>
            <IconButton onClick={() => setNewClientDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nombre del Cliente *"
              value={newClientData.name}
              onChange={(e) => setNewClientData(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Teléfono"
              value={newClientData.phone}
              onChange={(e) => setNewClientData(prev => ({ ...prev, phone: e.target.value }))}
              fullWidth
            />
            <TextField
              label="RIF"
              value={newClientData.rif}
              onChange={(e) => setNewClientData(prev => ({ ...prev, rif: e.target.value }))}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewClientDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleCreateClient} 
            variant="contained" 
            disabled={creatingClient || !newClientData.name.trim()}
          >
            {creatingClient ? 'Creando...' : 'Crear Cliente'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  const renderProductsStep = () => (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
        <ShoppingCart sx={{ mr: 1, color: theme.palette.primary.main }} />
        Agregar Productos
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: '#6b7280', mr: 1 }} />
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Productos Disponibles ({filteredProducts.length})
          </Typography>
          
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleAddProduct(product)}
                >
                  <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={700} sx={{ fontSize: '0.9rem' }}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
                          {product.code}
                        </Typography>
                      </Box>
                      <Chip 
                        label={`${product.stock} disp.`} 
                        size="small"
                        color={product.stock === 0 ? 'error' : 'primary'}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h5" fontWeight={800} sx={{ color: theme.palette.primary.main }}>
                        ${product.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Add />}
                      disabled={product.stock === 0}
                    >
                      Agregar al Carrito
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                <Receipt sx={{ mr: 1, color: theme.palette.primary.main }} />
                Carrito de Compra
              </Typography>

              {saleData.products.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Inventory sx={{ fontSize: 48, color: '#d1d5db', mb: 1 }} />
                  <Typography color="text.secondary">
                    No hay productos en el carrito
                  </Typography>
                </Box>
              ) : (
                <Box>
                  {saleData.products.map((product) => (
                    <Card key={product.id} sx={{ mb: 1 }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" fontWeight={700}>
                              {product.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#6b7280' }}>
                              ${product.price.toFixed(2)} c/u
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton size="small" onClick={() => handleQuantityChange(product.id, product.quantity - 1)}>
                              <Remove />
                            </IconButton>
                            <TextField
                              size="small"
                              value={product.quantity}
                              sx={{ width: 60 }}
                              inputProps={{ style: { textAlign: 'center' } }}
                            />
                            <IconButton size="small" onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>
                              <Add />
                            </IconButton>
                          </Box>
                          <Typography variant="subtitle2" fontWeight={700} sx={{ minWidth: 80, textAlign: 'right' }}>
                            ${(product.price * product.quantity).toFixed(2)}
                          </Typography>
                          <IconButton size="small" onClick={() => handleRemoveProduct(product.id)}>
                            <Delete />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}

                  <Box sx={{ mt: 2, p: 2, background: alpha(theme.palette.primary.main, 0.05), borderRadius: '8px' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Total: ${totals.total.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      {saleData.products.reduce((sum, item) => sum + item.quantity, 0)} productos
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderPaymentStep = () => (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
        <Payment sx={{ mr: 1, color: theme.palette.primary.main }} />
        Método de Pago
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Método de Pago</InputLabel>
            <Select
              value={saleData.paymentMethod}
              onChange={(e) => setSaleData(prev => ({ ...prev, paymentMethod: e.target.value }))}
              label="Método de Pago"
            >
              {paymentMethods.map((method) => (
                <MenuItem key={method.value} value={method.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {method.icon}
                    {method.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Descuentos"
            type="number"
            value={saleData.discounts}
            onChange={(e) => setSaleData(prev => ({ ...prev, discounts: parseFloat(e.target.value) || 0 }))}
            InputProps={{
              endAdornment: <InputAdornment position="end">$</InputAdornment>
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notas de la venta"
            multiline
            rows={3}
            value={saleData.notes}
            onChange={(e) => setSaleData(prev => ({ ...prev, notes: e.target.value }))}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Resumen de la Venta
          </Typography>
          
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Subtotal:</Typography>
              <Typography fontWeight={600}>${totals.subtotal.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>IVA:</Typography>
              <Typography fontWeight={600}>${totals.taxes.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Descuentos:</Typography>
              <Typography fontWeight={600} color="error">-${saleData.discounts.toFixed(2)}</Typography>
            </Box>
            
            <Divider />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" fontWeight={700}>${totals.total.toFixed(2)}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );

  const renderConfirmationStep = () => (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
        <CheckCircle sx={{ mr: 1, color: theme.palette.primary.main }} />
        Confirmar Venta
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Revise todos los detalles antes de completar la venta
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Información del Cliente
              </Typography>
              {saleData.client ? (
                <Box>
                  <Typography fontWeight="600">{saleData.client.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>{saleData.client.rif}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>{saleData.client.phone}</Typography>
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Cliente no seleccionado
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Detalles de Pago
              </Typography>
              <Typography variant="body2">
                Método: {paymentMethods.find(m => m.value === saleData.paymentMethod)?.label}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Resumen de Productos ({saleData.products.length})
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">Precio Unit.</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {saleData.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Inventory sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                            <Box>
                              <Typography variant="body2" fontWeight={500}>{product.name}</Typography>
                              <Typography variant="caption" sx={{ color: '#6b7280' }}>{product.code}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{product.quantity}</TableCell>
                        <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                        <TableCell align="right">${(product.price * product.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Total: ${totals.total.toFixed(2)}
            </Typography>
            
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                size="large"
                startIcon={<Print />}
                sx={{ px: 4 }}
              >
                Imprimir
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<PointOfSale />}
                onClick={handleCompleteSale}
                disabled={processingSale}
                sx={{ px: 4 }}
              >
                {processingSale ? 'Procesando...' : 'Completar Venta'}
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Nueva Venta
        </Typography>
        <Typography sx={{ color: '#6b7280' }}>
          Sistema de ventas • {user?.business?.name || 'Tu Negocio'}
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && renderClientStep()}
        {activeStep === 1 && renderProductsStep()}
        {activeStep === 2 && renderPaymentStep()}
        {activeStep === 3 && renderConfirmationStep()}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={() => setActiveStep(prev => prev - 1)}
        >
          Anterior
        </Button>
        
        <Button
          variant="contained"
          onClick={() => setActiveStep(prev => prev + 1)}
          disabled={
            (activeStep === 0 && !saleData.client) ||
            (activeStep === 1 && saleData.products.length === 0) ||
            activeStep === 3
          }
        >
          {activeStep === 3 ? 'Completar' : 'Siguiente'}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NewSale;
