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
      
      const response = await api.get('/sales/sale-data');
      
      if (response.data.success) {
        setClients(response.data.clients || []);
        setProducts(response.data.products || []);
      } else {
        setError('Error al cargar datos');
      }
    } catch (err) {
      console.error('Error loading sale data:', err);
      setError('Error de conexión');
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
      const response = await api.post('/sales/quick-client', clientData);
      if (response.data.success) {
        setClients(prev => [...prev, response.data.client]);
        return response.data.client;
      }
      return null;
    } catch (error) {
      console.error('Error creating client:', error);
      throw new Error('Error al crear cliente');
    }
  };

  return { clients, products, loading, error, loadData, createClient };
};

// 🔥 COMPONENTES MODERNOS

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
  const theme = useTheme();
  const stockPercentage = product.stock > 0 ? Math.min((product.stock / 100) * 100, 100) : 0;
  const isLowStock = product.stock <= (product.minStock || 5);
  const isOutOfStock = product.stock === 0;

  if (loading) {
    return (
      <Card sx={{ height: 200, borderRadius: '12px' }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
        border: `1px solid ${isOutOfStock ? alpha('#ef4444', 0.3) : isLowStock ? alpha('#f59e0b', 0.2) : alpha(theme.palette.divider, 0.1)}`,
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
        opacity: isOutOfStock ? 0.6 : 1,
        '&:hover': !isOutOfStock ? {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
        } : {}
      }}
      onClick={() => !isOutOfStock && onAdd(product)}
    >
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header del producto */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700} sx={{ 
              fontSize: '0.9rem',
              background: isOutOfStock ? '#6b7280' : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              {product.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
              {product.code}
            </Typography>
          </Box>
          <Chip 
            label={isOutOfStock ? 'Agotado' : `${product.stock} disp.`} 
            size="small"
            color={isOutOfStock ? 'default' : isLowStock ? 'warning' : product.stock > 20 ? 'success' : 'primary'}
            sx={{ 
              fontWeight: 600,
              fontSize: '0.65rem'
            }}
          />
        </Box>

        {/* Barra de stock */}
        {!isOutOfStock && (
          <Box sx={{ mb: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={stockPercentage}
              color={isLowStock ? 'warning' : 'success'}
              sx={{ 
                height: 4,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.primary.main, 0.1)
              }}
            />
          </Box>
        )}

        {/* Precio y categoría */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight={800} sx={{ 
            color: isOutOfStock ? '#6b7280' : theme.palette.primary.main,
            fontSize: '1.1rem'
          }}>
            ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
            IVA {product.tax || 16}% • {product.category || 'General'}
          </Typography>
        </Box>

        {/* Botón de agregar */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<Add />}
          disabled={isOutOfStock}
          sx={{
            background: isOutOfStock ? 
              'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)' :
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            fontWeight: 700,
            borderRadius: '8px',
            py: 1,
            fontSize: '0.8rem',
            mt: 'auto'
          }}
        >
          {isOutOfStock ? 'Agotado' : 'Agregar al Carrito'}
        </Button>
      </CardContent>
    </Card>
  );
});

const ClientCard = React.memo(({ client, selected, onSelect, loading }) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Card sx={{ height: 100, borderRadius: '12px' }}>
        <Skeleton variant="rectangular" height="100%" />
      </Card>
    );
  }

  const getClientTypeColor = (type) => {
    switch (type) {
      case 'premium': return '#f59e0b';
      case 'business': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
        border: `2px solid ${selected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.1)}`,
        borderRadius: '12px',
        boxShadow: selected ? '0 8px 32px rgba(37, 99, 235, 0.15)' : '0 4px 20px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }
      }}
      onClick={() => onSelect(client)}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: selected ? theme.palette.primary.main : getClientTypeColor(client.type),
              width: 40,
              height: 40
            }}
          >
            {client.name ? client.name.charAt(0).toUpperCase() : 'C'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography fontWeight={700} sx={{ fontSize: '0.9rem', color: '#1f2937' }}>
                {client.name || 'Cliente'}
              </Typography>
              {client.type !== 'regular' && (
                <Chip 
                  label={client.type} 
                  size="small"
                  sx={{ 
                    height: 16,
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    background: alpha(getClientTypeColor(client.type), 0.1),
                    color: getClientTypeColor(client.type)
                  }}
                />
              )}
            </Box>
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem', display: 'block' }}>
              {client.rif || 'Sin RIF'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.7rem' }}>
              {client.phone || 'Sin teléfono'}
            </Typography>
          </Box>
          {selected && (
            <CheckCircle sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

const CartItem = React.memo(({ item, onQuantityChange, onRemove, stock }) => {
  const theme = useTheme();

  return (
    <GradientCard sx={{ mb: 1 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Información del producto */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: '#1f2937' }}>
              {item.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280' }}>
              {item.code} • ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'} c/u
            </Typography>
          </Box>

          {/* Controles de cantidad */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              size="small" 
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              sx={{
                background: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2)
                }
              }}
            >
              <Remove sx={{ fontSize: 16 }} />
            </IconButton>
            
            <TextField
              size="small"
              value={item.quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value) || 1;
                if (newQuantity >= 1 && newQuantity <= stock) {
                  onQuantityChange(item.id, newQuantity);
                }
              }}
              sx={{ 
                width: 60,
                '& .MuiInputBase-input': { 
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }
              }}
            />
            
            <IconButton 
              size="small" 
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              disabled={item.quantity >= stock}
              sx={{
                background: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2)
                }
              }}
            >
              <Add sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          {/* Total y acciones */}
          <Box sx={{ textAlign: 'right', minWidth: 80 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: theme.palette.primary.main }}>
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>

          <IconButton 
            size="small" 
            onClick={() => onRemove(item.id)}
            sx={{
              color: '#ef4444',
              '&:hover': {
                background: alpha('#ef4444', 0.1)
              }
            }}
          >
            <Delete sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </CardContent>
    </GradientCard>
  );
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
      setSnackbar({ open: true, message: '❌ Error al crear cliente', severity: 'error' });
    } finally {
      setCreatingClient(false);
    }
  };

  const handleCompleteSale = useCallback(async () => {
    try {
      setProcessingSale(true);
      
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
        setSnackbar({ open: true, message: '❌ Error al procesar la venta', severity: 'error' });
      }
    } catch (error) {
      console.error('Error completing sale:', error);
      setSnackbar({ open: true, message: '❌ Error de conexión', severity: 'error' });
    } finally {
      setProcessingSale(false);
    }
  }, [saleData, loadData]);

  // Generar mensaje de WhatsApp
  const generateWhatsAppMessage = (sale) => {
    const businessName = user?.business?.name || 'Tu Negocio';
    const productsList = sale.Products.map(p => 
      `• ${p.Product.name} - ${p.quantity} x $${p.unitPrice} = $${p.totalPrice}`
    ).join('\n');
    
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

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Imprimir comprobante
  const handlePrintReceipt = async (saleId) => {
    try {
      const response = await api.get(`/sales/sale-receipt/${saleId}`);
      if (response.data.success) {
        // Aquí implementarías la generación del PDF
        // Por ahora mostramos una alerta
        setSnackbar({ open: true, message: '📄 Comprobante generado para impresión', severity: 'info' });
        
        // En un entorno real, aquí abrirías el PDF en nueva ventana
        console.log('Datos para PDF:', response.data.receipt);
      }
    } catch (error) {
      setSnackbar({ open: true, message: '❌ Error al generar comprobante', severity: 'error' });
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

  // Renderizado de pasos
  const renderClientStep = () => (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Group sx={{ color: theme.palette.primary.main }} />
        Seleccionar Cliente
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
          {error}
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
          {filteredClients.length === 0 && (
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
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 1 }}>
        <ShoppingCart sx={{ color: theme.palette.primary.main }} />
        Agregar Productos
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Barra de búsqueda */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Buscar productos por nombre, código o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#6b7280' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* Lista de productos */}
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: '#1f2937' }}>
            Productos Disponibles ({filteredProducts.length})
          </Typography>
          
          {loading ? (
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '12px' }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard 
                    product={product} 
                    onAdd={handleAddProduct}
                    loading={false}
                  />
                </Grid>
              ))}
              {filteredProducts.length === 0 && (
                <Grid item xs={12}>
                  <Alert severity="info" sx={{ borderRadius: '8px' }}>
                    No se encontraron productos con los criterios de búsqueda.
                  </Alert>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>

        {/* Carrito de compras */}
        <Grid item xs={12} md={4}>
          <GradientCard>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Receipt sx={{ color: theme.palette.primary.main }} />
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
                    <CartItem
                      key={product.id}
                      item={product}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveProduct}
                      stock={products.find(p => p.id === product.id)?.stock || 0}
                    />
                  ))}

                  {/* Resumen rápido */}
                  <Box sx={{ mt: 2, p: 2, background: alpha(theme.palette.primary.main, 0.05), borderRadius: '8px' }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ color: '#1f2937' }}>
                      Total: ${totals.total.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      {saleData.products.reduce((sum, item) => sum + item.quantity, 0)} productos
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </GradientCard>

          {/* Sugerencias de IA */}
          {aiSuggestions.length > 0 && (
            <GradientCard sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SmartToy sx={{ color: '#8b5cf6', fontSize: 18 }} />
                  Sugerencias de IA
                </Typography>
                <List dense>
                  {aiSuggestions.map((suggestion) => (
                    <ListItem key={suggestion.id} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Psychology sx={{ color: '#8b5cf6', fontSize: 16 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="caption" sx={{ color: '#6b7280', lineHeight: 1.3 }}>
                            {suggestion.message}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </GradientCard>
          )}
        </Grid>
      </Grid>
    </Box>
  );

  const renderPaymentStep = () => (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Payment sx={{ color: theme.palette.primary.main }} />
        Método de Pago
      </Typography>

      <Grid container spacing={3}>
        {/* Método de pago */}
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
                    <Box sx={{ color: method.color }}>
                      {method.icon}
                    </Box>
                    {method.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Moneda */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Moneda</InputLabel>
            <Select
              value={saleData.currency}
              onChange={(e) => setSaleData(prev => ({ ...prev, currency: e.target.value }))}
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

        {/* Campos adicionales */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Descuentos"
            type="number"
            value={saleData.discounts}
            onChange={(e) => setSaleData(prev => ({ ...prev, discounts: parseFloat(e.target.value) || 0 }))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalOffer sx={{ color: '#6b7280' }} />
                </InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">$</InputAdornment>
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Envío"
            type="number"
            value={saleData.shipping}
            onChange={(e) => setSaleData(prev => ({ ...prev, shipping: parseFloat(e.target.value) || 0 }))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlashOn sx={{ color: '#6b7280' }} />
                </InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">$</InputAdornment>
            }}
          />
        </Grid>

        {saleData.currency === 'VES' && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tasa de Cambio (Bs. por $)"
              type="number"
              value={saleData.exchangeRate}
              onChange={(e) => setSaleData(prev => ({ ...prev, exchangeRate: parseFloat(e.target.value) }))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TrendingUp sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notas de la venta"
            multiline
            rows={3}
            value={saleData.notes}
            onChange={(e) => setSaleData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Observaciones o instrucciones especiales para esta venta..."
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Resumen de la venta */}
      <GradientCard>
        <CardContent>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#1f2937' }}>
            Resumen de la Venta
          </Typography>
          
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>Subtotal:</Typography>
              <Typography variant="body2" fontWeight={600}>${totals.subtotal.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>IVA:</Typography>
              <Typography variant="body2" fontWeight={600}>${totals.taxes.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>Descuentos:</Typography>
              <Typography variant="body2" fontWeight={600} color="error">
                -${saleData.discounts.toFixed(2)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>Envío:</Typography>
              <Typography variant="body2" fontWeight={600}>${saleData.shipping.toFixed(2)}</Typography>
            </Box>
            
            <Divider />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight={700}>Total:</Typography>
              <Typography variant="h6" fontWeight={700} sx={{ 
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                ${totals.total.toFixed(2)}
              </Typography>
            </Box>

            {saleData.currency === 'VES' && (
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Chip 
                  label={`Equivalente: Bs. ${(totals.total * saleData.exchangeRate).toFixed(2)}`}
                  color="secondary"
                  size="small"
                />
              </Box>
            )}
          </Stack>
        </CardContent>
      </GradientCard>
    </Box>
  );

  const renderConfirmationStep = () => (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 1 }}>
        <CheckCircle sx={{ color: theme.palette.primary.main }} />
        Confirmar Venta
      </Typography>

      <Alert severity="info" sx={{ mb: 3, borderRadius: '8px' }}>
        Revise todos los detalles antes de completar la venta
      </Alert>

      <Grid container spacing={3}>
        {/* Información del cliente */}
        <Grid item xs={12} md={6}>
          <GradientCard>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Información del Cliente
              </Typography>
              {saleData.client ? (
                <Box>
                  <Typography fontWeight="600">{saleData.client.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>{saleData.client.rif || 'Sin RIF'}</Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>{saleData.client.phone || 'Sin teléfono'}</Typography>
                  {saleData.client.email && (
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>{saleData.client.email}</Typography>
                  )}
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Cliente no seleccionado
                </Typography>
              )}
            </CardContent>
          </GradientCard>
        </Grid>

        {/* Detalles de pago */}
        <Grid item xs={12} md={6}>
          <GradientCard>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Detalles de Pago
              </Typography>
              <Typography variant="body2">
                Método: {paymentMethods.find(m => m.value === saleData.paymentMethod)?.label}
              </Typography>
              <Typography variant="body2">
                Moneda: {currencies.find(c => c.value === saleData.currency)?.label}
              </Typography>
              {saleData.currency === 'VES' && (
                <Typography variant="body2">
                  Tasa: Bs. {saleData.exchangeRate} por $
                </Typography>
              )}
            </CardContent>
          </GradientCard>
        </Grid>

        {/* Resumen de productos */}
        <Grid item xs={12}>
          <GradientCard>
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
          </GradientCard>
        </Grid>

        {/* Acciones finales */}
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h4" fontWeight={800} gutterBottom sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Total: ${totals.total.toFixed(2)}
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                size="large"
                startIcon={<Print />}
                onClick={() => snackbar.saleId && handlePrintReceipt(snackbar.saleId)}
                sx={{ px: 4, py: 1.5, fontWeight: 600 }}
              >
                Imprimir
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<PointOfSale />}
                onClick={handleCompleteSale}
                disabled={processingSale}
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                }}
              >
                {processingSale ? 'Procesando...' : 'Completar Venta'}
              </Button>
              {saleData.client?.phone && (
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Send />}
                  onClick={() => {
                    const message = generateWhatsAppMessage({
                      Products: saleData.products.map(p => ({
                        Product: { name: p.name },
                        quantity: p.quantity,
                        unitPrice: p.price,
                        totalPrice: p.price * p.quantity
                      })),
                      totalAmount: totals.total,
                      id: 'PENDIENTE',
                      createdAt: new Date()
                    });
                    handleSendWhatsApp(saleData.client.phone, message);
                  }}
                  sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                >
                  Enviar por WhatsApp
                </Button>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

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
