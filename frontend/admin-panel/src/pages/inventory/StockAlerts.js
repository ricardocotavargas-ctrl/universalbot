import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Alert
} from '@mui/material';
import {
  Warning, Inventory, Add, NotificationImportant
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const StockAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  const mockAlerts = [
    { id: 1, product: 'Pastel Chocolate', sku: 'PAS-003', currentStock: 5, minStock: 10, daysOutOfStock: 2, urgency: 'high' },
    { id: 2, product: 'Jugo Natural', sku: 'JUG-004', currentStock: 15, minStock: 20, daysOutOfStock: 0, urgency: 'medium' },
    { id: 3, product: 'Té Verde', sku: 'TE-005', currentStock: 0, minStock: 15, daysOutOfStock: 5, urgency: 'critical' },
    { id: 4, product: 'Café Molido', sku: 'CAFE-006', currentStock: 8, minStock: 25, daysOutOfStock: 0, urgency: 'high' }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
  }, []);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'critical': return 'Crítico';
      case 'high': return 'Alto';
      case 'medium': return 'Medio';
      default: return 'Bajo';
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Alertas de Stock
        </Typography>
        <Typography color="text.secondary">
          Monitorea los productos que necesitan atención
        </Typography>
      </Box>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography fontWeight="bold">
          Tienes {alerts.length} productos que necesitan atención
        </Typography>
      </Alert>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Warning color="error" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Críticos</Typography>
              </Box>
              <Typography variant="h4" color="error.main">
                {alerts.filter(a => a.urgency === 'critical').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Warning color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Alto</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {alerts.filter(a => a.urgency === 'high').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Warning color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Medio</Typography>
              </Box>
              <Typography variant="h4" color="info.main">
                {alerts.filter(a => a.urgency === 'medium').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Inventory color="success" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total</Typography>
              </Box>
              <Typography variant="h4">
                {alerts.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Productos con Alertas
          </Typography>
          <Button variant="outlined" startIcon={<NotificationImportant />}>
            Configurar Alertas
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell align="right">Stock Actual</TableCell>
                <TableCell align="right">Stock Mínimo</TableCell>
                <TableCell align="center">Días Sin Stock</TableCell>
                <TableCell align="center">Urgencia</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id} sx={{ 
                  bgcolor: alert.urgency === 'critical' ? 'error.light' : 'transparent',
                  '&:hover': { bgcolor: alert.urgency === 'critical' ? 'error.light' : 'action.hover' }
                }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Inventory sx={{ mr: 1, color: 'primary.main' }} />
                      {alert.product}
                    </Box>
                  </TableCell>
                  <TableCell>{alert.sku}</TableCell>
                  <TableCell align="right">
                    <Typography 
                      color={alert.currentStock === 0 ? 'error.main' : 'warning.main'}
                      fontWeight="bold"
                    >
                      {alert.currentStock}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{alert.minStock}</TableCell>
                  <TableCell align="center">
                    {alert.daysOutOfStock > 0 && (
                      <Chip
                        label={`${alert.daysOutOfStock} días`}
                        color="error"
                        size="small"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={getUrgencyText(alert.urgency)}
                      color={getUrgencyColor(alert.urgency)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" size="small" startIcon={<Add />}>
                      Reabastecer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>

      {alerts.filter(a => a.urgency === 'critical').length > 0 && (
        <Alert severity="error" sx={{ mt: 3 }}>
          <Typography fontWeight="bold">
            Atención: Tienes {alerts.filter(a => a.urgency === 'critical').length} productos críticos sin stock
          </Typography>
          <Typography variant="body2">
            Se recomienda reabastecer inmediatamente para evitar pérdidas de ventas.
          </Typography>
        </Alert>
      )}
    </Container>
  );
};

export default StockAlerts;