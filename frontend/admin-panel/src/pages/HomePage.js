import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, alpha
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Security,
  Analytics,
  Speed,
  IntegrationInstructions,
  Cloud,
  SupportAgent,
  CheckCircle,
  PlayArrow,
  Business,
  TrendingUp,
  People,
  Shield
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
    setTimeout(() => setLoaded(true), 300);
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  // Características empresariales
  const features = [
    {
      icon: <Security sx={{ fontSize: 40, color: '#2563eb' }} />,
      title: 'Seguridad Enterprise',
      description: 'Certificación SOC 2, encriptación end-to-end y compliance completo'
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: '#059669' }} />,
      title: 'Analytics en Tiempo Real',
      description: 'Dashboards ejecutivos con KPIs y métricas de negocio'
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: '#dc2626' }} />,
      title: 'Alta Performance',
      description: 'Infraestructura escalable con 99.99% uptime garantizado'
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: 40, color: '#7c3aed' }} />,
      title: 'Integraciones',
      description: 'Conectores pre-built para ERP, CRM y herramientas empresariales'
    }
  ];

  // Beneficios claros
  const benefits = [
    'Reducción de costos operativos hasta 60%',
    'Incremento de productividad del equipo',
    'Toma de decisiones basada en datos reales',
    'Escalabilidad ilimitada',
    'Soporte técnico dedicado 24/7',
    'Implementación en menos de 48 horas'
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#ffffff',
      overflow: 'hidden'
    }}>
      
      {/* Hero Section - Profesional y Confiable */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        pt: { xs: 6, md: 12 },
        pb: { xs: 8, md: 15 },
        position: 'relative'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                {/* Encabezado profesional */}
                <Typography variant="h1" sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  mb: 3
                }}>
                  Gestión Empresarial 
                  <Box component="span" sx={{ display: 'block', color: '#dbeafe' }}>
                    Inteligente
                  </Box>
                </Typography>

                <Typography variant="h5" sx={{
                  fontWeight: 400,
                  lineHeight: 1.6,
                  mb: 4,
                  opacity: 0.9
                }}>
                  La plataforma todo-en-uno que simplifica operaciones complejas, 
                  optimiza recursos y impulsa el crecimiento de tu empresa.
                </Typography>

                {/* Botones de acción claros */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      background: '#ffffff',
                      color: '#2563eb',
                      fontSize: '1.1rem',
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: '8px',
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
                      fontWeight: 600,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Ver Demo
                  </Button>
                </Stack>

                {/* Estadísticas de confianza */}
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Box>
                      <Typography variant="h4" fontWeight={700}>15,000+</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Empresas</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography variant="h4" fontWeight={700}>99.9%</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Uptime</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Ilustración profesional */}
              <Box sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                p: 4,
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <Box sx={{
                  width: '100%',
                  height: '300px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  mb: 3
                }}>
                  <Business sx={{ fontSize: 80 }} />
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  Universal Bot Platform
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Soluciones empresariales verificadas
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sección de Confianza */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={700} color="#1f2937" gutterBottom>
            Confiado por empresas líderes
          </Typography>
          <Typography variant="h6" color="#6b7280" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Empresas de todos los tamaños confían en nuestra plataforma para sus operaciones críticas
          </Typography>
        </Box>

        {/* Logos de empresas (simulados) */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {['Financiera', 'Retail', 'Tecnología', 'Manufactura', 'Salud', 'Educación'].map((industry, index) => (
            <Grid item xs={6} md={2} key={index}>
              <Box sx={{ 
                textAlign: 'center',
                p: 2,
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#3b82f6',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
                }
              }}>
                <Business sx={{ fontSize: 40, color: '#3b82f6', mb: 1 }} />
                <Typography variant="body2" fontWeight={600}>{industry}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Características Principales */}
      <Box sx={{ background: '#f8fafc', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" fontWeight={700} color="#1f2937" gutterBottom>
              Soluciones Completas
            </Typography>
            <Typography variant="h6" color="#6b7280">
              Todo lo que tu empresa necesita en una sola plataforma
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  height: '100%',
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom color="#1f2937">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="#6b7280">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Beneficios Claros */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight={700} color="#1f2937" gutterBottom>
              Resultados Tangibles
            </Typography>
            <Typography variant="h6" color="#6b7280" sx={{ mb: 4 }}>
              Transforma tu negocio con beneficios medibles desde el primer día
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
              background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
              color: 'white',
              p: 4
            }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  Comienza Hoy
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                  Prueba gratuita de 14 días
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
                  Sin compromiso • Sin tarjeta requerida
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Casos de Éxito */}
      <Box sx={{ background: '#1f2937', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Casos de Éxito
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8 }}>
              Empresas que han transformado sus operaciones
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <CardContent sx={{ p: 4 }}>
                  <People sx={{ fontSize: 40, color: '#3b82f6', mb: 2 }} />
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    TechSolutions Inc.
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                    "Incrementamos la eficiencia operativa en un 300% y redujimos costos en un 45%."
                  </Typography>
                  <Typography variant="caption">María González, CEO</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <CardContent sx={{ p: 4 }}>
                  <TrendingUp sx={{ fontSize: 40, color: '#10b981', mb: 2 }} />
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Global Enterprises
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                    "La plataforma nos permitió escalar nuestras operaciones internacionalmente sin problemas."
                  </Typography>
                  <Typography variant="caption">Carlos Rodríguez, Director</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                <CardContent sx={{ p: 4 }}>
                  <Shield sx={{ fontSize: 40, color: '#f59e0b', mb: 2 }} />
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    InnovateCorp
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                    "La seguridad y confiabilidad del sistema superaron todas nuestras expectativas."
                  </Typography>
                  <Typography variant="caption">Ana Martínez, CTO</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Final */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: '16px',
          p: 6
        }}>
          <Typography variant="h3" fontWeight={700} color="#1f2937" gutterBottom>
            ¿Listo para Comenzar?
          </Typography>
          <Typography variant="h6" color="#6b7280" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
            Únete a miles de empresas que ya optimizan sus operaciones con nuestra plataforma
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                background: '#2563eb',
                fontSize: '1.1rem',
                px: 6,
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
              onClick={() => navigate('/login')}
              sx={{
                borderColor: '#2563eb',
                color: '#2563eb',
                fontSize: '1.1rem',
                px: 6,
                py: 1.5,
                fontWeight: 600
              }}
            >
              Iniciar Sesión
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
