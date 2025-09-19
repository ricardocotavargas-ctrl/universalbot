// frontend/admin-panel/src/pages/accounts/components/AccountsDashboard.js
import React from 'react';
import {
  Box, Paper, Typography, Grid, Chip,
  LinearProgress, IconButton
} from '@mui/material';
import {
  AttachMoney, TrendingUp, TrendingDown,
  AccountBalance, Warning, Schedule
} from '@mui/icons-material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AccountsDashboard = ({ data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Datos de ejemplo para gráficos
  const chartData = [
    { name: 'Ene', payables: 12500, receivables: 23400 },
    { name: 'Feb', payables: 18500, receivables: 28700 },
    { name: 'Mar', payables: 15200, receivables: 31200 },
    { name: 'Abr', payables: 19800, receivables: 26500 },
    { name: 'May', payables: 16700, receivables: 29800 },
    { name: 'Jun', payables: 21300, receivables: 32400 }
  ];

  const agingData = [
    { range: '0-30 días', amount: 15600, percentage: 45 },
    { range: '31-60 días', amount: 8900, percentage: 26 },
    { range: '61-90 días', amount: 6700, percentage: 19 },
    { range: '+90 días', amount: 3800, percentage: 10 }
  ];

  const StatCard = ({ icon, title, value, subtitle, color = 'primary' }) => (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4" component="div" color={`${color}.main`}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ color: `${color}.main` }}>
          {icon}
        </Box>
      </Box>
    </Paper>
  );

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Gráfico de Cuentas por Pagar vs Cobrar */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Evolución de Cuentas por Pagar vs Cobrar
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), '']}
                />
                <Bar dataKey="payables" fill="#8884d8" name="Por Pagar" />
                <Bar dataKey="receivables" fill="#82ca9d" name="Por Cobrar" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Aging Report */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Aging de Cuentas por Cobrar
            </Typography>
            {agingData.map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{item.range}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {formatCurrency(item.amount)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={item.percentage}
                  color={
                    index === 0 ? 'success' :
                    index === 1 ? 'info' :
                    index === 2 ? 'warning' : 'error'
                  }
                />
                <Typography variant="caption" color="text.secondary">
                  {item.percentage}% del total
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Próximos Vencimientos */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Próximos Vencimientos (7 días)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                  <Typography variant="h4" color="error.main">3</Typography>
                  <Typography variant="body2">Vencidos</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatCurrency(15600)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                  <Typography variant="h4" color="warning.main">7</Typography>
                  <Typography variant="body2">Por Vencer</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatCurrency(28900)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                  <Typography variant="h4" color="info.main">12</Typography>
                  <Typography variant="body2">En término</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatCurrency(45200)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                  <Typography variant="h4" color="success.main">18</Typography>
                  <Typography variant="body2">Pagados</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatCurrency(67800)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountsDashboard;