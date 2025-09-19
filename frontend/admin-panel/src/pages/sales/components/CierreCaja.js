import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, Typography, TextField, Box,
  Paper, Divider, Alert
} from '@mui/material';
import { PointOfSale, AccountBalance, CreditCard, AttachMoney } from '@mui/icons-material';

const CierreCaja = ({ open, onClose, ventasDelDia }) => {
  const [efectivoReal, setEfectivoReal] = useState(0);
  const [comentarios, setComentarios] = useState('');

  const calcularTotales = () => {
    return {
      efectivo: ventasDelDia.filter(v => v.metodoPago === 'efectivo')
                 .reduce((sum, v) => sum + v.total, 0),
      tarjeta: ventasDelDia.filter(v => v.metodoPago === 'tarjeta')
                 .reduce((sum, v) => sum + v.total, 0),
      transferencia: ventasDelDia.filter(v => v.metodoPago === 'transferencia')
                 .reduce((sum, v) => sum + v.total, 0),
      credito: ventasDelDia.filter(v => v.metodoPago === 'credito')
                 .reduce((sum, v) => sum + v.total, 0)
    };
  };

  const totales = calcularTotales();
  const totalTeorico = totales.efectivo + totales.tarjeta + totales.transferencia;
  const diferencia = efectivoReal - totales.efectivo;

  const handleCierre = () => {
    // Guardar cierre en base de datos
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <PointOfSale sx={{ mr: 1 }} />
          Corte de Caja Diario
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Resumen de Ventas */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Resumen de Ventas</Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Box display="flex" alignItems="center">
                    <AttachMoney sx={{ mr: 1, color: 'success.main' }} />
                    <Box>
                      <Typography variant="body2">Efectivo</Typography>
                      <Typography variant="h6">${totales.efectivo.toFixed(2)}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box display="flex" alignItems="center">
                    <CreditCard sx={{ mr: 1, color: 'info.main' }} />
                    <Box>
                      <Typography variant="body2">Tarjeta</Typography>
                      <Typography variant="h6">${totales.tarjeta.toFixed(2)}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box display="flex" alignItems="center">
                    <AccountBalance sx={{ mr: 1, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2">Transferencia</Typography>
                      <Typography variant="h6">${totales.transferencia.toFixed(2)}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box display="flex" alignItems="center">
                    <AttachMoney sx={{ mr: 1, color: 'warning.main' }} />
                    <Box>
                      <Typography variant="body2">Crédito</Typography>
                      <Typography variant="h6">${totales.credito.toFixed(2)}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Arqueo de Efectivo */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Arqueo de Efectivo</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Efectivo Teórico"
                  value={totales.efectivo.toFixed(2)}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Efectivo Real"
                  type="number"
                  value={efectivoReal}
                  onChange={(e) => setEfectivoReal(parseFloat(e.target.value))}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Diferencia */}
          <Grid item xs={12}>
            <Alert 
              severity={diferencia === 0 ? 'success' : diferencia > 0 ? 'info' : 'error'}
              sx={{ fontWeight: 'bold' }}
            >
              Diferencia: ${diferencia.toFixed(2)}
              {diferencia > 0 && ' (Sobrante)'}
              {diferencia < 0 && ' (Faltante)'}
              {diferencia === 0 && ' (Perfecto!)'}
            </Alert>
          </Grid>

          {/* Comentarios */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Comentarios del cierre"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Observaciones sobre el cierre de caja..."
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          variant="contained" 
          onClick={handleCierre}
          disabled={efectivoReal === 0}
        >
          Confirmar Cierre
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CierreCaja;