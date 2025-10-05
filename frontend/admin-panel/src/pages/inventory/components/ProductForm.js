import React, { useState, useEffect } from 'react';
import {
  Grid, TextField, FormControl, InputLabel,
  Select, MenuItem, InputAdornment, Alert
} from '@mui/material';

const ProductForm = ({ product, editMode, onSave, categories = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: '',
    price: 0,
    cost: 0,
    stock: 0,
    minStock: 5,
    maxStock: 0,
    tax: 16,
    supplier: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        barcode: product.barcode || '',
        category: product.category || '',
        price: product.price || 0,
        cost: product.cost || 0,
        stock: product.stock || 0,
        minStock: product.minStock || 5,
        maxStock: product.maxStock || 0,
        tax: product.tax || 16,
        supplier: product.supplier || '',
        description: product.description || ''
      });
    }
  }, [product]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es requerido';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'El código SKU es requerido';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }

    if (formData.minStock < 0) {
      newErrors.minStock = 'El stock mínimo no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const productData = {
        id: product?.id,
        ...formData
      };
      onSave(productData);
    }
  };

  // Calcular automáticamente maxStock si no está definido
  const calculatedMaxStock = formData.maxStock || formData.stock * 2;

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={12}>
        {editMode && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Editando producto existente. Los cambios se guardarán inmediatamente.
          </Alert>
        )}
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Nombre del Producto *"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Código SKU *"
          value={formData.sku}
          onChange={(e) => handleChange('sku', e.target.value)}
          error={!!errors.sku}
          helperText={errors.sku}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Precio de Venta *"
          type="number"
          value={formData.price}
          onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          error={!!errors.price}
          helperText={errors.price}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Costo"
          type="number"
          value={formData.cost}
          onChange={(e) => handleChange('cost', parseFloat(e.target.value) || 0)}
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
          value={formData.stock}
          onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
          error={!!errors.stock}
          helperText={errors.stock}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Stock Mínimo *"
          type="number"
          value={formData.minStock}
          onChange={(e) => handleChange('minStock', parseInt(e.target.value) || 5)}
          error={!!errors.minStock}
          helperText={errors.minStock}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Stock Máximo"
          type="number"
          value={formData.maxStock}
          onChange={(e) => handleChange('maxStock', parseInt(e.target.value) || 0)}
          helperText={!formData.maxStock ? `Calculado: ${calculatedMaxStock}` : ''}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            label="Categoría"
          >
            <MenuItem value="">Seleccionar categoría</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
            <MenuItem value="Otra">Otra categoría</MenuItem>
          </Select>
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
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Código de Barras"
          value={formData.barcode}
          onChange={(e) => handleChange('barcode', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Impuesto</InputLabel>
          <Select
            value={formData.tax}
            onChange={(e) => handleChange('tax', e.target.value)}
            label="Impuesto"
          >
            <MenuItem value={0}>0% - Exento</MenuItem>
            <MenuItem value={8}>8% - Reducido</MenuItem>
            <MenuItem value={16}>16% - General</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Descripción"
          multiline
          rows={3}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Descripción detallada del producto..."
        />
      </Grid>

      {/* Información de cálculo automático */}
      {formData.price > 0 && formData.cost > 0 && (
        <Grid item xs={12}>
          <Alert severity="info">
            <strong>Análisis de precios:</strong><br />
            • Margen de ganancia: {(((formData.price - formData.cost) / formData.cost) * 100).toFixed(1)}%<br />
            • Ganancia por unidad: ${(formData.price - formData.cost).toFixed(2)}<br />
            • Valor total en stock: ${(formData.stock * formData.cost).toFixed(2)}
          </Alert>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductForm;
