import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Security,
  Analytics,
  Speed,
  IntegrationInstructions,
  Business,
  CheckCircle,
  PlayArrow,
  People,
  TrendingUp,
  Shield,
  Cloud,
  SupportAgent,
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
    setTimeout(() => setLoaded(true), 300);
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  // Características empresariales
  const features = [
    {
      icon: <Security sx={{ fontSize: 48, color: '#2563eb' }} />,
      title: 'Seguridad Enterprise',
      description: 'Certificación SOC 2 Type II, encriptación end-to-end y compliance completo con GDPR, HIPAA'
    },
    {
      icon: <Analytics sx={{ fontSize: 48, color: '#059669' }} />,
      title: 'Business Intelligence',
      description: 'Dashboards ejecutivos con KPIs en tiempo real y analytics predictivo'
    },
    {
      icon: <Speed sx={{ fontSize: 48, color: '#dc2626' }} />,
      title: 'Alta Performance',
      description: 'Infraestructura cloud escalable con 99.99% SLA garantizado'
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: 48, color: '#7c3aed' }} />,
      title: 'Integraciones Enterprise',
      description: '+200 conectores para ERP, CRM, contabilidad y herramientas empresariales'
    },
    {
      icon: <Cloud sx={{ fontSize: 48, color: '#0369a1' }} />,
      title: 'Implementación Rápida',
      description: 'Onboarding en 48 horas con migración de datos asistida'
    },
    {
      icon: <SupportAgent sx={{ fontSize: 48, color: '#c2410c' }} />,
      title: 'Soporte Dedicado',
      description: 'Account manager asignado y soporte técnico 24/7 en español'
    }
  ];

  // Métricas de impacto
  const metrics = [
    { value: '60%', label: 'Reducción de costos operativos' },
    { value: '3.2x', label: 'ROI promedio en el primer año' },
    { value: '45%', label: 'Incremento en productividad' },
    { value: '99.99%', label: 'Disponibilidad garantizada' }
  ];

  // Testimonios ejecutivos
  const testimonials = [
    {
      name: 'María González',
      position: 'CEO, TechSolutions Inc.',
      company: 'Empresa del Fortune 500',
      content: 'La implementación fue impecable. En 3 meses logramos reducir costos operativos en 58% y mejorar la eficiencia del equipo.'
    },
    {
      name: 'Carlos Rodríguez',
      position: 'Director de Operaciones',
      company: 'Global Manufacturing Corp',
      content: 'La plataforma nos permitió unificar 15 sistemas diferentes. La escalabilidad ha sido fundamental para nuestro crecimiento internacional.'
    },
    {
      name: 'Ana Martínez',
      position: 'CTO, InnovateCorp',
      company: 'Unicornio Tecnológico',
      content: 'La seguridad y confiabilidad del sistema son excepcionales. Nuestros inversionistas quedaron impresionados con la implementación.'
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#ffffff',
      overflow: 'hidden'
    }}>
      
      {/* Header Profesional */}
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
          <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Business sx={{ fontSize: 32, color: '#2563eb' }} />
              <Typography variant="h6" fontWeight={700}>
                UniversalBot
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={2}>
              <Button 
                onClick={() => navigate('/login')}
                sx={{ 
                  color: '#374151',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'rgba(59, 130, 246, 0.1)'
                  }
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

      {/* Hero Section - Ultra Profesional */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 15 }
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h3" sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  mb: 3
                }}>
                  Plataforma de Gestión 
                  <Box component="span" sx={{ display: 'block', color: '#dbeafe', fontWeight: 600 }}>
                    Empresarial Inteligente
                  </Box>
                </Typography>

                <Typography variant="h6" sx={{
                  fontWeight: 400,
                  lineHeight: 1.6,
                  mb: 4,
                  opacity: 0.9,
                  fontSize: '1.25rem'
                }}>
                  Solución todo-en-uno que optimiza operaciones, reduce costos y impulsa 
                  el crecimiento de su empresa con tecnología de vanguardia.
                </Typography>

                {/* Botones de Acción Principales */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 6 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: '#ffffff',
                      color: '#2563eb',
                      fontSize: '1.1rem',
                      px: 5,
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: '8px',
                      minWidth: '200px',
                      '&:hover': {
                        background: '#f8fafc',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Prueba Gratuita
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayArrow />}
                    onClick={() => window.open('#demo', '_blank')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontSize: '1.1rem',
                      px: 5,
                      py: 1.5,
                      fontWeight: 600,
                      minWidth: '200px',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#dbeafe'
                      }
                    }}
                  >
                    Ver Demo
                  </Button>
                </Stack>

                {/* Métricas de Confianza */}
                <Grid container spacing={4}>
                  {metrics.map((metric, index) => (
                    <Grid item xs={6} key={index}>
                      <Box>
                        <Typography variant="h4" fontWeight={700}>{metric.value}</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.9rem' }}>
                          {metric.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Ilustración Corporativa */}
              <Box sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                p: 4,
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <Box sx={{
                  width: '100%',
                  height: '300px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.5) 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 3
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Business sx={{ fontSize: 80, mb: 2 }} />
                    <Typography variant="h5" fontWeight={600}>
                      Dashboard Ejecutivo
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Vista previa de la plataforma
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Interfaz intuitiva diseñada para ejecutivos
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sección de Industrias */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" fontWeight={700} color="#1f2937" gutterBottom>
            Soluciones para Todas las Industrias
          </Typography>
          <Typography variant="h6" color="#6b7280" sx={{ maxWidth: '700px', mx: 'auto' }}>
            Más de 15,000 empresas en 30+ industrias confían en nuestra plataforma
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {[
            { name: 'Tecnología', icon: '💻', count: '2,500+' },
            { name: 'Manufactura', icon: '🏭', count: '3,200+' },
            { name: 'Retail', icon: '🛍️', count: '4,100+' },
            { name: 'Salud', icon: '🏥', count: '1,800+' },
            { name: 'Finanzas', icon: '💰', count: '1,200+' },
            { name: 'Educación', icon: '🎓', count: '2,200+' }
          ].map((industry, index) => (
            <Grid item xs={6} md={4} key={index}>
              <Card sx={{ 
                textAlign: 'center',
                p: 3,
                border: '1px solid #e5e7eb',
                boxShadow: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#2563eb',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.1)'
                }
              }}>
                <Typography variant="h3" sx={{ mb: 2 }}>{industry.icon}</Typography>
                <Typography variant="h6" fontWeight={600} color="#1f2937">
                  {industry.name}
                </Typography>
                <Typography variant="body2" color="#6b7280">
                  {industry.count} empresas
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Características Principales */}
      <Box sx={{ background: '#f8fafc', py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" fontWeight={700} color="#1f2937" gutterBottom>
              Capacidades Enterprise
            </Typography>
            <Typography variant="h6" color="#6b7280">
              Diseñado para satisfacer los requisitos más exigentes
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom color="#1f2937">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="#6b7280" lineHeight={1.6}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonios Ejecutivos */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" fontWeight={700} color="#1f2937" gutterBottom>
            Testimonios de Liderazgo
          </Typography>
          <Typography variant="h6" color="#6b7280">
            Directivos comparten sus experiencias
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <People sx={{ fontSize: 40, color: '#2563eb', mr: 2 }} />
                    <Box>
                      <Typography variant="h6" fontWeight={600} color="#1f2937">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="#6b7280">
                        {testimonial.position}
                      </Typography>
                    </Box>
                  </div>
                  <Typography variant="body1" color="#4b5563" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.6 }}>
                    "{testimonial.content}"
                  </Typography>
                  <Typography variant="caption" color="#9ca3af">
                    {testimonial.company}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Final */}
      <Box sx={{ background: '#1f2937', color: 'white', py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              ¿Listo para Transformar su Empresa?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8, mb: 4, maxWidth: '600px', mx: 'auto' }}>
              Únase a las empresas líderes que ya optimizan sus operaciones con nuestra plataforma
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                endIcon={<ArrowForward />}
                sx={{
                  background: '#ffffff',
                  color: '#1f2937',
                  fontSize: '1.1rem',
                  px: 6,
                  py: 1.5,
                  fontWeight: 600,
                  minWidth: '220px',
                  '&:hover': {
                    background: '#f8fafc',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Comenzar Prueba Gratuita
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontSize: '1.1rem',
                  px: 6,
                  py: 1.5,
                  fontWeight: 600,
                  minWidth: '220px',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Iniciar Sesión
              </Button>
            </Stack>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              {[
                '✓ 14 días gratis',
                '✓ Sin tarjeta de crédito', 
                '✓ Implementación incluida',
                '✓ Soporte premium 24/7'
              ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', color: '#10b981' }}>
                  <CheckCircle sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer Minimalista */}
      <Box sx={{ background: '#111827', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Business sx={{ fontSize: 24, color: '#2563eb' }} />
              <Typography variant="h6" fontWeight={600}>
                UniversalBot
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2024 UniversalBot Platform. Todos los derechos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
