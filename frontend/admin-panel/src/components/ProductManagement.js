import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const ProductManagement = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Productos
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>
          Página de gestión de productos - En desarrollo
        </Typography>
      </Paper>
    </Container>
  );
};

export default ProductManagement;