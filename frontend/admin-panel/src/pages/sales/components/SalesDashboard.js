// frontend/admin-panel/src/pages/sales/components/SalesDashboard.js
import React from 'react';
import {
  Box, Paper, Typography, Grid, Chip,
  LinearProgress, IconButton
} from '@mui/material';
import {
  AttachMoney, ShoppingCart, People, Inventory,
  TrendingUp, Refresh
} from '@mui/icons-material';

const SalesDashboard = ({ salesData, clients, products, onRefresh }) => {
  const stats = {
    totalSales: salesData.reduce((sum, sale) => sum + sale.total, 0),
    totalTransactions: salesData.length,
    activeClients: new Set(salesData.map(sale => sale.clienteId)).size,
    lowStockProducts: products.filter(p => p.stock <= p.min_stock).length
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const StatCard = ({ icon, title, value, subtitle, color = 'primary' }) => (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4" component="div" color={color}>
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
    </Paper>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Dashboard de Ventas
        </Typography>
        <IconButton onClick={onRefresh} color="primary">
          <Refresh />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={<AttachMoney sx={{ fontSize: 40 }} />}
            title="Ventas Totales"
            value={formatCurrency(stats.totalSales)}
            subtitle="Este mes"
            color="success"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            icon={<ShoppingCart sx={{ fontSize: 40 }} />}
            title="Transacciones"
            value={stats.totalTransactions}
            subtitle="Ventas realizadas"
            color="info"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            icon={<People sx={{ fontSize: 40 }} />}
            title="Clientes Activos"
            value={stats.activeClients}
            subtitle="Compraron este mes"
            color="warning"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            icon={<Inventory sx={{ fontSize: 40 }} />}
            title="Stock Bajo"
            value={stats.lowStockProducts}
            subtitle="Productos por reabastecer"
            color="error"
          />
        </Grid>

        {/* Productos más vendidos */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Productos Más Vendidos
            </Typography>
            {products.slice(0, 5).map((product, index) => (
              <Box key={product.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{product.name}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {product.stock} unidades
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((product.stock / product.min_stock) * 100, 100)}
                  color={product.stock <= product.min_stock ? 'error' : 'success'}
                />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Últimas ventas */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Últimas Ventas
            </Typography>
            {salesData.slice(0, 5).map((sale, index) => (
              <Box key={sale.id} sx={{ mb: 2, p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" fontWeight="medium">
                    {sale.documentNumber}
                  </Typography>
                  <Chip
                    label={formatCurrency(sale.total)}
                    size="small"
                    color="primary"
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {new Date(sale.fecha).toLocaleDateString()}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesDashboard;