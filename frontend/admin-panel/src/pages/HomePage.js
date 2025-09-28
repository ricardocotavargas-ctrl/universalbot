import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon
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
  ArrowForward,
  ExpandMore,
  Star,
  Verified,
  CorporateFare,
  DashboardCustomize,
  SmartToy
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

  // Características premium con iconos impactantes
  const features = [
    {
      icon: <SmartToy sx={{ fontSize: 48, color: '#2563eb' }} />,
      title: 'IA Empresarial Avanzada',
      description: 'Algoritmos predictivos que optimizan automáticamente tus operaciones',
      benefits: ['Predicción de demanda', 'Optimización de inventario', 'Automatización inteligente']
    },
    {
      icon: <DashboardCustomize sx={{ fontSize: 48, color: '#059669' }} />,
      title: 'Dashboards Ejecutivos',
      description: 'Vistas personalizadas para cada departamento y nivel directivo',
      benefits: ['KPIs en tiempo real', 'Reportes automatizados', 'Alertas proactivas']
    },
    {
      icon: <CorporateFare sx={{ fontSize: 48, color: '#dc2626' }} />,
      title: 'Gestión Multi-Empresa',
      description: 'Control centralizado para todas tus empresas y subsidiarias',
      benefits: ['Consolidación financiera', 'Gestión de permisos', 'Reportes consolidados']
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: 48, color: '#7c3aed' }} />,
      title: 'Ecosistema de Integraciones',
      description: 'Conectores nativos para +500 aplicaciones empresariales',
      benefits: ['ERP/CRM nativos', 'APIs abiertas', 'Sincronización bidireccional']
    }
  ];

  // Planes de precios claros
  const pricingPlans = [
    {
      name: 'Startup',
      price: '$299',
      period: '/mes',
      description: 'Perfecto para empresas en crecimiento',
      features: [
        'Hasta 10 usuarios',
        '5GB almacenamiento',
        'Soporte por email',
        'Integraciones básicas'
      ],
      highlighted: false
    },
    {
      name: 'Enterprise',
      price: '$799',
      period: '/mes',
      description: 'Solución completa para empresas establecidas',
      features: [
        'Usuarios ilimitados',
        '100GB almacenamiento',
        'Soporte 24/7 prioritario',
        'Todas las integraciones',
        'IA avanzada incluida'
      ],
      highlighted: true
    },
    {
      name: 'Corporativo',
      price: 'Personalizado',
      period: '',
      description: 'Para organizaciones con necesidades específicas',
      features: [
        'Personalización total',
        'SLA 99.99% garantizado',
        'Account manager dedicado',
        'Opciones on-premise',
        'Soporte premium'
      ],
      highlighted: false
    }
  ];

  // Preguntas frecuentes ejecutivas
  const faqs = [
    {
      question: "¿Cuánto tiempo toma la implementación?",
      answer: "La implementación estándar toma 2-3 días. Contamos con un equipo especializado que se encarga de la migración de datos y capacitación."
    },
    {
      question: "¿Ofrecen soporte en español?",
      answer: "Sí, todo nuestro soporte técnico y documentación está disponible en español con especialistas locales."
    },
    {
      question: "¿Es escalable según mi crecimiento?",
      answer: "Completamente. La plataforma está diseñada para escalar desde startups hasta corporaciones multinacionales."
    },
    {
      question: "¿Qué garantías de seguridad ofrecen?",
      answer: "Certificaciones SOC 2, ISO 27001, encriptación end-to-end y cumplimiento GDPR completo."
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
      overflow: 'hidden'
    }}>
      
      {/* Header de Lujo */}
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
          <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Business sx={{ fontSize: 32, color: '#2563eb' }} />
                <Typography variant="h5" fontWeight={700}>
                  UniversalBot
                </Typography>
              </Box>
              
              <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Typography variant="body1" fontWeight={600} sx={{ cursor: 'pointer', '&:hover': { color: '#2563eb' } }}>
                  Características
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{ cursor: 'pointer', '&:hover': { color: '#2563eb' } }}>
                  Precios
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{ cursor: 'pointer', '&:hover': { color: '#2563eb' } }}>
                  Casos de Éxito
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{ cursor: 'pointer', '&:hover': { color: '#2563eb' } }}>
                  Contacto
                </Typography>
              </Stack>
            </Box>
            
            <Stack direction="row" spacing={2}>
              <Button 
                onClick={() => navigate('/login')}
                variant="outlined"
                sx={{ 
                  borderColor: '#2563eb',
                  color: '#2563eb',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'rgba(37, 99, 235, 0.1)'
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
                  }
                }}
              >
                Comenzar Gratis
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section - Impacto Inmediato */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 15 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                {/* Badge de Élite */}
                <Chip 
                  icon={<Verified />}
                  label="PLATAFORMA ENTERPRISE 2024"
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 600,
                    mb: 4,
                    fontSize: '0.8rem'
                  }}
                />

                <Typography variant="h1" sx={{
                  fontSize: { xs: '2.8rem', md: '4rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3
                }}>
                  La Plataforma Definitiva
                  <Box component="span" sx={{ display: 'block', color: '#dbeafe', fontWeight: 700 }}>
                    para Empresas Serias
                  </Box>
                </Typography>

                <Typography variant="h5" sx={{
                  fontWeight: 400,
                  lineHeight: 1.6,
                  mb: 4,
                  opacity: 0.9,
                  fontSize: '1.3rem'
                }}>
                  Más de 15,000 empresas confían en nosotros para optimizar sus operaciones, 
                  reducir costos y aumentar su rentabilidad con tecnología de clase mundial.
                </Typography>

                {/* Estadísticas de Impacto */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                  <Grid item xs={6} md={3}>
                    <Box>
                      <Typography variant="h3" fontWeight={800}>60%</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Reducción Costos</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box>
                      <Typography variant="h3" fontWeight={800}>3.2x</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>ROI Promedio</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box>
                      <Typography variant="h3" fontWeight={800}>45%</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Más Productividad</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box>
                      <Typography variant="h3" fontWeight={800}>99.99%</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Uptime</Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Botones de Acción Principales */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
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
                      fontWeight: 700,
                      borderRadius: '10px',
                      minWidth: '220px',
                      '&:hover': {
                        background: '#f8fafc',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    Prueba Gratuita 14 Días
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayArrow />}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontSize: '1.1rem',
                      px: 5,
                      py: 1.5,
                      fontWeight: 700,
                      minWidth: '220px',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#dbeafe'
                      }
                    }}
                  >
                    Ver Demo en Vivo
                  </Button>
                </Stack>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} sx={{ color: '#fbbf24', fontSize: 20 }} />
                    ))}
                    <Typography variant="body2" sx={{ ml: 1, opacity: 0.9 }}>4.9/5 en G2</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>•</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>Más de 15,000 empresas</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Dashboard Preview Élite */}
              <Box sx={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                p: 4,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}>
                <Box sx={{
                  width: '100%',
                  height: '400px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.5) 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 3,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 20, 
                    left: 20, 
                    background: 'rgba(255,255,255,0.2)', 
                    borderRadius: '8px', 
                    p: 1 
                  }}>
                    <Typography variant="h6" fontWeight={600}>Dashboard Ejecutivo</Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center', zIndex: 2 }}>
                    <DashboardCustomize sx={{ fontSize: 80, mb: 2 }} />
                    <Typography variant="h4" fontWeight={700}>
                      Vista Previa
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Interfaz empresarial premium
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

      {/* Sección de Características Élite */}
      <Container maxWidth="xl" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="h2" fontWeight={800} color="#1f2937" gutterBottom>
            Por Qué Somos la Elección de los Líderes
          </Typography>
          <Typography variant="h5" color="#6b7280" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Características diseñadas específicamente para las necesidades de empresas serias
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                height: '100%',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
                }
              }}>
                <CardContent sx={{ p: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                    <Box sx={{ 
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                      borderRadius: '12px',
                      p: 2,
                      minWidth: '80px'
                    }}>
                      {feature.icon}
                    </Box>
                    
                    <Box>
                      <Typography variant="h4" fontWeight={700} color="#1f2937" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="h6" color="#6b7280" sx={{ mb: 3, lineHeight: 1.5 }}>
                        {feature.description}
                      </Typography>
                      
                      <List dense>
                        {feature.benefits.map((benefit, idx) => (
                          <ListItem key={idx} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: '30px' }}>
                              <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} />
                            </ListItemIcon>
                            <Typography variant="body1">{benefit}</Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sección de Precios Transparente */}
      <Box sx={{ background: '#f8fafc', py: 12 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" fontWeight={800} color="#1f2937" gutterBottom>
              Precios Transparentes
            </Typography>
            <Typography variant="h5" color="#6b7280">
              Sin sorpresas. Elige el plan que mejor se adapte a tu empresa
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  border: plan.highlighted ? '2px solid #2563eb' : '1px solid #e5e7eb',
                  boxShadow: plan.highlighted ? '0 10px 30px rgba(37, 99, 235, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {plan.highlighted && (
                    <Box sx={{
                      background: '#2563eb',
                      color: 'white',
                      textAlign: 'center',
                      py: 1,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0
                    }}>
                      <Typography variant="body2" fontWeight={600}>MÁS POPULAR</Typography>
                    </Box>
                  )}
                  
                  <CardContent sx={{ p: 4, pt: plan.highlighted ? 6 : 4 }}>
                    <Typography variant="h4" fontWeight={800} color="#1f2937" gutterBottom>
                      {plan.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                      <Typography variant="h2" fontWeight={800} color="#2563eb">
                        {plan.price}
                      </Typography>
                      <Typography variant="h6" color="#6b7280" sx={{ ml: 1 }}>
                        {plan.period}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="#6b7280" sx={{ mb: 3 }}>
                      {plan.description}
                    </Typography>
                    
                    <List sx={{ mb: 3 }}>
                      {plan.features.map((feature, idx) => (
                        <ListItem key={idx} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: '30px' }}>
                            <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} />
                          </ListItemIcon>
                          <Typography variant="body1">{feature}</Typography>
                        </ListItem>
                      ))}
                    </List>
                    
                    <Button
                      variant={plan.highlighted ? "contained" : "outlined"}
                      fullWidth
                      size="large"
                      onClick={() => navigate('/register')}
                      sx={{
                        background: plan.highlighted ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'transparent',
                        borderColor: '#2563eb',
                        color: plan.highlighted ? 'white' : '#2563eb',
                        fontWeight: 600,
                        py: 1.5,
                        '&:hover': {
                          background: plan.highlighted ? 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)' : 'rgba(37, 99, 235, 0.1)'
                        }
                      }}
                    >
                      Comenzar Prueba
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="xl" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" fontWeight={800} color="#1f2937" gutterBottom>
            Preguntas Frecuentes
          </Typography>
          <Typography variant="h5" color="#6b7280">
            Respuestas a las dudas más comunes de nuestros clientes
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2, border: '1px solid #e5e7eb' }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6" fontWeight={600}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="#6b7280" lineHeight={1.6}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* Call to Action Final - Ultra Persuasive */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        py: 12
      }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" fontWeight={800} gutterBottom>
              ¿Listo para Revolucionar su Empresa?
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, mb: 4, maxWidth: '600px', mx: 'auto' }}>
              Únase a las empresas más innovadoras que ya están transformando sus operaciones
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                endIcon={<ArrowForward />}
                sx={{
                  background: '#ffffff',
                  color: '#2563eb',
                  fontSize: '1.1rem',
                  px: 6,
                  py: 1.5,
                  fontWeight: 700,
                  borderRadius: '10px',
                  minWidth: '250px',
                  '&:hover': {
                    background: '#f8fafc',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
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
                  fontWeight: 700,
                  minWidth: '250px',
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
              flexWrap: 'wrap',
              opacity: 0.9
            }}>
              {[
                '✓ 14 días gratis sin compromiso',
                '✓ Migración de datos incluida', 
                '✓ Soporte premium 24/7',
                '✓ Cancelación en cualquier momento'
              ].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer Profesional */}
      <Box sx={{ background: '#111827', color: 'white', py: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Business sx={{ fontSize: 32, color: '#2563eb' }} />
                <Typography variant="h5" fontWeight={700}>
                  UniversalBot
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.7, lineHeight: 1.6 }}>
                La plataforma de gestión empresarial más avanzada del mercado. 
                Diseñada para empresas serias que buscan resultados extraordinarios.
              </Typography>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Producto</Typography>
              <Stack spacing={1}>
                {['Características', 'Precios', 'Casos de Éxito', 'Demo'].map((item) => (
                  <Typography key={item} variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Empresa</Typography>
              <Stack spacing={1}>
                {['Nosotros', 'Blog', 'Carreras', 'Contacto'].map((item) => (
                  <Typography key={item} variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Contacto</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>contacto@universalbot.com</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>+1 (555) 123-4567</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Soporte 24/7 disponible</Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 4, textAlign: 'center' }}>
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
