import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Card, CardContent,
  Grid, TextField, Button, MenuItem, FormControl,
  InputLabel, Select, Alert, Snackbar, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, InputAdornment
} from '@mui/material';
import { Add, Remove, History, Inventory } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const Adjustments = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [adjustmentData, setAdjustmentData] = useState({
    quantity: 0,
    reason: '',
    type: 'adjustment'
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [recentAdjustments, setRecentAdjustments] = useState([]);

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

  const loadRecentAdjustments = async () => {
    try {
      // Cargar últimos ajustes
      const response = await api.get('/api/inventory/movements?type=adjustment&limit=10');
      if (response.data.success) {
        setRecentAdjustments(response.data.movements);
      }
    } catch (error) {
      console.error('Error loading adjustments:', error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadRecentAdjustments();
  }, []);

  const handleAdjustment = async () => {
    if (!selectedProduct || !adjustmentData.quantity || !adjustmentData.reason) {
      setSnackbar({ open: true, message: 'Complete todos los campos requeridos', severity: 'error' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        stock: adjustmentData.quantity,
        adjustmentReason: adjustmentData.reason
      };

      const response = await api.put(`/api/inventory/${selectedProduct}`, payload);
      
      if (response.data.success) {
        setSnackbar({ open: true, message: 'Stock ajustado exitosamente', severity: 'success' });
        setAdjustmentData({ quantity: 0, reason: '', type: 'adjustment' });
        setSelectedProduct('');
        loadProducts();
        loadRecentAdjustments();
      }
    } catch (error) {
      setSnackbar({ open: true, message: `Error: ${error.response?.data?.error || error.message}`, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const selectedProductData = products.find(p => p._id === selectedProduct);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          <Inventory sx={{ mr: 2, color: 'primary.main' }} />
          Ajustes de Inventario
        </Typography>
        <Typography color="text.secondary">
          Ajustes manuales de stock y correcciones • {user?.businessName || 'Tu Negocio'}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Formulario de Ajuste */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Realizar Ajuste
              </Typography>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Producto *</InputLabel>
                <Select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  label="Producto *"
                >
                  {products.map(product => (
                    <MenuItem key={product._id} value={product._id}>
                      {product.name} ({product.code}) - Stock: {product.stock}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedProductData && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Stock actual: <strong>{selectedProductData.stock}</strong> unidades
                  {selectedProductData.minStock && (
                    <> • Mínimo: <strong>{selectedProductData.minStock}</strong> unidades</>
                  )}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Cantidad *"
                type="number"
                value={adjustmentData.quantity}
                onChange={(e) => setAdjustmentData(prev => ({ 
                  ...prev, 
                  quantity: parseInt(e.target.value) || 0 
                }))}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {adjustmentData.quantity >= 0 ? <Add color="success" /> : <Remove color="error" />}
                    </InputAdornment>
                  )
                }}
                helperText={
                  adjustmentData.quantity > 0 ? "Entrada de stock" : 
                  adjustmentData.quantity < 0 ? "Salida de stock" : "Cantidad a ajustar"
                }
              />

              <TextField
                fullWidth
                label="Motivo del Ajuste *"
                value={adjustmentData.reason}
                onChange={(e) => setAdjustmentData(prev => ({ ...prev, reason: e.target.value }))}
                multiline
                rows={3}
                sx={{ mb: 2 }}
                placeholder="Ej: Conteo físico, Daño, Donación, etc."
              />

              <Button
                variant="contained"
                fullWidth
                onClick={handleAdjustment}
                disabled={loading || !selectedProduct || !adjustmentData.quantity || !adjustmentData.reason}
              >
                {loading ? 'Procesando...' : 'Aplicar Ajuste'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Ajustes Recientes */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <History />
                Ajustes Recientes
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell>Fecha</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentAdjustments.map((adjustment) => (
                      <TableRow key={adjustment._id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {adjustment.productId?.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={adjustment.quantity > 0 ? `+${adjustment.quantity}` : adjustment.quantity}
                            color={adjustment.quantity > 0 ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption">
                            {new Date(adjustment.createdAt).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {recentAdjustments.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography color="text.secondary">
                    No hay ajustes recientes
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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

export default Adjustments;
