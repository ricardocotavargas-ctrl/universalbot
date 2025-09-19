// frontend/admin-panel/src/components/notifications/ToastNotifier.js
import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import { useWebSocket } from '../../contexts/WebSocketContext';

const ToastNotifier = () => {
  const [open, setOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const { notifications } = useWebSocket();

  useEffect(() => {
    const handleShowNotification = (event) => {
      setCurrentNotification(event.detail);
      setOpen(true);
    };

    window.addEventListener('showNotification', handleShowNotification);

    return () => {
      window.removeEventListener('showNotification', handleShowNotification);
    };
  }, []);

  useEffect(() => {
    // Mostrar la última notificación no leída
    const unread = notifications.filter(n => !n.read);
    if (unread.length > 0 && document.visibilityState === 'visible') {
      const latest = unread[0];
      setCurrentNotification({
        title: latest.title,
        message: latest.message,
        type: latest.level || 'info'
      });
      setOpen(true);
    }
  }, [notifications]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (!currentNotification) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={currentNotification.type}
        sx={{
          width: '100%',
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <Box>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            {currentNotification.title}
          </Typography>
          <Typography variant="body2">
            {currentNotification.message}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default ToastNotifier;