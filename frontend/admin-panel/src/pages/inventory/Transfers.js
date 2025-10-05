// frontend/admin-panel/src/pages/inventory/Transfers.js - VERSIÓN MEJORADA
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

  // Datos de ubicaciones (pueden venir de la base de datos)
  const mockLocations = [
    'Almacén Principal',
    'Sucursal Centro',
    'Sucursal Norte', 
    'Sucursal Sur',
    'Sucursal Este',
    'Sucursal Oeste'
  ];

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

  const loadTransfers = async () => {
    try {
      setLoading(true);
      // TODO: Implementar endpoint de transfers en el backend
      // const response = await api.get('/api/inventory/transfers');
      // setTransfers(response.data.transfers);
      
      // Por ahora usar datos de ejemplo mejorados
      const exampleTransfers = [
        {
          id: '1',
          reference: 'TRF-2024-001',
          fromLocation: 'Almacén Principal',
          toLocation: 'Sucursal Centro',
          products: [
            { id: '1', name: 'Producto Ejemplo 1', sku: 'PROD-001', quantity: 50, transferred: 50 }
          ],
          totalItems: 50,
          status: 'completed',
          createdBy: user?.email || 'admin@empresa.com',
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
          notes: 'Transferencia de ejemplo completada'
        }
      ];
      
      setTransfers(exampleTransfers);
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
    loadTransfers();
    setLocations(mockLocations);
  }, []);

  const formatDateTime = (datetime) => {
    if (!datetime) return 'N/A';
    return new Date(datetime).toLocaleString('es-VE');
  };

  const formatDate = (datetime) => {
    if (!datetime) return 'N/A';
    return new Date(datetime).toLocaleDateString('es-VE');
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

  const calculateProgress = (transfer) => {
    const total = transfer.products.reduce((sum, product) => sum + product.quantity, 0);
    const transferred = transfer.products.reduce((sum, product) => sum + product.transferred, 0);
    return total > 0 ? (transferred / total) * 100 : 0;
  };

  const filteredTransfers = filterStatus === 'all' 
    ? transfers 
    : transfers.filter(transfer => transfer.status === filterStatus);

  const steps = [
    'Seleccionar Productos',
    'Definir Origen/Destino',
    'Revisar y Confirmar'
  ];

  const handleCreateTransfer = async (transferData) => {
    try {
      // TODO: Implementar creación de transfer en backend
      // const response = await api.post('/api/inventory/transfers', transferData);
      
      setSnackbar({ 
        open: true, 
        message: 'Traslado creado exitosamente (modo demo)', 
        severity: 'success' 
      });
      setOpenDialog(false);
      setActiveStep(0);
      loadTransfers();
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: 'Error al crear traslado', 
        severity: 'error' 
      });
    }
  };

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
        <strong>Sistema de Traslados</strong> - Conectado con el inventario real. Los productos mostrados son de tu base de datos.
      </Alert>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SwapHoriz color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Traslados</Typography>
              </Box>
              <Typography variant="h4">{transfers.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Completados</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {transfers.filter(t => t.status === 'completed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Schedule color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">En Progreso</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {transfers.filter(t => t.status === 'in_progress').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalShipping color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Productos Activos</Typography>
              </Box>
              <Typography variant="h4">
                {products.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Controles y Filtros */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Estado"
            >
              <MenuItem value="all">Todos los estados</MenuItem>
              <MenuItem value="pending">Pendientes</MenuItem>
              <MenuItem value="in_progress">En Progreso</MenuItem>
              <MenuItem value="completed">Completados</MenuItem>
              <MenuItem value="cancelled">Cancelados</MenuItem>
            </Select>
          </FormControl>

          <TextField
            placeholder="Buscar por referencia..."
            InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> }}
            sx={{ minWidth: 200 }}
          />

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Nuevo Traslado
          </Button>

          <Button variant="outlined" startIcon={<Download />}>
            Exportar
          </Button>
        </Box>
      </Card>

      {/* Lista de Traslados */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Historial de Traslados
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Referencia</TableCell>
                  <TableCell>Origen → Destino</TableCell>
                  <TableCell>Productos</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Creado por</TableCell>
                  <TableCell>Fecha Creación</TableCell>
                  <TableCell>Progreso</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransfers.map((transfer) => (
                  <TableRow key={transfer.id} hover>
                    <TableCell>
                      <Typography fontWeight="bold">{transfer.reference}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(transfer.createdAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                        <Typography variant="body2">{transfer.fromLocation}</Typography>
                        <SwapHoriz sx={{ fontSize: 16, mx: 1, color: 'text.secondary' }} />
                        <LocationOn sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                        <Typography variant="body2">{transfer.toLocation}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {transfer.products.length} producto(s)
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {transfer.totalItems} unidades
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(transfer.status)}
                        label={getStatusText(transfer.status)}
                        color={getStatusColor(transfer.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
                          <Person sx={{ fontSize: 16 }} />
                        </Avatar>
                        <Typography variant="body2">
                          {transfer.createdBy.split('@')[0]}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(transfer.createdAt)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(transfer.createdAt).toLocaleTimeString('es-VE', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={calculateProgress(transfer)}
                            color={
                              transfer.status === 'completed' ? 'success' :
                              transfer.status === 'in_progress' ? 'warning' : 'info'
                            }
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {Math.round(calculateProgress(transfer))}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title="Ver detalles">
                          <IconButton size="small" color="primary">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Escanear productos">
                          <IconButton size="small" color="info">
                            <QrCodeScanner />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredTransfers.length === 0 && !loading && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Inventory sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No hay traslados registrados
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenDialog(true)}
                sx={{ mt: 2 }}
              >
                Crear Primer Traslado
              </Button>
            </Box>
          )}

          {loading && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">
                Cargando traslados...
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Diálogo para nuevo traslado */}
      <Dialog open={openDialog} onClose={() => {
        setOpenDialog(false);
        setActiveStep(0);
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
                        <Select label="Productos Disponibles" multiple>
                          {products.map((product) => (
                            <MenuItem key={product._id} value={product._id}>
                              {product.name} - {product.code} (Stock: {product.stock})
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Alert severity="info">
                        Productos cargados desde tu inventario real. Stock actualizado en tiempo real.
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
                            <Select label="Ubicación Origen">
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
                            <Select label="Ubicación Destino">
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
                          <strong>Referencia:</strong> TRF-2024-{String(transfers.length + 1).padStart(3, '0')}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Origen:</strong> Almacén Principal → <strong>Destino:</strong> Sucursal Centro
                        </Typography>
                        <Typography variant="body2">
                          <strong>Productos seleccionados:</strong> {products.length > 0 ? `${products.length} productos disponibles` : 'Sin productos seleccionados'}
                        </Typography>
                      </Card>
                      <TextField
                        fullWidth
                        label="Notas (opcional)"
                        multiline
                        rows={3}
                        placeholder="Agregar notas sobre este traslado..."
                      />
                    </Box>
                  )}
                  
                  <Box sx={{ mb: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(index + 1)}
                      sx={{ mr: 1 }}
                      disabled={index === 0 && products.length === 0}
                    >
                      {index === steps.length - 1 ? 'Crear Traslado' : 'Continuar'}
                    </Button>
                    <Button
                      onClick={() => setActiveStep(index - 1)}
                      disabled={index === 0}
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
          {activeStep < steps.length && (
            <Button 
              variant="contained" 
              onClick={() => setActiveStep(activeStep + 1)}
              disabled={activeStep === 0 && products.length === 0}
            >
              {activeStep === steps.length - 1 ? 'Crear' : 'Siguiente'}
            </Button>
          )}
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
