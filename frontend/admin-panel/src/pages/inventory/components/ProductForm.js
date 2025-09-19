// frontend/admin-panel/src/pages/inventory/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Typography, Box,
  InputAdornment, FormControl, InputLabel, Select,
  MenuItem, Switch, FormControlLabel, Chip,
  Avatar, IconButton, Alert, Divider
} from '@mui/material';
import {
  AddPhotoAlternate, Delete, AttachMoney,
  Inventory, Barcode, Category, Scale
} from '@mui/icons-material';

const ProductForm = ({ open, product, editMode, onClose, onSave, categories }) => {
  const [formData, setFormData] = useState({
    sku: '',
    barcode: '',
    name: '',
    description: '',
    category: '',
    cost: 0,
    price: 0,
    minPrice: 0,
    stock: 0,
    minStock: 0,
    maxStock: 0,
    tax: 16,
    weight: 0,
    dimensions: '',
    supplier: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        sku: '',
        barcode: '',
        name: '',
        description: '',
        category: '',
        cost: 0,
        price: 0,
        minPrice: 0,
        stock: 0,
        minStock: 0,
        maxStock: 0,
        tax: 16,
        weight: 0,
        dimensions: '',
        supplier: '',
        status: 'active'
      });
    }
    setErrors({});
  }, [product, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.sku) newErrors.sku = 'SKU es requerido';
    if (!formData.name) newErrors.name = 'Nombre es requerido';
    if (!formData.category) newErrors.category = 'Categoría es requerida';
    if (formData.cost <= 0) newErrors.cost = 'Costo debe ser mayor a 0';
    if (formData.price <= 0) newErrors.price = 'Precio debe ser mayor a 0';
    if (formData.price < formData.cost) newErrors.price = 'Precio debe ser mayor al costo';
    if (formData.minPrice > formData.price) newErrors.minPrice = 'Precio mínimo no puede ser mayor al precio';
    if (formData.stock < 0) newErrors.stock = 'Stock no puede ser negativo';
    if (formData.minStock < 0) newErrors.minStock = 'Stock mínimo no puede ser negativo';
    if (formData.maxStock < formData.minStock) newErrors.maxStock = 'Stock máximo no puede ser menor al mínimo';
    if (formData.tax < 0 || formData.tax > 100) newErrors.tax = 'IVA debe estar entre 0 y 100';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field changes
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const calculateProfit = () => {
    return formData.price - formData.cost;
  };

  const calculateProfitMargin = () => {
    if (formData.price === 0) return 0;
    return ((formData.price - formData.cost) / formData.price) * 100;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Inventory />
          {editMode ? 'Editar Producto' : 'Nuevo Producto'}
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Información Básica */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Información Básica
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="SKU *"
              value={formData.sku}
              onChange={(e) => handleChange('sku', e.target.value)}
              error={!!errors.sku}
              helperText={errors.sku}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Código de Barras"
              value={formData.barcode}
              onChange={(e) => handleChange('barcode', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Barcode />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Producto *"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel>Categoría *</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                label="Categoría *"
              >
                <MenuItem value="">Seleccionar categoría</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography variant="caption" color="error">
                  {errors.category}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Proveedor"
              value={formData.supplier}
              onChange={(e) => handleChange('supplier', e.target.value)}
            />
          </Grid>

          {/* Precios y Costos */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Precios y Costos
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Costo *"
              type="number"
              value={formData.cost}
              onChange={(e) => handleChange('cost', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              error={!!errors.cost}
              helperText={errors.cost}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Precio de Venta *"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Precio Mínimo"
              type="number"
              value={formData.minPrice}
              onChange={(e) => handleChange('minPrice', parseFloat(e.target.value) || 0)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              error={!!errors.minPrice}
              helperText={errors.minPrice}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="IVA (%)"
              type="number"
              value={formData.tax}
              onChange={(e) => handleChange('tax', parseFloat(e.target.value) || 0)}
              error={!!errors.tax}
              helperText={errors.tax}
              inputProps={{ min: 0, max: 100 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="body2" gutterBottom>
                Análisis de Rentabilidad
              </Typography>
              <Typography variant="body2">
                Ganancia: ${calculateProfit().toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Margen: {calculateProfitMargin().toFixed(2)}%
              </Typography>
            </Box>
          </Grid>

          {/* Gestión de Stock */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Gestión de Stock
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Stock Actual"
              type="number"
              value={formData.stock}
              onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
              error={!!errors.stock}
              helperText={errors.stock}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Stock Mínimo"
              type="number"
              value={formData.minStock}
              onChange={(e) => handleChange('minStock', parseInt(e.target.value) || 0)}
              error={!!errors.minStock}
              helperText={errors.minStock}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Stock Máximo"
              type="number"
              value={formData.maxStock}
              onChange={(e) => handleChange('maxStock', parseInt(e.target.value) || 0)}
              error={!!errors.maxStock}
              helperText={errors.maxStock}
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* Información Física */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Información Física
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Peso (kg)"
              type="number"
              value={formData.weight}
              onChange={(e) => handleChange('weight', parseFloat(e.target.value) || 0)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Scale />
                  </InputAdornment>
                ),
              }}
              inputProps={{ min: 0, step: "0.01" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Dimensiones (LxAxA cm)"
              value={formData.dimensions}
              onChange={(e) => handleChange('dimensions', e.target.value)}
              placeholder="30x20x10"
            />
          </Grid>

          {/* Estado */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.status === 'active'}
                  onChange={(e) => handleChange('status', e.target.checked ? 'active' : 'inactive')}
                  color="primary"
                />
              }
              label="Producto Activo"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {editMode ? 'Actualizar Producto' : 'Crear Producto'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;