import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Avatar,
  IconButton, Switch, FormControlLabel
} from '@mui/material';
import {
  Business, Edit, Delete, Add, People, AttachMoney, Storage
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const AdminBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);

  const mockBusinesses = [
    {
      id: 1,
      name: 'Cafetería Central',
      owner: 'maria@cafeteria.com',
      plan: 'Enterprise',
      status: 'active',
      users: 5,
      storage: 2.5,
      revenue: 12500,
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Restaurante Sabores',
      owner: 'carlos@sabores.com',
      plan: 'Professional',
      status: 'active',
      users: 3,
      storage: 1.2,
      revenue: 8500,
      joinDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Panadería Dulce',
      owner: 'ana@dulce.com',
      plan: 'Basic',
      status: 'suspended',
      users: 2,
      storage: 0.8,
      revenue: 4200,
      joinDate: '2024-03-10'
    }
  ];

  useEffect(() => {
    setBusinesses(mockBusinesses);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  const getPlanColor = (plan) => {
    switch (plan) {
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
          Gestión de Negocios
        </Typography>
        <Typography color="text.secondary">
          Administra todas las empresas registradas en la plataforma
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Negocios
              </Typography>
              <Typography variant="h4">{businesses.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Activos
              </Typography>
              <Typography variant="h4" color="success.main">
                {businesses.filter(b => b.status === 'active').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Ingresos Totales
              </Typography>
              <Typography variant="h4">
                {formatCurrency(businesses.reduce((sum, b) => sum + b.revenue, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Usuarios Totales
              </Typography>
              <Typography variant="h4">
                {businesses.reduce((sum, b) => sum + b.users, 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="h6">
            Todas las Empresas
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
            Nueva Empresa
          </Button>
        </Box>
      </UBCard>

      <UBCard>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Empresa</TableCell>
                <TableCell>Propietario</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Usuarios</TableCell>
                <TableCell align="right">Almacenamiento</TableCell>
                <TableCell align="right">Ingresos</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <Business />
                      </Avatar>
                      <Box>
                        <Typography fontWeight="medium">{business.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Registrada: {new Date(business.joinDate).toLocaleDateString('es-VE')}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{business.owner}</TableCell>
                  <TableCell>
                    <Chip
                      label={business.plan}
                      color={getPlanColor(business.plan)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={business.status === 'active' ? 'Activo' : 'Suspendido'}
                      color={getStatusColor(business.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <People sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                      {business.users}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Storage sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                      {business.storage} GB
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <AttachMoney sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                      {formatCurrency(business.revenue)}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary">
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
      </UBCard>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingBusiness ? 'Editar Empresa' : 'Nueva Empresa'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Nombre de la Empresa" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email del Propietario" type="email" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Plan</InputLabel>
                <Select label="Plan">
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Professional">Professional</MenuItem>
                  <MenuItem value="Enterprise">Enterprise</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Límite de Usuarios" type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Almacenamiento (GB)" type="number" />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Empresa Activa"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {editingBusiness ? 'Actualizar' : 'Crear'} Empresa
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminBusinesses;