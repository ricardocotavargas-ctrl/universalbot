import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const BusinessDetail = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Detalle de Negocio
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>
          Página de detalle de negocio - En desarrollo
        </Typography>
      </Paper>
    </Container>
  );
};

export default BusinessDetail;