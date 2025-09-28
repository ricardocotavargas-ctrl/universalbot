// frontend/admin-panel/src/components/layout/Layout.js
import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Notifications,
  Settings,
  Logout,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NotificationCenter from '../Notifications/NotificationCenter';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          background: '#ffffff', 
          color: '#1f2937', 
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          width: '100%'
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          px: { xs: 2, md: 3 }, 
          py: 1.5,
          minHeight: '64px !important',
          width: '100%'
        }}>
          {/* Left side - Menu button and Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={toggleSidebar}
              sx={{ 
                color: '#4b5563',
                '&:hover': { 
                  backgroundColor: '#f3f4f6',
                  color: '#1f2937'
                }
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer'
              }}
              onClick={() => navigate('/dashboard')}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  borderRadius: '8px',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}
              >
                UB
              </Box>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                fontSize: '1.1rem',
                color: '#1f2937',
                display: { xs: 'none', sm: 'block' }
              }}>
                Universal Bot
              </Typography>
            </Box>
          </Box>

          {/* Right side - User menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationCenter />
            
            <IconButton 
              sx={{ 
                color: '#4b5563',
                '&:hover': { 
                  backgroundColor: '#f3f4f6',
                  color: '#1f2937'
                }
              }} 
              onClick={() => navigate('/settings')}
            >
              <Settings />
            </IconButton>

            <IconButton
              onClick={handleMenuOpen}
              sx={{
                color: '#4b5563',
                '&:hover': { 
                  backgroundColor: '#f3f4f6',
                  color: '#1f2937'
                }
              }}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  backgroundColor: '#6366f1',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}
              >
                {user?.first_name?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 180,
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb'
                }
              }}
            >
              <MenuItem 
                onClick={() => { navigate('/dashboard'); handleMenuClose(); }}
                sx={{ fontSize: '0.9rem', py: 1 }}
              >
                Dashboard
              </MenuItem>
              <MenuItem 
                onClick={() => { navigate('/settings'); handleMenuClose(); }}
                sx={{ fontSize: '0.9rem', py: 1 }}
              >
                Configuración
              </MenuItem>
              <MenuItem 
                onClick={handleLogout} 
                sx={{ 
                  color: '#ef4444',
                  fontSize: '0.9rem',
                  py: 1,
                  '&:hover': { backgroundColor: '#fef2f2' }
                }}
              >
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: sidebarOpen ? 280 : 0,
            flexShrink: 0,
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflowX: 'hidden',
            borderRight: sidebarOpen ? '1px solid #e5e7eb' : 'none',
            background: '#ffffff',
            boxShadow: sidebarOpen ? '2px 0 8px rgba(0, 0, 0, 0.05)' : 'none'
          }}
        >
          {sidebarOpen && <Sidebar />}
        </Box>

        {/* Page Content */}
        <Box sx={{ 
          flex: 1,
          p: { xs: 2, md: 3 },
          minHeight: 'calc(100vh - 64px)',
          background: '#f9fafb',
          width: '100%'
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
