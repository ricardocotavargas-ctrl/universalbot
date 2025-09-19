// frontend/admin-panel/src/components/auth/RoleBasedRoute.js
import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { hasPermission } from '../../../utils/roles';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Warning } from '@mui/icons-material';

const RoleBasedRoute = ({ 
  children, 
  requiredPermission, 
  fallbackComponent 
}) => {
  const { user, permissions } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const hasRequiredPermission = hasPermission(permissions, requiredPermission);

  if (!hasRequiredPermission) {
    if (fallbackComponent) {
      return fallbackComponent;
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
          No tienes permisos suficientes para acceder a esta sección.
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

export default RoleBasedRoute;