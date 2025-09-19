// frontend/admin-panel/src/pages/financial/FixedVariableExpenses.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Tabs, Tab, TextField, Button, Chip, LinearProgress, Dialog,
  FormControl, InputLabel, Select, MenuItem, IconButton, DialogTitle,
  DialogContent, DialogActions, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Switch, FormControlLabel
} from '@mui/material';
import {
  TrendingUp, TrendingDown, AttachMoney, ShowChart,
  Download, CalendarToday, FilterList, CompareArrows,
  Add, Edit, Delete, Category, Receipt, Analytics,
  Savings, BusinessCenter, Home, LocalAtm
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FixedVariableExpenses = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState('month');
  const [expenseType, setExpenseType] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseData, setExpenseData] = useState({});

  // Datos de ejemplo para gastos
  const mockExpenseData = {
    totalExpenses: 300000,
    fixedExpenses: 180000,
    variableExpenses: 120000,
    monthlyBreakdown: [
      { month: 'Ene', fixed: 150000, variable: 80000, total: 230000 },
      { month: 'Feb', fixed: 150000, variable: 85000, total: 235000 },
      { month: 'Mar', fixed: 180000, variable: 90000, total: 270000 },
      { month: 'Abr', fixed: 180000, variable: 82000, total: 262000 },
      { month: 'May', fixed: 180000, variable: 95000, total: 275000 },
      { month: 'Jun', fixed: 180000, variable: 100000, total: 280000 }
    ],
    fixedExpensesDetail: [
      { id: 1, category: 'Nómina', amount: 120000, recurring: true, frequency: 'mensual', vendor: 'Nómina empresa' },
      { id: 2, category: 'Alquiler', amount: 60000, recurring: true, frequency: 'mensual', vendor: 'Inmobiliaria XYZ' },
      { id: 3, category: 'Servicios', amount: 30000, recurring: true, frequency: 'mensual', vendor: 'Empresa eléctrica' },
      { id: 4, category: 'Seguros', amount: 15000, recurring: true, frequency: 'trimestral', vendor: 'Aseguradora ABC' },
      { id: 5, category: 'Software', amount: 10000, recurring: true, frequency: 'anual', vendor: 'SaaS Provider' }
    ],
    variableExpensesDetail: [
      { id: 6, category: 'Marketing', amount: 45000, recurring: false, frequency: 'variable', vendor: 'Agencia Digital' },
      { id: 7, category: 'Materiales', amount: 35000, recurring: false, frequency: 'variable', vendor: 'Proveedor Principal' },
      { id: 8, category: 'Comisiones', amount: 25000, recurring: false, frequency: 'variable', vendor: 'Vendedores' },
      { id: 9, category: 'Mantenimiento', amount: 15000, recurring: false, frequency: 'variable', vendor: 'Técnicos' }
    ],
    expenseCategories: [
      { name: 'Nómina', type: 'fixed', budget: 120000, actual: 120000, variance: 0 },
      { name: 'Alquiler', type: 'fixed', budget: 60000, actual: 60000, variance: 0 },
      { name: 'Servicios', type: 'fixed', budget: 25000, actual: 30000, variance: -5000 },
      { name: 'Marketing', type: 'variable', budget: 40000, actual: 45000, variance: -5000 },
      { name: 'Materiales', type: 'variable', budget: 30000, actual: 35000, variance: -5000 }
    ]
  };

  useEffect(() => {
    setExpenseData(mockExpenseData);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Nómina': <BusinessCenter />,
      'Alquiler': <Home />,
      'Servicios': <LocalAtm />,
      'Marketing': <Analytics />,
      'Materiales': <Category />,
      'Seguros': <Savings />,
      'Software': <Receipt />,
      'Comisiones': <AttachMoney />,
      'Mantenimiento': <ShowChart />
    };
    return icons[category] || <Receipt />;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const ExpenseMetricCard = ({ title, value, trend, color = 'primary', icon, subtitle }) => {
    const isPositive = trend >= 0;
    const trendColor = isPositive ? 'success.main' : 'error.main';
    const trendIcon = isPositive ? <TrendingUp /> : <TrendingDown />;

    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="text.secondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" color={`${color}.main`}>
                {typeof value === 'number' ? formatCurrency(value) : value}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
              {trend !== undefined && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  {trendIcon}
                  <Typography variant="body2" color={trendColor}>
                    {isPositive ? '+' : ''}{trend}% vs mes anterior
                  </Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ color: `${color}.main` }}>
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const ExpenseDialog = ({ open, onClose, expense }) => {
    const isEditing = !!expense;
    
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditing ? 'Editar Gasto' : 'Nuevo Gasto'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Descripción" defaultValue={expense?.description || ''} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Monto" type="number" defaultValue={expense?.amount || ''} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select defaultValue={expense?.category || ''} label="Categoría">
                  <MenuItem value="Nómina">Nómina</MenuItem>
                  <MenuItem value="Alquiler">Alquiler</MenuItem>
                  <MenuItem value="Servicios">Servicios</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Materiales">Materiales</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select defaultValue={expense?.type || 'fixed'} label="Tipo">
                  <MenuItem value="fixed">Fijo</MenuItem>
                  <MenuItem value="variable">Variable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch defaultChecked={expense?.recurring || false} />}
                label="Gasto recurrente"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Proveedor"
                defaultValue={expense?.vendor || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notas"
                multiline
                rows={3}
                defaultValue={expense?.notes || ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={onClose}>
            {isEditing ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Gastos
        </Typography>
        <Typography color="text.secondary">
          Análisis y control de gastos fijos y variables
        </Typography>
      </Box>

      {/* Filtros y Controles */}
      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Período</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Período"
            >
              <MenuItem value="month">Este mes</MenuItem>
              <MenuItem value="quarter">Este trimestre</MenuItem>
              <MenuItem value="year">Este año</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Tipo de Gasto</InputLabel>
            <Select
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
              label="Tipo de Gasto"
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="fixed">Fijos</MenuItem>
              <MenuItem value="variable">Variables</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Fecha desde"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

          <TextField
            label="Fecha hasta"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Nuevo Gasto
          </Button>

          <Button variant="outlined" startIcon={<Download />}>
            Exportar
          </Button>
        </Box>
      </UBCard>

      {/* KPIs Principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <ExpenseMetricCard
            title="Gastos Totales"
            value={expenseData.totalExpenses}
            trend={8.7}
            color="primary"
            icon={<AttachMoney sx={{ fontSize: 40 }} />}
            subtitle={`Fijos: ${formatCurrency(expenseData.fixedExpenses)} | Variables: ${formatCurrency(expenseData.variableExpenses)}`}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ExpenseMetricCard
            title="Gastos Fijos"
            value={expenseData.fixedExpenses}
            trend={0}
            color="info"
            icon={<BusinessCenter sx={{ fontSize: 40 }} />}
            subtitle="60% del total"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ExpenseMetricCard
            title="Gastos Variables"
            value={expenseData.variableExpenses}
            trend={11.1}
            color="warning"
            icon={<Analytics sx={{ fontSize: 40 }} />}
            subtitle="40% del total"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ExpenseMetricCard
            title="Ahorro Mensual"
            value={15000}
            trend={25}
            color="success"
            icon={<Savings sx={{ fontSize: 40 }} />}
            subtitle="5% bajo presupuesto"
          />
        </Grid>
      </Grid>

      {/* Tabs de Navegación */}
      <UBCard>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Resumen" />
          <Tab label="Gastos Fijos" />
          <Tab label="Gastos Variables" />
          <Tab label="Análisis por Categoría" />
          <Tab label="Tendencias" />
        </Tabs>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Distribución de Gastos */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Distribución de Gastos
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Fijos', value: expenseData.fixedExpenses },
                        { name: 'Variables', value: expenseData.variableExpenses }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      <Cell fill="#0088FE" />
                      <Cell fill="#00C49F" />
                    </Pie>
                    <Tooltip formatter={(value) => [formatCurrency(value), '']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Tendencia Mensual */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Tendencia Mensual
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={expenseData.monthlyBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(value), '']} />
                    <Legend />
                    <Bar dataKey="fixed" fill="#0088FE" name="Fijos" />
                    <Bar dataKey="variable" fill="#00C49F" name="Variables" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Gastos Fijos Detallados</Typography>
              <Chip label={`Total: ${formatCurrency(expenseData.fixedExpenses)}`} color="primary" />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Categoría</TableCell>
                    <TableCell>Monto</TableCell>
                    <TableCell>Frecuencia</TableCell>
                    <TableCell>Proveedor</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenseData.fixedExpensesDetail?.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getCategoryIcon(expense.category)}
                          {expense.category}
                        </Box>
                      </TableCell>
                      <TableCell>{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>
                        <Chip
                          label={expense.frequency}
                          size="small"
                          color={expense.frequency === 'mensual' ? 'primary' : 'secondary'}
                        />
                      </TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => { setEditingExpense(expense); setOpenDialog(true); }}>
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Gastos Variables Detallados</Typography>
              <Chip label={`Total: ${formatCurrency(expenseData.variableExpenses)}`} color="success" />
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Categoría</TableCell>
                    <TableCell>Monto</TableCell>
                    <TableCell>Recurrente</TableCell>
                    <TableCell>Proveedor</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenseData.variableExpensesDetail?.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getCategoryIcon(expense.category)}
                          {expense.category}
                        </Box>
                      </TableCell>
                      <TableCell>{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>
                        <Chip
                          label={expense.recurring ? 'Sí' : 'No'}
                          size="small"
                          color={expense.recurring ? 'primary' : 'default'}
                        />
                      </TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {activeTab === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Análisis por Categoría
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={expenseData.expenseCategories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(value), '']} />
                    <Legend />
                    <Bar dataKey="budget" fill="#8884d8" name="Presupuestado" />
                    <Bar dataKey="actual" fill="#82ca9d" name="Real" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Variación Presupuesto vs Real
                </Typography>
                {expenseData.expenseCategories?.map((category, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {category.name}
                        <Chip
                          label={category.type}
                          size="small"
                          color={category.type === 'fixed' ? 'primary' : 'secondary'}
                          sx={{ ml: 1 }}
                        />
                      </Typography>
                      <Typography
                        variant="body2"
                        color={category.variance <= 0 ? 'success.main' : 'error.main'}
                        fontWeight="bold"
                      >
                        {formatCurrency(Math.abs(category.variance))}
                        {category.variance <= 0 ? ' bajo presupuesto' : ' sobre presupuesto'}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((category.actual / category.budget) * 100, 100)}
                      color={category.variance <= 0 ? 'success' : 'error'}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 4 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tendencias y Proyecciones
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={expenseData.monthlyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value), '']} />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Gastos Totales" />
                <Bar dataKey="fixed" fill="#0088FE" name="Fijos" />
                <Bar dataKey="variable" fill="#00C49F" name="Variables" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        )}
      </UBCard>

      {/* Diálogo para nuevo/editar gasto */}
      <ExpenseDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditingExpense(null);
        }}
        expense={editingExpense}
      />
    </Container>
  );
};

export default FixedVariableExpenses;