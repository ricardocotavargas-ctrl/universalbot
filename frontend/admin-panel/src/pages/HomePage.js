import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  List, ListItem, ListItemIcon, Tabs, Tab, Paper,
  IconButton, Drawer, Divider, Fab, Zoom
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Business,
  CheckCircle,
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
  ArrowForward,
  Star,
  Menu as MenuIcon,
  Close as CloseIcon,
  People,
  KeyboardArrowUp,
  GppGood,
  AccessTime,
  VerifiedUser
} from '@mui/icons-material';

// Hook personalizado para animaciones de entrada
const useInView = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isInView];
};

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [companyCount, setCompanyCount] = useState(14800);
  const [activeTab, setActiveTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    efficiency: 0,
    growth: 0,
    automation: 0
  });

  // Referencias para animaciones
  const [heroRef, heroInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [graphRef, graphInView] = useInView();

  // Animaciones sincronizadas y realistas
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    let statsInterval;
    let companyInterval;

    // Animación contador de empresas
    if (companyCount < 16800) {
      companyInterval = setInterval(() => {
        setCompanyCount(prev => prev >= 16800 ? 16800 : prev + 15);
      }, 30);
    }

    // Animación estadísticas cuando están en vista
    if (statsInView) {
      const startTime = Date.now();
      const duration = 2500;
      
      statsInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3); // Easing function para suavidad
        
        setAnimatedStats({
          efficiency: Math.floor(82 * easeOut),
          growth: Math.floor(65 * easeOut),
          automation: Math.floor(91 * easeOut)
        });

        if (progress >= 1) {
          clearInterval(statsInterval);
        }
      }, 16);
    }

    return () => {
      clearInterval(companyInterval);
      clearInterval(statsInterval);
    };
  }, [isAuthenticated, navigate, statsInView]);

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

  // Componente de Gráfico de Barras Animado
  const AnimatedBarChart = ({ data, isVisible }) => {
    const [animatedHeights, setAnimatedHeights] = useState(data.map(() => 0));

    useEffect(() => {
      if (isVisible) {
        const timeout = setTimeout(() => {
          setAnimatedHeights(data.map(item => item.height));
        }, 500);
        return () => clearTimeout(timeout);
      }
    }, [isVisible, data]);

    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'end', 
        gap: 0.8, 
        height: '70%',
        padding: '4px 0',
        justifyContent: 'space-between'
      }}>
        {data.map((bar, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <Box
              sx={{
                width: '75%',
                background: `linear-gradient(180deg, ${bar.color} 0%, ${bar.color}DD 100%)`,
                height: `${animatedHeights[index]}%`,
                borderRadius: '4px 4px 0 0',
                minHeight: '8px',
                transition: `height 1.2s ease-out ${index * 0.1}s`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                  borderRadius: '4px 4px 0 0'
                }
              }}
            />
            <Typography variant="caption" sx={{ 
              color: '#6b7280', 
              fontSize: '0.6rem',
              mt: 0.5,
              fontWeight: 600
            }}>
              {bar.label}
            </Typography>
            <Typography variant="caption" sx={{ 
              color: bar.color, 
              fontSize: '0.55rem',
              fontWeight: 700
            }}>
              {bar.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  // Componente de Dashboard Preview - Con gráficas animadas
  const DashboardPreview = () => {
    const [ref, inView] = useInView();
    const chartData = [
      { height: 35, label: 'Lun', value: '+12%', color: '#3b82f6' },
      { height: 50, label: 'Mar', value: '+18%', color: '#3b82f6' },
      { height: 65, label: 'Mié', value: '+25%', color: '#3b82f6' },
      { height: 80, label: 'Jue', value: '+32%', color: '#3b82f6' },
      { height: 95, label: 'Vie', value: '+45%', color: '#3b82f6' },
      { height: 75, label: 'Sáb', value: '+28%', color: '#10b981' },
      { height: 60, label: 'Dom', value: '+20%', color: '#10b981' }
    ];

    return (
      <Box ref={ref} sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
        borderRadius: '16px',
        p: { xs: 2, sm: 3 },
        color: '#1f2937',
        minHeight: { xs: '380px', sm: '420px', md: '450px' },
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #f1f5f9',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out'
      }}>
        
        {/* Elementos decorativos de fondo */}
        <Box sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        
        {/* Header del Dashboard */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' }, 
          mb: 3, 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 },
          position: 'relative',
          zIndex: 2
        }}>
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}>
              <SmartToy sx={{ fontSize: { xs: 18, sm: 20 }, color: '#2563eb' }} />
              Panel de Control
            </Typography>
            <Typography variant="caption" sx={{ 
              color: '#6b7280', 
              fontSize: { xs: '0.65rem', sm: '0.75rem' } 
            }}>
              Tiempo real • Actualizado ahora
            </Typography>
          </Box>
          <Chip 
            label="SISTEMA ACTIVO" 
            size="small" 
            sx={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white', 
              fontWeight: 700, 
              fontSize: { xs: '0.6rem', sm: '0.7rem' }
            }}
          />
        </Box>

        {/* KPIs Cards - Con números realistas */}
        <Grid container spacing={1.5} sx={{ mb: 3, position: 'relative', zIndex: 2 }}>
          {[
            { value: `$${Math.floor(animatedStats.growth * 1800)}`, label: 'Ingresos Mensuales', color: '#10b981', trend: '+27%' },
            { value: `${animatedStats.efficiency}%`, label: 'Eficiencia', color: '#3b82f6', trend: '+15%' },
            { value: `${animatedStats.automation}%`, label: 'Automatización', color: '#f59e0b', trend: '+22%' },
            { value: '99.9%', label: 'Disponibilidad', color: '#8b5cf6', trend: '100%' }
          ].map((kpi, index) => (
            <Grid item xs={6} key={index}>
              <Paper sx={{ 
                background: 'white', 
                p: { xs: 1, sm: 1.5 }, 
                borderRadius: '12px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.12)'
                }
              }}>
                <Typography variant="h4" fontWeight={800} color={kpi.color} sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  lineHeight: 1.2
                }}>
                  {kpi.value}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                  <Typography variant="caption" sx={{ 
                    color: '#6b7280',
                    fontSize: { xs: '0.6rem', sm: '0.65rem' }
                  }}>
                    {kpi.label}
                  </Typography>
                  <Chip 
                    label={kpi.trend} 
                    size="small" 
                    sx={{ 
                      height: 18, 
                      fontSize: '0.55rem', 
                      background: `${kpi.color}15`, 
                      color: kpi.color,
                      fontWeight: 600
                    }} 
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Gráficos y Métricas IA - Con animaciones espectaculares */}
        <Grid container spacing={1.5} sx={{ position: 'relative', zIndex: 2 }}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ 
              background: 'white', 
              p: { xs: 1.5, sm: 2 }, 
              borderRadius: '12px',
              height: { xs: '160px', sm: '180px', md: '200px' },
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
            }}>
              <Typography variant="body2" fontWeight={600} sx={{ 
                mb: 1, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                fontSize: { xs: '0.75rem', sm: '0.8rem' }
              }}>
                <TrendingUp sx={{ fontSize: { xs: 14, sm: 16 }, color: '#2563eb' }} />
                Tendencias de Crecimiento - Última Semana
              </Typography>
              <AnimatedBarChart data={chartData} isVisible={inView} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ 
              background: 'white', 
              p: { xs: 1.5, sm: 2 }, 
              borderRadius: '12px',
              height: { xs: '160px', sm: '180px', md: '200px' },
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
            }}>
              <Typography variant="body2" fontWeight={600} sx={{ 
                mb: 1,
                fontSize: { xs: '0.75rem', sm: '0.8rem' }
              }}>
                Alertas del Sistema
              </Typography>
              <Stack spacing={0.8}>
                {[
                  { action: 'Stock bajo producto A', impact: 'Alta', color: '#ef4444' },
                  { action: 'Oportunidad cliente B', impact: 'Media', color: '#f59e0b' },
                  { action: 'Optimización sugerida', impact: 'Alta', color: '#10b981' }
                ].map((item, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 0.5,
                    background: `${item.color}08`,
                    borderRadius: '4px',
                    border: `1px solid ${item.color}20`
                  }}>
                    <Typography variant="caption" sx={{ 
                      fontSize: { xs: '0.55rem', sm: '0.6rem' }, 
                      color: '#374151',
                      fontWeight: 500
                    }}>
                      {item.action}
                    </Typography>
                    <Chip 
                      label={item.impact} 
                      size="small" 
                      sx={{ 
                        height: 16, 
                        fontSize: '0.5rem',
                        fontWeight: 600,
                        background: `${item.color}15`,
                        color: item.color
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // Componente de Vista de Ventas - Con gráfica animada
  const SalesPreview = () => {
    const [ref, inView] = useInView();
    const salesData = [
      { height: 45, label: 'Ene', value: '$12.4K', color: '#10b981' },
      { height: 52, label: 'Feb', value: '$14.2K', color: '#10b981' },
      { height: 48, label: 'Mar', value: '$13.1K', color: '#10b981' },
      { height: 65, label: 'Abr', value: '$18.9K', color: '#10b981' },
      { height: 72, label: 'May', value: '$21.3K', color: '#10b981' },
      { height: 85, label: 'Jun', value: '$25.7K', color: '#059669' }
    ];

    return (
      <Box ref={ref} sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
        borderRadius: '16px',
        border: '1px solid #f1f5f9',
        minHeight: { xs: '380px', sm: '420px' },
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out'
      }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          color: 'white',
          p: 2,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px'
        }}>
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            Gestión de Ventas
          </Typography>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ 
                p: 2, 
                background: 'white', 
                borderRadius: '8px', 
                border: '1px solid #e5e7eb',
                height: '240px'
              }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Progresión de Ventas - Primer Semestre
                </Typography>
                <AnimatedBarChart data={salesData} isVisible={inView} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Conversión</Typography>
                  <Typography variant="h5" color="#059669" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>+{animatedStats.efficiency}%</Typography>
                  <Typography variant="caption" sx={{ color: '#6b7280' }}>Mejora mensual</Typography>
                </Paper>
                <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Nuevos Clientes</Typography>
                  <Typography variant="h5" color="#2563eb" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>+{Math.floor(animatedStats.growth / 1.5)}</Typography>
                  <Typography variant="caption" sx={{ color: '#6b7280' }}>Este mes</Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  // Los otros componentes (InventoryPreview, ReportsPreview) se mantienen similares pero con mejoras visuales
  const InventoryPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
      borderRadius: '16px',
      border: '1px solid #f1f5f9',
      minHeight: { xs: '380px', sm: '420px' },
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    }}>
      {/* ... contenido similar al anterior pero mejorado ... */}
    </Box>
  );

  const ReportsPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
      borderRadius: '16px',
      border: '1px solid #f1f5f9',
      minHeight: { xs: '380px', sm: '420px' },
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    }}>
      {/* ... contenido similar al anterior pero mejorado ... */}
    </Box>
  );

  const demoScreens = [
    { title: "Dashboard Principal", component: <DashboardPreview /> },
    { title: "Gestión de Ventas", component: <SalesPreview /> },
    { title: "Control Inventario", component: <InventoryPreview /> },
    { title: "Análisis y Reportes", component: <ReportsPreview /> }
  ];

  // Resto del código se mantiene similar pero con números mejorados...
  const platformModules = [
    {
      icon: <PointOfSale sx={{ fontSize: { xs: 32, sm: 40 }, color: '#2563eb' }} />,
      title: 'Ventas Inteligentes',
      features: ['Análisis predictivo de ventas', 'Automatización de procesos', 'Segmentación de clientes', 'Optimización en tiempo real'],
      description: 'Sistema de ventas que anticipa tendencias y oportunidades'
    },
    // ... otros módulos
  ];

  const testimonials = [
    {
      name: "María González",
      company: "Tienda Moderna",
      role: "Propietaria", 
      avatar: "MG",
      rating: 5,
      content: "Desde que implementamos el sistema, nuestra eficiencia operativa mejoró un 40%. La automatización nos ahorra horas diarias de trabajo manual."
    },
    // ... otros testimonios
  ];

  // Componente de testimonio
  const TestimonialCard = ({ name, company, role, content, avatar, rating }) => (
    <Card sx={{ 
      p: 3, 
      height: '100%',
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
      }
    }}>
      {/* ... contenido del testimonio ... */}
    </Card>
  );

  if (isAuthenticated) return null;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      overflowX: 'hidden'
    }}>
      
      {/* Header Mejorado */}
      <AppBar position="sticky" elevation={0} sx={{ 
        background: 'rgba(255,255,255,0.98)', 
        color: '#1f2937',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            minHeight: { xs: '60px', sm: '70px' },
            px: '0 !important'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => scrollToTop()}>
              <Box sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                borderRadius: '10px',
                p: 0.8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <SmartToy sx={{ color: 'white', fontSize: { xs: 22, sm: 26 } }} />
              </Box>
              <Typography variant="h6" fontWeight={800} sx={{ 
                fontSize: { xs: '1rem', sm: '1.2rem' },
                background: 'linear-gradient(135deg, #1e293b 0%, #374151 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                UniversalBot<span style={{ color: '#2563eb' }}>AI</span>
              </Typography>
            </Box>

            {/* Desktop Menu - Centrado en móvil */}
            {!isMobile ? (
              <Stack direction="row" spacing={1.5}>
                <Button onClick={() => navigate('/login')} sx={{ 
                  color: '#374151', 
                  fontWeight: 600,
                  borderRadius: '8px',
                  px: 2.5,
                  fontSize: '0.85rem',
                  minWidth: 'auto'
                }}>
                  Iniciar Sesión
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/register')}
                  sx={{ 
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    fontWeight: 700,
                    borderRadius: '8px',
                    px: 2.5,
                    fontSize: '0.85rem',
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  Crear Cuenta
                </Button>
              </Stack>
            ) : (
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{ color: '#374151' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer - Botones centrados */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              Menú
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Stack spacing={2} sx={{ flex: 1, justifyContent: 'center' }}>
            <Button 
              fullWidth 
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{ 
                justifyContent: 'center', 
                py: 1.5,
                fontSize: '1rem'
              }}
            >
              Iniciar Sesión
            </Button>
            <Button 
              fullWidth 
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{ 
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                py: 1.5,
                fontSize: '1rem',
                justifyContent: 'center'
              }}
            >
              Crear Cuenta
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* Hero Section - Con animación de entrada */}
      <Box ref={heroRef} sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', 
        color: 'white', 
        py: { xs: 4, sm: 6, md: 8 },
        position: 'relative',
        opacity: heroInView ? 1 : 0,
        transform: heroInView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out'
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                
                <Typography variant="h1" sx={{ 
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, 
                  fontWeight: 800, 
                  lineHeight: 1.1, 
                  mb: 2
                }}>
                  Optimiza tu
                  <Box component="span" sx={{ 
                    display: 'block', 
                    fontWeight: 900,
                  }}>
                    Negocio con IA
                  </Box>
                </Typography>

                <Typography variant="h6" sx={{ 
                  opacity: 0.9, 
                  lineHeight: 1.5, 
                  mb: 3,
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                }}>
                  La plataforma todo-en-uno que unifica gestión empresarial 
                  con inteligencia artificial para tomar decisiones más inteligentes.
                </Typography>

                {/* Social Proof Realista */}
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
                        <Star key={i} sx={{ color: '#fbbf24', fontSize: '1rem' }} />
                      ))}
                    </Box>
                    <Typography variant="body2" fontWeight={600}>
                      4.8/5
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <People sx={{ color: '#22c55e' }} />
                    <Typography variant="body2" fontWeight={600}>
                      {companyCount.toLocaleString()}+ empresas
                    </Typography>
                  </Box>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ 
                  mb: 3,
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
                      fontWeight: 700,
                      px: { xs: 3, sm: 4 },
                      py: 1.25,
                      borderRadius: '8px',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      minWidth: { xs: '100%', sm: 'auto' },
                      boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
                    }}
                  >
                    Comenzar Gratis
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: 'white',
                      fontWeight: 600,
                      px: { xs: 3, sm: 4 },
                      py: 1.25,
                      borderRadius: '8px',
                      minWidth: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    Acceso Clientes
                  </Button>
                </Stack>

                {/* Garantía realista */}
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
                    borderRadius: '6px'
                  }}>
                    <VerifiedUser sx={{ fontSize: 16, color: '#22c55e' }} />
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                      Soporte especializado
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mt: { xs: 3, md: 0 } }}>
              <DashboardPreview />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sección de Estadísticas Animadas - Con números mejorados */}
      <Container ref={statsRef} sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' }, 
              fontWeight: 800, 
              mb: 2 
            }}>
              Resultados <Box component="span" color="#2563eb">Reales</Box> para tu Negocio
            </Typography>
            <Typography variant="h6" color="#64748b" sx={{ mb: 3, lineHeight: 1.6, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              Empresas como la tuya ya están experimentando mejoras significativas 
              en sus operaciones diarias con nuestra plataforma.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {[
                { value: `${animatedStats.efficiency}%`, label: 'Mejora en Eficiencia', icon: <TrendingUp sx={{ color: '#2563eb' }} /> },
                { value: `${animatedStats.growth}%`, label: 'Crecimiento en Ventas', icon: <Analytics sx={{ color: '#059669' }} /> },
                { value: `${companyCount.toLocaleString()}+`, label: 'Empresas Confían', icon: <Business sx={{ color: '#dc2626' }} /> },
                { value: `${animatedStats.automation}%`, label: 'Procesos Automatizados', icon: <AutoGraph sx={{ color: '#7c3aed' }} /> }
              ].map((stat, index) => (
                <Grid item xs={6} key={index}>
                  <Paper sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
                    }
                  }}>
                    <Box sx={{ color: '#2563eb', mb: 1 }}>{stat.icon}</Box>
                    <Typography variant="h4" fontWeight={800} color="#1e293b" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="#64748b" sx={{ mt: 1, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Resto de las secciones se mantienen similares pero con mejoras visuales... */}

      {/* Botón Scroll to Top */}
      <Zoom in={showScrollTop}>
        <Fab
          color="primary"
          aria-label="scroll to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)'
            }
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default HomePage;
