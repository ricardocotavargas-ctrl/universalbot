import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon,
  Drawer, IconButton, Dialog, DialogContent, DialogActions
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
  SmartToy,
  Menu as MenuIcon,
  Close,
  Language
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [companyCount, setCompanyCount] = useState(14800);

  // Efectos iniciales
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    // Simular carga
    setTimeout(() => setLoaded(true), 500);

    // Track time on page
    const timeInterval = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [isAuthenticated, navigate]);

  // Contador animado de empresas
  useEffect(() => {
    if (loaded && companyCount < 15000) {
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
  }, [loaded, companyCount]);

  // Testimonios rotativos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Exit intent popup
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 0 && timeOnPage > 10 && !showExitPopup) {
        setShowExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [timeOnPage, showExitPopup]);

  if (isAuthenticated) {
    return null;
  }

  const handleSignupClick = () => {
    navigate('/register');
  };

  const handleDemoClick = () => {
    // Aquí iría la lógica para abrir el demo
    console.log('Abrir demo');
  };

  // Datos optimizados
  const features = [
    {
      icon: <SmartToy sx={{ fontSize: isMobile ? 40 : 48, color: '#2563eb' }} />,
      title: 'IA Empresarial Avanzada',
      description: 'Algoritmos predictivos que optimizan automáticamente tus operaciones y reducen costos',
      benefits: ['Predicción de demanda inteligente', 'Optimización automática de inventario', 'Automatización de procesos con IA']
    },
    {
      icon: <DashboardCustomize sx={{ fontSize: isMobile ? 40 : 48, color: '#059669' }} />,
      title: 'Dashboards Ejecutivos',
      description: 'Vistas personalizadas para cada departamento con KPIs en tiempo real',
      benefits: ['Métricas en tiempo real', 'Reportes automatizados', 'Alertas proactivas personalizadas']
    },
    {
      icon: <CorporateFare sx={{ fontSize: isMobile ? 40 : 48, color: '#dc2626' }} />,
      title: 'Gestión Multi-Empresa',
      description: 'Control centralizado para todas tus empresas, subsidiarias y departamentos',
      benefits: ['Consolidación financiera automática', 'Gestión granular de permisos', 'Reportes consolidados cross-empresa']
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: isMobile ? 40 : 48, color: '#7c3aed' }} />,
      title: 'Ecosistema de Integraciones',
      description: 'Conectores nativos para +500 aplicaciones empresariales líderes del mercado',
      benefits: ['ERP/CRM nativos pre-configurados', 'APIs abiertas y documentadas', 'Sincronización bidireccional en tiempo real']
    }
  ];

  const testimonials = [
    {
      name: "María González",
      position: "CEO, TechSolutions Inc.",
      company: "Empresa Fortune 500",
      content: "Implementamos UniversalBot en todas nuestras operaciones globales. En 6 meses redujimos costos operativos en 62% y aumentamos la eficiencia del equipo en 47%. La plataforma paga por sí misma.",
      rating: 5,
      results: ["-62% costos operativos", "+47% eficiencia", "ROI: 3.8x"]
    },
    {
      name: "Carlos Rodríguez",
      position: "Director de Operaciones",
      company: "Global Manufacturing Corp", 
      content: "La migración fue impecable. Unificamos 18 sistemas diferentes en una sola plataforma. El soporte 24/7 ha sido excepcional y la escalabilidad nos permitió expandirnos a 3 nuevos mercados.",
      rating: 5,
      results: ["18 sistemas unificados", "Expansión a 3 mercados", "Soporte 24/7"]
    },
    {
      name: "Ana Martínez",
      position: "CTO, InnovateCorp",
      company: "Unicornio Tecnológico",
      content: "La seguridad y confiabilidad del sistema son extraordinarias. Nuestros inversionistas quedaron impresionados con la implementación. La plataforma crece con nosotros sin límites.",
      rating: 5,
      results: ["Seguridad enterprise", "Escalabilidad ilimitada", "Implementación rápida"]
    }
  ];

  const metrics = [
    { value: '15,000+', label: 'Empresas Confían', description: 'En 30+ países' },
    { value: '99.99%', label: 'Uptime Garantizado', description: 'SLA enterprise' },
    { value: '4.9/5', label: 'Satisfacción Cliente', description: 'Basado en 2,500+ reviews' },
    { value: '60%', label: 'Reducción Costos', description: 'Promedio en primeros 6 meses' }
  ];

  const faqs = [
    {
      question: "¿Cuánto tiempo toma la implementación completa?",
      answer: "La implementación estándar toma 2-3 días. Contamos con un equipo especializado que maneja toda la migración de datos, configuración y capacitación. Para implementaciones enterprise complejas, el tiempo puede extenderse a 1-2 semanas con planificación dedicada."
    },
    {
      question: "¿Ofrecen soporte técnico en español 24/7?",
      answer: "Sí, todo nuestro soporte técnico, documentación y capacitación está disponible en español con especialistas locales. Ofrecemos soporte 24/7/365 a través de múltiples canales: chat en vivo, teléfono, email y videollamadas."
    },
    {
      question: "¿La plataforma es escalable para empresas en crecimiento?",
      answer: "Completamente escalable. La arquitectura está diseñada para crecer desde startups hasta corporaciones multinacionales. Soporta desde 1 hasta 10,000+ usuarios concurrentes sin degradación de performance."
    },
    {
      question: "¿Qué certificaciones de seguridad tienen?",
      answer: "Contamos con certificaciones SOC 2 Type II, ISO 27001, GDPR compliance completo, HIPAA para sector salud y encriptación end-to-end AES-256. Realizamos auditorías de seguridad trimestrales."
    },
    {
      question: "¿Ofrecen prueba gratuita sin compromiso?",
      answer: "Sí, ofrecemos 14 días de prueba gratuita completa con todas las funcionalidades enterprise. No requiere tarjeta de crédito y incluye soporte técnico durante el periodo de prueba. Cancelación instantánea sin penalidades."
    }
  ];

  // Mobile Menu Component
  const MobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          maxWidth: '400px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          color: 'white'
        }
      }}
    >
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Business sx={{ fontSize: 32, color: 'white' }} />
          <Typography variant="h6" fontWeight={700}>UniversalBot</Typography>
        </Box>
        <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </Box>
      
      <Stack spacing={0} sx={{ p: 3 }}>
        {['Características', 'Precios', 'Casos de Éxito', 'FAQ', 'Contacto'].map((item) => (
          <Button 
            key={item}
            fullWidth 
            sx={{ 
              color: 'white', 
              justifyContent: 'flex-start',
              fontSize: '1.1rem',
              py: 2.5,
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              '&:hover': {
                background: 'rgba(255,255,255,0.1)'
              }
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item}
          </Button>
        ))}
        
        <Box sx={{ pt: 3, borderTop: '1px solid rgba(255,255,255,0.2)', mt: 2 }}>
          <Button 
            fullWidth 
            variant="outlined"
            sx={{ 
              borderColor: 'white', 
              color: 'white',
              mb: 2,
              py: 1.5,
              fontSize: '1rem',
              '&:hover': {
                background: 'rgba(255,255,255,0.1)'
              }
            }}
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/login');
            }}
          >
            Iniciar Sesión
          </Button>
          <Button 
            fullWidth 
            variant="contained"
            sx={{ 
              background: 'white',
              color: '#2563eb',
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                background: '#f8fafc',
                transform: 'translateY(-1px)'
              }
            }}
            onClick={() => {
              setMobileMenuOpen(false);
              handleSignupClick();
            }}
          >
            Comenzar Gratis
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );

  // Exit Intent Popup
  const ExitPopup = () => (
    <Dialog 
      open={showExitPopup} 
      onClose={() => setShowExitPopup(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent sx={{ p: 4, textAlign: 'center' }}>
        <Business sx={{ fontSize: 48, color: '#2563eb', mb: 2 }} />
        <Typography variant="h5" fontWeight={700} gutterBottom>
          ¿Necesitas más información?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Habla con nuestro equipo de especialistas. Te ayudaremos a encontrar la solución perfecta para tu empresa.
        </Typography>
        
        <Stack spacing={2}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setShowExitPopup(false);
              handleDemoClick();
            }}
            sx={{ py: 1.5 }}
          >
            Agendar Demo Personalizado
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowExitPopup(false)}
          >
            Continuar Navegando
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#ffffff',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* Header Profesional */}
      <AppBar 
        position="sticky"
        elevation={1}
        sx={{ 
          background: 'rgba(255, 255, 255, 0.97)',
          backdropFilter: 'blur(20px)',
          color: '#1f2937',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            py: 1,
            minHeight: '70px !important'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Business sx={{ 
                fontSize: { xs: 28, md: 32 }, 
                color: '#2563eb' 
              }} />
              <Typography variant="h6" fontWeight={700} sx={{ 
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                UniversalBot
              </Typography>
            </Box>
            
            {/* Desktop Navigation */}
            <Stack 
              direction="row" 
              spacing={3} 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center'
              }}
            >
              {['Características', 'Precios', 'Casos de Éxito', 'FAQ'].map((item) => (
                <Typography 
                  key={item}
                  variant="body1" 
                  fontWeight={600} 
                  sx={{ 
                    cursor: 'pointer', 
                    '&:hover': { color: '#2563eb' },
                    transition: 'color 0.2s ease'
                  }}
                >
                  {item}
                </Typography>
              ))}
              
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
                onClick={handleSignupClick}
                sx={{ 
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Comenzar Gratis
              </Button>
            </Stack>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' } }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileMenu />
      <ExitPopup />

      {/* Hero Section - Ultra Optimizada */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Elementos de fondo */}
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
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Chip 
                  icon={<Verified />}
                  label="PLATAFORMA ENTERPRISE 2024"
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    fontSize: { xs: '0.7rem', md: '0.8rem' },
                    backdropFilter: 'blur(10px)'
                  }}
                />

                <Typography variant="h1" sx={{
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  Gestión Empresarial
                  <Box component="span" sx={{ 
                    display: 'block', 
                    color: '#dbeafe', 
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' }
                  }}>
                    Inteligente
                  </Box>
                </Typography>

                <Typography variant="h6" sx={{
                  fontWeight: 400,
                  lineHeight: 1.6,
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                }}>
                  La plataforma todo-en-uno que combina IA avanzada, analytics predictivo 
                  y automatización para transformar digitalmente tu empresa. 
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    {' '}Diseñada para el crecimiento.
                  </Box>
                </Typography>

                {/* Botones de Acción */}
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  sx={{ 
                    mb: 4,
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSignupClick}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: '#ffffff',
                      color: '#2563eb',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      px: { xs: 3, md: 4 },
                      py: 1.5,
                      fontWeight: 700,
                      minWidth: { xs: '100%', sm: 'auto' },
                      borderRadius: '10px',
                      '&:hover': {
                        background: '#f8fafc',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Comenzar Gratis
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayArrow />}
                    onClick={handleDemoClick}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      px: { xs: 3, md: 4 },
                      py: 1.5,
                      fontWeight: 600,
                      minWidth: { xs: '100%', sm: 'auto' },
                      borderRadius: '10px',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#dbeafe',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Ver Demo
                  </Button>
                </Stack>

                {/* Estadísticas */}
                <Grid container spacing={3}>
                  {metrics.map((metric, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight={800}>
                          {metric.value}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 600 }}>
                          {metric.label}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
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
                borderRadius: '20px',
                p: { xs: 3, md: 4 },
                textAlign: 'center',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <Box sx={{
                  width: '100%',
                  height: { xs: '250px', md: '320px' },
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
                    top: 16, 
                    left: 16, 
                    background: 'rgba(255,255,255,0.2)', 
                    borderRadius: '8px', 
                    p: 1,
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Typography variant="body2" fontWeight={600}>Dashboard Ejecutivo</Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center', zIndex: 2 }}>
                    <DashboardCustomize sx={{ 
                      fontSize: { xs: 60, md: 80 }, 
                      mb: 2 
                    }} />
                    <Typography variant="h4" fontWeight={700}>
                      Vista Previa
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Interfaz empresarial premium
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Disponible en</Typography>
                    <Typography variant="body1" fontWeight={600}>Web • Mobile • Desktop</Typography>
                  </Box>
                  <Chip 
                    label="Demo Interactiva" 
                    sx={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sección de Características */}
      <Container maxWidth="lg" sx={{ 
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 800,
            color: '#1f2937',
            mb: 2
          }}>
            Por Qué Elegir UniversalBot
          </Typography>
          <Typography variant="h6" sx={{
            color: '#6b7280',
            maxWidth: '700px',
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6
          }}>
            Características diseñadas específicamente para las necesidades complejas 
            de empresas modernas que buscan eficiencia y crecimiento.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                height: '100%',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  borderColor: '#2563eb'
                }
              }}>
                <CardContent sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: { xs: 2, md: 3 },
                    flexDirection: { xs: 'column', sm: 'row' },
                    textAlign: { xs: 'center', sm: 'left' },
                    height: '100%'
                  }}>
                    <Box sx={{ 
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                      borderRadius: '16px',
                      p: 3,
                      minWidth: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {feature.icon}
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" fontWeight={700} color="#1f2937" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="#6b7280" sx={{ mb: 3, lineHeight: 1.6 }}>
                        {feature.description}
                      </Typography>
                      
                      <List dense sx={{ py: 0 }}>
                        {feature.benefits.map((benefit, idx) => (
                          <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: '32px' }}>
                              <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} />
                            </ListItemIcon>
                            <Typography variant="body1" fontWeight={500}>
                              {benefit}
                            </Typography>
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

      {/* Sección de Testimonios */}
      <Box sx={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography variant="h2" sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              color: '#1f2937',
              mb: 2
            }}>
              Confiado por Líderes
            </Typography>
            <Typography variant="h6" sx={{ color: '#6b7280', maxWidth: '600px', mx: 'auto' }}>
              Empresas de todos los tamaños comparten sus experiencias transformadoras
            </Typography>
          </Box>

          <Box sx={{ position: 'relative', minHeight: '300px' }}>
            {testimonials.map((testimonial, index) => (
              <Box
                key={index}
                sx={{
                  display: currentTestimonial === index ? 'block' : 'none',
                  animation: currentTestimonial === index ? 'fadeIn 0.5s ease-in' : 'none',
                  '@keyframes fadeIn': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                  }
                }}
              >
                <Card sx={{ 
                  maxWidth: '800px', 
                  mx: 'auto',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)'
                }}>
                  <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: '#fbbf24', fontSize: 24, mr: 0.5 }} />
                      ))}
                    </Box>
                    
                    <Typography variant="h4" sx={{ 
                      color: '#1f2937', 
                      fontStyle: 'italic',
                      mb: 4,
                      lineHeight: 1.6,
                      fontSize: { xs: '1.25rem', md: '1.5rem' }
                    }}>
                      "{testimonial.content}"
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight={700} color="#1f2937">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body1" color="#059669" fontWeight={600}>
                          {testimonial.position}
                        </Typography>
                        <Typography variant="body2" color="#6b7280">
                          {testimonial.company}
                        </Typography>
                      </Box>
                      
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                        {testimonial.results.map((result, idx) => (
                          <Chip
                            key={idx}
                            label={result}
                            size="small"
                            sx={{
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: 'white',
                              fontWeight: 600
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
            
            {/* Indicadores */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  sx={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: currentTestimonial === index ? '#2563eb' : '#d1d5db',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
                    '&:hover': {
                      background: currentTestimonial === index ? '#1d4ed8' : '#9ca3af'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Sección FAQ */}
      <Container maxWidth="lg" sx={{ 
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 800,
            color: '#1f2937',
            mb: 2
          }}>
            Preguntas Frecuentes
          </Typography>
          <Typography variant="h6" sx={{ color: '#6b7280', maxWidth: '600px', mx: 'auto' }}>
            Respuestas a las dudas más comunes de nuestros clientes empresariales
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion 
              key={index} 
              sx={{ 
                mb: 2, 
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                '&:before': { display: 'none' },
                borderRadius: '8px !important',
                overflow: 'hidden'
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMore sx={{ color: '#2563eb' }} />}
                sx={{ 
                  background: '#f8fafc',
                  '&:hover': { background: '#f1f5f9' },
                  py: 2
                }}
              >
                <Typography variant="h6" fontWeight={600} color="#1f2937">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ background: 'white', py: 3 }}>
                <Typography variant="body1" color="#6b7280" lineHeight={1.7}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* Call to Action Final */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        py: { xs: 8, md: 12 }
      }}>
        <Container maxWidth="lg" sx={{ 
          px: { xs: 2, sm: 3 },
          textAlign: 'center' 
        }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 800,
            mb: 2
          }}>
            ¿Listo para Transformar su Empresa?
          </Typography>
          
          <Typography variant="h5" sx={{ 
            opacity: 0.9, 
            mb: 4,
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6
          }}>
            Únase a las más de <Box component="span" fontWeight={700}>{companyCount.toLocaleString()}+</Box> empresas 
            que ya están revolucionando sus operaciones con UniversalBot
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
              onClick={handleSignupClick}
              endIcon={<ArrowForward />}
              sx={{
                background: '#ffffff',
                color: '#2563eb',
                fontSize: { xs: '1rem', md: '1.1rem' },
                px: { xs: 4, md: 6 },
                py: 1.5,
                fontWeight: 700,
                minWidth: { xs: '100%', sm: '240px' },
                borderRadius: '10px',
                '&:hover': {
                  background: '#f8fafc',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
                },
                transition: 'all 0.3s ease'
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
                fontSize: { xs: '1rem', md: '1.1rem' },
                px: { xs: 4, md: 6 },
                py: 1.5,
                fontWeight: 600,
                minWidth: { xs: '100%', sm: '240px' },
                borderRadius: '10px',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderColor: '#dbeafe',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Iniciar Sesión
            </Button>
          </Stack>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: { xs: 2, sm: 4 },
            flexWrap: 'wrap',
            opacity: 0.9
          }}>
            {[
              '14 días gratis sin compromiso',
              'Sin tarjeta de crédito requerida', 
              'Implementación y migración incluida',
              'Soporte premium 24/7 en español'
            ].map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" fontWeight={500}>{item}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer Completo */}
      <Box sx={{ background: '#111827', color: 'white', py: 6 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Business sx={{ fontSize: 32, color: '#2563eb' }} />
                <Typography variant="h5" fontWeight={700}>
                  UniversalBot
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.7, lineHeight: 1.6, mb: 3 }}>
                La plataforma de gestión empresarial más avanzada del mercado. 
                Diseñada para empresas serias que buscan resultados extraordinarios 
                mediante tecnología de vanguardia.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Language sx={{ fontSize: 20, opacity: 0.7 }} />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Español • English • Português
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Producto</Typography>
              <Stack spacing={1}>
                {['Características', 'Precios', 'Casos de Éxito', 'Demo', 'Integraciones'].map((item) => (
                  <Typography 
                    key={item}
                    variant="body2" 
                    sx={{ 
                      opacity: 0.7, 
                      cursor: 'pointer', 
                      '&:hover': { opacity: 1, color: '#60a5fa' },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Empresa</Typography>
              <Stack spacing={1}>
                {['Nosotros', 'Blog', 'Carreras', 'Contacto', 'Socios'].map((item) => (
                  <Typography 
                    key={item}
                    variant="body2" 
                    sx={{ 
                      opacity: 0.7, 
                      cursor: 'pointer', 
                      '&:hover': { opacity: 1, color: '#60a5fa' },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Contacto</Typography>
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>📧 contacto@universalbot.com</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>📞 +1 (555) 123-4567</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>🕒 Soporte 24/7/365</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>🏢 Oficinas en 5 países</Typography>
              </Stack>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label="SOC 2 Certified" 
                  size="small" 
                  sx={{ background: '#059669', color: 'white', fontSize: '0.7rem' }} 
                />
                <Chip 
                  label="GDPR Compliant" 
                  size="small" 
                  sx={{ background: '#2563eb', color: 'white', fontSize: '0.7rem' }} 
                />
                <Chip 
                  label="ISO 27001" 
                  size="small" 
                  sx={{ background: '#dc2626', color: 'white', fontSize: '0.7rem' }} 
                />
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            mt: 4, 
            pt: 4, 
            textAlign: 'center' 
          }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2025 UniversalBot Platform. Todos los derechos reservados. | 
              <Box component="span" sx={{ ml: 1 }}>
                Política de Privacidad • Términos de Servicio • Security
              </Box>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
