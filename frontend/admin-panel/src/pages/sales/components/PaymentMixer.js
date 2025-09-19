import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Grid, Paper,
  Button, Divider, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import {
  AttachMoney, CreditCard, AccountBalance,
  PointOfSale, CheckCircle, Close
} from '@mui/icons-material';

const PaymentMixer = ({ open, onClose, totalVenta, onPaymentComplete }) => {
  const [pagos, setPagos] = useState({
    efectivo: 0,
    tarjeta: 0,
    transferencia: 0,
    credito: 0,
    vales: 0
  });

  const [vuelto, setVuelto] = useState(0);

  const totalAplicado = Object.values(pagos).reduce((sum, val) => sum + val, 0);
  const faltaPagar = totalVenta - totalAplicado;
  const sobraPago = totalAplicado - totalVenta;

  useEffect(() => {
    if (pagos.efectivo > totalVenta) {
      setVuelto(pagos.efectivo - totalVenta);
    } else {
      setVuelto(0);
    }
  }, [pagos.efectivo, totalVenta]);

  const handlePagoChange = (metodo, valor) => {
    setPagos(prev => ({
      ...prev,
      [metodo]: parseFloat(valor) || 0
    }));
  };

  const handleCompletePayment = () => {
    if (totalAplicado >= totalVenta) {
      onPaymentComplete(pagos);
      onClose();
    }
  };

  const resetForm = () => {
    setPagos({
      efectivo: 0,
      tarjeta: 0,
      transferencia: 0,
      credito: 0,
      vales: 0
    });
    setVuelto(0);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <AttachMoney sx={{ mr: 1 }} />
          Pago Mixto
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Total a Pagar: {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD' }).format(totalVenta)}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Efectivo"
                type="number"
                value={pagos.efectivo}
                onChange={(e) => handlePagoChange('efectivo', e.target.value)}
                InputProps={{
                  startAdornment: <AttachMoney sx={{ mr: 1, color: 'success.main' }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tarjeta"
                type="number"
                value={pagos.tarjeta}
                onChange={(e) => handlePagoChange('tarjeta', e.target.value)}
                InputProps={{
                  startAdornment: <CreditCard sx={{ mr: 1, color: 'info.main' }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Transferencia"
                type="number"
                value={pagos.transferencia}
                onChange={(e) => handlePagoChange('transferencia', e.target.value)}
                InputProps={{
                  startAdornment: <AccountBalance sx={{ mr: 1, color: 'primary.main' }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vales/Cupones"
                type="number"
                value={pagos.vales}
                onChange={(e) => handlePagoChange('vales', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography>Total Aplicado:</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography fontWeight="bold">
                      {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD' }).format(totalAplicado)}
                    </Typography>
                  </Grid>

                  {faltaPagar > 0 && (
                    <>
                      <Grid item xs={6}>
                        <Typography color="error">Falta pagar:</Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography color="error">
                          {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD' }).format(faltaPagar)}
                        </Typography>
                      </Grid>
                    </>
                  )}

                  {vuelto > 0 && (
                    <>
                      <Grid item xs={6}>
                        <Typography color="success.main">Vuelto:</Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography color="success.main">
                          {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD' }).format(vuelto)}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              {faltaPagar > 0 && (
                <Alert severity="warning">
                  Falta aplicar {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD' }).format(faltaPagar)} en pagos
                </Alert>
              )}
              {totalAplicado >= totalVenta && (
                <Alert severity="success">
                  Pago completo - Listo para procesar
                </Alert>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { onClose(); resetForm(); }} startIcon={<Close />}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleCompletePayment}
          disabled={totalAplicado < totalVenta}
          startIcon={<CheckCircle />}
        >
          Confirmar Pago
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentMixer;