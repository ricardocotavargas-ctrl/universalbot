// frontend/admin-panel/src/components/Notifications/NotificationCenter.js
import React, { useState } from 'react';
import {
  Box,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Badge,
  Chip,
  Divider,
  Button,
  alpha,
  useTheme
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Circle,
  CheckCircle,
  Error,
  Warning,
  Info,
  DoneAll  // ← Cambiado MarkAsRead por DoneAll
} from '@mui/icons-material';
import { useWebSocket } from '../../contexts/WebSocketContext';

const NotificationCenter = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications, unreadCount, markAsRead, clearNotifications } = useWebSocket();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (notificationId) => {
    markAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach(notif => {
      if (!notif.read) {
        markAsRead(notif.id);
      }
    });
  };

  const getNotificationIcon = (level) => {
    switch (level) {
      case 'error': return <Error sx={{ color: 'error.main' }} />;
      case 'warning': return <Warning sx={{ color: 'warning.main' }} />;
      case 'success': return <CheckCircle sx={{ color: 'success.main' }} />;
      default: return <Info sx={{ color: 'info.main' }} />;
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    if (diff < 60000) return 'Ahora mismo';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} h ago`;
    return time.toLocaleDateString();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
        sx={{
          position: 'relative',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1)
          }
        }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPopover-paper': {
            width: 400,
            maxHeight: 500,
            mt: 1
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Notificaciones
            </Typography>
            {unreadCount > 0 && (
              <Button
                size="small"
                startIcon={<DoneAll />}  // ← Cambiado aquí también
                onClick={handleMarkAllAsRead}
              >
                Marcar todo como leído
              </Button>
            )}
          </Box>

          <Divider />

          <List sx={{ p: 0 }}>
            {notifications.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="No hay notificaciones"
                  secondary="Todas las notificaciones aparecerán aquí"
                />
              </ListItem>
            ) : (
              notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  sx={{
                    borderLeft: `4px solid ${getNotificationColor(notification.level || 'info')}`,
                    mb: 1,
                    backgroundColor: notification.read ? 'transparent' : alpha(theme.palette.primary.main, 0.05)
                  }}
                >
                  <ListItemIcon>
                    {getNotificationIcon(notification.level || 'info')}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Circle sx={{ fontSize: 8, color: 'primary.main' }} />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {notification.message}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            label={notification.category || 'General'}
                            size="small"
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {formatTime(notification.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))
            )}
          </List>

          {notifications.length > 0 && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={clearNotifications}
              >
                Limpiar todas las notificaciones
              </Button>
            </Box>
          )}
        </Box>
      </Popover>
    </>
  );
};

const getNotificationColor = (level) => {
  switch (level) {
    case 'error': return '#f44336';
    case 'warning': return '#ff9800';
    case 'success': return '#4caf50';
    default: return '#2196f3';
  }
};

export default NotificationCenter;