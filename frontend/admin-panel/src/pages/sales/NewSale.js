import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Button, TextField, FormControl, InputLabel, Select, MenuItem,
  Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Stepper, Step, StepLabel, StepContent, Divider, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  InputAdornment, Badge, Tooltip, Fab, useMediaQuery,
  Alert, Snackbar, LinearProgress, Stack, List, ListItem, ListItemIcon,
  ListItemText, alpha, useTheme, Skeleton
} from '@mui/material';
import {
  Add, Remove, Search, Delete, Payment, Receipt,
  QrCode, PersonAdd, TrendingUp, LocalOffer,
  Inventory, WhatsApp, CreditCard, Money, AccountBalance,
  PointOfSale, Smartphone, FlashOn, Rocket, Psychology,
  ShoppingCart, Group, Speed, AutoGraph, SmartToy,
  ArrowForward, CheckCircle, Warning, Discount,
  CurrencyExchange, ReceiptLong, Print, Send, Close
} from '@mui/icons-material';

// ✅ IMPORTACIÓN CORREGIDA
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

// 🔥 HOOK PERSONALIZADO PARA DATOS REALES
const useSaleData = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📋 Cargando datos de venta...');
      const response = await api.get('/sales/sale-data');
      
      if (response.data.success) {
        console.log('✅ Datos cargados:', {
          clients: response.data.clients?.length,
          products: response.data.products?.length
        });
        setClients(response.data.clients || []);
        setProducts(response.data.products || []);
      } else {
        const errorMsg = response.data.message || 'Error al cargar datos';
        console.error('❌ Error en response:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('❌ Error loading sale data:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Error de conexión';
      setError(errorMsg);
      setClients([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createClient = async (clientData) => {
    try {
      console.log('👤 Creando cliente:', clientData);
      const response = await api.post('/sales/quick-client', clientData);
      
      if (response.data.success) {
        console.log('✅ Cliente creado:', response.data.client);
        setClients(prev => [...prev, response.data.client]);
        return response.data.client;
      } else {
        throw new Error(response.data.message || 'Error al crear cliente');
      }
    } catch (error) {
      console.error('❌ Error creating client:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error al crear cliente';
      throw new Error(errorMsg);
    }
  };

  return { clients, products, loading, error, loadData, createClient };
};

// ... (LOS COMPONENTES GradientCard, ProductCard, ClientCard, CartItem SE MANTIENEN IGUALES)
// 🔥 COMPONENTES MODERNOS (MANTENER EL CÓDIGO ORIGINAL DE ESTOS COMPONENTES)

const GradientCard = ({ children, sx, ...props }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(10px)',
        ...sx
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

const ProductCard = React.memo(({ product, onAdd, loading }) => {
  // ... (mantener el código original del ProductCard)
});

const ClientCard = React.memo(({ client, selected, onSelect, loading }) => {
  // ... (mantener el código original del ClientCard)
});

const CartItem = React.memo(({ item, onQuantityChange, onRemove, stock }) => {
  // ... (mantener el código original del CartItem)
});

// 🔥 COMPONENTE PRINCIPAL MODERNIZADO

const NewSale = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeStep, setActiveStep] = useState(0);
  const [saleData, setSaleData] = useState({
    client: null,
    products: [],
    paymentMethod: 'efectivo',
    currency: 'USD',
    exchangeRate: 36.5,
    discounts: 0,
    taxes: 0,
    notes: '',
    shipping: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [processingSale, setProcessingSale] = useState(false);
  const [newClientDialog, setNewClientDialog] = useState(false);
  const [newClientData, setNewClientData] = useState({ name: '', phone: '', rif: '' });
  const [creatingClient, setCreatingClient] = useState(false);

  const { clients, products, loading, error, loadData, createClient } = useSaleData();

  const steps = [
    { label: 'Cliente', icon: <Group />, description: 'Selecciona o agrega un cliente' },
    { label: 'Productos', icon: <ShoppingCart />, description: 'Agrega productos al carrito' },
    { label: 'Pago', icon: <Payment />, description: 'Configura método de pago' },
    { label: 'Confirmar', icon: <CheckCircle />, description: 'Revisa y confirma la venta' }
  ];

  const paymentMethods = [
    { value: 'efectivo', label: 'Efectivo', icon: <Money />, color: '#10b981' },
    { value: 'transferencia', label: 'Transferencia', icon: <AccountBalance />, color: '#2563eb' },
    { value: 'pago_movil', label: 'Pago Móvil', icon: <Smartphone />, color: '#8b5cf6' },
    { value: 'tarjeta_debito', label: 'Tarjeta Débito', icon: <CreditCard />, color: '#f59e0b' },
    { value: 'tarjeta_credito', label: 'Tarjeta Crédito', icon: <CreditCard />, color: '#ec4899' },
    { value: 'divisas', label: 'Divisas', icon: <CurrencyExchange />, color: '#06b6d4' }
  ];

  const currencies = [
    { value: 'USD', label: 'Dólares ($)', symbol: '$' },
    { value: 'VES', label: 'Bolívares (Bs.)', symbol: 'Bs.' },
    { value: 'EUR', label: 'Euros (€)', symbol: '€' }
  ];

  // Cálculos optimizados con useMemo
  const totals = useMemo(() => {
    const subtotal = saleData.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxes = saleData.products.reduce((sum, item) => sum + (item.price * item.quantity * ((item.tax || 16) / 100)), 0);
    const total = subtotal + taxes - saleData.discounts + saleData.shipping;

    return { subtotal, taxes, total };
  }, [saleData.products, saleData.discounts, saleData.shipping]);

  // Handlers
  const handleAddProduct = useCallback((product) => {
    const existingProduct = saleData.products.find(p => p.id === product.id);
    
    if (existingProduct) {
      setSaleData(prev => ({
        ...prev,
        products: prev.products.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
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

    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (newQuantity > product.stock) {
      setSnackbar({ open: true, message: '❌ Stock insuficiente', severity: 'warning' });
      return;
    }

    setSaleData(prev => ({
      ...prev,
      products: prev.products.map(p =>
        p.id === productId
          ? { ...p, quantity: newQuantity }
          : p
      )
    }));
  }, [products]);

  const handleCreateClient = async () => {
    if (!newClientData.name.trim()) {
      setSnackbar({ open: true, message: '❌ El nombre es obligatorio', severity: 'error' });
      return;
    }

    setCreatingClient(true);
    try {
      const client = await createClient(newClientData);
      if (client) {
        setSaleData(prev => ({ ...prev, client }));
        setNewClientDialog(false);
        setNewClientData({ name: '', phone: '', rif: '' });
        setSnackbar({ open: true, message: '✅ Cliente creado exitosamente', severity: 'success' });
      }
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: `❌ ${error.message || 'Error al crear cliente'}`,
        severity: 'error' 
      });
    } finally {
      setCreatingClient(false);
    }
  };

  const handleCompleteSale = useCallback(async () => {
    try {
      setProcessingSale(true);
      
      console.log('💰 Enviando datos de venta:', {
        products: saleData.products.length,
        client: saleData.client?.name,
        total: totals.total
      });
      
      const response = await api.post('/sales/new-sale', saleData);
      
      if (response.data.success) {
        const sale = response.data.sale;
        
        // Generar mensaje para WhatsApp
        const whatsappMessage = generateWhatsAppMessage(sale);
        
        setSnackbar({ 
          open: true, 
          message: '🎉 Venta completada exitosamente', 
          severity: 'success',
          saleId: sale.id,
          whatsappMessage
        });
        
        // Resetear después de 2 segundos
        setTimeout(() => {
          setSaleData({
            client: null,
            products: [],
            paymentMethod: 'efectivo',
            currency: 'USD',
            exchangeRate: 36.5,
            discounts: 0,
            taxes: 0,
            notes: '',
            shipping: 0
          });
          setActiveStep(0);
          setSearchTerm('');
          setAiSuggestions([]);
          loadData(); // Recargar productos para actualizar stock
        }, 2000);
      } else {
        throw new Error(response.data.message || 'Error al procesar la venta');
      }
    } catch (error) {
      console.error('❌ Error completing sale:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error de conexión';
      setSnackbar({ 
        open: true, 
        message: `❌ ${errorMsg}`,
        severity: 'error' 
      });
    } finally {
      setProcessingSale(false);
    }
  }, [saleData, loadData, totals.total]);

  // Generar mensaje de WhatsApp
  const generateWhatsAppMessage = (sale) => {
    const businessName = user?.business?.name || 'Tu Negocio';
    const productsList = sale.Products?.map(p => 
      `• ${p.Product.name} - ${p.quantity} x $${p.unitPrice} = $${p.totalPrice}`
    ).join('\n') || 'No hay productos';
    
    return `¡Hola! Gracias por tu compra en ${businessName}

📋 *Resumen de tu compra:*
${productsList}

💰 *Total: $${sale.totalAmount}*

📅 Fecha: ${new Date(sale.createdAt).toLocaleDateString()}
🆔 Nº de venta: ${sale.id}

¡Gracias por tu preferencia!`;
  };

  // Enviar por WhatsApp
  const handleSendWhatsApp = (phone, message) => {
    if (!phone) {
      setSnackbar({ open: true, message: '❌ El cliente no tiene número registrado', severity: 'warning' });
      return;
    }

    const formattedPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Imprimir comprobante
  const handlePrintReceipt = async (saleId) => {
    try {
      const response = await api.get(`/sales/sale-receipt/${saleId}`);
      if (response.data.success) {
        // Aquí implementarías la generación del PDF
        const receiptData = response.data.receipt;
        console.log('🧾 Datos para comprobante:', receiptData);
        
        // Por ahora mostramos los datos en consola y un mensaje
        setSnackbar({ 
          open: true, 
          message: `📄 Comprobante #${saleId} generado con logo de ${receiptData.companyInfo.name}`,
          severity: 'info' 
        });
        
        // En un entorno real, aquí abrirías el PDF en nueva ventana
        // generatePDF(receiptData);
      }
    } catch (error) {
      console.error('❌ Error generating receipt:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error al generar comprobante';
      setSnackbar({ open: true, message: `❌ ${errorMsg}`, severity: 'error' });
    }
  };

  // Sugerencias de IA
  useEffect(() => {
    if (saleData.products.length > 0 && products.length > 0) {
      const suggestions = [];
      
      // Sugerencia de upsell basada en productos populares
      if (saleData.products.some(p => p.category?.toLowerCase().includes('café') || p.name?.toLowerCase().includes('café'))) {
        const sugarProduct = products.find(p => p.name?.toLowerCase().includes('azúcar') && p.stock > 0);
        if (sugarProduct && !saleData.products.some(p => p.id === sugarProduct.id)) {
          suggestions.push({
            id: 1,
            type: 'upsell',
            message: 'Los clientes que compran café también suelen comprar azúcar',
            product: sugarProduct,
            confidence: 0.85
          });
        }
      }

      setAiSuggestions(suggestions);
    } else {
      setAiSuggestions([]);
    }
  }, [saleData.products, products, totals.subtotal]);

  // Filtrar productos y clientes
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    return products.filter(product => 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode?.includes(searchTerm)
    );
  }, [products, searchTerm]);

  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients;
    
    return clients.filter(client => 
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.rif?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.includes(searchTerm)
    );
  }, [clients, searchTerm]);

  // Renderizado de pasos (SE MANTIENEN IGUALES PERO CON MEJOR MANEJO DE ERRORES)
  const renderClientStep = () => (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Group sx={{ color: theme.palette.primary.main }} />
        Seleccionar Cliente
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
          {error}
          <Button 
            size="small" 
            onClick={loadData}
            sx={{ ml: 1 }}
          >
            Reintentar
          </Button>
        </Alert>
      )}
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Buscar cliente por nombre, RIF o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#6b7280' }} />
                </InputAdornment>
              )
            }}
            sx={{ mb: 2 }}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<PersonAdd />}
            onClick={() => setNewClientDialog(true)}
            sx={{ 
              height: '56px',
              borderColor: alpha(theme.palette.primary.main, 0.3),
              color: theme.palette.primary.main,
              fontWeight: 600
            }}
          >
            Nuevo Cliente
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Grid container spacing={2}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} md={6} key={item}>
              <Skeleton variant="rectangular" height={100} sx={{ borderRadius: '12px' }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {filteredClients.map((client) => (
            <Grid item xs={12} md={6} key={client.id}>
              <ClientCard 
                client={client}
                selected={saleData.client?.id === client.id}
                onSelect={(client) => setSaleData(prev => ({ ...prev, client }))}
                loading={false}
              />
            </Grid>
          ))}
          {filteredClients.length === 0 && !loading && (
            <Grid item xs={12}>
              <Alert severity="info" sx={{ borderRadius: '8px' }}>
                No se encontraron clientes. Puedes crear uno nuevo.
              </Alert>
            </Grid>
          )}
        </Grid>
      )}

      {saleData.client && (
        <Alert severity="success" sx={{ mt: 2, borderRadius: '8px' }}>
          Cliente seleccionado: <strong>{saleData.client.name}</strong>
          {saleData.client.phone && (
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              📞 {saleData.client.phone}
            </Typography>
          )}
        </Alert>
      )}

      {/* Dialog para nuevo cliente */}
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
              error={!newClientData.name.trim()}
              helperText={!newClientData.name.trim() ? "El nombre es obligatorio" : ""}
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

  // ... (LOS DEMÁS RENDER STEPS SE MANTIENEN IGUALES)

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      py: 1
    }}>
      <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 3, px: isMobile ? 2 : 3 }}>
        {/* Header moderno */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Rocket sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h4" fontWeight={800} sx={{ 
                  background: 'linear-gradient(135deg, #1e293b 0%, #374151 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}>
                  Nueva Venta
                </Typography>
                <Typography sx={{ color: '#6b7280' }}>
                  Sistema de ventas moderno • {user?.business?.name || 'Tu Negocio'}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                icon={<Speed />} 
                label="Modo Rápido" 
                color="primary" 
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>

          {/* Stepper moderno */}
          <Paper sx={{ p: 3, borderRadius: '16px', background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)' }}>
            <Stepper 
              activeStep={activeStep} 
              orientation={isMobile ? 'vertical' : 'horizontal'} 
              sx={{ mb: 2 }}
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        '&.Mui-completed': { color: '#10b981' },
                        '&.Mui-active': { color: theme.palette.primary.main }
                      }
                    }}
                    optional={
                      <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
                        {step.description}
                      </Typography>
                    }
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <LinearProgress 
              variant="determinate" 
              value={(activeStep / (steps.length - 1)) * 100} 
              sx={{ 
                height: 4,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                }
              }}
            />
          </Paper>
        </Box>

        {/* Contenido principal */}
        <Paper sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
        }}>
          {activeStep === 0 && renderClientStep()}
          {activeStep === 1 && renderProductsStep()}
          {activeStep === 2 && renderPaymentStep()}
          {activeStep === 3 && renderConfirmationStep()}
        </Paper>

        {/* Navegación */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep(prev => prev - 1)}
            startIcon={<Remove />}
            sx={{ fontWeight: 600 }}
          >
            Anterior
          </Button>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Paso {activeStep + 1} de {steps.length}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            onClick={() => setActiveStep(prev => prev + 1)}
            endIcon={activeStep === steps.length - 1 ? <CheckCircle /> : <ArrowForward />}
            disabled={
              (activeStep === 0 && !saleData.client) ||
              (activeStep === 1 && saleData.products.length === 0) ||
              activeStep === steps.length - 1
            }
            sx={{ 
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
            }}
          >
            {activeStep === steps.length - 1 ? 'Completar' : 'Siguiente'}
          </Button>
        </Box>

        {/* Snackbar para notificaciones */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            severity={snackbar.severity} 
            sx={{ 
              borderRadius: '8px',
              fontWeight: 600
            }}
            action={
              snackbar.saleId && saleData.client?.phone && (
                <Button
                  color="inherit"
                  size="small"
                  startIcon={<WhatsApp />}
                  onClick={() => {
                    handleSendWhatsApp(saleData.client.phone, snackbar.whatsappMessage);
                  }}
                >
                  Enviar WhatsApp
                </Button>
              )
            }
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default NewSale;
