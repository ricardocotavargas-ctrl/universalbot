import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  BarChart,
  TrendingUp,
  PieChart,
  People,
  AttachMoney,
  ShoppingCart
} from '@mui/icons-material';
import UBCard from '../components/ui/UBCard';

const AdvancedStatistics = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [timeRange, setTimeRange] = useState('30d');

  const tabs = [
    { label: 'Ventas', value: 'sales' },
    { label: 'Clientes', value: 'customers' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Finanzas', value: 'finance' }
  ];

  const timeRanges = [
    { value: '7d', label: 'Últimos 7 días' },
    { value: '30d', label: 'Últimos 30 días' },
    { value: '90d', label: 'Últimos 90 días' },
    { value: 'ytd', label: 'Este año' }
  ];

  const salesData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ventas 2023',
        data: [12000, 19000, 15000, 21000, 24000, 28000],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)'
      },
      {
        label: 'Ventas 2024',
        data: [15000, 22000, 18000, 25000, 29000, 32000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)'
      }
    ]
  };

  const kpis = [
    {
      title: 'Crecimiento Ventas',
      value: '+25.3%',
      change: '+5.2% vs mes anterior',
      icon: <TrendingUp />,
      color: 'success'
    },
    {
      title: 'Nuevos Clientes',
      value: '124',
      change: '+18% vs mes anterior',
      icon: <People />,
      color: 'primary'
    },
    {
      title: 'Ticket Promedio',
      value: '$89.50',
      change: '+3.1% vs mes anterior',
      icon: <ShoppingCart />,
      color: 'warning'
    },
    {
      title: 'ROI Marketing',
      value: '4.2x',
      change: '+0.8x vs mes anterior',
      icon: <AttachMoney />,
      color: 'info'
    }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <BarChart sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>
                Estadísticas Avanzadas
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Análisis detallado del desempeño del negocio
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Filtros y Controles */}
        <UBCard sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Tabs
                value={currentTab}
                onChange={(e, newValue) => setCurrentTab(newValue)}
              >
                {tabs.map((tab, index) => (
                  <Tab key={tab.value} label={tab.label} />
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Rango de Tiempo</InputLabel>
                <Select
                  value={timeRange}
                  label="Rango de Tiempo"
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  {timeRanges.map((range) => (
                    <MenuItem key={range.value} value={range.value}>
                      {range.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </UBCard>

        {/* KPIs Principales */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {kpis.map((kpi, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <UBCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ 
                      backgroundColor: `${kpi.color}.main`,
                      borderRadius: '12px',
                      p: 1,
                      color: 'white'
                    }}>
                      {kpi.icon}
                    </Box>
                    <Typography variant="h4" fontWeight={700} color={`${kpi.color}.main`}>
                      {kpi.value}
                    </Typography>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {kpi.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {kpi.change}
                  </Typography>
                </CardContent>
              </UBCard>
            </Grid>
          ))}
        </Grid>

        {/* Gráfico Principal */}
        <UBCard title="Tendencia de Ventas">
          <Box sx={{ height: 400, position: 'relative' }}>
            {/* Aquí iría un gráfico de Chart.js o similar */}
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: 2
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <BarChart sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Gráfico de Tendencia de Ventas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  (Integrar con Chart.js o similar)
                </Typography>
              </Box>
            </Box>
          </Box>
        </UBCard>

        {/* Métricas Adicionales */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <UBCard title="Distribución de Ventas">
              <Box sx={{ height: 300 }}>
                {/* Gráfico de torta */}
                <Box sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  borderRadius: 2
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <PieChart sx={{ fontSize: 60, color: 'info.main', mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      Gráfico de Distribución
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <UBCard title="Rendimiento por Canal">
              <Box sx={{ height: 300 }}>
                {/* Gráfico de barras */}
                <Box sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  borderRadius: 2
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <BarChart sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      Rendimiento por Canal
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </UBCard>
          </Grid>
        </Grid>

        {/* Exportar Reportes */}
        <UBCard sx={{ mt: 3 }}>
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h6" gutterBottom>
              ¿Necesitas reportes más detallados?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Exporta reportes completos en PDF, Excel o compártelos con tu equipo
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="outlined">
                Exportar PDF
              </Button>
              <Button variant="outlined">
                Exportar Excel
              </Button>
              <Button variant="contained">
                Generar Reporte Personalizado
              </Button>
            </Box>
          </Box>
        </UBCard>
      </Box>
    </Container>
  );
};

export default AdvancedStatistics;