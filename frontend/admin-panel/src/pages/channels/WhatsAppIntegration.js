import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Chip, Button, LinearProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem,
  Switch, FormControlLabel, Alert
} from '@mui/material';
import {
  WhatsApp, QrCode, Message, People, TrendingUp,
  Settings, Refresh, CheckCircle, Error
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const WhatsAppIntegration = () => {
  const [integration, setIntegration] = useState({
    connected: false,
    status: 'disconnected',
    phoneNumber: '+584123456789',
    businessName: 'Mi Negocio',
    qrCode: null,
    messagesSent: 1250,
    conversations: 450,
    templates: 12,
    usage: 65
  });

  const [openDialog, setOpenDialog] = useState(false);

  const handleConnect = () => {
    // Simular conexión
    setIntegration(prev => ({
      ...prev,
      connected: true,
      status: 'connected'
    }));
  };

  const handleDisconnect = () => {
    // Simular desconexión
    setIntegration(prev => ({
      ...prev,
      connected: false,
      status: 'disconnected'
    }));
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          WhatsApp Business API
        </Typography>
        <Typography color="text.secondary">
          Conecta tu cuenta de WhatsApp Business para enviar mensajes automatizados
        </Typography>
      </Box>

      {!integration.connected && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography fontWeight="bold">
            WhatsApp Business no está conectado
          </Typography>
          <Typography variant="body2">
            Conecta tu cuenta para comenzar a enviar mensajes a tus clientes
          </Typography>
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <WhatsApp sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h5">WhatsApp Business</Typography>
                  <Chip
                    label={integration.connected ? 'Conectado' : 'Desconectado'}
                    color={integration.connected ? 'success' : 'error'}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>

              {!integration.connected ? (
                <Box>
                  <Typography variant="body1" gutterBottom>
                    Para conectar WhatsApp Business:
                  </Typography>
                  <Box component="ol" sx={{ pl: 2, mb: 3 }}>
                    <li><Typography variant="body2">Asegúrate de tener una cuenta de WhatsApp Business</Typography></li>
                    <li><Typography variant="body2">Verifica tu número de teléfono empresarial</Typography></li>
                    <li><Typography variant="body2">Escanea el código QR con tu teléfono</Typography></li>
                    <li><Typography variant="body2">Configura los mensajes de bienvenida y plantillas</Typography></li>
                  </Box>
                  
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleConnect}
                    startIcon={<QrCode />}
                  >
                    Conectar WhatsApp
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Número conectado:
                      </Typography>
                      <Typography variant="h6">{integration.phoneNumber}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Nombre del negocio:
                      </Typography>
                      <Typography variant="h6">{integration.businessName}</Typography>
                    </Grid>
                  </Grid>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDisconnect}
                    sx={{ mt: 3 }}
                  >
                    Desconectar WhatsApp
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estado del Servicio
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Uso de la API:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {integration.usage}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={integration.usage}
                  color={integration.usage > 80 ? 'warning' : 'primary'}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Message sx={{ fontSize: 20, color: 'primary.main', mr: 1 }} />
                  <Typography variant="body2">
                    {integration.messagesSent} mensajes enviados
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <People sx={{ fontSize: 20, color: 'success.main', mr: 1 }} />
                  <Typography variant="body2">
                    {integration.conversations} conversaciones
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ fontSize: 20, color: 'info.main', mr: 1 }} />
                  <Typography variant="body2">
                    {integration.templates} plantillas aprobadas
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {integration.connected && (
        <>
          <UBCard sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button variant="contained" startIcon={<Settings />} onClick={() => setOpenDialog(true)}>
                Configuración
              </Button>
              <Button variant="outlined" startIcon={<Refresh />}>
                Actualizar Estado
              </Button>
              <Button variant="outlined" startIcon={<Message />}>
                Ver Plantillas
              </Button>
            </Box>
          </UBCard>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Configuración de Mensajes
                  </Typography>
                  
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Mensaje de bienvenida automático"
                    sx={{ mb: 2 }}
                  />
                  
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Respuestas automáticas fuera de horario"
                    sx={{ mb: 2 }}
                  />
                  
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Notificaciones de entrega"
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Límites y Cuotas
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Límite de mensajes por día: <strong>1,000</strong>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={45}
                      color="primary"
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Contactos únicos: <strong>450/1,000</strong>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={45}
                      color="success"
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Plantillas activas: <strong>12/25</strong>
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={48}
                      color="info"
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {/* Diálogo de configuración */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Configuración de WhatsApp Business</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de WhatsApp Business"
                value={integration.phoneNumber}
                onChange={(e) => setIntegration(prev => ({ ...prev, phoneNumber: e.target.value }))}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre del Negocio"
                value={integration.businessName}
                onChange={(e) => setIntegration(prev => ({ ...prev, businessName: e.target.value }))}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Webhook URL"
                placeholder="https://api.tudominio.com/webhook/whatsapp"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Token de Verificación"
                type="password"
                placeholder="••••••••••••"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Habilitar webhook para recibir mensajes"
              />
            </Grid>
          </Grid>
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

export default WhatsAppIntegration;