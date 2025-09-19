import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Chip, Button, LinearProgress, Tabs, Tab
} from '@mui/material';
import {
  TrendingUp, People, AttachMoney, ShoppingCart, Schedule,
  Dashboard, ShowChart
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const RealTimeAnalytics = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [realTimeData, setRealTimeData] = useState({
    onlineUsers: 12,
    activeSessions: 8,
    currentSales: 1250,
    pendingOrders: 5,
    completedOrders: 18
  });

  const [metrics, setMetrics] = useState({
    salesToday: 3450,
    conversionRate: 12.5,
    averageOrderValue: 85.50,
    customerSatisfaction: 4.8
  });

  // Simular datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        onlineUsers: Math.floor(Math.random() * 10) + 8,
        currentSales: prev.currentSales + Math.floor(Math.random() * 100),
        pendingOrders: Math.floor(Math.random() * 3) + 3,
        completedOrders: prev.completedOrders + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  // CORRECCIÓN: Función formatDate faltante
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-VE');
  };

  // CORRECCIÓN: Función getStatusColor faltante
  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      pending: 'warning',
      completed: 'primary',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Analytics en Tiempo Real
        </Typography>
        <Typography color="text.secondary">
          Monitoreo en vivo del desempeño de tu negocio
        </Typography>
      </Box>

      {/* Métricas en Tiempo Real */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <People color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{realTimeData.onlineUsers}</Typography>
              <Typography variant="body2" color="text.secondary">
                Usuarios Online
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Dashboard color="secondary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{realTimeData.activeSessions}</Typography>
              <Typography variant="body2" color="text.secondary">
                Sesiones Activas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <AttachMoney color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{formatCurrency(realTimeData.currentSales)}</Typography>
              <Typography variant="body2" color="text.secondary">
                Ventas Hoy
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Schedule color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{realTimeData.pendingOrders}</Typography>
              <Typography variant="body2" color="text.secondary">
                Órdenes Pendientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <ShoppingCart color="info" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{realTimeData.completedOrders}</Typography>
              <Typography variant="body2" color="text.secondary">
                Órdenes Completadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<ShowChart />} label="Dashboard" />
            <Tab icon={<TrendingUp />} label="Tendencias" />
            <Tab icon={<People />} label="Clientes" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Rendimiento de Ventas
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">Ventas Totales Hoy:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {formatCurrency(metrics.salesToday)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">Ticket Promedio:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {formatCurrency(metrics.averageOrderValue)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">Tasa de Conversión:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="success.main">
                      {formatPercentage(metrics.conversionRate)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Satisfacción del Cliente:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="success.main">
                      {metrics.customerSatisfaction}/5
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Actividad en Tiempo Real
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Usuarios Concurrentes
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(realTimeData.onlineUsers / 20) * 100}
                      color="primary"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Capacidad del Sistema
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={65}
                      color="success"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Rendimiento API
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={92}
                      color="info"
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 3, textAlign: 'center', height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Gráfico de Tendencias en Tiempo Real
            </Typography>
            <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Gráfico de tendencias en tiempo real aquí...
              </Typography>
            </Box>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3, textAlign: 'center', height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Comportamiento de Clientes en Tiempo Real
            </Typography>
            <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Análisis de clientes en tiempo real aquí...
              </Typography>
            </Box>
          </Paper>
        )}
      </UBCard>

      {/* CORRECCIÓN: Eliminación de código que usa variables no definidas */}
      {/* Sección de notificaciones - Ejemplo de uso de las funciones corregidas */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Últimas Actividades
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  { action: 'Nueva orden #12345', status: 'completed', date: '2024-05-20 14:30' },
                  { action: 'Usuario registrado', status: 'active', date: '2024-05-20 14:25' },
                  { action: 'Pago procesado', status: 'completed', date: '2024-05-20 14:20' }
                ].map((activity, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Box>
                      <Typography variant="body2">{activity.action}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.date}
                      </Typography>
                    </Box>
                    <Chip
                      label={activity.status}
                      color={getStatusColor(activity.status)}
                      size="small"
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Próximos Eventos
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  { event: 'Backup diario', time: '2024-05-20 23:00' },
                  { event: 'Reporte de cierre', time: '2024-05-20 22:00' },
                  { event: 'Actualización de stock', time: '2024-05-20 21:00' }
                ].map((event, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="body2">{event.event}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(event.time)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RealTimeAnalytics;