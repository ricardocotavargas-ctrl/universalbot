import React from 'react';
import {
  Box,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import {
  Speed,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Error
} from '@mui/icons-material';

const PerformanceMetrics = () => {
  const theme = useTheme();

  const metrics = [
    {
      name: 'Rendimiento del Sistema',
      value: 92,
      target: 95,
      status: 'excellent',
      trend: 'up',
      icon: <Speed />
    },
    {
      name: 'Tiempo de Respuesta',
      value: 85,
      target: 90,
      status: 'good',
      trend: 'up',
      icon: <CheckCircle />
    },
    {
      name: 'Disponibilidad',
      value: 99.9,
      target: 99.5,
      status: 'excellent',
      trend: 'stable',
      icon: <TrendingUp />
    },
    {
      name: 'Errores del Sistema',
      value: 0.2,
      target: 0.5,
      status: 'good',
      trend: 'down',
      icon: <Error />
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'primary';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      default: return 'primary';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />;
      case 'down': return <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />;
      default: return <TrendingUp sx={{ fontSize: 16, color: 'text.secondary' }} />;
    }
  };

  const MetricCard = ({ metric }) => (
    <Box sx={{ 
      p: 2, 
      border: `2px solid`,
      borderColor: `${getStatusColor(metric.status)}.light`,
      borderRadius: 2,
      background: `linear-gradient(135deg, ${getStatusColor(metric.status)}.light 0%, ${getStatusColor(metric.status)}.lighter 100%)`,
      height: '100%'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ color: `${getStatusColor(metric.status)}.main` }}>
            {metric.icon}
          </Box>
          <Typography variant="body2" fontWeight={600}>
            {metric.name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {getTrendIcon(metric.trend)}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" fontWeight={700} color={`${getStatusColor(metric.status)}.dark`}>
          {typeof metric.value === 'number' && metric.value % 1 !== 0 ? metric.value.toFixed(1) : metric.value}
          {metric.name === 'Disponibilidad' ? '%' : metric.name === 'Errores del Sistema' ? '%' : ''}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Meta: {metric.target}
          {metric.name === 'Disponibilidad' ? '%' : metric.name === 'Errores del Sistema' ? '%' : ''}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={(metric.value / metric.target) * 100}
        color={getStatusColor(metric.status)}
        sx={{ 
          height: 6, 
          borderRadius: 3,
          mb: 1
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Chip
          label={metric.status === 'excellent' ? 'Excelente' : metric.status === 'good' ? 'Bueno' : 'Crítico'}
          size="small"
          color={getStatusColor(metric.status)}
          sx={{ height: 20, fontSize: '0.65rem' }}
        />
        <Typography variant="caption" color="text.secondary">
          {((metric.value / metric.target) * 100).toFixed(1)}% de la meta
        </Typography>
      </Box>
    </Box>
  );

  const systemStatus = {
    overall: 'healthy',
    services: [
      { name: 'API Principal', status: 'operational', latency: '45ms' },
      { name: 'Base de Datos', status: 'operational', latency: '12ms' },
      { name: 'Servicio de Mensajes', status: 'degraded', latency: '120ms' },
      { name: 'Cache', status: 'operational', latency: '5ms' }
    ]
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Métricas de Rendimiento
      </Typography>

      {/* Métricas Principales */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <MetricCard metric={metric} />
          </Grid>
        ))}
      </Grid>

      {/* Estado del Sistema */}
      <Box>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Estado del Sistema
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {systemStatus.services.map((service, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                background: alpha(
                  service.status === 'operational' 
                    ? theme.palette.success.main 
                    : service.status === 'degraded'
                    ? theme.palette.warning.main
                    : theme.palette.error.main,
                  0.05
                )
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 
                      service.status === 'operational' ? 'success.main' :
                      service.status === 'degraded' ? 'warning.main' : 'error.main'
                  }}
                />
                <Typography variant="body2">
                  {service.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  {service.latency}
                </Typography>
                <Chip
                  label={service.status === 'operational' ? 'Operacional' : 'Degradado'}
                  size="small"
                  color={service.status === 'operational' ? 'success' : 'warning'}
                  variant="outlined"
                  sx={{ height: 20, fontSize: '0.6rem' }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PerformanceMetrics;
