// frontend/admin-panel/src/pages/inventory/InventoryMovements.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, IconButton,
  Tabs, Tab, InputAdornment, Tooltip, Alert, LinearProgress,
  FormControlLabel, Switch, Autocomplete, Avatar
} from '@mui/material';
import {
  FilterList, Download, Add, Search, Inventory, TrendingUp,
  TrendingDown, CompareArrows, CalendarToday, Person,
  Visibility, Edit, Cancel, CheckCircle, Warning,
  ImportExport, LocalShipping, AssignmentReturned,
  Adjust, Warehouse,
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, BarChart, Bar } from 'recharts';

const InventoryMovements = () => {
  const [movements, setMovements] = useState([]);
  const [filteredMovements, setFilteredMovements] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMovement, setEditingMovement] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    product: '',
    search: ''
  });

  const movementTypes = [
    { value: 'all', label: 'Todos los tipos', icon: <FilterList /> },
    { value: 'entry', label: 'Entradas', icon: <TrendingUp color="success" /> },
    { value: 'exit', label: 'Salidas', icon: <TrendingDown color="error" /> },
    { value: 'transfer', label: 'Transferencias', icon: <CompareArrows color="info" /> },
    { value: 'adjustment', label: 'Ajustes', icon: <Adjust color="warning" /> },
    { value: 'return', label: 'Devoluciones', icon: <AssignmentReturned color="secondary" /> }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'completed', label: 'Completado', color: 'success' },
    { value: 'pending', label: 'Pendiente', color: 'warning' },
    { value: 'cancelled', label: 'Cancelado', color: 'error' },
    { value: 'in_transit', label: 'En Tránsito', color: 'info' }
  ];

  const mockProducts = [
    { id: 1, name: 'Café Premium', sku: 'CAFE-001', currentStock: 150 },
    { id: 2, name: 'Té Especial', sku: 'TE-002', currentStock: 200 },
    { id: 3, name: 'Azúcar Orgánica', sku: 'AZUC-003', currentStock: 300 },
    { id: 4, name: 'Leche de Almendras', sku: 'LECH-004', currentStock: 80 },
    { id: 5, name: 'Tazas Cerámica', sku: 'TAZ-005', currentStock: 45 }
  ];

  const mockMovements = [
    {
      id: 1,
      date: '2024-05-20 14:30:25',
      type: 'entry',
      product: 'Café Premium',
      sku: 'CAFE-001',
      quantity: 50,
      reference: 'COMPRA-12345',
      status: 'completed',
      user: 'admin@empresa.com',
      source: 'Proveedor ABC',
      destination: 'Bodega Principal',
      cost: 1250,
      notes: 'Compra mensual de café'
    },
    {
      id: 2,
      date: '2024-05-20 13:15:18',
      type: 'exit',
      product: 'Té Especial',
      sku: 'TE-002',
      quantity: -25,
      reference: 'VENTA-67890',
      status: 'completed',
      user: 'ventas@empresa.com',
      source: 'Bodega Principal',
      destination: 'Cliente XYZ',
      cost: 375,
      notes: 'Venta al por mayor'
    },
    {
      id: 3,
      date: '2024-05-19 16:45:32',
      type: 'transfer',
      product: 'Azúcar Orgánica',
      sku: 'AZUC-003',
      quantity: 100,
      reference: 'TRANSF-001',
      status: 'in_transit',
      user: 'bodega@empresa.com',
      source: 'Bodega Principal',
      destination: 'Sucursal Centro',
      cost: 0,
      notes: 'Transferencia entre sucursales'
    },
    {
      id: 4,
      date: '2024-05-19 11:20:15',
      type: 'adjustment',
      product: 'Leche de Almendras',
      sku: 'LECH-004',
      quantity: -5,
      reference: 'AJUSTE-002',
      status: 'completed',
      user: 'inventario@empresa.com',
      source: 'Bodega Principal',
      destination: 'Bodega Principal',
      cost: 0,
      notes: 'Ajuste por daño de empaques'
    },
    {
      id: 5,
      date: '2024-05-18 15:30:47',
      type: 'return',
      product: 'Tazas Cerámica',
      sku: 'TAZ-005',
      quantity: 3,
      reference: 'DEVOL-001',
      status: 'pending',
      user: 'cliente@empresa.com',
      source: 'Cliente ABC',
      destination: 'Bodega Principal',
      cost: 45,
      notes: 'Devolución por defecto de fabrica'
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setMovements(mockMovements);
      setFilteredMovements(mockMovements);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterMovements();
  }, [filters, movements]);

  const filterMovements = () => {
    let filtered = [...movements];

    if (filters.type !== 'all') {
      filtered = filtered.filter(m => m.type === filters.type);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(m => m.status === filters.status);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(m => new Date(m.date) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(m => new Date(m.date) <= new Date(filters.dateTo + ' 23:59:59'));
    }

    if (filters.product) {
      filtered = filtered.filter(m => 
        m.product.toLowerCase().includes(filters.product.toLowerCase()) ||
        m.sku.toLowerCase().includes(filters.product.toLowerCase())
      );
    }

    if (filters.search) {
      filtered = filtered.filter(m => 
        m.reference.toLowerCase().includes(filters.search.toLowerCase()) ||
        m.notes.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredMovements(filtered);
  };

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

  const getMovementTypeIcon = (type) => {
    switch (type) {
      case 'entry': return <TrendingUp color="success" />;
      case 'exit': return <TrendingDown color="error" />;
      case 'transfer': return <CompareArrows color="info" />;
      case 'adjustment': return <Adjust color="warning" />;
      case 'return': return <AssignmentReturned color="secondary" />;
      default: return <Inventory />;
    }
  };

  const getMovementTypeColor = (type) => {
    switch (type) {
      case 'entry': return 'success';
      case 'exit': return 'error';
      case 'transfer': return 'info';
      case 'adjustment': return 'warning';
      case 'return': return 'secondary';
      default: return 'default';
    }
  };

  const getMovementTypeText = (type) => {
    const types = {
      'entry': 'Entrada',
      'exit': 'Salida',
      'transfer': 'Transferencia',
      'adjustment': 'Ajuste',
      'return': 'Devolución'
    };
    return types[type] || type;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'in_transit': return 'info';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    const statuses = {
      'completed': 'Completado',
      'pending': 'Pendiente',
      'cancelled': 'Cancelado',
      'in_transit': 'En Tránsito'
    };
    return statuses[status] || status;
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      dateFrom: '',
      dateTo: '',
      product: '',
      search: ''
    });
  };

  const getMovementStats = () => {
    const stats = {
      total: filteredMovements.length,
      entries: filteredMovements.filter(m => m.type === 'entry').length,
      exits: filteredMovements.filter(m => m.type === 'exit').length,
      transfers: filteredMovements.filter(m => m.type === 'transfer').length,
      adjustments: filteredMovements.filter(m => m.type === 'adjustment').length,
      returns: filteredMovements.filter(m => m.type === 'return').length,
      totalValue: filteredMovements.reduce((sum, m) => sum + Math.abs(m.cost), 0)
    };

    return stats;
  };

  const getChartData = () => {
    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayMovements = movements.filter(m => m.date.startsWith(date));
      return {
        date,
        Entradas: dayMovements.filter(m => m.type === 'entry').reduce((sum, m) => sum + m.quantity, 0),
        Salidas: dayMovements.filter(m => m.type === 'exit').reduce((sum, m) => sum + Math.abs(m.quantity), 0),
        Transferencias: dayMovements.filter(m => m.type === 'transfer').length
      };
    });
  };

  const stats = getMovementStats();
  const chartData = getChartData();

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
            <LinearProgress sx={{ mb: 2 }} />
            <Typography>Cargando movimientos de inventario...</Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Movimientos de Inventario
        </Typography>
        <Typography color="text.secondary">
          Registro completo de todas las transacciones de inventario
        </Typography>
      </Box>

      {/* Estadísticas Rápidas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="text.secondary" gutterBottom>
                Total Movimientos
              </Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp color="success" sx={{ mb: 1 }} />
              <Typography variant="h4" color="success.main">
                {stats.entries}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Entradas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingDown color="error" sx={{ mb: 1 }} />
              <Typography variant="h4" color="error.main">
                {stats.exits}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Salidas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CompareArrows color="info" sx={{ mb: 1 }} />
              <Typography variant="h4" color="info.main">
                {stats.transfers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Transferencias
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Adjust color="warning" sx={{ mb: 1 }} />
              <Typography variant="h4" color="warning.main">
                {stats.adjustments}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ajustes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <AssignmentReturned color="secondary" sx={{ mb: 1 }} />
              <Typography variant="h4" color="secondary.main">
                {stats.returns}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Devoluciones
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros Avanzados */}
      <UBCard sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filtros Avanzados
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Movimiento</InputLabel>
              <Select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                label="Tipo de Movimiento"
              >
                {movementTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 1 }}>{type.icon}</Box>
                      {type.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                label="Estado"
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.value !== 'all' ? (
                      <Chip label={status.label} color={status.color} size="small" />
                    ) : (
                      status.label
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Desde"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Hasta"
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Autocomplete
              freeSolo
              options={mockProducts.map((product) => product.name)}
              value={filters.product}
              onChange={(e, newValue) => handleFilterChange('product', newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar Producto o SKU"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Buscar en Referencias o Notas"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={handleResetFilters} variant="outlined">
                Limpiar Filtros
              </Button>
              <Button variant="contained" startIcon={<Download />}>
                Exportar Reporte
              </Button>
              <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
                Nuevo Movimiento
              </Button>
            </Box>
          </Grid>
        </Grid>
      </UBCard>

      {/* Tabs para diferentes vistas */}
      <UBCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<Inventory />} label="Lista de Movimientos" />
            <Tab icon={<TrendingUp />} label="Análisis Gráfico" />
            <Tab icon={<Warehouse />} label="Resumen por Producto" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <>
            {filteredMovements.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Inventory sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No hay movimientos que coincidan con los filtros
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleResetFilters}>
                  Ver Todos los Movimientos
                </Button>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha/Hora</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Producto</TableCell>
                      <TableCell align="center">Cantidad</TableCell>
                      <TableCell>Referencia</TableCell>
                      <TableCell>Origen/Destino</TableCell>
                      <TableCell align="right">Valor</TableCell>
                      <TableCell align="center">Estado</TableCell>
                      <TableCell align="center">Usuario</TableCell>
                      <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">
                              {formatDate(movement.date)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(movement.date).toLocaleTimeString('es-VE', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Tooltip title={getMovementTypeText(movement.type)}>
                            <IconButton size="small">
                              {getMovementTypeIcon(movement.type)}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {movement.product}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {movement.sku}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                            color={movement.quantity > 0 ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {movement.reference}
                          </Typography>
                          {movement.notes && (
                            <Tooltip title={movement.notes}>
                              <Typography variant="caption" color="text.secondary" noWrap>
                                {movement.notes.substring(0, 30)}...
                              </Typography>
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="caption" display="block" color="text.secondary">
                              Desde: {movement.source}
                            </Typography>
                            <Typography variant="caption" display="block" color="text.secondary">
                              Hacia: {movement.destination}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {movement.cost > 0 && (
                            <Typography variant="body2" fontWeight="medium">
                              {formatCurrency(movement.cost)}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={getStatusText(movement.status)}
                            color={getStatusColor(movement.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title={movement.user}>
                            <Avatar sx={{ width: 32, height: 32, mx: 'auto', bgcolor: 'primary.main' }}>
                              {movement.user.charAt(0).toUpperCase()}
                            </Avatar>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" color="primary">
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                              <IconButton size="small" color="warning">
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            {movement.status === 'pending' && (
                              <Tooltip title="Cancelar">
                                <IconButton size="small" color="error">
                                  <Cancel />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Tendencia de Movimientos (Últimos 7 días)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Entradas" stroke="#4caf50" strokeWidth={2} />
                    <Line type="monotone" dataKey="Salidas" stroke="#f44336" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Distribución por Tipo de Movimiento
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'Entradas', value: stats.entries },
                    { name: 'Salidas', value: stats.exits },
                    { name: 'Transferencias', value: stats.transfers },
                    { name: 'Ajustes', value: stats.adjustments },
                    { name: 'Devoluciones', value: stats.returns }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen por Producto
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell align="center">Stock Actual</TableCell>
                    <TableCell align="center">Entradas</TableCell>
                    <TableCell align="center">Salidas</TableCell>
                    <TableCell align="center">Movimientos</TableCell>
                    <TableCell align="right">Valor Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockProducts.map((product) => {
                    const productMovements = filteredMovements.filter(m => m.sku === product.sku);
                    const entries = productMovements.filter(m => m.type === 'entry').reduce((sum, m) => sum + m.quantity, 0);
                    const exits = productMovements.filter(m => m.type === 'exit').reduce((sum, m) => sum + Math.abs(m.quantity), 0);
                    const totalValue = productMovements.reduce((sum, m) => sum + m.cost, 0);
                    
                    return (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={product.currentStock}
                            color={product.currentStock > 50 ? 'success' : product.currentStock > 20 ? 'warning' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography color="success.main">+{entries}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography color="error.main">-{exits}</Typography>
                        </TableCell>
                        <TableCell align="center">{productMovements.length}</TableCell>
                        <TableCell align="right">
                          {totalValue > 0 && formatCurrency(totalValue)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </UBCard>

      {/* Diálogo para nuevo movimiento */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingMovement ? 'Editar Movimiento' : 'Nuevo Movimiento de Inventario'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Movimiento</InputLabel>
                <Select label="Tipo de Movimiento" defaultValue="entry">
                  {movementTypes.filter(t => t.value !== 'all').map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 1 }}>{type.icon}</Box>
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Producto</InputLabel>
                <Select label="Producto">
                  {mockProducts.map((product) => (
                    <MenuItem key={product.id} value={product.sku}>
                      {product.name} ({product.sku})
                    </MenuItem>
                  ))}
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
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de Referencia"
                placeholder="Ej: COMPRA-001, VENTA-123"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Origen"
                placeholder="Ej: Proveedor ABC, Bodega Principal"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Destino"
                placeholder="Ej: Bodega Principal, Cliente XYZ"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Costo Unitario"
                type="number"
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select label="Estado" defaultValue="completed">
                  {statusOptions.filter(s => s.value !== 'all').map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      <Chip label={status.label} color={status.color} size="small" />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notas u Observaciones"
                multiline
                rows={3}
                placeholder="Detalles adicionales del movimiento..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Actualizar stock automáticamente"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {editingMovement ? 'Actualizar' : 'Crear'} Movimiento
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InventoryMovements;