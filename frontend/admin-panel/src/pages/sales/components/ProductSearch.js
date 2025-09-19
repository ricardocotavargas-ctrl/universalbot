// frontend/admin-panel/src/pages/sales/components/ProductSearch.js
import React, { useState, useMemo } from 'react';
import {
  TextField, List, ListItem, ListItemText, ListItemSecondaryAction,
  Typography, Box, Chip, InputAdornment
} from '@mui/material';
import { Search, Inventory } from '@mui/icons-material';

const ProductSearch = ({ products, onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    
    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.codigo.toLowerCase().includes(term) ||
      product.name.toLowerCase().includes(term) ||
      (product.barcode && product.barcode.toLowerCase().includes(term))
    );
  }, [products, searchTerm]);

  const handleProductSelect = (product) => {
    onProductSelect(product);
    setSearchTerm('');
  };

  const getStockColor = (stock, minStock) => {
    if (stock === 0) return 'error';
    if (stock <= minStock) return 'warning';
    return 'success';
  };

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Buscar producto por código, nombre o código de barras..."
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

      {searchTerm && filteredProducts.length > 0 && (
        <List sx={{ maxHeight: 300, overflow: 'auto', mt: 1, border: '1px solid', borderColor: 'divider' }}>
          {filteredProducts.map((product) => (
            <ListItem
              key={product.id}
              button
              onClick={() => handleProductSelect(product)}
              sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2">{product.name}</Typography>
                    <Chip
                      size="small"
                      label={`Stock: ${product.stock}`}
                      color={getStockColor(product.stock, product.min_stock)}
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
                    <Typography variant="caption">Código: {product.codigo}</Typography>
                    {product.barcode && (
                      <Typography variant="caption">Barcode: {product.barcode}</Typography>
                    )}
                    <Typography variant="caption" color="primary">
                      Precio: ${product.price}
                    </Typography>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Chip
                  icon={<Inventory />}
                  label="Agregar"
                  color="primary"
                  onClick={() => handleProductSelect(product)}
                  size="small"
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      {searchTerm && filteredProducts.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          No se encontraron productos
        </Typography>
      )}
    </Box>
  );
};

export default ProductSearch;