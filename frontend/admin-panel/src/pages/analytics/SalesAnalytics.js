import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Tabs, Tab, FormControl, InputLabel, Select, MenuItem, Button
} from '@mui/material';
import {
  TrendingUp, ShoppingCart, AttachMoney, People, ShowChart, Download
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const SalesAnalytics = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('month');

  const salesData = {
    total: 125000,
    growth: 15.8,
    averageOrder: 85.50,
    conversionRate: 12.5,
    monthlyTrend: [
      { month: 'Ene', sales: 10000, orders: 120 },
      { month: 'Feb', sales: 12000, orders: 140 },
      { month: 'Mar', sales: 15000, orders: 175 },
      { month: 'Abr', sales: 13000, orders: 150 },
      { month: 'May', sales: 16000, orders: 185 },
      { month: 'Jun', sales: 18000, orders: 210 }
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
          Analytics de Ventas
        </Typography>
        <Typography color="text.secondary">
          Análisis detallado del desempeño de ventas
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
              <MenuItem value="year">Anual</MenuItem>
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
                <Typography color="text.secondary">Ventas Totales</Typography>
              </Box>
              <Typography variant="h4">{formatCurrency(salesData.total)}</Typography>
              <Typography variant="body2" color="success.main">
                +{salesData.growth}% vs período anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingCart color="secondary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Ticket Promedio</Typography>
              </Box>
              <Typography variant="h4">{formatCurrency(salesData.averageOrder)}</Typography>
              <Typography variant="body2" color="success.main">
                +5.2% vs período anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Tasa de Conversión</Typography>
              </Box>
              <Typography variant="h4">{salesData.conversionRate}%</Typography>
              <Typography variant="body2" color="success.main">
                +2.1% vs período anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Crecimiento</Typography>
              </Box>
              <Typography variant="h4">{salesData.growth}%</Typography>
              <Typography variant="body2" color="success.main">
                Meta: 12%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<ShowChart />} label="Tendencias" />
            <Tab icon={<ShoppingCart />} label="Por Producto" />
            <Tab icon={<People />} label="Por Vendedor" />
            <Tab icon={<AttachMoney />} label="Por Canal" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Tendencia de Ventas Mensuales
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Gráfico de tendencias de ventas...
              </Typography>
            </Box>
          </Paper>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Ventas por Producto
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Análisis de productos más vendidos...
              </Typography>
            </Box>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Desempeño por Vendedor
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Ranking de vendedores...
              </Typography>
            </Box>
          </Paper>
        )}

        {activeTab === 3 && (
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Ventas por Canal
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Distribución por canales de venta...
              </Typography>
            </Box>
          </Paper>
        )}
      </UBCard>
    </Container>
  );
};

export default SalesAnalytics;