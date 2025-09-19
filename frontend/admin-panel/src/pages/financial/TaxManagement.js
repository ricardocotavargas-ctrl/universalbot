import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Alert
} from '@mui/material';
import {
  AccountBalance, Receipt, Warning, CalendarToday, Paid
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const TaxManagement = () => {
  const [taxes, setTaxes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const mockTaxes = [
    { id: 1, type: 'IVA', period: 'Abril 2024', amount: 12500, dueDate: '2024-05-15', status: 'paid', reference: 'IVA-042024' },
    { id: 2, type: 'ISLR', period: 'Trimestre 1 2024', amount: 18700, dueDate: '2024-04-30', status: 'paid', reference: 'ISLR-Q1-2024' },
    { id: 3, type: 'IVA', period: 'Mayo 2024', amount: 13200, dueDate: '2024-06-15', status: 'pending', reference: 'IVA-052024' },
    { id: 4, type: 'Municipal', period: 'Semestre 1 2024', amount: 5600, dueDate: '2024-06-30', status: 'pending', reference: 'MUN-S1-2024' }
  ];

  useEffect(() => {
    setTaxes(mockTaxes);
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
    return status === 'paid' ? 'success' : 'warning';
  };

  const getStatusText = (status) => {
    return status === 'paid' ? 'Pagado' : 'Pendiente';
  };

  const getUpcomingPayments = () => {
    const today = new Date();
    return taxes.filter(tax => tax.status === 'pending' && new Date(tax.dueDate) > today);
  };

  const getOverduePayments = () => {
    const today = new Date();
    return taxes.filter(tax => tax.status === 'pending' && new Date(tax.dueDate) <= today);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Impuestos
        </Typography>
        <Typography color="text.secondary">
          Administra y controla tus obligaciones tributarias
        </Typography>
      </Box>

      {/* Alertas */}
      {getOverduePayments().length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">
            Tienes {getOverduePayments().length} impuestos vencidos
          </Typography>
        </Alert>
      )}

      {getUpcomingPayments().length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">
            Tienes {getUpcomingPayments().length} impuestos por pagar pronto
          </Typography>
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Impuestos
              </Typography>
              <Typography variant="h4">{taxes.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pagados
              </Typography>
              <Typography variant="h4" color="success.main">
                {taxes.filter(t => t.status === 'paid').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pendientes
              </Typography>
              <Typography variant="h4" color="warning.main">
                {taxes.filter(t => t.status === 'pending').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Monto Total
              </Typography>
              <Typography variant="h4">
                {formatCurrency(taxes.reduce((sum, t) => sum + t.amount, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Tipo de Impuesto</InputLabel>
            <Select label="Tipo de Impuesto">
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="IVA">IVA</MenuItem>
              <MenuItem value="ISLR">ISLR</MenuItem>
              <MenuItem value="Municipal">Municipal</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Estado</InputLabel>
            <Select label="Estado">
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="paid">Pagados</MenuItem>
              <MenuItem value="pending">Pendientes</MenuItem>
            </Select>
          </FormControl>
          
          <Button variant="contained" startIcon={<Receipt />} onClick={() => setOpenDialog(true)}>
            Nuevo Impuesto
          </Button>
          
          <Button variant="outlined" startIcon={<AccountBalance />}>
            Reporte Fiscal
          </Button>
        </Box>
      </UBCard>

      <UBCard>
        <Typography variant="h6" gutterBottom>
          Registro de Impuestos
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tipo</TableCell>
                <TableCell>Período</TableCell>
                <TableCell>Referencia</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell>Fecha Vencimiento</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taxes.map((tax) => {
                const isOverdue = tax.status === 'pending' && new Date(tax.dueDate) <= new Date();
                
                return (
                  <TableRow key={tax.id} sx={{ 
                    bgcolor: isOverdue ? 'error.light' : 'transparent',
                    '&:hover': { bgcolor: isOverdue ? 'error.light' : 'action.hover' }
                  }}>
                    <TableCell>
                      <Chip label={tax.type} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{tax.period}</TableCell>
                    <TableCell>{tax.reference}</TableCell>
                    <TableCell align="right">{formatCurrency(tax.amount)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                        {formatDate(tax.dueDate)}
                        {isOverdue && <Warning sx={{ ml: 1, color: 'error.main', fontSize: 16 }} />}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getStatusText(tax.status)}
                        color={getStatusColor(tax.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button 
                        size="small" 
                        variant="outlined"
                        disabled={tax.status === 'paid'}
                      >
                        {tax.status === 'paid' ? 'Pagado' : 'Registrar Pago'}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>

      {/* Resumen de Pagos */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Próximos Vencimientos
              </Typography>
              {getUpcomingPayments().length > 0 ? (
                getUpcomingPayments().map((tax) => (
                  <Box key={tax.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, p: 1, bgcolor: 'warning.light', borderRadius: 1 }}>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">{tax.type}</Typography>
                      <Typography variant="body2">{tax.period}</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="body2" fontWeight="bold">{formatCurrency(tax.amount)}</Typography>
                      <Typography variant="body2">{formatDate(tax.dueDate)}</Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No hay pagos próximos
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="error.main">
                Impuestos Vencidos
              </Typography>
              {getOverduePayments().length > 0 ? (
                getOverduePayments().map((tax) => (
                  <Box key={tax.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, p: 1, bgcolor: 'error.light', borderRadius: 1 }}>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">{tax.type}</Typography>
                      <Typography variant="body2">{tax.period}</Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography variant="body2" fontWeight="bold">{formatCurrency(tax.amount)}</Typography>
                      <Typography variant="body2" color="error.main">{formatDate(tax.dueDate)}</Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No hay impuestos vencidos
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Diálogo para nuevo impuesto */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Registrar Nuevo Impuesto</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Impuesto</InputLabel>
                <Select label="Tipo de Impuesto">
                  <MenuItem value="IVA">IVA</MenuItem>
                  <MenuItem value="ISLR">ISLR</MenuItem>
                  <MenuItem value="Municipal">Municipal</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Período Fiscal" />
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
              <TextField fullWidth label="Número de Referencia" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={2}
                placeholder="Detalles adicionales del impuesto..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Registrar Impuesto
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaxManagement;