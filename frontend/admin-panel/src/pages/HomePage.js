import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Button, Paper, Grid, 
  Card, CardContent, Chip, Avatar, Stack, Fade,
  useTheme, useMediaQuery, alpha
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  RocketLaunch,
  Psychology,
  AutoGraph,
  IntegrationInstructions,
  Security,
  PlayArrow,
  Twitter,
  LinkedIn,
  GitHub
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';

// Animaciones personalizadas
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loaded, setLoaded] = useState(false);

  // Si el usuario está autenticado, redirigir al dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    // Simular carga de recursos
    setTimeout(() => setLoaded(true), 300);
  }, [isAuthenticated, navigate]);

  // Datos para las características
  const features = [
    { 
      icon: <Psychology sx={{ fontSize: 40 }} />, 
      title: 'IA Predictiva', 
      description: 'Anticipa tendencias y comportamientos con algoritmos de IA avanzada',
      color: '#6366f1',
      delay: 0
    },
    { 
      icon: <AutoGraph sx={{ fontSize: 40 }} />, 
      title: 'Analytics en Tiempo Real', 
      description: 'Métricas instantáneas y dashboards interactivos',
      color: '#10b981',
      delay: 100
    },
    { 
      icon: <IntegrationInstructions sx={{ fontSize: 40 }} />, 
      title: 'Integraciones Ilimitadas', 
      description: 'Conecta todas tus herramientas favoritas sin código',
      color: '#f59e0b',
      delay: 200
    },
    { 
      icon: <Security sx={{ fontSize: 40 }} />, 
      title: 'Seguridad Blockchain', 
      description: 'Protección de nivel empresarial con tecnología descentralizada',
      color: '#ef4444',
      delay: 300
    }
  ];

  // Estadísticas impresionantes
  const stats = [
    { number: '15K+', label: 'Empresas Confían' },
    { number: '99.9%', label: 'Uptime Garantizado' },
    { number: '4.8/5', label: 'Rating Global' },
    { number: '2.5x', label: 'Crecimiento Promedio' }
  ];

  // Testimonios
  const testimonials = [
    {
      name: 'María González',
      company: 'TechSolutions Inc.',
      avatar: 'MG',
      text: 'Universal Bot transformó nuestro negocio. Incrementamos ventas en un 300% el primer año.',
      rating: 5
    },
    {
      name: 'Carlos Rodríguez',
      company: 'InnovateCorp',
      avatar: 'CR',
      text: 'La IA predictiva nos ayudó a reducir costos operativos en un 45%. Impresionante.',
      rating: 5
    },
    {
      name: 'Ana Martínez',
      company: 'DigitalAgency',
      avatar: 'AM',
      text: 'La integración perfecta con todas nuestras herramientas existentes. Simplemente perfecto.',
      rating: 5
    }
  ];

  // Componente de tarjeta de característica animada
  const FeatureCard = ({ feature, index }) => (
    <Fade in={loaded} timeout={800} style={{ transitionDelay: `${feature.delay}ms` }}>
      <Card sx={{
        p: 4,
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(feature.color, 0.1)} 0%, ${alpha(feature.color, 0.05)} 100%)`,
        border: `1px solid ${alpha(feature.color, 0.2)}`,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${alpha(feature.color, 0.2)}`,
          border: `1px solid ${alpha(feature.color, 0.4)}`
        }
      }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Box sx={{
            width: 80,
            height: 80,
            background: `linear-gradient(135deg, ${feature.color} 0%, ${alpha(feature.color, 0.7)} 100%)`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            color: 'white',
            animation: `${floatAnimation} 3s ease-in-out infinite`
          }}>
            {feature.icon}
          </Box>
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: feature.color }}>
            {feature.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {feature.description}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      backgroundSize: '400% 400%',
      animation: `${gradientAnimation} 15s ease infinite`,
      color: 'white',
      overflow: 'hidden',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      {/* Partículas flotantes */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 100%),
          radial-gradient(3px 3px at 40% 70%, rgba(255,255,255,0.2) 0%, transparent 100%),
          radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(2px 2px at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 100%)
        `,
        animation: `${floatAnimation} 20s ease-in-out infinite`,
        pointerEvents: 'none'
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header/Navigation */}
        <Box sx={{ py: 4 }}>
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                animation: `${pulseAnimation} 2s ease-in-out infinite`
              }}>
                <RocketLaunch sx={{ fontSize: 40, color: '#3b82f6', mr: 2 }} />
                <Typography variant="h4" fontWeight={800}>
                  UniversalBot
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', 
                gap: 3, 
                justifyContent: isMobile ? 'center' : 'flex-end',
                flexWrap: 'wrap'
              }}>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/login')}
                  sx={{ fontWeight: 600 }}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/register')}
                  sx={{ 
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    fontWeight: 600,
                    px: 4,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Comenzar Gratis
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Hero Section */}
        <Box sx={{ 
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}>
          <Fade in={loaded} timeout={1000}>
            <Box>
              <Chip 
                label="✨ PLATAFORMA DEL FUTURO - DISPONIBLE AHORA" 
                sx={{ 
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                  color: 'white',
                  mb: 3,
                  px: 2,
                  py: 1,
                  fontSize: '0.9rem'
                }}
              />
              
              <Typography variant="h1" fontWeight={900} sx={{
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                lineHeight: 1.1
              }}>
                Automatiza Tu Negocio Con IA 2030
              </Typography>

              <Typography variant="h5" sx={{
                color: '#cbd5e1',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6
              }}>
                La primera plataforma todo-en-uno que combina IA predictiva, blockchain 
                y analytics en tiempo real para revolucionar tu negocio
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 6 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate('/register')}
                  startIcon={<RocketLaunch />}
                  sx={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Comenzar Ahora
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    borderColor: '#3b82f6',
                    color: '#3b82f6',
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      borderColor: '#60a5fa',
                      background: 'rgba(59, 130, 246, 0.1)'
                    }
                  }}
                >
                  Ver Demo
                </Button>
              </Stack>

              {/* Estadísticas */}
              <Grid container spacing={4} sx={{ mb: 8 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Fade in={loaded} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                      <Box>
                        <Typography variant="h3" fontWeight={800} color="#3b82f6">
                          {stat.number}
                        </Typography>
                        <Typography variant="body1" color="#94a3b8">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Fade in={loaded} timeout={1000}>
            <Box>
              <Typography variant="h2" fontWeight={800} textAlign="center" sx={{ mb: 2 }}>
                Características Revolucionarias
              </Typography>
              <Typography variant="h6" textAlign="center" color="#94a3b8" sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}>
                Diseñado para el futuro con tecnología de vanguardia
              </Typography>

              <Grid container spacing={4}>
                {features.map((feature, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <FeatureCard feature={feature} index={index} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: 8 }}>
          <Fade in={loaded} timeout={1000}>
            <Box>
              <Typography variant="h2" fontWeight={800} textAlign="center" sx={{ mb: 2 }}>
                Confiado por Líderes Globales
              </Typography>
              
              <Grid container spacing={4}>
                {testimonials.map((testimonial, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card sx={{
                      p: 3,
                      height: '100%',
                      background: 'rgba(30, 41, 59, 0.5)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Avatar sx={{ 
                            bgcolor: '#3b82f6', 
                            mr: 2,
                            width: 50,
                            height: 50
                          }}>
                            {testimonial.avatar}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight={600}>
                              {testimonial.name}
                            </Typography>
                            <Typography variant="body2" color="#94a3b8">
                              {testimonial.company}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                          "{testimonial.text}"
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Box key={i} sx={{ color: '#fbbf24', mr: 0.5 }}>
                              ★
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        </Box>

        {/* Final CTA Section */}
        <Box sx={{ py: 8 }}>
          <Fade in={loaded} timeout={1000}>
            <Paper sx={{
              p: { xs: 4, md: 8 },
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Box sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />
              
              <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
                ¿Listo para el Futuro?
              </Typography>
              <Typography variant="h6" color="#94a3b8" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
                Únete a la revolución de la IA y lleva tu negocio al siguiente nivel
              </Typography>
              
              <Button 
                variant="contained" 
                size="large"
                onClick={() => navigate('/register')}
                startIcon={<RocketLaunch />}
                sx={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                  fontSize: '1.2rem',
                  px: 6,
                  py: 2,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7c3aed 0%, #1d4ed8 100%)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Comenzar Gratis - 14 Días
              </Button>
              
              <Typography variant="body2" color="#94a3b8" sx={{ mt: 2 }}>
                Sin tarjeta de crédito requerida • Cancelación en cualquier momento
              </Typography>
            </Paper>
          </Fade>
        </Box>

        {/* Footer */}
        <Box sx={{ 
          py: 6, 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RocketLaunch sx={{ fontSize: 24, color: '#3b82f6', mr: 1 }} />
                <Typography variant="h6" fontWeight={700}>
                  UniversalBot
                </Typography>
              </Box>
              <Typography variant="body2" color="#94a3b8" sx={{ mt: 1 }}>
                © 2024 UniversalBot Platform. Todos los derechos reservados.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button color="inherit" startIcon={<Twitter />}>
                  Twitter
                </Button>
                <Button color="inherit" startIcon={<LinkedIn />}>
                  LinkedIn
                </Button>
                <Button color="inherit" startIcon={<GitHub />}>
                  GitHub
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
