import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent,
  Button, TextField, FormControl, InputLabel, Select,
  MenuItem, Chip, Divider, Alert, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
  Add, CalendarToday, Person, Inventory, CheckCircle, Cancel
} from '@mui/icons-material';

const SalesReservations = () => {
  const [reservas, setReservas] = useState([
    {
      id: 1,
      cliente: 'Juan Pérez',
      producto: 'iPhone 13 Pro',
      cantidad: 1,
      fechaReserva: '2024-01-15',
      fechaVencimiento: '2024-01-22',
      estado: 'pendiente',
      anticipo: 100
    }
  ]);

  const [nuevaReserva, setNuevaReserva] = useState({
    cliente: '',
    producto: '',
    cantidad: 1,
    fechaReserva: new Date().toISOString().split('T')[0],
    fechaVencimiento: '',
    anticipo: 0
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const crearReserva = () => {
    if (nuevaReserva.cliente && nuevaReserva.producto && nuevaReserva.fechaVencimiento) {
      setReservas(prev => [...prev, {
        ...nuevaReserva,
        id: Date.now(),
        estado: 'pendiente'
      }]);
      setNuevaReserva({
        cliente: '',
        producto: '',
        cantidad: 1,
        fechaReserva: new Date().toISOString().split('T')[0],
        fechaVencimiento: '',
        anticipo: 0
      });
      setDialogOpen(false);
    }
  };

  const cambiarEstadoReserva = (id, nuevoEstado) => {
    setReservas(prev =>
      prev.map(r =>
        r.id === id ? { ...r, estado: nuevoEstado } : r
      )
    );
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pendiente': return 'warning';
      case 'completada': return 'success';
      case 'cancelada': return 'error';
      case 'vencida': return 'default';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        <CalendarToday sx={{ mr: 2, verticalAlign: 'bottom' }} />
        Gestión de Reservas
      </Typography>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Total Reservas</Typography>
              <Typography variant="h4">{reservas.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Pendientes</Typography>
              <Typography variant="h4" color="warning.main">
                {reservas.filter(r => r.estado === 'pendiente').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Completadas</Typography>
              <Typography variant="h4" color="success.main">
                {reservas.filter(r => r.estado === 'completada').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Anticipos</Typography>
              <Typography variant="h4" color="primary">
                ${reservas.reduce((sum, r) => sum + r.anticipo, 0).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Botón nueva reserva */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setDialogOpen(true)}
        sx={{ mb: 3 }}
      >
        Nueva Reserva
      </Button>

      {/* Lista de reservas */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell>Fecha Reserva</TableCell>
              <TableCell>Fecha Vencimiento</TableCell>
              <TableCell align="right">Anticipo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservas.map((reserva) => (
              <TableRow key={reserva.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Person sx={{ mr: 1, fontSize: 18 }} />
                    {reserva.cliente}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Inventory sx={{ mr: 1, fontSize: 18 }} />
                    {reserva.producto}
                  </Box>
                </TableCell>
                <TableCell align="center">{reserva.cantidad}</TableCell>
                <TableCell>{reserva.fechaReserva}</TableCell>
                <TableCell>{reserva.fechaVencimiento}</TableCell>
                <TableCell align="right">${reserva.anticipo.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={reserva.estado.toUpperCase()}
                    color={getEstadoColor(reserva.estado)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {reserva.estado === 'pendiente' && (
                    <>
                      <Button
                        size="small"
                        color="success"
                        startIcon={<CheckCircle />}
                        onClick={() => cambiarEstadoReserva(reserva.id, 'completada')}
                        sx={{ mr: 1 }}
                      >
                        Completar
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Cancel />}
                        onClick={() => cambiarEstadoReserva(reserva.id, 'cancelada')}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog nueva reserva */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Nueva Reserva</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cliente"
                value={nuevaReserva.cliente}
                onChange={(e) => setNuevaReserva(prev => ({ ...prev, cliente: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Producto"
                value={nuevaReserva.producto}
                onChange={(e) => setNuevaReserva(prev => ({ ...prev, producto: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Cantidad"
                value={nuevaReserva.cantidad}
                onChange={(e) => setNuevaReserva(prev => ({ ...prev, cantidad: parseInt(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Fecha Vencimiento"
                value={nuevaReserva.fechaVencimiento}
                onChange={(e) => setNuevaReserva(prev => ({ ...prev, fechaVencimiento: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Anticipo"
                value={nuevaReserva.anticipo}
                onChange={(e) => setNuevaReserva(prev => ({ ...prev, anticipo: parseFloat(e.target.value) }))}
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={crearReserva}
            disabled={!nuevaReserva.cliente || !nuevaReserva.producto || !nuevaReserva.fechaVencimiento}
          >
            Crear Reserva
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesReservations;