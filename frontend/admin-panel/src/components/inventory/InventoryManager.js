// frontend/admin-panel/src/components/inventory/InventoryManager.js
import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, Typography,
  TextField, Button, Box, Alert, Chip
} from '@mui/material';
import { Add, Warning, Inventory } from '@mui/icons-material';
import { useBusiness } from '../../contexts/BusinessContext';

const InventoryManager = () => {
  const [products, setProducts] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const { selectedBusiness } = useBusiness();

  useEffect(() => {
    // Simular datos de inventario
    const mockProducts = [
      { id: 1, name: 'Producto A', sku: 'SKU001', stock: 15, minStock: 10, price: 100 },
      { id: 2, name: 'Producto B', sku: 'SKU002', stock: 5, minStock: 8, price: 200 },
      { id: 3, name: 'Producto C', sku: 'SKU003', stock: 20, minStock: 5, price: 150 }
    ];
    
    setProducts(mockProducts);
    checkLowStock(mockProducts);
  }, [selectedBusiness]);

  const checkLowStock = (productsList) => {
    const alerts = productsList.filter(product => product.stock <= product.minStock);
    setLowStockAlerts(alerts);
  };

  const updateStock = (productId, newStock) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, stock: newStock } : product
    );
    
    setProducts(updatedProducts);
    checkLowStock(updatedProducts);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Inventario
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Control de stock y alertas para {selectedBusiness?.name}
        </Typography>
      </Box>

      {lowStockAlerts.length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="h6">Alertas de Stock Bajo</Typography>
          {lowStockAlerts.map(product => (
            <Box key={product.id} sx={{ mt: 1 }}>
              • {product.name} - Solo {product.stock} unidades restantes
            </Box>
          ))}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Productos en Inventario
              </Typography>
              
              {products.map(product => (
                <Box key={product.id} sx={{ 
                  p: 2, 
                  mb: 2, 
                  border: '1px solid', 
                  borderColor: product.stock <= product.minStock ? 'warning.main' : 'grey.200',
                  borderRadius: 1
                }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle1">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        SKU: {product.sku}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} md={3}>
                      <TextField
                        type="number"
                        label="Stock Actual"
                        value={product.stock}
                        onChange={(e) => updateStock(product.id, parseInt(e.target.value))}
                        fullWidth
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={3}>
                      <Typography variant="body2">
                        Mínimo: {product.minStock}
                      </Typography>
                      <Typography variant="body2">
                        Precio: ${product.price}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} md={2}>
                      {product.stock <= product.minStock && (
                        <Chip 
                          icon={<Warning />} 
                          label="Bajo Stock" 
                          color="warning" 
                          size="small" 
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen de Inventario
              </Typography>
              
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Inventory sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4">
                  {products.reduce((sum, product) => sum + product.stock, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Unidades en Stock
                </Typography>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Productos con stock bajo: {lowStockAlerts.length}
                </Typography>
                <Typography variant="body2">
                  Valor total: $
                  {products.reduce((sum, product) => sum + (product.stock * product.price), 0)
                   .toLocaleString('es-VE')}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InventoryManager;