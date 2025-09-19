import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Chip, Button, TextField, FormControl, InputLabel, Select, MenuItem,
  Switch, FormControlLabel, Dialog, DialogTitle, DialogContent,
  DialogActions, Tabs, Tab
} from '@mui/material';
import {
  Chat, Settings, Message, People, Schedule, Analytics,
  Add, WhatsApp, Facebook, Instagram, Telegram
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const MessagingIntegration = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);

  const mockTemplates = [
    { id: 1, name: 'Bienvenida Nuevo Cliente', channel: 'whatsapp', status: 'approved', language: 'es', category: 'UTILITY' },
    { id: 2, name: 'Recordatorio de Pago', channel: 'whatsapp', status: 'pending', language: 'es', category: 'UTILITY' },
    { id: 3, name: 'Confirmación de Pedido', channel: 'facebook', status: 'approved', language: 'es', category: 'TRANSACTIONAL' },
    { id: 4, name: 'Seguimiento Post-Venta', channel: 'whatsapp', status: 'rejected', language: 'es', category: 'MARKETING' }
  ];

  useEffect(() => {
    setTemplates(mockTemplates);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Aprobado';
      case 'pending': return 'Pendiente';
      case 'rejected': return 'Rechazado';
      default: return 'Desconocido';
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'whatsapp': return <WhatsApp />;
      case 'facebook': return <Facebook />;
      case 'instagram': return <Instagram />;
      case 'telegram': return <Telegram />;
      default: return <Chat />;
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Mensajería Integrada
        </Typography>
        <Typography color="text.secondary">
          Gestiona plantillas y automatizaciones de mensajería
        </Typography>
      </Box>

      <UBCard sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<Message />} label="Plantillas" />
            <Tab icon={<People />} label="Automatizaciones" />
            <Tab icon={<Analytics />} label="Estadísticas" />
            <Tab icon={<Settings />} label="Configuración" />
          </Tabs>
        </Box>
      </UBCard>

      {activeTab === 0 && (
        <>
          <UBCard sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Canal</InputLabel>
                <Select label="Canal">
                  <MenuItem value="all">Todos los canales</MenuItem>
                  <MenuItem value="whatsapp">WhatsApp</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="telegram">Telegram</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Estado</InputLabel>
                <Select label="Estado">
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="approved">Aprobados</MenuItem>
                  <MenuItem value="pending">Pendientes</MenuItem>
                  <MenuItem value="rejected">Rechazados</MenuItem>
                </Select>
              </FormControl>
              
              <Button variant="contained" startIcon={<Add />} onClick={() => setOpenTemplateDialog(true)}>
                Nueva Plantilla
              </Button>
            </Box>
          </UBCard>

          <Grid container spacing={3}>
            {templates.map((template) => (
              <Grid item xs={12} md={6} lg={4} key={template.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ color: 'primary.main', mr: 2 }}>
                        {getChannelIcon(template.channel)}
                      </Box>
                      <Box>
                        <Typography variant="h6">{template.name}</Typography>
                        <Chip
                          label={getStatusText(template.status)}
                          color={getStatusColor(template.status)}
                          size="small"
                        />
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Canal: {template.channel}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Idioma: {template.language.toUpperCase()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Categoría: {template.category}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined">
                        Previsualizar
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined"
                        disabled={template.status !== 'approved'}
                      >
                        Usar
                      </Button>
                      <Button size="small" variant="outlined">
                        Editar
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {activeTab === 1 && (
        <UBCard>
          <Typography variant="h6" gutterBottom>
            Automatizaciones de Mensajería
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Schedule color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Bienvenida Automática</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Mensaje enviado cuando un cliente se registra por primera vez
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Activado"
                  />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Schedule color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Recordatorio de Carrito</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Recordatorio para carritos abandonados después de 1 hora
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Activado"
                  />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Schedule color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Seguimiento Post-Venta</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Mensaje de seguimiento 3 días después de una compra
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Activado"
                  />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Schedule color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Re-engagement</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Mensaje para clientes inactivos por más de 30 días
                  </Typography>
                  <FormControlLabel
                    control={<Switch />}
                    label="Activado"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </UBCard>
      )}

      {/* Diálogo para nueva plantilla */}
      <Dialog open={openTemplateDialog} onClose={() => setOpenTemplateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Nueva Plantilla de Mensaje</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Nombre de la Plantilla" />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Canal</InputLabel>
                <Select label="Canal">
                  <MenuItem value="whatsapp">WhatsApp Business</MenuItem>
                  <MenuItem value="facebook">Facebook Messenger</MenuItem>
                  <MenuItem value="instagram">Instagram Direct</MenuItem>
                  <MenuItem value="telegram">Telegram</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select label="Categoría">
                  <MenuItem value="UTILITY">Utility</MenuItem>
                  <MenuItem value="MARKETING">Marketing</MenuItem>
                  <MenuItem value="TRANSACTIONAL">Transactional</MenuItem>
                  <MenuItem value="AUTHENTICATION">Authentication</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Idioma</InputLabel>
                <Select label="Idioma" defaultValue="es">
                  <MenuItem value="es">Español (es)</MenuItem>
                  <MenuItem value="en">English (en)</MenuItem>
                  <MenuItem value="pt">Portugués (pt)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Encabezado (opcional)" />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cuerpo del Mensaje"
                multiline
                rows={4}
                placeholder="Escribe el contenido de tu plantilla aquí..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField fullWidth label="Pie de página (opcional)" />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Botones (opcional)"
                placeholder="Ej: Sí,No,Tal vez"
                helperText="Separa los botones con comas"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplateDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={() => setOpenTemplateDialog(false)}>
            Crear Plantilla
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MessagingIntegration;