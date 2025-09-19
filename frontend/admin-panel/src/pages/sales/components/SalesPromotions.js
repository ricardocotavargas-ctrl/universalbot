import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent,
  Button, TextField, FormControl, InputLabel, Select,
  MenuItem, Switch, FormControlLabel, Divider, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, IconButton
} from '@mui/material';
import {
  Add, Delete, LocalOffer, CalendarToday
} from '@mui/icons-material';

const SalesPromotions = () => {
  const [promociones, setPromociones] = useState([
    {
      id: 1,
      nombre: '2x1 en Electrónicos',
      tipo: '2x1',
      descuento: 50,
      categorias: ['Electrónicos'],
      activa: true,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31'
    }
  ]);

  const [nuevaPromocion, setNuevaPromocion] = useState({
    nombre: '',
    tipo: 'descuento',
    descuento: 0,
    categorias: [],
    activa: true,
    fechaInicio: '',
    fechaFin: ''
  });

  const agregarPromocion = () => {
    if (nuevaPromocion.nombre && nuevaPromocion.fechaInicio && nuevaPromocion.fechaFin) {
      setPromociones(prev => [...prev, { ...nuevaPromocion, id: Date.now() }]);
      setNuevaPromocion({
        nombre: '',
        tipo: 'descuento',
        descuento: 0,
        categorias: [],
        activa: true,
        fechaInicio: '',
        fechaFin: ''
      });
    }
  };

  const togglePromocion = (id) => {
    setPromociones(prev =>
      prev.map(p =>
        p.id === id ? { ...p, activa: !p.activa } : p
      )
    );
  };

  const eliminarPromocion = (id) => {
    setPromociones(prev => prev.filter(p => p.id !== id));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        <LocalOffer sx={{ mr: 2, verticalAlign: 'bottom' }} />
        Gestión de Promociones
      </Typography>

      {/* Formulario de nueva promoción */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Nueva Promoción</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre de la Promoción"
              value={nuevaPromocion.nombre}
              onChange={(e) => setNuevaPromocion(prev => ({ ...prev, nombre: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Promoción</InputLabel>
              <Select
                value={nuevaPromocion.tipo}
                onChange={(e) => setNuevaPromocion(prev => ({ ...prev, tipo: e.target.value }))}
                label="Tipo de Promoción"
              >
                <MenuItem value="descuento">Descuento %</MenuItem>
                <MenuItem value="2x1">2x1</MenuItem>
                <MenuItem value="3x2">3x2</MenuItem>
                <MenuItem value="precio_especial">Precio Especial</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {nuevaPromocion.tipo === 'descuento' && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Porcentaje de Descuento"
                value={nuevaPromocion.descuento}
                onChange={(e) => setNuevaPromocion(prev => ({ ...prev, descuento: parseInt(e.target.value) }))}
                InputProps={{ endAdornment: '%' }}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha Inicio"
              value={nuevaPromocion.fechaInicio}
              onChange={(e) => setNuevaPromocion(prev => ({ ...prev, fechaInicio: e.target.value }))}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha Fin"
              value={nuevaPromocion.fechaFin}
              onChange={(e) => setNuevaPromocion(prev => ({ ...prev, fechaFin: e.target.value }))}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={nuevaPromocion.activa}
                  onChange={(e) => setNuevaPromocion(prev => ({ ...prev, activa: e.target.checked }))}
                />
              }
              label="Promoción Activa"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={agregarPromocion}
              disabled={!nuevaPromocion.nombre || !nuevaPromocion.fechaInicio || !nuevaPromocion.fechaFin}
            >
              Agregar Promoción
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de promociones */}
      <Typography variant="h6" gutterBottom>Promociones Activas</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Descuento</TableCell>
              <TableCell>Vigencia</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promociones.map((promocion) => (
              <TableRow key={promocion.id}>
                <TableCell>
                  <Typography fontWeight="bold">{promocion.nombre}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={promocion.tipo.toUpperCase()}
                    color="primary"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {promocion.tipo === 'descuento' ? `${promocion.descuento}%` : '-'}
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                    {promocion.fechaInicio} - {promocion.fechaFin}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={promocion.activa ? 'Activa' : 'Inactiva'}
                    color={promocion.activa ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={promocion.activa}
                        onChange={() => togglePromocion(promocion.id)}
                      />
                    }
                    label=""
                  />
                  <IconButton
                    color="error"
                    onClick={() => eliminarPromocion(promocion.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesPromotions;