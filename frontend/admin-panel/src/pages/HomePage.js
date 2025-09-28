import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, Chip, Avatar, useTheme, useMediaQuery, alpha,
  Fade, Slide, Zoom, Grow
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
  ArrowForward,
  AutoGraph,
  Psychology,
  Security,
  WorkspacePremium,
  Bolt,
  Cloud,
  DataArray
} from '@mui/icons-material';

// Animaciones personalizadas
const floatAnimation = {
  animation: 'float 6s ease-in-out infinite',
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' }
  }
};

const glowAnimation = {
  animation: 'glow 2s ease-in-out infinite alternate',
  '@keyframes glow': {
    '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
    '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' }
  }
};

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
    setTimeout(() => setLoaded(true), 500);
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  // Características ultra premium
  const features = [
    {
      icon: <Psychology sx={{ fontSize: 48 }} />,
      title: 'IA Predictiva Avanzada',
      description: 'Algoritmos de machine learning que anticipan tendencias y optimizan operaciones',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
      delay: 0
    },
    {
      icon: <AutoGraph sx={{ fontSize: 48 }} />,
      title: 'Analytics en Tiempo Real',
      description: 'Dashboards interactivos con visualización de datos avanzada',
      gradient: 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)',
      delay: 200
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: 'Seguridad Nivel Enterprise',
      description: 'Encriptación AES-256, compliance GDPR y auditorías continuas',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)',
      delay: 400
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: 48 }} />,
      title: 'Integraciones Ilimitadas',
      description: 'API-first architecture con +100 integraciones pre-built',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      delay: 600
    }
  ];

  // Testimonios de élite
  const testimonials = [
    {
      name: 'María González',
      company: 'TechSolutions Inc.',
      role: 'CEO',
      content: 'La plataforma revolucionó nuestro negocio. Incrementamos eficiencia en 400% y redujimos costos en 60%.',
      avatar: 'MG',
      rating: 5,
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Carlos Rodríguez',
      company: 'Global Enterprises',
      role: 'Director de Operaciones',
      content: 'Implementación impecable y soporte 24/7. La mejor inversión tecnológica que hemos hecho.',
      avatar: 'CR',
      rating: 5,
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Ana Martínez',
      company: 'InnovateCorp',
      role: 'CTO',
      content: 'La escalabilidad y robustez del sistema superó todas nuestras expectativas. Simply outstanding.',
      avatar: 'AM',
      rating: 5,
      image: '/api/placeholder/80/80'
    }
  ];

  // Estadísticas impresionantes
  const stats = [
    { value: '15,000+', label: 'Empresas de Élite', icon: <WorkspacePremium /> },
    { value: '99.99%', label: 'Uptime Garantizado', icon: <Cloud /> },
    { value: '4.9/5', label: 'Rating Global', icon: <Star /> },
    { value: '3.2x', label: 'ROI Promedio', icon: <TrendingUp /> }
  ];

  // Empresas que confían
  const trustedBy = [
    { name: 'Microsoft', logo: 'MS' },
    { name: 'Google', logo: 'GG' },
    { name: 'Amazon', logo: 'AZ' },
    { name: 'Tesla', logo: 'TS' },
    { name: 'Netflix', logo: 'NF' }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d2d2d 100%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* Efectos de fondo ultra premium */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 100%)
        `,
        pointerEvents: 'none'
      }} />

      {/* Partículas animadas */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(2px 2px at 20% 30%, rgba(59, 130, 246, 0.6) 0%, transparent 100%),
          radial-gradient(3px 3px at 40% 70%, rgba(139, 92, 246, 0.4) 0%, transparent 100%),
          radial-gradient(1px 1px at 60% 20%, rgba(16, 185, 129, 0.8) 0%, transparent 100%),
          radial-gradient(2px 2px at 80% 50%, rgba(245, 158, 11, 0.5) 0%, transparent 100%)
        `,
        animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none'
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        
        {/* Hero Section - Nivel Ultra Dios */}
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={loaded} timeout={1000}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  
                  {/* Badge Ultra Premium */}
                  <Chip 
                    icon={<Bolt sx={{ color: '#fbbf24' }} />}
                    label="PLATAFORMA ENTERPRISE 2024"
                    sx={{ 
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                      color: '#fbbf24',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      px: 3,
                      py: 1,
                      mb: 4,
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />

                  {/* Título Principal Épico */}
                  <Typography variant="h1" sx={{
                    fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 30%, #8b5cf6 70%, #ec4899 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.1,
                    mb: 3,
                    textShadow: '0 0 50px rgba(59, 130, 246, 0.5)'
                  }}>
                    Revoluciona
                    <Box component="span" sx={{ 
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {' '}Tu Negocio
                    </Box>
                    <br />
                    Con IA
                  </Typography>

                  {/* Subtítulo Élite */}
                  <Typography variant="h4" sx={{
                    color: '#e5e7eb',
                    fontWeight: 300,
                    lineHeight: 1.4,
                    mb: 4,
                    maxWidth: '600px',
                    mx: { xs: 'auto', md: 0 },
                    fontSize: { xs: '1.25rem', md: '1.5rem' }
                  }}>
                    La plataforma definitiva que combina <strong>inteligencia artificial</strong>, 
                    <strong> automatización avanzada</strong> y <strong>analytics predictivo</strong> 
                    para llevar tu empresa al siguiente nivel.
                  </Typography>

                  {/* Botones de Acción Ultra Premium */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 8 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/register')}
                      startIcon={<RocketLaunch />}
                      sx={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        fontSize: '1.2rem',
                        px: 6,
                        py: 2,
                        fontWeight: 700,
                        borderRadius: '15px',
                        minWidth: '200px',
                        ...glowAnimation,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                          transform: 'translateY(-3px) scale(1.02)',
                          boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)'
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
                        border: '2px solid',
                        borderColor: '#3b82f6',
                        color: '#3b82f6',
                        fontSize: '1.2rem',
                        px: 6,
                        py: 2,
                        fontWeight: 700,
                        borderRadius: '15px',
                        minWidth: '200px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          borderColor: '#60a5fa',
                          background: 'rgba(59, 130, 246, 0.2)',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 15px 30px rgba(59, 130, 246, 0.3)'
                        }
                      }}
                    >
                      Ver Demo
                    </Button>
                  </Stack>

                  {/* Estadísticas Impresionantes */}
                  <Grid container spacing={4}>
                    {stats.map((stat, index) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <Grow in={loaded} timeout={800 + index * 200}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Box sx={{ 
                              color: '#3b82f6', 
                              mb: 1,
                              fontSize: '2rem'
                            }}>
                              {stat.icon}
                            </Box>
                            <Typography variant="h4" fontWeight={900} color="#fbbf24">
                              {stat.value}
                            </Typography>
                            <Typography variant="body2" color="#9ca3af" sx={{ fontSize: '0.8rem' }}>
                              {stat.label}
                            </Typography>
                          </Box>
                        </Grow>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Fade>
            </Grid>

            {/* Ilustración Hero Ultra Premium */}
            <Grid item xs={12} md={6}>
              <Zoom in={loaded} timeout={1500}>
                <Box sx={{
                  position: 'relative',
                  perspective: '1000px'
                }}>
                  {/* Tarjeta 3D Principal */}
                  <Box sx={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                    borderRadius: '30px',
                    p: 6,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(40px)',
                    textAlign: 'center',
                    transform: 'rotateY(5deg) rotateX(5deg)',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'rotateY(0deg) rotateX(0deg) scale(1.02)'
                    },
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
                  }}>
                    <Box sx={{
                      width: '100%',
                      height: '400px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '6rem',
                      fontWeight: 'bold',
                      mb: 3,
                      ...floatAnimation
                    }}>
                      <Box sx={{ 
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        width: '200px',
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)'
                      }}>
                        UB
                      </Box>
                    </Box>
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>
                      Universal Bot
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#cbd5e1', fontWeight: 300 }}>
                      Enterprise AI Platform
                    </Typography>
                  </Box>

                  {/* Elementos flotantes alrededor */}
                  <Box sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    background: 'linear-gradient(135deg, #10b981 0%, #06d6a0 100%)',
                    borderRadius: '15px',
                    p: 2,
                    transform: 'rotate(12deg)',
                    ...floatAnimation,
                    animationDelay: '2s'
                  }}>
                    <DataArray sx={{ color: 'white', fontSize: 32 }} />
                  </Box>

                  <Box sx={{
                    position: 'absolute',
                    bottom: -20,
                    left: -20,
                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                    borderRadius: '15px',
                    p: 2,
                    transform: 'rotate(-8deg)',
                    ...floatAnimation,
                    animationDelay: '4s'
                  }}>
                    <TrendingUp sx={{ color: 'white', fontSize: 32 }} />
                  </Box>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Box>

        {/* Sección de Empresas que Confían */}
        <Slide in={loaded} timeout={1000} direction="up">
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h6" color="#9ca3af" sx={{ mb: 4, fontWeight: 300 }}>
              Confiado por las empresas más innovadoras del mundo
            </Typography>
            <Stack direction="row" spacing={8} justifyContent="center" alignItems="center" flexWrap="wrap">
              {trustedBy.map((company, index) => (
                <Box key={index} sx={{ 
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                  '&:hover': { opacity: 1 }
                }}>
                  <Typography variant="h6" fontWeight={700} color="#e5e7eb">
                    {company.logo}
                  </Typography>
                  <Typography variant="caption" color="#9ca3af">
                    {company.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Slide>

        {/* Features Section Ultra Premium */}
        <Box sx={{ py: { xs: 8, md: 15 } }}>
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{
              fontSize: { xs: '3rem', md: '4.5rem' },
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              Características
              <Box component="span" sx={{ 
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {' '}Élite
              </Box>
            </Typography>
            <Typography variant="h5" sx={{ 
              color: '#d1d5db', 
              fontWeight: 300,
              maxWidth: '700px', 
              mx: 'auto',
              lineHeight: 1.6 
            }}>
              Diseñado para ejecutivos que exigen excelencia. Tecnología de vanguardia 
              para resultados extraordinarios.
            </Typography>
          </Box>

          <Grid container spacing={6}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Grow in={loaded} timeout={800 + feature.delay}>
                  <Card sx={{
                    background: `linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(50, 50, 50, 0.4) 100%)`,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '25px',
                    backdropFilter: 'blur(30px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-15px) scale(1.02)',
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: feature.gradient
                    }
                  }}>
                    <CardContent sx={{ p: 5 }}>
                      <Box sx={{ 
                        background: feature.gradient,
                        borderRadius: '20px',
                        width: '80px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        color: 'white'
                      }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h4" fontWeight={800} color="white" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: '#d1d5db', 
                        lineHeight: 1.7,
                        fontSize: '1.1rem'
                      }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials Section Ultra Premium */}
        <Box sx={{ py: { xs: 8, md: 15 } }}>
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{
              fontSize: { xs: '3rem', md: '4.5rem' },
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffffff 0%, #10b981 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              Voces de
              <Box component="span" sx={{ 
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {' '}Éxito
              </Box>
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Slide in={loaded} timeout={800 + index * 300} direction="up">
                  <Card sx={{
                    background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(50, 50, 50, 0.4) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '25px',
                    backdropFilter: 'blur(30px)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      borderColor: 'rgba(16, 185, 129, 0.5)'
                    }
                  }}>
                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Rating */}
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} sx={{ 
                            color: '#fbbf24', 
                            fontSize: 24,
                            filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))'
                          }} />
                        ))}
                      </Box>

                      {/* Testimonio */}
                      <Typography variant="body1" sx={{ 
                        color: '#e5e7eb', 
                        fontStyle: 'italic',
                        lineHeight: 1.7,
                        mb: 4,
                        flexGrow: 1,
                        fontSize: '1.1rem'
                      }}>
                        "{testimonial.content}"
                      </Typography>

                      {/* Información del cliente */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                        <Avatar sx={{ 
                          bgcolor: '#3b82f6', 
                          mr: 3,
                          width: 60,
                          height: 60,
                          fontSize: '1.5rem',
                          fontWeight: 'bold'
                        }}>
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={800} color="white">
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 600 }}>
                            {testimonial.role}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                            {testimonial.company}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final CTA Section - Épico */}
        <Box sx={{ py: { xs: 8, md: 15 } }}>
          <Fade in={loaded} timeout={1500}>
            <Card sx={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '35px',
              backdropFilter: 'blur(40px)',
              p: { xs: 4, md: 8 },
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
              }
            }}>
              <CardContent sx={{ 
                textAlign: 'center', 
                position: 'relative', 
                zIndex: 2 
              }}>
                <Typography variant="h2" sx={{
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #ffffff 0%, #fbbf24 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3
                }}>
                  ¿Listo para la Revolución?
                </Typography>
                
                <Typography variant="h4" sx={{ 
                  color: '#e5e7eb', 
                  fontWeight: 300,
                  mb: 6,
                  lineHeight: 1.6,
                  maxWidth: '800px',
                  mx: 'auto'
                }}>
                  Únete a los líderes que ya están transformando sus negocios con 
                  la plataforma más avanzada del mercado. El futuro espera.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      fontSize: '1.3rem',
                      px: 8,
                      py: 2.5,
                      fontWeight: 800,
                      borderRadius: '20px',
                      minWidth: '250px',
                      ...glowAnimation,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        transform: 'translateY(-3px) scale(1.05)',
                        boxShadow: '0 25px 50px rgba(16, 185, 129, 0.5)'
                      }
                    }}
                  >
                    Comenzar Ahora
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      border: '3px solid',
                      borderColor: '#3b82f6',
                      color: '#3b82f6',
                      fontSize: '1.3rem',
                      px: 8,
                      py: 2.5,
                      fontWeight: 800,
                      borderRadius: '20px',
                      minWidth: '250px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        borderColor: '#60a5fa',
                        background: 'rgba(59, 130, 246, 0.2)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)'
                      }
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </Stack>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 2,
                  flexWrap: 'wrap'
                }}>
                  {[
                    '✓ 14 días gratis',
                    '✓ Sin tarjeta requerida', 
                    '✓ Implementación express',
                    '✓ Soporte premium 24/7'
                  ].map((item, index) => (
                    <Box key={index} sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      color: '#10b981',
                      fontWeight: 600
                    }}>
                      <CheckCircle sx={{ mr: 1, fontSize: 20 }} />
                      {item}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
