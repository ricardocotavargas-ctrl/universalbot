import React from 'react';
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip  // ✅ Asegurar que está importado
} from '@mui/material';
import {
  WhatsApp,
  Email,
  ShoppingCart,
  PersonAdd
} from '@mui/icons-material';

const RecentActivity = () => {
  const activities = [
    { action: 'Nuevo lead por WhatsApp', time: 'Hace 2 min', icon: <WhatsApp />, color: 'success' },
    { action: 'Pedido completado #ORD-1234', time: 'Hace 5 min', icon: <ShoppingCart />, color: 'primary' },
    { action: 'Email marketing enviado', time: 'Hace 15 min', icon: <Email />, color: 'info' },
    { action: 'Nuevo cliente registrado', time: 'Hace 30 min', icon: <PersonAdd />, color: 'warning' }
  ];

  return (
    <Paper sx={{ 
      p: 3, 
      borderRadius: 3,
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
    }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        📈 Actividad Reciente
      </Typography>
      <List>
        {activities.map((activity, index) => (
          <ListItem key={index} sx={{ 
            borderBottom: index < activities.length - 1 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
            py: 2
          }}>
            <ListItemIcon sx={{ color: `${activity.color}.main` }}>
              {activity.icon}
            </ListItemIcon>
            <ListItemText
              primary={activity.action}
              secondary={activity.time}
            />
            <Chip label="Nuevo" size="small" color={activity.color} variant="outlined" />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RecentActivity;