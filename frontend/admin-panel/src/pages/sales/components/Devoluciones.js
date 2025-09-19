import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, Typography, TextField, Box,
  Paper, Divider, Alert, FormControl, InputLabel,
  Select, MenuItem, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton
} from '@mui/material';
import {
  Add, Remove, Delete, AssignmentReturn
} from '@mui/icons-material';

const Devoluciones = ({ open, onClose, venta }) => {
  const [productosDevolucion, setProductosDevolucion] = useState([]);
  const [motivo, setMotivo] = useState('');
  const [tipoDevolucion, setTipoDevolucion] = useState('devolucion');

  const agregarProductoDevolucion = (producto) => {
    const existente = productosDevolucion.find(p => p.id === producto.id);
    if (!existente) {
      setProductosDevolucion(prev => [...prev, { ...producto, cantidad: 1 }]);
    }
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      setProductosDevolucion(prev => prev.filter(p => p.id !== productoId));
      return;
    }

    setProductosDevolucion(prev =>
      prev.map(p =>
        p.id === productoId ? { ...p, cantidad: Math.min(nuevaCantidad, p.cantidad) } : p
      )
    );
  };

  const totalDevolucion = productosDevolucion.reduce(
    (sum, p) => sum + (p.precio * p.cantidad), 0
  );

  const procesarDevolucion = () => {
    // Lógica para procesar la devolución
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <AssignmentReturn sx={{ mr: 1 }} />
          Devolución de Venta #{venta?.numero}
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Información de la venta */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="subtitle2">Cliente: {venta?.cliente?.nombre}</Typography>
              <Typography variant="body2">Fecha: {venta?.fecha}</Typography>
              <Typography variant="body2">Total: ${venta?.total?.toFixed(2)}</Typography>
            </Paper>
          </Grid>

          {/* Productos de la venta */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Productos Vendidos</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {venta?.productos?.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell align="right">{producto.cantidad}</TableCell>
                      <TableCell align="right">${producto.precio.toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          onClick={() => agregarProductoDevolucion(producto)}
                          disabled={productosDevolucion.some(p => p.id === producto.id)}
                        >
                          Agregar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Productos en devolución */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Productos a Devolver</Typography>
            {productosDevolucion.length === 0 ? (
              <Alert severity="info">No hay productos seleccionados para devolución</Alert>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">Precio</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="center">Acción</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productosDevolucion.map((producto) => (
                      <TableRow key={producto.id}>
                        <TableCell>{producto.nombre}</TableCell>
                        <TableCell align="right">
                          <Box display="flex" alignItems="center" justifyContent="end">
                            <IconButton
                              size="small"
                              onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}
                            >
                              <Remove />
                            </IconButton>
                            <Typography sx={{ mx: 1 }}>{producto.cantidad}</Typography>
                            <IconButton
                              size="small"
                              onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}
                            >
                              <Add />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="right">${producto.precio.toFixed(2)}</TableCell>
                        <TableCell align="right">
                          ${(producto.precio * producto.cantidad).toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => actualizarCantidad(producto.id, 0)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>

          {/* Opciones de devolución */}
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Devolución</InputLabel>
              <Select
                value={tipoDevolucion}
                onChange={(e) => setTipoDevolucion(e.target.value)}
                label="Tipo de Devolución"
              >
                <MenuItem value="devolucion">Devolución Total</MenuItem>
                <MenuItem value="garantia">Garantía</MenuItem>
                <MenuItem value="cambio">Cambio por Producto</MenuItem>
                <MenuItem value="nota_credito">Nota de Crédito</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Motivo de la Devolución"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Describa el motivo de la devolución..."
            />
          </Grid>

          {/* Resumen */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
              <Typography variant="h6" align="center">
                Total a Devolver: ${totalDevolucion.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={procesarDevolucion}
          disabled={productosDevolucion.length === 0 || !motivo}
          color={tipoDevolucion === 'garantia' ? 'warning' : 'primary'}
        >
          Procesar Devolución
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Devoluciones;