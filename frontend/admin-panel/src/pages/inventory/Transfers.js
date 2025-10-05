import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Stepper,
  Step, StepLabel, StepContent, Alert, LinearProgress, Tooltip, 
  Avatar, Snackbar
} from '@mui/material';
import {
  Add, Inventory, LocationOn, SwapHoriz, CheckCircle,
  Pending, Error, Schedule, Person, LocalShipping,
  QrCodeScanner, Edit, Delete, Visibility, Download, Search
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const Transfers = () => {
  const { user } = useAuth();
  const [transfers, setTransfers] = useState([]);
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Estados para nuevo traslado
  const [transferForm, setTransferForm] = useState({
    fromLocation: '',
    toLocation: '',
    selectedProducts: [],
    notes: ''
  });

  // Cargar productos del backend
  const loadProducts = async () => {
    try {
      const response = await api.get('/api/inventory');
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error al cargar productos', 
        severity: 'error' 
      });
    }
  };

  // Cargar ubicaciones (puedes obtenerlas de tu base de datos)
  const loadLocations = async () => {
    try {
      // Por ahora usamos ubicaciones estáticas
      // Luego puedes crear un modelo de Location en el backend
      const defaultLocations = [
        'Almacén Principal',
        'Sucursal Centro',
        'Sucursal Norte', 
        'Sucursal Sur',
        'Sucursal Este',
        'Sucursal Oeste'
      ];
      setLocations(defaultLocations);
    } catch (error) {
      console.error('Error loading locations:', error);
    }
  };

  // Cargar traslados del backend
  const loadTransfers = async () => {
    try {
      setLoading(true);
      // TODO: Implementar endpoint de transfers en el backend
      // Por ahora mostramos mensaje informativo
      setTransfers([]);
    } catch (error) {
      console.error('Error loading transfers:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error al cargar traslados', 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadLocations();
    loadTransfers();
  }, []);

  const handleCreateTransfer = async () => {
    try {
      if (!transferForm.fromLocation || !transferForm.toLocation) {
        setSnackbar({ 
          open: true, 
          message: 'Selecciona ubicaciones de origen y destino', 
          severity: 'error' 
        });
        return;
      }

      if (transferForm.selectedProducts.length === 0) {
        setSnackbar({ 
          open: true, 
          message: 'Selecciona al menos un producto', 
          severity: 'error' 
        });
        return;
      }

      // TODO: Implementar creación de transfer en backend
      // const response = await api.post('/api/inventory/transfers', {
      //   fromLocation: transferForm.fromLocation,
      //   toLocation: transferForm.toLocation,
      //   products: transferForm.selectedProducts,
      //   notes: transferForm.notes
      // });

      setSnackbar({ 
        open: true, 
        message: 'Funcionalidad de traslados en desarrollo - Conectando con backend', 
        severity: 'info' 
      });
      
      setOpenDialog(false);
      setActiveStep(0);
      setTransferForm({
        fromLocation: '',
        toLocation: '',
        selectedProducts: [],
        notes: ''
      });
      
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: 'Error al crear traslado: ' + error.message, 
        severity: 'error' 
      });
    }
  };

  const formatDateTime = (datetime) => {
    if (!datetime) return 'N/A';
    return new Date(datetime).toLocaleString('es-VE');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'warning';
      case 'pending': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'in_progress': return <Schedule />;
      case 'pending': return <Pending />;
      case 'cancelled': return <Error />;
      default: return <Pending />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'in_progress': return 'En Progreso';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const steps = [
    'Seleccionar Productos',
    'Definir Origen/Destino',
    'Revisar y Confirmar'
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          <SwapHoriz sx={{ mr: 2, color: 'primary.main' }} />
          Traslados de Inventario
        </Typography>
        <Typography color="text.secondary">
          Gestiona el movimiento de productos entre ubicaciones • {user?.businessName || 'Tu Negocio'}
        </Typography>
      </Box>

      {/* Información del sistema */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Sistema de Traslados</strong> - Conectado con tu inventario real. 
        {products.length > 0 
          ? ` Tienes ${products.length} productos disponibles para trasladar.` 
          : ' Cargando productos...'
        }
      </Alert>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SwapHoriz color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Productos Activos</Typography>
              </Box>
              <Typography variant="h4">{products.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Inventory color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Stock Total</Typography>
              </Box>
              <Typography variant="h4">
                {products.reduce((sum, p) => sum + p.stock, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalShipping color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Ubicaciones</Typography>
              </Box>
              <Typography variant="h4">{locations.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Sistema Listo</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                ✓
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Controles y Filtros */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            disabled={products.length === 0}
          >
            Nuevo Traslado
          </Button>

          <Typography variant="body2" color="text.secondary">
            {products.length === 0 ? 'Cargando productos...' : `${products.length} productos disponibles`}
          </Typography>
        </Box>
      </Card>

      {/* Información de traslados */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sistema de Traslados
          </Typography>
          
          {products.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Inventory sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No hay productos en el inventario
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Agrega productos a tu inventario para poder realizar traslados.
              </Typography>
              <Button
                variant="contained"
                href="/inventory/products"
              >
                Ir a Gestión de Productos
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <SwapHoriz sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Sistema de Traslados Listo
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Tu inventario tiene {products.length} productos disponibles para trasladar entre {locations.length} ubicaciones.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenDialog(true)}
                size="large"
              >
                Crear Primer Traslado
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Diálogo para nuevo traslado */}
      <Dialog open={openDialog} onClose={() => {
        setOpenDialog(false);
        setActiveStep(0);
        setTransferForm({
          fromLocation: '',
          toLocation: '',
          selectedProducts: [],
          notes: ''
        });
      }} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SwapHoriz sx={{ mr: 1, color: 'primary.main' }} />
            Nuevo Traslado de Inventario
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 2 }}>
            {steps.map((step, index) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
                <StepContent>
                  {index === 0 && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Selecciona los productos a transferir desde tu inventario
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Productos Disponibles</InputLabel>
                        <Select 
                          multiple
                          value={transferForm.selectedProducts}
                          onChange={(e) => setTransferForm(prev => ({
                            ...prev,
                            selectedProducts: e.target.value
                          }))}
                          label="Productos Disponibles"
                        >
                          {products.map((product) => (
                            <MenuItem key={product._id} value={product._id}>
                              {product.name} - {product.code} (Stock: {product.stock})
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Alert severity="info">
                        <strong>Productos cargados desde tu inventario real.</strong><br />
                        Stock actualizado en tiempo real. Selecciona los productos que deseas trasladar.
                      </Alert>
                    </Box>
                  )}
                  
                  {index === 1 && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Define las ubicaciones de origen y destino
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel>Ubicación Origen</InputLabel>
                            <Select
                              value={transferForm.fromLocation}
                              onChange={(e) => setTransferForm(prev => ({
                                ...prev,
                                fromLocation: e.target.value
                              }))}
                              label="Ubicación Origen"
                            >
                              <MenuItem value="">Seleccionar origen</MenuItem>
                              {locations.map((location) => (
                                <MenuItem key={location} value={location}>
                                  {location}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel>Ubicación Destino</InputLabel>
                            <Select
                              value={transferForm.toLocation}
                              onChange={(e) => setTransferForm(prev => ({
                                ...prev,
                                toLocation: e.target.value
                              }))}
                              label="Ubicación Destino"
                            >
                              <MenuItem value="">Seleccionar destino</MenuItem>
                              {locations.map((location) => (
                                <MenuItem key={location} value={location}>
                                  {location}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  
                  {index === 2 && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Revisa los detalles del traslado
                      </Typography>
                      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          <strong>Origen:</strong> {transferForm.fromLocation || 'No seleccionado'}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Destino:</strong> {transferForm.toLocation || 'No seleccionado'}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Productos seleccionados:</strong> {transferForm.selectedProducts.length} productos
                        </Typography>
                        {transferForm.selectedProducts.length > 0 && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" fontWeight="bold">
                              Detalles:
                            </Typography>
                            {transferForm.selectedProducts.map(productId => {
                              const product = products.find(p => p._id === productId);
                              return product ? (
                                <Typography key={productId} variant="caption" display="block">
                                  • {product.name} (Stock: {product.stock})
                                </Typography>
                              ) : null;
                            })}
                          </Box>
                        )}
                      </Card>
                      <TextField
                        fullWidth
                        label="Notas (opcional)"
                        multiline
                        rows={3}
                        value={transferForm.notes}
                        onChange={(e) => setTransferForm(prev => ({
                          ...prev,
                          notes: e.target.value
                        }))}
                        placeholder="Agregar notas sobre este traslado..."
                      />
                    </Box>
                  )}
                  
                  <Box sx={{ mb: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (activeStep === steps.length - 1) {
                          handleCreateTransfer();
                        } else {
                          setActiveStep(activeStep + 1);
                        }
                      }}
                      sx={{ mr: 1 }}
                      disabled={
                        (activeStep === 0 && transferForm.selectedProducts.length === 0) ||
                        (activeStep === 1 && (!transferForm.fromLocation || !transferForm.toLocation))
                      }
                    >
                      {activeStep === steps.length - 1 ? 'Crear Traslado' : 'Continuar'}
                    </Button>
                    <Button
                      onClick={() => setActiveStep(activeStep - 1)}
                      disabled={activeStep === 0}
                    >
                      Atrás
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                ¡Traslado creado exitosamente!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                El traslado ha sido programado y está listo para procesarse.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenDialog(false);
            setActiveStep(0);
          }}>Cancelar</Button>
        </DialogActions>
      </Dialog>

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

export default Transfers;
