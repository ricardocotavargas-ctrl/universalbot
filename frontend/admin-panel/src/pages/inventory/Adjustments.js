// frontend/admin-panel/src/pages/inventory/Adjustments.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Switch,
  FormControlLabel, IconButton, Alert, LinearProgress, Stepper,
  Step, StepLabel, StepContent, InputAdornment, Avatar
} from '@mui/material';
import {
  Add, Edit, Delete, Inventory, Search, FilterList,
  Download, Upload, History, TrendingUp, TrendingDown,
  CheckCircle, Cancel, Warning, QrCodeScanner
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Adjustments = () => {
  const [adjustments, setAdjustments] = useState([]);
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAdjustment, setEditingAdjustment] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: '30days'
  });

  const mockProducts = [
    { id: 1, name: 'Café Premium', sku: 'CAFE-001', currentStock: 150, cost: 12.50, category: 'Bebidas' },
    { id: 2, name: 'Té Especial', sku: 'TE-002', currentStock: 200, cost: 8.75, category: 'Bebidas' },
    { id: 3, name: 'Pastel Chocolate', sku: 'PAS-003', currentStock: 25, cost: 16.00, category: 'Repostería' },
    { id: 4, name: 'Jugo Natural', sku: 'JUG-004', currentStock: 80, cost: 9.25, category: 'Bebidas' }
  ];

  const mockAdjustments = [
    {
      id: 1,
      date: '2024-05-20 14:30:25',
      product: 'Café Premium',
      productId: 1,
      sku: 'CAFE-001',
      type: 'increment',
      quantity: 50,
      reason: 'Reabastecimiento',
      previousStock: 100,
      newStock: 150,
      cost: 625.00,
      status: 'completed',
      approvedBy: 'admin@empresa.com',
      reference: 'AJ-20240520-001'
    },
    {
      id: 2,
      date: '2024-05-19 11:15:30',
      product: 'Pastel Chocolate',
      productId: 3,
      sku: 'PAS-003',
      type: 'decrement',
      quantity: 5,
      reason: 'Daño por manipulación',
      previousStock: 30,
      newStock: 25,
      cost: -80.00,
      status: 'completed',
      approvedBy: 'inventario@empresa.com',
      reference: 'AJ-20240519-001'
    },
    {
      id: 3,
      date: '2024-05-18 16:45:12',
      product: 'Té Especial',
      productId: 2,
      sku: 'TE-002',
      type: 'increment',
      quantity: 100,
      reason: 'Compra mayorista',
      previousStock: 100,
      newStock: 200,
      cost: 875.00,
      status: 'completed',
      approvedBy: 'admin@empresa.com',
      reference: 'AJ-20240518-001'
    },
    {
      id: 4,
      date: '2024-05-17 09:20:45',
      product: 'Jugo Natural',
      productId: 4,
      sku: 'JUG-004',
      type: 'decrement',
      quantity: 20,
      reason: 'Vencimiento',
      previousStock: 100,
      newStock: 80,
      cost: -185.00,
      status: 'pending',
      approvedBy: null,
      reference: 'AJ-20240517-001'
    }
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setAdjustments(mockAdjustments);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDateTime = (datetime) => {
    return new Date(datetime).toLocaleString('es-VE');
  };

  const formatDate = (datetime) => {
    return new Date(datetime).toLocaleDateString('es-VE');
  };

  const getStatusColor = (status) => {
    return status === 'completed' ? 'success' : 'warning';
  };

  const getStatusText = (status) => {
    return status === 'completed' ? 'Completado' : 'Pendiente';
  };

  const getTypeColor = (type) => {
    return type === 'increment' ? 'success' : 'error';
  };

  const getTypeIcon = (type) => {
    return type === 'increment' ? <TrendingUp /> : <TrendingDown />;
  };

  const getTypeText = (type) => {
    return type === 'increment' ? 'Incremento' : 'Decremento';
  };

  const calculateImpact = () => {
    const totalIncrements = adjustments
      .filter(a => a.type === 'increment' && a.status === 'completed')
      .reduce((sum, a) => sum + a.cost, 0);
    
    const totalDecrements = adjustments
      .filter(a => a.type === 'decrement' && a.status === 'completed')
      .reduce((sum, a) => sum + a.cost, 0);
    
    return { totalIncrements, totalDecrements, netImpact: totalIncrements + totalDecrements };
  };

  const impactData = calculateImpact();

  const filteredAdjustments = adjustments.filter(adj => {
    const matchesType = filters.type === 'all' || adj.type === filters.type;
    const matchesStatus = filters.status === 'all' || adj.status === filters.status;
    return matchesType && matchesStatus;
  });

  const steps = [
    'Seleccionar Producto',
    'Especificar Ajuste',
    'Revisar y Confirmar'
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setEditingAdjustment(null);
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Ajustes de Inventario
        </Typography>
        <Typography color="text.secondary">
          Gestión de entradas, salidas y correcciones de inventario
        </Typography>
      </Box>

      {/* Alertas y Notificaciones */}
      {adjustments.filter(a => a.status === 'pending').length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">
            Tienes {adjustments.filter(a => a.status === 'pending').length} ajustes pendientes de aprobación
          </Typography>
        </Alert>
      )}

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Ajustes
              </Typography>
              <Typography variant="h4">{adjustments.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Impacto Neto
              </Typography>
              <Typography 
                variant="h4" 
                color={impactData.netImpact >= 0 ? 'success.main' : 'error.main'}
              >
                {formatCurrency(impactData.netImpact)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Incrementos
              </Typography>
              <Typography variant="h4" color="success.main">
                {formatCurrency(impactData.totalIncrements)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Decrementos
              </Typography>
              <Typography variant="h4" color="error.main">
                {formatCurrency(impactData.totalDecrements)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráfico de Impacto */}
      <UBCard sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Impacto de Ajustes (Últimos 30 días)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: 'Incrementos', value: impactData.totalIncrements },
              { name: 'Decrementos', value: Math.abs(impactData.totalDecrements) },
              { name: 'Impacto Neto', value: Math.abs(impactData.netImpact) }
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [formatCurrency(value), 'Monto']} />
            <Legend />
            <Bar 
              dataKey="value" 
              fill="#8884d8"
              name="Valor Monetario"
            />
          </BarChart>
        </ResponsiveContainer>
      </UBCard>

      {/* Filtros y Controles */}
      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Tipo de Ajuste</InputLabel>
            <Select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              label="Tipo de Ajuste"
            >
              <MenuItem value="all">Todos los tipos</MenuItem>
              <MenuItem value="increment">Incrementos</MenuItem>
              <MenuItem value="decrement">Decrementos</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              label="Estado"
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="completed">Completados</MenuItem>
              <MenuItem value="pending">Pendientes</MenuItem>
            </Select>
          </FormControl>

          <TextField
            placeholder="Buscar producto..."
            InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> }}
            sx={{ minWidth: 200 }}
          />

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setEditingAdjustment(null);
              setOpenDialog(true);
              setActiveStep(0);
            }}
          >
            Nuevo Ajuste
          </Button>

          <Button variant="outlined" startIcon={<Download />}>
            Exportar
          </Button>
        </Box>
      </UBCard>

      {/* Tabla de Ajustes */}
      <UBCard>
        <Typography variant="h6" gutterBottom>
          Historial de Ajustes
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Referencia</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell align="center">Tipo</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Costo</TableCell>
                <TableCell>Razón</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAdjustments.map((adjustment) => (
                <TableRow key={adjustment.id}>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {adjustment.reference}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                        <Inventory sx={{ fontSize: 16 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2">{adjustment.product}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {adjustment.sku}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(adjustment.date)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(adjustment.date).toLocaleTimeString('es-VE', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={getTypeIcon(adjustment.type)}
                      label={getTypeText(adjustment.type)}
                      color={getTypeColor(adjustment.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      fontWeight="bold"
                      color={adjustment.type === 'increment' ? 'success.main' : 'error.main'}
                    >
                      {adjustment.type === 'increment' ? '+' : '-'}{adjustment.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      fontWeight="bold"
                      color={adjustment.cost >= 0 ? 'success.main' : 'error.main'}
                    >
                      {formatCurrency(adjustment.cost)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{adjustment.reason}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={getStatusText(adjustment.status)}
                      color={getStatusColor(adjustment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setEditingAdjustment(adjustment);
                        setOpenDialog(true);
                        setActiveStep(0);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      disabled={adjustment.status === 'completed'}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredAdjustments.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Inventory sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No hay ajustes que coincidan con los filtros
            </Typography>
          </Box>
        )}
      </UBCard>

      {/* Diálogo para nuevo/editar ajuste */}
      <Dialog open={openDialog} onClose={handleReset} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingAdjustment ? 'Editar Ajuste de Inventario' : 'Nuevo Ajuste de Inventario'}
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 2 }}>
            {steps.map((step, index) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
                <StepContent>
                  {index === 0 && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Seleccionar Producto</InputLabel>
                          <Select label="Seleccionar Producto">
                            {products.map((product) => (
                              <MenuItem key={product.id} value={product.id}>
                                {product.name} - {product.sku} (Stock: {product.currentStock})
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          startIcon={<QrCodeScanner />}
                          sx={{ mr: 1 }}
                        >
                          Escanear Código
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<QrCodeScanner />}
                        >
                          Buscar por SKU
                        </Button>
                      </Grid>
                    </Grid>
                  )}

                  {index === 1 && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Tipo de Ajuste</InputLabel>
                          <Select label="Tipo de Ajuste" defaultValue="increment">
                            <MenuItem value="increment">Incremento (+)</MenuItem>
                            <MenuItem value="decrement">Decremento (-)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Cantidad"
                          type="number"
                          InputProps={{ inputProps: { min: 1 } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Razón del Ajuste</InputLabel>
                          <Select label="Razón del Ajuste">
                            <MenuItem value="reabastecimiento">Reabastecimiento</MenuItem>
                            <MenuItem value="daño">Daño o Pérdida</MenuItem>
                            <MenuItem value="vencimiento">Vencimiento</MenuItem>
                            <MenuItem value="ajuste_fisico">Ajuste Físico</MenuItem>
                            <MenuItem value="devolucion">Devolución</MenuItem>
                            <MenuItem value="otros">Otros</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Notas Adicionales"
                          multiline
                          rows={3}
                          placeholder="Detalles adicionales sobre el ajuste..."
                        />
                      </Grid>
                    </Grid>
                  )}

                  {index === 2 && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Alert severity="info" sx={{ mb: 2 }}>
                          <Typography fontWeight="bold">
                            Resumen del Ajuste
                          </Typography>
                        </Alert>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">Producto:</Typography>
                        <Typography variant="body2">Tipo:</Typography>
                        <Typography variant="body2">Cantidad:</Typography>
                        <Typography variant="body2">Razón:</Typography>
                        <Typography variant="body2">Costo Estimado:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight="bold">Café Premium</Typography>
                        <Typography variant="body2" fontWeight="bold" color="success.main">
                          Incremento (+)
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">50 unidades</Typography>
                        <Typography variant="body2" fontWeight="bold">Reabastecimiento</Typography>
                        <Typography variant="body2" fontWeight="bold" color="success.main">
                          {formatCurrency(625.00)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Aprobar automáticamente este ajuste"
                        />
                      </Grid>
                    </Grid>
                  )}

                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={index === steps.length - 1 ? handleReset : handleNext}
                      sx={{ mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Confirmar Ajuste' : 'Continuar'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                    >
                      Atrás
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Adjustments;