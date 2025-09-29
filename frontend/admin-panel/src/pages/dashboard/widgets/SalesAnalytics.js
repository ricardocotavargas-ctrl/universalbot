import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  ReceiptLong,
  LocalOffer,
  Person
} from '@mui/icons-material';

const SalesAnalytics = () => {
  const theme = useTheme();

  const salesData = {
    today: {
      revenue: 2340,
      orders: 45,
      averageOrder: 52,
      conversion: 3.2
    },
    week: {
      revenue: 15890,
      orders: 285,
      averageOrder: 55.8,
      conversion: 3.5,
      trend: '+12%'
    },
    month: {
      revenue: 52340,
      orders: 945,
      averageOrder: 55.4,
      conversion: 3.4,
      trend: '+8%'
    }
  };

  const topProducts = [
    { name: 'Producto Premium', sales: 45, revenue: 2250 },
    { name: 'Servicio Básico', sales: 38, revenue: 1900 },
    { name: 'Kit Inicial', sales: 32, revenue: 1600 },
    { name: 'Consulta Especial', sales: 28, revenue: 1400 }
  ];

  const salesChannels = [
    { channel: 'WhatsApp', sales: 45, percentage: 42 },
    { channel: 'Sitio Web', sales: 28, percentage: 26 },
    { channel: 'Instagram', sales: 22, percentage: 21 },
    { channel: 'Facebook', sales: 12, percentage: 11 }
  ];

  const MetricCard = ({ title, value, subtitle, trend, icon, color = 'primary' }) => (
    <Box sx={{ 
      p: 2, 
      border: `2px solid ${alpha(theme.palette[color].main, 0.2)}`,
      borderRadius: 2,
      background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
      height: '100%'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {title}
        </Typography>
        <Box sx={{ color: `${color}.main` }}>
          {icon}
        </Box>
      </Box>
      <Typography variant="h5" fontWeight={700} color={`${color}.dark`} gutterBottom>
        {typeof value === 'number' ? (value % 1 === 0 ? value : value.toFixed(1)) : value}
        {title.includes('Conversión') ? '%' : title.includes('Ingresos') ? '$' : ''}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
        {trend && (
          <Chip
            label={trend}
            size="small"
            sx={{ 
              backgroundColor: alpha(theme.palette.success.main, 0.2),
              color: theme.palette.success.main,
              fontSize: '0.6rem',
              height: 20
            }}
          />
        )}
      </Box>
    </Box>
  );

  const ProgressBar = ({ percentage, color = 'primary' }) => (
    <Box sx={{ 
      width: '100%', 
      height: 6, 
      backgroundColor: alpha(theme.palette[color].main, 0.1),
      borderRadius: 3,
      overflow: 'hidden'
    }}>
      <Box
        sx={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: theme.palette[color].main,
          borderRadius: 3,
          transition: 'width 0.3s ease'
        }}
      />
    </Box>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Análisis de Ventas
      </Typography>

      {/* Métricas Principales */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <MetricCard
            title="Ingresos Hoy"
            value={salesData.today.revenue}
            subtitle="Vs. ayer"
            trend="+5%"
            icon={<TrendingUp />}
            color="primary"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <MetricCard
            title="Pedidos"
            value={salesData.today.orders}
            subtitle="Este mes"
            trend="+12%"
            icon={<ShoppingCart />}
            color="success"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <MetricCard
            title="Ticket Promedio"
            value={salesData.today.averageOrder}
            subtitle="Por pedido"
            trend="+3%"
            icon={<ReceiptLong />}
            color="warning"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <MetricCard
            title="Conversión"
            value={salesData.today.conversion}
            subtitle="Tasa"
            trend="+0.2%"
            icon={<LocalOffer />}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Productos Más Vendidos */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Productos Más Vendidos
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {topProducts.map((product, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  background: alpha(theme.palette.background.paper, 0.5)
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {product.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {product.sales} ventas
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" fontWeight={600} color="primary.main">
                    ${product.revenue}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Ingresos
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Canales de Venta */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Canales de Venta
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {salesChannels.map((channel, index) => (
              <Box key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {channel.channel}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" fontWeight={600}>
                      {channel.sales} ventas
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {channel.percentage}%
                    </Typography>
                  </Box>
                </Box>
                <ProgressBar 
                  percentage={channel.percentage} 
                  color={index % 2 === 0 ? 'primary' : 'secondary'} 
                />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesAnalytics;
