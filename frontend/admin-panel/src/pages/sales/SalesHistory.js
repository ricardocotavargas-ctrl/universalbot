// frontend/admin-panel/src/pages/sales/SalesHistory.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Card, CardContent,
  Grid, Chip, Button, TextField, InputAdornment,
  FormControl, InputLabel, Select, MenuItem, Alert,
  CircularProgress
} from '@mui/material';
import {
  Search, Download, TrendingUp,
  Receipt, CalendarToday, AttachMoney
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import UBCard from '../../components/ui/UBCard';
import StatisticsCharts from './components/StatisticsCharts';

const SalesHistory = () => {
  const { user } = useAuth();
  const [salesData, setSalesData] = useState([]);
  const [timeRange, setTimeRange] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ CARGAR DATOS DE VENTAS REALES
  const loadSalesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/sales/all-sales');
      
      if (response.data.success) {
        setSalesData(response.data.sales);
      } else {
        throw new Error(response.data.message || 'Error al cargar historial');
      }
    } catch (error) {
      console.error('Error cargando historial:', error);
      setError('Error al cargar historial: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSalesData();
  }, []);

  // ✅ CÁLCULO DE ESTADÍSTICAS
  const stats = {
    totalSales: salesData.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0),
    totalTransactions: salesData.length,
    completedSales: salesData.filter(sale => sale.status === 'completed').length,
    averageSale: salesData.length > 0 ? 
      salesData.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0) / salesData.length : 0
  };

  // ✅ FORMATEO DE MONEDA
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Historial y Estadísticas de Ventas
        </Typography>
        <Typography color="text.secondary">
          Análisis completo del desempeño de ventas - DATOS REALES
        </Typography>
      </Box>

      {/* FILTROS */}
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

          <Button
            variant="outlined"
            startIcon={<CalendarToday />}
            onClick={loadSalesData}
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar Datos'}
          </Button>
        </Box>
      </UBCard>

      {/* MENSAJES DE ERROR */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* ESTADÍSTICAS RÁPIDAS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AttachMoney sx={{ fontSize: 40, color: 'success.main' }} />
                <Box>
                  <Typography color="text.secondary">Ventas Totales</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {formatCurrency(stats.totalSales)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Receipt sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography color="text.secondary">Total Transacciones</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalTransactions}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp sx={{ fontSize: 40, color: 'warning.main' }} />
                <Box>
                  <Typography color="text.secondary">Ticket Promedio</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {formatCurrency(stats.averageSale)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Receipt sx={{ fontSize: 40, color: 'info.main' }} />
                <Box>
                  <Typography color="text.secondary">Ventas Completadas</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.completedSales}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* GRÁFICOS ESTADÍSTICOS */}
      {!loading && salesData.length > 0 && (
        <StatisticsCharts salesData={salesData} timeRange={timeRange} />
      )}

      {/* RESUMEN DE VENTAS RECIENTES */}
      <UBCard title="Ventas Recientes" sx={{ mt: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : salesData.length > 0 ? (
          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            {salesData.slice(0, 10).map((sale, index) => (
              <Box
                key={sale.id}
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
                      Venta {sale.id?.substring(0, 8)}...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {sale.customer?.name || 'Cliente General'} • {new Date(sale.createdAt).toLocaleDateString('es-VE')}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h6" color="primary">
                    {formatCurrency(sale.totalAmount)}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                    <Chip
                      label={sale.paymentMethod}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={sale.status === 'completed' ? 'COMPLETADA' : sale.status}
                      color={sale.status === 'completed' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Receipt sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography color="text.secondary">
              No hay datos de ventas disponibles
            </Typography>
          </Box>
        )}
      </UBCard>
    </Container>
  );
};

export default SalesHistory;
