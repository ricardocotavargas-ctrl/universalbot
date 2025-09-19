import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button
} from '@mui/material';
import { Add } from '@mui/icons-material';

const CustomerManager = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          👥 Gestión de Clientes
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          Nuevo Cliente
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Componente CustomerManager en desarrollo
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default CustomerManager;