// frontend/admin-panel/src/pages/sales/components/PriceEditor.js
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Typography, Box,
  InputAdornment, Slider, Chip
} from '@mui/material';
import { AttachMoney, Discount, PriceCheck } from '@mui/icons-material';

const PriceEditor = ({ product, open, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const calculateDiscount = (price, discount) => {
    return price * (1 - discount / 100);
  };

  const handlePriceChange = (field, value) => {
    const newValue = parseFloat(value) || 0;
    setEditedProduct(prev => ({
      ...prev,
      [field]: newValue
    }));

    // Calcular precio final automáticamente
    if (field === 'price' || field === 'discount') {
      const finalPrice = calculateDiscount(
        field === 'price' ? newValue : prev.price,
        field === 'discount' ? newValue : prev.discount
      );
      setEditedProduct(prev => ({
        ...prev,
        finalPrice: Math.max(finalPrice, prev.minPrice || 0)
      }));
    }
  };

  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PriceCheck />
          Editar Precios - {product?.name}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Precio Base"
              type="number"
              value={editedProduct?.price || 0}
              onChange={(e) => handlePriceChange('price', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              inputProps={{ min: 0, step: "0.01" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Precio Mínimo"
              type="number"
              value={editedProduct?.minPrice || 0}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              inputProps={{ min: 0, step: "0.01" }}
              helperText="Precio mínimo permitido"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Descuento: {discountPercentage}%</Typography>
            <Slider
              value={discountPercentage}
              onChange={(e, newValue) => {
                setDiscountPercentage(newValue);
                handlePriceChange('discount', newValue);
              }}
              min={0}
              max={50}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Precio Final"
              type="number"
              value={editedProduct?.finalPrice || editedProduct?.price || 0}
              onChange={(e) => handlePriceChange('finalPrice', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              sx={{
                backgroundColor: 'action.hover',
                '& .MuiInputBase-input': {
                  fontWeight: 'bold',
                  color: 'primary.main'
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={`Ganancia: $${((editedProduct?.finalPrice || 0) - (editedProduct?.cost || 0)).toFixed(2)}`}
                color="success"
                variant="outlined"
              />
              <Chip
                label={`Margen: ${(((editedProduct?.finalPrice || 0) - (editedProduct?.cost || 0)) / (editedProduct?.finalPrice || 1) * 100).toFixed(1)}%`}
                color="info"
                variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" startIcon={<PriceCheck />}>
          Aplicar Precios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PriceEditor;