import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  LinearProgress, Chip, Button, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  Inventory, TrendingUp, Warning, AttachMoney, ShowChart, Download
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const InventoryAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  const inventoryData = {
    totalValue: 185000,
    totalItems: 2450,
    turnoverRate: 4.2,
    stockOutRate: 2.8,
    lowStockItems: 15,
    categories: [
      { name: 'Bebidas', value: 75000, percentage: 40.5 },
      { name: 'Alimentos', value: 45000, percentage: 24.3 },
      { name: 'Repostería', value: 35000, percentage: 18.9 },
      { name: 'Suministros', value: 30000, percentage: 16.2 }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Analytics de Inventario
        </Typography>
        <Typography color="text.secondary">
          Análisis de stock, rotación y valor de inventario
        </Typography>
      </Box>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Período</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Período"
            >
              <MenuItem value="week">Semanal</MenuItem>
              <MenuItem value="month">Mensual</MenuItem>
              <MenuItem value="quarter">Trimestral</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<Download />}>
            Exportar Reporte
          </Button>
        </Box>
      </UBCard>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Valor Total</Typography>
              </Box>
              <Typography variant="h4">{formatCurrency(inventoryData.totalValue)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Inventory color="secondary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Items</Typography>
              </Box>
              <Typography variant="h4">{inventoryData.totalItems}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Rotación</Typography>
              </Box>
              <Typography variant="h4">{inventoryData.turnoverRate}x</Typography>
              <Typography variant="body2" color="success.main">
                +0.8x vs período anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Warning color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Bajo Stock</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {inventoryData.lowStockItems}
              </Typography>
              <Typography variant="body2">
                productos necesitan atención
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UBCard>
            <Typography variant="h6" gutterBottom>
              Distribución por Categoría
            </Typography>
            <Box sx={{ mt: 2 }}>
              {inventoryData.categories.map((category, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{category.name}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {formatCurrency(category.value)} ({category.percentage}%)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={category.percentage}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Box>
          </UBCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <UBCard>
            <Typography variant="h6" gutterBottom>
              Métricas de Desempeño
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">
                    {inventoryData.turnoverRate}x
                  </Typography>
                  <Typography variant="body2">Rotación Anual</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">
                    {inventoryData.stockOutRate}%
                  </Typography>
                  <Typography variant="body2">Tasa de Stock Out</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    92%
                  </Typography>
                  <Typography variant="body2">Precisión Inventario</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">
                    18 días
                  </Typography>
                  <Typography variant="body2">Stock Promedio</Typography>
                </Paper>
              </Grid>
            </Grid>
          </UBCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InventoryAnalytics;