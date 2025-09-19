import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Chip, Avatar, LinearProgress, Button, FormControl, InputLabel,
  Select, MenuItem
} from '@mui/material';
import {
  People, TrendingUp, Loyalty, AttachMoney, ShowChart, Download
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const CustomerAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  const customerData = {
    totalCustomers: 1245,
    newCustomers: 45,
    returningRate: 68.5,
    averageValue: 125.75,
    satisfaction: 4.8,
    segments: [
      { name: 'Premium', count: 125, value: 75000, color: 'primary' },
      { name: 'Frecuentes', count: 450, value: 45000, color: 'secondary' },
      { name: 'Ocasionales', count: 520, value: 18000, color: 'warning' },
      { name: 'Nuevos', count: 150, value: 8500, color: 'info' }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Analytics de Clientes
        </Typography>
        <Typography color="text.secondary">
          Análisis de comportamiento y valor del cliente
        </Typography>
      </Box>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Período</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Período"
            >
              <MenuItem value="week">Semanal</MenuItem>
              <MenuItem value="month">Mensual</MenuItem>
              <MenuItem value="quarter">Trimestral</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<Download />}>
            Exportar Reporte
          </Button>
        </Box>
      </UBCard>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People color="primary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Total Clientes</Typography>
              </Box>
              <Typography variant="h4">{customerData.totalCustomers}</Typography>
              <Typography variant="body2" color="success.main">
                +{customerData.newCustomers} nuevos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Loyalty color="secondary" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Tasa de Retorno</Typography>
              </Box>
              <Typography variant="h4">{customerData.returningRate}%</Typography>
              <Typography variant="body2" color="success.main">
                +5.2% vs período anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney color="info" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Valor Promedio</Typography>
              </Box>
              <Typography variant="h4">{formatCurrency(customerData.averageValue)}</Typography>
              <Typography variant="body2" color="success.main">
                +8.7% vs período anterior
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="warning" sx={{ mr: 1 }} />
                <Typography color="text.secondary">Satisfacción</Typography>
              </Box>
              <Typography variant="h4">{customerData.satisfaction}/5</Typography>
              <Typography variant="body2" color="success.main">
                96% de satisfacción
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UBCard>
            <Typography variant="h6" gutterBottom>
              Segmentación de Clientes
            </Typography>
            <Box sx={{ mt: 2 }}>
              {customerData.segments.map((segment, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: `${segment.color}.main` }}>
                        {segment.name.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">{segment.name}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight="bold">
                      {segment.count} clientes
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(segment.count / customerData.totalCustomers) * 100}
                    color={segment.color}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {formatCurrency(segment.value)} en valor
                  </Typography>
                </Box>
              ))}
            </Box>
          </UBCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <UBCard>
            <Typography variant="h6" gutterBottom>
              Comportamiento del Cliente
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main">
                    3.2x
                  </Typography>
                  <Typography variant="body2">Visitas/Mes</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary.main">
                    18 días
                  </Typography>
                  <Typography variant="body2">Frecuencia Compra</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    42%
                  </Typography>
                  <Typography variant="body2">Tasa de Retención</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">
                    12 meses
                  </Typography>
                  <Typography variant="body2">Vida Promedio</Typography>
                </Paper>
              </Grid>
            </Grid>
          </UBCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerAnalytics;