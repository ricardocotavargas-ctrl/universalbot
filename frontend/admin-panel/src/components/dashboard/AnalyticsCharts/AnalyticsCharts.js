import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Grid, Box, ToggleButtonGroup,
  ToggleButton, useTheme, Card, CardContent, Chip,
  LinearProgress, IconButton, Tooltip, Alert
} from '@mui/material';
import {
  TrendingUp, BarChart, PieChart, ShowChart,
  CalendarToday, DateRange, FilterList, Refresh
} from '@mui/icons-material';
import { api } from '../../../utils/api';

const AnalyticsCharts = ({ businessId, loading = false }) => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('7days');
  const [chartType, setChartType] = useState('bar');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (businessId) {
      loadAnalyticsData();
    }
  }, [businessId, timeRange]);

  const loadAnalyticsData = async () => {
    try {
      setError(null);
      const response = await api.get(`/api/business/${businessId}/analytics?period=${timeRange}`);
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error loading analytics data:', error);
      setError('Error cargando datos de analytics');
    }
  };

  const ChartPlaceholder = ({ title, data, color = 'primary', type = 'bar' }) => {
    if (!data || data.length === 0) {
      return (
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="textSecondary">No hay datos disponibles</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ 
        height: 300, 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {type === 'bar' ? 'Gráfico de barras' : type === 'line' ? 'Gráfico de líneas' : 'Gráfico circular'} - 
            {timeRange === '7days' ? ' Últimos 7 días' : timeRange === '30days' ? ' Últimos 30 días' : ' Personalizado'}
          </Typography>
        </Box>
        
        <Box sx={{ 
          width: '100%', 
          height: 200, 
          bgcolor: theme.palette[color]?.light || theme.palette.grey[100],
          borderRadius: 2,
          p: 2,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          gap: 1
        }}>
          {data.map((item, index) => (
            <Tooltip key={index} title={`${item.date || item.platform}: ${item.conversations} conv.`} arrow>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1
              }}>
                <Box
                  sx={{
                    height: `${(item.conversations / Math.max(...data.map(d => d.conversations))) * 100}%`,
                    width: '100%',
                    bgcolor: theme.palette[color]?.main,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 0.8,
                      transform: 'scale(1.05)'
                    }
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1 }}>
                  {item.date ? new Date(item.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) : item.platform}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Chip 
            label={`Máx: ${Math.max(...data.map(d => d.conversations))} conv.`} 
            size="small" 
            color={color}
            variant="outlined"
          />
          <Chip 
            label={`Total: ${data.reduce((sum, d) => sum + d.conversations, 0)} conv.`} 
            size="small" 
            color={color}
            variant="outlined"
          />
        </Box>
      </Box>
    );
  };

  const MetricCard = ({ title, value, change, icon, color = 'primary' }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ 
            bgcolor: theme.palette[color]?.light, 
            p: 1, 
            borderRadius: 1 
          }}>
            {icon}
          </Box>
        </Box>
        
        <Typography variant="h4" component="div" fontWeight="bold" color={color}>
          {value}
        </Typography>
        
        {change && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Chip 
              label={change} 
              size="small" 
              color={change.includes('+') ? 'success' : change.includes('-') ? 'error' : 'default'}
              variant="filled"
              sx={{ fontWeight: 'bold' }}
            />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
              vs período anterior
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          📈 Analytics en Tiempo Real
        </Typography>
        <LinearProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  return (
    <Box>
      {/* Header con controles */}
      <Paper sx={{ p: 3, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            📈 Analytics en Tiempo Real
            <Chip 
              label="Datos reales" 
              size="small" 
              color="success"
              variant="outlined"
              sx={{ ml: 2 }}
            />
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {/* Selector de rango de tiempo */}
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={(_, newRange) => newRange && setTimeRange(newRange)}
              size="small"
            >
              <ToggleButton value="7days">
                <Tooltip title="Últimos 7 días">
                  <DateRange />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="30days">
                <Tooltip title="Últimos 30 días">
                  <CalendarToday />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Selector de tipo de gráfico */}
            <ToggleButtonGroup
              value={chartType}
              exclusive
              onChange={(_, newType) => newType && setChartType(newType)}
              size="small"
            >
              <ToggleButton value="bar">
                <Tooltip title="Gráfico de barras">
                  <BarChart />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="line">
                <Tooltip title="Gráfico de líneas">
                  <ShowChart />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>

            <Tooltip title="Actualizar datos">
              <IconButton size="small" onClick={loadAnalyticsData}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {/* Métricas rápidas */}
      {analyticsData?.performanceMetrics && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Conversaciones Totales"
              value={analyticsData.performanceMetrics.total_conversations || 0}
              icon={<BarChart color="primary" />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Conversiones Exitosas"
              value={analyticsData.performanceMetrics.successful_conversations || 0}
              icon={<TrendingUp color="secondary" />}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Tiempo Respuesta"
              value={`${Math.round(analyticsData.performanceMetrics.avg_response_time || 0)}s`}
              icon={<ShowChart color="info" />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Clientes Únicos"
              value={analyticsData.performanceMetrics.unique_customers || 0}
              icon={<PieChart color="success" />}
              color="success"
            />
          </Grid>
        </Grid>
      )}

      {/* Gráficos principales */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper>
            <ChartPlaceholder
              title="Tendencia de Conversaciones"
              data={analyticsData?.conversationTrend || []}
              color="primary"
              type={chartType}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper>
            <ChartPlaceholder
              title="Distribución por Plataforma"
              data={analyticsData?.platformDistribution || []}
              color="secondary"
              type="pie"
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Insights de IA */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          🧠 Insights Automatizados
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                💡 Patrón detectado
              </Typography>
              <Typography variant="body2">
                {analyticsData?.conversationTrend?.length > 0 
                  ? `Los ${new Date(analyticsData.conversationTrend[0]?.date).toLocaleDateString('es-ES', { weekday: 'long' })} tienen un ${Math.round((analyticsData.conversationTrend[0]?.conversations / analyticsData.conversationTrend.reduce((sum, day) => sum + day.conversations, 0)) * 100)}% más de conversaciones.`
                  : 'Analizando patrones de conversación...'
                }
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                ⚠️ Recomendación
              </Typography>
              <Typography variant="body2">
                {analyticsData?.platformDistribution?.length > 0
                  ? `El ${analyticsData.platformDistribution[0]?.platform} genera el ${Math.round((analyticsData.platformDistribution[0]?.conversations / analyticsData.platformDistribution.reduce((sum, platform) => sum + platform.conversations, 0)) * 100)}% de las conversaciones. Considera optimizar esta plataforma.`
                  : 'Evaluando rendimiento por plataforma...'
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AnalyticsCharts;