// frontend/admin-panel/src/pages/financial/FixedVariableCosts.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Tabs, Tab, Chip, LinearProgress, FormControl, InputLabel,
  Select, MenuItem, Button, IconButton, Tooltip, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import {
  TrendingUp, TrendingDown, AttachMoney, ShowChart,
  Download, CalendarToday, FilterList, Analytics,
  PieChart as PieChartIcon, BarChart as BarChartIcon, 
  Timeline, CompareArrows
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import { ResponsiveContainer, Pie, Cell, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ComposedChart, Area } from 'recharts';

const FixedVariableCosts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('last_6_months');
  const [costData, setCostData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo para análisis de costos
  const mockCostData = {
    summary: {
      totalCosts: 485000,
      fixedCosts: 285000,
      variableCosts: 200000,
      fixedPercentage: 58.8,
      variablePercentage: 41.2,
      costPerUnit: 24.25,
      breakEvenPoint: 12500
    },
    monthlyTrend: [
      { 
        month: 'Ene 2024', 
        fixed: 45000, 
        variable: 32000, 
        total: 77000,
        units: 1800,
        costPerUnit: 42.78
      },
      { 
        month: 'Feb 2024', 
        fixed: 45000, 
        variable: 35000, 
        total: 80000,
        units: 2000,
        costPerUnit: 40.00
      },
      { 
        month: 'Mar 2024', 
        fixed: 48000, 
        variable: 38000, 
        total: 86000,
        units: 2200,
        costPerUnit: 39.09
      },
      { 
        month: 'Abr 2024', 
        fixed: 48000, 
        variable: 42000, 
        total: 90000,
        units: 2400,
        costPerUnit: 37.50
      },
      { 
        month: 'May 2024', 
        fixed: 50000, 
        variable: 45000, 
        total: 95000,
        units: 2600,
        costPerUnit: 36.54
      },
      { 
        month: 'Jun 2024', 
        fixed: 50000, 
        variable: 48000, 
        total: 98000,
        units: 2800,
        costPerUnit: 35.00
      }
    ],
    fixedCostsBreakdown: [
      { category: 'Nómina', amount: 120000, percentage: 42.1, trend: 'stable' },
      { category: 'Alquiler', amount: 60000, percentage: 21.1, trend: 'stable' },
      { category: 'Servicios', amount: 40000, percentage: 14.0, trend: 'up' },
      { category: 'Seguros', amount: 30000, percentage: 10.5, trend: 'stable' },
      { category: 'Depreciación', amount: 20000, percentage: 7.0, trend: 'stable' },
      { category: 'Otros Fijos', amount: 15000, percentage: 5.3, trend: 'down' }
    ],
    variableCostsBreakdown: [
      { category: 'Materia Prima', amount: 80000, percentage: 40.0, trend: 'up' },
      { category: 'Comisiones', amount: 45000, percentage: 22.5, trend: 'up' },
      { category: 'Embalaje', amount: 30000, percentage: 15.0, trend: 'stable' },
      { category: 'Fletes', amount: 25000, percentage: 12.5, trend: 'down' },
      { category: 'Otros Variables', amount: 20000, percentage: 10.0, trend: 'stable' }
    ],
    efficiencyMetrics: {
      fixedCostCoverage: 3.8,
      variableCostRatio: 0.32,
      operatingLeverage: 2.5,
      costStructureHealth: 'good'
    }
  };

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setCostData(mockCostData);
      setLoading(false);
    }, 500);
  }, []);

  // FUNCIÓN CORREGIDA - Maneja valores undefined
  const formatCurrency = (amount) => {
    // Verificar si amount es undefined, null, o no es un número
    if (amount === undefined || amount === null || isNaN(amount)) {
      return new Intl.NumberFormat('es-VE', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(0);
    }
    
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return '0%';
    }
    return `${value}%`;
  };

  const CostMetricCard = ({ title, value, subtitle, trend, color = 'primary', icon }) => {
    const isPositive = trend >= 0;
    
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="text.secondary" gutterBottom variant="overline">
                {title}
              </Typography>
              <Typography variant="h4" color={`${color}.main`}>
                {typeof value === 'number' ? formatCurrency(value) : value}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
              {trend !== undefined && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  {isPositive ? <TrendingUp /> : <TrendingDown />}
                  <Typography variant="body2" color={isPositive ? 'success.main' : 'error.main'}>
                    {isPositive ? '+' : ''}{trend}% vs período anterior
                  </Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ color: `${color}.main` }}>
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const EfficiencyCard = ({ title, value, target, description, color = 'primary' }) => {
    const isGood = value >= target;
    const percentage = (value / target) * 100;
    
    return (
      <Card>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" color={isGood ? 'success.main' : 'error.main'}>
            {value || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={Math.min(percentage, 100)}
              color={isGood ? 'success' : 'error'}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary">
              Meta: {target}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f'];

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Typography>Cargando análisis de costos...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Análisis de Costos Fijos vs Variables
        </Typography>
        <Typography color="text.secondary">
          Gestión y optimización de la estructura de costos de la empresa
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography fontWeight="bold">
          Los costos fijos representan el {costData.summary?.fixedPercentage || 0}% de tu estructura total
        </Typography>
        <Typography variant="body2">
          Punto de equilibrio: {formatCurrency(costData.summary?.breakEvenPoint)}
        </Typography>
      </Alert>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <CostMetricCard
            title="Costos Totales"
            value={costData.summary?.totalCosts}
            subtitle="Últimos 6 meses"
            trend={12.5}
            color="primary"
            icon={<AttachMoney sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CostMetricCard
            title="Costos Fijos"
            value={costData.summary?.fixedCosts}
            subtitle={formatPercentage(costData.summary?.fixedPercentage)}
            trend={8.2}
            color="info"
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CostMetricCard
            title="Costos Variables"
            value={costData.summary?.variableCosts}
            subtitle={formatPercentage(costData.summary?.variablePercentage)}
            trend={18.7}
            color="warning"
            icon={<TrendingDown sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CostMetricCard
            title="Costo por Unidad"
            value={costData.summary?.costPerUnit}
            subtitle="Promedio"
            trend={-15.3}
            color="success"
            icon={<Analytics sx={{ fontSize: 40 }} />}
          />
        </Grid>
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Rango de Tiempo</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Rango de Tiempo"
            >
              <MenuItem value="last_3_months">Últimos 3 meses</MenuItem>
              <MenuItem value="last_6_months">Últimos 6 meses</MenuItem>
              <MenuItem value="last_12_months">Últimos 12 meses</MenuItem>
              <MenuItem value="ytd">Year to Date</MenuItem>
              <MenuItem value="custom">Personalizado</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Categoría"
            >
              <MenuItem value="all">Todas las categorías</MenuItem>
              <MenuItem value="fixed">Solo Fijos</MenuItem>
              <MenuItem value="variable">Solo Variables</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" startIcon={<Download />}>
            Exportar Análisis
          </Button>

          <Tooltip title="Análisis avanzado">
            <IconButton>
              <Analytics />
            </IconButton>
          </Tooltip>
        </Box>
      </UBCard>

      <UBCard>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab icon={<PieChartIcon />} label="Distribución" />
          <Tab icon={<BarChartIcon />} label="Tendencias" />
          <Tab icon={<Timeline />} label="Eficiencia" />
          <Tab icon={<CompareArrows />} label="Comparativa" />
          <Tab icon={<Analytics />} label="Análisis Detallado" />
        </Tabs>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Distribución Fijos vs Variables
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <>
                    <Pie
                      data={[
                        { name: 'Fijos', value: costData.summary?.fixedCosts || 0 },
                        { name: 'Variables', value: costData.summary?.variableCosts || 0 }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    >
                      <Cell fill="#8884d8" />
                      <Cell fill="#82ca9d" />
                    </Pie>
                    <RechartsTooltip formatter={(value) => [formatCurrency(value), '']} />
                    <Legend />
                  </>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Desglose de Costos Fijos
                </Typography>
                {costData.fixedCostsBreakdown?.map((cost, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {cost.category}
                        <Chip
                          label={cost.trend === 'up' ? '↑' : cost.trend === 'down' ? '↓' : '→'}
                          size="small"
                          color={
                            cost.trend === 'up' ? 'error' :
                            cost.trend === 'down' ? 'success' : 'default'
                          }
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(cost.amount)} ({cost.percentage}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={cost.percentage || 0}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Desglose de Costos Variables
                </Typography>
                <Grid container spacing={2}>
                  {costData.variableCostsBreakdown?.map((cost, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">
                            {cost.category}
                            <Chip
                              label={cost.trend === 'up' ? '↑' : cost.trend === 'down' ? '↓' : '→'}
                              size="small"
                              color={
                                cost.trend === 'up' ? 'error' :
                                cost.trend === 'down' ? 'success' : 'default'
                              }
                              sx={{ ml: 1 }}
                            />
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {formatCurrency(cost.amount)} ({cost.percentage}%)
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={cost.percentage || 0}
                          sx={{ height: 6, borderRadius: 4 }}
                          color="warning"
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tendencia de Costos Mensuales
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={costData.monthlyTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip formatter={(value, name) => 
                  [name === 'costPerUnit' ? `$${value}` : formatCurrency(value), 
                   name === 'costPerUnit' ? 'Costo por Unidad' : name]
                } />
                <Legend />
                <Bar yAxisId="left" dataKey="fixed" fill="#8884d8" name="Costos Fijos" />
                <Bar yAxisId="left" dataKey="variable" fill="#82ca9d" name="Costos Variables" />
                <Area yAxisId="right" dataKey="costPerUnit" fill="#ffc658" stroke="#ffc658" name="Costo por Unidad ($)" />
              </ComposedChart>
            </ResponsiveContainer>
          </Paper>
        )}

        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <EfficiencyCard
                title="Cobertura de Costos Fijos"
                value={costData.efficiencyMetrics?.fixedCostCoverage}
                target={3.0}
                description="Veces que los ingresos cubren costos fijos"
                color="primary"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <EfficiencyCard
                title="Ratio Costos Variables"
                value={costData.efficiencyMetrics?.variableCostRatio}
                target={0.35}
                description="Proporción de costos variables sobre ingresos"
                color="warning"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <EfficiencyCard
                title="Apalancamiento Operativo"
                value={costData.efficiencyMetrics?.operatingLeverage}
                target={2.0}
                description="Grado de apalancamiento operativo"
                color="info"
              />
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Análisis de Eficiencia
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Punto de Equilibrio
                    </Typography>
                    <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                      <Typography variant="h6" color="primary.main">
                        {formatCurrency(costData.summary?.breakEvenPoint)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Unidades necesarias para cubrir costos totales
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Margen de Seguridad
                    </Typography>
                    <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                      <Typography variant="h6" color="success.main">
                        42%
                      </Typography>
                      <Typography variant="body2" color="success.dark">
                        Porcentaje por encima del punto de equilibrio
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Resto del código... (las otras pestañas) */}
        
      </UBCard>
    </Container>
  );
};

export default FixedVariableCosts;