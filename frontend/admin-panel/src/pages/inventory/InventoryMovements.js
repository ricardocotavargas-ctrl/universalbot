import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, TextField, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import { TrendingUp, TrendingDown, SwapHoriz } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const InventoryMovements = () => {
  const { user } = useAuth();
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const response = await api.get('/api/inventory');
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadMovements = async (productId = '') => {
    try {
      setLoading(true);
      let url = '/api/inventory/movements';
      if (productId) {
        url = `/api/inventory/${productId}/movements`;
      }
      
      const response = await api.get(url);
      if (response.data.success) {
        setMovements(response.data.movements);
      }
    } catch (error) {
      console.error('Error loading movements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadMovements();
  }, []);

  const getMovementIcon = (type) => {
    switch (type) {
      case 'sale': return <TrendingDown color="error" />;
      case 'purchase': return <TrendingUp color="success" />;
      default: return <SwapHoriz color="info" />;
    }
  };

  const getMovementColor = (type) => {
    switch (type) {
      case 'sale': return 'error';
      case 'purchase': return 'success';
      case 'adjustment': return 'warning';
      case 'initial': return 'info';
      default: return 'default';
    }
  };

  const getMovementLabel = (type) => {
    const labels = {
      sale: 'Venta',
      purchase: 'Compra',
      adjustment: 'Ajuste',
      initial: 'Inicial',
      transfer: 'Transferencia',
      return: 'Devolución',
      damage: 'Daño'
    };
    return labels[type] || type;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          <SwapHoriz sx={{ mr: 2, color: 'primary.main' }} />
          Movimientos de Inventario
        </Typography>
        <Typography color="text.secondary">
          Historial completo de movimientos de stock • {user?.businessName || 'Tu Negocio'}
        </Typography>
      </Box>

      {/* Filtros */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filtrar por Producto</InputLabel>
              <Select
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  loadMovements(e.target.value);
                }}
                label="Filtrar por Producto"
              >
                <MenuItem value="">Todos los productos</MenuItem>
                {products.map(product => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name} ({product.code})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Tabla de Movimientos */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Stock Anterior</TableCell>
                  <TableCell align="right">Stock Nuevo</TableCell>
                  <TableCell>Referencia</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movements.map((movement) => (
                  <TableRow key={movement._id} hover>
                    <TableCell>
                      <Box>
                        <Typography fontWeight={600}>
                          {movement.productId?.name || 'Producto no encontrado'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {movement.productId?.code}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getMovementIcon(movement.type)}
                        <Chip 
                          label={getMovementLabel(movement.type)}
                          color={getMovementColor(movement.type)}
                          size="small"
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        fontWeight={600}
                        color={movement.quantity > 0 ? 'success.main' : 'error.main'}
                      >
                        {movement.quantity > 0 ? `+${movement.quantity}` : movement.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>{movement.previousStock}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={600}>{movement.newStock}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {movement.reference || movement.reason || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {movement.userId?.name || 'Sistema'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(movement.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(movement.createdAt).toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {movements.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <SwapHoriz sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography color="text.secondary">
                No hay movimientos registrados
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default InventoryMovements;
