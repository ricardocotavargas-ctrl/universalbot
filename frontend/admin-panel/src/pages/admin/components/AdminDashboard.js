import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          👑 Panel de Administrador
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Aquí podrás gestionar todos los clientes, planes y configuraciones del sistema.
        </Typography>
        
        <Box sx={{ mt: 4, p: 4, bgcolor: 'grey.100', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            🚧 Panel en construcción - Próximamente...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gestión de clientes, asignación de planes, analytics avanzado, etc.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard;