// frontend/admin-panel/src/components/auth/RoleRoute.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Ruta corregida: ../../contexts/
import { hasPermission } from '../../utils/roles'; // Ruta corregida: ../../utils/
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Warning } from '@mui/icons-material';

const RoleRoute = ({ 
  children, 
  requiredPermission, 
  requiredRole,
  fallbackComponent,
  showWarning = true
}) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  let hasAccess = false;

  if (requiredRole) {
    hasAccess = user?.role === requiredRole;
  } else if (requiredPermission) {
    hasAccess = hasPermission(user, requiredPermission);
  } else {
    hasAccess = true;
  }

  if (!hasAccess) {
    if (fallbackComponent) {
      return fallbackComponent;
    }

    if (!showWarning) {
      navigate('/dashboard');
      return null;
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          p: 3
        }}
      >
        <Warning sx={{ fontSize: 64, color: 'warning.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Acceso Restringido
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          No tienes los permisos necesarios para acceder a esta sección.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={{ borderRadius: 2 }}
        >
          Volver al Dashboard
        </Button>
      </Box>
    );
  }

  return children;
};

export default RoleRoute;