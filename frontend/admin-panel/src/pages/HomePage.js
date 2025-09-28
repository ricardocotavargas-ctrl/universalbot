import React, { useState, useEffect } from 'react';
import { 
  Typography, Box, Button, Grid, 
  Card, CardContent, Chip, Avatar, Stack,
  useTheme, useMediaQuery
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
  Star,
  CheckCircle
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loaded, setLoaded] = useState(false);

  // Redirigir si está autenticado - IMPORTANTE: Esto debe ejecutarse
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }
    setTimeout(() => setLoaded(true), 100);
  }, [isAuthenticated, navigate]);

  // Si está autenticado, no renderizar nada (ya que redirige)
  if (isAuthenticated) {
    return null;
  }

  const features = [
    {
      icon: <Psychology sx={{ fontSize: 32, color: '#2563eb' }} />,
      title: 'IA Empresarial',
      description: 'Soluciones de inteligencia artificial diseñadas específicamente para negocios'
    },
    {
      icon: <AutoGraph sx={{ fontSize: 32, color: '#059669' }} />,
      title: 'Analytics Avanzado',
      description: 'Dashboards en tiempo real con métricas accionables'
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: 32, color: '#dc2626' }} />,
      title: 'Integraciones',
      description: 'Conecta todas tus herramientas en un solo lugar'
    },
    {
      icon: <Security sx={{ fontSize: 32, color: '#7c3aed' }} />,
      title: 'Seguridad',
      description: 'Protección enterprise-grade para tus datos'
    }
  ];

  const benefits = [
    'Implementación en 24 horas',
    'Soporte técnico 24/7',
    'Escalabilidad ilimitada',
    'Cumplimiento normativo',
    'Backup automático',
    'Actualizaciones gratuitas'
  ];

  const testimonials = [
    {
      name: 'María González',
      position: 'CEO, TechSolutions',
      content: 'Incrementamos nuestra eficiencia operativa en un 300% desde que implementamos la plataforma.',
      rating: 5
    },
    {
      name: 'Carlos Rodríguez',
      position: 'Director de Operaciones',
      content: 'La integración perfecta con nuestro ERP existente nos permitió automatizar procesos clave.',
      rating: 5
    },
    {
      name: 'Ana Martínez',
      position: 'CTO, InnovateCorp',
      content: 'El soporte técnico excepcional y la estabilidad de la plataforma son incomparables.',
      rating: 5
    }
  ];

  return (
    <Box sx={{ 
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      overflowX: 'hidden',
      margin: 0,
      padding: 0
    }}>
      {/* Hero Section - Sin márgenes */}
      <Box sx={{
        width: '100vw',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        pt: { xs: 8, md: 12 },
        pb: { xs: 12, md: 16 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Box sx={{ 
          maxWidth: '1200px', 
          mx: 'auto',
          textAlign: 'center' 
        }}>
          <Chip 
            label="🚀 PLATAFORMA EMPRESARIAL" 
            sx={{ 
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              mb: 3,
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          />
          
          <Typography variant="h1" sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 3,
            lineHeight: 1.1
          }}>
            Automatización Inteligente para Empresas
          </Typography>

          <Typography variant="h5" sx={{
            opacity: 0.9,
            mb: 4,
            lineHeight: 1.6,
            fontWeight: 400
          }}>
            La plataforma todo-en-uno que combina IA, analytics y automatización 
            para transformar tu negocio digitalmente
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 6 }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/register')}
              startIcon={<RocketLaunch />}
              sx={{
                background: 'white',
                color: '#2563eb',
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                '&:hover': {
                  background: '#f8fafc',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Comenzar Gratis
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Ver Demo
            </Button>
          </Stack>

          {/* Estadísticas */}
          <Grid container spacing={4} sx={{ mt: 8 }}>
            {[['15K+', 'Empresas'], ['99.9%', 'Uptime'], ['4.8/5', 'Rating'], ['24/7', 'Soporte']].map(([number, label], index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box>
                  <Typography variant="h3" fontWeight={700}>{number}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>{label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ 
        width: '100vw',
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Box sx={{ 
          maxWidth: '1200px', 
          mx: 'auto',
          textAlign: 'center', 
          mb: 8 
        }}>
          <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
            Soluciones Empresariales
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Diseñado para satisfacer las necesidades más exigentes del entorno empresarial moderno
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  height: '100%',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ 
        width: '100vw',
        background: '#f8fafc', 
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" fontWeight={700} sx={{ mb: 3 }}>
                Todo lo que necesitas para crecer
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Características diseñadas para el crecimiento empresarial sostenible
              </Typography>
              
              <Stack spacing={2}>
                {benefits.map((benefit, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ color: '#10b981', mr: 2 }} />
                    <Typography variant="body1">{benefit}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                color: 'white',
                p: 4,
                textAlign: 'center'
              }}>
                <CardContent>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    Comienza Hoy
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                    Prueba 14 días gratis
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      background: 'white',
                      color: '#2563eb',
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        background: '#f8fafc'
                      }
                    }}
                  >
                    Crear Cuenta
                  </Button>
                  <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                    Sin tarjeta de crédito requerida
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ 
        width: '100vw',
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
              Confiado por líderes del sector
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Empresas que han transformado sus operaciones con nuestra plataforma
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: '#fbbf24', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                      "{testimonial.content}"
                    </Typography>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.position}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Final CTA */}
      <Box sx={{ 
        width: '100vw',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Box sx={{ 
          maxWidth: '1200px', 
          mx: 'auto',
          textAlign: 'center' 
        }}>
          <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
            ¿Listo para comenzar?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.8 }}>
            Únete a miles de empresas que ya automatizan sus operaciones
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/register')}
            startIcon={<RocketLaunch />}
            sx={{
              background: '#3b82f6',
              fontSize: '1.1rem',
              px: 6,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                background: '#2563eb'
              }
            }}
          >
            Comenzar Gratis
          </Button>
          <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
            Prueba 14 días • Sin compromiso • Soporte incluido
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        width: '100vw',
        background: '#0f172a',
        color: 'white',
        py: 6,
        px: { xs: 2, sm: 3, md: 4 },
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RocketLaunch sx={{ mr: 1, color: '#3b82f6' }} />
                <Typography variant="h6" fontWeight={700}>
                  UniversalBot Platform
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                © 2024 UniversalBot. Todos los derechos reservados.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { md: 'right' } }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  contact@universalbot.com
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
