import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Chip, Button, LinearProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem,
  Switch, FormControlLabel
} from '@mui/material';
import {
  WhatsApp, Facebook, Instagram, Email, Chat, Settings,
  TrendingUp, People, Message
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const mockChannels = [
    {
      id: 1,
      name: 'WhatsApp Business',
      type: 'whatsapp',
      status: 'connected',
      connected: true,
      usage: 85,
      messages: 1250,
      customers: 450,
      plan: 'Professional'
    },
    {
      id: 2,
      name: 'Facebook Messenger',
      type: 'facebook',
      status: 'connected',
      connected: true,
      usage: 65,
      messages: 850,
      customers: 320,
      plan: 'Business'
    },
    {
      id: 3,
      name: 'Instagram Direct',
      type: 'instagram',
      status: 'disconnected',
      connected: false,
      usage: 0,
      messages: 0,
      customers: 0,
      plan: 'Not connected'
    },
    {
      id: 4,
      name: 'Email Marketing',
      type: 'email',
      status: 'connected',
      connected: true,
      usage: 45,
      messages: 12500,
      customers: 1200,
      plan: 'Enterprise'
    }
  ];

  useEffect(() => {
    setChannels(mockChannels);
  }, []);

  const getChannelIcon = (type) => {
    switch (type) {
      case 'whatsapp': return <WhatsApp />;
      case 'facebook': return <Facebook />;
      case 'instagram': return <Instagram />;
      case 'email': return <Email />;
      default: return <Chat />;
    }
  };

  const getChannelColor = (type) => {
    switch (type) {
      case 'whatsapp': return 'success';
      case 'facebook': return 'primary';
      case 'instagram': return 'secondary';
      case 'email': return 'warning';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'connected' ? 'success' : 'error';
  };

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Gestión de Canales
        </Typography>
        <Typography color="text.secondary">
          Configura y administra todos tus canales de comunicación
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {channels.map((channel) => (
          <Grid item xs={12} md={6} lg={3} key={channel.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                border: channel.connected ? 2 : 1,
                borderColor: channel.connected ? `${getChannelColor(channel.type)}.main` : 'divider',
                '&:hover': { 
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
              onClick={() => handleChannelClick(channel)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    color: `${getChannelColor(channel.type)}.main`,
                    mr: 2,
                    fontSize: 32
                  }}>
                    {getChannelIcon(channel.type)}
                  </Box>
                  <Box>
                    <Typography variant="h6">{channel.name}</Typography>
                    <Chip
                      label={channel.status === 'connected' ? 'Conectado' : 'Desconectado'}
                      color={getStatusColor(channel.status)}
                      size="small"
                    />
                  </Box>
                </Box>

                {channel.connected && (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Uso del canal: {channel.usage}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={channel.usage}
                        color={getChannelColor(channel.type)}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>

                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Message sx={{ fontSize: 20, color: 'text.secondary', mb: 0.5 }} />
                          <Typography variant="body2" fontWeight="bold">
                            {channel.messages}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Mensajes
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <People sx={{ fontSize: 20, color: 'text.secondary', mb: 0.5 }} />
                          <Typography variant="body2" fontWeight="bold">
                            {channel.customers}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Clientes
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Plan: {channel.plan}
                      </Typography>
                    </Box>
                  </>
                )}

                {!channel.connected && (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Button variant="contained" size="small">
                      Conectar Canal
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <UBCard>
        <Typography variant="h6" gutterBottom>
          Resumen de Actividad
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Mensajes por Canal
              </Typography>
              <Box sx={{ mt: 2 }}>
                {channels.filter(c => c.connected).map((channel) => (
                  <Box key={channel.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {channel.name}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {channel.messages} mensajes
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(channel.messages / channels.reduce((sum, c) => sum + c.messages, 0)) * 100}
                      color={getChannelColor(channel.type)}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Estadísticas de Engagement
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Tasa de Respuesta:</Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    78%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Tiempo Promedio de Respuesta:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    2.4 min
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Satisfacción del Cliente:</Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    4.8/5
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Canal Más Efectivo:</Typography>
                  <Typography variant="body2" fontWeight="bold" color="primary.main">
                    WhatsApp Business
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </UBCard>

      {/* Diálogo de configuración del canal */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedChannel?.name} - Configuración
        </DialogTitle>
        <DialogContent>
          {selectedChannel && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch checked={selectedChannel.connected} />}
                  label="Canal Activo"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Nombre del Canal" defaultValue={selectedChannel.name} />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Plan</InputLabel>
                  <Select label="Plan" defaultValue={selectedChannel.plan}>
                    <MenuItem value="Basic">Basic</MenuItem>
                    <MenuItem value="Professional">Professional</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Enterprise">Enterprise</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Webhook URL"
                  placeholder="https://api.tudominio.com/webhook"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Token de Acceso"
                  type="password"
                  placeholder="••••••••••••"
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Respuestas Automáticas"
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Notificaciones por Email"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Guardar Configuración
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Channels;