import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Switch,
  FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import {
  AttachMoney, People, Storage, Add, Edit, Delete, CheckCircle
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const mockPlans = [
    {
      id: 1,
      name: 'Basic',
      price: 29,
      interval: 'monthly',
      users: 2,
      storage: 1,
      features: ['Ventas básicas', 'Inventario limitado', 'Soporte por email'],
      active: true,
      businesses: 15
    },
    {
      id: 2,
      name: 'Professional',
      price: 79,
      interval: 'monthly',
      users: 5,
      storage: 5,
      features: ['Ventas avanzadas', 'Inventario completo', 'Soporte prioritario', 'Reportes básicos'],
      active: true,
      businesses: 8
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 199,
      interval: 'monthly',
      users: 20,
      storage: 20,
      features: ['Todas las funciones', 'Soporte 24/7', 'Reportes avanzados', 'API access', 'Personalización'],
      active: true,
      businesses: 3
    }
  ];

  useEffect(() => {
    setPlans(mockPlans);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getPlanColor = (planName) => {
    switch (planName) {
      case 'Enterprise': return 'primary';
      case 'Professional': return 'secondary';
      case 'Basic': return 'default';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Planes
        </Typography>
        <Typography color="text.secondary">
          Administra los planes de suscripción de la plataforma
        </Typography>
      </Box>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="h6">
            Planes de Suscripción
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
            Nuevo Plan
          </Button>
        </Box>
      </UBCard>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <Card sx={{ 
              border: 2, 
              borderColor: plan.active ? 'primary.main' : 'divider',
              height: '100%'
            }}>
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Chip
                    label={plan.name}
                    color={getPlanColor(plan.name)}
                    sx={{ mb: 2, fontSize: '1.1rem', padding: '8px 16px' }}
                  />
                  <Typography variant="h3" gutterBottom>
                    {formatCurrency(plan.price)}
                  </Typography>
                  <Typography color="text.secondary">
                    por mes
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <People sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{plan.users} usuarios</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Storage sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{plan.storage} GB almacenamiento</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircle sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{plan.businesses} empresas</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  {plan.features.map((feature, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Edit />}
                    onClick={() => {
                      setEditingPlan(plan);
                      setOpenDialog(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de que quieres eliminar este plan?')) {
                        setPlans(plans.filter(p => p.id !== plan.id));
                      }
                    }}
                  >
                    <Delete />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <UBCard sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Estadísticas de Planes
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plan</TableCell>
                <TableCell align="right">Precio Mensual</TableCell>
                <TableCell align="center">Empresas</TableCell>
                <TableCell align="right">Ingresos Mensuales</TableCell>
                <TableCell align="center">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <Chip
                      label={plan.name}
                      color={getPlanColor(plan.name)}
                    />
                  </TableCell>
                  <TableCell align="right">{formatCurrency(plan.price)}</TableCell>
                  <TableCell align="center">{plan.businesses}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(plan.price * plan.businesses)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={plan.active ? 'Activo' : 'Inactivo'}
                      color={plan.active ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </UBCard>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPlan ? 'Editar Plan' : 'Nuevo Plan'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre del Plan"
                defaultValue={editingPlan?.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Precio Mensual"
                type="number"
                InputProps={{ startAdornment: '$' }}
                defaultValue={editingPlan?.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Límite de Usuarios"
                type="number"
                defaultValue={editingPlan?.users}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Almacenamiento (GB)"
                type="number"
                defaultValue={editingPlan?.storage}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked={editingPlan?.active} />}
                label="Plan Activo"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Características (separadas por coma)"
                multiline
                rows={3}
                defaultValue={editingPlan?.features.join(', ')}
                placeholder="Ventas básicas, Inventario limitado, Soporte por email..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {editingPlan ? 'Actualizar' : 'Crear'} Plan
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPlans;