import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

const RequireAuth = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading, checkAuth } = useAuth();
  const location = useLocation();

  // Verificar autenticación al montar el componente
  React.useEffect(() => {
    if (!isAuthenticated && !loading) {
      checkAuth();
    }
  }, [isAuthenticated, loading, checkAuth]);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Verificando autenticación...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Redirigir al login pero guardar la ubicación a la que querían ir
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar roles si se requiere un rol específico
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Typography variant="h6" color="error">
          No tienes permisos para acceder a esta página.
        </Typography>
      </Box>
    );
  }

  return children;
};

export default RequireAuth;
