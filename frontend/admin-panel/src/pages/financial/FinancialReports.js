import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import {
  TrendingUp,
  Analytics,
  AccountBalance,
  PieChart
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';

const FinancialReports = () => {
  const theme = useTheme();

  const financialData = {
    revenue: 125000,
    expenses: 89000,
    profit: 36000,
    growth: 15.7
  };

  const reports = [
    {
      title: 'Estado de Resultados',
      description: 'Ingresos, costos y gastos del período',
      icon: <TrendingUp />,
      path: '/financial/profit-loss'
    },
    {
      title: 'Balance General',
      description: 'Activos, pasivos y patrimonio',
      icon: <AccountBalance />,
      path: '/financial/balance-sheet'
    },
    {
      title: 'Flujo de Efectivo',
      description: 'Entradas y salidas de efectivo',
      icon: <Analytics />,
      path: '/financial/cash-flow'
    },
    {
      title: 'Análisis de Rentabilidad',
      description: 'Márgenes y ratios financieros',
      icon: <PieChart />,
      path: '/financial/profitability'
    }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Analytics sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>
                Reportes Financieros
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Análisis completo del desempeño financiero
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Resumen Financiero */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  ${financialData.revenue.toLocaleString('es-ES')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ingresos Totales
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <AccountBalance sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  ${financialData.expenses.toLocaleString('es-ES')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gastos Totales
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <Analytics sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  ${financialData.profit.toLocaleString('es-ES')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Utilidad Neta
                </Typography>
              </Box>
            </UBCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UBCard>
              <Box sx={{ textAlign: 'center' }}>
                <PieChart sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700}>
                  +{financialData.growth}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Crecimiento Anual
                </Typography>
              </Box>
            </UBCard>
          </Grid>
        </Grid>

        {/* Reportes Disponibles */}
        <UBCard title="Reportes Disponibles">
          <Grid container spacing={3}>
            {reports.map((report, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8]
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ 
                      color: 'primary.main', 
                      fontSize: 40,
                      mb: 2
                    }}>
                      {report.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {report.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {report.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </UBCard>
      </Box>
    </Container>
  );
};

export default FinancialReports;