// frontend/admin-panel/src/pages/Reports.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
  alpha,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  People,
  Message,
  AttachMoney,
  Schedule,
  Download,
  Email,
  CalendarToday,
  BarChart,
  PieChart,
  ShowChart
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import UBButton from '../../components/ui/UBButton';

const Reports = () => {
  const theme = useTheme();
  const [dateRange, setDateRange] = useState('30d');
  const [channelFilter, setChannelFilter] = useState('all');
  const [activeMetric, setActiveMetric] = useState('overview');

  // Datos de ejemplo para reportes
  const reportData = {
    overview: {
      totalMessages: 3250,
      responseRate: 89.2,
      avgResponseTime: '1.2min',
      customerSatisfaction: 94.5,
      revenue: 28750,
      newClients: 42
    },
    channels: {
      whatsapp: { messages: 1450, responses: 1380, conversion: 32.1 },
      facebook: { messages: 980, responses: 890, conversion: 28.7 },
      instagram: { messages: 620, responses: 580, conversion: 24.3 },
      email: { messages: 200, responses: 195, conversion: 38.9 }
    },
    trends: [
      { day: 'Lun', messages: 450, revenue: 4200 },
      { day: 'Mar', messages: 520, revenue: 4800 },
      { day: 'Mié', messages: 480, revenue: 4500 },
      { day: 'Jue', messages: 610, revenue: 5600 },
      { day: 'Vie', messages: 690, revenue: 6200 },
      { day: 'Sáb', messages: 320, revenue: 2900 },
      { day: 'Dom', messages: 180, revenue: 1550 }
    ]
  };

  const MetricCard = ({ title, value, change, icon, color = 'primary' }) => (
    <UBCard sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
            {value}
          </Typography>
          {change && (
            <Typography 
              variant="body2" 
              color={change.startsWith('+') ? 'success.main' : 'error.main'}
              fontWeight={600}
            >
              {change} vs período anterior
            </Typography>
          )}
        </Box>
        <Box sx={{ 
          color: `${color}.main`, 
          fontSize: 40,
          opacity: 0.8
        }}>
          {icon}
        </Box>
      </Box>
    </UBCard>
  );

  const ChannelCard = ({ channel, data }) => {
    const getChannelColor = (channel) => {
      switch (channel) {
        case 'whatsapp': return '#25D366';
        case 'facebook': return '#1877F2';
        case 'instagram': return '#E4405F';
        case 'email': return '#EA4335';
        default: return theme.palette.primary.main;
      }
    };

    const getChannelIcon = (channel) => {
      switch (channel) {
        case 'whatsapp': return <Message />;
        case 'facebook': return <People />;
        case 'instagram': return <ShowChart />;
        case 'email': return <Email />;
        default: return <Message />;
      }
    };

    return (
      <UBCard sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ 
            backgroundColor: alpha(getChannelColor(channel), 0.1),
            borderRadius: '8px',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: getChannelColor(channel)
          }}>
            {getChannelIcon(channel)}
          </Box>
          <Typography variant="h6" fontWeight={600} textTransform="capitalize">
            {channel}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color={getChannelColor(channel)}>
                {data.messages}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mensajes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700}>
                {data.responses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Respuestas
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={(data.responses / data.messages) * 100} 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              backgroundColor: alpha(getChannelColor(channel), 0.2),
              '& .MuiLinearProgress-bar': {
                backgroundColor: getChannelColor(channel)
              }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Tasa de respuesta
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              {((data.responses / data.messages) * 100).toFixed(1)}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ 
          mt: 2, 
          p: 2, 
          backgroundColor: alpha(getChannelColor(channel), 0.05), 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <Typography variant="body2" fontWeight={600}>
            {data.conversion}% conversión
          </Typography>
        </Box>
      </UBCard>
    );
  };

  const TrendChart = () => (
    <UBCard>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Tendencia Semanal
      </Typography>
      <Box sx={{ height: 200, mt: 3 }}>
        {/* Aquí iría un gráfico real con Chart.js o similar */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'end', 
          justifyContent: 'space-around', 
          height: '100%',
          padding: 2
        }}>
          {reportData.trends.map((day, index) => (
            <Box key={day.day} sx={{ textAlign: 'center', width: '40px' }}>
              <Box
                sx={{
                  height: `${(day.messages / 700) * 100}px`,
                  backgroundColor: alpha(theme.palette.primary.main, 0.6),
                  borderRadius: '4px 4px 0 0',
                  marginBottom: 1
                }}
              />
              <Typography variant="caption" display="block">
                {day.day}
              </Typography>
              <Typography variant="caption" display="block" fontWeight={600}>
                {day.messages}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </UBCard>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Analytics & Reportes
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Métricas y análisis de desempeño de tu negocio
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <UBButton
                variant="outlined"
                startIcon={<Download />}
              >
                Exportar PDF
              </UBButton>
              <UBButton
                variant="outlined"
                startIcon={<Email />}
              >
                Enviar por Email
              </UBButton>
            </Box>
          </Box>

          {/* Filtros */}
          <UBCard sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Rango de Fechas</InputLabel>
                  <Select
                    value={dateRange}
                    label="Rango de Fechas"
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <MenuItem value="7d">Últimos 7 días</MenuItem>
                    <MenuItem value="30d">Últimos 30 días</MenuItem>
                    <MenuItem value="90d">Últimos 90 días</MenuItem>
                    <MenuItem value="ytd">Este año</MenuItem>
                    <MenuItem value="custom">Personalizado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Canal</InputLabel>
                  <Select
                    value={channelFilter}
                    label="Canal"
                    onChange={(e) => setChannelFilter(e.target.value)}
                  >
                    <MenuItem value="all">Todos los canales</MenuItem>
                    <MenuItem value="whatsapp">WhatsApp</MenuItem>
                    <MenuItem value="facebook">Facebook</MenuItem>
                    <MenuItem value="instagram">Instagram</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Métrica Principal</InputLabel>
                  <Select
                    value={activeMetric}
                    label="Métrica Principal"
                    onChange={(e) => setActiveMetric(e.target.value)}
                  >
                    <MenuItem value="overview">Visión General</MenuItem>
                    <MenuItem value="performance">Rendimiento</MenuItem>
                    <MenuItem value="conversion">Conversiones</MenuItem>
                    <MenuItem value="revenue">Ingresos</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </UBCard>
        </Box>

        {/* Métricas Principales */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <MetricCard
              title="Mensajes Totales"
              value={reportData.overview.totalMessages.toLocaleString('es-ES')}
              change="+12.5%"
              icon={<Message />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <MetricCard
              title="Tasa de Respuesta"
              value={`${reportData.overview.responseRate}%`}
              change="+3.2%"
              icon={<TrendingUp />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <MetricCard
              title="Tiempo Respuesta"
              value={reportData.overview.avgResponseTime}
              change="-0.3min"
              icon={<Schedule />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <MetricCard
              title="Satisfacción"
              value={`${reportData.overview.customerSatisfaction}%`}
              change="+1.8%"
              icon={<People />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <MetricCard
              title="Ingresos"
              value={`$${reportData.overview.revenue.toLocaleString('es-ES')}`}
              change="+15.7%"
              icon={<AttachMoney />}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <MetricCard
              title="Nuevos Clientes"
              value={reportData.overview.newClients}
              change="+8.3%"
              icon={<People />}
              color="info"
            />
          </Grid>
        </Grid>

        {/* Canales de Comunicación */}
        <UBCard
          title="📊 Desempeño por Canal"
          subtitle="Métricas detalladas de cada canal de comunicación"
          sx={{ mb: 4 }}
        >
          <Grid container spacing={3}>
            {Object.entries(reportData.channels).map(([channel, data]) => (
              <Grid item xs={12} sm={6} md={3} key={channel}>
                <ChannelCard channel={channel} data={data} />
              </Grid>
            ))}
          </Grid>
        </UBCard>

        {/* Gráficos y Tendencia */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TrendChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <UBCard>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Resumen de Rendimiento
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  { label: 'Mensajes automáticos', value: 2450, total: 3250, color: 'primary' },
                  { label: 'Mensajes manuales', value: 800, total: 3250, color: 'secondary' },
                  { label: 'Respuestas exitosas', value: 2900, total: 3250, color: 'success' },
                  { label: 'Conversiones', value: 156, total: 3250, color: 'warning' }
                ].map((item, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{item.label}</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {item.value}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(item.value / item.total) * 100} 
                      sx={{ 
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: alpha(theme.palette[item.color].main, 0.2),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: theme.palette[item.color].main
                        }
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </UBCard>
          </Grid>
        </Grid>

        {/* Reportes Rápidos */}
        <UBCard title="📈 Reportes Rápidos" sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 2, cursor: 'pointer' }}>
                <BarChart sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">Reporte de Ventas</Typography>
                <Typography variant="body2" color="text.secondary">
                  Análisis detallado de conversiones
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 2, cursor: 'pointer' }}>
                <PieChart sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h6">Reporte de Canales</Typography>
                <Typography variant="body2" color="text.secondary">
                  Distribución por plataforma
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 2, cursor: 'pointer' }}>
                <People sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h6">Reporte de Clientes</Typography>
                <Typography variant="body2" color="text.secondary">
                  Comportamiento y engagement
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card variant="outlined" sx={{ textAlign: 'center', p: 2, cursor: 'pointer' }}>
                <CalendarToday sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h6">Reporte Mensual</Typography>
                <Typography variant="body2" color="text.secondary">
                  Resumen completo del mes
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </UBCard>
      </Box>
    </Container>
  );
};

export default Reports;