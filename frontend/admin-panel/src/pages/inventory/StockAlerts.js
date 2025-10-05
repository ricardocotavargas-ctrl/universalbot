import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Card, CardContent,
  Grid, Chip, Alert, Button
} from '@mui/material';
import { Warning, Inventory, LocalShipping } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const StockAlerts = () => {
  const { user } = useAuth();
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLowStockAlerts = async () => {
    try {
      const response = await api.get('/api/inventory/alerts/low-stock');
      if (response.data.success) {
        setLowStockProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error loading stock alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLowStockAlerts();
  }, []);

  const getStockStatus = (product) => {
    if (product.stock === 0) return { severity: 'error', label: 'AGOTADO' };
    if (product.stock <= product.minStock) return { severity: 'warning', label: 'STOCK BAJO' };
    return { severity: 'info', label: 'EN STOCK' };
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          <Warning sx={{ mr: 2, color: 'warning.main' }} />
          Alertas de Stock
        </Typography>
        <Typography color="text.secondary">
          Productos con stock bajo o agotado • {user?.businessName || 'Tu Negocio'}
        </Typography>
      </Box>

      {lowStockProducts.length === 0 ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          ¡Excelente! No hay productos con stock bajo.
        </Alert>
      ) : (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Tienes {lowStockProducts.length} producto(s) que necesitan atención.
        </Alert>
      )}

      <Grid container spacing={3}>
        {lowStockProducts.map((product) => {
          const status = getStockStatus(product);
          const stockPercentage = (product.stock / product.minStock) * 100;
          
          return (
            <Grid item xs={12} md={6} key={product._id}>
              <Card 
                sx={{ 
                  borderLeft: `4px solid`,
                  borderColor: status.severity === 'error' ? 'error.main' : 
                              status.severity === 'warning' ? 'warning.main' : 'info.main'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Código: {product.code} {product.category && `• ${product.category}`}
                      </Typography>
                      {product.supplier && (
                        <Typography variant="caption" color="text.secondary">
                          Proveedor: {product.supplier}
                        </Typography>
                      )}
                    </Box>
                    <Chip 
                      label={status.label}
                      color={status.severity}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Stock Actual:</Typography>
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color={status.severity === 'error' ? 'error.main' : 'warning.main'}
                      >
                        {product.stock} unidades
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Stock Mínimo:</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {product.minStock} unidades
                      </Typography>
                    </Box>
                  </Box>

                  {/* Barra de progreso */}
                  <Box sx={{ 
                    width: '100%', 
                    height: 8, 
                    backgroundColor: 'grey.200', 
                    borderRadius: 4,
                    overflow: 'hidden',
                    mb: 2
                  }}>
                    <Box 
                      sx={{ 
                        height: '100%',
                        backgroundColor: status.severity === 'error' ? 'error.main' : 'warning.main',
                        width: `${Math.min(stockPercentage, 100)}%`
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<Inventory />}
                    >
                      Ajustar Stock
                    </Button>
                    <Button 
                      variant="contained" 
                      size="small"
                      startIcon={<LocalShipping />}
                    >
                      Ordenar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {lowStockProducts.length === 0 && !loading && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Inventory sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" color="success.main" gutterBottom>
              Todo bajo control
            </Typography>
            <Typography color="text.secondary">
              Todos tus productos tienen stock suficiente.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default StockAlerts;
