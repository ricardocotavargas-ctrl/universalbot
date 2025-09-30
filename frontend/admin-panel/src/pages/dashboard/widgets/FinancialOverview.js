import React from 'react';
import {
  Box,
  Typography,
  Grid,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';

const FinancialOverview = ({ isMobile }) => {
  const data = {
    revenue: 23450,
    expenses: 12500,
    profit: 10950
  };

  return (
    <Box>
      <Grid container spacing={isMobile ? 1 : 2}>
        <Grid item xs={4}>
          <Box sx={{ textAlign: 'center' }}>
            <TrendingUp sx={{ color: 'success.main', mb: 1 }} />
            <Typography variant={isMobile ? "body2" : "h6"} fontWeight={600} color="success.main">
              ${(data.revenue / 1000).toFixed(0)}K
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Ingresos
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={4}>
          <Box sx={{ textAlign: 'center' }}>
            <TrendingDown sx={{ color: 'error.main', mb: 1 }} />
            <Typography variant={isMobile ? "body2" : "h6"} fontWeight={600} color="error.main">
              ${(data.expenses / 1000).toFixed(0)}K
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Gastos
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant={isMobile ? "body2" : "h6"} fontWeight={600} color="primary.main">
              ${(data.profit / 1000).toFixed(0)}K
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Utilidad
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Progreso mensual (47%)
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={47} 
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Box>
    </Box>
  );
};

export default FinancialOverview;
