// frontend/admin-panel/src/pages/inventory/components/InventoryDashboard.js
import React from 'react';
import {
  Box, Typography, Grid, Paper, LinearProgress,
  Chip, IconButton
} from '@mui/material';
import { TrendingUp, TrendingDown, Inventory } from '@mui/icons-material';

const InventoryDashboard = ({ products }) => {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.stock * p.cost), 0);
  const avgStockValue = totalValue / totalProducts;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Distribución por Categoría
          </Typography>
          {/* Gráfico de categorías */}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Valor de Inventario
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            ${totalValue.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Valor promedio por producto: ${avgStockValue.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default InventoryDashboard;