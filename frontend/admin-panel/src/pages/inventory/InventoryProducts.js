import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  Add, Edit, Delete, Inventory, Search
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const InventoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const mockProducts = [
    { id: 1, name: 'Café Premium', sku: 'CAFE-001', category: 'Bebidas', stock: 150, minStock: 50, price: 300, cost: 120 },
    { id: 2, name: 'Té Especial', sku: 'TE-002', category: 'Bebidas', stock: 200, minStock: 30, price: 140, cost: 70 },
    { id: 3, name: 'Pastel Chocolate', sku: 'PAS-003', category: 'Repostería', stock: 25, minStock: 10, price: 400, cost: 160 },
    { id: 4, name: 'Jugo Natural', sku: 'JUG-004', category: 'Bebidas', stock: 80, minStock: 20, price: 200, cost: 90 }
  ];

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { status: 'Agotado', color: 'error' };
    if (stock <= minStock) return { status: 'Bajo Stock', color: 'warning' };
    return { status: 'Disponible', color: 'success' };
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Productos
        </Typography>
        <Typography color="text.secondary">
          Administra tu inventario de productos
        </Typography>
      </Box>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Buscar productos..."
            InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> }}
            sx={{ minWidth: 300 }}
          />
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Categoría</InputLabel>
            <Select label="Categoría">
              <MenuItem value="all">Todas</MenuItem>
              <MenuItem value="Bebidas">Bebidas</MenuItem>
              <MenuItem value="Repostería">Repostería</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
            Nuevo Producto
          </Button>
        </Box>
      </UBCard>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Productos
              </Typography>
              <Typography variant="h4">{products.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Bajo Stock
              </Typography>
              <Typography variant="h4" color="warning.main">
                {products.filter(p => p.stock <= p.minStock && p.stock > 0).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Agotados
              </Typography>
              <Typography variant="h4" color="error.main">
                {products.filter(p => p.stock === 0).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Valor Inventario
              </Typography>
              <Typography variant="h4" color="success.main">
                {formatCurrency(products.reduce((sum, p) => sum + (p.stock * p.cost), 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard>
        <Typography variant="h6" gutterBottom>
          Lista de Productos
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Costo</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => {
                const stockStatus = getStockStatus(product.stock, product.minStock);
                
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Inventory sx={{ mr: 1, color: 'primary.main' }} />
                        {product.name}
                      </Box>
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>
                      <Chip label={product.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">{product.stock} units</TableCell>
                    <TableCell align="right">{formatCurrency(product.price)}</TableCell>
                    <TableCell align="right">{formatCurrency(product.cost)}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={stockStatus.status}
                        color={stockStatus.color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>

      {/* Diálogo para nuevo/editar producto */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nombre del Producto" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="SKU" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select label="Categoría">
                  <MenuItem value="Bebidas">Bebidas</MenuItem>
                  <MenuItem value="Repostería">Repostería</MenuItem>
                  <MenuItem value="Alimentos">Alimentos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Stock Inicial" type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Stock Mínimo" type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Precio de Venta" type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Costo" type="number" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {editingProduct ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InventoryProducts;