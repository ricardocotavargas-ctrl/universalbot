import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, Card, CardContent,
  Button, TextField, Chip, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert, Snackbar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, InputAdornment, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import {
  Add, Search, Edit, Delete, Inventory as InventoryIcon,
  Warning, TrendingUp, Assessment, LocalShipping
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const Inventory = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [lowStockFilter, setLowStockFilter] = useState(false);

  // Dialog states
  const [productDialog, setProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    code: '',
    price: 0,
    cost: 0,
    stock: 0,
    minStock: 5,
    category: '',
    supplier: '',
    barcode: ''
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/inventory');
      
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setError('Error al cargar productos');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreateProduct = async () => {
    try {
      const response = await api.post('/api/inventory', productForm);
      
      if (response.data.success) {
        setSnackbar({ open: true, message: 'Producto creado exitosamente', severity: 'success' });
        setProductDialog(false);
        resetProductForm();
        loadProducts();
      }
    } catch (error) {
      setSnackbar({ open: true, message: `Error: ${error.response?.data?.error || error.message}`, severity: 'error' });
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await api.put(`/api/inventory/${editingProduct._id}`, productForm);
      
      if (response.data.success) {
        setSnackbar({ open: true, message: 'Producto actualizado exitosamente', severity: 'success' });
        setProductDialog(false);
        resetProductForm();
        loadProducts();
      }
    } catch (error) {
      setSnackbar({ open: true, message: `Error: ${error.response?.data?.error || error.message}`, severity: 'error' });
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      const response = await api.delete(`/api/inventory/${productId}`);
      
      if (response.data.success) {
        setSnackbar({ open: true, message: 'Producto eliminado exitosamente', severity: 'success' });
        loadProducts();
      }
    } catch (error) {
      setSnackbar({ open: true, message: `Error: ${error.response?.data?.error || error.message}`, severity: 'error' });
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      code: '',
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 5,
      category: '',
      supplier: '',
      barcode: ''
    });
    setEditingProduct(null);
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      code: product.code,
      price: product.price,
      cost: product.cost || 0,
      stock: product.stock,
      minStock: product.minStock || 5,
      category: product.category || '',
      supplier: product.supplier || '',
      barcode: product.barcode || ''
    });
    setProductDialog(true);
  };

  // Filtros
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesLowStock = !lowStockFilter || product.stock <= product.minStock;
    
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          <InventoryIcon sx={{ mr: 2, color: 'primary.main' }} />
          Gestión de Inventario
        </Typography>
        <Typography color="text.secondary">
          Administra tus productos y stock • {user?.businessName || 'Tu Negocio'}
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Productos
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {products.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Stock Total
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {products.reduce((sum, p) => sum + p.stock, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Alertas Stock
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color={lowStockCount > 0 ? 'error' : 'text.primary'}>
                    {lowStockCount}
                  </Typography>
                </Box>
                {lowStockCount > 0 && <Warning color="error" />}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Categorías
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {categories.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros y Acciones */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Categoría"
                >
                  <MenuItem value="">Todas</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant={lowStockFilter ? "contained" : "outlined"}
                color={lowStockFilter ? "error" : "primary"}
                startIcon={<Warning />}
                onClick={() => setLowStockFilter(!lowStockFilter)}
                fullWidth
              >
                Stock Bajo ({lowStockCount})
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setProductDialog(true)}
                fullWidth
              >
                Nuevo Producto
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabla de Productos */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Código</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="right">Mínimo</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product._id} hover>
                    <TableCell>
                      <Box>
                        <Typography fontWeight={600}>{product.name}</Typography>
                        {product.supplier && (
                          <Typography variant="caption" color="text.secondary">
                            Prov: {product.supplier}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={product.code} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      {product.category && (
                        <Chip label={product.category} size="small" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={600}>
                        ${product.price.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        fontWeight={600}
                        color={product.stock <= product.minStock ? 'error' : 'success.main'}
                      >
                        {product.stock}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {product.minStock}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {product.stock === 0 ? (
                        <Chip label="Agotado" color="error" size="small" />
                      ) : product.stock <= product.minStock ? (
                        <Chip label="Stock Bajo" color="warning" size="small" />
                      ) : (
                        <Chip label="Disponible" color="success" size="small" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => openEditDialog(product)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProduct(product._id)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredProducts.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <InventoryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography color="text.secondary">
                {searchTerm || categoryFilter || lowStockFilter 
                  ? 'No se encontraron productos con los filtros aplicados' 
                  : 'No hay productos registrados'
                }
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Producto */}
      <Dialog 
        open={productDialog} 
        onClose={() => setProductDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre del Producto *"
                value={productForm.name}
                onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Código *"
                value={productForm.code}
                onChange={(e) => setProductForm(prev => ({ ...prev, code: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Precio *"
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Costo"
                type="number"
                value={productForm.cost}
                onChange={(e) => setProductForm(prev => ({ ...prev, cost: parseFloat(e.target.value) }))}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stock Actual *"
                type="number"
                value={productForm.stock}
                onChange={(e) => setProductForm(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stock Mínimo *"
                type="number"
                value={productForm.minStock}
                onChange={(e) => setProductForm(prev => ({ ...prev, minStock: parseInt(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Categoría"
                value={productForm.category}
                onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Proveedor"
                value={productForm.supplier}
                onChange={(e) => setProductForm(prev => ({ ...prev, supplier: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Código de Barras"
                value={productForm.barcode}
                onChange={(e) => setProductForm(prev => ({ ...prev, barcode: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductDialog(false)}>Cancelar</Button>
          <Button 
            onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
            variant="contained"
            disabled={!productForm.name || !productForm.code || !productForm.price}
          >
            {editingProduct ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

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

export default Inventory;
