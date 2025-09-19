// frontend/admin-panel/src/pages/inventory/Inventory.js
import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardContent,
  Button, Chip, LinearProgress, Alert
} from '@mui/material';
import {
  Inventory, TrendingUp, Warning, Add,
  Scanner, SwapHoriz, History
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    categories: []
  });

  const [products] = useState([
    {
      id: 1, name: 'Producto Premium', sku: 'PRD-001', category: 'Electrónicos',
      stock: 15, minStock: 5, cost: 150.00, price: 299.99, status: 'active'
    },
    {
      id: 2, name: 'Kit Herramientas', sku: 'PRD-002', category: 'Herramientas',
      stock: 3, minStock: 5, cost: 45.00, price: 89.99, status: 'low-stock'
    },
    {
      id: 3, name: 'Accesorio Oficina', sku: 'PRD-003', category: 'Oficina',
      stock: 0, minStock: 10, cost: 25.00, price: 49.99, status: 'out-of-stock'
    }
  ]);

  useEffect(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.stock * p.cost), 0);
    const lowStockItems = products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
    const outOfStockItems = products.filter(p => p.stock === 0).length;

    setInventoryData({
      totalProducts,
      totalValue,
      lowStockItems,
      outOfStockItems,
      categories: [...new Set(products.map(p => p.category))]
    });
  }, [products]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const StatCard = ({ icon, title, value, subtitle, color = 'primary' }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={`${color}.main`}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ color: `${color}.main` }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Inventario
        </Typography>
        <Typography color="text.secondary">
          Control completo de stock y productos
        </Typography>
      </Box>

      {/* Alertas */}
      {(inventoryData.lowStockItems > 0 || inventoryData.outOfStockItems > 0) && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">
            Atención requerida: {inventoryData.lowStockItems} productos con stock bajo y {inventoryData.outOfStockItems} agotados
          </Typography>
        </Alert>
      )}

      {/* KPIs */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<Inventory sx={{ fontSize: 40 }} />}
            title="Total Productos"
            value={inventoryData.totalProducts}
            subtitle="En inventario"
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            title="Valor Total"
            value={formatCurrency(inventoryData.totalValue)}
            subtitle="Valor en stock"
            color="success"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<Warning sx={{ fontSize: 40 }} />}
            title="Stock Bajo"
            value={inventoryData.lowStockItems}
            subtitle="Necesitan reabastecimiento"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<Warning sx={{ fontSize: 40 }} />}
            title="Sin Stock"
            value={inventoryData.outOfStockItems}
            subtitle="Productos agotados"
            color="error"
          />
        </Grid>
      </Grid>

      {/* Acciones Rápidas */}
      <UBCard title="Acciones Rápidas" sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          {[
            { icon: <Add />, label: 'Nuevo Producto', path: '/inventory/products' },
            { icon: <Scanner />, label: 'Escáner', path: '/inventory/scanner' },
            { icon: <SwapHoriz />, label: 'Ajustes', path: '/inventory/adjustments' },
            { icon: <SwapHoriz />, label: 'Traslados', path: '/inventory/transfers' },
            { icon: <History />, label: 'Movimientos', path: '/inventory/movements' },
            { icon: <Warning />, label: 'Alertas', path: '/inventory/alerts' }
          ].map((action, index) => (
            <Grid item xs={6} md={2} key={index}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={action.icon}
                onClick={() => window.location.href = action.path}
              >
                {action.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </UBCard>

      {/* Productos que necesitan atención */}
      <UBCard title="Productos que Necesitan Atención">
        {products.filter(p => p.stock <= p.minStock).map((product) => (
          <Box key={product.id} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography fontWeight="medium">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  SKU: {product.sku} | Categoría: {product.category}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip
                  label={product.stock === 0 ? 'AGOTADO' : `Stock bajo: ${product.stock}`}
                  color={product.stock === 0 ? 'error' : 'warning'}
                />
                <Typography variant="body2" color="text.secondary">
                  Mínimo: {product.minStock} unidades
                </Typography>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min((product.stock / product.minStock) * 100, 100)}
              color={product.stock === 0 ? 'error' : 'warning'}
              sx={{ mt: 1, height: 6 }}
            />
          </Box>
        ))}
      </UBCard>
    </Container>
  );
};

export default Inventory;