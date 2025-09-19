import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  useTheme
} from '@mui/material';
import {
  TrendingUp,
  PersonAdd,
  Chat,
  Assignment,
  Notifications,
  MoreVert
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionListItem = motion(ListItem);

const ActivityFeed = () => {
  const theme = useTheme();

  const activities = [
    {
      id: 1,
      type: 'sale',
      title: 'Nueva venta realizada',
      description: 'Cliente: Tech Solutions SA - Monto: $2,500',
      time: 'Hace 5 minutos',
      icon: <TrendingUp />,
      color: '#10b981'
    },
    {
      id: 2,
      type: 'client',
      title: 'Cliente nuevo registrado',
      description: 'Maria García se unió a la plataforma',
      time: 'Hace 15 minutos',
      icon: <PersonAdd />,
      color: '#6366f1'
    },
    {
      id: 3,
      type: 'interaction',
      title: 'Interacción completada',
      description: 'Chatbot resolvió consulta de cliente',
      time: 'Hace 30 minutos',
      icon: <Chat />,
      color: '#f59e0b'
    },
    {
      id: 4,
      type: 'task',
      title: 'Tarea asignada',
      description: 'Revisar configuración de flujo IA',
      time: 'Hace 1 hora',
      icon: <Assignment />,
      color: '#ef4444'
    },
    {
      id: 5,
      type: 'notification',
      title: 'Sistema actualizado',
      description: 'Nueva versión 2.1.0 disponible',
      time: 'Hace 2 horas',
      icon: <Notifications />,
      color: '#8b5cf6'
    }
  ];

  const getActivityChip = (type) => {
    const config = {
      sale: { label: 'Venta', color: 'success' },
      client: { label: 'Cliente', color: 'primary' },
      interaction: { label: 'Interacción', color: 'warning' },
      task: { label: 'Tarea', color: 'error' },
      notification: { label: 'Sistema', color: 'secondary' }
    };
    
    return config[type] || { label: 'General', color: 'default' };
  };

  return (
    <Paper sx={{ 
      p: 3, 
      borderRadius: '20px', 
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} sx={{ color: 'white' }}>
          📊 Actividad Reciente
        </Typography>
        <IconButton sx={{ color: '#cbd5e1' }}>
          <MoreVert />
        </IconButton>
      </Box>

      <List sx={{ p: 0 }}>
        {activities.map((activity, index) => {
          const chipConfig = getActivityChip(activity.type);
          
          return (
            <MotionListItem
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              sx={{
                p: 2,
                mb: 1.5,
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateX(4px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    background: `linear-gradient(135deg, ${activity.color} 0%, ${theme.palette[chipConfig.color].light} 100%)`,
                    boxShadow: `0 4px 15px ${activity.color}40`
                  }}
                >
                  {activity.icon}
                </Avatar>
              </ListItemAvatar>
              
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'white' }}>
                      {activity.title}
                    </Typography>
                    <Chip
                      label={chipConfig.label}
                      size="small"
                      color={chipConfig.color}
                      variant="filled"
                      sx={{ 
                        height: '20px', 
                        fontSize: '0.7rem',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      {activity.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                      {activity.time}
                    </Typography>
                  </Box>
                }
              />
            </MotionListItem>
          );
        })}
      </List>

      {/* Footer */}
      <Box sx={{ 
        mt: 3, 
        pt: 2, 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center'
      }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#6366f1', 
            fontWeight: 600, 
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Ver toda la actividad →
        </Typography>
      </Box>
    </Paper>
  );
};

export default ActivityFeed;