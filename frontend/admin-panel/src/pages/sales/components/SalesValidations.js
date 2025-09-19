import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent,
  Button, TextField, Alert, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Chip, Switch, FormControlLabel, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
  Security, Warning, CheckCircle, Cancel,
  PriceCheck, Inventory
} from '@mui/icons-material';

const SalesValidations = () => {
  const [reglas, setReglas] = useState([
    {
      id: 1,
      nombre: 'Límite de Descuento',
      tipo: 'descuento',
      valor: 20,
      activa: true,
      descripcion: 'Máximo 20% de descuento por venta'
    },
    {
      id: 2,
      nombre: 'Precio Mínimo',
      tipo: 'precio_minimo',
      valor: 10,
      activa: true,
      descripcion: 'No vender por debajo del costo + 10%'
    },
    {
      id: 3,
      nombre: 'Stock Mínimo',
      tipo: 'stock_minimo',
      valor: 5,
      activa: true,
      descripcion: 'Alertar cuando stock sea menor a 5 unidades'
    }
  ]);

  const [alertas, setAlertas] = useState([
    {
      id: 1,
      tipo: 'descuento',
      mensaje: 'Descuento aplicado del 25% - Requiere autorización',
      fecha: '2024-01-15 14:30',
      leida: false
    },
    {
      id: 2,
      tipo: 'stock',
      mensaje: 'Producto "iPhone 13" con stock bajo (3 unidades)',
      fecha: '2024-01-15 12:15',
      leida: false
    }
  ]);

  const toggleRegla = (id) => {
    setReglas(prev =>
      prev.map(regla =>
        regla.id === id ? { ...regla, activa: !regla.activa } : regla
      )
    );
  };

  const marcarAlertaLeida = (id) => {
    setAlertas(prev =>
      prev.map(alerta =>
        alerta.id === id ? { ...alerta, leida: true } : alerta
      )
    );
  };

  const getIconoPorTipo = (tipo) => {
    switch (tipo) {
      case 'descuento': return <PriceCheck />;
      case 'stock': return <Inventory />;
      case 'precio_minimo': return <Warning />;
      default: return <Security />;
    }
  };

  const getColorPorTipo = (tipo) => {
    switch (tipo) {
      case 'descuento': return 'warning';
      case 'stock': return 'error';
      case 'precio_minimo': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        <Security sx={{ mr: 2, verticalAlign: 'bottom' }} />
        Validaciones y Controles
      </Typography>

      <Grid container spacing={3}>
        {/* Reglas de Validación */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Reglas de Validación</Typography>
          {reglas.map((regla) => (
            <Card key={regla.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography fontWeight="bold">{regla.nombre}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {regla.descripcion}
                    </Typography>
                    <Typography variant="body2">
                      Valor: {regla.valor}{regla.tipo === 'descuento' ? '%' : ''}
                    </Typography>
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={regla.activa}
                        onChange={() => toggleRegla(regla.id)}
                      />
                    }
                    label="Activa"
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Alertas y Notificaciones */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Alertas Recientes</Typography>
          {alertas.length === 0 ? (
            <Alert severity="info">No hay alertas recientes</Alert>
          ) : (
            alertas.map((alerta) => (
              <Card 
                key={alerta.id} 
                sx={{ 
                  mb: 2, 
                  borderLeft: 4,
                  borderColor: getColorPorTipo(alerta.tipo),
                  opacity: alerta.leida ? 0.6 : 1
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="flex-start">
                    <Box sx={{ mr: 2, color: `${getColorPorTipo(alerta.tipo)}.main` }}>
                      {getIconoPorTipo(alerta.tipo)}
                    </Box>
                    <Box flex={1}>
                      <Typography variant="body2" color="textSecondary">
                        {alerta.fecha}
                      </Typography>
                      <Typography>{alerta.mensaje}</Typography>
                    </Box>
                    {!alerta.leida && (
                      <Button
                        size="small"
                        onClick={() => marcarAlertaLeida(alerta.id)}
                      >
                        Marcar como leída
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>

      {/* Estadísticas de Validaciones */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Estadísticas de Validaciones</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <Warning sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h5">12</Typography>
              <Typography color="textSecondary">Descuentos Aplicados</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <Cancel sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h5">3</Typography>
              <Typography color="textSecondary">Validaciones Rechazadas</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h5">89%</Typography>
              <Typography color="textSecondary">Ventas Validadas</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <Inventory sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h5">7</Typography>
              <Typography color="textSecondary">Alertas de Stock</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Configuración Avanzada */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Configuración Avanzada</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Límite de Descuento Máximo (%)"
              type="number"
              defaultValue="20"
              InputProps={{ endAdornment: '%' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Stock Mínimo de Alerta"
              type="number"
              defaultValue="5"
              InputProps={{ endAdornment: 'unidades' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained">
              Guardar Configuración
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SalesValidations;