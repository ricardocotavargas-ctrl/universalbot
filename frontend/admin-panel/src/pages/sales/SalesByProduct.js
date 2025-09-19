import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, LinearProgress
} from '@mui/material';
import {
  Inventory, TrendingUp, AttachMoney
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const SalesByProduct = () => {
  const [productsData, setProductsData] = useState([]);

  const mockData = [
    { id: 1, name: 'Café Premium', sales: 45000, cost: 18000, margin: 60, units: 150 },
    { id: 2, name: 'Té Especial', sales: 28000, cost: 14000, margin: 50, units: 200 },
    { id: 3, name: 'Pastelería', sales: 32000, cost: 16000, margin: 50, units: 80 },
    { id: 4, name: 'Bebidas', sales: 18000, cost: 9000, margin: 50, units: 120 }
  ];

  useEffect(() => {
    setProductsData(mockData);
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
          Ventas por Producto
        </Typography>
        <Typography color="text.secondary">
          Análisis de rentabilidad por producto
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {productsData.map((product) => (
          <Grid item xs={12} md={6} lg={3} key={product.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Inventory sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">{product.name}</Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Ventas: {formatCurrency(product.sales)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Costo: {formatCurrency(product.cost)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Unidades: {product.unities}
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Margen: {product.margin}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={product.margin}
                    color={product.margin >= 60 ? 'success' : product.margin >= 40 ? 'warning' : 'error'}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <UBCard>
        <Typography variant="h6" gutterBottom>
          Ranking de Productos
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align="right">Ventas</TableCell>
                <TableCell align="right">Costo</TableCell>
                <TableCell align="right">Margen</TableCell>
                <TableCell align="right">Unidades</TableCell>
                <TableCell align="right">Rentabilidad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Inventory sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                      {product.name}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{formatCurrency(product.sales)}</TableCell>
                  <TableCell align="right">{formatCurrency(product.cost)}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${product.margin}%`}
                      color={product.margin >= 60 ? 'success' : product.margin >= 40 ? 'warning' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">{product.unities}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(product.sales - product.cost)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>
    </Container>
  );
};

export default SalesByProduct;