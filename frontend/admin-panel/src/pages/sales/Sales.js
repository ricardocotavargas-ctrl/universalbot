// frontend/admin-panel/src/pages/sales/Sales.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip,
  IconButton, Button, TextField, InputAdornment, Dialog,
  DialogTitle, DialogContent, DialogActions, Grid,
  MenuItem, Select, FormControl, InputLabel, Alert,
  CircularProgress
} from '@mui/material';
import {
  Search, Visibility, Print, Download, FilterList,
  Receipt, CalendarToday, Person, Business
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import UBCard from '../../components/ui/UBCard';
import SaleDetailModal from './components/SaleDetailModal';

const Sales = () => {
  const { user } = useAuth();
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSale, setSelectedSale] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ CARGAR VENTAS REALES DESDE MONGODB
  const loadSales = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/sales/all-sales');
      
      if (response.data.success) {
        setSales(response.data.sales);
        setFilteredSales(response.data.sales);
      } else {
        throw new Error(response.data.message || 'Error al cargar ventas');
      }
    } catch (error) {
      console.error('Error cargando ventas:', error);
      setError('Error al cargar ventas: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  // ✅ FILTRAR VENTAS
  useEffect(() => {
    let filtered = sales;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(sale =>
        sale.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.paymentMethod?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sale => sale.status === statusFilter);
    }

    setFilteredSales(filtered);
  }, [searchTerm, statusFilter, sales]);

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
    return new Date(dateString).toLocaleDateString('es-VE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // ✅ COLOR DE ESTADO
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  // ✅ TEXTO DE ESTADO
  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'COMPLETADA';
      case 'pending': return 'PENDIENTE';
      case 'cancelled': return 'CANCELADA';
      default: return status;
    }
  };

  const handleViewDetails = (sale) => {
    setSelectedSale(sale);
    setDetailModalOpen(true);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Ventas
        </Typography>
        <Typography color="text.secondary">
          Administración y seguimiento de todas las ventas del sistema - DATOS REALES
        </Typography>
      </Box>

      <UBCard>
        {/* FILTROS Y BÚSQUEDA */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Buscar por ID, cliente o método de pago..."
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

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Estado"
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="completed">Completadas</MenuItem>
              <MenuItem value="pending">Pendientes</MenuItem>
              <MenuItem value="cancelled">Canceladas</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => {/* Lógica de exportación */}}
          >
            Exportar
          </Button>

          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
          >
            Limpiar Filtros
          </Button>

          <Typography variant="body2" color="text.secondary">
            {filteredSales.length} ventas mostradas
          </Typography>
        </Box>

        {/* MENSAJES DE ESTADO */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* TABLA DE VENTAS */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Venta</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Método Pago</TableCell>
                <TableCell>Moneda</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {sale.id?.substring(0, 8)}...
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {formatDate(sale.createdAt)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person sx={{ fontSize: 16, color: 'primary.main' }} />
                      <Typography variant="body2">
                        {sale.customer?.name || 'Cliente General'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">
                      {formatCurrency(sale.totalAmount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sale.paymentMethod || 'N/A'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sale.currency || 'USD'}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(sale.status)}
                      color={getStatusColor(sale.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleViewDetails(sale)}
                      color="primary"
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ESTADOS DE CARGA Y VACÍO */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {filteredSales.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Receipt sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography color="text.secondary">
              {searchTerm || statusFilter !== 'all' 
                ? 'No se encontraron ventas con los filtros aplicados' 
                : 'No hay ventas registradas'
              }
            </Typography>
          </Box>
        )}
      </UBCard>

      {/* MODAL DE DETALLES */}
      <SaleDetailModal
        open={detailModalOpen}
        sale={selectedSale}
        onClose={() => setDetailModalOpen(false)}
      />
    </Container>
  );
};

export default Sales;
