// frontend/admin-panel/src/pages/sales/CustomerDatabase.js
import React, { useState, useEffect, useMemo } from 'react';
import {
  Container, Typography, Box, TextField, Button,
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, Grid,
  InputAdornment, Avatar, Alert, Snackbar
} from '@mui/material';
import {
  Search, Edit, Delete, Person, Business,
  Add, Refresh, Email, Phone, LocationOn
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import UBCard from '../../components/ui/UBCard';

const CustomerDatabase = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // ✅ CARGAR CLIENTES REALES DESDE MONGODB
  const loadCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/sales/all-clients');
      
      if (response.data.success) {
        setCustomers(response.data.clients);
      } else {
        throw new Error(response.data.message || 'Error al cargar clientes');
      }
    } catch (error) {
      console.error('Error cargando clientes:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error al cargar clientes: ' + error.message, 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // ✅ FILTRADO DE CLIENTES
  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;
    const term = searchTerm.toLowerCase();
    return customers.filter(customer =>
      customer.name?.toLowerCase().includes(term) ||
      customer.rif?.toLowerCase().includes(term) ||
      customer.phone?.toLowerCase().includes(term) ||
      customer.email?.toLowerCase().includes(term)
    );
  }, [customers, searchTerm]);

  // ✅ FORMATEO DE MONEDA
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  // ✅ FORMATEO DE FECHA
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-VE');
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Base de Datos de Clientes
        </Typography>
        <Typography color="text.secondary">
          Gestión completa de clientes registrados en el sistema - DATOS REALES
        </Typography>
      </Box>

      <UBCard>
        {/* BARRA DE BÚSQUEDA Y ACCIONES */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            fullWidth
            placeholder="Buscar clientes por nombre, RIF, teléfono o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          <Button 
            variant="outlined" 
            startIcon={<Refresh />}
            onClick={loadCustomers}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Actualizar'}
          </Button>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            {filteredCustomers.length} clientes encontrados
          </Typography>
        </Box>

        {/* TABLA DE CLIENTES */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>RIF/Identificación</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Fecha Registro</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {customer.name?.charAt(0) || 'C'}
                      </Avatar>
                      <Box>
                        <Typography fontWeight="medium">
                          {customer.name || 'Nombre no disponible'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {customer.email || 'Sin email'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">
                        <Phone sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                        {customer.phone || 'Sin teléfono'}
                      </Typography>
                      {customer.address && (
                        <Typography variant="body2" color="text.secondary">
                          <LocationOn sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                          {customer.address}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={customer.rif || 'N/A'} 
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={customer.type || 'regular'} 
                      color={customer.type === 'premium' ? 'warning' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {formatDate(customer.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={customer.status === 'active' ? 'ACTIVO' : 'INACTIVO'} 
                      color={customer.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredCustomers.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Person sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography color="text.secondary">
              {searchTerm ? 'No se encontraron clientes con los criterios de búsqueda' : 'No hay clientes registrados'}
            </Typography>
          </Box>
        )}

        {loading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography>Cargando clientes...</Typography>
          </Box>
        )}
      </UBCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomerDatabase;
