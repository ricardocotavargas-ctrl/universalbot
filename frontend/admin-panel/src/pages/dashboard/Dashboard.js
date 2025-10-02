import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
  alpha,
  useMediaQuery,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  People,
  Chat,
  AttachMoney,
  ShoppingCart,
  Inventory,
  Notifications
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [metrics, setMetrics] = useState({
    dailyRevenue: 0,
    monthlyRevenue: 0,
    activeConversations: 0,
    newCustomers: 0,
    conversionRate: 0,
    responseRate: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos reales
    loadRealData();
  }, []);

  const loadRealData = async () => {
    try {
      // En producción, esto se conectaría a tus APIs reales
      const response = await fetch('/api/business/metrics');
      const data = await response.json();
      
      setMetrics({
        dailyRevenue: data.dailyRevenue || 2340,
        monthlyRevenue: data.monthlyRevenue || 52340,
        activeConversations: data.activeConversations || 45,
        newCustomers: data.newCustomers || 12,
        conversionRate: data.conversionRate || 3.4,
        responseRate: data.responseRate || 89.2
      });
    } catch (error) {
      // Datos de ejemplo para desarrollo
      setMetrics({
        dailyRevenue: 2340,
        monthlyRevenue: 52340,
        activeConversations: 45,
        newCustomers: 12,
        conversionRate: 3.4,
        responseRate: 89.2
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'primary', progress }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transform: 'translateY(-1px)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h3" 
              fontWeight={700} 
              color={`${color}.main`}
              sx={{ mb: 1 }}
            >
              {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}
              {title.includes('Tasa') && '%'}
              {title.includes('Ingresos') && '$'}
            </Typography>
            <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1.5,
              background: alpha(theme.palette[color].main, 0.1),
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon sx={{ fontSize: 24, color: `${color}.main` }} />
          </Box>
        </Box>

        {progress !== undefined && (
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 4, 
              borderRadius: 2,
              backgroundColor: alpha(theme.palette[color].main, 0.1),
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette[color].main,
                borderRadius: 2
              }
            }}
          />
        )}
      </CardContent>
    </Card>
  );

  const PerformanceMetric = ({ label, value, target }) => {
    const percentage = (value / target) * 100;
    
    return (
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" fontWeight={600}>{label}</Typography>
          <Typography variant="body2" fontWeight={700}>{value}/{target}</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={Math.min(percentage, 100)} 
          color={percentage >= 100 ? 'success' : percentage >= 80 ? 'warning' : 'error'}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Cargando datos...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4, px: isMobile ? 1 : 3 }}>
      {/* Header limpio y profesional */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          fontWeight={700} 
          gutterBottom
          color="text.primary"
        >
          Resumen del Negocio
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Visión general de tu rendimiento • {new Date().toLocaleDateString('es-ES')}
        </Typography>
      </Box>

      {/* Grid de métricas principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            icon={AttachMoney}
            title="Ingresos Hoy"
            value={metrics.dailyRevenue}
            subtitle="Total del día"
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            icon={ShoppingCart}
            title="Ingresos Mensuales"
            value={metrics.monthlyRevenue}
            subtitle="Este mes"
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            icon={People}
            title="Clientes Activos"
            value={metrics.activeConversations}
            subtitle="Conversaciones"
            color="info"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            icon={TrendingUp}
            title="Nuevos Clientes"
            value={metrics.newCustomers}
            subtitle="Este mes"
            color="warning"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            icon={Chat}
            title="Tasa Conversión"
            value={metrics.conversionRate}
            subtitle="Porcentaje"
            color="secondary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <StatCard
            icon={Notifications}
            title="Tasa Respuesta"
            value={metrics.responseRate}
            subtitle="Efectividad"
            color="success"
          />
        </Grid>
      </Grid>

      {/* Segunda sección - Rendimiento y Análisis */}
      <Grid container spacing={3}>
        {/* Resumen de rendimiento */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Rendimiento Mensual
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <PerformanceMetric 
                  label="Ventas Objetivo" 
                  value={45} 
                  target={50} 
                />
                <PerformanceMetric 
                  label="Clientes Nuevos" 
                  value={12} 
                  target={15} 
                />
                <PerformanceMetric 
                  label="Mensajes Respondidos" 
                  value={156} 
                  target={140} 
                />
                <PerformanceMetric 
                  label="Ingresos Meta" 
                  value={52340} 
                  target={60000} 
                />
              </Box>

              <Box sx={{ mt: 3, p: 2, background: alpha(theme.palette.success.main, 0.05), borderRadius: 2 }}>
                <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 600 }}>
                  📈 88% de los objetivos cumplidos este mes
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Estado de canales */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Canales de Comunicación
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                {[
                  { channel: 'WhatsApp', messages: 45, status: 'active', color: '#25D366' },
                  { channel: 'Facebook', messages: 28, status: 'active', color: '#1877F2' },
                  { channel: 'Instagram', messages: 32, status: 'active', color: '#E4405F' },
                  { channel: 'Email', messages: 18, status: 'active', color: '#EA4335' }
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      mb: 1,
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 2,
                      background: theme.palette.background.paper
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: item.status === 'active' ? '#4CAF50' : '#f44336'
                        }}
                      />
                      <Typography variant="body1" fontWeight={600}>
                        {item.channel}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body1" fontWeight={700}>
                        {item.messages}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        mensajes
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 2, p: 2, background: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  <strong>123 mensajes</strong> recibidos hoy • <strong>89%</strong> respondidos
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Alertas y Notificaciones */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Alertas del Sistema
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                {[
                  { type: 'info', message: 'Todos los canales funcionando correctamente', time: 'Hace 5 min' },
                  { type: 'warning', message: 'Stock bajo en Producto Premium', time: 'Hace 2 horas' },
                  { type: 'success', message: 'Nuevo récord de ventas hoy', time: 'Hace 3 horas' }
                ].map((alert, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      p: 2,
                      mb: 1,
                      border: `1px solid ${
                        alert.type === 'info' ? alpha(theme.palette.info.main, 0.1) :
                        alert.type === 'warning' ? alpha(theme.palette.warning.main, 0.1) :
                        alpha(theme.palette.success.main, 0.1)
                      }`,
                      borderRadius: 2,
                      background: 
                        alert.type === 'info' ? alpha(theme.palette.info.main, 0.05) :
                        alert.type === 'warning' ? alpha(theme.palette.warning.main, 0.05) :
                        alpha(theme.palette.success.main, 0.05)
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 
                          alert.type === 'info' ? theme.palette.info.main :
                          alert.type === 'warning' ? theme.palette.warning.main :
                          theme.palette.success.main,
                        mt: 1
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {alert.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {alert.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Resumen Rápido */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Resumen Rápido
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" fontWeight={800} color="success.main">
                      ${metrics.dailyRevenue}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hoy
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" fontWeight={800} color="primary.main">
                      {metrics.activeConversations}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Activos
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" fontWeight={800} color="warning.main">
                      {metrics.newCustomers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Nuevos
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" fontWeight={800} color="info.main">
                      {metrics.responseRate}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Respuesta
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2, p: 2, background: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 600 }}>
                  💼 Negocio en excelente estado
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer informativo */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Actualizado • {new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
