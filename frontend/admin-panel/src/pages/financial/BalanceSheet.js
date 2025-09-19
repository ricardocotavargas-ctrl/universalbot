// frontend/admin-panel/src/pages/financial/BalanceSheet.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Tabs, Tab, TextField, Button, Chip, LinearProgress,
  FormControl, InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import {
  TrendingUp, TrendingDown, AttachMoney, ShowChart,
  Download, CalendarToday, FilterList, CompareArrows,
  AccountBalance, AccountBalanceWallet, Business
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

const BalanceSheet = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('current');
  const [balanceData, setBalanceData] = useState({});
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo para el balance general
  const mockBalanceData = {
    assets: {
      current: 250000,
      fixed: 450000,
      total: 700000
    },
    liabilities: {
      current: 150000,
      longTerm: 200000,
      total: 350000
    },
    equity: {
      capital: 250000,
      retained: 100000,
      total: 350000
    },
    ratios: {
      currentRatio: 1.67,
      debtToEquity: 1.0,
      returnOnAssets: 0.15
    },
    historicalData: [
      { period: '2022', assets: 600000, liabilities: 320000, equity: 280000 },
      { period: '2023', assets: 650000, liabilities: 340000, equity: 310000 },
      { period: '2024', assets: 700000, liabilities: 350000, equity: 350000 }
    ]
  };

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setBalanceData(mockBalanceData);
      setLoading(false);
    }, 500);
  }, []);

  // FUNCIÓN SEGURA para formatear currency
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

  const FinancialSection = ({ title, items, total, color = 'primary' }) => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom color={`${color}.main`}>
        {title}
      </Typography>
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            ...(item.bold && { fontWeight: 'bold' })
          }}
        >
          <Typography>{item.label}</Typography>
          <Typography color={item.color || 'text.primary'} fontWeight={item.bold ? 'bold' : 'normal'}>
            {formatCurrency(item.value)}
          </Typography>
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
          mt: 2,
          borderTop: '2px solid',
          borderColor: 'divider',
          fontWeight: 'bold'
        }}
      >
        <Typography>TOTAL {title.toUpperCase()}</Typography>
        <Typography color={`${color}.main`} fontWeight="bold">
          {formatCurrency(total)}
        </Typography>
      </Box>
    </Paper>
  );

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Typography>Cargando balance general...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Balance General
        </Typography>
        <Typography color="text.secondary">
          Estado de la situación financiera de la empresa
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
              <MenuItem value="current">Actual</MenuItem>
              <MenuItem value="previous">Período anterior</MenuItem>
              <MenuItem value="comparative">Comparativo</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Fecha de corte"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
            defaultValue="2024-06-30"
          />

          <Button variant="outlined" startIcon={<Download />}>
            Exportar Balance
          </Button>
        </Box>
      </UBCard>

      {/* Tabs de Navegación */}
      <UBCard>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Resumen" />
          <Tab label="Análisis" />
          <Tab label="Tendencia" />
          <Tab label="Ratios" />
        </Tabs>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Activos */}
            <Grid item xs={12} md={6}>
              <FinancialSection
                title="Activos"
                items={[
                  { label: 'Efectivo y equivalentes', value: 80000 },
                  { label: 'Cuentas por cobrar', value: 70000 },
                  { label: 'Inventarios', value: 100000 },
                  { label: 'Activos corrientes totales', value: balanceData.assets?.current, bold: true },
                  { label: 'Propiedades y equipo', value: 300000 },
                  { label: 'Activos intangibles', value: 150000 },
                  { label: 'Activos fijos totales', value: balanceData.assets?.fixed, bold: true }
                ]}
                total={balanceData.assets?.total}
                color="primary"
              />
            </Grid>

            {/* Pasivos y Patrimonio */}
            <Grid item xs={12} md={6}>
              <FinancialSection
                title="Pasivos"
                items={[
                  { label: 'Cuentas por pagar', value: 60000 },
                  { label: 'Préstamos a corto plazo', value: 40000 },
                  { label: 'Obligaciones corrientes', value: 50000 },
                  { label: 'Pasivos corrientes totales', value: balanceData.liabilities?.current, bold: true },
                  { label: 'Préstamos a largo plazo', value: 150000 },
                  { label: 'Otras obligaciones', value: 50000 },
                  { label: 'Pasivos a largo plazo totales', value: balanceData.liabilities?.longTerm, bold: true }
                ]}
                total={balanceData.liabilities?.total}
                color="error"
              />

              <FinancialSection
                title="Patrimonio"
                items={[
                  { label: 'Capital social', value: balanceData.equity?.capital },
                  { label: 'Utilidades retenidas', value: balanceData.equity?.retained },
                  { label: 'Resultado del ejercicio', value: 50000 }
                ]}
                total={balanceData.equity?.total}
                color="success"
              />
            </Grid>

            {/* Ecuación contable */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
                <Typography variant="h6" gutterBottom>
                  Ecuación Contable
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <Typography variant="h5">
                    {formatCurrency(balanceData.assets?.total)} = {formatCurrency(balanceData.liabilities?.total)} + {formatCurrency(balanceData.equity?.total)}
                  </Typography>
                  <Chip
                    label={balanceData.assets?.total === balanceData.liabilities?.total + balanceData.equity?.total ? 'Balanceado ✓' : 'Desbalanceado ✗'}
                    color={balanceData.assets?.total === balanceData.liabilities?.total + balanceData.equity?.total ? 'success' : 'error'}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Composición de Activos
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[
                    { label: 'Activos Corrientes', value: balanceData.assets?.current, percentage: ((balanceData.assets?.current / balanceData.assets?.total) * 100).toFixed(1), color: 'primary' },
                    { label: 'Activos Fijos', value: balanceData.assets?.fixed, percentage: ((balanceData.assets?.fixed / balanceData.assets?.total) * 100).toFixed(1), color: 'secondary' }
                  ].map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{item.label}</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatCurrency(item.value)} ({item.percentage}%)
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.percentage}
                        color={item.color}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Estructura de Financiamiento
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[
                    { label: 'Pasivos', value: balanceData.liabilities?.total, percentage: ((balanceData.liabilities?.total / balanceData.assets?.total) * 100).toFixed(1), color: 'error' },
                    { label: 'Patrimonio', value: balanceData.equity?.total, percentage: ((balanceData.equity?.total / balanceData.assets?.total) * 100).toFixed(1), color: 'success' }
                  ].map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{item.label}</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatCurrency(item.value)} ({item.percentage}%)
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.percentage}
                        color={item.color}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tendencia Histórica
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={balanceData.historicalData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value), '']} />
                <Legend />
                <Line type="monotone" dataKey="assets" stroke="#8884d8" name="Activos" />
                <Line type="monotone" dataKey="liabilities" stroke="#ff8042" name="Pasivos" />
                <Line type="monotone" dataKey="equity" stroke="#82ca9d" name="Patrimonio" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        )}

        {activeTab === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Ratio Corriente
                  </Typography>
                  <Typography variant="h4" color={balanceData.ratios?.currentRatio >= 1.5 ? 'success.main' : 'warning.main'}>
                    {balanceData.ratios?.currentRatio?.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ideal: ≥ 1.5
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((balanceData.ratios?.currentRatio / 2) * 100, 100)}
                    color={balanceData.ratios?.currentRatio >= 1.5 ? 'success' : 'warning'}
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Deuda/Patrimonio
                  </Typography>
                  <Typography variant="h4" color={balanceData.ratios?.debtToEquity <= 1.0 ? 'success.main' : 'warning.main'}>
                    {balanceData.ratios?.debtToEquity?.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ideal: ≤ 1.0
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(balanceData.ratios?.debtToEquity * 100, 100)}
                    color={balanceData.ratios?.debtToEquity <= 1.0 ? 'success' : 'warning'}
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    ROA (Return on Assets)
                  </Typography>
                  <Typography variant="h4" color={balanceData.ratios?.returnOnAssets >= 0.1 ? 'success.main' : 'warning.main'}>
                    {(balanceData.ratios?.returnOnAssets * 100).toFixed(1)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ideal: ≥ 10%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(balanceData.ratios?.returnOnAssets * 1000, 100)}
                    color={balanceData.ratios?.returnOnAssets >= 0.1 ? 'success' : 'warning'}
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </UBCard>
    </Container>
  );
};

export default BalanceSheet;