// frontend/admin-panel/src/pages/inventory/Products.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip,
  IconButton, Button, TextField, InputAdornment, Dialog,
  DialogTitle, DialogContent, DialogActions, Grid,
  MenuItem, FormControl, InputLabel, Select, Card,
  CardContent, Avatar, LinearProgress, Alert,
  Tooltip, Switch, FormControlLabel
} from '@mui/material';
import {
  Search, Add, Edit, Delete, Visibility, Inventory,
  Category, Barcode, AttachMoney, Warning, TrendingUp,
  FilterList, Download, Upload, QrCode
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import ProductForm from './components/ProductForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Categorías de productos
  const categories = [
    'Electrónicos', 'Herramientas', 'Oficina', 'Hogar',
    'Deportes', 'Ropa', 'Alimentos', 'Bebidas',
    'Limpieza', 'Jardín', 'Automotriz', 'Salud'
  ];

  // Datos de ejemplo mejorados
  const mockProducts = [
    {
      id: 1,
      sku: 'PRD-001',
      barcode: '7501001234567',
      name: 'Laptop Gaming Premium',
      description: 'Laptop para gaming con RTX 4080, 32GB RAM, 1TB SSD',
      category: 'Electrónicos',
      cost: 1200.00,
      price: 2499.99,
      minPrice: 2000.00,
      stock: 15,
      minStock: 5,
      maxStock: 50,
      tax: 16,
      weight: 2.5,
      dimensions: '35x25x5 cm',
      supplier: 'TechSuppliers Inc.',
      status: 'active',
      images: [],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      sku: 'PRD-002',
      barcode: '7501002345678',
      name: 'Kit Herramientas Profesional',
      description: 'Set de 125 piezas para trabajo profesional',
      category: 'Herramientas',
      cost: 85.00,
      price: 189.99,
      minPrice: 150.00,
      stock: 3,
      minStock: 10,
      maxStock: 100,
      tax: 16,
      weight: 8.2,
      dimensions: '45x30x15 cm',
      supplier: 'ToolMasters SA',
      status: 'low-stock',
      images: [],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: 3,
      sku: 'PRD-003',
      barcode: '7501003456789',
      name: 'Silla Ergonómica Ejecutiva',
      description: 'Silla ergonómica de alta gama para oficina',
      category: 'Oficina',
      cost: 200.00,
      price: 499.99,
      minPrice: 400.00,
      stock: 0,
      minStock: 5,
      maxStock: 25,
      tax: 16,
      weight: 15.8,
      dimensions: '65x65x120 cm',
      supplier: 'OfficePro Solutions',
      status: 'out-of-stock',
      images: [],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-22'
    }
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
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
        product.barcode.includes(searchTerm) ||
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

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleSaveProduct = (productData) => {
    if (editMode) {
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
    } else {
      const newProduct = {
        ...productData,
        id: Math.max(...products.map(p => p.id), 0) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setDialogOpen(false);
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
    if (product.stock === 0) return 0;
    return Math.min((product.stock / product.maxStock) * 100, 100);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Productos
        </Typography>
        <Typography color="text.secondary">
          Administración completa del catálogo de productos
        </Typography>
      </Box>

      {/* Alertas de Stock */}
      {products.filter(p => p.status === 'out-of-stock').length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">
            {products.filter(p => p.status === 'out-of-stock').length} producto(s) agotado(s)
          </Typography>
          <Typography variant="body2">
            Es necesario reabastecer urgentemente estos productos.
          </Typography>
        </Alert>
      )}

      {products.filter(p => p.status === 'low-stock').length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">
            {products.filter(p => p.status === 'low-stock').length} producto(s) con stock bajo
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
                    {formatCurrency(products.reduce((sum, p) => sum + (p.stock * p.cost), 0))}
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
                    {products.filter(p => p.status === 'low-stock').length}
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
                    {products.filter(p => p.status === 'out-of-stock').length}
                  </Typography>
                </Box>
                <Warning color="error" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Barra de Herramientas */}
      <UBCard>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
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
              <MenuItem value="inactive">Inactivos</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddProduct}
          >
            Nuevo Producto
          </Button>

          <Tooltip title="Importar productos">
            <IconButton>
              <Upload />
            </IconButton>
          </Tooltip>

          <Tooltip title="Exportar productos">
            <IconButton>
              <Download />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Tabla de Productos */}
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
                      <Avatar>
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
                      <Typography variant="caption" color="text.secondary">
                        {product.barcode}
                      </Typography>
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
                      <Tooltip title="Ver detalles">
                        <IconButton size="small" color="info">
                          <Visibility />
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

        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Inventory sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography color="text.secondary">
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
      </UBCard>

      {/* Modal de Producto */}
      <ProductForm
        open={dialogOpen}
        product={selectedProduct}
        editMode={editMode}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveProduct}
        categories={categories}
      />
    </Container>
  );
};

export default Products;