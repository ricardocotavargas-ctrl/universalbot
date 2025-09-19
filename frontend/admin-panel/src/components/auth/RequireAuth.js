import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, Box, Typography, Button } from '@mui/material';
import { AdminPanelSettings, Lock } from '@mui/icons-material';

const RequireAuth = ({ children, permission, businessId }) => {
  const { user, hasPermission, canViewBusiness } = useAuth();

  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Lock sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h6" color="error" gutterBottom>
          Acceso no autorizado
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Debes iniciar sesión para acceder a esta sección.
        </Typography>
      </Box>
    );
  }

  if (permission && !hasPermission(permission)) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <AdminPanelSettings sx={{ fontSize: 64, color: 'warning.main', mb: 2 }} />
        <Typography variant="h6" color="warning.main" gutterBottom>
          Permisos insuficientes
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          No tienes permisos para acceder a esta sección.
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary">
          Rol actual: {user.role}
        </Typography>
      </Box>
    );
  }

  if (businessId && !canViewBusiness(businessId)) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Lock sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h6" color="error" gutterBottom>
          Acceso restringido
        </Typography>
        <Typography variant="body2" color="textSecondary">
          No tienes acceso a esta empresa.
        </Typography>
      </Box>
    );
  }

  return children;
};

export default RequireAuth;