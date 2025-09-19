import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, Card, CardContent, Typography,
  Switch, FormControlLabel, Box, Chip, IconButton,
  FormControl, InputLabel, Select, MenuItem, Alert,
  Stepper, Step, StepLabel, Accordion, AccordionSummary,
  AccordionDetails, FormGroup, InputAdornment
} from '@mui/material';
import {
  Add, Delete, Edit, Save, Cancel, WhatsApp,
  Facebook, Instagram, Email, Settings, SmartToy,
  Analytics, ChatBubble, Notifications, Campaign
} from '@mui/icons-material';
import { api } from '../../utils/api';

const ServiceManager = ({ business, open, onClose, onSave }) => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    platform: 'whatsapp',
    enabled: true,
    config: {}
  });
  const [loading, setLoading] = useState(false);

  const platforms = [
    { value: 'whatsapp', label: 'WhatsApp Business', icon: <WhatsApp /> },
    { value: 'facebook', label: 'Facebook Messenger', icon: <Facebook /> },
    { value: 'instagram', label: 'Instagram Direct', icon: <Instagram /> },
    { value: 'email', label: 'Email Marketing', icon: <Email /> },
    { value: 'webchat', label: 'Chat Web', icon: <ChatBubble /> },
    { value: 'sms', label: 'SMS', icon: <Notifications /> }
  ];

  const platformConfigs = {
    whatsapp: {
      fields: [
        { name: 'businessNumber', label: 'Número de WhatsApp Business', type: 'text', required: true },
        { name: 'wabaId', label: 'WABA ID', type: 'text', required: true },
        { name: 'templateNamespace', label: 'Namespace de Plantillas', type: 'text' },
        { name: 'autoResponses', label: 'Respuestas Automáticas', type: 'boolean', default: true }
      ]
    },
    facebook: {
      fields: [
        { name: 'pageId', label: 'ID de Página', type: 'text', required: true },
        { name: 'pageToken', label: 'Token de Página', type: 'password', required: true },
        { name: 'respondComments', label: 'Responder Comentarios', type: 'boolean', default: true },
        { name: 'respondMessages', label: 'Responder Mensajes', type: 'boolean', default: true }
      ]
    },
    instagram: {
      fields: [
        { name: 'accountId', label: 'ID de Cuenta', type: 'text', required: true },
        { name: 'accessToken', label: 'Access Token', type: 'password', required: true },
        { name: 'respondDMs', label: 'Responder Mensajes Directos', type: 'boolean', default: true },
        { name: 'autoFollow', label: 'Seguimiento Automático', type: 'boolean', default: false }
      ]
    },
    email: {
      fields: [
        { name: 'smtpHost', label: 'Servidor SMTP', type: 'text', required: true },
        { name: 'smtpPort', label: 'Puerto SMTP', type: 'number', default: 587 },
        { name: 'smtpUser', label: 'Usuario SMTP', type: 'text', required: true },
        { name: 'smtpPass', label: 'Contraseña SMTP', type: 'password', required: true },
        { name: 'fromEmail', label: 'Email Remitente', type: 'email', required: true }
      ]
    }
  };

  useEffect(() => {
    if (business && open) {
      loadServices();
    }
  }, [business, open]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const businessServices = await api.get(`/api/business/${business.id}/services`);
      setServices(businessServices);
    } catch (error) {
      console.error('Error loading services:', error);
      setServices([]);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.put(`/api/business/${business.id}/services`, { services });
      onSave(services);
      onClose();
    } catch (error) {
      console.error('Error saving services:', error);
    }
    setLoading(false);
  };

  const addService = () => {
    if (newService.name.trim()) {
      setServices([...services, { ...newService, id: Date.now() }]);
      setNewService({
        name: '',
        platform: 'whatsapp',
        enabled: true,
        config: {}
      });
    }
  };

  const updateService = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const updateServiceConfig = (index, configField, value) => {
    const updated = [...services];
    updated[index].config[configField] = value;
    setServices(updated);
  };

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Settings sx={{ mr: 2 }} />
          Gestión de Servicios - {business?.name}
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Configura los servicios de mensajería y automatización para esta empresa
        </Typography>

        {/* Formulario para agregar nuevo servicio */}
        <Card sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Agregar Nuevo Servicio
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Nombre del Servicio"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Plataforma</InputLabel>
                <Select
                  value={newService.platform}
                  label="Plataforma"
                  onChange={(e) => setNewService({ ...newService, platform: e.target.value, config: {} })}
                >
                  {platforms.map((platform) => (
                    <MenuItem key={platform.value} value={platform.value}>
                      <Box display="flex" alignItems="center">
                        {platform.icon}
                        <span style={{ marginLeft: 8 }}>{platform.label}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newService.enabled}
                    onChange={(e) => setNewService({ ...newService, enabled: e.target.checked })}
                  />
                }
                label="Activado"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                onClick={addService}
                disabled={!newService.name.trim()}
                startIcon={<Add />}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
        </Card>

        {/* Lista de servicios configurados */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Servicios Configurados
          </Typography>
          
          {services.length === 0 ? (
            <Alert severity="info" sx={{ mb: 2 }}>
              No hay servicios configurados. Agrega el primer servicio arriba.
            </Alert>
          ) : (
            services.map((service, index) => (
              <Accordion key={service.id || index} sx={{ mb: 2 }}>
                <AccordionSummary>
                  <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                    <Box display="flex" alignItems="center">
                      <Chip
                        label={service.enabled ? 'ACTIVO' : 'INACTIVO'}
                        color={service.enabled ? 'success' : 'default'}
                        size="small"
                        sx={{ mr: 2 }}
                      />
                      <Typography fontWeight="bold">{service.name}</Typography>
                      <Chip
                        label={platforms.find(p => p.value === service.platform)?.label}
                        variant="outlined"
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeService(index);
                      }}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </AccordionSummary>
                
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={service.enabled}
                            onChange={(e) => updateService(index, 'enabled', e.target.checked)}
                          />
                        }
                        label="Servicio activado"
                      />
                    </Grid>

                    {platformConfigs[service.platform]?.fields.map((field) => (
                      <Grid item xs={12} sm={6} key={field.name}>
                        {field.type === 'boolean' ? (
                          <FormControlLabel
                            control={
                              <Switch
                                checked={service.config[field.name] ?? field.default ?? false}
                                onChange={(e) => updateServiceConfig(index, field.name, e.target.checked)}
                              />
                            }
                            label={field.label}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            label={field.label}
                            type={field.type}
                            value={service.config[field.name] || ''}
                            onChange={(e) => updateServiceConfig(index, field.name, e.target.value)}
                            size="small"
                            required={field.required}
                            InputProps={{
                              type: field.type === 'password' ? 'password' : 'text'
                            }}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading}
          startIcon={<Save />}
        >
          Guardar Configuración
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceManager;