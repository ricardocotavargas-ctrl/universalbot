// frontend/admin-panel/src/pages/Services.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import {
  Inventory,
  Warning,
  Add,
  Category,
  LocalShipping,
  TrendingUp,
  QrCodeScanner,
  QrCode,
  Edit,
  Delete,
  Search,
  FilterList,
} from '@mui/icons-material';
import UBCard from '../components/ui/UBCard';
import UBButton from '../components/ui/UBButton';

const Services = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: '',
    price: 0,
    cost: 0,
    stock: 0,
    minStock: 5,
    supplier: '',
    brand: '',
    size: '',
    color: '',
    description: '',
    location: '',
    active: true
  });

  // Categorías de productos
  const categories = [
    'all', 'tecnologia', 'ropa', 'calzado', 'hogar', 'deportes', 
    'belleza', 'alimentos', 'electrodomesticos', 'libros', 'otros'
  ];

  // Datos de demostración
  useEffect(() => {
    const demoProducts = [
      {
        id: 1,
        name: 'iPhone 13 Pro',
        sku: 'TECH-001',
        category: 'tecnologia',
        price: 999,
        cost: 650,
        stock: 8,
        minStock: 5,
        supplier: 'Apple Inc.',
        brand: 'Apple',
        size: '128GB',
        color: 'Graphite',
        description: 'Smartphone flagship de Apple',
        location: 'Almacén A - Estante B2',
        active: true,
        lastUpdated: '2024-01-15'
      },
      {
        id: 2,
        name: 'Nike Air Max',
        sku: 'CALZ-001',
        category: 'calzado',
        price: 120,
        cost: 75,
        stock: 3,
        minStock: 10,
        supplier: 'Nike Venezuela',
        brand: 'Nike',
        size: '42',
        color: 'Negro/Rojo',
        description: 'Zapatillas deportivas',
        location: 'Almacén B - Estante C3',
        active: true,
        lastUpdated: '2024-01-14'
      },
      {
        id: 3,
        name: 'Samsung Smart TV 55"',
        sku: 'TECH-002',
        category: 'tecnologia',
        price: 599,
        cost: 450,
        stock: 15,
        minStock: 8,
        supplier: 'Samsung Electronics',
        brand: 'Samsung',
        size: '55 pulgadas',
        color: 'Negro',
        description: 'Smart TV 4K UHD',
        location: 'Almacén A - Estante A1',
        active: true,
        lastUpdated: '2024-01-16'
      },
      {
        id: 4,
        name: 'Aceite de Oliva Extra Virgen',
        sku: 'ALIM-001',
        category: 'alimentos',
        price: 15,
        cost: 9,
        stock: 2,
        minStock: 12,
        supplier: 'Importaciones Gourmet',
        brand: 'La Española',
        size: '1 Litro',
        color: 'Verde',
        description: 'Aceite premium español',
        location: 'Almacén C - Estante D4',
        active: true,
        lastUpdated: '2024-01-12'
      },
      {
        id: 5,
        name: 'Camisa Oxford Slim Fit',
        sku: 'ROPA-001',
        category: 'ropa',
        price: 45,
        cost: 28,
        stock: 20,
        minStock: 15,
        supplier: 'Textiles Modernos',
        brand: 'Van Heusen',
        size: 'M',
        color: 'Azul',
        description: 'Camisa formal de algodón',
        location: 'Almacén B - Estante E2',
        active: true,
        lastUpdated: '2024-01-11'
      }
    ];

    setProducts(demoProducts);
    setFilteredProducts(demoProducts);
    checkLowStock(demoProducts);
  }, []);

  // Filtrado de productos
  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'low_stock') {
        result = result.filter(product => product.stock <= product.minStock);
      } else if (statusFilter === 'inactive') {
        result = result.filter(product => !product.active);
      }
    }

    setFilteredProducts(result);
    checkLowStock(result);
  }, [searchTerm, categoryFilter, statusFilter, products]);

  const checkLowStock = (productsList) => {
    const alerts = productsList.filter(product => product.stock <= product.minStock && product.active);
    setLowStockAlerts(alerts);
  };

  const updateStock = (productId, newStock) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, stock: newStock } : product
    );
    
    setProducts(updatedProducts);
    checkLowStock(updatedProducts);
  };

  const toggleProductStatus = (productId) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, active: !product.active } : product
    );
    
    setProducts(updatedProducts);
  };

  const handleCreateProduct = () => {
    const newProductWithId = {
      ...newProduct,
      id: products.length + 1,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setProducts(prev => [newProductWithId, ...prev]);
    setDialogOpen(false);
    resetProductForm();
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setDialogOpen(true);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map(product =>
      product.id === editingProduct.id 
        ? { ...newProduct, lastUpdated: new Date().toISOString().split('T')[0] }
        : product
    );
    
    setProducts(updatedProducts);
    setDialogOpen(false);
    setEditingProduct(null);
    resetProductForm();
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const resetProductForm = () => {
    setNewProduct({
      name: '',
      sku: '',
      category: '',
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 5,
      supplier: '',
      brand: '',
      size: '',
      color: '',
      description: '',
      location: '',
      active: true
    });
  };

  const calculateInventoryValue = () => {
    return products.reduce((sum, product) => sum + (product.stock * product.cost), 0);
  };

  const calculateRetailValue = () => {
    return products.reduce((sum, product) => sum + (product.stock * product.price), 0);
  };

  const getCategoryName = (category) => {
    const names = {
      'all': 'Todas',
      'tecnologia': 'Tecnología',
      'ropa': 'Ropa',
      'calzado': 'Calzado',
      'hogar': 'Hogar',
      'deportes': 'Deportes',
      'belleza': 'Belleza',
      'alimentos': 'Alimentos',
      'electrodomesticos': 'Electrodomésticos',
      'libros': 'Libros',
      'otros': 'Otros'
    };
    return names[category] || category;
  };

  const generateSKU = () => {
    const prefix = newProduct.category.substring(0, 4).toUpperCase();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    setNewProduct(prev => ({ ...prev, sku: `${prefix}-${random}` }));
  };

  // Métricas del inventario
  const metrics = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.active).length,
    lowStockProducts: lowStockAlerts.length,
    inventoryValue: calculateInventoryValue(),
    retailValue: calculateRetailValue(),
    outOfStock: products.filter(p => p.stock === 0 && p.active).length
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Gestión de Inventario
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Control de stock y productos en tiempo real
            </Typography>
          </Box>
          <UBButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => setDialogOpen(true)}
          >
            Nuevo Producto
          </UBButton>
        </Box>

        {/* Alertas de Stock Bajo */}
        {lowStockAlerts.length > 0 && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              ⚠️ Alertas de Stock Bajo
            </Typography>
            {lowStockAlerts.map(product => (
              <Box key={product.id} sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                <Warning sx={{ mr: 1 }} />
                <Typography variant="body2">
                  <strong>{product.name}</strong> - Solo {product.stock} unidades restantes 
                  (mínimo: {product.minStock})
                </Typography>
              </Box>
            ))}
          </Alert>
        )}

        {/* Métricas del Inventario */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={2}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <Inventory sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {metrics.totalProducts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Productos Totales
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} md={2}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {metrics.activeProducts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activos
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} md={2}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <Warning sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {metrics.lowStockProducts}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock Bajo
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <LocalShipping sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  ${metrics.inventoryValue.toLocaleString('es-VE')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Valor en Inventario
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <Category sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  ${metrics.retailValue.toLocaleString('es-VE')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Valor al Público
                </Typography>
              </Box>
            </UBCard>
          </Grid>
        </Grid>

        {/* Filtros */}
        <UBCard sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Categoría"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {getCategoryName(category)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={statusFilter}
                  label="Estado"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="low_stock">Stock Bajo</MenuItem>
                  <MenuItem value="inactive">Inactivos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Buscar producto, SKU o marca..."
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
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setStatusFilter('all');
                }}
              >
                Limpiar
              </Button>
            </Grid>
          </Grid>
        </UBCard>

        {/* Tabla de Productos */}
        <UBCard 
          title="Inventario de Productos" 
          subtitle={`${filteredProducts.length} productos encontrados`}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Ubicación</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.brand} • {product.size} • {product.color}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={product.sku}
                        size="small"
                        icon={<QrCode />}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getCategoryName(product.category)}
                        size="small"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                          type="number"
                          value={product.stock}
                          onChange={(e) => updateStock(product.id, parseInt(e.target.value))}
                          size="small"
                          sx={{ width: 80 }}
                        />
                        {product.stock <= product.minStock && product.active && (
                          <Warning color="warning" />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        ${product.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Costo: ${product.cost}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        ${(product.stock * product.price).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {product.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={product.active}
                            onChange={() => toggleProductStatus(product.id)}
                            color="success"
                          />
                        }
                        label={product.active ? 'Activo' : 'Inactivo'}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEditProduct(product)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteProduct(product.id)}
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

        {/* Dialog para Crear/Editar Producto */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Typography variant="h6">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre del Producto"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    label="SKU"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    required
                    InputProps={{
                      startAdornment: <QrCode sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                  <Button onClick={generateSKU} startIcon={<QrCodeScanner />}>
                    Generar
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={newProduct.category}
                    label="Categoría"
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    {categories.filter(cat => cat !== 'all').map((category) => (
                      <MenuItem key={category} value={category}>
                        {getCategoryName(category)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Marca"
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Precio de Venta"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Costo"
                  value={newProduct.cost}
                  onChange={(e) => setNewProduct({ ...newProduct, cost: parseFloat(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Stock Inicial"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Stock Mínimo"
                  value={newProduct.minStock}
                  onChange={(e) => setNewProduct({ ...newProduct, minStock: parseInt(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Proveedor"
                  value={newProduct.supplier}
                  onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Talla/Medida"
                  value={newProduct.size}
                  onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Color"
                  value={newProduct.color}
                  onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Ubicación en Almacén"
                  value={newProduct.location}
                  onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Descripción"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newProduct.active}
                      onChange={(e) => setNewProduct({ ...newProduct, active: e.target.checked })}
                      color="success"
                    />
                  }
                  label="Producto Activo"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button 
              variant="contained" 
              onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
              disabled={!newProduct.name || !newProduct.sku || !newProduct.category}
            >
              {editingProduct ? 'Actualizar' : 'Crear'} Producto
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Services;