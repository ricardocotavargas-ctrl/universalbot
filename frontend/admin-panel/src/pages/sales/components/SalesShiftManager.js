import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent,
  Button, TextField, Divider, Alert, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  PointOfSale, PlayArrow, Stop, AccountBalance,
  AttachMoney, Schedule, Person
} from '@mui/icons-material';

const SalesShiftManager = () => {
  const [turnos, setTurnos] = useState([]);
  const [turnoAbierto, setTurnoAbierto] = useState(null);
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const [nuevoTurno, setNuevoTurno] = useState({
    montoInicial: 0,
    cajero: '',
    puntoVenta: 'principal'
  });

  useEffect(() => {
    // Cargar turnos desde localStorage o API
    const turnosGuardados = JSON.parse(localStorage.getItem('turnos')) || [];
    setTurnos(turnosGuardados);
    
    const turnoActivo = turnosGuardados.find(t => t.estado === 'abierto');
    setTurnoAbierto(turnoActivo);
  }, []);

  const abrirTurno = () => {
    const turno = {
      id: Date.now(),
      cajero: nuevoTurno.cajero,
      puntoVenta: nuevoTurno.puntoVenta,
      montoInicial: nuevoTurno.montoInicial,
      fechaApertura: new Date().toISOString(),
      estado: 'abierto',
      ventas: [],
      totalVentas: 0,
      totalEfectivo: 0,
      totalTarjeta: 0
    };

    const nuevosTurnos = [...turnos, turno];
    setTurnos(nuevosTurnos);
    setTurnoAbierto(turno);
    setDialogAbierto(false);
    localStorage.setItem('turnos', JSON.stringify(nuevosTurnos));
    
    setNuevoTurno({ montoInicial: 0, cajero: '', puntoVenta: 'principal' });
  };

  const cerrarTurno = () => {
    if (!turnoAbierto) return;

    const turnoActualizado = {
      ...turnoAbierto,
      estado: 'cerrado',
      fechaCierre: new Date().toISOString(),
      montoFinal: calcularMontoFinal()
    };

    const nuevosTurnos = turnos.map(t => 
      t.id === turnoAbierto.id ? turnoActualizado : t
    );

    setTurnos(nuevosTurnos);
    setTurnoAbierto(null);
    localStorage.setItem('turnos', JSON.stringify(nuevosTurnos));
  };

  const calcularMontoFinal = () => {
    // Lógica para calcular el monto final en caja
    return turnoAbierto.montoInicial + turnoAbierto.totalEfectivo;
  };

  const getEstadoColor = (estado) => {
    return estado === 'abierto' ? 'success' : 'default';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        <PointOfSale sx={{ mr: 2, verticalAlign: 'bottom' }} />
        Gestión de Turnos
      </Typography>

      {/* Estado actual */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Estado del Turno
              </Typography>
              {turnoAbierto ? (
                <>
                  <Chip 
                    label="TURNO ABIERTO" 
                    color="success" 
                    sx={{ mb: 2 }}
                  />
                  <Typography>Cajero: {turnoAbierto.cajero}</Typography>
                  <Typography>Monto Inicial: ${turnoAbierto.montoInicial}</Typography>
                  <Typography>Hora Apertura: {new Date(turnoAbierto.fechaApertura).toLocaleTimeString()}</Typography>
                </>
              ) : (
                <Typography color="textSecondary">No hay turno activo</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Acciones
              </Typography>
              {turnoAbierto ? (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Stop />}
                  onClick={cerrarTurno}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Cerrar Turno
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<PlayArrow />}
                  onClick={() => setDialogAbierto(true)}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Abrir Turno
                </Button>
              )}
              <Button variant="outlined" fullWidth>
                Ver Reporte Completo
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Estadísticas del turno actual */}
      {turnoAbierto && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Resumen del Turno</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <AttachMoney sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h5">${turnoAbierto.totalVentas}</Typography>
                <Typography color="textSecondary">Total Ventas</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <AccountBalance sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h5">${turnoAbierto.totalEfectivo}</Typography>
                <Typography color="textSecondary">Efectivo</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <PointOfSale sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h5">{turnoAbierto.ventas.length}</Typography>
                <Typography color="textSecondary">Transacciones</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <Schedule sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h5">
                  {Math.floor((new Date() - new Date(turnoAbierto.fechaApertura)) / 3600000)}h
                </Typography>
                <Typography color="textSecondary">Duración</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Historial de turnos */}
      <Typography variant="h6" gutterBottom>Historial de Turnos</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cajero</TableCell>
              <TableCell>Punto de Venta</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Monto Inicial</TableCell>
              <TableCell align="right">Total Ventas</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Duración</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {turnos.slice().reverse().map((turno) => (
              <TableRow key={turno.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Person sx={{ mr: 1, fontSize: 18 }} />
                    {turno.cajero}
                  </Box>
                </TableCell>
                <TableCell>{turno.puntoVenta}</TableCell>
                <TableCell>
                  {new Date(turno.fechaApertura).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">${turno.montoInicial}</TableCell>
                <TableCell align="right">${turno.totalVentas}</TableCell>
                <TableCell>
                  <Chip
                    label={turno.estado.toUpperCase()}
                    color={getEstadoColor(turno.estado)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {turno.fechaCierre ? 
                    `${Math.floor((new Date(turno.fechaCierre) - new Date(turno.fechaApertura)) / 3600000)}h` : 
                    'En curso'
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog abrir turno */}
      <Dialog open={dialogAbierto} onClose={() => setDialogAbierto(false)}>
        <DialogTitle>Abrir Nuevo Turno</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre del Cajero"
                value={nuevoTurno.cajero}
                onChange={(e) => setNuevoTurno(prev => ({ ...prev, cajero: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Punto de Venta</InputLabel>
                <Select
                  value={nuevoTurno.puntoVenta}
                  onChange={(e) => setNuevoTurno(prev => ({ ...prev, puntoVenta: e.target.value }))}
                  label="Punto de Venta"
                >
                  <MenuItem value="principal">Principal</MenuItem>
                  <MenuItem value="sucursal1">Sucursal 1</MenuItem>
                  <MenuItem value="sucursal2">Sucursal 2</MenuItem>
                  <MenuItem value="online">Online</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Monto Inicial en Caja"
                value={nuevoTurno.montoInicial}
                onChange={(e) => setNuevoTurno(prev => ({ ...prev, montoInicial: parseFloat(e.target.value) }))}
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogAbierto(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={abrirTurno}
            disabled={!nuevoTurno.cajero || nuevoTurno.montoInicial <= 0}
          >
            Abrir Turno
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesShiftManager;