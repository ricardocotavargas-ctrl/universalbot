import React, { useState } from 'react';
import { Badge, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import { Notifications } from '@mui/icons-material';

const NotificationBell = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications] = useState([
    { id: 1, text: 'Nuevo lead registrado', time: 'Hace 5 min', read: false },
    { id: 2, text: 'Venta completada exitosamente', time: 'Hace 15 min', read: false },
    { id: 3, text: 'Cliente requiere seguimiento', time: 'Hace 1 hora', read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Badge badgeContent={unreadCount} color="error">
          <Notifications />
        </Badge>
      </IconButton>
      
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <Box sx={{ p: 2, width: 320 }}>
          <Typography variant="h6" gutterBottom>Notificaciones</Typography>
          {notifications.map(notification => (
            <MenuItem key={notification.id} sx={{ 
              backgroundColor: notification.read ? 'transparent' : '#f0f9ff',
              mb: 1,
              borderRadius: 1
            }}>
              <Box>
                <Typography variant="body2">{notification.text}</Typography>
                <Typography variant="caption" color="text.secondary">{notification.time}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
};