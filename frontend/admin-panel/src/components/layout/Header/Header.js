// frontend/admin-panel/src/components/layout/Header.js
import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button, IconButton,
  Badge, Menu, MenuItem, Avatar, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions, useTheme,
  alpha, InputBase, Tooltip
} from '@mui/material';
import {
  Logout, Notifications, Settings, Dashboard as DashboardIcon,
  SmartToy, Business, People, Analytics, Inventory,
  AttachMoney, Assignment, Search, Menu as MenuIcon,
  LightMode, DarkMode, Apps, AccountCircle
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationCenter from '../../Notifications/NotificationCenter';

const Header = ({
  activeBusiness,
  businessConfig,
  activeModule,
  onModuleChange,
  onRefresh,
  onSettingsOpen,
  onServiceManager,
  onBotActivator,
  notifications = [],
  botActive,
  onBotToggle,
  user,
  businesses = [],
  onBusinessChange
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const { logout } = useAuth();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleLogoutClick = () => setLogoutConfirmOpen(true);

  const handleLogout = async () => {
    try {
      const result = logout();
      if (result.success) {
        navigate('/login', { replace: true });
      } else {
        localStorage.clear();
        navigate('/login', { replace: true });
      }
    } catch (error) {
      localStorage.clear();
      navigate('/login', { replace: true });
    }
    setLogoutConfirmOpen(false);
  };

  const handlePlanManagement = () => navigate('/admin/plans');
  const handlePlanAssignment = () => navigate('/admin/client-plans');
  const handleDashboard = () => navigate('/dashboard');

  const isActive = (path) => location.pathname === path;

  const modules = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { id: 'messages', label: 'Mensajes', icon: <SmartToy />, path: '/messages' },
    { id: 'customers', label: 'Clientes', icon: <People />, path: '/customers' },
    { id: 'analytics', label: 'Analytics', icon: <Analytics />, path: '/analytics' }
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(20px)',
          background: alpha(theme.palette.background.paper, 0.8)
        }}
      >
        <Toolbar sx={{ minHeight: '70px!important', px: '24px!important' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mr: 4,
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit'
              }}
              onClick={handleDashboard}
            >
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}>
                <Business sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography variant="h6" sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                UniversalBot
              </Typography>
            </Box>

            {/* Navegación Principal */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {modules.map((module) => (
                <Button
                  key={module.id}
                  startIcon={module.icon}
                  onClick={() => navigate(module.path)}
                  sx={{
                    px: 2,
                    borderRadius: 2,
                    fontWeight: 600,
                    color: isActive(module.path) ? 'primary.main' : 'text.secondary',
                    bgcolor: isActive(module.path) ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    '&:hover': {
                      bgcolor: isActive(module.path) ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.action.hover, 0.1)
                    }
                  }}
                >
                  {module.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Acciones */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Botones de Super Admin */}
            {user?.role === 'superadmin' && (
              <>
                <Tooltip title="Gestión de Planes">
                  <IconButton
                    onClick={handlePlanManagement}
                    sx={{
                      bgcolor: isActive('/admin/plans') ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      color: isActive('/admin/plans') ? 'primary.main' : 'text.secondary'
                    }}
                  >
                    <AttachMoney />
                  </IconButton>
                </Tooltip>
                
                <IconButton sx={{ color: 'inherit' }}>
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>

                // Con:
                <NotificationCenter />
                
                <Tooltip title="Asignar Planes">
                  <IconButton
                    onClick={handlePlanAssignment}
                    sx={{
                      bgcolor: isActive('/admin/client-plans') ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      color: isActive('/admin/client-plans') ? 'primary.main' : 'text.secondary'
                    }}
                  >
                    <Assignment />
                  </IconButton>
                </Tooltip>
              </>
            )}

            {/* Estado del Bot */}
            <Chip 
              icon={botActive ? <SmartToy /> : <SmartToy />}
              label={botActive ? "ACTIVO" : "INACTIVO"} 
              color={botActive ? "success" : "error"}
              variant="filled"
              sx={{ 
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            />

            {/* Búsqueda */}
            <Tooltip title="Buscar">
              <IconButton onClick={() => setSearchOpen(!searchOpen)}>
                <Search />
              </IconButton>
            </Tooltip>

            {/* Notificaciones */}
            <Tooltip title="Notificaciones">
              <IconButton onClick={(e) => setNotifAnchorEl(e.currentTarget)}>
                <Badge badgeContent={unreadNotifications} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Perfil */}
            <Tooltip title="Mi cuenta">
              <IconButton 
                onClick={(e) => setProfileAnchorEl(e.currentTarget)}
                sx={{ ml: 1 }}
              >
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                  {user?.email?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>

        {/* Barra de búsqueda desplegable */}
        {searchOpen && (
          <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <InputBase
              fullWidth
              placeholder="Buscar clientes, mensajes, reportes..."
              startAdornment={<Search sx={{ color: 'text.secondary', mr: 1 }} />}
              sx={{
                bgcolor: alpha(theme.palette.action.hover, 0.1),
                borderRadius: 3,
                px: 2,
                py: 1,
                '&:focus': {
                  bgcolor: alpha(theme.palette.action.hover, 0.2)
                }
              }}
            />
          </Box>
        )}
      </AppBar>

      {/* Espacio para el header fijo */}
      <Toolbar sx={{ minHeight: '70px!important' }} />

      {/* Menú de Notificaciones */}
      <Menu
        anchorEl={notifAnchorEl}
        open={Boolean(notifAnchorEl)}
        onClose={() => setNotifAnchorEl(null)}
      >
        <MenuItem onClick={() => setNotifAnchorEl(null)}>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Notifications sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              No hay notificaciones nuevas
            </Typography>
          </Box>
        </MenuItem>
      </Menu>

      {/* Menú de Perfil */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={() => setProfileAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => setProfileAnchorEl(null)}>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {user?.email}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.role === 'superadmin' ? 'Super Administrador' : 'Administrador'}
            </Typography>
          </Box>
        </MenuItem>
        
        <MenuItem onClick={() => { setProfileAnchorEl(null); onSettingsOpen(); }}>
          <Settings sx={{ mr: 2, fontSize: 20 }} />
          Configuración
        </MenuItem>

        {user?.role === 'superadmin' && (
          <>
            <MenuItem onClick={() => { setProfileAnchorEl(null); handlePlanManagement(); }}>
              <AttachMoney sx={{ mr: 2, fontSize: 20 }} />
              Gestión de Planes
            </MenuItem>
            <MenuItem onClick={() => { setProfileAnchorEl(null); handlePlanAssignment(); }}>
              <Assignment sx={{ mr: 2, fontSize: 20 }} />
              Asignar Planes
            </MenuItem>
          </>
        )}

        <MenuItem onClick={handleLogoutClick}>
          <Logout sx={{ mr: 2, fontSize: 20 }} />
          Cerrar Sesión
        </MenuItem>
      </Menu>

      {/* Dialog de Confirmación de Logout */}
      <Dialog
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600, textAlign: 'center' }}>
          🚪 Cerrar Sesión
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            ¿Estás seguro de que quieres cerrar sesión?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
          <Button 
            onClick={() => setLogoutConfirmOpen(false)}
            variant="outlined"
            fullWidth
            sx={{ mr: 1 }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleLogout}
            variant="contained"
            fullWidth
            sx={{ ml: 1 }}
          >
            Sí, Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;