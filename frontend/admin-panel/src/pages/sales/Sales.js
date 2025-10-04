// frontend/admin-panel/src/pages/sales/Sales.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip,
  IconButton, Button, TextField, InputAdornment, Dialog,
  DialogTitle, DialogContent, DialogActions, Grid,
  MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import {
  Search, Visibility, Print, Download, FilterList,
  Receipt, CalendarToday, Person, Business
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import SaleDetailModal from './components/SaleDetailModal';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedSale, setSelectedSale] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Datos de ejemplo
  const mockSales = [
    {
      id: 1,
      documentNumber: 'FAC-001234',
      fecha: '2024-01-15T10:30:00',
      cliente: { nombre: 'Juan Pérez', documento: 'V-12345678' },
      total: 1250.50,
      subtotal: 1078.02,
      impuestos: 172.48,
      descuentos: 0,
      metodoPago: 'transferencia',
      canalVenta: 'whatsapp',
      estado: 'completada',
      productos: [
        { name: 'Producto Premium', cantidad: 2, price: 299.99, total: 599.98 },
        { name: 'Kit Herramientas', cantidad: 1, price: 89.99, total: 89.99 }
      ]
    },
    {
      id: 2,
      documentNumber: 'NOT-005678',
      fecha: '2024-01-16T14:45:00',
      cliente: { nombre: 'TechSolutions C.A.', documento: 'J-123456789' },
      total: 3450.75,
      subtotal: 2974.78,
      impuestos: 475.97,
      descuentos: 100.00,
      metodoPago: 'tarjeta',
      canalVenta: 'tienda',
      estado: 'completada',
      productos: [
        { name: 'Producto Premium', cantidad: 5, price: 299.99, total: 1499.95 },
        { name: 'Accesorio Oficina', cantidad: 10, price: 49.99, total: 499.90 }
      ]
    },
    {
      id: 3,
      documentNumber: 'FAC-009876',
      fecha: '2024-01-17T09:15:00',
      cliente: { nombre: 'Maria Rodriguez', documento: 'V-87654321' },
      total: 890.00,
      subtotal: 767.24,
      impuestos: 122.76,
      descuentos: 0,
      metodoPago: 'efectivo',
      canalVenta: 'web',
      estado: 'pendiente',
      productos: [
        { name: 'Kit Herramientas', cantidad: 3, price: 89.99, total: 269.97 },
        { name: 'Consumibles Básicos', cantidad: 2, price: 29.99, total: 59.98 }
      ]
    }
  ];

  useEffect(() => {
    setSales(mockSales);
    setFilteredSales(mockSales);
  }, []);

  useEffect(() => {
    filterSales();
  }, [searchTerm, statusFilter, dateFilter, sales]);

  const filterSales = () => {
    let filtered = sales;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(sale =>
        sale.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.cliente.documento.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sale => sale.estado === statusFilter);
    }

    // Filtro por fecha (implementar lógica según necesidad)
    if (dateFilter !== 'all') {
      // Lógica de filtrado por fecha
    }

    setFilteredSales(filtered);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-VE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completada': return 'success';
      case 'pendiente': return 'warning';
      case 'cancelada': return 'error';
      default: return 'default';
    }
  };

  const handleViewDetails = (sale) => {
    setSelectedSale(sale);
    setDetailModalOpen(true);
  };

  const handlePrint = (sale) => {
    console.log('Imprimir venta:', sale);
    // Lógica de impresión
  };

  const handleExport = () => {
    console.log('Exportar ventas');
    // Lógica de exportación
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Ventas
        </Typography>
        <Typography color="text.secondary">
          Administración y seguimiento de todas las ventas del sistema
        </Typography>
      </Box>

      <UBCard>
        {/* Filtros y Búsqueda */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Buscar por número, cliente o documento..."
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
              <MenuItem value="completada">Completadas</MenuItem>
              <MenuItem value="pendiente">Pendientes</MenuItem>
              <MenuItem value="cancelada">Canceladas</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Fecha</InputLabel>
            <Select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              label="Fecha"
            >
              <MenuItem value="all">Todas</MenuItem>
              <MenuItem value="today">Hoy</MenuItem>
              <MenuItem value="week">Esta semana</MenuItem>
              <MenuItem value="month">Este mes</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleExport}
          >
            Exportar
          </Button>
        </Box>

        {/* Tabla de Ventas */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Método Pago</TableCell>
                <TableCell>Canal</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id} hover>
                  <TableCell>
                    <Typography fontWeight="medium">
                      {sale.documentNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {formatDate(sale.fecha)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {sale.cliente.documento.startsWith('J') || sale.cliente.documento.startsWith('G') ? (
                        <Business sx={{ fontSize: 16, color: 'primary.main' }} />
                      ) : (
                        <Person sx={{ fontSize: 16, color: 'primary.main' }} />
                      )}
                      <Box>
                        <Typography variant="body2">{sale.cliente.nombre}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {sale.cliente.documento}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">
                      {formatCurrency(sale.total)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sale.metodoPago}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sale.canalVenta}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sale.estado}
                      color={getStatusColor(sale.estado)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewDetails(sale)}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handlePrint(sale)}
                        color="secondary"
                      >
                        <Print />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredSales.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Receipt sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography color="text.secondary">
              No se encontraron ventas
            </Typography>
          </Box>
        )}
      </UBCard>

      {/* Modal de Detalles */}
      <SaleDetailModal
        open={detailModalOpen}
        sale={selectedSale}
        onClose={() => setDetailModalOpen(false)}
      />
    </Container>
  );
};

export default Sales;
