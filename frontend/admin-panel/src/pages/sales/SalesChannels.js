// frontend/admin-panel/src/pages/sales/SalesChannels.js
import React, { useState } from 'react';
import {
  Container, Typography, Box, Grid, Card, CardContent,
  Chip, Switch, FormControlLabel, TextField, Button,
  Divider, Alert
} from '@mui/material';
import {
  Store, WhatsApp, Language, PointOfSale,
  TrendingUp, Edit, Save
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const SalesChannels = () => {
  const [channels, setChannels] = useState([
    {
      id: 1,
      name: 'Tienda Física',
      type: 'physical',
      icon: <Store />,
      enabled: true,
      performance: 65,
      settings: { location: 'Av. Principal #123' }
    },
    {
      id: 2,
      name: 'WhatsApp Business',
      type: 'digital',
      icon: <WhatsApp />,
      enabled: true,
      performance: 85,
      settings: { phoneNumber: '+58 412-555-1234', autoResponses: true }
    },
    {
      id: 3,
      name: 'Página Web',
      type: 'digital',
      icon: <Language />,
      enabled: false,
      performance: 0,
      settings: { url: 'https://tienda.com', integrated: false }
    },
    {
      id: 4,
      name: 'Punto de Venta Móvil',
      type: 'mobile',
      icon: <PointOfSale />,
      enabled: true,
      performance: 45,
      settings: { devices: 2, mobileApp: true }
    }
  ]);

  const [editingChannel, setEditingChannel] = useState(null);

  const handleToggleChannel = (channelId) => {
    setChannels(prev => prev.map(channel =>
      channel.id === channelId
        ? { ...channel, enabled: !channel.enabled }
        : channel
    ));
  };

  const handleEdit = (channel) => {
    setEditingChannel(channel);
  };

  const handleSave = () => {
    // Lógica para guardar cambios
    setEditingChannel(null);
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 50) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Canales de Venta
        </Typography>
        <Typography color="text.secondary">
          Configuración y monitoreo de todos los canales de venta
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Los canales de venta activos generan el 85% de tus ingresos totales.
      </Alert>

      <Grid container spacing={3}>
        {channels.map((channel) => (
          <Grid item xs={12} md={6} key={channel.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ color: channel.enabled ? 'primary.main' : 'text.secondary' }}>
                      {channel.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6">{channel.name}</Typography>
                      <Chip
                        label={channel.type === 'physical' ? 'Físico' : 'Digital'}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={channel.enabled}
                        onChange={() => handleToggleChannel(channel.id)}
                        color="primary"
                      />
                    }
                    label={channel.enabled ? 'Activo' : 'Inactivo'}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Estadísticas de Rendimiento */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Rendimiento del Canal
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          height: 8,
                          backgroundColor: 'grey.200',
                          borderRadius: 4,
                          overflow: 'hidden'
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            width: `${channel.performance}%`,
                            backgroundColor: theme => theme.palette[getPerformanceColor(channel.performance)].main,
                            borderRadius: 4
                          }}
                        />
                      </Box>
                    </Box>
                    <Chip
                      label={`${channel.performance}%`}
                      size="small"
                      color={getPerformanceColor(channel.performance)}
                    />
                  </Box>
                </Box>

                {/* Configuración Específica */}
                {channel.enabled && (
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Configuración
                    </Typography>
                    {channel.type === 'physical' && (
                      <Typography variant="body2">
                        📍 {channel.settings.location}
                      </Typography>
                    )}
                    {channel.type === 'digital' && channel.name === 'WhatsApp Business' && (
                      <Typography variant="body2">
                        📞 {channel.settings.phoneNumber}
                      </Typography>
                    )}
                    {channel.type === 'digital' && channel.name === 'Página Web' && (
                      <Typography variant="body2">
                        🌐 {channel.settings.url}
                      </Typography>
                    )}
                    {channel.type === 'mobile' && (
                      <Typography variant="body2">
                        📱 {channel.settings.devices} dispositivos activos
                      </Typography>
                    )}
                  </Box>
                )}

                <Button
                  startIcon={<Edit />}
                  onClick={() => handleEdit(channel)}
                  sx={{ mt: 2 }}
                  size="small"
                >
                  Configurar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Resumen de Canales */}
      <UBCard title="Resumen de Canales" sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {channels.filter(c => c.enabled).length}
              </Typography>
              <Typography color="text.secondary">Canales Activos</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {Math.round(channels.reduce((sum, c) => sum + (c.enabled ? c.performance : 0), 0) / 
                 channels.filter(c => c.enabled).length || 0)}%
              </Typography>
              <Typography color="text.secondary">Rendimiento Promedio</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="warning.main" fontWeight="bold">
                {channels.filter(c => !c.enabled).length}
              </Typography>
              <Typography color="text.secondary">Canales Inactivos</Typography>
            </Box>
          </Grid>
        </Grid>
      </UBCard>
    </Container>
  );
};

export default SalesChannels;