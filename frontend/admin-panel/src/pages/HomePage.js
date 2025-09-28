import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  List, ListItem, ListItemIcon, Avatar
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
  ArrowForward,
  AutoGraph,
  Psychology,
  Cloud,
  SupportAgent
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [companyCount, setCompanyCount] = useState(14800);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    // Contador animado
    if (companyCount < 15000) {
      const interval = setInterval(() => {
        setCompanyCount(prev => {
          if (prev >= 15000) {
            clearInterval(interval);
            return 15000;
          }
          return prev + 10;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, navigate, companyCount]);

  if (isAuthenticated) {
    return null;
  }

  // Características con beneficios claros
  const features = [
    {
      icon: <Psychology sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: 'IA Predictiva Avanzada',
      description: 'Algoritmos de machine learning que anticipan tendencias del mercado y optimizan automáticamente tus operaciones',
      benefits: ['Predicción de demanda con 95% de precisión', 'Detección temprana de oportunidades', 'Recomendaciones inteligentes en tiempo real']
    },
    {
      icon: <AutoGraph sx={{ fontSize: 40, color: '#059669' }} />,
      title: 'Business Intelligence',
      description: 'Dashboards ejecutivos interactivos con análisis predictivo y reportes automatizados',
      benefits: ['KPIs personalizados por departamento', 'Alertas proactivas de desempeño', 'Benchmarking contra competidores']
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#dc2626' }} />,
      title: 'Seguridad Enterprise',
      description: 'Infraestructura con certificaciones SOC 2 Type II, ISO 27001 y compliance GDPR completo',
      benefits: ['Encriptación end-to-end AES-256', 'Auditorías de seguridad trimestrales', 'Backup automático y recovery']
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: 40, color: '#2563eb' }} />,
      title: 'Ecosistema de Integraciones',
      description: 'Conectores nativos para +500 aplicaciones empresariales con sincronización en tiempo real',
      benefits: ['ERP/CRM pre-configurados', 'APIs documentadas y soportadas', 'Migración de datos asistida']
    }
  ];

  // Testimonios con resultados específicos
  const testimonials = [
    {
      name: "María González",
      position: "CEO, TechSolutions Inc.",
      results: "62% reducción en costos operativos • 47% aumento en eficiencia",
      content: "UniversalBot transformó completamente nuestras operaciones. En 6 meses logramos resultados que no habíamos alcanzado en años con otras plataformas.",
      avatar: "MG"
    },
    {
      name: "Carlos Rodríguez",
      position: "Director de Operaciones, Global Manufacturing",
      results: "Unificación de 18 sistemas • Expansión a 3 nuevos mercados",
      content: "La capacidad de la plataforma para integrar todos nuestros sistemas legacy fue extraordinaria. El soporte durante la implementación fue impecable.",
      avatar: "CR"
    }
  ];

  // Métricas de impacto
  const metrics = [
    { value: `${companyCount.toLocaleString()}+`, label: 'Empresas Confían', description: 'En 30+ países' },
    { value: '99.99%', label: 'Tiempo de Actividad', description: 'SLA Enterprise garantizado' },
    { value: '4.9/5', label: 'Satisfacción Cliente', description: 'Basado en 2,500+ reviews' },
    { value: '3.2x', label: 'ROI Promedio', description: 'En los primeros 12 meses' }
  ];

  // Beneficios clave
  const keyBenefits = [
    'Reducción de costos operativos hasta en 60%',
    'Incremento de productividad del equipo en 45%',
    'Toma de decisiones basada en datos en tiempo real',
    'Escalabilidad ilimitada sin interrupciones',
    'Implementación rápida en menos de 48 horas',
    'Soporte técnico dedicado 24/7 en español'
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
      overflow: 'hidden'
    }}>
      
      {/* Header Profesional */}
      <AppBar 
        position="sticky"
        elevation={1}
        sx={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          color: '#1f2937',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            py: 2,
            px: { xs: 0, sm: 2 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Business sx={{ color: '#2563eb', fontSize: 32 }} />
              <Typography variant="h6" fontWeight={700}>
                UniversalBot
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={3}>
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
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  fontWeight: 600,
                  px: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Prueba Gratuita
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section - Atractiva y Persuasiva */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Chip 
                  label="PLATAFORMA ENTERPRISE 2024"
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 600,
                    mb: 4,
                    fontSize: '0.8rem',
                    backdropFilter: 'blur(10px)'
                  }}
                />

                <Typography variant="h1" sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3
                }}>
                  Transforma Tu Empresa
                  <Box component="span" sx={{ 
                    display: 'block', 
                    color: '#dbeafe',
                    fontWeight: 700
                  }}>
                    Con IA Avanzada
                  </Box>
                </Typography>

                <Typography variant="h6" sx={{
                  fontWeight: 400,
                  lineHeight: 1.6,
                  mb: 4,
                  opacity: 0.9
                }}>
                  La plataforma todo-en-uno que combina inteligencia artificial predictiva, 
                  analytics en tiempo real y automatización para impulsar el crecimiento 
                  y rentabilidad de tu negocio.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: '#ffffff',
                      color: '#2563eb',
                      fontSize: '1.1rem',
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      borderRadius: '8px',
                      '&:hover': {
                        background: '#f8fafc',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Comenzar Prueba Gratuita
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
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#dbeafe'
                      }
                    }}
                  >
                    Ver Demo en Vivo
                  </Button>
                </Stack>

                {/* Métricas de Impacto */}
                <Grid container spacing={4}>
                  {metrics.map((metric, index) => (
                    <Grid item xs={6} key={index}>
                      <Box>
                        <Typography variant="h4" fontWeight={800}>
                          {metric.value}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 600 }}>
                          {metric.label}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                          {metric.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                p: 4,
                textAlign: 'center',
                backdropFilter: 'blur(20px)',
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
                    <AutoGraph sx={{ fontSize: 80, mb: 2 }} />
                    <Typography variant="h4" fontWeight={700}>
                      Dashboard Ejecutivo
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Vista previa interactiva
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Disponible en</Typography>
                    <Typography variant="body1" fontWeight={600}>Web • Mobile • Desktop</Typography>
                  </Box>
                  <Chip 
                    label="Demo Interactiva" 
                    sx={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Beneficios Clave */}
      <Container maxWidth="lg" sx={{ 
        py: 8,
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#1f2937',
            mb: 3
          }}>
            Resultados Comprobados
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {keyBenefits.map((benefit, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 3,
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <CheckCircle sx={{ color: '#10b981', mr: 2, fontSize: 24 }} />
                <Typography variant="h6" fontWeight={600}>
                  {benefit}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Características Destacadas */}
      <Box sx={{ background: '#f8fafc', py: 8 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#1f2937',
              mb: 2
            }}>
              Tecnología de Vanguardia
            </Typography>
            <Typography variant="h6" sx={{ color: '#6b7280', maxWidth: '700px', mx: 'auto' }}>
              Características diseñadas específicamente para empresas que buscan ventaja competitiva
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  height: '100%',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
                  }
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={700} color="#1f2937" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="#6b7280" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                    
                    <List dense>
                      {feature.benefits.map((benefit, idx) => (
                        <ListItem key={idx} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: '30px' }}>
                            <CheckCircle sx={{ color: '#10b981', fontSize: 18 }} />
                          </ListItemIcon>
                          <Typography variant="body2" fontWeight={500}>
                            {benefit}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonios de Clientes */}
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
            Casos de Éxito
          </Typography>
          <Typography variant="h6" sx={{ color: '#6b7280' }}>
            Empresas líderes comparten sus resultados
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                height: '100%',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: '#2563eb', mr: 2, width: 50, height: 50 }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="#1f2937">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="#6b7280">
                        {testimonial.position}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Chip 
                    label={testimonial.results}
                    size="small"
                    sx={{ 
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      fontWeight: 600,
                      mb: 3
                    }}
                  />
                  
                  <Typography variant="body1" sx={{ 
                    color: '#4b5563', 
                    fontStyle: 'italic',
                    lineHeight: 1.6
                  }}>
                    "{testimonial.content}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Final */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
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
            ¿Listo para la Transformación?
          </Typography>
          
          <Typography variant="h5" sx={{ 
            opacity: 0.9, 
            mb: 4,
            maxWidth: '600px',
            mx: 'auto'
          }}>
            Únete a las empresas más innovadoras que ya están revolucionando sus operaciones
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                background: '#ffffff',
                color: '#2563eb',
                fontSize: '1.1rem',
                px: 6,
                py: 1.5,
                fontWeight: 700,
                minWidth: { xs: '100%', sm: '250px' },
                borderRadius: '8px',
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
                minWidth: { xs: '100%', sm: '250px' },
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
            gap: 4,
            flexWrap: 'wrap'
          }}>
            {[
              '7 días completamente gratis',
              'Sin tarjeta de crédito requerida', 
              'Implementación y soporte incluidos',
              'Cancelación instantánea'
            ].map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" fontWeight={500}>{item}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer Profesional */}
      <Box sx={{ background: '#111827', color: 'white', py: 6 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Business sx={{ fontSize: 32, color: '#2563eb' }} />
                <Typography variant="h5" fontWeight={700}>
                  UniversalBot
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.7, lineHeight: 1.6 }}>
                La plataforma de gestión empresarial más avanzada, diseñada para empresas 
                que buscan resultados extraordinarios mediante tecnología de vanguardia.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Contacto</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 1 }}>contacto@universalbot.com</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 1 }}>+1 (555) 123-4567</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Soporte 24/7 disponible</Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            mt: 4, 
            pt: 4, 
            textAlign: 'center' 
          }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2025 UniversalBot Platform. Todos los derechos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
