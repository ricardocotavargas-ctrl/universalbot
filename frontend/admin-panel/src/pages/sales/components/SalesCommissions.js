import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Chip, Button, TextField, MenuItem
} from '@mui/material';
import {
  Person, TrendingUp, AttachMoney, CalendarToday
} from '@mui/icons-material';

const SalesCommissions = ({ ventas, vendedores }) => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [comisiones, setComisiones] = useState([]);

  useEffect(() => {
    calcularComisiones();
  }, [ventas, fechaInicio, fechaFin]);

  const calcularComisiones = () => {
    const ventasFiltradas = ventas.filter(venta => {
      if (!fechaInicio || !fechaFin) return true;
      return venta.fecha >= fechaInicio && venta.fecha <= fechaFin;
    });

    const comisionesData = vendedores.map(vendedor => {
      const ventasVendedor = ventasFiltradas.filter(v => v.vendedorId === vendedor.id);
      const totalVentas = ventasVendedor.reduce((sum, v) => sum + v.total, 0);
      const comision = totalVentas * (vendedor.porcentajeComision / 100);

      return {
        ...vendedor,
        totalVentas,
        comision,
        cantidadVentas: ventasVendedor.length
      };
    });

    setComisiones(comisionesData.sort((a, b) => b.comision - a.comision));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        <TrendingUp sx={{ mr: 2, verticalAlign: 'bottom' }} />
        Comisiones de Vendedores
      </Typography>

      {/* Filtros */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="end">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Fecha Inicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Fecha Fin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" onClick={calcularComisiones}>
              Calcular Comisiones
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Resumen General */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total en Comisiones
              </Typography>
              <Typography variant="h4" color="primary">
                ${comisiones.reduce((sum, c) => sum + c.comision, 0).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total en Ventas
              </Typography>
              <Typography variant="h4" color="success.main">
                ${comisiones.reduce((sum, c) => sum + c.totalVentas, 0).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Vendedores Activos
              </Typography>
              <Typography variant="h4">
                {comisiones.filter(c => c.cantidadVentas > 0).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabla de Comisiones */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vendedor</TableCell>
              <TableCell align="right">Ventas</TableCell>
              <TableCell align="right">Monto Ventas</TableCell>
              <TableCell align="right">% Comisión</TableCell>
              <TableCell align="right">Comisión</TableCell>
              <TableCell align="center">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comisiones.map((vendedor) => (
              <TableRow key={vendedor.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Person sx={{ mr: 1, color: 'text.secondary' }} />
                    {vendedor.nombre}
                  </Box>
                </TableCell>
                <TableCell align="right">{vendedor.cantidadVentas}</TableCell>
                <TableCell align="right">${vendedor.totalVentas.toFixed(2)}</TableCell>
                <TableCell align="right">{vendedor.porcentajeComision}%</TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold" color="primary">
                    ${vendedor.comision.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={vendedor.comision > 0 ? 'Activo' : 'Sin ventas'}
                    color={vendedor.comision > 0 ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesCommissions;