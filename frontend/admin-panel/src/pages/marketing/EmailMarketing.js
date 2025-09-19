import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Chip, Button, LinearProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem,
  Switch, FormControlLabel, Tabs, Tab, Avatar
} from '@mui/material';
import {
  Email, Send, People, TrendingUp, Settings, Campaign,
  Drafts, Schedule, Analytics
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const EmailMarketing = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const mockCampaigns = [
    {
      id: 1,
      name: 'Newsletter Mayo 2024',
      status: 'sent',
      sent: 1250,
      opened: 850,
      clicked: 320,
      conversion: 45,
      date: '2024-05-20'
    },
    {
      id: 2,
      name: 'Oferta Especial Verano',
      status: 'scheduled',
      sent: 0,
      opened: 0,
      clicked: 0,
      conversion: 0,
      date: '2024-05-25'
    },
    {
      id: 3,
      name: 'Recordatorio de Carrito',
      status: 'draft',
      sent: 0,
      opened: 0,
      clicked: 0,
      conversion: 0,
      date: '2024-05-18'
    }
  ];

  useEffect(() => {
    setCampaigns(mockCampaigns);
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-VE').format(num);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'success';
      case 'scheduled': return 'warning';
      case 'draft': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'sent': return 'Enviado';
      case 'scheduled': return 'Programado';
      case 'draft': return 'Borrador';
      default: return 'Desconocido';
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Email Marketing
        </Typography>
        <Typography color="text.secondary">
          Crea y gestiona campañas de email marketing
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Campaign color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">{campaigns.length}</Typography>
              <Typography variant="body2" color="text.secondary">Campañas</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <People color="secondary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">2,450</Typography>
              <Typography variant="body2" color="text.secondary">Suscriptores</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">68.2%</Typography>
              <Typography variant="body2" color="text.secondary">Tasa de Apertura</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Send color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">12.8%</Typography>
              <Typography variant="body2" color="text.secondary">Tasa de Clics</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<Email />} onClick={() => setOpenDialog(true)}>
            Nueva Campaña
          </Button>
          <Button variant="outlined" startIcon={<People />}>
            Gestionar Suscriptores
          </Button>
          <Button variant="outlined" startIcon={<Analytics />}>
            Ver Reportes
          </Button>
        </Box>
      </UBCard>

      <UBCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<Campaign />} label="Todas las Campañas" />
            <Tab icon={<Send />} label="Enviadas" />
            <Tab icon={<Schedule />} label="Programadas" />
            <Tab icon={<Drafts />} label="Borradores" />
          </Tabs>
        </Box>

        <Grid container spacing={3}>
          {campaigns.map((campaign) => (
            <Grid item xs={12} md={6} lg={4} key={campaign.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6">{campaign.name}</Typography>
                    <Chip
                      label={getStatusText(campaign.status)}
                      color={getStatusColor(campaign.status)}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {new Date(campaign.date).toLocaleDateString('es-VE')}
                  </Typography>

                  {campaign.status === 'sent' && (
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Enviados:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatNumber(campaign.sent)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Aperturas:</Typography>
                        <Typography variant="body2" fontWeight="bold" color="success.main">
                          {formatNumber(campaign.opened)} ({(campaign.opened / campaign.sent * 100).toFixed(1)}%)
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Clics:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {formatNumber(campaign.clicked)} ({(campaign.clicked / campaign.sent * 100).toFixed(1)}%)
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Conversiones:</Typography>
                        <Typography variant="body2" fontWeight="bold" color="primary.main">
                          {formatNumber(campaign.conversion)}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined">
                      Ver Detalles
                    </Button>
                    {campaign.status === 'draft' && (
                      <Button size="small" variant="contained">
                        Editar
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </UBCard>

      {/* Diálogo para nueva campaña */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Crear Nueva Campaña de Email</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Nombre de la Campaña" />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Lista de Contactos</InputLabel>
                <Select label="Lista de Contactos">
                  <MenuItem value="all">Todos los suscriptores</MenuItem>
                  <MenuItem value="active">Clientes activos</MenuItem>
                  <MenuItem value="inactive">Clientes inactivos</MenuItem>
                  <MenuItem value="vip">Clientes VIP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Plantilla</InputLabel>
                <Select label="Plantilla">
                  <MenuItem value="newsletter">Newsletter</MenuItem>
                  <MenuItem value="promotional">Promocional</MenuItem>
                  <MenuItem value="transactional">Transaccional</MenuItem>
                  <MenuItem value="welcome">Bienvenida</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField fullWidth label="Asunto del Email" />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contenido del Email"
                multiline
                rows={6}
                placeholder="Escribe el contenido de tu email aquí..."
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Programar envío"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch />}
                label="Envío inmediato"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Crear Campaña
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmailMarketing;