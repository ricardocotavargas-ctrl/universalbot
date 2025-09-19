// frontend/admin-panel/src/pages/AIFlows.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Chip,
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
  Switch,
  FormControlLabel,
  Tab,
  Tabs,
  useTheme,
  alpha,
  Card,
  CardContent,
  Button 
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  SmartToy,
  WhatsApp,
  Facebook,
  Instagram,
  Email,
  PlayArrow,
  Pause,
  Edit,
  Delete,
  TrendingUp,
  Schedule,
  AutoAwesome,
  Psychology,
  IntegrationInstructions
} from '@mui/icons-material';
import UBCard from '../components/ui/UBCard';
import UBButton from '../components/ui/UBButton';

const AIFlows = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionAnchor, setActionAnchor] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Datos de ejemplo para flujos de IA
  const [flows, setFlows] = useState([
    {
      id: 1,
      name: 'Respuestas WhatsApp',
      description: 'Respuestas automáticas para consultas frecuentes',
      channel: 'whatsapp',
      status: 'active',
      triggers: ['hola', 'info', 'precios'],
      responses: 1240,
      successRate: 92.5,
      lastUpdated: '2024-01-15',
      isEnabled: true,
      aiModel: 'gpt-4',
      avatar: '/flows/whatsapp.jpg'
    },
    {
      id: 2,
      name: 'Soporte Facebook',
      description: 'Manejo de consultas de soporte técnico',
      channel: 'facebook',
      status: 'active',
      triggers: ['soporte', 'ayuda', 'problema'],
      responses: 890,
      successRate: 88.3,
      lastUpdated: '2024-01-14',
      isEnabled: true,
      aiModel: 'gpt-3.5',
      avatar: '/flows/facebook.jpg'
    },
    {
      id: 3,
      name: 'Ventas Instagram',
      description: 'Automatización de ventas por DM',
      channel: 'instagram',
      status: 'draft',
      triggers: ['comprar', 'producto', 'catalogo'],
      responses: 0,
      successRate: 0,
      lastUpdated: '2024-01-10',
      isEnabled: false,
      aiModel: 'gpt-4',
      avatar: '/flows/instagram.jpg'
    },
    {
      id: 4,
      name: 'Email Automático',
      description: 'Respuestas automáticas de correo',
      channel: 'email',
      status: 'active',
      triggers: ['contacto', 'info', 'cotización'],
      responses: 450,
      successRate: 95.2,
      lastUpdated: '2024-01-12',
      isEnabled: true,
      aiModel: 'gpt-4',
      avatar: '/flows/email.jpg'
    },
    {
      id: 5,
      name: 'Lead Qualification',
      description: 'Clasificación automática de leads',
      channel: 'whatsapp',
      status: 'testing',
      triggers: ['quiero', 'me interesa', 'información'],
      responses: 156,
      successRate: 84.7,
      lastUpdated: '2024-01-13',
      isEnabled: true,
      aiModel: 'gpt-4',
      avatar: '/flows/qualification.jpg'
    }
  ]);

  const handleActionClick = (event, flow) => {
    setActionAnchor(event.currentTarget);
    setSelectedFlow(flow);
  };

  const handleActionClose = () => {
    setActionAnchor(null);
    setSelectedFlow(null);
  };

  const handleToggleFlow = (flowId) => {
    setFlows(flows.map(flow =>
      flow.id === flowId ? { ...flow, isEnabled: !flow.isEnabled } : flow
    ));
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
      case 'whatsapp': return <WhatsApp sx={{ fontSize: 20 }} />;
      case 'facebook': return <Facebook sx={{ fontSize: 20 }} />;
      case 'instagram': return <Instagram sx={{ fontSize: 20 }} />;
      case 'email': return <Email sx={{ fontSize: 20 }} />;
      default: return <SmartToy sx={{ fontSize: 20 }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'draft': return 'default';
      case 'testing': return 'warning';
      case 'paused': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'draft': return 'Borrador';
      case 'testing': return 'Pruebas';
      case 'paused': return 'Pausado';
      default: return status;
    }
  };

  const filteredFlows = flows.filter(flow =>
    flow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(flow =>
    channelFilter === 'all' || flow.channel === channelFilter
  ).filter(flow =>
    statusFilter === 'all' || flow.status === statusFilter
  );

  const stats = {
    total: flows.length,
    active: flows.filter(f => f.isEnabled).length,
    totalResponses: flows.reduce((sum, flow) => sum + flow.responses, 0),
    avgSuccessRate: flows.length > 0 ? 
      (flows.reduce((sum, flow) => sum + flow.successRate, 0) / flows.length).toFixed(1) : 0
  };

  const FlowCard = ({ flow }) => (
    <UBCard sx={{ 
      transition: 'all 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: alpha(getChannelColor(flow.channel), 0.1),
              color: getChannelColor(flow.channel)
            }}
          >
            {getChannelIcon(flow.channel)}
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {flow.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {flow.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={getStatusText(flow.status)}
                size="small"
                color={getStatusColor(flow.status)}
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
              <Chip
                label={flow.aiModel.toUpperCase()}
                size="small"
                variant="outlined"
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          </Box>
        </Box>
        <IconButton
          size="small"
          onClick={(e) => handleActionClick(e, flow)}
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'text.primary' }
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>

      {/* Triggers */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          Palabras clave:
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {flow.triggers.slice(0, 3).map((trigger, index) => (
            <Chip
              key={index}
              label={trigger}
              size="small"
              variant="outlined"
              sx={{ height: 20, fontSize: '0.6rem' }}
            />
          ))}
          {flow.triggers.length > 3 && (
            <Chip
              label={`+${flow.triggers.length - 3}`}
              size="small"
              sx={{ height: 20, fontSize: '0.6rem' }}
            />
          )}
        </Box>
      </Box>

      {/* Métricas */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: 2,
        mb: 3
      }}>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Respuestas
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {flow.responses.toLocaleString('es-ES')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Efectividad
          </Typography>
          <Typography variant="body2" fontWeight={600} color="success.main">
            {flow.successRate}%
          </Typography>
        </Box>
      </Box>

      {/* Acciones */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pt: 2,
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <FormControlLabel
          control={
            <Switch
              checked={flow.isEnabled}
              onChange={() => handleToggleFlow(flow.id)}
              size="small"
              color="success"
            />
          }
          label={
            <Typography variant="caption">
              {flow.isEnabled ? 'Activado' : 'Desactivado'}
            </Typography>
          }
        />
        <Typography variant="caption" color="text.secondary">
          Actualizado: {new Date(flow.lastUpdated).toLocaleDateString('es-ES')}
        </Typography>
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
                Automatización IA
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Gestiona tus flujos de conversación inteligentes
              </Typography>
            </Box>
            <UBButton
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreateDialogOpen(true)}
            >
              Nuevo Flujo
            </UBButton>
          </Box>

          {/* Pestañas */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: '0 !important' }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                  minHeight: 48,
                  '& .MuiTab-root': {
                    minHeight: 48,
                    fontWeight: 600
                  }
                }}
              >
                <Tab icon={<SmartToy />} iconPosition="start" label="Todos los Flujos" />
                <Tab icon={<Psychology />} iconPosition="start" label="Entrenamiento IA" />
                <Tab icon={<IntegrationInstructions />} iconPosition="start" label="Integraciones" />
              </Tabs>
            </CardContent>
          </Card>

          {/* Estadísticas rápidas */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <SmartToy sx={{ color: 'primary.main', fontSize: 24 }} />
                  <Typography variant="h4" fontWeight={700} color="primary.main">
                    {stats.total}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Flujos Totales
                </Typography>
              </UBCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <PlayArrow sx={{ color: 'success.main', fontSize: 24 }} />
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    {stats.active}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Flujos Activos
                </Typography>
              </UBCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <TrendingUp sx={{ color: 'info.main', fontSize: 24 }} />
                  <Typography variant="h4" fontWeight={700} color="info.main">
                    {stats.totalResponses.toLocaleString('es-ES')}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Respuestas Totales
                </Typography>
              </UBCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UBCard sx={{ textAlign: 'center', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <AutoAwesome sx={{ color: 'warning.main', fontSize: 24 }} />
                  <Typography variant="h4" fontWeight={700} color="warning.main">
                    {stats.avgSuccessRate}%
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Efectividad Promedio
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
                placeholder="Buscar flujos..."
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
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={statusFilter}
                  label="Estado"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="active">Activos</MenuItem>
                  <MenuItem value="draft">Borradores</MenuItem>
                  <MenuItem value="testing">Pruebas</MenuItem>
                  <MenuItem value="paused">Pausados</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <UBButton
                variant="outlined"
                fullWidth
                onClick={() => {
                  setChannelFilter('all');
                  setStatusFilter('all');
                  setSearchTerm('');
                }}
              >
                Limpiar
              </UBButton>
            </Grid>
          </Grid>
        </UBCard>

        {/* Lista de Flujos */}
        <Grid container spacing={3}>
          {filteredFlows.map((flow) => (
            <Grid item xs={12} md={6} lg={4} key={flow.id}>
              <FlowCard flow={flow} />
            </Grid>
          ))}
        </Grid>

        {filteredFlows.length === 0 && (
          <UBCard sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No se encontraron flujos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Crea tu primer flujo de automatización
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
            <Edit sx={{ mr: 2, fontSize: 20 }} />
            Editar flujo
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <PlayArrow sx={{ mr: 2, fontSize: 20 }} />
            {selectedFlow?.isEnabled ? 'Pausar' : 'Activar'}
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <TrendingUp sx={{ mr: 2, fontSize: 20 }} />
            Ver analytics
          </MenuItem>
          <MenuItem onClick={handleActionClose} sx={{ color: 'error.main' }}>
            <Delete sx={{ mr: 2, fontSize: 20 }} />
            Eliminar flujo
          </MenuItem>
        </Menu>

        {/* Dialog para nuevo flujo (placeholder) */}
        <Dialog 
          open={createDialogOpen} 
          onClose={() => setCreateDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Nuevo Flujo de Automatización</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Asistente para crear nuevo flujo de IA (próximamente)
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>Cancelar</Button>
            <Button variant="contained" onClick={() => setCreateDialogOpen(false)}>
              Crear Flujo
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AIFlows;