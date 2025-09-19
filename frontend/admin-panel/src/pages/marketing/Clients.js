// frontend/admin-panel/src/pages/Clients.js (VERSIÓN CON FILTRO POR EMPRESA)
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
  Button
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  MoreVert,
  Phone,
  Email,
  Business,
  CalendarToday,
  TrendingUp,
  WhatsApp,
  Facebook,
  Instagram,
  CheckCircle,
  PriorityHigh,
  Star
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import UBButton from '../../components/ui/UBButton';

const Clients = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [actionAnchor, setActionAnchor] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Datos de ejemplo para empresas (consistentes con Services)
  const companies = [
    { id: 'all', name: 'Todas las empresas' },
    { id: 'techsolutions', name: 'TechSolutions C.A.' },
    { id: 'consultores', name: 'Consultores Asociados' },
    { id: 'tiendavirtual', name: 'Tienda Virtual Plus' },
    { id: 'servicios', name: 'Servicios Integrales' },
    { id: 'agenciadigital', name: 'Agencia Digital Creativa' }
  ];

  // Datos de ejemplo para clientes - AHORA CON EMPRESA ASIGNADA
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'María González',
      email: 'maria@techsolutions.com',
      phone: '+58 412-555-7890',
      company: 'techsolutions',
      status: 'active',
      lastContact: '2024-01-15',
      totalSpent: 12500,
      channel: 'whatsapp',
      avatar: '/avatars/1.jpg',
      tags: ['empresarial', 'frecuente'],
      lifetimeValue: 28700
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      email: 'carlos@consultores.com',
      phone: '+58 414-555-1234',
      company: 'consultores',
      status: 'active',
      lastContact: '2024-01-14',
      totalSpent: 8900,
      channel: 'email',
      avatar: '/avatars/2.jpg',
      tags: ['soporte', 'urgente'],
      lifetimeValue: 15600
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana@tiendavirtual.com',
      phone: '+58 416-555-5678',
      company: 'tiendavirtual',
      status: 'inactive',
      lastContact: '2024-01-10',
      totalSpent: 5600,
      channel: 'facebook',
      avatar: '/avatars/3.jpg',
      tags: ['consulta', 'producto'],
      lifetimeValue: 8900
    },
    {
      id: 4,
      name: 'Juan Pérez',
      email: 'juan@servicios.com',
      phone: '+58 424-555-9012',
      company: 'servicios',
      status: 'lead',
      lastContact: '2024-01-16',
      totalSpent: 0,
      channel: 'instagram',
      avatar: '/avatars/4.jpg',
      tags: ['cotización', 'nuevo'],
      lifetimeValue: 0
    },
    {
      id: 5,
      name: 'Laura Hernández',
      email: 'laura@agenciadigital.com',
      phone: '+58 412-555-3456',
      company: 'agenciadigital',
      status: 'active',
      lastContact: '2024-01-13',
      totalSpent: 17800,
      channel: 'whatsapp',
      avatar: '/avatars/5.jpg',
      tags: ['recurrente', 'premium'],
      lifetimeValue: 42300
    },
    {
      id: 6,
      name: 'Roberto Silva',
      email: 'roberto@techsolutions.com',
      phone: '+58 414-555-7788',
      company: 'techsolutions',
      status: 'active',
      lastContact: '2024-01-12',
      totalSpent: 9200,
      channel: 'facebook',
      avatar: '/avatars/6.jpg',
      tags: ['facturación', 'regular'],
      lifetimeValue: 21500
    }
  ]);

  const handleActionClick = (event, client) => {
    setActionAnchor(event.currentTarget);
    setSelectedClient(client);
  };

  const handleActionClose = () => {
    setActionAnchor(null);
    setSelectedClient(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'lead': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'lead': return 'Lead';
      default: return status;
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'whatsapp': return <WhatsApp sx={{ fontSize: 16, color: '#25D366' }} />;
      case 'facebook': return <Facebook sx={{ fontSize: 16, color: '#1877F2' }} />;
      case 'instagram': return <Instagram sx={{ fontSize: 16, color: '#E4405F' }} />;
      case 'email': return <Email sx={{ fontSize: 16, color: '#EA4335' }} />;
      default: return <Email sx={{ fontSize: 16 }} />;
    }
  };

  const getCompanyName = (companyId) => {
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : 'Empresa no encontrada';
  };

  const filteredClients = clients
    .filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCompanyName(client.company).toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(client =>
      statusFilter === 'all' || client.status === statusFilter
    )
    .filter(client =>
      companyFilter === 'all' || client.company === companyFilter
    );

  // Calcular estadísticas basadas en los filtros aplicados
  const stats = {
    total: filteredClients.length,
    active: filteredClients.filter(c => c.status === 'active').length,
    leads: filteredClients.filter(c => c.status === 'lead').length,
    revenue: filteredClients.reduce((sum, client) => sum + client.totalSpent, 0),
    companies: new Set(filteredClients.map(c => c.company)).size,
    lifetimeValue: filteredClients.reduce((sum, client) => sum + client.lifetimeValue, 0)
  };

  const ClientCard = ({ client }) => (
    <UBCard sx={{ 
      transition: 'all 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={client.avatar}
            sx={{
              width: 48,
              height: 48,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontWeight: 600
            }}
          >
            {client.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {client.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <Chip
                label={getStatusText(client.status)}
                size="small"
                color={getStatusColor(client.status)}
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
              <Chip
                label={getCompanyName(client.company)}
                size="small"
                variant="outlined"
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          </Box>
        </Box>
        <IconButton
          size="small"
          onClick={(e) => handleActionClick(e, client)}
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'text.primary' }
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {client.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {client.phone}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Business sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {getCompanyName(client.company)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pt: 2,
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {getChannelIcon(client.channel)}
          <Typography variant="caption" color="text.secondary">
            Último contacto: {new Date(client.lastContact).toLocaleDateString('es-ES')}
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight={600} color="primary.main">
          ${client.totalSpent.toLocaleString('es-ES')}
        </Typography>
      </Box>

      {/* Tags */}
      <Box sx={{ mt: 2, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {client.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.6rem', height: 20 }}
          />
        ))}
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
                Gestión de Clientes
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Administra los clientes de todas las empresas
              </Typography>
            </Box>
            <UBButton
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreateDialogOpen(true)}
            >
              Nuevo Cliente
            </UBButton>
          </Box>

          {/* Estadísticas (actualizadas con filtros) */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  {stats.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clientes Totales
                </Typography>
              </UBCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" fontWeight={700} color="success.main">
                  {stats.active}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clientes Activos
                </Typography>
              </UBCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  {stats.leads}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Leads
                </Typography>
              </UBCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" fontWeight={700} color="info.main">
                  ${stats.revenue.toLocaleString('es-ES')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ingresos Totales
                </Typography>
              </UBCard>
            </Grid>
          </Grid>

          {/* Estadísticas adicionales */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={6}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <Business sx={{ color: 'secondary.main', fontSize: 24 }} />
                  <Typography variant="h4" fontWeight={700} color="secondary.main">
                    {stats.companies}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Empresas Representadas
                </Typography>
              </UBCard>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <TrendingUp sx={{ color: 'success.main', fontSize: 24 }} />
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    ${stats.lifetimeValue.toLocaleString('es-ES')}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Valor de Vida Total
                </Typography>
              </UBCard>
            </Grid>
          </Grid>
        </Box>

        {/* Filtros Mejorados */}
        <UBCard sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Buscar clientes, emails o empresas..."
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
                <InputLabel>Empresa</InputLabel>
                <Select
                  value={companyFilter}
                  label="Empresa"
                  onChange={(e) => setCompanyFilter(e.target.value)}
                >
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={statusFilter}
                  label="Estado"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos los estados</MenuItem>
                  <MenuItem value="active">Activos</MenuItem>
                  <MenuItem value="inactive">Inactivos</MenuItem>
                  <MenuItem value="lead">Leads</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <UBButton
                variant="outlined"
                fullWidth
                onClick={() => {
                  setCompanyFilter('all');
                  setStatusFilter('all');
                  setSearchTerm('');
                }}
                startIcon={<FilterList />}
              >
                Limpiar
              </UBButton>
            </Grid>
          </Grid>
        </UBCard>

        {/* Lista de Clientes */}
        <Grid container spacing={3}>
          {filteredClients.map((client) => (
            <Grid item xs={12} md={6} lg={4} key={client.id}>
              <ClientCard client={client} />
            </Grid>
          ))}
        </Grid>

        {filteredClients.length === 0 && (
          <UBCard sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No se encontraron clientes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay clientes con los filtros aplicados'}
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
            <Email sx={{ mr: 2, fontSize: 20 }} />
            Enviar email
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <WhatsApp sx={{ mr: 2, fontSize: 20 }} />
            Mensaje WhatsApp
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <TrendingUp sx={{ mr: 2, fontSize: 20 }} />
            Ver historial
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <Business sx={{ mr: 2, fontSize: 20 }} />
            Editar cliente
          </MenuItem>
        </Menu>

        {/* Dialog para nuevo cliente (placeholder) */}
        <Dialog 
          open={createDialogOpen} 
          onClose={() => setCreateDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Nuevo Cliente</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Formulario para agregar nuevo cliente (próximamente)
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>Cancelar</Button>
            <Button variant="contained" onClick={() => setCreateDialogOpen(false)}>
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Clients;