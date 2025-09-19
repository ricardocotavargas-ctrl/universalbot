// frontend/admin-panel/src/pages/sales/CustomerDatabase.js
import React, { useState, useMemo } from 'react';
import {
  Container, Typography, Box, TextField, Button,
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, Grid,
  InputAdornment, Avatar
} from '@mui/material';
import {
  Search, Edit, Delete, Person, Business,
  Add, Refresh
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const CustomerDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Datos de ejemplo - En producción vendría de la base de datos
  const [customers, setCustomers] = useState([
    {
      id: 1,
      tipoDocumento: 'J',
      documento: 'J-123456789',
      nombre: 'TechSolutions C.A.',
      telefono: '+58 412-555-1234',
      email: 'info@techsolutions.com',
      direccion: 'Av. Principal, Caracas',
      esEmpresa: true,
      fechaRegistro: '2024-01-15',
      comprasTotales: 12500.00
    },
    {
      id: 2,
      tipoDocumento: 'V',
      documento: 'V-12345678',
      nombre: 'Juan Pérez',
      telefono: '+58 414-555-5678',
      email: 'juan@email.com',
      direccion: 'Calle Secundaria, Valencia',
      esEmpresa: false,
      fechaRegistro: '2024-02-20',
      comprasTotales: 3450.00
    },
    {
      id: 3,
      tipoDocumento: 'G',
      documento: 'G-987654321',
      nombre: 'Ministerio de Tecnología',
      telefono: '+58 416-555-9012',
      email: 'contacto@mintel.gob.ve',
      direccion: 'Av. Bolívar, Caracas',
      esEmpresa: true,
      fechaRegistro: '2024-03-10',
      comprasTotales: 28700.00
    }
  ]);

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;
    const term = searchTerm.toLowerCase();
    return customers.filter(customer =>
      customer.documento.toLowerCase().includes(term) ||
      customer.nombre.toLowerCase().includes(term) ||
      customer.telefono.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term)
    );
  }, [customers, searchTerm]);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditDialogOpen(true);
  };

  const handleSave = (updatedCustomer) => {
    setCustomers(prev => prev.map(c => 
      c.id === updatedCustomer.id ? updatedCustomer : c
    ));
    setEditDialogOpen(false);
    setSelectedCustomer(null);
  };

  const handleDelete = (customerId) => {
    if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
      setCustomers(prev => prev.filter(c => c.id !== customerId));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Base de Datos de Clientes
        </Typography>
        <Typography color="text.secondary">
          Gestión completa de clientes registrados en el sistema
        </Typography>
      </Box>

      <UBCard>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Buscar clientes por documento, nombre, teléfono o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" startIcon={<Refresh />}>
            Actualizar
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            Nuevo Cliente
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Documento</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Registro</TableCell>
                <TableCell>Compras Totales</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>
                        {customer.esEmpresa ? <Business /> : <Person />}
                      </Avatar>
                      <Box>
                        <Typography fontWeight="medium">
                          {customer.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={customer.documento} 
                      color={customer.esEmpresa ? "primary" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography>{customer.telefono}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {customer.direccion}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {new Date(customer.fechaRegistro).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">
                      {formatCurrency(customer.comprasTotales)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(customer)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(customer.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>

      {/* Diálogo de Edición */}
      <EditCustomerDialog
        open={editDialogOpen}
        customer={selectedCustomer}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSave}
      />
    </Container>
  );
};

const EditCustomerDialog = ({ open, customer, onClose, onSave }) => {
  const [editedCustomer, setEditedCustomer] = useState(customer);

  React.useEffect(() => {
    setEditedCustomer(customer);
  }, [customer]);

  const handleSave = () => {
    onSave(editedCustomer);
  };

  if (!customer) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Cliente</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre/Razón Social"
              value={editedCustomer?.nombre || ''}
              onChange={(e) => setEditedCustomer({
                ...editedCustomer,
                nombre: e.target.value
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Documento"
              value={editedCustomer?.documento || ''}
              onChange={(e) => setEditedCustomer({
                ...editedCustomer,
                documento: e.target.value
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Teléfono"
              value={editedCustomer?.telefono || ''}
              onChange={(e) => setEditedCustomer({
                ...editedCustomer,
                telefono: e.target.value
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={editedCustomer?.email || ''}
              onChange={(e) => setEditedCustomer({
                ...editedCustomer,
                email: e.target.value
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección"
              multiline
              rows={3}
              value={editedCustomer?.direccion || ''}
              onChange={(e) => setEditedCustomer({
                ...editedCustomer,
                direccion: e.target.value
              })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerDatabase;