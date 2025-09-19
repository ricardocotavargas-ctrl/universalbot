// frontend/admin-panel/src/pages/sales/SalesHistory.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Card, CardContent,
  Grid, Chip, Button, TextField, InputAdornment,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  Search, FilterList, Download, TrendingUp,
  Receipt, CalendarToday, AttachMoney
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import StatisticsCharts from './components/StatisticsCharts';

const SalesHistory = () => {
  const [salesData, setSalesData] = useState([]);
  const [timeRange, setTimeRange] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo para estadísticas
  const mockSalesData = [
    { date: '2024-01-01', sales: 12500, transactions: 45 },
    { date: '2024-01-02', sales: 14300, transactions: 52 },
    { date: '2024-01-03', sales: 9800, transactions: 38 },
    // ... más datos
  ];

  useEffect(() => {
    setSalesData(mockSalesData);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalTransactions = salesData.reduce((sum, day) => sum + day.transactions, 0);
  const averageSale = totalTransactions > 0 ? totalSales / totalTransactions : 0;

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Historial y Estadísticas de Ventas
        </Typography>
        <Typography color="text.secondary">
          Análisis completo del desempeño de ventas
        </Typography>
      </Box>

      {/* Filtros */}
      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Buscar en historial..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Período</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Período"
            >
              <MenuItem value="week">Esta semana</MenuItem>
              <MenuItem value="month">Este mes</MenuItem>
              <MenuItem value="quarter">Este trimestre</MenuItem>
              <MenuItem value="year">Este año</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<Download />}
          >
            Exportar Reporte
          </Button>
        </Box>
      </UBCard>

      {/* Estadísticas Rápidas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AttachMoney sx={{ fontSize: 40, color: 'success.main' }} />
                <Box>
                  <Typography color="text.secondary">Ventas Totales</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {formatCurrency(totalSales)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Receipt sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography color="text.secondary">Total Transacciones</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {totalTransactions}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp sx={{ fontSize: 40, color: 'warning.main' }} />
                <Box>
                  <Typography color="text.secondary">Ticket Promedio</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {formatCurrency(averageSale)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráficos Estadísticos */}
      <StatisticsCharts salesData={salesData} timeRange={timeRange} />

      {/* Resumen Diario */}
      <UBCard title="Resumen Diario" sx={{ mt: 3 }}>
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {salesData.map((day, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': { borderBottom: 'none' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CalendarToday sx={{ color: 'text.secondary' }} />
                <Box>
                  <Typography fontWeight="medium">
                    {new Date(day.date).toLocaleDateString('es-VE', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {day.transactions} transacciones
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" color="primary">
                  {formatCurrency(day.sales)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatCurrency(day.sales / day.transactions)} promedio
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </UBCard>
    </Container>
  );
};

export default SalesHistory;