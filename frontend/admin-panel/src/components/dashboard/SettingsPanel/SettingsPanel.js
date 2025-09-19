import React, { useState } from 'react';
import {
  Paper, Typography, Box, Grid, Card, CardContent,
  Switch, FormControlLabel, TextField, Button, Divider,
  List, ListItem, ListItemText, ListItemIcon, Chip,
  Accordion, AccordionSummary, AccordionDetails,
  MenuItem, InputAdornment, IconButton, useTheme,
  Alert, LinearProgress, Dialog, DialogTitle, DialogContent,
  DialogActions, Stepper, Step, StepLabel
} from '@mui/material';
import {
  ExpandMore, Save, Restore, Security, Notifications,
  Payment, Language, Api, Webhook, CloudUpload,
  CloudDownload, VpnKey, AdminPanelSettings, QrCode2,
  Visibility, VisibilityOff, CheckCircle, Error, Settings, ContentCopy
} from '@mui/icons-material';

const SettingsPanel = ({ config, onSaveConfig, loading = false }) => {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState('general');
  const [localConfig, setLocalConfig] = useState(config);
  const [showApiKey, setShowApiKey] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);

  const settingsSections = [
    { id: 'general', label: 'Generales', icon: <Settings /> },
    { id: 'security', label: 'Seguridad', icon: <Security /> },
    { id: 'notifications', label: 'Notificaciones', icon: <Notifications /> },
    { id: 'integrations', label: 'Integraciones', icon: <Api /> },
    { id: 'payment', label: 'Pagos', icon: <Payment /> },
    { id: 'advanced', label: 'Avanzado', icon: <AdminPanelSettings /> }
  ];

  const handleConfigChange = (section, key, value) => {
    setLocalConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    onSaveConfig?.(localConfig);
  };

  const handleReset = () => {
    setLocalConfig(config);
    setOpenResetDialog(false);
  };

  const ApiKeyField = () => (
    <TextField
      fullWidth
      label="API Key"
      value={showApiKey ? localConfig.security?.apiKey || 'sk_test_1234567890' : '••••••••••••••••'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowApiKey(!showApiKey)} edge="end">
              {showApiKey ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <IconButton onClick={() => navigator.clipboard.writeText(localConfig.security?.apiKey || '')} edge="end">
              <ContentCopy fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
        readOnly: true
      }}
      helperText="Clave para integraciones con API externas"
    />
  );

  const SettingSwitch = ({ label, section, key, description }) => (
    <FormControlLabel
      control={
        <Switch
          checked={localConfig[section]?.[key] || false}
          onChange={(e) => handleConfigChange(section, key, e.target.checked)}
          color="primary"
        />
      }
      label={
        <Box>
          <Typography variant="body2">{label}</Typography>
          <Typography variant="caption" color="textSecondary">
            {description}
          </Typography>
        </Box>
      }
      sx={{ mb: 2 }}
    />
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Configuración General
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre de la Plataforma"
                  value={localConfig.general?.platformName || 'Universal Bot Platform'}
                  onChange={(e) => handleConfigChange('general', 'platformName', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Idioma Predeterminado"
                  value={localConfig.general?.language || 'es'}
                >
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="pt">Português</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Zona Horaria"
                  value={localConfig.general?.timezone || 'America/Mexico_City'}
                >
                  <MenuItem value="America/Mexico_City">CDMX (UTC-6)</MenuItem>
                  <MenuItem value="America/New_York">EST (UTC-5)</MenuItem>
                  <MenuItem value="UTC">UTC</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Límite de Empresas"
                  type="number"
                  value={localConfig.general?.businessLimit || 10}
                  onChange={(e) => handleConfigChange('general', 'businessLimit', parseInt(e.target.value))}
                  helperText="Número máximo de empresas permitidas"
                />
              </Grid>
            </Grid>
            
            <SettingSwitch
              label="Modo Mantenimiento"
              section="general"
              key="maintenanceMode"
              description="Bloquea el acceso temporalmente para mantenimiento"
            />
            
            <SettingSwitch
              label="Registro Abierto"
              section="general"
              key="openRegistration"
              description="Permitir que nuevas empresas se registren automáticamente"
            />
          </Box>
        );

      case 'security':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Configuración de Seguridad
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Configura las opciones de seguridad y acceso a la plataforma
            </Alert>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ApiKeyField />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tiempo de Expiración de Sesión"
                  type="number"
                  value={localConfig.security?.sessionTimeout || 24}
                  onChange={(e) => handleConfigChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">horas</InputAdornment>,
                  }}
                  helperText="Tiempo de inactividad antes de cerrar sesión"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Límite de Intentos de Login"
                  type="number"
                  value={localConfig.security?.loginAttempts || 5}
                  onChange={(e) => handleConfigChange('security', 'loginAttempts', parseInt(e.target.value))}
                  helperText="Intentos fallidos antes de bloquear cuenta"
                />
              </Grid>
            </Grid>
            
            <SettingSwitch
              label="Autenticación de Dos Factores"
              section="security"
              key="twoFactorAuth"
              description="Requerir 2FA para accesos administrativos"
            />
            
            <SettingSwitch
              label="Registro de Auditoría"
              section="security"
              key="auditLog"
              description="Guardar registro de todas las acciones importantes"
            />
            
            <SettingSwitch
              label="Cifrado de Datos"
              section="security"
              key="dataEncryption"
              description="Cifrar datos sensibles en la base de datos"
            />
          </Box>
        );

      case 'notifications':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Configuración de Notificaciones
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email de Notificaciones"
                  type="email"
                  value={localConfig.notifications?.adminEmail || 'admin@universalbot.com'}
                  onChange={(e) => handleConfigChange('notifications', 'adminEmail', e.target.value)}
                  helperText="Email para notificaciones del sistema"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Frecuencia de Reportes"
                  value={localConfig.notifications?.reportFrequency || 'daily'}
                >
                  <MenuItem value="realtime">Tiempo real</MenuItem>
                  <MenuItem value="hourly">Cada hora</MenuItem>
                  <MenuItem value="daily">Diario</MenuItem>
                  <MenuItem value="weekly">Semanal</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
              Tipos de Notificaciones
            </Typography>
            
            <SettingSwitch
              label="Notificaciones por Email"
              section="notifications"
              key="emailNotifications"
              description="Enviar notificaciones importantes por email"
            />
            
            <SettingSwitch
              label="Notificaciones Push"
              section="notifications"
              key="pushNotifications"
              description="Notificaciones en tiempo real en el navegador"
            />
            
            <SettingSwitch
              label="Alertas de Seguridad"
              section="notifications"
              key="securityAlerts"
              description="Alertas inmediatas por actividades sospechosas"
            />
            
            <SettingSwitch
              label="Reportes Automáticos"
              section="notifications"
              key="autoReports"
              description="Enviar reportes periódicos de desempeño"
            />
          </Box>
        );

      case 'integrations':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Integraciones Externas
            </Typography>
            
            <Alert severity="warning" sx={{ mb: 3 }}>
              ⚠️ Las integraciones requieren configuración técnica avanzada
            </Alert>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Webhook URL"
                  value={localConfig.integrations?.webhookUrl || ''}
                  onChange={(e) => handleConfigChange('integrations', 'webhookUrl', e.target.value)}
                  placeholder="https://api.tu-dominio.com/webhook"
                  helperText="URL para enviar eventos y notificaciones"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="WhatsApp Business API ID"
                  value={localConfig.integrations?.whatsappApiId || ''}
                  onChange={(e) => handleConfigChange('integrations', 'whatsappApiId', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="WhatsApp Business API Token"
                  type="password"
                  value={localConfig.integrations?.whatsappApiToken || ''}
                  onChange={(e) => handleConfigChange('integrations', 'whatsappApiToken', e.target.value)}
                />
              </Grid>
            </Grid>
            
            <SettingSwitch
              label="WhatsApp Business API"
              section="integrations"
              key="whatsappEnabled"
              description="Integración con WhatsApp Business API oficial"
            />
            
            <SettingSwitch
              label="Webhooks Activos"
              section="integrations"
              key="webhooksEnabled"
              description="Activar envío de eventos via webhooks"
            />
            
            <SettingSwitch
              label="API REST"
              section="integrations"
              key="apiEnabled"
              description="Habilitar API REST para integraciones externas"
            />
          </Box>
        );

      case 'payment':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Configuración de Pagos
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Proveedor de Pagos"
                  value={localConfig.payment?.provider || 'stripe'}
                >
                  <MenuItem value="stripe">Stripe</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                  <MenuItem value="mercadopago">Mercado Pago</MenuItem>
                  <MenuItem value="offline">Offline/Presencial</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Moneda Predeterminada"
                  select
                  value={localConfig.payment?.currency || 'MXN'}
                >
                  <MenuItem value="MXN">MXN - Peso Mexicano</MenuItem>
                  <MenuItem value="USD">USD - Dólar Americano</MenuItem>
                  <MenuItem value="EUR">EUR - Euro</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Clave Pública"
                  value={localConfig.payment?.publicKey || ''}
                  onChange={(e) => handleConfigChange('payment', 'publicKey', e.target.value)}
                  helperText="Llave pública del proveedor de pagos"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Clave Secreta"
                  type="password"
                  value={localConfig.payment?.secretKey || ''}
                  onChange={(e) => handleConfigChange('payment', 'secretKey', e.target.value)}
                  helperText="Llave secreta del proveedor de pagos"
                />
              </Grid>
            </Grid>
            
            <SettingSwitch
              label="Pagos Recurrentes"
              section="payment"
              key="recurringPayments"
              description="Habilitar suscripciones y pagos automáticos"
            />
            
            <SettingSwitch
              label="Facturación Automática"
              section="payment"
              key="autoInvoicing"
              description="Generar facturas automáticamente"
            />
            
            <SettingSwitch
              label="Notificaciones de Pago"
              section="payment"
              key="paymentNotifications"
              description="Enviar notificaciones de pagos exitosos/fallidos"
            />
          </Box>
        );

      case 'advanced':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Configuración Avanzada
            </Typography>
            
            <Alert severity="warning" sx={{ mb: 3 }}>
              ⚠️ Estas configuraciones son para usuarios avanzados
            </Alert>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Límite de API Requests"
                  type="number"
                  value={localConfig.advanced?.apiRateLimit || 1000}
                  onChange={(e) => handleConfigChange('advanced', 'apiRateLimit', parseInt(e.target.value))}
                  helperText="Máximo de requests por hora por API key"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tiempo de Cache"
                  type="number"
                  value={localConfig.advanced?.cacheTimeout || 300}
                  onChange={(e) => handleConfigChange('advanced', 'cacheTimeout', parseInt(e.target.value))}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">segundos</InputAdornment>,
                  }}
                  helperText="Tiempo que se mantienen los datos en cache"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Custom CSS"
                  value={localConfig.advanced?.customCss || ''}
                  onChange={(e) => handleConfigChange('advanced', 'customCss', e.target.value)}
                  helperText="CSS personalizado para customizar la apariencia"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Custom JavaScript"
                  value={localConfig.advanced?.customJs || ''}
                  onChange={(e) => handleConfigChange('advanced', 'customJs', e.target.value)}
                  helperText="JavaScript personalizado para funcionalidades extra"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Herramientas de Desarrollo
              </Typography>
              
              <SettingSwitch
                label="Modo Debug"
                section="advanced"
                key="debugMode"
                description="Activar logs detallados para desarrollo"
              />
              
              <SettingSwitch
                label="Mock Data"
                section="advanced"
                key="mockData"
                description="Usar datos de prueba en lugar de reales"
              />
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            <Settings sx={{ mr: 1, color: 'primary.main' }} />
            Configuración Avanzada
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Restore />}
              onClick={() => setOpenResetDialog(true)}
              color="warning"
            >
              Restablecer
            </Button>
            
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </Box>
        </Box>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        <Grid container spacing={3}>
          {/* Sidebar de secciones */}
          <Grid item xs={12} md={3}>
            <Paper variant="outlined">
              <List component="nav">
                {settingsSections.map(section => (
                  <ListItem
                    key={section.id}
                    button
                    selected={activeSection === section.id}
                    onClick={() => setActiveSection(section.id)}
                    sx={{
                      borderLeft: activeSection === section.id ? `3px solid ${theme.palette.primary.main}` : 'none',
                      bgcolor: activeSection === section.id ? 'primary.light' : 'transparent',
                      '&:hover': {
                        bgcolor: 'action.hover'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: activeSection === section.id ? 'primary.main' : 'inherit' }}>
                      {section.icon}
                    </ListItemIcon>
                    <ListItemText primary={section.label} />
                  </ListItem>
                ))}
              </List>
            </Paper>
            
            {/* Status del sistema */}
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Estado del Sistema
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircle color="success" sx={{ fontSize: 16, mr: 1 }} />
                  <Typography variant="caption">Sistema operativo</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircle color="success" sx={{ fontSize: 16, mr: 1 }} />
                  <Typography variant="caption">Base de datos conectada</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Error color="warning" sx={{ fontSize: 16, mr: 1 }} />
                  <Typography variant="caption">Backup pendiente</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contenido de la sección */}
          <Grid item xs={12} md={9}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              {renderSectionContent()}
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Dialog de confirmación de reset */}
      <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)}>
        <DialogTitle>Restablecer Configuración</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres restablecer toda la configuración a los valores por defecto?
            Se perderán todos los cambios no guardados.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetDialog(false)}>Cancelar</Button>
          <Button onClick={handleReset} color="warning" variant="contained">
            Restablecer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SettingsPanel;