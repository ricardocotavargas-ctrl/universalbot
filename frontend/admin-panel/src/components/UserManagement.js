import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const UserManagement = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Usuarios
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>
          Página de gestión de usuarios - En desarrollo
        </Typography>
      </Paper>
    </Container>
  );
};

export default UserManagement;