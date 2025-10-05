import React from 'react';
import {
  Grid, TextField, FormControl, InputLabel,
  Select, MenuItem, InputAdornment
} from '@mui/material';

const ProductForm = ({ formData, onChange, errors = {} }) => {
  const handleChange = (field, value) => {
    onChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <Grid container spacing={2}>
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
          label="Código *"
          value={formData.code}
          onChange={(e) => handleChange('code', e.target.value)}
          error={!!errors.code}
          helperText={errors.code}
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
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Categoría"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
        />
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
            value={formData.tax || 16}
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
        />
      </Grid>
    </Grid>
  );
};

export default ProductForm;
