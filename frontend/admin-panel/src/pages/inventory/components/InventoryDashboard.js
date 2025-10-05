import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, CardContent, Typography,
  LinearProgress, Chip, Button
} from '@mui/material';
import {
  Inventory, TrendingUp, Warning, Assessment,
  LocalShipping, AttachMoney, ShoppingCart
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../services/api';

const InventoryDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStockCount: 0,
    inventoryValue: 0,
    potentialProfit: 0
  });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar productos
      const productsResponse = await api.get('/api/inventory');
      const alertsResponse = await api.get('/api/inventory/alerts/low-stock');
      const analyticsResponse = await api.get('/api/inventory/analytics/value');

      if (productsResponse.data.success) {
        const products = productsResponse.data.products;
        setStats({
          totalProducts: products.length,
          totalStock: products.reduce((sum, p) => sum + p.stock, 0),
          lowStockCount: alertsResponse.data.success ? alertsResponse.data.products.length : 0,
          inventoryValue: analyticsResponse.data.success ? analyticsResponse.data.analytics.totalCost : 0,
          potentialProfit: analyticsResponse.data.success ? analyticsResponse.data.analytics.potentialProfit : 0
        });
      }

      if (alertsResponse.data.success) {
        setLowStockProducts(alertsResponse.data.products.slice(0, 5));
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const StatCard = ({ icon, title, value, subtitle, color = 'primary' }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight={700}>
              {loading ? '-' : value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ color: `${color}.main`, fontSize: 48 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Inventory />}
            title="Total Productos"
            value={stats.totalProducts}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<ShoppingCart />}
            title="Stock Total"
            value={stats.totalStock}
            subtitle="unidades"
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Warning />}
            title="Alertas Stock"
            value={stats.lowStockCount}
            subtitle="necesitan atención"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<AttachMoney />}
            title="Valor Inventario"
            value={`$${stats.inventoryValue.toLocaleString()}`}
            subtitle={`$${stats.potentialProfit.toLocaleString()} ganancia potencial`}
            color="success"
          />
        </Grid>
      </Grid>

      {/* Alertas de Stock Bajo */}
      {lowStockProducts.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" color="warning.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Warning />
                Productos con Stock Bajo
              </Typography>
              <Chip label={`${lowStockProducts.length} productos`} color="warning" />
            </Box>

            <Grid container spacing={2}>
              {lowStockProducts.map((product) => (
                <Grid item xs={12} md={6} key={product._id}>
                  <Box sx={{ 
                    p: 2, 
                    border: '1px solid', 
                    borderColor: 'warning.light',
                    borderRadius: 1,
                    backgroundColor: 'warning.light + 22'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography fontWeight={600}>{product.name}</Typography>
                      <Chip 
                        label={`${product.stock}/${product.minStock}`} 
                        color="warning" 
                        size="small" 
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {product.code} {product.category && `• ${product.category}`}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(product.stock / product.minStock) * 100} 
                      color="warning"
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Acciones Rápidas */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Acciones Rápidas
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Inventory />}
                href="/inventory"
              >
                Ver Inventario
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Add />}
                href="/inventory?new=true"
              >
                Nuevo Producto
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Assessment />}
                href="/inventory/adjustments"
              >
                Ajustar Stock
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<LocalShipping />}
                href="/inventory/alerts"
              >
                Ver Alertas
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InventoryDashboard;
