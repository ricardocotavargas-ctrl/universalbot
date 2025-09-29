import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Avatar,
  AvatarGroup,
  alpha,
  useTheme
} from '@mui/material';
import {
  Person,
  Group,
  Star,
  TrendingUp,
  Schedule
} from '@mui/icons-material';

const CustomerInsights = () => {
  const theme = useTheme();

  const customerStats = {
    total: 1245,
    newThisMonth: 45,
    active: 890,
    returning: 235
  };

  const satisfactionData = {
    averageRating: 4.7,
    totalReviews: 345,
    distribution: [
      { stars: 5, count: 280, percentage: 81 },
      { stars: 4, count: 45, percentage: 13 },
      { stars: 3, count: 12, percentage: 3.5 },
      { stars: 2, count: 5, percentage: 1.5 },
      { stars: 1, count: 3, percentage: 1 }
    ]
  };

  const recentCustomers = [
    { name: 'María González', joinDate: '2024-01-15', purchases: 3, totalSpent: 450 },
    { name: 'Carlos Rodríguez', joinDate: '2024-01-14', purchases: 1, totalSpent: 120 },
    { name: 'Ana Martínez', joinDate: '2024-01-13', purchases: 5, totalSpent: 890 },
    { name: 'David López', joinDate: '2024-01-12', purchases: 2, totalSpent: 230 }
  ];

  const customerSegments = [
    { segment: 'Clientes Premium', count: 45, growth: '+15%', color: 'primary' },
    { segment: 'Clientes Regulares', count: 320, growth: '+8%', color: 'success' },
    { segment: 'Nuevos Clientes', count: 45, growth: '+25%', color: 'warning' },
    { segment: 'Inactivos', count: 125, growth: '-5%', color: 'error' }
  ];

  const StatCard = ({ title, value, subtitle, trend, icon, color = 'primary' }) => (
    <Box sx={{ 
      p: 2, 
      border: `2px solid ${alpha(theme.palette[color].main, 0.2)}`,
      borderRadius: 2,
      background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
      height: '100%',
      textAlign: 'center'
    }}>
      <Box sx={{ color: `${color}.main`, mb: 1 }}>
        {icon}
      </Box>
      <Typography variant="h4" fontWeight={700} color={`${color}.dark`} gutterBottom>
        {value.toLocaleString('es-ES')}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
        {trend && (
          <Chip
            label={trend}
            size="small"
            sx={{ 
              backgroundColor: alpha(
                trend.includes('+') ? theme.palette.success.main : theme.palette.error.main,
                0.2
              ),
              color: trend.includes('+') ? theme.palette.success.main : theme.palette.error.main,
              fontSize: '0.6rem',
              height: 20
            }}
          />
        )}
      </Box>
    </Box>
  );

  const RatingBar = ({ stars, count, percentage }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, width: 60 }}>
        <Typography variant="body2" fontWeight={500}>
          {stars}
        </Typography>
        <Star sx={{ fontSize: 16, color: 'warning.main' }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ 
          width: '100%', 
          height: 8, 
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          borderRadius: 4,
          overflow: 'hidden'
        }}>
          <Box
            sx={{
              width: `${percentage}%`,
              height: '100%',
              backgroundColor: theme.palette.primary.main,
              borderRadius: 4
            }}
          />
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ width: 40, textAlign: 'right' }}>
        {count}
      </Typography>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Información de Clientes
      </Typography>

      {/* Estadísticas Principales */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <StatCard
            title="Total Clientes"
            value={customerStats.total}
            subtitle="Registrados"
            trend="+12%"
            icon={<Group />}
            color="primary"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            title="Nuevos Este Mes"
            value={customerStats.newThisMonth}
            subtitle="Enero 2024"
            trend="+25%"
            icon={<Person />}
            color="success"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            title="Clientes Activos"
            value={customerStats.active}
            subtitle="Últimos 30 días"
            trend="+8%"
            icon={<TrendingUp />}
            color="warning"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            title="Clientes Recurrentes"
            value={customerStats.returning}
            subtitle="Fidelidad"
            trend="+15%"
            icon={<Schedule />}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Satisfacción del Cliente */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Satisfacción del Cliente
          </Typography>
          <Box sx={{ 
            p: 2, 
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            background: alpha(theme.palette.background.paper, 0.5)
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  {satisfactionData.averageRating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  de 5 estrellas
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    sx={{
                      fontSize: 20,
                      color: star <= Math.floor(satisfactionData.averageRating) 
                        ? 'warning.main' 
                        : 'text.disabled'
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Distribución de Calificaciones */}
            <Box sx={{ mt: 2 }}>
              {satisfactionData.distribution.map((rating, index) => (
                <RatingBar
                  key={index}
                  stars={rating.stars}
                  count={rating.count}
                  percentage={rating.percentage}
                />
              ))}
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Basado en {satisfactionData.totalReviews} reseñas
            </Typography>
          </Box>
        </Grid>

        {/* Segmentos de Clientes */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Segmentos de Clientes
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {customerSegments.map((segment, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  background: alpha(theme.palette[segment.color].main, 0.05)
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {segment.segment}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {segment.count} clientes
                  </Typography>
                </Box>
                <Chip
                  label={segment.growth}
                  size="small"
                  color={segment.growth.includes('+') ? 'success' : 'error'}
                  variant="outlined"
                />
              </Box>
            ))}
          </Box>

          {/* Clientes Recientes */}
          <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
            Clientes Recientes
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {recentCustomers.map((customer, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {customer.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {customer.purchases} compras
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" fontWeight={600} color="primary.main">
                  ${customer.totalSpent}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerInsights;
