import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Button, TextField, FormControl, InputLabel, Select, MenuItem,
  Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Stepper, Step, StepLabel, StepContent, Divider, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  InputAdornment, Badge, Tooltip, Fab, useMediaQuery, ThemeProvider,
  createTheme, Alert, Snackbar
} from '@mui/material';
import {
  Add, Remove, Search, Delete, Payment, Receipt,
  QrCode, PersonAdd, Calculate, TrendingUp, LocalOffer,
  Inventory, WhatsApp, CreditCard, Money, AccountBalance,
  PointOfSale, Smartphone, FlashOn, Rocket, Psychology
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Tema moderno 2030
const modernTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0066ff',
      light: '#5e92f3',
      dark: '#003ddb'
    },
    secondary: {
      main: '#ff6e00',
      light: '#ff9e40',
      dark: '#c53d00'
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2.2rem'
    },
    h6: {
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.04)'
        }
      }
    }
  }
});

// Componentes estilizados
const FloatingActionButton = styled(Fab)({
  position: 'fixed',
  bottom: 24,
  right: 24,
  background: 'linear-gradient(45deg, #0066ff 0%, #0051cb 100%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(45deg, #0051cb 0%, #003a9e 100%)'
  }
});

const GradientCard = styled(Card)({
  background: 'linear-gradient(135deg, #f6f9ff 0%, #ffffff 100%)',
  border: '1px solid #e3f2fd'
});

const ProductCard = styled(Card)({
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px rgba(0,102,255,0.15)'
  }
});

const NewSale = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [saleData, setSaleData] = useState({
    client: null,
    products: [],
    paymentMethod: 'efectivo',
    currency: 'USD',
    exchangeRate: 36.5,
    discounts: 0,
    taxes: 0,
    notes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const isMobile = useMediaQuery(modernTheme.breakpoints.down('md'));

  // Datos de ejemplo
  useEffect(() => {
    // Mock data para clientes
    setClients([
      { id: 1, name: 'María González', rif: 'V-12345678', phone: '+584141234567', email: 'maria@email.com', address: 'Caracas' },
      { id: 2, name: 'Carlos Rodríguez', rif: 'J-87654321', phone: '+584148765432', email: 'carlos@email.com', address: 'Valencia' },
      { id: 3, name: 'Empresa XYZ C.A.', rif: 'J-12348765', phone: '+584142345678', email: 'contacto@xyz.com', address: 'Maracaibo' }
    ]);

    // Mock data para productos
    setProducts([
      { id: 1, name: 'Café Premium 250g', code: 'CAFE-001', price: 12.50, stock: 45, category: 'Alimentos', tax: 16 },
      { id: 2, name: 'Azúcar Refinada 1kg', code: 'AZUC-002', price: 3.80, stock: 120, category: 'Alimentos', tax: 16 },
      { id: 3, name: 'Arroz Tipo 1 1kg', code: 'ARRO-003', price: 2.50, stock: 89, category: 'Alimentos', tax: 16 },
      { id: 4, name: 'Aceite Vegetal 1L', code: 'ACEI-004', price: 4.20, stock: 67, category: 'Alimentos', tax: 16 },
      { id: 5, name: 'Harina PAN 1kg', code: 'HARI-005', price: 2.80, stock: 34, category: 'Alimentos', tax: 16 }
    ]);
  }, []);

  const steps = [
    { label: 'Cliente', icon: <PersonAdd /> },
    { label: 'Productos', icon: <Inventory /> },
    { label: 'Pago', icon: <Payment /> },
    { label: 'Confirmación', icon: <Receipt /> }
  ];

  const paymentMethods = [
    { value: 'efectivo', label: 'Efectivo', icon: <Money /> },
    { value: 'transferencia', label: 'Transferencia', icon: <AccountBalance /> },
    { value: 'pago_movil', label: 'Pago Móvil', icon: <Smartphone /> },
    { value: 'tarjeta_debito', label: 'Tarjeta Débito', icon: <CreditCard /> },
    { value: 'tarjeta_credito', label: 'Tarjeta Crédito', icon: <CreditCard /> },
    { value: 'divisas', label: 'Divisas', icon: <PointOfSale /> }
  ];

  const currencies = [
    { value: 'USD', label: 'Dólares ($)', symbol: '$' },
    { value: 'VES', label: 'Bolívares (Bs.)', symbol: 'Bs.' },
    { value: 'EUR', label: 'Euros (€)', symbol: '€' }
  ];

  const calculateTotals = () => {
    const subtotal = saleData.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxes = saleData.products.reduce((sum, item) => sum + (item.price * item.quantity * (item.tax / 100)), 0);
    const total = subtotal + taxes - saleData.discounts;

    return { subtotal, taxes, total };
  };

  const handleAddProduct = (product) => {
    const existingProduct = saleData.products.find(p => p.id === product.id);
    
    if (existingProduct) {
      setSaleData({
        ...saleData,
        products: saleData.products.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      });
    } else {
      setSaleData({
        ...saleData,
        products: [...saleData.products, { ...product, quantity: 1 }]
      });
    }

    setSnackbar({ open: true, message: 'Producto agregado', severity: 'success' });
  };

  const handleRemoveProduct = (productId) => {
    setSaleData({
      ...saleData,
      products: saleData.products.filter(p => p.id !== productId)
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setSaleData({
      ...saleData,
      products: saleData.products.map(p =>
        p.id === productId
          ? { ...p, quantity: newQuantity }
          : p
      )
    });
  };

  const handleCompleteSale = () => {
    // Lógica para completar la venta
    setSnackbar({ open: true, message: 'Venta completada exitosamente', severity: 'success' });
    // Resetear el formulario después de 2 segundos
    setTimeout(() => {
      setSaleData({
        client: null,
        products: [],
        paymentMethod: 'efectivo',
        currency: 'USD',
        exchangeRate: 36.5,
        discounts: 0,
        taxes: 0,
        notes: ''
      });
      setActiveStep(0);
    }, 2000);
  };

  const { subtotal, taxes, total } = calculateTotals();

  const renderClientStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        👥 Seleccionar Cliente
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<PersonAdd />}
            onClick={() => setOpenClientDialog(true)}
            sx={{ height: '56px' }}
          >
            Nuevo Cliente
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {clients.filter(client => 
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.rif.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((client) => (
          <Grid item xs={12} md={6} key={client.id}>
            <Card 
              sx={{ 
                border: saleData.client?.id === client.id ? 2 : 1,
                borderColor: saleData.client?.id === client.id ? 'primary.main' : 'divider',
                cursor: 'pointer'
              }}
              onClick={() => setSaleData({ ...saleData, client })}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {client.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography fontWeight="600">{client.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {client.rif} • {client.phone}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {saleData.client && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Cliente seleccionado: <strong>{saleData.client.name}</strong>
        </Alert>
      )}
    </Box>
  );

  const renderProductsStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        🛒 Agregar Productos
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setOpenProductDialog(true)}>
                    <QrCode />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {products.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.code.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography fontWeight="600">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.code}
                    </Typography>
                  </Box>
                  <Chip 
                    label={`${product.stock} disp.`} 
                    size="small" 
                    color={product.stock > 10 ? 'success' : 'warning'}
                  />
                </Box>

                <Typography variant="h6" color="primary" gutterBottom>
                  ${product.price.toFixed(2)}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  IVA {product.tax}% • {product.category}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => handleAddProduct(product)}
                  disabled={product.stock === 0}
                >
                  Agregar
                </Button>
              </CardContent>
            </ProductCard>
          </Grid>
        ))}
      </Grid>

      {saleData.products.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Productos en la Venta
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {saleData.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Inventory color="primary" />
                        <Box>
                          <Typography fontWeight="500">{product.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.code}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          size="small"
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                          sx={{ width: 60 }}
                          inputProps={{ style: { textAlign: 'center' } }}
                        />
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                          disabled={product.quantity >= product.stock}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>${(product.price * product.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );

  const renderPaymentStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        💰 Método de Pago
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Método de Pago</InputLabel>
            <Select
              value={saleData.paymentMethod}
              onChange={(e) => setSaleData({ ...saleData, paymentMethod: e.target.value })}
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
          <FormControl fullWidth>
            <InputLabel>Moneda</InputLabel>
            <Select
              value={saleData.currency}
              onChange={(e) => setSaleData({ ...saleData, currency: e.target.value })}
              label="Moneda"
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.value} value={currency.value}>
                  {currency.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {saleData.currency === 'VES' && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tasa de Cambio (Bs. por $)"
              type="number"
              value={saleData.exchangeRate}
              onChange={(e) => setSaleData({ ...saleData, exchangeRate: parseFloat(e.target.value) })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TrendingUp />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Descuentos"
            type="number"
            value={saleData.discounts}
            onChange={(e) => setSaleData({ ...saleData, discounts: parseFloat(e.target.value) || 0 })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalOffer />
                </InputAdornment>
              ),
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
            onChange={(e) => setSaleData({ ...saleData, notes: e.target.value })}
            placeholder="Observaciones o instrucciones especiales..."
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <GradientCard sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Resumen de la Venta
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Subtotal:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>IVA:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>${taxes.toFixed(2)}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>Descuentos:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography color="error">-${saleData.discounts.toFixed(2)}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Total:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="h6" color="primary">
              ${total.toFixed(2)}
            </Typography>
          </Grid>

          {saleData.currency === 'VES' && (
            <Grid item xs={12} textAlign="center">
              <Chip 
                label={`Equivalente: Bs. ${(total * saleData.exchangeRate).toFixed(2)}`}
                color="secondary"
              />
            </Grid>
          )}
        </Grid>
      </GradientCard>
    </Box>
  );

  const renderConfirmationStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        ✅ Confirmar Venta
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Revise todos los detalles antes de completar la venta
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Información del Cliente
              </Typography>
              {saleData.client ? (
                <Box>
                  <Typography fontWeight="600">{saleData.client.name}</Typography>
                  <Typography variant="body2">{saleData.client.rif}</Typography>
                  <Typography variant="body2">{saleData.client.phone}</Typography>
                  <Typography variant="body2">{saleData.client.email}</Typography>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Cliente no seleccionado
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Detalles de Pago
              </Typography>
              <Typography>
                Método: {paymentMethods.find(m => m.value === saleData.paymentMethod)?.label}
              </Typography>
              <Typography>
                Moneda: {currencies.find(c => c.value === saleData.currency)?.label}
              </Typography>
              {saleData.currency === 'VES' && (
                <Typography>
                  Tasa: Bs. {saleData.exchangeRate} por $
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Resumen de Productos
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">Precio</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {saleData.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
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
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Total: ${total.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<PointOfSale />}
              onClick={handleCompleteSale}
              sx={{ px: 4, py: 1.5 }}
            >
              Completar Venta
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <ThemeProvider theme={modernTheme}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Rocket sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h4" fontWeight="700">
              Nueva Venta
            </Typography>
          </Box>
          <Typography color="text.secondary">
            Sistema de ventas moderno y eficiente para Venezuela 2030
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'} sx={{ mb: 4 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={index === 3 ? <Typography variant="caption">Último paso</Typography> : null}
                icon={step.icon}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{ p: 3, mb: 3 }}>
          {activeStep === 0 && renderClientStep()}
          {activeStep === 1 && renderProductsStep()}
          {activeStep === 2 && renderPaymentStep()}
          {activeStep === 3 && renderConfirmationStep()}
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(prev => prev - 1)}
            startIcon={<Remove />}
          >
            Anterior
          </Button>
          
          <Button
            variant="contained"
            onClick={() => setActiveStep(prev => prev + 1)}
            endIcon={<Add />}
            disabled={
              (activeStep === 0 && !saleData.client) ||
              (activeStep === 1 && saleData.products.length === 0) ||
              activeStep === 3
            }
          >
            {activeStep === steps.length - 1 ? 'Completar' : 'Siguiente'}
          </Button>
        </Box>

        {/* Botones flotantes de acción rápida */}
        <FloatingActionButton>
          <WhatsApp />
        </FloatingActionButton>

        <Tooltip title="Calculadora rápida">
          <Fab
            color="secondary"
            sx={{ position: 'fixed', bottom: 24, right: 100 }}
          >
            <Calculate />
          </Fab>
        </Tooltip>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </Container>
    </ThemeProvider>
  );
};

export default NewSale;