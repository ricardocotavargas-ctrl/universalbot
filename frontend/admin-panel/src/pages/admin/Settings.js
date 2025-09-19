// frontend/admin-panel/src/pages/Settings.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Card,
  CardContent,
  Alert,
  useTheme,
  alpha
} from '@mui/material';
import {
  Save,
  Notifications,
  Language,
  Security,
  IntegrationInstructions,
  Payment,
  Business,
  Person,
  Palette,
  Cloud
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import UBButton from '../../components/ui/UBButton';

const Settings = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState('');

  // Estados para las configuraciones
  const [settings, setSettings] = useState({
    // Configuración General
    companyName: 'Mi Empresa',
    timezone: 'America/Caracas',
    language: 'es',
    currency: 'USD',
    
    // Notificaciones
    emailNotifications: true,
    pushNotifications: true,
    whatsappAlerts: false,
    dailyReports: true,
    weeklyReports: false,
    
    // Seguridad
    twoFactorAuth: true,
    sessionTimeout: 60,
    passwordExpiration: 90,
    loginAlerts: true,
    
    // Integraciones
    whatsappIntegration: true,
    facebookIntegration: true,
    instagramIntegration: false,
    emailIntegration: true,
    
    // Apariencia
    themeMode: 'light',
    primaryColor: '#2563eb',
    compactMode: false,
    animations: true
  });

  const handleSaveSettings = () => {
    setSaveStatus('saving');
    // Simular guardado
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const SettingsSection = ({ title, icon, children }) => (
    <UBCard sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ 
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          borderRadius: '8px',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </Box>
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
      </Box>
      {children}
    </UBCard>
  );

  const SettingSwitch = ({ label, value, onChange, description }) => (
    <Box sx={{ mb: 2 }}>
      <FormControlLabel
        control={
          <Switch
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            color="primary"
          />
        }
        label={
          <Box>
            <Typography variant="body1" fontWeight={500}>
              {label}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>
        }
        sx={{ alignItems: 'flex-start' }}
      />
    </Box>
  );

  const SettingSelect = ({ label, value, onChange, options, description }) => (
    <Box sx={{ mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {description && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {description}
        </Typography>
      )}
    </Box>
  );

  const SettingInput = ({ label, value, onChange, type = 'text', description }) => (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
      {description && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {description}
        </Typography>
      )}
    </Box>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Configuración del Sistema
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Personaliza y configura tu experiencia en la plataforma
          </Typography>
        </Box>

        {/* Barra de estado de guardado */}
        {saveStatus === 'success' && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Configuración guardada exitosamente
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Navegación lateral */}
          <Grid item xs={12} md={3}>
            <UBCard>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Categorías
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { id: 'general', label: 'General', icon: <Business /> },
                  { id: 'notifications', label: 'Notificaciones', icon: <Notifications /> },
                  { id: 'security', label: 'Seguridad', icon: <Security /> },
                  { id: 'integrations', label: 'Integraciones', icon: <IntegrationInstructions /> },
                  { id: 'appearance', label: 'Apariencia', icon: <Palette /> },
                  { id: 'billing', label: 'Facturación', icon: <Payment /> }
                ].map((category) => (
                  <Button
                    key={category.id}
                    startIcon={category.icon}
                    onClick={() => setActiveTab(category.id)}
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      backgroundColor: activeTab === category.id ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      color: activeTab === category.id ? theme.palette.primary.main : 'text.primary',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.05)
                      }
                    }}
                  >
                    {category.label}
                  </Button>
                ))}
              </Box>
            </UBCard>
          </Grid>

          {/* Contenido principal */}
          <Grid item xs={12} md={9}>
            {activeTab === 'general' && (
              <SettingsSection title="Configuración General" icon={<Business />}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <SettingInput
                      label="Nombre de la Empresa"
                      value={settings.companyName}
                      onChange={(value) => handleInputChange('companyName', value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SettingSelect
                      label="Zona Horaria"
                      value={settings.timezone}
                      onChange={(value) => handleInputChange('timezone', value)}
                      options={[
                        { value: 'America/Caracas', label: 'Caracas (UTC-4)' },
                        { value: 'America/New_York', label: 'Nueva York (UTC-5)' },
                        { value: 'America/Los_Angeles', label: 'Los Ángeles (UTC-8)' }
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SettingSelect
                      label="Idioma"
                      value={settings.language}
                      onChange={(value) => handleInputChange('language', value)}
                      options={[
                        { value: 'es', label: 'Español' },
                        { value: 'en', label: 'English' }
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SettingSelect
                      label="Moneda"
                      value={settings.currency}
                      onChange={(value) => handleInputChange('currency', value)}
                      options={[
                        { value: 'USD', label: 'Dólares USD' },
                        { value: 'EUR', label: 'Euros EUR' },
                        { value: 'VES', label: 'Bolívares VES' }
                      ]}
                    />
                  </Grid>
                </Grid>
              </SettingsSection>
            )}

            {activeTab === 'notifications' && (
              <SettingsSection title="Configuración de Notificaciones" icon={<Notifications />}>
                <SettingSwitch
                  label="Notificaciones por Email"
                  value={settings.emailNotifications}
                  onChange={(value) => handleInputChange('emailNotifications', value)}
                  description="Recibe notificaciones importantes por correo electrónico"
                />
                <SettingSwitch
                  label="Notificaciones Push"
                  value={settings.pushNotifications}
                  onChange={(value) => handleInputChange('pushNotifications', value)}
                  description="Notificaciones en tiempo real en el navegador"
                />
                <SettingSwitch
                  label="Alertas por WhatsApp"
                  value={settings.whatsappAlerts}
                  onChange={(value) => handleInputChange('whatsappAlerts', value)}
                  description="Recibe alertas críticas por WhatsApp"
                />
                <Divider sx={{ my: 2 }} />
                <SettingSwitch
                  label="Reportes Diarios"
                  value={settings.dailyReports}
                  onChange={(value) => handleInputChange('dailyReports', value)}
                  description="Resumen diario de actividad y métricas"
                />
                <SettingSwitch
                  label="Reportes Semanales"
                  value={settings.weeklyReports}
                  onChange={(value) => handleInputChange('weeklyReports', value)}
                  description="Reporte semanal completo de desempeño"
                />
              </SettingsSection>
            )}

            {activeTab === 'security' && (
              <SettingsSection title="Configuración de Seguridad" icon={<Security />}>
                <SettingSwitch
                  label="Autenticación de Dos Factores (2FA)"
                  value={settings.twoFactorAuth}
                  onChange={(value) => handleInputChange('twoFactorAuth', value)}
                  description="Añade una capa adicional de seguridad a tu cuenta"
                />
                <SettingSelect
                  label="Tiempo de Espera de Sesión"
                  value={settings.sessionTimeout}
                  onChange={(value) => handleInputChange('sessionTimeout', value)}
                  options={[
                    { value: 30, label: '30 minutos' },
                    { value: 60, label: '1 hora' },
                    { value: 120, label: '2 horas' },
                    { value: 240, label: '4 horas' }
                  ]}
                  description="Tiempo de inactividad antes de cerrar sesión automáticamente"
                />
                <SettingSelect
                  label="Expiración de Contraseña"
                  value={settings.passwordExpiration}
                  onChange={(value) => handleInputChange('passwordExpiration', value)}
                  options={[
                    { value: 30, label: '30 días' },
                    { value: 60, label: '60 días' },
                    { value: 90, label: '90 días' },
                    { value: 180, label: '180 días' }
                  ]}
                  description="Tiempo después del cual se debe cambiar la contraseña"
                />
                <SettingSwitch
                  label="Alertas de Inicio de Sesión"
                  value={settings.loginAlerts}
                  onChange={(value) => handleInputChange('loginAlerts', value)}
                  description="Recibe notificaciones cuando se inicie sesión en tu cuenta"
                />
              </SettingsSection>
            )}

            {activeTab === 'integrations' && (
              <SettingsSection title="Integraciones" icon={<IntegrationInstructions />}>
                <SettingSwitch
                  label="Integración con WhatsApp"
                  value={settings.whatsappIntegration}
                  onChange={(value) => handleInputChange('whatsappIntegration', value)}
                  description="Conecta tu cuenta de WhatsApp Business"
                />
                <SettingSwitch
                  label="Integración con Facebook"
                  value={settings.facebookIntegration}
                  onChange={(value) => handleInputChange('facebookIntegration', value)}
                  description="Conecta tu página de Facebook"
                />
                <SettingSwitch
                  label="Integración con Instagram"
                  value={settings.instagramIntegration}
                  onChange={(value) => handleInputChange('instagramIntegration', value)}
                  description="Conecta tu cuenta de Instagram Business"
                />
                <SettingSwitch
                  label="Integración con Email"
                  value={settings.emailIntegration}
                  onChange={(value) => handleInputChange('emailIntegration', value)}
                  description="Configura tu servidor de correo electrónico"
                />
              </SettingsSection>
            )}

            {activeTab === 'appearance' && (
              <SettingsSection title="Apariencia" icon={<Palette />}>
                <SettingSelect
                  label="Tema"
                  value={settings.themeMode}
                  onChange={(value) => handleInputChange('themeMode', value)}
                  options={[
                    { value: 'light', label: 'Claro' },
                    { value: 'dark', label: 'Oscuro' },
                    { value: 'auto', label: 'Automático' }
                  ]}
                  description="Elige el tema visual de la aplicación"
                />
                <SettingSwitch
                  label="Modo Compacto"
                  value={settings.compactMode}
                  onChange={(value) => handleInputChange('compactMode', value)}
                  description="Reduce el espaciado para mostrar más contenido"
                />
                <SettingSwitch
                  label="Animaciones"
                  value={settings.animations}
                  onChange={(value) => handleInputChange('animations', value)}
                  description="Habilita animaciones y transiciones suaves"
                />
              </SettingsSection>
            )}

            {activeTab === 'billing' && (
              <SettingsSection title="Facturación y Planes" icon={<Payment />}>
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Plan Actual: Enterprise
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Usuarios ilimitados • Todos los canales • Soporte prioritario
                    </Typography>
                    <Typography variant="h5" color="primary.main" gutterBottom>
                      $199/mes
                    </Typography>
                    <UBButton variant="contained" size="small">
                      Gestionar Suscripción
                    </UBButton>
                  </CardContent>
                </Card>

                <SettingInput
                  label="Método de Pago Principal"
                  value="Visa •••• 1234"
                  onChange={() => {}}
                  description="Tarjeta de crédito/débito para pagos automáticos"
                />

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Historial de Facturas
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Accede a tu historial completo de facturas y recibos
                  </Typography>
                  <UBButton variant="outlined" sx={{ mt: 2 }}>
                    Ver Historial de Facturas
                  </UBButton>
                </Box>
              </SettingsSection>
            )}

            {/* Botón de guardar */}
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <UBButton
                variant="contained"
                startIcon={<Save />}
                onClick={handleSaveSettings}
                loading={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Guardando...' : 'Guardar Cambios'}
              </UBButton>
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
              >
                Descartar Cambios
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Settings;