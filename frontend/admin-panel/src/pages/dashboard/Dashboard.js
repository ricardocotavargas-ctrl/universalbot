import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar
} from '@mui/material';
import {
  TrendingUp,
  People,
  Chat,
  AttachMoney,
  Refresh,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  Circle
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useBusiness } from '../../contexts/BusinessContext';

// Servicio de API minimalista
const useAPIService = () => {
  const { user } = useAuth();
  const { currentBusiness } = useBusiness();

  const makeRequest = async (endpoint) => {
    try {
      const response = await fetch(`/api${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'X-Business-ID': currentBusiness?.id
        }
      });
      if (!response.ok) throw new Error('API Error');
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  return {
    getMetrics: () => makeRequest(`/business/${currentBusiness?.id}/metrics`),
    refreshData: () => makeRequest('/data/refresh')
  };
};

// Hook de datos simple
const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = useAPIService();

  const staticData = {
    revenue: { current: 52340, growth: 14.6 },
    customers: { current: 1245, growth: 11.2 },
    conversion: { current: 3.4, growth: 17.2 },
    activity: { current: 2847, growth: 12.0 }
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      // En producción, usar: const metrics = await api.getMetrics();
      setData(staticData);
    } catch {
      setData(staticData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, refetch: loadData };
};

// Componente de Métrica Elegante
const MetricCard = ({ title, value, change, icon: Icon, loading }) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
      return `$${val.toLocaleString()}`;
    }
    return val;
  };

  if (loading) {
    return (
      <Card sx={{ 
        p: 3, 
        height: 120,
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            width: 48, 
            height: 48, 
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px'
          }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ 
              height: 16, 
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
              mb: 1,
              width: '60%'
            }} />
            <Box sx={{ 
              height: 24, 
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
              mb: 1
            }} />
            <Box sx={{ 
              height: 12, 
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
              width: '40%'
            }} />
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      p: 3, 
      height: 120,
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-2px)'
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ 
          p: 1.5, 
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Icon sx={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.8)' }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: 'white', mb: 0.5 }}>
            {formatValue(value)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 1 }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {change > 0 ? 
              <ArrowUpward sx={{ fontSize: 16, color: '#10b981' }} /> : 
              <ArrowDownward sx={{ fontSize: 16, color: '#ef4444' }} />
            }
            <Typography 
              variant="caption" 
              fontWeight={600}
              sx={{ color: change > 0 ? '#10b981' : '#ef4444' }}
            >
              {change > 0 ? '+' : ''}{change}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

// Gráfico Minimalista
const SimpleChart = ({ data, loading }) => {
  if (loading) {
    return (
      <Card sx={{ 
        p: 3, 
        height: 320,
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px'
      }}>
        <Box sx={{ height: '100%', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }} />
      </Card>
    );
  }

  const chartData = [30, 45, 35, 55, 40, 65, 50, 70, 60, 80, 70, 90];
  const maxValue = Math.max(...chartData);

  return (
    <Card sx={{ 
      p: 3, 
      height: 320,
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px'
    }}>
      <Typography variant="h6" fontWeight={600} sx={{ color: 'white', mb: 3 }}>
        Tendencia de Rendimiento
      </Typography>
      
      <Box sx={{ height: 200, display: 'flex', alignItems: 'end', gap: 0.5, mb: 3 }}>
        {chartData.map((value, index) => (
          <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              sx={{
                width: '60%',
                height: `${(value / maxValue) * 100}%`,
                background: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '2px 2px 0 0',
                transition: 'all 0.3s ease',
                minHeight: '4px'
              }}
            />
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Últimos 12 meses
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />
          <Typography variant="body2" fontWeight={600} sx={{ color: '#10b981' }}>
            +28.3%
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

// Item de Actividad
const ActivityItem = ({ title, time, value, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          <Box sx={{ width: 8, height: 8, background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ height: 14, background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', mb: 0.5, width: '70%' }} />
            <Box sx={{ height: 12, background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', width: '40%' }} />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      py: 1.5,
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      '&:last-child': { borderBottom: 'none' }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Circle sx={{ fontSize: 8, color: 'rgba(255, 255, 255, 0.3)' }} />
        <Box>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            {time}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" fontWeight={600} sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
        {value}
      </Typography>
    </Box>
  );
};

// Dashboard Principal
const Dashboard = () => {
  const { currentBusiness } = useBusiness();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const { data, loading, refetch } = useDashboardData();

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleRefresh = async () => {
    await refetch();
    showNotification('Datos actualizados', 'success');
  };

  const metrics = [
    {
      title: 'Ingresos',
      value: data?.revenue.current,
      change: data?.revenue.growth,
      icon: AttachMoney
    },
    {
      title: 'Clientes',
      value: data?.customers.current,
      change: data?.customers.growth,
      icon: People
    },
    {
      title: 'Conversión',
      value: data?.conversion.current,
      change: data?.conversion.growth,
      icon: TrendingUp
    },
    {
      title: 'Actividad',
      value: data?.activity.current,
      change: data?.activity.growth,
      icon: Chat
    }
  ];

  const activities = [
    { title: 'Nueva venta registrada', time: 'Hace 2 min', value: '+$240' },
    { title: 'Cliente premium agregado', time: 'Hace 15 min', value: 'Nuevo' },
    { title: 'Stock actualizado', time: 'Hace 1 hora', value: '15 items' },
    { title: 'Reporte generado', time: 'Hace 2 horas', value: 'PDF' }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white'
    }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                Panel de Control
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {currentBusiness?.name || 'Dashboard Principal'}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              disabled={loading}
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              Actualizar
            </Button>
          </Box>
        </Box>

        {/* Métricas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <MetricCard {...metric} loading={loading} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Gráfico */}
          <Grid item xs={12} lg={8}>
            <SimpleChart data={data} loading={loading} />
          </Grid>

          {/* Actividad Reciente */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ 
              p: 3,
              height: 320,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px'
            }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: 'white', mb: 3 }}>
                Actividad Reciente
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {activities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} loading={loading} />
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        >
          <Alert severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Dashboard;
