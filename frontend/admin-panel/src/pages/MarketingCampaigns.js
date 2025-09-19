import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  useTheme,
  Tabs,
  Tab
} from '@mui/material';
import {
  Campaign,
  Add,
  People,
  TrendingUp,
  Email,
  WhatsApp
} from '@mui/icons-material';
import UBCard from '../components/ui/UBCard';

const MarketingCampaigns = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);

  const campaigns = [
    {
      id: 1,
      name: 'Oferta de Verano 2024',
      channel: 'email',
      status: 'active',
      target: 'all_customers',
      sent: 1250,
      opened: 890,
      converted: 45,
      budget: 500,
      roi: 320
    },
    {
      id: 2,
      name: 'Promo WhatsApp Premium',
      channel: 'whatsapp',
      status: 'completed',
      target: 'premium_clients',
      sent: 300,
      opened: 280,
      converted: 28,
      budget: 200,
      roi: 420
    },
    {
      id: 3,
      name: 'Nuevo Producto Launch',
      channel: 'email',
      status: 'draft',
      target: 'inactive_clients',
      sent: 0,
      opened: 0,
      converted: 0,
      budget: 1000,
      roi: 0
    }
  ];

  const tabs = [
    { label: 'Todas las Campañas', value: 'all' },
    { label: 'Activas', value: 'active' },
    { label: 'Programadas', value: 'scheduled' },
    { label: 'Completadas', value: 'completed' }
  ];

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'email': return <Email />;
      case 'whatsapp': return <WhatsApp />;
      case 'sms': return <WhatsApp />;
      default: return <Campaign />;
    }
  };

  const getChannelColor = (channel) => {
    switch (channel) {
      case 'email': return 'primary';
      case 'whatsapp': return 'success';
      case 'sms': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'info';
      case 'draft': return 'warning';
      case 'paused': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'completed': return 'Completada';
      case 'draft': return 'Borrador';
      case 'paused': return 'Pausada';
      default: return status;
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Campaign sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>
                Campañas de Marketing
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Gestión de campañas multicanal
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Métricas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <Campaign sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
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
                <People sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {campaigns.reduce((sum, c) => sum + c.sent, 0).toLocaleString('es-ES')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mensajes Enviados
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <TrendingUp sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  {campaigns.reduce((sum, c) => sum + c.converted, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Conversiones
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <Add sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Button variant="contained">
                  Nueva Campaña
                </Button>
              </Box>
            </UBCard>
          </Grid>
        </Grid>

        {/* Tabs */}
        <UBCard>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            sx={{ mb: 3 }}
          >
            {tabs.map((tab, index) => (
              <Tab key={tab.value} label={tab.label} />
            ))}
          </Tabs>

          {/* Lista de Campañas */}
          <Grid container spacing={3}>
            {campaigns.map((campaign) => (
              <Grid item xs={12} md={6} key={campaign.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {campaign.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip
                            icon={getChannelIcon(campaign.channel)}
                            label={campaign.channel.toUpperCase()}
                            color={getChannelColor(campaign.channel)}
                            size="small"
                          />
                          <Chip
                            label={getStatusText(campaign.status)}
                            color={getStatusColor(campaign.status)}
                            size="small"
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Enviados:
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {campaign.sent}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Abiertos:
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {campaign.opened}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Conversiones:
                        </Typography>
                        <Typography variant="body1" color="success.main" fontWeight={600}>
                          {campaign.converted}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          ROI:
                        </Typography>
                        <Typography variant="body1" color="success.main" fontWeight={600}>
                          +${campaign.roi}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Presupuesto: ${campaign.budget}
                      </Typography>
                      <Button variant="outlined" size="small">
                        Ver Detalles
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </UBCard>
      </Box>
    </Container>
  );
};

export default MarketingCampaigns;