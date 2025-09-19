// frontend/admin-panel/src/components/dashboard/ClientDashboard/PremiumClientDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Grid, Card, CardContent, Typography, Box,
  Button, Chip, LinearProgress, Alert, Avatar,
  useTheme, alpha, IconButton, Fab, Zoom
} from '@mui/material';
import {
  TrendingUp, Message, People, Assignment,
  Schedule, Analytics, Receipt, Support,
  WhatsApp, Facebook, Instagram, Email,
  Notifications, Campaign, SmartToy, Rocket,
  AutoGraph, Psychology, ConnectWithoutContact
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCacheQuery } from '../../../hooks/useCacheQuery';

const PremiumClientDashboard = ({ business, user }) => {
  const theme = useTheme();
  const [activeMetrics, setActiveMetrics] = useState([]);
  
  const { data: metrics, loading, error, refetch } = useCacheQuery(
    `/api/business/${business.id}/metrics`,
    { 
      expirationMinutes: 2,
      autoRefresh: true 
    }
  );

  const { data: kpi } = useCacheQuery(
    `/api/business/${business.id}/kpi`,
    { expirationMinutes: 5 }
  );

  useEffect(() => {
    // Animación para métricas
    const interval = setInterval(() => {
      setActiveMetrics(prev => {
        if (prev.length >= 3) return [];
        return [...prev, Date.now()];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const AnimatedMetricCard = ({ icon, value, label, trend, color = 'primary', index }) => (
    <Zoom in={activeMetrics.includes(index)} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
      <Card sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.95)} 0%, ${alpha(theme.palette[color].dark, 0.95)} 100%)`,
        color: 'white',
        height: '100%',
        transition: 'all 0.3s ease',
        transform: 'translateY(20px)',
        opacity: 0,
        animation: 'fadeInUp 0.6s ease forwards',
        '&:hover': { 
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${alpha(theme.palette[color].main, 0.3)}`
        }
      }}>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <Box sx={{ 
            fontSize: 48, 
            mb: 2,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
          }}>
            {icon}
          </Box>
          <Typography variant="h2" gutterBottom sx={{ 
            fontWeight: 'bold',
            textShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}>
            {value}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ 
            opacity: 0.9,
            mb: 2
          }}>
            {label}
          </Typography>
          {trend && (
            <Chip
              label={trend}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.3)',
                color: 'white',
                fontWeight: 'bold',
                backdropFilter: 'blur(10px)'
              }}
            />
          )}
        </CardContent>
      </Card>
    </Zoom>
  );

  const QuickActionButton = ({ icon, label, color, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Fab
        variant="extended"
        sx={{
          background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
          color: 'white',
          px: 4,
          py: 2,
          fontWeight: 'bold',
          boxShadow: `0 8px 24px ${alpha(color, 0.3)}`,
          '&:hover': {
            boxShadow: `0 12px 32px ${alpha(color, 0.4)}`
          }
        }}
        onClick={onClick}
      >
        <Box sx={{ mr: 1, fontSize: 24 }}>{icon}</Box>
        {label}
      </Fab>
    </motion.div>
  );

  if (loading) return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '50vh' 
    }}>
      <Rocket sx={{ fontSize: 64, color: 'primary.main', mr: 2 }} />
      <Typography variant="h4">Cargando dashboard premium...</Typography>
    </Box>
  );

  if (error) return (
    <Alert severity="error" sx={{ m: 3 }}>
      Error cargando datos: {error}
      <Button onClick={refetch} sx={{ ml: 2 }}>
        Reintentar
      </Button>
    </Alert>
  );

  return (
    <Box sx={{ p: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
      {/* Header con Bienvenida Animada */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h1" gutterBottom sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}>
            ¡Bienvenido, {business?.name}!
          </Typography>
          <Typography variant="h5" color="textSecondary" sx={{ mb: 4 }}>
            Tu centro de control inteligente para crecimiento exponencial
          </Typography>
        </Box>
      </motion.div>

      {/* Metrics Grid con Animación */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {[
          { icon: <Message />, value: metrics?.messages_today || 0, label: "Mensajes Hoy", trend: "+12%", color: "primary" },
          { icon: <People />, value: metrics?.active_customers || 0, label: "Clientes Activos", trend: "+5%", color: "secondary" },
          { icon: <Assignment />, value: metrics?.conversions || 0, label: "Conversiones", trend: "+18%", color: "success" },
          { icon: <TrendingUp />, value: `$${metrics?.revenue || 0}`, label: "Ingresos", trend: `+${metrics?.growth_rate || 0}%`, color: "warning" }
        ].map((metric, index) => (
          <Grid item xs={12} md={3} key={index}>
            <AnimatedMetricCard {...metric} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions con Animación */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Typography variant="h3" gutterBottom sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold',
          mb: 4,
          color: 'primary.main'
        }}>
          Acciones Rápidas
        </Typography>
        
        <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
          {[
            { icon: <Analytics />, label: "Reportes IA", color: "#ff6b6b" },
            { icon: <Schedule />, label: "Programar Mensajes", color: "#4ecdc4" },
            { icon: <AutoGraph />, label: "Analytics Avanzado", color: "#45b7d1" },
            { icon: <ConnectWithoutContact />, label: "Integraciones", color: "#f9ca24" },
            { icon: <Psychology />, label: "Asistente IA", color: "#6c5ce7" }
          ].map((action, index) => (
            <Grid item key={index}>
              <QuickActionButton {...action} />
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Sección de Inteligencia Artificial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <Card sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 4,
          mb: 4
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SmartToy sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Asistente IA Activado
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            Tu asistente de inteligencia artificial está aprendiendo de tus interacciones y optimizando tus resultados
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 1, borderRadius: 1, mr: 2 }}>
                  <TrendingUp />
                </Box>
                <Box>
                  <Typography variant="h6">+27%</Typography>
                  <Typography variant="body2">Eficiencia</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 1, borderRadius: 1, mr: 2 }}>
                  <People />
                </Box>
                <Box>
                  <Typography variant="h6">+15%</Typography>
                  <Typography variant="body2">Satisfacción clientes</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 1, borderRadius: 1, mr: 2 }}>
                  <Assignment />
                </Box>
                <Box>
                  <Typography variant="h6">+32%</Typography>
                  <Typography variant="body2">Conversiones</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </motion.div>

      {/* Predictive Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <Typography variant="h3" gutterBottom sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold',
          mb: 4,
          color: 'secondary.main'
        }}>
          Analytics Predictivo
        </Typography>
        
        <Grid container spacing={3}>
          {[
            { title: 'Próxima Semana', value: '+18%', subtitle: 'Crecimiento esperado' },
            { title: 'Tendencia', value: 'Positiva', subtitle: 'Mercado en alza' },
            { title: 'Recomendación', value: 'Expandir', subtitle: 'Oportunidad detectada' }
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ p: 3, textAlign: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="h3" color="primary" gutterBottom>
                  {item.value}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {item.subtitle}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default PremiumClientDashboard;