import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  useTheme
} from '@mui/material';
import {
  AddBusiness,
  Send,
  Download,
  Analytics,
  Settings,
  People
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const QuickActions = () => {
  const theme = useTheme();

  const actions = [
    {
      label: 'Nueva Empresa',
      icon: <AddBusiness />,
      color: 'primary',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
    },
    {
      label: 'Enviar Mensaje',
      icon: <Send />,
      color: 'secondary',
      gradient: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)'
    },
    {
      label: 'Descargar Reporte',
      icon: <Download />,
      color: 'success',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
    },
    {
      label: 'Ver Analytics',
      icon: <Analytics />,
      color: 'warning',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
    },
    {
      label: 'Gestionar Clientes',
      icon: <People />,
      color: 'info',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)'
    },
    {
      label: 'Configuración',
      icon: <Settings />,
      color: 'error',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)'
    }
  ];

  return (
    <Paper sx={{ 
      p: 3, 
      borderRadius: '20px', 
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      height: '100%',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
    }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3, color: 'white' }}>
        ⚡ Acciones Rápidas
      </Typography>
      
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={6} key={index}>
            <MotionButton
              variant="contained"
              fullWidth
              startIcon={action.icon}
              sx={{
                py: 2,
                borderRadius: '14px',
                background: action.gradient,
                boxShadow: `0 6px 20px ${theme.palette[action.color].main}40`,
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'none',
                '&:hover': {
                  background: action.gradient,
                  boxShadow: `0 10px 30px ${theme.palette[action.color].main}60`,
                  transform: 'translateY(-2px)'
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {action.label}
            </MotionButton>
          </Grid>
        ))}
      </Grid>

      {/* Estadísticas rápidas */}
      <Box sx={{ 
        mt: 4, 
        p: 2.5, 
        borderRadius: '14px', 
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <Typography variant="body2" fontWeight={600} sx={{ color: '#cbd5e1', mb: 1 }}>
          📈 Resumen Rápido
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            12 tareas pendientes
          </Typography>
          <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
            85% completado
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default QuickActions;