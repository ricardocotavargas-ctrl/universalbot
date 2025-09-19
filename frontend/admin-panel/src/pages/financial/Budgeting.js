import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, LinearProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
  Savings, TrendingUp, TrendingDown, Add, ShowChart
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const Budgeting = () => {
  const [budgets, setBudgets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const mockBudgets = [
    { id: 1, category: 'Nómina', budget: 120000, actual: 118500, variance: -1500, period: 'Mensual' },
    { id: 2, category: 'Marketing', budget: 25000, actual: 27300, variance: 2300, period: 'Mensual' },
    { id: 3, category: 'Suministros', budget: 15000, actual: 14200, variance: -800, period: 'Mensual' },
    { id: 4, category: 'Servicios', budget: 18000, actual: 17500, variance: -500, period: 'Mensual' },
    { id: 5, category: 'Mantenimiento', budget: 8000, actual: 9200, variance: 1200, period: 'Trimestral' }
  ];

  useEffect(() => {
    setBudgets(mockBudgets);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getVarianceColor = (variance) => {
    if (variance > 0) return 'error'; // Sobregasto
    if (variance < 0) return 'success'; // Ahorro
    return 'default';
  };

  const getVarianceIcon = (variance) => {
    if (variance > 0) return <TrendingUp />;
    if (variance < 0) return <TrendingDown />;
    return null;
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Presupuestos
        </Typography>
        <Typography color="text.secondary">
          Planifica y controla tus gastos con presupuestos
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Presupuesto Total
              </Typography>
              <Typography variant="h4">
                {formatCurrency(budgets.reduce((sum, b) => sum + b.budget, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Gasto Real
              </Typography>
              <Typography variant="h4">
                {formatCurrency(budgets.reduce((sum, b) => sum + b.actual, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Variación Total
              </Typography>
              <Typography variant="h4" color={getVarianceColor(budgets.reduce((sum, b) => sum + b.variance, 0))}>
                {formatCurrency(budgets.reduce((sum, b) => sum + b.variance, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Categorías
              </Typography>
              <Typography variant="h4">
                {budgets.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Período</InputLabel>
            <Select label="Período">
              <MenuItem value="monthly">Mensual</MenuItem>
              <MenuItem value="quarterly">Trimestral</MenuItem>
              <MenuItem value="annual">Anual</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Año"
            type="number"
            defaultValue={2024}
            sx={{ minWidth: 100 }}
          />
          
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
            Nuevo Presupuesto
          </Button>
          
          <Button variant="outlined" startIcon={<ShowChart />}>
            Reporte Completo
          </Button>
        </Box>
      </UBCard>

      <UBCard>
        <Typography variant="h6" gutterBottom>
          Presupuestos por Categoría
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Categoría</TableCell>
                <TableCell>Período</TableCell>
                <TableCell align="right">Presupuesto</TableCell>
                <TableCell align="right">Real</TableCell>
                <TableCell align="right">Variación</TableCell>
                <TableCell align="center">% Ejecución</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budgets.map((budget) => {
                const percentage = (budget.actual / budget.budget) * 100;
                const varianceColor = getVarianceColor(budget.variance);
                
                return (
                  <TableRow key={budget.id}>
                    <TableCell>
                      <Typography fontWeight="medium">{budget.category}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={budget.period} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">{formatCurrency(budget.budget)}</TableCell>
                    <TableCell align="right">{formatCurrency(budget.actual)}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {getVarianceIcon(budget.variance)}
                        <Typography color={varianceColor} fontWeight="bold">
                          {formatCurrency(budget.variance)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(percentage, 100)}
                          color={percentage > 100 ? 'error' : 'primary'}
                          sx={{ width: '60%', mr: 1 }}
                        />
                        <Typography variant="body2">
                          {percentage.toFixed(1)}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={percentage > 100 ? 'Excedido' : 'Dentro del presupuesto'}
                        color={percentage > 100 ? 'error' : 'success'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="outlined">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>

      {/* Diálogo para nuevo presupuesto */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Nuevo Presupuesto</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Categoría" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Período</InputLabel>
                <Select label="Período">
                  <MenuItem value="monthly">Mensual</MenuItem>
                  <MenuItem value="quarterly">Trimestral</MenuItem>
                  <MenuItem value="annual">Anual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Monto del Presupuesto"
                type="number"
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Año"
                type="number"
                defaultValue={2024}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={2}
                placeholder="Descripción detallada del presupuesto..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Crear Presupuesto
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Budgeting;