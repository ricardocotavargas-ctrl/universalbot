// frontend/admin-panel/src/pages/inventory/Transfers.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Stepper,
  Step, StepLabel, StepContent, MobileStepper, IconButton,
  Alert, LinearProgress, Tooltip, Avatar, Badge
} from '@mui/material';
import {
  Add, Inventory, LocationOn, SwapHoriz, CheckCircle,
  Pending, Error, Schedule, Person, LocalShipping,
  QrCodeScanner, BarcodeScanner, Save, Cancel, Edit,
  Delete, Visibility, Download, FilterList, Search,
  KeyboardArrowLeft, KeyboardArrowRight
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const Transfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Datos de ejemplo
  const mockTransfers = [
    {
      id: 1,
      reference: 'TRF-2024-001',
      fromLocation: 'Almacén Principal',
      toLocation: 'Sucursal Centro',
      products: [
        { id: 1, name: 'Café Premium', sku: 'CAFE-001', quantity: 50, transferred: 50 },
        { id: 2, name: 'Té Especial', sku: 'TE-002', quantity: 30, transferred: 30 }
      ],
      totalItems: 80,
      status: 'completed',
      createdBy: 'admin@empresa.com',
      createdAt: '2024-05-20 10:30:00',
      completedAt: '2024-05-20 14:00:00',
      notes: 'Transferencia urgente para stock de la semana'
    },
    {
      id: 2,
      reference: 'TRF-2024-002',
      fromLocation: 'Sucursal Norte',
      toLocation: 'Almacén Principal',
      products: [
        { id: 3, name: 'Azúcar Orgánica', sku: 'AZUC-003', quantity: 20, transferred: 15 }
      ],
      totalItems: 20,
      status: 'in_progress',
      createdBy: 'inventario@empresa.com',
      createdAt: '2024-05-21 09:15:00',
      notes: 'Devolución de exceso de stock'
    },
    {
      id: 3,
      reference: 'TRF-2024-003',
      fromLocation: 'Almacén Principal',
      toLocation: 'Sucursal Sur',
      products: [
        { id: 4, name: 'Leche Almendras', sku: 'LECH-004', quantity: 40, transferred: 0 },
        { id: 5, name: 'Pan Integral', sku: 'PAN-005', quantity: 25, transferred: 0 }
      ],
      totalItems: 65,
      status: 'pending',
      createdBy: 'ventas@empresa.com',
      createdAt: '2024-05-21 14:20:00',
      notes: 'Preparar para entrega mañana'
    },
    {
      id: 4,
      reference: 'TRF-2024-004',
      fromLocation: 'Sucursal Este',
      toLocation: 'Sucursal Oeste',
      products: [
        { id: 6, name: 'Miel Natural', sku: 'MIEL-006', quantity: 15, transferred: 15 }
      ],
      totalItems: 15,
      status: 'completed',
      createdBy: 'admin@empresa.com',
      createdAt: '2024-05-19 16:45:00',
      completedAt: '2024-05-20 11:30:00'
    }
  ];

  const mockProducts = [
    { id: 1, name: 'Café Premium', sku: 'CAFE-001', currentStock: 150, location: 'Almacén Principal' },
    { id: 2, name: 'Té Especial', sku: 'TE-002', currentStock: 200, location: 'Almacén Principal' },
    { id: 3, name: 'Azúcar Orgánica', sku: 'AZUC-003', currentStock: 80, location: 'Sucursal Norte' },
    { id: 4, name: 'Leche Almendras', sku: 'LECH-004', currentStock: 120, location: 'Almacén Principal' },
    { id: 5, name: 'Pan Integral', sku: 'PAN-005', currentStock: 90, location: 'Almacén Principal' },
    { id: 6, name: 'Miel Natural', sku: 'MIEL-006', currentStock: 60, location: 'Sucursal Este' }
  ];

  const mockLocations = [
    'Almacén Principal',
    'Sucursal Centro',
    'Sucursal Norte',
    'Sucursal Sur',
    'Sucursal Este',
    'Sucursal Oeste'
  ];

  useEffect(() => {
    setTransfers(mockTransfers);
    setProducts(mockProducts);
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
    return (transferred / total) * 100;
  };

  const filteredTransfers = filterStatus === 'all' 
    ? transfers 
    : transfers.filter(transfer => transfer.status === filterStatus);

  const steps = [
    'Seleccionar Productos',
    'Definir Origen/Destino',
    'Revisar y Confirmar'
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Traslados de Inventario
        </Typography>
        <Typography color="text.secondary">
          Gestiona el movimiento de productos entre ubicaciones
        </Typography>
      </Box>

      {/* Alertas importantes */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>3 traslados pendientes</strong> - Revisa y actualiza el estado de los movimientos en progreso.
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
                <Typography color="text.secondary">Items por Mover</Typography>
              </Box>
              <Typography variant="h4">
                {transfers.filter(t => t.status !== 'completed').reduce((sum, t) => sum + t.totalItems, 0)}
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
      </UBCard>

      {/* Lista de Traslados */}
      <UBCard>
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
                      <Tooltip title="Editar">
                        <IconButton size="small" color="warning">
                          <Edit />
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

        {filteredTransfers.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Inventory sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No hay traslados que coincidan con los filtros
            </Typography>
          </Box>
        )}
      </UBCard>

      {/* Diálogo para nuevo traslado */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
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
                        Selecciona los productos a transferir
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Productos</InputLabel>
                        <Select label="Productos" multiple>
                          {products.map((product) => (
                            <MenuItem key={product.id} value={product.id}>
                              {product.name} - {product.sku} (Stock: {product.currentStock})
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
                          <strong>Productos seleccionados:</strong> 2 productos (80 unidades)
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
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          {activeStep < steps.length && (
            <Button variant="contained" onClick={() => setActiveStep(activeStep + 1)}>
              {activeStep === steps.length - 1 ? 'Crear' : 'Siguiente'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Panel de Estadísticas */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Traslados por Estado
              </Typography>
              <Box sx={{ mt: 2 }}>
                {['pending', 'in_progress', 'completed', 'cancelled'].map((status) => {
                  const count = transfers.filter(t => t.status === status).length;
                  const percentage = (count / transfers.length) * 100;
                  
                  return (
                    <Box key={status} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">
                          {getStatusText(status)}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {count} ({percentage.toFixed(1)}%)
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        color={getStatusColor(status)}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actividad Reciente
              </Typography>
              <Box sx={{ mt: 2 }}>
                {transfers.slice(0, 3).map((transfer) => (
                  <Box key={transfer.id} sx={{ mb: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {transfer.reference}
                      </Typography>
                      <Chip
                        label={getStatusText(transfer.status)}
                        color={getStatusColor(transfer.status)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {transfer.fromLocation} → {transfer.toLocation}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      {formatDateTime(transfer.createdAt)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Transfers;