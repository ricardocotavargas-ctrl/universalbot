import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, Paper, Typography, Box,
  Alert, Chip, Card, CardContent, IconButton
} from '@mui/material';
import {
  Add, Remove, Delete, Close, CheckCircle,
  ShoppingCart, Person
} from '@mui/icons-material';

const QuickSale = ({ open, onClose, productos, onVentaRapida }) => {
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calcularTotal();
  }, [carrito]);

  const calcularTotal = () => {
    const totalCarrito = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    setTotal(totalCarrito);
  };

  const agregarProducto = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    
    if (existe) {
      setCarrito(prev =>
        prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito(prev => [...prev, { 
        ...producto, 
        cantidad: 1,
        precio: producto.finalPrice || producto.price
      }]);
    }
    
    setBusqueda('');
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      setCarrito(prev => prev.filter(item => item.id !== id));
      return;
    }

    setCarrito(prev =>
      prev.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const productosFiltrados = productos.filter(producto =>
    (producto.name && producto.name.toLowerCase().includes(busqueda.toLowerCase())) ||
    (producto.codigo && producto.codigo.includes(busqueda))
  );

  const procesarVenta = () => {
    if (carrito.length === 0) {
      alert('Debe agregar productos a la venta');
      return;
    }

    const venta = {
      cliente: cliente || 'Consumidor Final',
      productos: carrito,
      total,
      fecha: new Date().toISOString(),
      tipo: 'venta_rapida',
      metodoPago: 'efectivo'
    };

    onVentaRapida(venta);
    setCarrito([]);
    setCliente('');
    setBusqueda('');
    onClose();
  };

  const resetForm = () => {
    setCarrito([]);
    setCliente('');
    setBusqueda('');
    setTotal(0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Dialog open={open} onClose={() => { onClose(); resetForm(); }} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ShoppingCart sx={{ mr: 1 }} />
          Venta Rápida
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Panel de Búsqueda */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>Buscar Producto</Typography>
              <TextField
                fullWidth
                placeholder="Código o nombre del producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                sx={{ mb: 2 }}
              />

              {busqueda && (
                <>
                  <Typography variant="subtitle2" gutterBottom>
                    Resultados de búsqueda
                  </Typography>
                  {productosFiltrados.length === 0 ? (
                    <Alert severity="info">No se encontraron productos</Alert>
                  ) : (
                    productosFiltrados.map((producto) => (
                      <Card 
                        key={producto.id} 
                        sx={{ mb: 1, cursor: 'pointer' }}
                        onClick={() => agregarProducto(producto)}
                      >
                        <CardContent sx={{ py: 1 }}>
                          <Typography variant="body2">{producto.name}</Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">
                              {producto.codigo}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {formatCurrency(producto.price)}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </>
              )}
            </Paper>

            {/* Información del Cliente */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Cliente</Typography>
              <TextField
                fullWidth
                placeholder="Nombre del cliente (opcional)"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Paper>
          </Grid>

          {/* Carrito de Compra */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Carrito de Compra
              </Typography>

              {carrito.length === 0 ? (
                <Alert severity="info">El carrito está vacío</Alert>
              ) : (
                <>
                  {carrito.map((item) => (
                    <Box key={item.id} sx={{ mb: 2, p: 1, border: 1, borderColor: 'grey.200', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography fontWeight="bold">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatCurrency(item.precio)} c/u
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          >
                            <Remove />
                          </IconButton>
                          <Typography sx={{ mx: 1, minWidth: 30, textAlign: 'center' }}>
                            {item.cantidad}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          >
                            <Add />
                          </IconButton>
                          <Typography sx={{ mx: 2, fontWeight: 'bold' }}>
                            {formatCurrency(item.precio * item.cantidad)}
                          </Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => actualizarCantidad(item.id, 0)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  ))}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h5" color="primary">
                      {formatCurrency(total)}
                    </Typography>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { onClose(); resetForm(); }} startIcon={<Close />}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={procesarVenta}
          disabled={carrito.length === 0}
          startIcon={<CheckCircle />}
        >
          Procesar Venta ({formatCurrency(total)})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuickSale;