import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, LinearProgress, Avatar
} from '@mui/material';
import {
  TrendingUp, Person, AttachMoney, ShowChart
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const SalesBySeller = () => {
  const [salesData, setSalesData] = useState([]);

  const mockData = [
    { id: 1, name: 'Juan Pérez', sales: 125000, target: 100000, commission: 6250, avatar: 'JP' },
    { id: 2, name: 'María García', sales: 98000, target: 90000, commission: 4900, avatar: 'MG' },
    { id: 3, name: 'Carlos López', sales: 156000, target: 120000, commission: 7800, avatar: 'CL' },
    { id: 4, name: 'Ana Rodríguez', sales: 87000, target: 95000, commission: 4350, avatar: 'AR' }
  ];

  useEffect(() => {
    setSalesData(mockData);
  }, []);

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
          Ventas por Vendedor
        </Typography>
        <Typography color="text.secondary">
          Desempeño y métricas de tu equipo de ventas
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {salesData.map((seller) => {
          const achievement = (seller.sales / seller.target) * 100;
          const isOverAchiever = achievement >= 100;
          
          return (
            <Grid item xs={12} md={6} lg={3} key={seller.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {seller.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{seller.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {isOverAchiever ? '✅ Meta superada' : '📊 En progreso'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Ventas: {formatCurrency(seller.sales)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Meta: {formatCurrency(seller.target)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Comisión: {formatCurrency(seller.commission)}
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={Math.min(achievement, 100)}
                    color={isOverAchiever ? 'success' : 'primary'}
                    sx={{ mb: 1 }}
                  />
                  
                  <Typography variant="body2" align="center">
                    {achievement.toFixed(1)}% de la meta
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <UBCard sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Ranking de Vendedores
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vendedor</TableCell>
                <TableCell align="right">Ventas</TableCell>
                <TableCell align="right">Meta</TableCell>
                <TableCell align="right">% Cumplimiento</TableCell>
                <TableCell align="right">Comisión</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData.map((seller) => {
                const achievement = (seller.sales / seller.target) * 100;
                
                return (
                  <TableRow key={seller.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2, fontSize: '0.8rem' }}>
                          {seller.avatar}
                        </Avatar>
                        {seller.name}
                      </Box>
                    </TableCell>
                    <TableCell align="right">{formatCurrency(seller.sales)}</TableCell>
                    <TableCell align="right">{formatCurrency(seller.target)}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={`${achievement.toFixed(1)}%`}
                        color={achievement >= 100 ? 'success' : achievement >= 80 ? 'warning' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">{formatCurrency(seller.commission)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>
    </Container>
  );
};

export default SalesBySeller;