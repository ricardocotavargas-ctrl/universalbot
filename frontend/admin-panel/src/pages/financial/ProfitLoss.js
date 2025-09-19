// frontend/admin-panel/src/pages/financial/ProfitLoss.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Tabs, Tab, TextField, Button, Chip, LinearProgress,
  FormControl, InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import {
  TrendingUp, TrendingDown, AttachMoney, ShowChart,
  Download, CalendarToday, FilterList, CompareArrows
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ProfitLoss = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('month');
  const [comparisonMode, setComparisonMode] = useState('none');
  const [financialData, setFinancialData] = useState({});

  // Datos de ejemplo para el estado de resultados
  const mockFinancialData = {
    revenue: 1250000,
    costOfGoodsSold: 750000,
    grossProfit: 500000,
    operatingExpenses: 300000,
    operatingIncome: 200000,
    otherIncome: 50000,
    otherExpenses: 30000,
    netIncome: 220000,
    ebitda: 250000,
    margins: {
      grossMargin: 40,
      operatingMargin: 16,
      netMargin: 17.6
    },
    monthlyData: [
      { month: 'Ene', revenue: 100000, expenses: 80000, profit: 20000 },
      { month: 'Feb', revenue: 120000, expenses: 85000, profit: 35000 },
      { month: 'Mar', revenue: 150000, expenses: 90000, profit: 60000 },
      { month: 'Abr', revenue: 130000, expenses: 82000, profit: 48000 },
      { month: 'May', revenue: 160000, expenses: 95000, profit: 65000 },
      { month: 'Jun', revenue: 180000, expenses: 100000, profit: 80000 }
    ],
    yearlyComparison: [
      { year: '2022', revenue: 1000000, profit: 150000 },
      { year: '2023', revenue: 1250000, profit: 220000 }
    ],
    expenseBreakdown: [
      { category: 'Nómina', amount: 120000, percentage: 40 },
      { category: 'Alquiler', amount: 60000, percentage: 20 },
      { category: 'Servicios', amount: 30000, percentage: 10 },
      { category: 'Marketing', amount: 45000, percentage: 15 },
      { category: 'Otros', amount: 45000, percentage: 15 }
    ]
  };

  useEffect(() => {
    setFinancialData(mockFinancialData);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const FinancialMetricCard = ({ title, value, previousValue, trend, color = 'primary', icon }) => {
    const isPositive = trend >= 0;
    const trendColor = isPositive ? 'success.main' : 'error.main';
    const trendIcon = isPositive ? <TrendingUp /> : <TrendingDown />;

    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="text.secondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" color={`${color}.main`}>
                {typeof value === 'number' ? formatCurrency(value) : value}
              </Typography>
              {previousValue && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  {trendIcon}
                  <Typography variant="body2" color={trendColor}>
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

  const MarginCard = ({ title, value, target }) => {
    const isMeetingTarget = value >= target;
    
    return (
      <Card>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" color={isMeetingTarget ? 'success.main' : 'error.main'}>
            {value}%
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Meta: {target}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min((value / target) * 100, 100)}
              color={isMeetingTarget ? 'success' : 'error'}
              sx={{ mt: 1 }}
            />
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Estado de Resultados
        </Typography>
        <Typography color="text.secondary">
          Análisis de rentabilidad y desempeño financiero
        </Typography>
      </Box>

      {/* Filtros y Controles */}
      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Período</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Período"
            >
              <MenuItem value="month">Este mes</MenuItem>
              <MenuItem value="quarter">Este trimestre</MenuItem>
              <MenuItem value="year">Este año</MenuItem>
              <MenuItem value="ytd">YTD</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Comparación</InputLabel>
            <Select
              value={comparisonMode}
              onChange={(e) => setComparisonMode(e.target.value)}
              label="Comparación"
            >
              <MenuItem value="none">Sin comparación</MenuItem>
              <MenuItem value="previous">Período anterior</MenuItem>
              <MenuItem value="budget">Presupuesto</MenuItem>
              <MenuItem value="last_year">Mismo período año anterior</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Fecha desde"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

          <TextField
            label="Fecha hasta"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

          <Button variant="outlined" startIcon={<Download />}>
            Exportar Reporte
          </Button>
        </Box>
      </UBCard>

      {/* KPIs Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <FinancialMetricCard
            title="Ingresos Totales"
            value={financialData.revenue}
            previousValue={1000000}
            trend={25}
            color="primary"
            icon={<AttachMoney sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FinancialMetricCard
            title="Utilidad Neta"
            value={financialData.netIncome}
            previousValue={150000}
            trend={46.7}
            color="success"
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FinancialMetricCard
            title="EBITDA"
            value={financialData.ebitda}
            previousValue={200000}
            trend={25}
            color="info"
            icon={<ShowChart sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FinancialMetricCard
            title="Margen Neto"
            value={`${financialData.margins?.netMargin || 0}%`}
            previousValue={15}
            trend={17.3}
            color="warning"
            icon={<CompareArrows sx={{ fontSize: 40 }} />}
          />
        </Grid>
      </Grid>

      {/* Tabs de Navegación */}
      <UBCard>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Resumen" />
          <Tab label="Tendencia Mensual" />
          <Tab label="Comparación Anual" />
          <Tab label="Análisis de Gastos" />
          <Tab label="Márgenes" />
        </Tabs>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Estado de Resultados Resumido */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Estado de Resultados
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[
                    { label: 'Ingresos', value: financialData.revenue, color: 'primary.main' },
                    { label: 'Costo de Ventas', value: -financialData.costOfGoodsSold, color: 'error.main' },
                    { label: 'Utilidad Bruta', value: financialData.grossProfit, color: 'success.main', bold: true },
                    { label: 'Gastos Operativos', value: -financialData.operatingExpenses, color: 'error.main' },
                    { label: 'Utilidad Operativa', value: financialData.operatingIncome, color: 'info.main', bold: true },
                    { label: 'Otros Ingresos', value: financialData.otherIncome, color: 'primary.main' },
                    { label: 'Otros Gastos', value: -financialData.otherExpenses, color: 'error.main' },
                    { label: 'UTILIDAD NETA', value: financialData.netIncome, color: 'success.main', bold: true, large: true }
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1.5,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        ...(item.bold && { fontWeight: 'bold' }),
                        ...(item.large && { fontSize: '1.1rem' })
                      }}
                    >
                      <Typography>{item.label}</Typography>
                      <Typography color={item.color} fontWeight={item.bold ? 'bold' : 'normal'}>
                        {formatCurrency(item.value)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* Gráfico de Tendencia */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Tendencia de Rentabilidad
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={financialData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(value), '']} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Ingresos" />
                    <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Utilidad" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tendencia Mensual
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={financialData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value), '']} />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Ingresos" />
                <Bar dataKey="expenses" fill="#ff8042" name="Gastos" />
                <Bar dataKey="profit" fill="#82ca9d" name="Utilidad" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Comparación Anual
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData.yearlyComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value), '']} />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Ingresos" />
                <Bar dataKey="profit" fill="#82ca9d" name="Utilidad Neta" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        )}

        {activeTab === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Distribución de Gastos
                </Typography>
                {financialData.expenseBreakdown?.map((expense, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{expense.category}</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(expense.amount)} ({expense.percentage}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={expense.percentage}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Análisis de Gastos vs Presupuesto
                </Typography>
                {/* Aquí iría el análisis de gastos vs presupuesto */}
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 4 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <MarginCard
                title="Margen Bruto"
                value={financialData.margins?.grossMargin || 0}
                target={35}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MarginCard
                title="Margen Operativo"
                value={financialData.margins?.operatingMargin || 0}
                target={15}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MarginCard
                title="Margen Neto"
                value={financialData.margins?.netMargin || 0}
                target={12}
              />
            </Grid>
          </Grid>
        )}
      </UBCard>

      {/* Análisis de Rentabilidad */}
      <UBCard title="Análisis de Rentabilidad" sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Punto de Equilibrio
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2">
                <strong>Punto de equilibrio:</strong> {formatCurrency(750000)}
              </Typography>
              <Typography variant="body2">
                <strong>Margen de seguridad:</strong> 40%
              </Typography>
              <Typography variant="body2">
                <strong>Apalancamiento operativo:</strong> 2.5x
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Ratios de Rentabilidad
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2">
                <strong>ROI (Return on Investment):</strong> 18.3%
              </Typography>
              <Typography variant="body2">
                <strong>ROE (Return on Equity):</strong> 22.1%
              </Typography>
              <Typography variant="body2">
                <strong>ROA (Return on Assets):</strong> 15.7%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </UBCard>
    </Container>
  );
};

export default ProfitLoss;