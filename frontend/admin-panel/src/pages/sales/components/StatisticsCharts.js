// frontend/admin-panel/src/pages/sales/components/StatisticsCharts.js
import React from 'react';
import {
  Box, Paper, Typography, Grid, useTheme
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const StatisticsCharts = ({ salesData, timeRange }) => {
  const theme = useTheme();

  // Datos para gráficos
  const barChartData = salesData.map(day => ({
    date: new Date(day.date).toLocaleDateString('es-VE', { day: 'numeric', month: 'short' }),
    ventas: day.sales,
    transacciones: day.transactions
  }));

  const pieChartData = [
    { name: 'Efectivo', value: 45 },
    { name: 'Tarjeta', value: 30 },
    { name: 'Transferencia', value: 20 },
    { name: 'Pago Móvil', value: 5 }
  ];

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main, 
                 theme.palette.success.main, theme.palette.warning.main];

  return (
    <Grid container spacing={3}>
      {/* Gráfico de Barras - Ventas Diarias */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Ventas Diarias
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, '']}
              />
              <Bar dataKey="ventas" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Gráfico Circular - Métodos de Pago */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Métodos de Pago
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, '']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Gráfico de Líneas - Tendencia */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Tendencia de Ventas
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, '']}
              />
              <Line 
                type="monotone" 
                dataKey="ventas" 
                stroke={theme.palette.primary.main} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="transacciones" 
                stroke={theme.palette.secondary.main} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StatisticsCharts;