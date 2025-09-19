// frontend/admin-panel/src/pages/Companies.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  alpha,
  LinearProgress,
  Button
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  MoreVert,
  Business,
  Email,
  Phone,
  LocationOn,
  People,
  TrendingUp,
  CalendarToday,
  CheckCircle,
  Warning,
  Error
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import UBButton from '../../components/ui/UBButton';

const Companies = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [actionAnchor, setActionAnchor] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Datos de ejemplo para empresas
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'TechSolutions C.A.',
      rif: 'J-412345678',
      email: 'info@techsolutions.com',
      phone: '+58 212-555-1234',
      address: 'Av. Principal, Caracas',
      status: 'active',
      plan: 'premium',
      users: 8,
      maxUsers: 10,
      revenue: 12500,
      lastActivity: '2024-01-15',
      joinDate: '2023-06-10',
      avatar: '/companies/1.jpg'
    },
    {
      id: 2,
      name: 'Consultores Asociados',
      rif: 'J-498765432',
      email: 'admin@consultores.com',
      phone: '+58 212-555-5678',
      address: 'Centro Comercial, Valencia',
      status: 'active',
      plan: 'business',
      users: 3,
      maxUsers: 5,
      revenue: 8900,
      lastActivity: '2024-01-14',
      joinDate: '2023-08-15',
      avatar: '/companies/2.jpg'
    },
    {
      id: 3,
      name: 'Tienda Virtual Plus',
      rif: 'J-411223344',
      email: 'ventas@tiendavirtual.com',
      phone: '+58 212-555-9012',
      address: 'Zona Industrial, Maracaibo',
      status: 'suspended',
      plan: 'starter',
      users: 1,
      maxUsers: 3,
      revenue: 5600,
      lastActivity: '2024-01-05',
      joinDate: '2023-11-20',
      avatar: '/companies/3.jpg'
    },
    {
      id: 4,
      name: 'Servicios Integrales',
      rif: 'J-405566778',
      email: 'contacto@servicios.com',
      phone: '+58 212-555-3456',
      address: 'Urbanización, Maracay',
      status: 'trial',
      plan: 'starter',
      users: 2,
      maxUsers: 2,
      revenue: 0,
      lastActivity: '2024-01-16',
      joinDate: '2024-01-01',
      avatar: '/companies/4.jpg'
    },
    {
      id: 5,
      name: 'Agencia Digital Creativa',
      rif: 'J-409988776',
      email: 'hola@agenciadigital.com',
      phone: '+58 212-555-7890',
      address: 'Paseo Comercial, Barquisimeto',
      status: 'active',
      plan: 'premium',
      users: 12,
      maxUsers: 15,
      revenue: 17800,
      lastActivity: '2024-01-13',
      joinDate: '2023-05-05',
      avatar: '/companies/5.jpg'
    }
  ]);

  const handleActionClick = (event, company) => {
    setActionAnchor(event.currentTarget);
    setSelectedCompany(company);
  };

  const handleActionClose = () => {
    setActionAnchor(null);
    setSelectedCompany(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'suspended': return 'error';
      case 'trial': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'suspended': return <Error sx={{ fontSize: 16 }} />;
      case 'trial': return <Warning sx={{ fontSize: 16 }} />;
      default: return <Warning sx={{ fontSize: 16 }} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'suspended': return 'Suspendido';
      case 'trial': return 'Prueba';
      default: return status;
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'premium': return 'info';
      case 'business': return 'secondary';
      case 'starter': return 'primary';
      default: return 'default';
    }
  };

  const getPlanText = (plan) => {
    switch (plan) {
      case 'premium': return 'Premium';
      case 'business': return 'Business';
      case 'starter': return 'Starter';
      default: return plan;
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.rif.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(company =>
    statusFilter === 'all' || company.status === statusFilter
  ).filter(company =>
    planFilter === 'all' || company.plan === planFilter
  );

  const stats = {
    total: companies.length,
    active: companies.filter(c => c.status === 'active').length,
    trial: companies.filter(c => c.status === 'trial').length,
    totalRevenue: companies.reduce((sum, company) => sum + company.revenue, 0),
    totalUsers: companies.reduce((sum, company) => sum + company.users, 0)
  };

  const CompanyCard = ({ company }) => (
    <UBCard sx={{ 
      transition: 'all 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={company.avatar}
            sx={{
              width: 48,
              height: 48,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontWeight: 600
            }}
          >
            {company.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {company.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {company.rif}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label={getStatusText(company.status)}
                size="small"
                color={getStatusColor(company.status)}
                icon={getStatusIcon(company.status)}
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
              <Chip
                label={getPlanText(company.plan)}
                size="small"
                color={getPlanColor(company.plan)}
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          </Box>
        </Box>
        <IconButton
          size="small"
          onClick={(e) => handleActionClick(e, company)}
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'text.primary' }
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>

      {/* Información de contacto */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {company.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {company.phone}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {company.address}
          </Typography>
        </Box>
      </Box>

      {/* Métricas de uso */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" fontWeight={500}>
            Usuarios: {company.users}/{company.maxUsers}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round((company.users / company.maxUsers) * 100)}%
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={(company.users / company.maxUsers) * 100} 
          sx={{ 
            height: 6, 
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            '& .MuiLinearProgress-bar': {
              backgroundColor: company.users >= company.maxUsers ? 
                theme.palette.error.main : theme.palette.primary.main
            }
          }}
        />
      </Box>

      {/* Información adicional */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: 2,
        pt: 2,
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Ingresos
          </Typography>
          <Typography variant="body2" fontWeight={600} color="primary.main">
            ${company.revenue.toLocaleString('es-ES')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Última actividad
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(company.lastActivity).toLocaleDateString('es-ES')}
          </Typography>
        </Box>
      </Box>
    </UBCard>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Gestión de Empresas
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Administra las empresas en el sistema multi-tenant
              </Typography>
            </Box>
            <UBButton
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreateDialogOpen(true)}
            >
              Nueva Empresa
            </UBButton>
          </Box>

          {/* Estadísticas rápidas */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  {stats.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Empresas Totales
                </Typography>
              </UBCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" fontWeight={700} color="success.main">
                  {stats.active}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Empresas Activas
                </Typography>
              </UBCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  {stats.trial}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  En Prueba
                </Typography>
              </UBCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" fontWeight={700} color="info.main">
                  ${stats.totalRevenue.toLocaleString('es-ES')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ingresos Totales
                </Typography>
              </UBCard>
            </Grid>
          </Grid>
        </Box>

        {/* Filtros y Búsqueda */}
        <UBCard sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Buscar empresas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={statusFilter}
                  label="Estado"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="active">Activas</MenuItem>
                  <MenuItem value="suspended">Suspendidas</MenuItem>
                  <MenuItem value="trial">Prueba</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Plan</InputLabel>
                <Select
                  value={planFilter}
                  label="Plan"
                  onChange={(e) => setPlanFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="starter">Starter</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <UBButton
                variant="outlined"
                fullWidth
                startIcon={<FilterList />}
                onClick={() => {
                  setStatusFilter('all');
                  setPlanFilter('all');
                  setSearchTerm('');
                }}
              >
                Limpiar
              </UBButton>
            </Grid>
          </Grid>
        </UBCard>

        {/* Lista de Empresas */}
        <Grid container spacing={3}>
          {filteredCompanies.map((company) => (
            <Grid item xs={12} md={6} lg={4} key={company.id}>
              <CompanyCard company={company} />
            </Grid>
          ))}
        </Grid>

        {filteredCompanies.length === 0 && (
          <UBCard sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No se encontraron empresas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Intenta ajustar los filtros de búsqueda
            </Typography>
          </UBCard>
        )}

        {/* Menú de acciones */}
        <Menu
          anchorEl={actionAnchor}
          open={Boolean(actionAnchor)}
          onClose={handleActionClose}
          PaperProps={{
            sx: {
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              minWidth: 200
            }
          }}
        >
          <MenuItem onClick={handleActionClose}>
            <Business sx={{ mr: 2, fontSize: 20 }} />
            Ver detalles
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <People sx={{ mr: 2, fontSize: 20 }} />
            Gestionar usuarios
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <TrendingUp sx={{ mr: 2, fontSize: 20 }} />
            Ver reportes
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <CalendarToday sx={{ mr: 2, fontSize: 20 }} />
            Historial de pagos
          </MenuItem>
          <MenuItem onClick={handleActionClose} sx={{ color: 'error.main' }}>
            <Warning sx={{ mr: 2, fontSize: 20 }} />
            Suspender empresa
          </MenuItem>
        </Menu>

        {/* Dialog para nueva empresa (placeholder) */}
        <Dialog 
          open={createDialogOpen} 
          onClose={() => setCreateDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Nueva Empresa</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Formulario para agregar nueva empresa (próximamente)
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>Cancelar</Button>
            <Button variant="contained" onClick={() => setCreateDialogOpen(false)}>
              Crear Empresa
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Companies;