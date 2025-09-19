import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Dashboard,
  Business,
  People,
  Analytics,
  Chat,
  TrendingUp,
  Report,
  SmartToy,
  Settings
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Si el usuario está autenticado, redirigir al dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    { icon: <Business />, title: 'Gestión de Empresas', description: 'Administra múltiples empresas desde un solo panel' },
    { icon: <People />, title: 'Control de Clientes', description: 'Gestiona toda tu base de clientes de forma centralizada' },
    { icon: <Analytics />, title: 'Servicios Integrados', description: 'Ofrece servicios automatizados con IA' },
    { icon: <Chat />, title: 'Interacciones Inteligentes', description: 'Chatbots y comunicación automatizada' },
    { icon: <TrendingUp />, title: 'Sistema de Ventas', description: 'Control y seguimiento de oportunidades comerciales' },
    { icon: <Report />, title: 'Reportes Avanzados', description: 'Analytics y reportes en tiempo real' },
    { icon: <SmartToy />, title: 'Flujos de IA', description: 'Automatización inteligente de procesos' },
    { icon: <Settings />, title: 'Configuración Total', description: 'Personaliza toda la plataforma a tu medida' }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        py: 8
      }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h1" component="h1" fontWeight={800} sx={{ mb: 2 }}>
            Universal Bot Platform
          </Typography>
          <Typography variant="h4" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            La plataforma todo-en-uno para automatizar y escalar tu negocio con inteligencia artificial
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/login')}
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              Iniciar Sesión
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/register')}
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              Crear Cuenta
            </Button>
          </Box>
        </Box>

        {/* Features Grid */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" textAlign="center" fontWeight={700} sx={{ mb: 4 }}>
            Características Principales
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Paper sx={{ 
                  p: 3, 
                  height: '100%', 
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}>
                  <Box sx={{ 
                    fontSize: 40, 
                    color: 'primary.main', 
                    mb: 2 
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Paper sx={{ 
          p: 6, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          color: 'white'
        }}>
          <Typography variant="h3" component="h3" fontWeight={700} sx={{ mb: 2 }}>
            ¿Listo para comenzar?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Únete a miles de empresas que ya usan Universal Bot Platform
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/register')}
            sx={{ 
              px: 6, 
              py: 1.5, 
              fontSize: '1.1rem',
              background: 'white',
              color: 'primary.main',
              '&:hover': {
                background: '#f8fafc'
              }
            }}
          >
            Comenzar Ahora
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;