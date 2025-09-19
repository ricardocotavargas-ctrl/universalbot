import React from 'react';
import { Box, Typography, Paper, Switch, FormControlLabel } from '@mui/material';

const SettingsTab = ({ settings, onSettingsChange }) => (
  <Box>
    <Typography variant="h4" gutterBottom fontWeight="bold">
      ⚙️ Configuración
    </Typography>
    
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Preferencias de Notificaciones
      </Typography>
      
      <FormControlLabel
        control={
          <Switch
            checked={settings.notifications}
            onChange={(e) => onSettingsChange({...settings, notifications: e.target.checked})}
          />
        }
        label="Notificaciones por email"
      />
      
      <FormControlLabel
        control={
          <Switch
            checked={settings.autoResponses}
            onChange={(e) => onSettingsChange({...settings, autoResponses: e.target.checked})}
          />
        }
        label="Respuestas automáticas"
      />
    </Paper>
  </Box>
);

export default SettingsTab;