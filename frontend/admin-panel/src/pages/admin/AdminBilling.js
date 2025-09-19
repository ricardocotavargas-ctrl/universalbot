import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  Receipt, AttachMoney, CreditCard, History, Download,
  Add, Payment, Warning
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const AdminBilling = () => {
  const [invoices, setInvoices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const mockInvoices = [
    { id: 'INV-2024-001', business: 'Cafetería Central', amount: 299, dueDate: '2024-06-15', status: 'paid', plan: 'Professional' },
    { id: 'INV-2024-002', business: 'Restaurante El Buen Sabor', amount: 199, dueDate: '2024-06-10', status: 'pending', plan: 'Business' },
    { id: 'INV-2024-003', business: 'Panadería Dulce', amount: 99, dueDate: '2024-06-05', status: 'overdue', plan: 'Basic' },
    { id: 'INV-2024-004', business: 'Café Premium', amount: 499, dueDate: '2024-07-01', status: 'pending', plan: 'Enterprise' }
  ];

  useEffect(() => {
    setInvoices(mockInvoices);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-VE');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Pagada';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencida';
      default: return 'Desconocido';
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Facturación
        </Typography>
        <Typography color="text.secondary">
          Administra las facturas y pagos de todos los negocios
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Facturado
              </Typography>
              <Typography variant="h4">
                {formatCurrency(invoices.reduce((sum, inv) => sum + inv.amount, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pendiente de Pago
              </Typography>
              <Typography variant="h4" color="warning.main">
                {formatCurrency(invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Facturas Vencidas
              </Typography>
              <Typography variant="h4" color="error.main">
                {formatCurrency(invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Facturas
              </Typography>
              <Typography variant="h4">
                {invoices.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Estado</InputLabel>
            <Select label="Estado">
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="paid">Pagadas</MenuItem>
              <MenuItem value="pending">Pendientes</MenuItem>
              <MenuItem value="overdue">Vencidas</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Fecha desde"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />
          
          <TextField
            label="Fecha hasta"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />
          
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
            Nueva Factura
          </Button>
          
          <Button variant="outlined" startIcon={<Download />}>
            Exportar Reporte
          </Button>
        </Box>
      </UBCard>

      <UBCard>
        <Typography variant="h6" gutterBottom>
          Historial de Facturas
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Factura ID</TableCell>
                <TableCell>Negocio</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell>Fecha Vencimiento</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Typography fontWeight="medium">{invoice.id}</Typography>
                  </TableCell>
                  <TableCell>{invoice.business}</TableCell>
                  <TableCell>
                    <Chip label={invoice.plan} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="right">{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={getStatusText(invoice.status)}
                      color={getStatusColor(invoice.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button size="small" variant="outlined" startIcon={<Receipt />}>
                      Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>

      {/* Diálogo para nueva factura */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Crear Nueva Factura</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Negocio</InputLabel>
                <Select label="Negocio">
                  <MenuItem value="cafeteria">Cafetería Central</MenuItem>
                  <MenuItem value="restaurante">Restaurante El Buen Sabor</MenuItem>
                  <MenuItem value="panaderia">Panadería Dulce</MenuItem>
                  <MenuItem value="cafe">Café Premium</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Plan</InputLabel>
                <Select label="Plan">
                  <MenuItem value="basic">Basic ($99)</MenuItem>
                  <MenuItem value="business">Business ($199)</MenuItem>
                  <MenuItem value="professional">Professional ($299)</MenuItem>
                  <MenuItem value="enterprise">Enterprise ($499)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Monto"
                type="number"
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha de Vencimiento"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={2}
                placeholder="Descripción de los servicios facturados..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Crear Factura
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminBilling;