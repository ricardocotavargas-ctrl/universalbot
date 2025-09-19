// frontend/admin-panel/src/pages/marketing/Campaigns.js
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Chip,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  Tab,
  Tabs,
  LinearProgress,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  PlayArrow,
  Pause,
  Analytics,
  Email,
  WhatsApp,
  Facebook,
  Instagram,
  Schedule,
  People,
  TrendingUp
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const Campaigns = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    { label: 'Todas', value: 'all' },
    { label: 'Activas', value: 'active' },
    { label: 'Pausadas', value: 'paused' },
    { label: 'Programadas', value: 'scheduled' },
    { label: 'Finalizadas', value: 'completed' }
  ];

  const campaigns = [
    {
      id: 1,
      name: 'Oferta de Verano 2024',
      channel: 'whatsapp',
      status: 'active',
      budget: 5000,
      spent: 3200,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      target: 'Todos los clientes',
      impressions: 12500,
      clicks: 850,
      conversions: 42,
      roi: 3.2,
      objective: 'ventas'
    },
    {
      id: 2,
      name: 'Newsletter Mensual',
      channel: 'email',
      status: 'scheduled',
      budget: 2000,
      spent: 0,
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      target: 'Suscriptores',
      impressions: 0,
      clicks: 0,
      conversions: 0,
      roi: 0,
      objective: 'engagement'
    },
    {
      id: 3,
      name: 'Promo Redes Sociales',
      channel: 'instagram',
      status: 'paused',
      budget: 3000,
      spent: 1500,
      startDate: '2024-01-10',
      endDate: '2024-01-31',
      target: 'Seguidores 18-35',
      impressions: 8900,
      clicks: 420,
      conversions: 18,
      roi: 1.8,
      objective: 'branding'
    },
    {
      id: 4,
      name: 'Campaña Reactivación',
      channel: 'facebook',
      status: 'completed',
      budget: 4000,
      spent: 4000,
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      target: 'Clientes inactivos',
      impressions: 21500,
      clicks: 1200,
      conversions: 65,
      roi: 4.1,
      objective: 'retencion'
    }
  ];

  const channels = [
    { value: 'email', label: 'Email Marketing', icon: <Email />, color: '#EA4335' },
    { value: 'whatsapp', label: 'WhatsApp Business', icon: <WhatsApp />, color: '#25D366' },
    { value: 'facebook', label: 'Facebook Ads', icon: <Facebook />, color: '#1877F2' },
    { value: 'instagram', label: 'Instagram', icon: <Instagram />, color: '#E4405F' }
  ];

  const objectives = [
    { value: 'ventas', label: 'Generar Ventas' },
    { value: 'leads', label: 'Captar Leads' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'branding', label: 'Branding' },
    { value: 'retencion', label: 'Retención' }
  ];

  const filteredCampaigns = currentTab === 0 
    ? campaigns 
    : campaigns.filter(campaign => campaign.status === tabs[currentTab].value);

  const handleCreateCampaign = () => {
    setSelectedCampaign(null);
    setOpenDialog(true);
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setOpenDialog(true);
  };

  const toggleCampaignStatus = (campaignId, currentStatus) => {
    console.log('Cambiando estado de campaña:', campaignId, currentStatus);
    // Lógica para cambiar estado
  };

  const getChannelIcon = (channel) => {
    return channels.find(c => c.value === channel)?.icon;
  };

  const getChannelColor = (channel) => {
    return channels.find(c => c.value === channel)?.color;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      paused: 'warning',
      scheduled: 'info',
      completed: 'default'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      active: 'Activa',
      paused: 'Pausada',
      scheduled: 'Programada',
      completed: 'Finalizada'
    };
    return texts[status] || status;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateProgress = (spent, budget) => {
    return (spent / budget) * 100;
  };

  const CampaignCard = ({ campaign }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ 
              bgcolor: getChannelColor(campaign.channel),
              width: 40,
              height: 40
            }}>
              {getChannelIcon(campaign.channel)}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {campaign.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {channels.find(c => c.value === campaign.channel)?.label}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={getStatusText(campaign.status)}
            color={getStatusColor(campaign.status)}
            size="small"
          />
        </Box>

        {/* Presupuesto y Progreso */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">
              Presupuesto: {formatCurrency(campaign.budget)}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              Gastado: {formatCurrency(campaign.spent)}
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={calculateProgress(campaign.spent, campaign.budget)} 
            color={calculateProgress(campaign.spent, campaign.budget) >= 80 ? 'error' : 'primary'}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        {/* Métricas */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <People sx={{ fontSize: 20, color: 'primary.main', mb: 0.5 }} />
              <Typography variant="body2" fontWeight={600}>
                {campaign.impressions.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Impresiones
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 20, color: 'success.main', mb: 0.5 }} />
              <Typography variant="body2" fontWeight={600}>
                {campaign.clicks}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Clicks
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Analytics sx={{ fontSize: 20, color: 'warning.main', mb: 0.5 }} />
              <Typography variant="body2" fontWeight={600}>
                {campaign.conversions}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Conversiones
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Fechas y ROI */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">
              ROI: <span style={{ color: campaign.roi >= 2 ? 'green' : 'orange', fontWeight: 600 }}>
                {campaign.roi}x
              </span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {campaign.target}
            </Typography>
          </Box>
        </Box>

        {/* Acciones */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {campaign.status === 'active' && (
            <IconButton
              size="small"
              color="warning"
              onClick={() => toggleCampaignStatus(campaign.id, campaign.status)}
            >
              <Pause />
            </IconButton>
          )}
          {campaign.status === 'paused' && (
            <IconButton
              size="small"
              color="success"
              onClick={() => toggleCampaignStatus(campaign.id, campaign.status)}
            >
              <PlayArrow />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={() => handleEditCampaign(campaign)}
          >
            <Edit />
          </IconButton>
          <IconButton size="small" color="error">
            <Delete />
          </IconButton>
          <Button
            size="small"
            startIcon={<Analytics />}
            sx={{ ml: 'auto' }}
          >
            Analizar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Analytics sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>
                Campañas de Marketing
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Gestión y seguimiento de campañas multicanal
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Métricas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {campaigns.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Campañas Totales
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <PlayArrow sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {campaigns.filter(c => c.status === 'active').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activas
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <Analytics sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {formatCurrency(campaigns.reduce((sum, c) => sum + c.spent, 0))}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Invertido
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <Add sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Button variant="contained" onClick={handleCreateCampaign}>
                  Nueva Campaña
                </Button>
              </Box>
            </UBCard>
          </Grid>
        </Grid>

        {/* Tabs y Filtros */}
        <UBCard sx={{ mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            sx={{
              mb: 2,
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.9rem'
              }
            }}
          >
            {tabs.map((tab, index) => (
              <Tab key={tab.value} label={tab.label} />
            ))}
          </Tabs>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              select
              label="Canal"
              defaultValue=""
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">Todos los canales</MenuItem>
              {channels.map(channel => (
                <MenuItem key={channel.value} value={channel.value}>
                  {channel.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Objetivo"
              defaultValue=""
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">Todos los objetivos</MenuItem>
              {objectives.map(objective => (
                <MenuItem key={objective.value} value={objective.value}>
                  {objective.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Buscar campaña"
              placeholder="Nombre de campaña..."
              sx={{ minWidth: 200 }}
            />
          </Box>
        </UBCard>

        {/* Lista de Campañas */}
        <UBCard title={`Campañas ${tabs[currentTab].label}`}>
          <Grid container spacing={3}>
            {filteredCampaigns.map((campaign) => (
              <Grid item xs={12} md={6} lg={4} key={campaign.id}>
                <CampaignCard campaign={campaign} />
              </Grid>
            ))}
          </Grid>

          {filteredCampaigns.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Schedule sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No hay campañas {tabs[currentTab].label.toLowerCase()}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreateCampaign}
                sx={{ mt: 2 }}
              >
                Crear primera campaña
              </Button>
            </Box>
          )}
        </UBCard>

        {/* Dialog para crear/editar campaña */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedCampaign ? 'Editar Campaña' : 'Nueva Campaña de Marketing'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre de la Campaña"
                  placeholder="Ej: Oferta de Verano 2024"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Canal"
                  defaultValue=""
                >
                  {channels.map(channel => (
                    <MenuItem key={channel.value} value={channel.value}>
                      {channel.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Objetivo"
                  defaultValue=""
                >
                  {objectives.map(objective => (
                    <MenuItem key={objective.value} value={objective.value}>
                      {objective.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Presupuesto"
                  type="number"
                  placeholder="0.00"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Público Objetivo"
                  placeholder="Ej: Clientes 25-40 años"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha de Inicio"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha de Fin"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Campaña activa inmediatamente"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Mensaje/Contenido"
                  placeholder="Escribe el contenido de tu campaña..."
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button variant="contained">
              {selectedCampaign ? 'Actualizar' : 'Crear Campaña'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Campaigns;