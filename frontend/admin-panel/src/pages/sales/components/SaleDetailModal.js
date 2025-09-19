// frontend/admin-panel/src/pages/sales/components/SaleDetailModal.js
import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Typography, Chip, Divider, Grid, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper
} from '@mui/material';
import {
  Receipt, Person, Business, CalendarToday,
  AttachMoney, LocalShipping, Payment
} from '@mui/icons-material';

const SaleDetailModal = ({ open, sale, onClose }) => {
  if (!sale) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-VE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completada': return 'success';
      case 'pendiente': return 'warning';
      case 'cancelada': return 'error';
      default: return 'default';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Receipt color="primary" />
          <Box>
            <Typography variant="h6">Detalle de Venta</Typography>
            <Typography variant="body2" color="text.secondary">
              {sale.documentNumber}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Información General */}
          <Grid item xs={12}>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Fecha y Hora
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(sale.fecha)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Estado
                  </Typography>
                  <Chip
                    label={sale.estado}
                    color={getStatusColor(sale.estado)}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Información del Cliente */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Información del Cliente
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              {sale.cliente.documento.startsWith('J') || sale.cliente.documento.startsWith('G') ? (
                <Business color="primary" />
              ) : (
                <Person color="primary" />
              )}
              <Box>
                <Typography fontWeight="medium">{sale.cliente.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {sale.cliente.documento}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Información de Pago */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Información de Pago
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Payment sx={{ fontSize: 20, color: 'text.secondary' }} />
                <Typography>Método: {sale.metodoPago}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShipping sx={{ fontSize: 20, color: 'text.secondary' }} />
                <Typography>Canal: {sale.canalVenta}</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Productos */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Productos ({sale.productos.length})
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio Unit.</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sale.productos.map((producto, index) => (
                    <TableRow key={index}>
                      <TableCell>{producto.name}</TableCell>
                      <TableCell align="right">{producto.cantidad}</TableCell>
                      <TableCell align="right">{formatCurrency(producto.price)}</TableCell>
                      <TableCell align="right">{formatCurrency(producto.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Resumen */}
          <Grid item xs={12}>
            <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography>Subtotal:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Typography>{formatCurrency(sale.subtotal)}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Impuestos:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Typography>{formatCurrency(sale.impuestos)}</Typography>
                </Grid>

                {sale.descuentos > 0 && (
                  <>
                    <Grid item xs={6}>
                      <Typography>Descuentos:</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      <Typography color="error">
                        -{formatCurrency(sale.descuentos)}
                      </Typography>
                    </Grid>
                  </>
                )}

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h6">Total:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Typography variant="h6" color="primary">
                    {formatCurrency(sale.total)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
        <Button variant="contained" onClick={() => window.print()}>
          Imprimir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaleDetailModal;