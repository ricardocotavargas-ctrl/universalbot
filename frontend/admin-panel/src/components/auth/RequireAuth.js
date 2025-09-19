// frontend/admin-panel/src/components/auth/RequireAuth.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // ✅ Usa isAuthenticated
  const location = useLocation();

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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
