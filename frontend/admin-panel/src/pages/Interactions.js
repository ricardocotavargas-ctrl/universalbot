// frontend/admin-panel/src/pages/Interactions.js (VERSIÓN CON FILTRO POR EMPRESA)
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
  Badge,
  Button
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  WhatsApp,
  Facebook,
  Instagram,
  Email,
  Chat,
  Schedule,
  CheckCircle,
  PriorityHigh,
  Star,
  Reply,
  Archive,
  Delete,
  MarkAsUnread,
  PlayArrow,
  Stop,
  Business
} from '@mui/icons-material';
import UBCard from '../components/ui/UBCard';
import UBButton from '../components/ui/UBButton';

const Interactions = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [actionAnchor, setActionAnchor] = useState(null);
  const [selectedInteraction, setSelectedInteraction] = useState(null);

  // Datos de ejemplo para empresas
  const companies = [
    { id: 'all', name: 'Todas las empresas' },
    { id: 'techsolutions', name: 'TechSolutions C.A.' },
    { id: 'consultores', name: 'Consultores Asociados' },
    { id: 'tiendavirtual', name: 'Tienda Virtual Plus' },
    { id: 'servicios', name: 'Servicios Integrales' },
    { id: 'agenciadigital', name: 'Agencia Digital Creativa' }
  ];

  // Datos de ejemplo para interacciones - AHORA CON EMPRESA ID
  const [interactions, setInteractions] = useState([
    {
      id: 1,
      client: 'María González',
      company: 'techsolutions',
      channel: 'whatsapp',
      message: '¡Hola! Necesito información sobre sus servicios empresariales para mi compañía.',
      status: 'new',
      priority: 'high',
      timestamp: new Date(Date.now() - 15 * 60000),
      unread: true,
      avatar: '/avatars/1.jpg',
      tags: ['consulta', 'servicios'],
      agent: null
    },
    {
      id: 2,
      client: 'Carlos Rodríguez',
      company: 'consultores',
      channel: 'facebook',
      message: 'El producto que recibí tiene un defecto. Necesito soporte técnico urgente por favor.',
      status: 'assigned',
      priority: 'urgent',
      timestamp: new Date(Date.now() - 2 * 3600000),
      unread: false,
      avatar: '/avatars/2.jpg',
      tags: ['soporte', 'urgente'],
      agent: 'Ana Pérez'
    },
    {
      id: 3,
      client: 'Ana Martínez',
      company: 'tiendavirtual',
      channel: 'instagram',
      message: '¿Tienen disponible el modelo XZ-200 en color azul? ¿Cuál es el precio?',
      status: 'new',
      priority: 'medium',
      timestamp: new Date(Date.now() - 45 * 60000),
      unread: true,
      avatar: '/avatars/3.jpg',
      tags: ['consulta', 'producto'],
      agent: null
    },
    {
      id: 4,
      client: 'Juan Pérez',
      company: 'servicios',
      channel: 'email',
      message: 'Solicito cotización para 50 unidades del producto premium con descuento por volumen.',
      status: 'resolved',
      priority: 'low',
      timestamp: new Date(Date.now() - 24 * 3600000),
      unread: false,
      avatar: '/avatars/4.jpg',
      tags: ['cotización', 'venta'],
      agent: 'Luis García'
    },
    {
      id: 5,
      client: 'Laura Hernández',
      company: 'agenciadigital',
      channel: 'whatsapp',
      message: '¡Excelente servicio! Quisiera hacer un pedido recurrente mensual.',
      status: 'closed',
      priority: 'low',
      timestamp: new Date(Date.now() - 3 * 24 * 3600000),
      unread: false,
      avatar: '/avatars/5.jpg',
      tags: ['felicitaciones', 'recurrente'],
      agent: 'Carlos López'
    },
    {
      id: 6,
      client: 'Roberto Silva',
      company: 'techsolutions',
      channel: 'facebook',
      message: 'Problema con mi factura electrónica, no llega al correo',
      status: 'in-progress',
      priority: 'high',
      timestamp: new Date(Date.now() - 3 * 3600000),
      unread: false,
      avatar: '/avatars/6.jpg',
      tags: ['facturación', 'problema'],
      agent: 'María Lopez'
    }
  ]);

  const handleActionClick = (event, interaction) => {
    setActionAnchor(event.currentTarget);
    setSelectedInteraction(interaction);
  };

  const handleActionClose = () => {
    setActionAnchor(null);
    setSelectedInteraction(null);
  };

  const handleMarkAsRead = (id) => {
    setInteractions(interactions.map(interaction =>
      interaction.id === id ? { ...interaction, unread: !interaction.unread } : interaction
    ));
    handleActionClose();
  };

  const handleStatusChange = (id, newStatus) => {
    setInteractions(interactions.map(interaction =>
      interaction.id === id ? { ...interaction, status: newStatus } : interaction
    ));
    handleActionClose();
  };

  const getChannelColor = (channel) => {
    switch (channel) {
      case 'whatsapp': return '#25D366';
      case 'facebook': return '#1877F2';
      case 'instagram': return '#E4405F';
      case 'email': return '#EA4335';
      default: return theme.palette.primary.main;
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'whatsapp': return <WhatsApp sx={{ fontSize: 18 }} />;
      case 'facebook': return <Facebook sx={{ fontSize: 18 }} />;
      case 'instagram': return <Instagram sx={{ fontSize: 18 }} />;
      case 'email': return <Email sx={{ fontSize: 18 }} />;
      default: return <Chat sx={{ fontSize: 18 }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'primary';
      case 'assigned': return 'warning';
      case 'in-progress': return 'info';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Nuevo';
      case 'assigned': return 'Asignado';
      case 'in-progress': return 'En Progreso';
      case 'resolved': return 'Resuelto';
      case 'closed': return 'Cerrado';
      default: return status;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return <PriorityHigh sx={{ fontSize: 16 }} />;
      case 'high': return <Star sx={{ fontSize: 16 }} />;
      default: return null;
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'urgent': return 'Urgente';
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return priority;
    }
  };

  const getCompanyName = (companyId) => {
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : 'Empresa no encontrada';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora mismo';
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours} h`;
    if (days === 1) return 'Ayer';
    return `Hace ${days} días`;
  };

  const filteredInteractions = interactions
    .filter(interaction =>
      interaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interaction.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCompanyName(interaction.company).toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(interaction =>
      statusFilter === 'all' || interaction.status === statusFilter
    )
    .filter(interaction =>
      channelFilter === 'all' || interaction.channel === channelFilter
    )
    .filter(interaction =>
      priorityFilter === 'all' || interaction.priority === priorityFilter
    )
    .filter(interaction =>
      companyFilter === 'all' || interaction.company === companyFilter
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  // Estadísticas que se actualizan con los filtros
  const stats = {
    total: filteredInteractions.length,
    new: filteredInteractions.filter(i => i.status === 'new').length,
    unread: filteredInteractions.filter(i => i.unread).length,
    urgent: filteredInteractions.filter(i => i.priority === 'urgent').length,
    companies: new Set(filteredInteractions.map(i => i.company)).size
  };

  const InteractionItem = ({ interaction }) => (
    <UBCard sx={{ 
      transition: 'all 0.3s ease',
      border: '1px solid',
      borderColor: interaction.unread ? alpha(theme.palette.primary.main, 0.3) : theme.palette.divider,
      backgroundColor: interaction.unread ? alpha(theme.palette.primary.main, 0.02) : 'background.paper',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[4],
        borderColor: interaction.unread ? theme.palette.primary.main : theme.palette.divider
      }
    }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        {/* Avatar y Canal */}
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={interaction.avatar}
            sx={{
              width: 50,
              height: 50,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontWeight: 600
            }}
          >
            {interaction.client.charAt(0).toUpperCase()}
          </Avatar>
          <Box
            sx={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              backgroundColor: getChannelColor(interaction.channel),
              borderRadius: '50%',
              padding: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 14
            }}
          >
            {getChannelIcon(interaction.channel)}
          </Box>
        </Box>

        {/* Contenido */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight={600} noWrap>
                {interaction.client}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {getCompanyName(interaction.company)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {formatTime(interaction.timestamp)}
              </Typography>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleActionClick(e, interaction);
                }}
                sx={{ color: 'text.secondary' }}
              >
                <MoreVert />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.4 }}>
            {interaction.message}
          </Typography>

          {/* Tags y Estados */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip
              label={getStatusText(interaction.status)}
              size="small"
              color={getStatusColor(interaction.status)}
              variant={interaction.status === 'closed' ? 'outlined' : 'filled'}
            />
            
            {interaction.priority !== 'low' && (
              <Chip
                label={getPriorityText(interaction.priority)}
                size="small"
                color={interaction.priority === 'urgent' ? 'error' : 'warning'}
                icon={getPriorityIcon(interaction.priority)}
                variant="outlined"
              />
            )}

            {interaction.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}

            {interaction.agent && (
              <Chip
                label={`Agente: ${interaction.agent}`}
                size="small"
                variant="outlined"
                color="info"
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </UBCard>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Centro de Interacciones
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Gestiona todas las comunicaciones con tus clientes
          </Typography>
        </Box>

        {/* Estadísticas Actualizadas */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { label: 'Total', value: stats.total, color: 'primary', icon: <Chat /> },
            { label: 'Nuevos', value: stats.new, color: 'warning', icon: <Schedule /> },
            { label: 'No leídos', value: stats.unread, color: 'info', icon: <MarkAsUnread /> },
            { label: 'Urgentes', value: stats.urgent, color: 'error', icon: <PriorityHigh /> },
            { label: 'Empresas', value: stats.companies, color: 'secondary', icon: <Business /> }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <UBCard sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 1, 
                  mb: 1 
                }}>
                  <Box sx={{ color: `${stat.color}.main` }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" fontWeight={700} color={`${stat.color}.main`}>
                    {stat.value}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </UBCard>
            </Grid>
          ))}
        </Grid>

        {/* Filtros Mejorados con Empresa */}
        <UBCard sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Buscar por cliente, empresa o mensaje..."
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
            <Grid item xs={12} md={2}>
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
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={statusFilter}
                  label="Estado"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="new">Nuevos</MenuItem>
                  <MenuItem value="assigned">Asignados</MenuItem>
                  <MenuItem value="in-progress">En Progreso</MenuItem>
                  <MenuItem value="resolved">Resueltos</MenuItem>
                  <MenuItem value="closed">Cerrados</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Canal</InputLabel>
                <Select
                  value={channelFilter}
                  label="Canal"
                  onChange={(e) => setChannelFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="whatsapp">WhatsApp</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="email">Email</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Prioridad</InputLabel>
                <Select
                  value={priorityFilter}
                  label="Prioridad"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <MenuItem value="all">Todas</MenuItem>
                  <MenuItem value="urgent">Urgente</MenuItem>
                  <MenuItem value="high">Alta</MenuItem>
                  <MenuItem value="medium">Media</MenuItem>
                  <MenuItem value="low">Baja</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={1}>
              <UBButton
                variant="outlined"
                fullWidth
                onClick={() => {
                  setCompanyFilter('all');
                  setStatusFilter('all');
                  setChannelFilter('all');
                  setPriorityFilter('all');
                  setSearchTerm('');
                }}
                sx={{ minWidth: 'auto' }}
              >
                <FilterList />
              </UBButton>
            </Grid>
          </Grid>
        </UBCard>

        {/* Lista de Interacciones */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredInteractions.map((interaction) => (
            <InteractionItem key={interaction.id} interaction={interaction} />
          ))}
        </Box>

        {filteredInteractions.length === 0 && (
          <UBCard sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No se encontraron interacciones
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay interacciones con los filtros aplicados'}
            </Typography>
          </UBCard>
        )}

        {/* Menú de Acciones */}
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
          <MenuItem onClick={() => selectedInteraction && handleMarkAsRead(selectedInteraction.id)}>
            {selectedInteraction?.unread ? (
              <>
                <CheckCircle sx={{ mr: 2, fontSize: 20 }} />
                Marcar como leído
              </>
            ) : (
              <>
                <MarkAsUnread sx={{ mr: 2, fontSize: 20 }} />
                Marcar como no leído
              </>
            )}
          </MenuItem>
          
          <MenuItem onClick={() => selectedInteraction && handleStatusChange(selectedInteraction.id, 'assigned')}>
            <PlayArrow sx={{ mr: 2, fontSize: 20 }} />
            Asignar agente
          </MenuItem>
          
          <MenuItem onClick={() => selectedInteraction && handleStatusChange(selectedInteraction.id, 'resolved')}>
            <CheckCircle sx={{ mr: 2, fontSize: 20 }} />
            Marcar como resuelto
          </MenuItem>
          
          <MenuItem onClick={() => selectedInteraction && handleStatusChange(selectedInteraction.id, 'closed')}>
            <Stop sx={{ mr: 2, fontSize: 20 }} />
            Cerrar conversación
          </MenuItem>
          
          <MenuItem onClick={handleActionClose}>
            <Reply sx={{ mr: 2, fontSize: 20 }} />
            Responder
          </MenuItem>
          
          <MenuItem onClick={handleActionClose} sx={{ color: 'error.main' }}>
            <Delete sx={{ mr: 2, fontSize: 20 }} />
            Eliminar
          </MenuItem>
        </Menu>
      </Box>
    </Container>
  );
};

export default Interactions;