// frontend/admin-panel/src/pages/sales/TablesManagement.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, IconButton,
  useTheme // ✅ Importar useTheme hook
} from '@mui/material';
import {
  TableRestaurant, People, Restaurant, AccessTime, Edit, Delete, Add
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const TablesManagement = () => {
  const theme = useTheme(); // ✅ Usar el hook useTheme
  const [tables, setTables] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  // Datos de ejemplo para mesas
  const mockTables = [
    { id: 1, number: 'Mesa 1', capacity: 4, status: 'available', location: 'Terraza', currentOrder: null },
    { id: 2, number: 'Mesa 2', capacity: 6, status: 'occupied', location: 'Interior', currentOrder: 'ORD-12345' },
    { id: 3, number: 'Mesa 3', capacity: 2, status: 'reserved', location: 'Terraza', currentOrder: 'RES-67890' },
    { id: 4, number: 'Mesa 4', capacity: 8, status: 'available', location: 'Salón Principal', currentOrder: null },
    { id: 5, number: 'Mesa 5', capacity: 4, status: 'cleaning', location: 'Interior', currentOrder: null }
  ];

  useEffect(() => {
    setTables(mockTables);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'occupied': return 'error';
      case 'reserved': return 'warning';
      case 'cleaning': return 'info';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'occupied': return 'Ocupada';
      case 'reserved': return 'Reservada';
      case 'cleaning': return 'Limpieza';
      default: return 'Desconocido';
    }
  };

  const getLocationColor = (location) => {
    switch (location) {
      case 'Terraza': return 'primary';
      case 'Interior': return 'secondary';
      case 'Salón Principal': return 'success';
      default: return 'default';
    }
  };

  const handleEditTable = (table) => {
    setEditingTable(table);
    setOpenDialog(true);
  };

  const handleDeleteTable = (tableId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta mesa?')) {
      setTables(tables.filter(table => table.id !== tableId));
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Mesas
        </Typography>
        <Typography color="text.secondary">
          Administra la disposición y estado de las mesas del restaurante
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Mesas
              </Typography>
              <Typography variant="h4">{tables.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Disponibles
              </Typography>
              <Typography variant="h4" color="success.main">
                {tables.filter(t => t.status === 'available').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Ocupadas
              </Typography>
              <Typography variant="h4" color="error.main">
                {tables.filter(t => t.status === 'occupied').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Capacidad Total
              </Typography>
              <Typography variant="h4">
                {tables.reduce((sum, table) => sum + table.capacity, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Estado</InputLabel>
            <Select label="Estado">
              <MenuItem value="all">Todos los estados</MenuItem>
              <MenuItem value="available">Disponible</MenuItem>
              <MenuItem value="occupied">Ocupada</MenuItem>
              <MenuItem value="reserved">Reservada</MenuItem>
              <MenuItem value="cleaning">Limpieza</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Ubicación</InputLabel>
            <Select label="Ubicación">
              <MenuItem value="all">Todas las ubicaciones</MenuItem>
              <MenuItem value="Terraza">Terraza</MenuItem>
              <MenuItem value="Interior">Interior</MenuItem>
              <MenuItem value="Salón Principal">Salón Principal</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Nueva Mesa
          </Button>
        </Box>
      </UBCard>

      <Grid container spacing={3}>
        {tables.map((table) => (
          <Grid item xs={12} md={6} lg={4} key={table.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6">{table.number}</Typography>
                    <Chip
                      label={getStatusText(table.status)}
                      color={getStatusColor(table.status)}
                      size="small"
                    />
                  </Box>
                  <Chip
                    label={table.location}
                    color={getLocationColor(table.location)}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <People sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 1 }} />
                    Capacidad: {table.capacity} personas
                  </Typography>
                  
                  {table.currentOrder && (
                    <Typography variant="body2" color="text.secondary">
                      <Restaurant sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 1 }} />
                      Orden: {table.currentOrder}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => handleEditTable(table)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteTable(table.id)}
                  >
                    Eliminar
                  </Button>
                  {table.status === 'available' && (
                    <Button size="small" variant="contained">
                      Ocupar Mesa
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Diálogo para editar/crear mesa */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTable ? 'Editar Mesa' : 'Nueva Mesa'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número de Mesa"
                defaultValue={editingTable?.number}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Capacidad"
                type="number"
                defaultValue={editingTable?.capacity || 4}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Ubicación</InputLabel>
                <Select
                  label="Ubicación"
                  defaultValue={editingTable?.location || 'Interior'}
                >
                  <MenuItem value="Terraza">Terraza</MenuItem>
                  <MenuItem value="Interior">Interior</MenuItem>
                  <MenuItem value="Salón Principal">Salón Principal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  label="Estado"
                  defaultValue={editingTable?.status || 'available'}
                >
                  <MenuItem value="available">Disponible</MenuItem>
                  <MenuItem value="occupied">Ocupada</MenuItem>
                  <MenuItem value="reserved">Reservada</MenuItem>
                  <MenuItem value="cleaning">Limpieza</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {editingTable ? 'Actualizar' : 'Crear'} Mesa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mapa de mesas (visualización alternativa) */}
      <UBCard sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Mapa de Mesas
        </Typography>
        <Box sx={{ 
          p: 3, 
          bgcolor: 'grey.100', 
          borderRadius: 2,
          minHeight: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography color="text.secondary">
            Visualización del diseño del restaurante con mesas aquí...
          </Typography>
        </Box>
      </UBCard>
    </Container>
  );
};

export default TablesManagement;