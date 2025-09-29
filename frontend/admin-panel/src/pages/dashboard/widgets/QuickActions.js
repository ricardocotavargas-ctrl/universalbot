import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import {
  Add,
  Send,
  Campaign,
  Group,
  Inventory,
  Receipt,
  Analytics,
  Settings
} from '@mui/icons-material';
import UBButton from '../../../components/ui/UBButton';

const QuickActions = () => {
  const theme = useTheme();

  const quickActions = [
    {
      icon: <Send sx={{ fontSize: 24 }} />,
      label: 'Enviar Mensaje',
      description: 'Enviar mensaje masivo',
      color: 'primary',
      variant: 'contained'
    },
    {
      icon: <Campaign sx={{ fontSize: 24 }} />,
      label: 'Nueva Campaña',
      description: 'Crear campaña de marketing',
      color: 'secondary',
      variant: 'contained'
    },
    {
      icon: <Group sx={{ fontSize: 24 }} />,
      label: 'Agregar Cliente',
      description: 'Registrar nuevo cliente',
      color: 'success',
      variant: 'outlined'
    },
    {
      icon: <Inventory sx={{ fontSize: 24 }} />,
      label: 'Gestionar Stock',
      description: 'Actualizar inventario',
      color: 'warning',
      variant: 'outlined'
    },
    {
      icon: <Receipt sx={{ fontSize: 24 }} />,
      label: 'Crear Factura',
      description: 'Generar nueva factura',
      color: 'info',
      variant: 'outlined'
    },
    {
      icon: <Analytics sx={{ fontSize: 24 }} />,
      label: 'Ver Reportes',
      description: 'Reportes detallados',
      color: 'error',
      variant: 'outlined'
    }
  ];

  const recentActions = [
    { action: 'Mensaje masivo enviado', time: 'Hace 5 min', status: 'completed' },
    { action: 'Campaña "Verano 2024" creada', time: 'Hace 2 horas', status: 'completed' },
    { action: 'Actualización de inventario', time: 'Hace 1 día', status: 'pending' }
  ];

  const QuickActionButton = ({ action, index }) => (
    <UBButton
      variant={action.variant}
      color={action.color}
      startIcon={action.icon}
      fullWidth
      sx={{
        height: 80,
        flexDirection: 'column',
        gap: 1,
        py: 2,
        background: action.variant === 'contained' 
          ? undefined 
          : alpha(theme.palette[action.color].main, 0.05),
        border: action.variant === 'outlined' 
          ? `2px dashed ${alpha(theme.palette[action.color].main, 0.3)}`
          : undefined,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4]
        },
        transition: 'all 0.3s ease'
      }}
    >
      <Typography variant="body2" fontWeight={600}>
        {action.label}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {action.description}
      </Typography>
    </UBButton>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Acciones Rápidas
      </Typography>

      {/* Grid de Acciones Rápidas */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={6} sm={4} key={index}>
            <QuickActionButton action={action} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Acciones Recientes */}
      <Box>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Acciones Recientes
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {recentActions.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                background: alpha(theme.palette.background.paper, 0.5)
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  {item.action}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.time}
                </Typography>
              </Box>
              <Chip
                label={item.status === 'completed' ? 'Completado' : 'Pendiente'}
                size="small"
                color={item.status === 'completed' ? 'success' : 'warning'}
                variant="outlined"
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Botón de Más Acciones */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <UBButton
          variant="text"
          startIcon={<Settings />}
          size="small"
        >
          Ver todas las acciones
        </UBButton>
      </Box>
    </Box>
  );
};

export default QuickActions;
