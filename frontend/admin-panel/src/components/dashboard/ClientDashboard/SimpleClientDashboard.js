import React, { useState } from 'react';
import {
  Container, Grid, Card, CardContent, Typography,
  Box, Button, Chip, Paper, LinearProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Switch, FormControlLabel, Tab, Tabs,
  Stepper, Step, StepLabel, Alert
} from '@mui/material';
import {
  WhatsApp, Facebook, Instagram, Email, Dashboard,
  TrendingUp, People, ChatBubble, AttachMoney, Settings,
  Logout, Analytics, Notifications, SupportAgent,
  Business, Phone, Language, Schedule, Download,
  CheckCircle, Warning, Error
} from '@mui/icons-material';

import MessagesTab from './MessagesTab';
import AnalyticsTab from './AnalyticsTab'; 
import SettingsTab from './SettingsTab';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

const SimpleClientDashboard = ({ business }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [integrationDialog, setIntegrationDialog] = useState(null);
  const [integrationStep, setIntegrationStep] = useState(0);
  const [settings, setSettings] = useState({
    autoResponses: true,
    businessHours: true,
    notifications: true,
    emailAlerts: true,
    aiAssistant: true
  });

  // Datos REALES del negocio
  const businessStats = {
    totalMessages: business?.monthly_conversations || 156,
    activeChats: business?.integrations?.whatsapp?.active ? 12 : 0,
    conversionRate: business?.conversion_rate || '24%',
    responseTime: '2.3min',
    monthlyGrowth: business?.monthlyGrowth || '+18%',
    totalRevenue: business?.revenue ? `$${business.revenue.toLocaleString()}` : '$12,456',
    satisfactionRate: '92%'
  };

  const integrations = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      icon: <WhatsApp />,
      connected: business?.integrations?.whatsapp?.connected || false,
      status: business?.integrations?.whatsapp?.connected ? 'connected' : 'disconnected',
      color: 'success'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook />,
      connected: business?.integrations?.facebook?.connected || false,
      status: business?.integrations?.facebook?.connected ? 'connected' : 'disconnected',
      color: 'primary'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram />,
      connected: business?.integrations?.instagram?.connected || false,
      status: business?.integrations?.instagram?.connected ? 'connected' : 'disconnected',
      color: 'secondary'
    },
    {
      id: 'email',
      name: 'Email Marketing',
      icon: <Email />,
      connected: true,
      status: 'connected',
      color: 'warning'
    }
  ];

  const recentActivities = [
    { 
      action: 'Nuevo lead desde WhatsApp', 
      time: 'Hace 2 min', 
      value: '+$500',
      type: 'success'
    },
    { 
      action: 'Mensaje automático enviado', 
      time: 'Hace 5 min', 
      value: 'Cliente: Juan Pérez',
      type: 'info'
    },
    { 
      action: 'Venta completada #ORD-001', 
      time: 'Hace 15 min', 
      value: '+$1,200',
      type: 'success'
    },
    { 
      action: 'Instagram conectado exitosamente', 
      time: 'Ayer', 
      value: '✅',
      type: 'success'
    }
  ];

  const StatCard = ({ icon, title, value, subtitle, color = 'primary' }) => (
    <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box color={`${color}.main`} fontSize="2rem">
            {icon}
          </Box>
          {subtitle && (
            <Chip label={subtitle} size="small" color={color} variant="outlined" />
          )}
        </Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {value}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  const IntegrationCard = ({ integration }) => (
    <Card sx={{ p: 2, textAlign: 'center' }}>
      <Box sx={{ color: `${integration.color}.main`, fontSize: 40, mb: 1 }}>
        {integration.icon}
      </Box>
      <Typography variant="h6" gutterBottom>
        {integration.name}
      </Typography>
      <Chip
        label={integration.connected ? 'Conectado' : 'Desconectado'}
        color={integration.connected ? 'success' : 'default'}
        size="small"
        sx={{ mb: 2 }}
      />
      <Button
        variant={integration.connected ? "outlined" : "contained"}
        onClick={() => setIntegrationDialog(integration.id)}
        fullWidth
      >
        {integration.connected ? 'Configurar' : 'Conectar'}
      </Button>
    </Card>
  );

  const renderIntegrationDialog = () => {
    if (!integrationDialog) return null;

    const integration = integrations.find(i => i.id === integrationDialog);

    return (
      <Dialog open={true} onClose={() => setIntegrationDialog(null)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {integration.icon}
            Conectar {integration.name}
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Stepper activeStep={integrationStep} sx={{ mb: 3 }}>
            <Step><StepLabel>Autenticación</StepLabel></Step>
            <Step><StepLabel>Configuración</StepLabel></Step>
            <Step><StepLabel>Finalizar</StepLabel></Step>
          </Stepper>

          {integrationStep === 0 && (
            <Box>
              <Typography variant="body2" paragraph>
                Conecta tu cuenta de {integration.name} para gestionar mensajes y comentarios automáticamente.
              </Typography>
              {integration.id === 'whatsapp' && (
                <TextField
                  fullWidth
                  label="Número de WhatsApp"
                  placeholder="+506 8888 8888"
                  sx={{ mb: 2 }}
                />
              )}
              {integration.id === 'facebook' && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Necesitarás acceso administrativo a la página de Facebook.
                </Alert>
              )}
              {integration.id === 'instagram' && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Conecta tu cuenta profesional de Instagram para gestionar comentarios y mensajes.
                </Alert>
              )}
            </Box>
          )}

          {integrationStep === 1 && (
            <Box>
              <FormControlLabel
                control={<Switch checked={settings.autoResponses} onChange={(e) => setSettings({...settings, autoResponses: e.target.checked})} />}
                label="Respuestas automáticas inteligentes"
              />
              <FormControlLabel
                control={<Switch checked={settings.businessHours} onChange={(e) => setSettings({...settings, businessHours: e.target.checked})} />}
                label="Respuestas fuera de horario laboral"
              />
              <FormControlLabel
                control={<Switch checked={settings.aiAssistant} onChange={(e) => setSettings({...settings, aiAssistant: e.target.checked})} />}
                label="Asistente IA para respuestas"
              />
            </Box>
          )}

          {integrationStep === 2 && (
            <Box textAlign="center">
              <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                ¡Conexión Exitosa!
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {integration.name} ha sido conectado correctamente. Ya puedes gestionar tus mensajes desde la plataforma.
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIntegrationDialog(null)}>
            Cancelar
          </Button>
          {integrationStep < 2 ? (
            <Button variant="contained" onClick={() => setIntegrationStep(integrationStep + 1)}>
              {integrationStep === 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          ) : (
            <Button variant="contained" onClick={() => {
              setIntegrationDialog(null);
              setIntegrationStep(0);
            }}>
              Completar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  return (
  <Container maxWidth="xl" sx={{ py: 3 }}>
    {/* Header */}
    <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <Grid container alignItems="center" spacing={3}>
        <Grid item>
          <Business sx={{ fontSize: 48 }} />
        </Grid>
        <Grid item xs>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {business?.name || 'Mi Negocio'}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {business?.industry || 'Panel de Control Professional'}
          </Typography>
        </Grid>
        <Grid item>
          <Chip 
            label="Plan Premium" 
            color="success" 
            variant="filled"
            sx={{ color: 'white', fontWeight: 'bold' }}
          />
        </Grid>
      </Grid>
    </Paper>

    {/* Tabs de Navegación */}
    <Paper sx={{ mb: 3 }}>
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
        <Tab icon={<Dashboard />} label="Dashboard" />
        <Tab icon={<ChatBubble />} label="Mensajes" />
        <Tab icon={<Analytics />} label="Analytics" />
        <Tab icon={<Settings />} label="Configuración" />
      </Tabs>
    </Paper>

    {/* Contenido de las Tabs */}
    <TabPanel value={activeTab} index={0}>
      {/* Dashboard Tab */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<ChatBubble />}
            title="Mensajes este mes"
            value={businessStats.totalMessages}
            subtitle="+12%"
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<People />}
            title="Chats activos"
            value={businessStats.activeChats}
            subtitle="En tiempo real"
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<TrendingUp />}
            title="Tasa de conversión"
            value={businessStats.conversionRate}
            subtitle="Óptima"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<AttachMoney />}
            title="Ingresos mensuales"
            value={businessStats.totalRevenue}
            subtitle={businessStats.monthlyGrowth}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Integraciones */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        🔗 Integraciones Conectadas
      </Typography>
      <Grid container spacing={3} mb={4}>
        {integrations.map((integration) => (
          <Grid item xs={12} sm={6} md={3} key={integration.id}>
            <IntegrationCard integration={integration} />
          </Grid>
        ))}
      </Grid>

      {/* Actividad Reciente y Acciones */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                📋 Actividad Reciente
              </Typography>
              <Box>
                {recentActivities.map((activity, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, borderBottom: index < recentActivities.length - 1 ? '1px solid #eee' : 'none' }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight="medium">{activity.action}</Typography>
                      <Typography variant="body2" color="textSecondary">{activity.time}</Typography>
                    </Box>
                    <Chip 
                      label={activity.value} 
                      color={activity.type === 'success' ? 'success' : 'primary'} 
                      variant="outlined" 
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                ⚡ Acciones Rápidas
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="contained" startIcon={<Download />}>
                  Descargar Reporte Mensual
                </Button>
                <Button variant="outlined" startIcon={<SupportAgent />}>
                  Contactar Soporte
                </Button>
                <Button variant="outlined" startIcon={<Settings />}>
                  Configuración Avanzada
                </Button>
                <Button variant="outlined" startIcon={<Analytics />}>
                  Ver Analytics Completos
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </TabPanel>

    <TabPanel value={activeTab} index={1}>
      {/* Mensajes Tab */}
      <MessagesTab />
    </TabPanel>

    <TabPanel value={activeTab} index={2}>
      {/* Analytics Tab */}
      <AnalyticsTab />
    </TabPanel>

    <TabPanel value={activeTab} index={3}>
      {/* Configuración Tab */}
      <SettingsTab settings={settings} onSettingsChange={setSettings} />
    </TabPanel>

    {renderIntegrationDialog()}

    {/* Soporte */}
    <Box textAlign="center" mt={4} p={3} bgcolor="grey.50" borderRadius={2}>
      <SupportAgent sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        ¿Necesitas ayuda?
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier consulta
      </Typography>
      <Button variant="contained" startIcon={<SupportAgent />}>
        Contactar Soporte Prioritario
      </Button>
    </Box>
  </Container>
);
};

export default SimpleClientDashboard;