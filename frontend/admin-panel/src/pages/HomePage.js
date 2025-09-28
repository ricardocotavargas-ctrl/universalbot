import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar,
  List, ListItem, ListItemIcon, Chip, Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Business,
  CheckCircle,
  PlayArrow,
  Security,
  Analytics,
  Speed,
  IntegrationInstructions,
  People,
  TrendingUp,
  Star,
  ArrowForward
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  const features = [
    {
      icon: <Security sx={{ color: '#2563eb' }} />,
      title: 'Seguridad Enterprise',
      description: 'Certificaciones SOC 2, ISO 27001 y compliance completo con las normativas internacionales'
    },
    {
      icon: <Analytics sx={{ color: '#059669' }} />,
      title: 'Business Intelligence',
      description: 'Dashboards ejecutivos con analytics predictivo y KPIs en tiempo real'
    },
    {
      icon: <Speed sx={{ color: '#dc2626' }} />,
      title: 'Alta Performance',
      description: 'Infraestructura escalable con 99.99% uptime garantizado y respuesta inmediata'
    },
    {
      icon: <IntegrationInstructions sx={{ color: '#7c3aed' }} />,
      title: 'Integraciones',
      description: 'Conectores nativos para +500 aplicaciones empresariales líderes del mercado'
    }
  ];

  const testimonials = [
    {
      name: "María González",
      position: "CEO, TechSolutions Inc.",
      content: "Redujimos costos operativos en 60% y mejoramos la eficiencia del equipo en 45%. La implementación fue rápida y el soporte excepcional.",
      company: "Fortune 500"
    },
    {
      name: "Carlos Rodríguez",
      position: "Director de Operaciones",
      content: "La plataforma nos permitió escalar internacionalmente sin problemas. La consolidación financiera multi-empresa ha sido invaluable.",
      company: "Global Manufacturing"
    }
  ];

  const stats = [
    { value: '15,000+', label: 'Empresas' },
    { value: '99.99%', label: 'Uptime' },
    { value: '4.9/5', label: 'Rating' },
    { value: '60%', label: 'Ahorro Promedio' }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#ffffff',
      overflow: 'hidden'
    }}>
      
      {/* Header Minimalista */}
      <AppBar 
        position="static"
        elevation={0}
        sx={{ 
          background: 'white', 
          color: '#1f2937',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            py: 2,
            px: { xs: 0, sm: 2 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Business sx={{ color: '#2563eb' }} />
              <Typography variant="h6" fontWeight={700}>
                UniversalBot
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={2}>
              <Button 
                onClick={() => navigate('/login')}
                sx={{ 
                  color: '#374151',
                  fontWeight: 600
                }}
              >
                Iniciar Sesión
              </Button>
              <Button 
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{ 
                  background: '#2563eb',
                  fontWeight: 600,
                  '&:hover': {
                    background: '#1d4ed8'
                  }
                }}
              >
                Comenzar Gratis
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section - Limpia y Profesional */}
      <Container maxWidth="lg" sx={{ 
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3 }
      }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Chip 
                label="PLATAFORMA ENTERPRISE"
                sx={{ 
                  background: '#f0f9ff',
                  color: '#0369a1',
                  fontWeight: 600,
                  mb: 3
                }}
              />

              <Typography variant="h1" sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                mb: 3,
                color: '#1f2937'
              }}>
                Gestión Empresarial
                <Box component="span" sx={{ 
                  display: 'block', 
                  color: '#2563eb',
                  fontWeight: 700
                }}>
                  Inteligente
                </Box>
              </Typography>

              <Typography variant="h6" sx={{
                color: '#6b7280',
                lineHeight: 1.6,
                mb: 4,
                fontWeight: 400
              }}>
                La plataforma todo-en-uno que combina IA avanzada, analytics predictivo 
                y automatización para optimizar operaciones y reducir costos.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    background: '#2563eb',
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      background: '#1d4ed8'
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
                    borderColor: '#374151',
                    color: '#374151',
                    fontSize: '1.1rem',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600
                  }}
                >
                  Ver Demo
                </Button>
              </Stack>

              {/* Estadísticas Sútiles */}
              <Grid container spacing={4}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <Box>
                      <Typography variant="h4" fontWeight={700} color="#2563eb">
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="#6b7280">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{
              background: '#f8fafc',
              borderRadius: '12px',
              p: 4,
              border: '1px solid #e5e7eb'
            }}>
              <Box sx={{
                width: '100%',
                height: '300px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                mb: 3
              }}>
                <Business sx={{ fontSize: 80 }} />
              </Box>
              <Typography variant="h6" fontWeight={600} align="center">
                Dashboard Ejecutivo
              </Typography>
              <Typography variant="body2" color="#6b7280" align="center">
                Interfaz intuitiva diseñada para ejecutivos
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Características - Diseño Limpio */}
      <Box sx={{ background: '#f8fafc', py: 8 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#1f2937',
              mb: 2
            }}>
              Soluciones Empresariales
            </Typography>
            <Typography variant="h6" sx={{ color: '#6b7280', maxWidth: '600px', mx: 'auto' }}>
              Diseñado para satisfacer las necesidades más exigentes del entorno empresarial moderno
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  height: '100%',
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none'
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                      <Box sx={{ 
                        background: '#f0f9ff',
                        borderRadius: '8px',
                        p: 2,
                        minWidth: '60px'
                      }}>
                        {feature.icon}
                      </Box>
                      
                      <Box>
                        <Typography variant="h5" fontWeight={600} color="#1f2937" gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" color="#6b7280" lineHeight={1.6}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonios - Diseño Elegante */}
      <Container maxWidth="lg" sx={{ 
        py: 8,
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#1f2937',
            mb: 2
          }}>
            Confiado por Líderes
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                height: '100%',
                border: '1px solid #e5e7eb',
                boxShadow: 'none'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} sx={{ color: '#fbbf24', fontSize: 20 }} />
                    ))}
                  </Box>
                  
                  <Typography variant="body1" sx={{ 
                    color: '#4b5563', 
                    fontStyle: 'italic',
                    mb: 3,
                    lineHeight: 1.6
                  }}>
                    "{testimonial.content}"
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#2563eb' }}>
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600} color="#1f2937">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="#6b7280">
                        {testimonial.position}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Final - Simple y Directo */}
      <Box sx={{ 
        background: '#1f2937',
        color: 'white',
        py: 8
      }}>
        <Container maxWidth="lg" sx={{ 
          px: { xs: 2, sm: 3 },
          textAlign: 'center' 
        }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            mb: 2
          }}>
            ¿Listo para Comenzar?
          </Typography>
          
          <Typography variant="h6" sx={{ 
            opacity: 0.8, 
            mb: 4,
            maxWidth: '600px',
            mx: 'auto'
          }}>
            Únete a miles de empresas que ya optimizan sus operaciones con nuestra plataforma
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                background: '#ffffff',
                color: '#1f2937',
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                minWidth: { xs: '100%', sm: '200px' },
                '&:hover': {
                  background: '#f8fafc'
                }
              }}
            >
              Comenzar Gratis
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontSize: '1.1rem',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                minWidth: { xs: '100%', sm: '200px' },
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)'
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
            gap: 3,
            flexWrap: 'wrap'
          }}>
            {[
              '14 días gratis',
              'Sin tarjeta requerida', 
              'Soporte incluido'
            ].map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', color: '#10b981' }}>
                <CheckCircle sx={{ mr: 1 }} />
                <Typography variant="body2">{item}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer Minimalista */}
      <Box sx={{ background: '#111827', color: 'white', py: 4 }}>
        <Container maxWidth="lg" sx={{ 
          px: { xs: 2, sm: 3 },
          textAlign: 'center' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Business sx={{ color: '#2563eb' }} />
            <Typography variant="h6" fontWeight={600}>
              UniversalBot
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2024 UniversalBot Platform. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
