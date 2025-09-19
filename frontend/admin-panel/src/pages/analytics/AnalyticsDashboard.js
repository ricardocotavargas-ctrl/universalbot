import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Tabs, Tab, Button, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  TrendingUp, People, AttachMoney, Inventory, ShowChart, Dashboard
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('month');

  const dashboardData = {
    overview: {
      totalSales: 125000,
      totalCustomers: 245,
      conversionRate: 12.5,
      averageOrder: 85.50
    },
    trends: {
      salesGrowth: 15.8,
      customerGrowth: 8.2,
      revenueGrowth: 22.3
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard Analítico
        </Typography>
        <Typography color="text.secondary">
          Métricas y KPIs de tu negocio en tiempo real
        </Typography>
      </Box>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Rango de Tiempo</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Rango de Tiempo"
            >
              <MenuItem value="week">Esta semana</MenuItem>
              <MenuItem value="month">Este mes</MenuItem>
              <MenuItem value="quarter">Este trimestre</MenuItem>
              <MenuItem value="year">Este año</MenuItem>
            </Select>
          </FormControl>
          
          <Button variant="outlined" startIcon={<ShowChart />}>
            Personalizar Dashboard
          </Button>
        </Box>
      </UBCard>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Ventas Totales</Typography>
              </Box>
              <Typography variant="h4">{formatCurrency(dashboardData.overview.totalSales)}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp color="success" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +{formatPercentage(dashboardData.trends.salesGrowth)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People color="secondary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Clientes</Typography>
              </Box>
              <Typography variant="h4">{dashboardData.overview.totalCustomers}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp color="success" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +{formatPercentage(dashboardData.trends.customerGrowth)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Inventory color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Ticket Promedio</Typography>
              </Box>
              <Typography variant="h4">{formatCurrency(dashboardData.overview.averageOrder)}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp color="success" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +5.2%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShowChart color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Tasa de Conversión</Typography>
              </Box>
              <Typography variant="h4">{formatPercentage(dashboardData.overview.conversionRate)}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp color="success" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +2.1%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<Dashboard />} label="Resumen" />
            <Tab icon={<TrendingUp />} label="Tendencias" />
            <Tab icon={<People />} label="Clientes" />
            <Tab icon={<Inventory />} label="Productos" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Ventas Mensuales
                </Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Gráfico de ventas mensuales aquí...
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Distribución de Ventas
                </Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    Gráfico circular aquí...
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Tendencias y Pronósticos
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Gráfico de tendencias aquí...
              </Typography>
            </Box>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Comportamiento del Cliente
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Análisis de clientes aquí...
              </Typography>
            </Box>
          </Paper>
        )}

        {activeTab === 3 && (
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Desempeño de Productos
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Análisis de productos aquí...
              </Typography>
            </Box>
          </Paper>
        )}
      </UBCard>

      {/* Métricas Rápidas */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rendimiento del Día
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Ventas Hoy:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {formatCurrency(1250)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Clientes Nuevos:</Typography>
                  <Typography variant="body2" fontWeight="bold">8</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Pedidos:</Typography>
                  <Typography variant="body2" fontWeight="bold">15</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Metas del Mes
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Ventas:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {formatCurrency(125000)} / {formatCurrency(150000)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Clientes:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    245 / 300
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Cumplimiento:</Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    83.3%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alertas y Notificaciones
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, p: 1, bgcolor: 'warning.light', borderRadius: 1 }}>
                  <Typography variant="body2">Stock Bajo:</Typography>
                  <Typography variant="body2" fontWeight="bold">5 productos</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'info.light', borderRadius: 1 }}>
                  <Typography variant="body2">Clientes Inactivos:</Typography>
                  <Typography variant="body2" fontWeight="bold">12 clientes</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalyticsDashboard;