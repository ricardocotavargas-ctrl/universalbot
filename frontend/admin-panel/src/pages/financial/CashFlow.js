// frontend/admin-panel/src/pages/financial/CashFlow.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Tabs, Tab, Chip, LinearProgress, FormControl, InputLabel,
  Select, MenuItem, Button, IconButton, Tooltip, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControlLabel, Switch
} from '@mui/material';
import {
  TrendingUp, TrendingDown, AttachMoney, ShowChart,
  Download, CalendarToday, FilterList, CompareArrows,
  AccountBalance, AccountBalanceWallet, Business,
  Add, Visibility, Print, AccountTree
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ComposedChart, Line } from 'recharts';

const CashFlow = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('last_6_months');
  const [cashFlowData, setCashFlowData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [openForecastDialog, setOpenForecastDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo para flujo de efectivo
  const mockCashFlowData = {
    summary: {
      operating: 125000,
      investing: -45000,
      financing: 80000,
      netChange: 160000,
      startingBalance: 250000,
      endingBalance: 410000
    },
    monthlyData: [
      {
        month: 'Ene 2024',
        operating: 20000,
        investing: -8000,
        financing: 15000,
        netChange: 27000,
        balance: 277000
      },
      {
        month: 'Feb 2024',
        operating: 22000,
        investing: -12000,
        financing: 10000,
        netChange: 20000,
        balance: 297000
      },
      {
        month: 'Mar 2024',
        operating: 25000,
        investing: -5000,
        financing: 20000,
        netChange: 40000,
        balance: 337000
      },
      {
        month: 'Abr 2024',
        operating: 18000,
        investing: -15000,
        financing: 12000,
        netChange: 15000,
        balance: 352000
      },
      {
        month: 'May 2024',
        operating: 30000,
        investing: -2000,
        financing: 18000,
        netChange: 46000,
        balance: 398000
      },
      {
        month: 'Jun 2024',
        operating: 20000,
        investing: -3000,
        financing: 15000,
        netChange: 32000,
        balance: 430000
      }
    ],
    categories: {
      operating: [
        { category: 'Ventas', amount: 185000, trend: 'up' },
        { category: 'Cuentas por Cobrar', amount: -25000, trend: 'down' },
        { category: 'Gastos Operativos', amount: -35000, trend: 'stable' }
      ],
      investing: [
        { category: 'Equipo y Maquinaria', amount: -30000, trend: 'down' },
        { category: 'Inversiones', amount: -10000, trend: 'stable' },
        { category: 'Propiedades', amount: -5000, trend: 'up' }
      ],
      financing: [
        { category: 'Préstamos', amount: 50000, trend: 'up' },
        { category: 'Pago de Deudas', amount: -20000, trend: 'down' },
        { category: 'Dividendos', amount: -10000, trend: 'stable' }
      ]
    },
    metrics: {
      operatingMargin: 0.28,
      freeCashFlow: 80000,
      cashConversionCycle: 45,
      liquidityRatio: 2.8
    }
  };

  // Datos de pronóstico
  const mockForecastData = [
    { month: 'Jul 2024', forecast: 450000, actual: null, confidence: 0.85 },
    { month: 'Ago 2024', forecast: 480000, actual: null, confidence: 0.80 },
    { month: 'Sep 2024', forecast: 510000, actual: null, confidence: 0.75 },
    { month: 'Oct 2024', forecast: 540000, actual: null, confidence: 0.70 },
    { month: 'Nov 2024', forecast: 570000, actual: null, confidence: 0.65 },
    { month: 'Dic 2024', forecast: 600000, actual: null, confidence: 0.60 }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setCashFlowData(mockCashFlowData);
      setForecastData(mockForecastData);
      setLoading(false);
    }, 500);
  }, []);

  const formatCurrency = (amount) => {
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
    return `${(value * 100).toFixed(1)}%`;
  };

  const CashFlowMetricCard = ({ title, value, subtitle, trend, color = 'primary', icon }) => {
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

  const FinancialHealthCard = ({ title, value, target, description, color = 'primary' }) => {
    const isHealthy = value >= target;
    const percentage = (value / target) * 100;
    
    return (
      <Card>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" color={isHealthy ? 'success.main' : 'error.main'}>
            {typeof value === 'number' ? value.toFixed(1) : value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={Math.min(percentage, 100)}
              color={isHealthy ? 'success' : 'error'}
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

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Typography>Cargando flujo de efectivo...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Flujo de Efectivo
        </Typography>
        <Typography color="text.secondary">
          Análisis completo del movimiento de efectivo en tu empresa
        </Typography>
      </Box>

      {/* Alertas importantes */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography fontWeight="bold">
          Saldo final de efectivo: {formatCurrency(cashFlowData.summary?.endingBalance)}
        </Typography>
        <Typography variant="body2">
          Cambio neto del período: {formatCurrency(cashFlowData.summary?.netChange)}
        </Typography>
      </Alert>

      {/* KPIs Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <CashFlowMetricCard
            title="Flujo Operativo"
            value={cashFlowData.summary?.operating}
            trend={12.5}
            color="success"
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CashFlowMetricCard
            title="Flujo de Inversión"
            value={cashFlowData.summary?.investing}
            trend={-8.2}
            color="error"
            icon={<TrendingDown sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CashFlowMetricCard
            title="Flujo de Financiamiento"
            value={cashFlowData.summary?.financing}
            trend={15.3}
            color="info"
            icon={<CompareArrows sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CashFlowMetricCard
            title="Cambio Neto"
            value={cashFlowData.summary?.netChange}
            trend={18.7}
            color="primary"
            icon={<AccountBalance sx={{ fontSize: 40 }} />}
          />
        </Grid>
      </Grid>

      {/* Controles y Filtros */}
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

          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={() => setOpenForecastDialog(true)}
          >
            Pronóstico
          </Button>

          <Tooltip title="Vista detallada">
            <IconButton>
              <Visibility />
            </IconButton>
          </Tooltip>

          <Tooltip title="Imprimir reporte">
            <IconButton>
              <Print />
            </IconButton>
          </Tooltip>
        </Box>
      </UBCard>

      {/* Tabs de Navegación */}
      <UBCard>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab icon={<ShowChart />} label="Resumen" />
          <Tab icon={<AccountTree />} label="Por Categoría" />
          <Tab icon={<TrendingUp />} label="Tendencias" />
          <Tab icon={<CompareArrows />} label="Pronóstico" />
          <Tab icon={<Business />} label="Salud Financiera" />
        </Tabs>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Gráfico principal */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Flujo de Efectivo Mensual
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={cashFlowData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [formatCurrency(value), '']} />
                    <Legend />
                    <Bar dataKey="operating" fill="#8884d8" name="Operativo" />
                    <Bar dataKey="investing" fill="#ff8042" name="Inversión" />
                    <Bar dataKey="financing" fill="#00C49F" name="Financiamiento" />
                    <Line type="monotone" dataKey="balance" stroke="#ff7300" name="Saldo" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Resumen lateral */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Resumen del Período
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[
                    { label: 'Saldo Inicial', value: cashFlowData.summary?.startingBalance, color: 'text.primary' },
                    { label: 'Flujo Operativo', value: cashFlowData.summary?.operating, color: 'success.main' },
                    { label: 'Flujo de Inversión', value: cashFlowData.summary?.investing, color: 'error.main' },
                    { label: 'Flujo de Financiamiento', value: cashFlowData.summary?.financing, color: 'info.main' },
                    { label: 'Cambio Neto', value: cashFlowData.summary?.netChange, color: 'primary.main', bold: true },
                    { label: 'Saldo Final', value: cashFlowData.summary?.endingBalance, color: 'primary.main', bold: true, large: true }
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
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            {/* Flujo Operativo */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom color="success.main">
                  Actividades Operativas
                </Typography>
                {cashFlowData.categories?.operating?.map((item, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {item.category}
                        <Chip
                          label={item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                          size="small"
                          color={item.trend === 'up' ? 'success' : item.trend === 'down' ? 'error' : 'default'}
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color={item.amount >= 0 ? 'success.main' : 'error.main'}>
                        {formatCurrency(item.amount)}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.abs((item.amount / cashFlowData.categories.operating.reduce((sum, i) => sum + Math.abs(i.amount), 0)) * 100)}
                      color={item.amount >= 0 ? 'success' : 'error'}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                ))}
                <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Total Operativo: {formatCurrency(cashFlowData.summary?.operating)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Flujo de Inversión */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom color="error.main">
                  Actividades de Inversión
                </Typography>
                {cashFlowData.categories?.investing?.map((item, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {item.category}
                        <Chip
                          label={item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                          size="small"
                          color={item.trend === 'up' ? 'success' : item.trend === 'down' ? 'error' : 'default'}
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color={item.amount >= 0 ? 'success.main' : 'error.main'}>
                        {formatCurrency(item.amount)}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.abs((item.amount / cashFlowData.categories.investing.reduce((sum, i) => sum + Math.abs(i.amount), 0)) * 100)}
                      color={item.amount >= 0 ? 'success' : 'error'}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                ))}
                <Box sx={{ mt: 2, p: 2, bgcolor: 'error.light', borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Total Inversión: {formatCurrency(cashFlowData.summary?.investing)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Flujo de Financiamiento */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom color="info.main">
                  Actividades de Financiamiento
                </Typography>
                {cashFlowData.categories?.financing?.map((item, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {item.category}
                        <Chip
                          label={item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                          size="small"
                          color={item.trend === 'up' ? 'success' : item.trend === 'down' ? 'error' : 'default'}
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color={item.amount >= 0 ? 'success.main' : 'error.main'}>
                        {formatCurrency(item.amount)}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.abs((item.amount / cashFlowData.categories.financing.reduce((sum, i) => sum + Math.abs(i.amount), 0)) * 100)}
                      color={item.amount >= 0 ? 'success' : 'error'}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                ))}
                <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Total Financiamiento: {formatCurrency(cashFlowData.summary?.financing)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tendencias y Análisis
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={cashFlowData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [formatCurrency(value), '']} />
                    <Legend />
                    <Area type="monotone" dataKey="operating" stackId="1" stroke="#8884d8" fill="#8884d8" name="Operativo" />
                    <Area type="monotone" dataKey="investing" stackId="1" stroke="#ff8042" fill="#ff8042" name="Inversión" />
                    <Area type="monotone" dataKey="financing" stackId="1" stroke="#00C49F" fill="#00C49F" name="Financiamiento" />
                  </AreaChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cashFlowData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [formatCurrency(value), '']} />
                    <Legend />
                    <Bar dataKey="netChange" fill="#ff7300" name="Cambio Neto" />
                    <Line type="monotone" dataKey="balance" stroke="#387908" name="Saldo" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
          </Paper>
        )}

        {activeTab === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Pronóstico de Flujo de Efectivo
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={[...cashFlowData.monthlyData, ...forecastData]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [formatCurrency(value), '']} />
                    <Legend />
                    <Bar dataKey="netChange" fill="#8884d8" name="Cambio Neto Real" />
                    <Bar dataKey="forecast" fill="#ff8042" name="Pronóstico" />
                    <Line type="monotone" dataKey="balance" stroke="#00C49F" name="Saldo Real" strokeWidth={2} />
                    <Line type="monotone" dataKey="forecast" stroke="#ff7300" name="Saldo Pronosticado" strokeWidth={2} strokeDasharray="5 5" />
                  </ComposedChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Detalles del Pronóstico
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {forecastData.map((item, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                      <Typography variant="subtitle2">{item.month}</Typography>
                      <Typography variant="body2">
                        Pronóstico: {formatCurrency(item.forecast)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Confianza: {(item.confidence * 100).toFixed(0)}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={item.confidence * 100}
                        color={item.confidence > 0.7 ? 'success' : item.confidence > 0.5 ? 'warning' : 'error'}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 4 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <FinancialHealthCard
                title="Margen de Efectivo Operativo"
                value={cashFlowData.metrics?.operatingMargin * 100}
                target={25}
                description="Porcentaje de ventas convertido en efectivo"
                color="primary"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FinancialHealthCard
                title="Flujo de Efectivo Libre"
                value={cashFlowData.metrics?.freeCashFlow / 1000}
                target={50}
                description="Efectivo disponible después de inversiones"
                color="success"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FinancialHealthCard
                title="Ciclo de Conversión de Efectivo"
                value={cashFlowData.metrics?.cashConversionCycle}
                target={60}
                description="Días para convertir inventario en efectivo"
                color="warning"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FinancialHealthCard
                title="Ratio de Liquidez"
                value={cashFlowData.metrics?.liquidityRatio}
                target={2.0}
                description="Capacidad para cubrir obligaciones a corto plazo"
                color="info"
              />
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Recomendaciones de Liquidez
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Alert severity="success" sx={{ mb: 2 }}>
                      <Typography fontWeight="bold">Fuerte flujo operativo</Typography>
                      <Typography variant="body2">
                        Tu flujo de efectivo operativo es saludable. Considera oportunidades de inversión.
                      </Typography>
                    </Alert>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      <Typography fontWeight="bold">Buena liquidez</Typography>
                      <Typography variant="body2">
                        El ratio de liquidez indica buena capacidad para cubrir obligaciones a corto plazo.
                      </Typography>
                    </Alert>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Alert severity="warning">
                      <Typography fontWeight="bold">Ciclo de conversión</Typography>
                      <Typography variant="body2">
                        El ciclo de conversión de efectivo podría optimizarse. Revisa políticas de cobro y pagos.
                      </Typography>
                    </Alert>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}
      </UBCard>

      {/* Diálogo de pronóstico */}
      <Dialog open={openForecastDialog} onClose={() => setOpenForecastDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Generar Pronóstico de Flujo de Efectivo</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Método de Pronóstico</InputLabel>
                <Select label="Método de Pronóstico">
                  <MenuItem value="linear">Lineal (Promedio Móvil)</MenuItem>
                  <MenuItem value="exponential">Exponencial</MenuItem>
                  <MenuItem value="seasonal">Estacional</MenuItem>
                  <MenuItem value="regression">Regresión</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Meses a Pronosticar"
                type="number"
                defaultValue={6}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Factor de Crecimiento (%)"
                type="number"
                defaultValue={8.5}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nivel de Confianza"
                type="number"
                defaultValue={0.8}
                inputProps={{ min: 0.1, max: 1, step: 0.1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Incluir factores estacionales"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Ajustar por inflación proyectada"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForecastDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenForecastDialog(false)}>
            Generar Pronóstico
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CashFlow;