import React from 'react';
import {
  Paper,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MonthlyPerformance = () => {
  const theme = useTheme();

  // Datos de ejemplo para el gráfico
  const performanceData = [
    { month: 'Ene', revenue: 18000, interactions: 1200 },
    { month: 'Feb', revenue: 21000, interactions: 1500 },
    { month: 'Mar', revenue: 19000, interactions: 1300 },
    { month: 'Abr', revenue: 23000, interactions: 1800 },
    { month: 'May', revenue: 25000, interactions: 2000 },
    { month: 'Jun', revenue: 28000, interactions: 2200 },
  ];

  const maxRevenue = Math.max(...performanceData.map(d => d.revenue));
  const maxInteractions = Math.max(...performanceData.map(d => d.interactions));

  return (
    <Paper sx={{ 
      p: 3, 
      borderRadius: '20px', 
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      height: '100%',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} sx={{ color: 'white' }}>
          📈 Rendimiento Mensual
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
          Últimos 6 meses
        </Typography>
      </Box>

      {/* Gráfico de barras simplificado */}
      <Box sx={{ height: 300, position: 'relative' }}>
        {/* Eje Y */}
        <Box sx={{ 
          position: 'absolute', 
          left: 0, 
          top: 0, 
          bottom: 0, 
          width: 40,
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          pr: 1
        }}>
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <Typography key={ratio} variant="caption" sx={{ color: '#64748b', textAlign: 'right' }}>
              ${(maxRevenue * ratio / 1000).toFixed(0)}K
            </Typography>
          ))}
        </Box>

        {/* Barras del gráfico */}
        <Box sx={{ 
          ml: 5, 
          height: '100%', 
          display: 'flex', 
          alignItems: 'end', 
          gap: 2,
          justifyContent: 'space-around'
        }}>
          {performanceData.map((data, index) => (
            <motion.div
              key={data.month}
              initial={{ height: 0 }}
              animate={{ height: `${(data.revenue / maxRevenue) * 80}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                height: '100%'
              }}
            >
              <Box
                sx={{
                  width: 30,
                  background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)',
                  borderRadius: '6px 6px 0 0',
                  position: 'relative',
                  '&::after': {
                    content: `"$${(data.revenue / 1000).toFixed(0)}K"`,
                    position: 'absolute',
                    top: -25,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '10px',
                    color: '#cbd5e1',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }
                }}
                style={{ height: '100%' }}
              />
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                {data.month}
              </Typography>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Leyenda */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 4, 
        mt: 3,
        pt: 2,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', borderRadius: 2 }} />
          <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
            Ingresos
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', borderRadius: 2 }} />
          <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
            Interacciones
          </Typography>
        </Box>
      </Box>

      {/* Estadísticas rápidas */}
      <Box sx={{ 
        mt: 3, 
        p: 2.5, 
        borderRadius: '14px', 
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" fontWeight={600} sx={{ color: '#cbd5e1' }}>
              Crecimiento mensual
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Comparado con el mes anterior
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 700 }}>
              +15.2%
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              <TrendingUp sx={{ fontSize: 14, verticalAlign: 'text-bottom' }} /> Crecimiento
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default MonthlyPerformance;