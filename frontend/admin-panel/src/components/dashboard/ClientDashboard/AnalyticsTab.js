import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Analytics } from '@mui/icons-material';

const AnalyticsTab = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      📈 Analytics Avanzados
    </Typography>
    <Paper sx={{ p: 3 }}>
      <Typography>Métricas y estadísticas de tu negocio</Typography>
    </Paper>
  </Box>
);

export default AnalyticsTab;