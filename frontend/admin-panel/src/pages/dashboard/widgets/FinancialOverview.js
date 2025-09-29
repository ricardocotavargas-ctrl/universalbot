import React from 'react';
import {
  Box,
  Typography,
  Grid,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  AttachMoney,
  TrendingUp,
  AccountBalance,
  Savings
} from '@mui/icons-material';

const FinancialOverview = () => {
  const financialData = {
    revenue: { current: 23450, target: 50000, progress: 47 },
    expenses: { current: 12500, budget: 15000, progress: 83 },
    profit: { current: 10950, margin: 46.7 },
    cashFlow: { incoming: 28450, outgoing: 17500, net: 10950 }
  };

  const MetricCard = ({ title, value, subtitle, progress, icon, color = 'primary' }) => (
    <Box sx={{ 
      p: 2, 
      border: '2px solid',
      borderColor: `${color}.light`,
      borderRadius: 2,
      background: `linear-gradient(135deg, ${color}.light 0%, ${color}.lighter 100%)`,
      height: '100%'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700} color={`${color}.dark`}>
            ${value.toLocaleString('es-ES')}
          </Typography>
        </Box>
        <Box sx={{ color: `${color}.main` }}>
          {icon}
        </Box>
      </Box>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {subtitle}
        </Typography>
      )}
      {progress !== undefined && (
        <Box sx={{ mt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={color}
            sx={{ height: 6, borderRadius: 3 }}
          />
          <Typography variant="caption" color="text.secondary">
            {progress}% completado
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Resumen Financiero del Mes
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <MetricCard
            title="Ingresos"
            value={financialData.revenue.current}
            subtitle={`Objetivo: $${financialData.revenue.target.toLocaleString('es-ES')}`}
            progress={financialData.revenue.progress}
            icon={<AttachMoney />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MetricCard
            title="Gastos"
            value={financialData.expenses.current}
            subtitle={`Presupuesto: $${financialData.expenses.budget.toLocaleString('es-ES')}`}
            progress={financialData.expenses.progress}
            icon={<AccountBalance />}
            color="warning"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ 
            p: 2, 
            border: '2px solid',
            borderColor: 'success.light',
            borderRadius: 2,
            background: 'linear-gradient(135deg, success.light 0%, success.lighter 100%)',
            textAlign: 'center'
          }}>
            <TrendingUp sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
            <Typography variant="h5" fontWeight={700} color="success.dark">
              ${financialData.profit.current.toLocaleString('es-ES')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Utilidad Neta
            </Typography>
            <Chip 
              label={`${financialData.profit.margin}% margen`} 
              color="success" 
              size="small" 
              sx={{ mt: 1 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ 
            p: 2, 
            border: '2px solid',
            borderColor: 'info.light',
            borderRadius: 2,
            background: 'linear-gradient(135deg, info.light 0%, info.lighter 100%)',
            textAlign: 'center'
          }}>
            <Savings sx={{ fontSize: 32, color: 'info.main', mb: 1 }} />
            <Typography variant="h5" fontWeight={700} color="info.dark">
              ${financialData.cashFlow.net.toLocaleString('es-ES')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Flujo Neto
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
              <Chip label={`Entra: $${financialData.cashFlow.incoming.toLocaleString('es-ES')}`} size="small" />
              <Chip label={`Sale: $${financialData.cashFlow.outgoing.toLocaleString('es-ES')}`} size="small" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancialOverview;
