import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  List, ListItem, ListItemIcon, Tabs, Tab, Paper,
  IconButton, Divider, Fade, Zoom, Slide, useScrollTrigger,
  Fab, Alert, Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Business,
  CheckCircle,
  PlayArrow,
  TrendingUp,
  Analytics,
  AutoGraph,
  PointOfSale,
  Inventory,
  AccountBalance,
  Campaign,
  ShoppingCart,
  Insights,
  Inventory2,
  BarChart,
  RocketLaunch,
  SmartToy,
  Security,
  ArrowForward,
  Star,
  Menu as MenuIcon,
  Close as CloseIcon,
  People,
  Speed,
  IntegrationInstructions,
  Psychology,
  AttachMoney,
  Assessment,
  Receipt,
  PieChart,
  Timeline,
  PeopleAlt,
  KeyboardArrowUp,
  WhatsApp,
  LiveTv,
  EmojiEvents,
  GppGood,
  AccessTime,
  VerifiedUser,
  ArrowRightAlt,
  TouchApp
} from '@mui/icons-material';

// Componentes lazy para mejor performance
const DashboardPreview = lazy(() => import('../components/DashboardPreview'));
const AnimatedStatsSection = lazy(() => import('../components/AnimatedStatsSection'));

// Hook personalizado para animaciones
const useCountAnimation = (target, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};

// Componente de testimonio
const TestimonialCard = ({ name, company, role, content, avatar, rating }) => (
  <Card sx={{ 
    p: 3, 
    height: '100%',
    background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(37, 99, 235, 0.15)'
    }
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Box sx={{ 
        width: 50, 
        height: 50, 
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        mr: 2
      }}>
        {avatar}
      </Box>
      <Box>
        <Typography variant="h6" fontWeight={700}>{name}</Typography>
        <Typography variant="body2" color="#6b7280">{role} • {company}</Typography>
      </Box>
    </Box>
    
    <Box sx={{ display: 'flex', mb: 2 }}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} sx={{ 
          color: i < rating ? '#f59e0b' : '#e5e7eb',
          fontSize: '1rem'
        }} />
      ))}
    </Box>
    
    <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#4b5563' }}>
      "{content}"
    </Typography>
  </Card>
);

// Componente de característica destacada
const FeatureHighlight = ({ icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Zoom in={isVisible} timeout={800}>
      <Box sx={{ 
        textAlign: 'center',
        p: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}>
        <Box sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          borderRadius: '20px',
          width: 70,
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: 'white',
          fontSize: '2rem'
        }}>
          {icon}
        </Box>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="#6b7280">
          {description}
        </Typography>
      </Box>
    </Zoom>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [companyCount, setCompanyCount] = useState(14800);
  const [activeTab, setActiveTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showDemoAlert, setShowDemoAlert] = useState(false);

  // Estadísticas animadas
  const animatedStats = {
    efficiency: useCountAnimation(89),
    growth: useCountAnimation(156),
    automation: useCountAnimation(92),
    revenue: useCountAnimation(245)
  };

  // Efecto para el contador de empresas
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    const interval = setInterval(() => {
      setCompanyCount(prev => prev >= 18500 ? 18500 : prev + 25);
    }, 30);

    return () => clearInterval(interval);
  }, [isAuthenticated, navigate]);

  // Efecto para el botón de scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDemoRequest = () => {
    setShowDemoAlert(true);
    // Aquí podrías integrar con un servicio de calendario o CRM
    setTimeout(() => {
      window.open('https://calendly.com/universalbot-ai/demo', '_blank');
    }, 1000);
  };

  if (isAuthenticated) return null;

  // Datos para testimonios
  const testimonials = [
    {
      name: "María González",
      company: "TechSolutions Inc",
      role: "CEO",
      avatar: "MG",
      rating: 5,
      content: "En 48 horas aumentamos nuestras ventas un 30%. La IA predijo tendencias que ni nuestro equipo más experimentado había detectado."
    },
    {
      name: "Carlos Rodríguez",
      company: "RetailPro",
      role: "Director de Operaciones",
      avatar: "CR",
      rating: 5,
      content: "La automatización del inventario nos ahorró 40 horas semanales en trabajo manual. El ROI fue inmediato."
    },
    {
      name: "Ana Martínez",
      company: "StartupInnovation",
      role: "Fundadora",
      avatar: "AM",
      rating: 5,
      content: "Como startup, cada recurso cuenta. UniversalBot AI fue el multiplicador de fuerza que necesitábamos para competir con grandes empresas."
    }
  ];

  // Características principales
  const mainFeatures = [
    {
      icon: "🤖",
      title: "IA Predictiva Avanzada",
      description: "Anticipa tendencias del mercado y comportamientos de clientes con 94% de precisión"
    },
    {
      icon: "⚡",
      title: "Implementación Instantánea",
      description: "Comienza en 5 minutos sin necesidad de capacitación técnica"
    },
    {
      icon: "💰",
      title: "ROI Comprobado",
      description: "Clientes reportan un retorno de inversión promedio de 3x en el primer trimestre"
    },
    {
      icon: "🔒",
      title: "Seguridad Enterprise",
      description: "Certificación SOC2 y encriptación bancaria para tu tranquilidad"
    }
  ];

  // Problemas que resolvemos
  const painPoints = [
    {
      problem: "❌ Pérdida de oportunidades de venta",
      solution: "✅ IA detecta clientes potenciales 24/7",
      result: "+45% conversiones"
    },
    {
      problem: "❌ Exceso de trabajo manual",
      solution: "✅ Automatización inteligente de procesos",
      result: "-70% tiempo operativo"
    },
    {
      problem: "❌ Decisiones basadas en intuición",
      solution: "✅ Analytics predictivo en tiempo real",
      result: "+89% precisión"
    },
    {
      problem: "❌ Crecimiento estancado",
      solution: "✅ Estrategias de escalamiento IA",
      result: "+156% crecimiento"
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* Elementos decorativos de fondo */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '600px',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, transparent 100%)',
        opacity: 0.02,
        zIndex: 0
      }} />

      {/* Alertas y Notificaciones */}
      <Snackbar 
        open={showDemoAlert} 
        autoHideDuration={4000} 
        onClose={() => setShowDemoAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          ¡Perfecto! Te estamos redirigiendo a nuestro calendario para agendar tu demo personalizado
        </Alert>
      </Snackbar>

      {/* Header Mejorado */}
      <AppBar position="sticky" elevation={0} sx={{ 
        background: 'rgba(255,255,255,0.98)', 
        color: '#1f2937',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        py: 1,
        zIndex: 1100
      }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            minHeight: { xs: '60px', md: '70px' } 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => scrollToTop()}>
              <Box sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <SmartToy sx={{ color: 'white', fontSize: { xs: 24, md: 28 } }} />
              </Box>
              <Typography variant="h6" fontWeight={800} sx={{ 
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                background: 'linear-gradient(135deg, #1e293b 0%, #374151 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                UniversalBot<span style={{ color: '#2563eb' }}>AI</span>
              </Typography>
              <Chip 
                label="BETA" 
                size="small" 
                sx={{ 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.7rem'
                }}
              />
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Stack direction="row" spacing={2} alignItems="center">
                <Button 
                  startIcon={<LiveTv />}
                  onClick={handleDemoRequest}
                  sx={{ 
                    color: '#374151', 
                    fontWeight: 600,
                    borderRadius: '10px',
                    px: 3
                  }}
                >
                  Demo en Vivo
                </Button>
                <Button onClick={() => navigate('/login')} sx={{ 
                  color: '#374151', 
                  fontWeight: 600,
                  borderRadius: '10px',
                  px: 3
                }}>
                  Iniciar Sesión
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/register')}
                  sx={{ 
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    fontWeight: 700,
                    borderRadius: '10px',
                    px: 4,
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Probar Gratis
                </Button>
              </Stack>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                sx={{ color: '#374151' }}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Toolbar>

          {/* Mobile Menu */}
          {isMobile && mobileMenuOpen && (
            <Fade in={mobileMenuOpen}>
              <Box sx={{ 
                py: 2, 
                borderTop: '1px solid #e5e7eb',
                background: 'white'
              }}>
                <Stack spacing={1}>
                  <Button 
                    fullWidth
                    startIcon={<LiveTv />}
                    onClick={handleDemoRequest}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Demo en Vivo
                  </Button>
                  <Button 
                    fullWidth
                    onClick={() => navigate('/login')}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button 
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/register')}
                    sx={{ 
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      fontWeight: 700
                    }}
                  >
                    Probar Gratis
                  </Button>
                </Stack>
              </Box>
            </Fade>
          )}
        </Container>
      </AppBar>

      {/* Hero Section Ultra Persuasive */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)', 
        color: 'white', 
        py: { xs: 6, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Elementos decorativos */}
        <Box sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                
                {/* Badge de oferta limitada */}
                <Box sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '20px',
                  px: 3,
                  py: 1,
                  mb: 3,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <Typography variant="caption" fontWeight={700} sx={{ mr: 1 }}>
                    🚀 OFERTA DE LANZAMIENTO
                  </Typography>
                  <Chip 
                    label="75% OFF" 
                    size="small" 
                    sx={{ 
                      background: '#22c55e',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>

                <Typography variant="h1" sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }, 
                  fontWeight: 900, 
                  lineHeight: 1.1, 
                  mb: 3,
                  textShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                  Tu Empresa en
                  <Box component="span" sx={{ 
                    display: 'block', 
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}>
                    Piloto Automático
                  </Box>
                </Typography>

                <Typography variant="h5" sx={{ 
                  opacity: 0.95, 
                  lineHeight: 1.6, 
                  mb: 4,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  maxWidth: '500px',
                  mx: { xs: 'auto', md: '0' }
                }}>
                  La primera plataforma de <strong>IA empresarial completa</strong> que 
                  automatiza ventas, marketing y operaciones mientras tú duermes.
                </Typography>

                {/* Social Proof Inmediata */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3, 
                  mb: 4,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  flexWrap: 'wrap'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} sx={{ color: '#fbbf24', fontSize: '1.2rem' }} />
                      ))}
                    </Box>
                    <Typography variant="body2" fontWeight={600}>
                      4.9/5
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <People sx={{ color: '#22c55e' }} />
                    <Typography variant="body2" fontWeight={600}>
                      {companyCount.toLocaleString()}+ empresas
                    </Typography>
                  </Box>
                </Box>

                {/* CTA Principal */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ 
                  mb: 6,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    startIcon={<RocketLaunch />}
                    sx={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                      color: '#2563eb',
                      fontWeight: 800,
                      px: { xs: 4, md: 6 },
                      py: 2,
                      borderRadius: '15px',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      minWidth: { xs: '100%', sm: 'auto' },
                      boxShadow: '0 10px 30px rgba(255,255,255,0.2)',
                      '&:hover': { 
                        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 15px 40px rgba(255,255,255,0.3)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Comenzar Gratis - 0€
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleDemoRequest}
                    startIcon={<PlayArrow />}
                    sx={{
                      borderColor: 'rgba(255,255,255,0.4)',
                      color: 'white',
                      fontWeight: 600,
                      px: { xs: 4, md: 5 },
                      py: 2,
                      borderRadius: '15px',
                      backdropFilter: 'blur(10px)',
                      minWidth: { xs: '100%', sm: 'auto' },
                      borderWidth: '2px',
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-3px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Ver Demo en Vivo
                  </Button>
                </Stack>

                {/* Garantía destacada */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    background: 'rgba(34, 197, 94, 0.2)',
                    px: 2,
                    py: 1,
                    borderRadius: '10px'
                  }}>
                    <VerifiedUser sx={{ fontSize: 18, color: '#22c55e' }} />
                    <Typography variant="body2" fontWeight={600}>
                      Garantía de resultados 30 días
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Suspense fallback={<Box sx={{ height: '420px', background: 'rgba(255,255,255,0.1)', borderRadius: '24px' }} />}>
                <DashboardPreview />
              </Suspense>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sección: El Problema vs La Solución */}
      <Container sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip 
            label="🚀 TRANSFORMACIÓN DIGITAL" 
            sx={{ 
              mb: 3, 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              color: '#2563eb',
              fontSize: '0.9rem',
              py: 1
            }}
          />
          <Typography variant="h2" sx={{ 
            fontSize: { xs: '2rem', md: '2.8rem' }, 
            fontWeight: 800, 
            mb: 2 
          }}>
            ¿Sientes que tu negocio podría
            <Box component="span" color="#2563eb" sx={{ display: 'block' }}>
              rendir más?
            </Box>
          </Typography>
          <Typography variant="h6" sx={{ color: '#6b7280', maxWidth: '700px', mx: 'auto' }}>
            Identificamos los principales desafíos que enfrentan las empresas y cómo la IA los resuelve
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {painPoints.map((point, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                p: 4,
                height: '100%',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 15px 40px rgba(37, 99, 235, 0.1)'
                }
              }}>
                <Typography variant="h6" fontWeight={700} color="#ef4444" gutterBottom>
                  {point.problem}
                </Typography>
                <Typography variant="body1" fontWeight={600} color="#059669" sx={{ mb: 2 }}>
                  {point.solution}
                </Typography>
                <Box sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  px: 3,
                  py: 1,
                  borderRadius: '10px',
                  fontWeight: 800
                }}>
                  {point.result}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sección de Estadísticas Animadas */}
      <Suspense fallback={<div>Cargando estadísticas...</div>}>
        <AnimatedStatsSection />
      </Suspense>

      {/* Sección: Características Destacadas */}
      <Container sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ 
            fontSize: { xs: '2rem', md: '2.5rem' }, 
            fontWeight: 800, 
            mb: 3 
          }}>
            Todo lo que necesitas en
            <Box component="span" color="#2563eb"> una sola plataforma</Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {mainFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureHighlight 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 200}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sección: Testimonios */}
      <Box sx={{ background: '#f8fafc', py: 10 }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ 
              fontSize: { xs: '2rem', md: '2.5rem' }, 
              fontWeight: 800, 
              mb: 2 
            }}>
              Lo que dicen nuestros
              <Box component="span" color="#2563eb" sx={{ display: 'block' }}>
                clientes satisfechos
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ color: '#6b7280', maxWidth: '600px', mx: 'auto' }}>
              Empresas que transformaron sus resultados con nuestra plataforma
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TestimonialCard {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Sección: Comparativa */}
      <Container sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ 
            fontSize: { xs: '2rem', md: '2.5rem' }, 
            fontWeight: 800, 
            mb: 3 
          }}>
            vs Métodos Tradicionales
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 4, 
              border: '2px solid #e5e7eb',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <Typography variant="h5" color="#ef4444" fontWeight={800} gutterBottom>
                Sin IA
              </Typography>
              <List>
                {[
                  "⏱️ 40+ horas semanales en tareas manuales",
                  "❌ Decisiones basadas en intuición",
                  "📉 Oportunidades perdidas diariamente", 
                  "💸 Alto costo en personal operativo",
                  "🚫 Crecimiento limitado por recursos"
                ].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CloseIcon sx={{ color: '#ef4444' }} />
                    </ListItemIcon>
                    <Typography>{item}</Typography>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 4, 
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: 'white',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)'
            }}>
              <Typography variant="h5" fontWeight={800} gutterBottom>
                Con UniversalBot AI
              </Typography>
              <List>
                {[
                  "⚡ 95% de procesos automatizados", 
                  "🎯 Decisiones con 94% de precisión",
                  "💰 ROI promedio 3x en primer trimestre",
                  "🚀 Escalabilidad ilimitada",
                  "📈 +156% crecimiento reportado"
                ].map((item, index) => (
                  <ListItem key={index} sx={{ color: 'white' }}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: '#22c55e' }} />
                    </ListItemIcon>
                    <Typography fontWeight={600}>{item}</Typography>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Final Ultra Persuasive */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #374151 100%)', 
        color: 'white', 
        py: 12,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          
          {/* Oferta con countdown visual */}
          <Box sx={{ 
            display: 'inline-flex', 
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '15px',
            px: 4,
            py: 2,
            mb: 4,
            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)'
          }}>
            <Typography variant="h6" fontWeight={800} sx={{ mr: 2 }}>
              🚀 OFERTA DE LANZAMIENTO
            </Typography>
            <Box sx={{ 
              background: 'white', 
              color: '#d97706',
              px: 2,
              py: 1,
              borderRadius: '8px',
              fontWeight: 900,
              fontSize: '1.1rem'
            }}>
              75% OFF
            </Box>
          </Box>

          <Typography variant="h2" sx={{ 
            fontSize: { xs: '2.2rem', md: '3.2rem' }, 
            fontWeight: 900, 
            mb: 2,
            lineHeight: 1.1
          }}>
            ¿Listo para multiplicar tu
            <Box component="span" sx={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #a5b4fc 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              display: 'block'
            }}>
              negocio con IA?
            </Box>
          </Typography>
          
          <Typography variant="h5" sx={{ 
            opacity: 0.9, 
            mb: 6, 
            maxWidth: '600px', 
            mx: 'auto',
            fontSize: { xs: '1.1rem', md: '1.3rem' }
          }}>
            Únete a las <strong>{companyCount.toLocaleString()}+ empresas</strong> que ya 
            automatizaron sus operaciones y están creciendo exponencialmente
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 6 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              startIcon={<RocketLaunch />}
              sx={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white',
                fontWeight: 800,
                px: 6,
                py: 2,
                minWidth: { xs: '100%', sm: '300px' },
                borderRadius: '15px',
                fontSize: '1.1rem',
                boxShadow: '0 15px 40px rgba(34, 197, 94, 0.4)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 20px 50px rgba(34, 197, 94, 0.6)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Comenzar Gratis - 0€
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleDemoRequest}
              startIcon={<LiveTv />}
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                borderWidth: '2px',
                color: 'white',
                fontWeight: 600,
                px: 6,
                py: 2,
                minWidth: { xs: '100%', sm: '300px' },
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'white',
                  background: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-3px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Demo Personalizado
            </Button>
          </Stack>

          {/* Garantías finales */}
          <Grid container spacing={4} sx={{ maxWidth: '800px', mx: 'auto' }}>
            {[
              { icon: <GppGood />, text: "Garantía de resultados 30 días" },
              { icon: <AccessTime />, text: "Configuración en 5 minutos" },
              { icon: <VerifiedUser />, text: "Soporte premium 24/7" },
              { icon: <EmojiEvents />, text: "ROI comprobado o te devolvemos" }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <Box sx={{ color: '#22c55e' }}>
                    {item.icon}
                  </Box>
                  <Typography variant="body2" fontWeight={600}>
                    {item.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer Mejorado */}
      <Box sx={{ background: '#0f172a', color: 'white', py: 8 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  borderRadius: '12px',
                  p: 1
                }}>
                  <SmartToy sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={800}>
                    UniversalBot<span style={{ color: '#60a5fa' }}>AI</span>
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Revolucionando empresas con inteligencia artificial
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                La plataforma todo-en-uno que automatiza y escala tu negocio con el poder de la IA.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: { md: 'flex-end' }, gap: 4 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>Empresa</Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Nosotros</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Carreras</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Contacto</Typography>
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>Legal</Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Privacidad</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Términos</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Seguridad</Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, opacity: 0.3 }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.5 }}>
              © 2025 UniversalBot AI Platform. Transformando el futuro empresarial con inteligencia artificial.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Botón de WhatsApp */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
          }
        }}
        onClick={() => window.open('https://wa.me/123456789?text=Hola,%20me%20interesa%20UniversalBot%20AI', '_blank')}
      >
        <WhatsApp />
      </Fab>

      {/* Botón Scroll to Top */}
      <Zoom in={showScrollTop}>
        <Fab
          color="primary"
          aria-label="scroll to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: { xs: 24, md: 90 },
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default HomePage;
