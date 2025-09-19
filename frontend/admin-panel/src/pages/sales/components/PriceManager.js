// frontend/admin-panel/src/pages/sales/components/PriceManager.js
import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Typography, Box,
  InputAdornment, Slider, Chip, Tabs, Tab,
  FormControlLabel, Switch, Select, MenuItem
} from '@mui/material';
import {
  AttachMoney, Discount, PriceCheck, TrendingUp,
  Loyalty, Business, Person
} from '@mui/icons-material';

const PriceManager = ({ product, client, open, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [priceConfig, setPriceConfig] = useState({
    basePrice: product?.price || 0,
    minPrice: product?.minPrice || 0,
    finalPrice: product?.finalPrice || product?.price || 0,
    discountType: 'percentage',
    discountValue: 0,
    applyToAll: false
  });

  const priceTiers = [
    { name: 'Precio Base', value: product?.price || 0 },
    { name: 'Precio Mayorista', value: (product?.price || 0) * 0.85 },
    { name: 'Precio Distribuidor', value: (product?.price || 0) * 0.75 },
    { name: 'Precio Especial', value: (product?.price || 0) * 0.70 }
  ];

  useEffect(() => {
    if (client?.tipoCliente) {
      applyClientDiscount(client.tipoCliente);
    }
  }, [client]);

  const applyClientDiscount = (tipoCliente) => {
    let discount = 0;
    switch (tipoCliente) {
      case 'premium':
        discount = 15;
        break;
      case 'mayorista':
        discount = 25;
        break;
      case 'distribuidor':
        discount = 35;
        break;
      default:
        discount = 0;
    }
    
    setPriceConfig(prev => ({
      ...prev,
      discountValue: discount,
      finalPrice: calculateDiscount(prev.basePrice, discount)
    }));
  };

  const calculateDiscount = (price, discount) => {
    return Math.max(price * (1 - discount / 100), priceConfig.minPrice);
  };

  const handleSave = () => {
    onSave({
      ...product,
      finalPrice: priceConfig.finalPrice,
      discountApplied: priceConfig.discountValue
    });
    onClose();
  };

  const applyTierPrice = (tierPrice) => {
    setPriceConfig(prev => ({
      ...prev,
      finalPrice: Math.max(tierPrice, prev.minPrice)
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PriceCheck />
          Gestión Inteligente de Precios - {product?.name}
        </Box>
        {client && (
          <Typography variant="body2" color="text.secondary">
            Cliente: {client.nombre} ({client.tipoCliente || 'standard'})
          </Typography>
        )}
      </DialogTitle>
      
      <DialogContent>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab icon={<Discount />} label="Descuentos" />
          <Tab icon={<TrendingUp />} label="Escalas" />
          <Tab icon={<Loyalty />} label="Clientes" />
        </Tabs>

        {activeTab === 0 && (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Precio Base"
                type="number"
                value={priceConfig.basePrice}
                onChange={(e) => setPriceConfig(prev => ({
                  ...prev,
                  basePrice: parseFloat(e.target.value) || 0
                }))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Precio Mínimo"
                type="number"
                value={priceConfig.minPrice}
                onChange={(e) => setPriceConfig(prev => ({
                  ...prev,
                  minPrice: parseFloat(e.target.value) || 0
                }))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Descuento: {priceConfig.discountValue}%</Typography>
              <Slider
                value={priceConfig.discountValue}
                onChange={(e, newValue) => {
                  setPriceConfig(prev => ({
                    ...prev,
                    discountValue: newValue,
                    finalPrice: calculateDiscount(prev.basePrice, newValue)
                  }));
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
                value={priceConfig.finalPrice.toFixed(2)}
                onChange={(e) => setPriceConfig(prev => ({
                  ...prev,
                  finalPrice: Math.max(parseFloat(e.target.value) || 0, prev.minPrice)
                }))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
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
          </Grid>
        )}

        {activeTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Escalas de Precio</Typography>
            <Grid container spacing={2}>
              {priceTiers.map((tier, index) => (
                <Grid item xs={6} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                    onClick={() => applyTierPrice(tier.value)}
                  >
                    <Typography variant="subtitle2">{tier.name}</Typography>
                    <Typography variant="h6" color="primary">
                      {tier.value.toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {activeTab === 2 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Descuentos por Tipo de Cliente</Typography>
            <Grid container spacing={2}>
              {[
                { type: 'standard', label: 'Cliente Regular', discount: 0 },
                { type: 'premium', label: 'Cliente Premium', discount: 15 },
                { type: 'mayorista', label: 'Mayorista', discount: 25 },
                { type: 'distribuidor', label: 'Distribuidor', discount: 35 }
              ].map((clientType, index) => (
                <Grid item xs={6} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      border: '1px solid',
                      borderColor: client?.tipoCliente === clientType.type ? 'primary.main' : 'divider',
                      borderRadius: 2,
                      cursor: 'pointer',
                      backgroundColor: client?.tipoCliente === clientType.type ? 'primary.light' : 'background.paper',
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                    onClick={() => applyClientDiscount(clientType.type)}
                  >
                    <Typography variant="subtitle2">{clientType.label}</Typography>
                    <Typography variant="body2">
                      Descuento: {clientType.discount}%
                    </Typography>
                    {client?.tipoCliente === clientType.type && (
                      <Chip label="Actual" size="small" color="primary" sx={{ mt: 1 }} />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" startIcon={<PriceCheck />}>
          Aplicar Precio
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PriceManager;