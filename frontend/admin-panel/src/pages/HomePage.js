import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, Chip, Avatar, useTheme, useMediaQuery, alpha
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  RocketLaunch,
  Shield,
  TrendingUp,
  IntegrationInstructions,
  Analytics,
  People,
  CheckCircle,
  PlayCircle,
  Star,
  ArrowForward
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }
    setTimeout(() => setLoaded(true), 100);
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  // Características premium
  const features = [
    {
      icon: <Analytics sx={{ fontSize: 40, color: '#0066ff' }} />,
      title: 'Analytics en Tiempo Real',
      description: 'Dashboards interactivos con métricas actualizadas al instante'
    },
    {
      icon: <Shield sx={{ fontSize: 40, color: '#00cc88' }} />,
      title: 'Seguridad Enterprise',
      description: 'Protección bancaria con encriptación AES-256 y compliance'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#ff6b00' }} />,
      title: 'Crecimiento Inteligente',
      description: 'Algoritmos de IA que optimizan tus operaciones automáticamente'
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: 'Integraciones Ilimitadas',
      description: 'Conecta todas tus herramientas favoritas en segundos'
    }
  ];

  // Testimonios de clientes
  const testimonials = [
    {
      name: 'María González',
      company: 'TechSolutions Inc.',
      role: 'CEO',
      content: 'Incrementamos nuestra productividad en un 300%. La plataforma es simplemente excepcional.',
      avatar: 'MG',
      rating: 5
    },
    {
      name: 'Carlos Rodríguez',
      company: 'Global Enterprises',
      role: 'Director de Operaciones',
      content: 'La implementación fue rápida y el soporte técnico es de clase mundial.',
      avatar: 'CR',
      rating: 5
    },
    {
      name: 'Ana Martínez',
      company: 'InnovateCorp',
      role: 'CTO',
      content: 'La integración con nuestro ERP existente fue perfecta. Totalmente recomendado.',
      avatar: 'AM',
      rating: 5
    }
  ];

  // Estadísticas impresionantes
  const stats = [
    { value: '15,000+', label: 'Empresas Confían' },
    { value: '99.9%', label: 'Tiempo de Actividad' },
    { value: '4.8/5', label: 'Satisfacción Cliente' },
    { value: '2.5x', label: 'Crecimiento Promedio' }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* Efectos de fondo sofisticados */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        
        {/* Hero Section - Nivel Dios */}
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          py: { xs: 8, md: 0 }
        }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                
                {/* Badge Premium */}
                <Chip 
                  icon={<RocketLaunch />}
                  label="PLATAFORMA EMPRESARIAL 2024"
                  sx={{ 
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    px: 2,
                    py: 1,
                    mb: 4
                  }}
                />

                {/* Título Principal */}
                <Typography variant="h1" sx={{
                  fontSize: { xs: '2.8rem', md: '4rem', lg: '5rem' },
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                  mb: 3
                }}>
                  Automatización
                  <Box component="span" sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06d6a0 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {' '}Inteligente
                  </Box>
                  <br />
                  para Empresas
                </Typography>

                {/* Subtítulo */}
                <Typography variant="h5" sx={{
                  color: '#cbd5e1',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  mb: 4,
                  maxWidth: '500px',
                  mx: { xs: 'auto', md: 0 }
                }}>
                  La plataforma todo-en-uno que combina IA, analytics y automatización 
                  para transformar digitalmente tu negocio. Diseñada para el crecimiento.
                </Typography>

                {/* Botones de Acción */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
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
                      fontWeight: 600,
                      borderRadius: '12px',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                      }
                    }}
                  >
                    Comenzar Gratis
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayCircle />}
                    sx={{
                      borderColor: '#3b82f6',
                      color: '#3b82f6',
                      fontSize: '1.1rem',
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: '12px',
                      '&:hover': {
                        borderColor: '#60a5fa',
                        background: 'rgba(59, 130, 246, 0.1)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Ver Demo
                  </Button>
                </Stack>

                {/* Estadísticas */}
                <Grid container spacing={4}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Box>
                        <Typography variant="h4" fontWeight={800} color="#3b82f6">
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="#94a3b8">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Ilustración Hero */}
            <Grid item xs={12} md={6}>
              <Box sx={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                borderRadius: '24px',
                p: 4,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                textAlign: 'center'
              }}>
                <Box sx={{
                  width: '100%',
                  height: '300px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '4rem',
                  fontWeight: 'bold'
                }}>
                  UB
                </Box>
                <Typography variant="h6" sx={{ mt: 3, color: 'white', fontWeight: 600 }}>
                  Universal Bot Platform
                </Typography>
                <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 1 }}>
                  Soluciones empresariales de clase mundial
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              color: 'white',
              mb: 2
            }}>
              Características
              <Box component="span" sx={{ 
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {' '}Premium
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ color: '#94a3b8', maxWidth: '600px', mx: 'auto' }}>
              Diseñado para satisfacer las necesidades más exigentes del entorno empresarial moderno
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
                  }
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={700} color="white" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              color: 'white',
              mb: 2
            }}>
              Confiado por
              <Box component="span" sx={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #06d6a0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {' '}Líderes
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ color: '#94a3b8' }}>
              Empresas que han transformado sus operaciones con nuestra plataforma
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(20px)',
                  height: '100%'
                }}>
                  <CardContent sx={{ p: 4 }}>
                    {/* Rating */}
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: '#fbbf24', fontSize: 20 }} />
                      ))}
                    </Box>

                    {/* Testimonio */}
                    <Typography variant="body1" sx={{ 
                      color: '#e2e8f0', 
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      mb: 3
                    }}>
                      "{testimonial.content}"
                    </Typography>

                    {/* Información del cliente */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        bgcolor: '#3b82f6', 
                        mr: 2,
                        width: 50,
                        height: 50
                      }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600} color="white">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                          {testimonial.role}, {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final CTA Section */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            backdropFilter: 'blur(20px)',
            p: { xs: 4, md: 8 }
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                color: 'white',
                mb: 2
              }}>
                ¿Listo para Comenzar?
              </Typography>
              
              <Typography variant="h6" sx={{ 
                color: '#cbd5e1', 
                mb: 4,
                maxWidth: '600px',
                mx: 'auto'
              }}>
                Únete a miles de empresas que ya están transformando sus operaciones 
                con inteligencia artificial y automatización.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  endIcon={<ArrowForward />}
                  sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    fontSize: '1.1rem',
                    px: 6,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: '12px',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 15px 30px rgba(59, 130, 246, 0.4)'
                    }
                  }}
                >
                  Crear Cuenta Gratis
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderColor: '#10b981',
                    color: '#10b981',
                    fontSize: '1.1rem',
                    px: 6,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: '12px',
                    '&:hover': {
                      borderColor: '#059669',
                      background: 'rgba(16, 185, 129, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Iniciar Sesión
                </Button>
              </Stack>

              <Typography variant="body2" sx={{ 
                color: '#94a3b8', 
                mt: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}>
                <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                14 días gratis • Sin tarjeta requerida • Cancelación instantánea
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
