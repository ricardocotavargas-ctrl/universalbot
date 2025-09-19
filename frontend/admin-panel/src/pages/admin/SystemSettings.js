import React, { useState } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Switch, FormControlLabel, Button, TextField, FormControl,
  InputLabel, Select, MenuItem, Divider, Alert
} from '@mui/material';
import {
  Settings, Save, Security, Notifications, Backup,
  Language, Cloud, Refresh
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // Configuración General
    siteName: 'UniversalBot',
    defaultLanguage: 'es',
    timezone: 'America/Caracas',
    currency: 'USD',
    
    // Configuración de Seguridad
    require2FA: false,
    sessionTimeout: 60,
    passwordComplexity: 'medium',
    
    // Configuración de Notificaciones
    emailNotifications: true,
    pushNotifications: true,
    lowStockAlerts: true,
    paymentReminders: true,
    
    // Configuración de Backup
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    
    // Configuración de API
    apiEnabled: true,
    apiRateLimit: 1000
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Lógica para guardar configuraciones
    console.log('Configuraciones guardadas:', settings);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Configuración del Sistema
        </Typography>
        <Typography color="text.secondary">
          Configuración global de la plataforma UniversalBot
        </Typography>
      </Box>

      <UBCard>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Settings sx={{ mr: 1 }} />
          Configuración General
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre del Sitio"
              value={settings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Idioma Predeterminado</InputLabel>
              <Select
                value={settings.defaultLanguage}
                onChange={(e) => handleSettingChange('defaultLanguage', e.target.value)}
                label="Idioma Predeterminado"
              >
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="pt">Português</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Zona Horaria</InputLabel>
              <Select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                label="Zona Horaria"
              >
                <MenuItem value="America/Caracas">Caracas (UTC-4)</MenuItem>
                <MenuItem value="America/New_York">New York (UTC-5)</MenuItem>
                <MenuItem value="America/Mexico_City">Mexico City (UTC-6)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Moneda Predeterminada</InputLabel>
              <Select
                value={settings.currency}
                onChange={(e) => handleSettingChange('currency', e.target.value)}
                label="Moneda Predeterminada"
              >
                <MenuItem value="USD">Dólar Americano (USD)</MenuItem>
                <MenuItem value="EUR">Euro (EUR)</MenuItem>
                <MenuItem value="VES">Bolívar Soberano (VES)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </UBCard>

      <UBCard sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Security sx={{ mr: 1 }} />
          Seguridad
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.require2FA}
                  onChange={(e) => handleSettingChange('require2FA', e.target.checked)}
                />
              }
              label="Requerir autenticación de dos factores (2FA) para administradores"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Tiempo de espera de sesión (minutos)</InputLabel>
              <Select
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                label="Tiempo de espera de sesión (minutos)"
              >
                <MenuItem value={30}>30 minutos</MenuItem>
                <MenuItem value={60}>60 minutos</MenuItem>
                <MenuItem value={120}>2 horas</MenuItem>
                <MenuItem value={240}>4 horas</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Complejidad de contraseña</InputLabel>
              <Select
                value={settings.passwordComplexity}
                onChange={(e) => handleSettingChange('passwordComplexity', e.target.value)}
                label="Complejidad de contraseña"
              >
                <MenuItem value="low">Baja</MenuItem>
                <MenuItem value="medium">Media</MenuItem>
                <MenuItem value="high">Alta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </UBCard>

      <UBCard sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Notifications sx={{ mr: 1 }} />
          Notificaciones
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                />
              }
              label="Notificaciones por correo electrónico"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.pushNotifications}
                  onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                />
              }
              label="Notificaciones push"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.lowStockAlerts}
                  onChange={(e) => handleSettingChange('lowStockAlerts', e.target.checked)}
                />
              }
              label="Alertas de stock bajo"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.paymentReminders}
                  onChange={(e) => handleSettingChange('paymentReminders', e.target.checked)}
                />
              }
              label="Recordatorios de pago"
            />
          </Grid>
        </Grid>
      </UBCard>

      <UBCard sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Backup sx={{ mr: 1 }} />
          Backup y Mantenimiento
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.autoBackup}
                  onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                />
              }
              label="Backup automático"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Frecuencia de backup</InputLabel>
              <Select
                value={settings.backupFrequency}
                onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                label="Frecuencia de backup"
              >
                <MenuItem value="daily">Diario</MenuItem>
                <MenuItem value="weekly">Semanal</MenuItem>
                <MenuItem value="monthly">Mensual</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Retención de backups (días)</InputLabel>
              <Select
                value={settings.backupRetention}
                onChange={(e) => handleSettingChange('backupRetention', e.target.value)}
                label="Retención de backups (días)"
              >
                <MenuItem value={7}>7 días</MenuItem>
                <MenuItem value={30}>30 días</MenuItem>
                <MenuItem value={90}>90 días</MenuItem>
                <MenuItem value={365}>365 días</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </UBCard>

      <UBCard sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Cloud sx={{ mr: 1 }} />
          API y Integraciones
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.apiEnabled}
                  onChange={(e) => handleSettingChange('apiEnabled', e.target.checked)}
                />
              }
              label="Habilitar API REST"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Límite de tasa API (requests/hora)</InputLabel>
              <Select
                value={settings.apiRateLimit}
                onChange={(e) => handleSettingChange('apiRateLimit', e.target.value)}
                label="Límite de tasa API (requests/hora)"
              >
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={500}>500</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
                <MenuItem value={5000}>5000</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </UBCard>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" startIcon={<Refresh />}>
          Restablecer
        </Button>
        <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
          Guardar Configuración
        </Button>
      </Box>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Nota:</strong> Algunos cambios pueden requerir reiniciar el servidor para aplicar completamente.
        </Typography>
      </Alert>
    </Container>
  );
};

export default SystemSettings;