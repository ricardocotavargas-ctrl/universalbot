import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Chip,
  IconButton, Badge, Menu, MenuItem, Avatar, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
  Logout, Notifications, Dashboard as DashboardIcon,
  ChatBubble, People, Analytics, Settings, Business
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // ✅ Para redirección

const ClientHeader = ({ 
  activeModule, 
  onModuleChange, 
  user,
  notifications = [],
  business
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  
  const { logout } = useAuth(); // ✅ Usar el contexto de autenticación
  const navigate = useNavigate();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogout = async () => {
    try {
      const result = logout(); // ✅ Usar la función del contexto
      if (result.success) {
        navigate('/login', { replace: true });
      } else {
        // Fallback: limpieza manual
        localStorage.clear();
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Error en logout:', error);
      localStorage.clear();
      navigate('/login', { replace: true });
    }
    setLogoutConfirmOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutConfirmOpen(true);
  };

  const modules = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'messages', label: 'Mensajes', icon: <ChatBubble /> },
    { id: 'customers', label: 'Clientes', icon: <People /> },
    { id: 'analytics', label: 'Analytics', icon: <Analytics /> },
    { id: 'settings', label: 'Configuración', icon: <Settings /> }
  ];

  const handleNotificationClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotifAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" elevation={2} sx={{ 
        bgcolor: 'primary.main',
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #303f9f 100%)'
      }}>
        <Toolbar>
          {/* Logo y Nombre */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Business sx={{ mr: 2, fontSize: 32 }} />
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {business?.name || 'Mi Empresa'}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {business?.industry || 'Panel de Control'}
              </Typography>
            </Box>
          </Box>

          {/* Navegación */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 2 }}>
            {modules.map((module) => (
              <Button
                key={module.id}
                color="inherit"
                startIcon={module.icon}
                onClick={() => onModuleChange(module.id)}
                sx={{
                  minWidth: 'auto',
                  px: 2,
                  backgroundColor: activeModule === module.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {module.label}
              </Button>
            ))}
          </Box>

          {/* Notificaciones */}
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={unreadNotifications} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notifAnchorEl}
            open={Boolean(notifAnchorEl)}
            onClose={handleNotificationClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 300,
                maxHeight: 400
              }
            }}
          >
            {notifications.length === 0 ? (
              <MenuItem onClick={handleNotificationClose}>
                <Typography variant="body2" color="textSecondary">
                  No hay notificaciones
                </Typography>
              </MenuItem>
            ) : (
              notifications.slice(0, 5).map((notification, index) => (
                <MenuItem key={index} onClick={handleNotificationClose}>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body2" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {notification.time}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            )}
          </Menu>

          {/* Usuario */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                bgcolor: 'secondary.main',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              {user?.first_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
            </Avatar>
            
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {user?.role === 'admin' ? 'Administrador' : 'Cliente'}
              </Typography>
            </Box>

            <Button 
              color="inherit" 
              startIcon={<Logout />}
              onClick={handleLogoutClick}
              sx={{ 
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Salir
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dialog de Confirmación de Logout */}
      <Dialog
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          🚪 Cerrar Sesión
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" textAlign="center" color="textSecondary">
            ¿Estás seguro de que quieres cerrar sesión?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            onClick={() => setLogoutConfirmOpen(false)}
            variant="outlined"
            sx={{ minWidth: 100 }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleLogout}
            variant="contained"
            color="primary"
            sx={{ minWidth: 100 }}
          >
            Sí, Salir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientHeader;