// frontend/admin-panel/src/pages/inventory/Products.js - VERSIÓN CON BACKEND REAL
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip,
  IconButton, Button, TextField, InputAdornment, Dialog,
  DialogTitle, DialogContent, DialogActions, Grid,
  MenuItem, FormControl, InputLabel, Select, Card,
  CardContent, Avatar, LinearProgress, Alert,
  Tooltip, Snackbar
} from '@mui/material';
import {
  Search, Add, Edit, Delete, Visibility, Inventory,
  Category, AttachMoney, Warning, TrendingUp,
  Download, Upload
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import ProductForm from './components/ProductForm';

const Products = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Cargar productos del backend
  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/inventory');
      
      if (response.data.success) {
        // Transformar datos del backend al formato esperado
        const transformedProducts = response.data.products.map(product => ({
          id: product._id,
          sku: product.code,
          barcode: product.barcode || '',
          name: product.name,
          description: `${product.name} - ${product.category || 'Sin categoría'}`,
          category: product.category || 'Sin categoría',
          cost: product.cost || 0,
          price: product.price,
          minPrice: product.price * 0.8, // Calcular dinámicamente
          stock: product.stock,
          minStock: product.minStock || 5,
          maxStock: product.maxStock || product.stock * 2,
          tax: product.tax || 16,
          supplier: product.supplier || 'No especificado',
          status: product.stock === 0 ? 'out-of-stock' : 
                  product.stock <= product.minStock ? 'low-stock' : 'active',
          createdAt: product.createdAt,
          updatedAt: product.updatedAt
        }));
        
        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts);
      } else {
        throw new Error(response.data.message || 'Error al cargar productos');
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error al cargar productos: ' + error.message, 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, categoryFilter, statusFilter, products]);

  const filterProducts = () => {
    let filtered = products;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.barcode && product.barcode.includes(searchTerm)) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoría
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => product.status === statusFilter);
    }

    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('¿Está seguro de que desea eliminar este producto?')) return;
    
    try {
      const response = await api.delete(`/api/inventory/${productId}`);
      
      if (response.data.success) {
        setSnackbar({ 
          open: true, 
          message: 'Producto eliminado exitosamente', 
          severity: 'success' 
        });
        loadProducts();
      } else {
        throw new Error(response.data.message || 'Error al eliminar producto');
      }
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: 'Error al eliminar producto: ' + error.message, 
        severity: 'error' 
      });
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editMode) {
        // Actualizar producto existente
        const response = await api.put(`/api/inventory/${productData.id}`, {
          name: productData.name,
          code: productData.sku,
          price: productData.price,
          cost: productData.cost,
          stock: productData.stock,
          minStock: productData.minStock,
          category: productData.category,
          supplier: productData.supplier,
          barcode: productData.barcode,
          tax: productData.tax
        });

        if (response.data.success) {
          setSnackbar({ 
            open: true, 
            message: 'Producto actualizado exitosamente', 
            severity: 'success' 
          });
          loadProducts();
        }
      } else {
        // Crear nuevo producto
        const response = await api.post('/api/inventory', {
          name: productData.name,
          code: productData.sku,
          price: productData.price,
          cost: productData.cost,
          stock: productData.stock,
          minStock: productData.minStock,
          category: productData.category,
          supplier: productData.supplier,
          barcode: productData.barcode,
          tax: productData.tax
        });

        if (response.data.success) {
          setSnackbar({ 
            open: true, 
            message: 'Producto creado exitosamente', 
            severity: 'success' 
          });
          loadProducts();
        }
      }
      setDialogOpen(false);
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: `Error: ${error.response?.data?.error || error.message}`, 
        severity: 'error' 
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'low-stock': return 'warning';
      case 'out-of-stock': return 'error';
      case 'inactive': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'low-stock': return 'Stock Bajo';
      case 'out-of-stock': return 'Agotado';
      case 'inactive': return 'Inactivo';
      default: return status;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const calculateStockPercentage = (product) => {
    if (product.stock === 0 || !product.maxStock) return 0;
    return Math.min((product.stock / product.maxStock) * 100, 100);
  };

  // Obtener categorías únicas de los productos
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  
  // Estadísticas
  const outOfStockCount = products.filter(p => p.status === 'out-of-stock').length;
  const lowStockCount = products.filter(p => p.status === 'low-stock').length;
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.stock * p.cost), 0);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Productos
        </Typography>
        <Typography color="text.secondary">
          Administración completa del catálogo de productos • {user?.businessName || 'Tu Negocio'}
        </Typography>
      </Box>

      {/* Alertas de Stock */}
      {outOfStockCount > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">
            {outOfStockCount} producto(s) agotado(s)
          </Typography>
          <Typography variant="body2">
            Es necesario reabastecer urgentemente estos productos.
          </Typography>
        </Alert>
      )}

      {lowStockCount > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">
            {lowStockCount} producto(s) con stock bajo
          </Typography>
          <Typography variant="body2">
            Programar reabastecimiento para estos productos.
          </Typography>
        </Alert>
      )}

      {/* Estadísticas Rápidas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary">Total Productos</Typography>
                  <Typography variant="h4">{products.length}</Typography>
                </Box>
                <Inventory color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary">Valor Total</Typography>
                  <Typography variant="h4">
                    {formatCurrency(totalInventoryValue)}
                  </Typography>
                </Box>
                <AttachMoney color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary">Stock Bajo</Typography>
                  <Typography variant="h4" color="warning.main">
                    {lowStockCount}
                  </Typography>
                </Box>
                <Warning color="warning" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary">Agotados</Typography>
                  <Typography variant="h4" color="error.main">
                    {outOfStockCount}
                  </Typography>
                </Box>
                <Warning color="error" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Barra de Herramientas */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Buscar productos por nombre, SKU o código de barras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300, flexGrow: 1 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Categoría"
            >
              <MenuItem value="all">Todas las categorías</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Estado"
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="active">Activos</MenuItem>
              <MenuItem value="low-stock">Stock Bajo</MenuItem>
              <MenuItem value="out-of-stock">Agotados</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddProduct}
          >
            Nuevo Producto
          </Button>

          <Tooltip title="Exportar productos">
            <IconButton>
              <Download />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>

      {/* Tabla de Productos */}
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>SKU/Código</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Precios</TableCell>
                  <TableCell>Proveedor</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <Inventory />
                        </Avatar>
                        <Box>
                          <Typography fontWeight="medium">{product.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.description.substring(0, 50)}...
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{product.sku}</Typography>
                        {product.barcode && (
                          <Typography variant="caption" color="text.secondary">
                            {product.barcode}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={product.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 100 }}>
                        <Typography variant="body2">
                          {product.stock} / {product.maxStock}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={calculateStockPercentage(product)}
                          color={
                            product.stock === 0 ? 'error' : 
                            product.stock <= product.minStock ? 'warning' : 'success'
                          }
                          sx={{ mt: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Mín: {product.minStock}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          Costo: {formatCurrency(product.cost)}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          Venta: {formatCurrency(product.price)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Mín: {formatCurrency(product.minPrice)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{product.supplier}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(product.status)}
                        color={getStatusColor(product.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Editar producto">
                          <IconButton
                            size="small"
                            onClick={() => handleEditProduct(product)}
                            color="primary"
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar producto">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteProduct(product.id)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredProducts.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Inventory sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography color="text.secondary" gutterBottom>
                No se encontraron productos
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddProduct}
                sx={{ mt: 2 }}
              >
                Crear Primer Producto
              </Button>
            </Box>
          )}

          {loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                Cargando productos...
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Modal de Producto */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editMode ? 'Editar Producto' : 'Nuevo Producto'}
        </DialogTitle>
        <DialogContent>
          <ProductForm
            product={selectedProduct}
            editMode={editMode}
            onSave={handleSaveProduct}
            categories={categories}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button 
            onClick={() => {
              // El guardado se maneja en el ProductForm
              setDialogOpen(false);
            }}
            variant="contained"
          >
            {editMode ? 'Actualizar' : 'Crear'}
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

export default Products;
