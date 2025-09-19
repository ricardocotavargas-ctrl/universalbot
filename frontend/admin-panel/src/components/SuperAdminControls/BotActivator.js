import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Slider
} from '@mui/material';
import { SmartToy, Psychology, Settings } from '@mui/icons-material';

const BotActivator = ({ business, open, onClose, onActivate }) => {
  const [botConfig, setBotConfig] = useState(business?.botConfig || {
    active: false,
    intelligenceLevel: 3,
    responseSpeed: 'normal',
    language: 'es',
    autoLearning: true
  });

  const handleSave = () => {
    onActivate(botConfig);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToy />
          <Typography variant="h6">Configuración de IA - {business?.name}</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          ⚠️ Activación del Asistente IA - Solo SuperAdmin
        </Alert>

        <FormControlLabel
          control={
            <Switch
              checked={botConfig.active}
              onChange={(e) => setBotConfig(prev => ({ ...prev, active: e.target.checked }))}
              color="primary"
            />
          }
          label="Activar Asistente IA"
          sx={{ mb: 2 }}
        />

        {botConfig.active && (
          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>Nivel de Inteligencia</Typography>
            <Slider
              value={botConfig.intelligenceLevel}
              onChange={(e, value) => setBotConfig(prev => ({ ...prev, intelligenceLevel: value }))}
              min={1}
              max={5}
              marks={[
                { value: 1, label: 'Básico' },
                { value: 3, label: 'Standard' },
                { value: 5, label: 'Avanzado' }
              ]}
              valueLabelDisplay="auto"
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Velocidad de respuesta</InputLabel>
              <Select
                value={botConfig.responseSpeed}
                label="Velocidad de respuesta"
                onChange={(e) => setBotConfig(prev => ({ ...prev, responseSpeed: e.target.value }))}
              >
                                <MenuItem value="slow">Lenta (+ precisión)</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="fast">Rápida (- precisión)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Idioma principal</InputLabel>
              <Select
                value={botConfig.language}
                label="Idioma principal"
                onChange={(e) => setBotConfig(prev => ({ ...prev, language: e.target.value }))}
              >
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="en">Inglés</MenuItem>
                <MenuItem value="pt">Portugués</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={botConfig.autoLearning}
                  onChange={(e) => setBotConfig(prev => ({ ...prev, autoLearning: e.target.checked }))}
                  color="primary"
                />
              }
              label="Auto-aprendizaje habilitado"
              sx={{ mt: 2 }}
            />

            <Alert severity="info" sx={{ mt: 2 }}>
              🤖 El asistente IA aprenderá de las interacciones y mejorará con el tiempo
            </Alert>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" disabled={!botConfig.active}>
          {botConfig.active ? 'Activar IA' : 'Desactivar IA'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BotActivator;