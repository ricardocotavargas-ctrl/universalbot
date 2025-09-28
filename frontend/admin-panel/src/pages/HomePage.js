import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  List, ListItem, ListItemIcon, Tabs, Tab, Paper,
  IconButton
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
  Close as CloseIcon
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const [companyCount, setCompanyCount] = useState(14800);
  const [activeTab, setActiveTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    efficiency: 0,
    growth: 0,
    automation: 0
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    // Animación contador de empresas
    if (companyCount < 18500) {
      const interval = setInterval(() => {
        setCompanyCount(prev => prev >= 18500 ? 18500 : prev + 25);
      }, 30);
      return () => clearInterval(interval);
    }

    // Animación estadísticas
    const statsInterval = setInterval(() => {
      setAnimatedStats(prev => ({
        efficiency: prev.efficiency >= 89 ? 89 : prev.efficiency + 1,
        growth: prev.growth >= 156 ? 156 : prev.growth + 2,
        automation: prev.automation >= 92 ? 92 : prev.automation + 1
      }));
    }, 50);

    return () => clearInterval(statsInterval);
  }, [isAuthenticated, navigate, companyCount]);

  if (isAuthenticated) return null;

  // Componente de Dashboard Preview Mejorado
  const DashboardPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
      borderRadius: '24px',
      p: { xs: 2, md: 3 },
      color: '#1f2937',
      minHeight: { xs: '300px', md: '400px' },
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid #f1f5f9',
      boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.08)',
      transform: 'translateZ(0)'
    }}>
      {/* Elementos decorativos modernos */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.03) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 200,
        height: 200,
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.02) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      {/* Header del Dashboard */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3, 
        position: 'relative', 
        zIndex: 2 
      }}>
        <Box>
          <Typography variant="h6" fontWeight={700} sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}>
            <SmartToy sx={{ fontSize: { xs: 18, md: 20 }, color: '#2563eb' }} />
            Panel de Control IA
          </Typography>
          <Typography variant="caption" sx={{ color: '#6b7280', fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
            Tiempo real • Actualizado ahora
          </Typography>
        </Box>
        <Chip 
          label="IA ACTIVA" 
          size="small" 
          sx={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white', 
            fontWeight: 700, 
            border: 'none',
            fontSize: { xs: '0.7rem', md: '0.8rem' }
          }}
        />
      </Box>

      {/* KPIs Cards Mejoradas */}
      <Grid container spacing={2} sx={{ mb: 3, position: 'relative', zIndex: 2 }}>
        {[
          { value: '$52.8K', label: 'Ingresos IA', color: '#10b981', trend: '+12%' },
          { value: '1,847', label: 'Optimizaciones', color: '#3b82f6', trend: '+8%' },
          { value: `${animatedStats.efficiency}%`, label: 'Eficiencia', color: '#f59e0b', trend: '+5%' },
          { value: '24/7', label: 'Automatización', color: '#8b5cf6', trend: '100%' }
        ].map((kpi, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Paper sx={{ 
              background: 'white', 
              p: { xs: 1.5, md: 2 }, 
              borderRadius: '16px',
              border: '1px solid #f1f5f9',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': { 
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
              }
            }}>
              <Typography variant="h4" fontWeight={800} color={kpi.color} sx={{ 
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                lineHeight: 1.2
              }}>
                {kpi.value}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Typography variant="caption" sx={{ 
                  color: '#6b7280',
                  fontSize: { xs: '0.7rem', md: '0.75rem' }
                }}>
                  {kpi.label}
                </Typography>
                <Chip 
                  label={kpi.trend} 
                  size="small" 
                  sx={{ 
                    height: 20, 
                    fontSize: '0.65rem', 
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

      {/* Gráficos y Métricas IA */}
      <Grid container spacing={2} sx={{ position: 'relative', zIndex: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            background: 'white', 
            p: { xs: 1.5, md: 2 }, 
            borderRadius: '16px',
            height: { xs: '120px', md: '160px' },
            border: '1px solid #f1f5f9',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
          }}>
            <Typography variant="body2" fontWeight={600} sx={{ 
              mb: 1, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              fontSize: { xs: '0.8rem', md: '0.9rem' }
            }}>
              <TrendingUp sx={{ fontSize: { xs: 14, md: 16 }, color: '#2563eb' }} />
              Predicción IA - Próximos 30 días
            </Typography>
            {/* Gráfico animado mejorado */}
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'end', 
              gap: 0.5, 
              height: '70%',
              padding: '8px 0'
            }}>
              {[40, 55, 70, 85, 95, 110, 130, 150, 140, 125, 145, 165].map((height, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    background: `linear-gradient(180deg, ${index >= 6 ? '#10b981' : '#3b82f6'} 0%, ${index >= 6 ? '#059669' : '#2563eb'} 100%)`,
                    height: `${Math.min(height / 2, 100)}%`,
                    borderRadius: '4px',
                    minHeight: '8px',
                    transition: 'all 0.5s ease',
                    opacity: 0.9
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            background: 'white', 
            p: { xs: 1.5, md: 2 }, 
            borderRadius: '16px',
            height: { xs: '120px', md: '160px' },
            border: '1px solid #f1f5f9',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
          }}>
            <Typography variant="body2" fontWeight={600} sx={{ 
              mb: 1,
              fontSize: { xs: '0.8rem', md: '0.9rem' }
            }}>
              Recomendaciones IA
            </Typography>
            <Stack spacing={1}>
              {[
                { action: 'Optimizar stock', impact: 'Alto' },
                { action: 'Promoción sugerida', impact: 'Medio' },
                { action: 'Cliente objetivo', impact: 'Alto' }
              ].map((item, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  p: 0.5,
                  background: 'rgba(34, 197, 94, 0.05)',
                  borderRadius: '6px',
                  border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                  <Typography variant="caption" sx={{ 
                    fontSize: { xs: '0.6rem', md: '0.7rem' }, 
                    color: '#374151',
                    fontWeight: 500
                  }}>
                    {item.action}
                  </Typography>
                  <Chip 
                    label={item.impact} 
                    size="small" 
                    color={item.impact === 'Alto' ? 'success' : 'warning'}
                    sx={{ 
                      height: 16, 
                      fontSize: '0.55rem',
                      fontWeight: 600
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

  // Componentes de preview mejorados (similar estructura para los otros)
  const SalesPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
      borderRadius: '24px',
      border: '1px solid #f1f5f9',
      minHeight: { xs: '300px', md: '400px' },
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.08)'
    }}>
      {/* Contenido similar mejorado */}
    </Box>
  );

  const demoScreens = [
    { title: "Dashboard IA", component: <DashboardPreview /> },
    { title: "Ventas Inteligentes", component: <SalesPreview /> },
    // ... otros componentes similares
  ];

  const platformModules = [
    {
      icon: <PointOfSale sx={{ fontSize: 40, color: '#2563eb' }} />,
      title: 'Ventas Inteligentes',
      features: ['IA predictiva de ventas', 'Automatización de procesos', 'Clientes recomendados por IA', 'Optimización en tiempo real'],
      description: 'Sistema de ventas impulsado por inteligencia artificial'
    },
    // ... otros módulos
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
      overflow: 'hidden'
    }}>
      
      {/* Header Mejorado */}
      <AppBar position="sticky" elevation={0} sx={{ 
        background: 'rgba(255,255,255,0.98)', 
        color: '#1f2937',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        py: 1
      }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            minHeight: { xs: '60px', md: '70px' } 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
            </Box>

            {/* Mobile Menu Button */}
            {isMobile ? (
              <IconButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                sx={{ color: '#374151' }}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button onClick={() => navigate('/login')} sx={{ 
                  color: '#374151', 
                  fontWeight: 600,
                  borderRadius: '10px',
                  px: 3,
                  fontSize: '0.9rem'
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
                    px: 3,
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Probar IA Gratis
                </Button>
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section Mejorada */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)', 
        color: 'white', 
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Chip 
                  label="🚀 PLATAFORMA CON INTELIGENCIA ARTIFICIAL"
                  sx={{ 
                    background: 'rgba(255,255,255,0.15)', 
                    color: 'white', 
                    fontWeight: 700, 
                    mb: 3,
                    fontSize: { xs: '0.7rem', md: '0.8rem' },
                    padding: '6px 16px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Typography variant="h1" sx={{ 
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' }, 
                  fontWeight: 800, 
                  lineHeight: 1.1, 
                  mb: 3
                }}>
                  Revoluciona tu
                  <Box component="span" sx={{ 
                    display: 'block', 
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}>
                    Empresa con IA
                  </Box>
                </Typography>
                <Typography variant="h6" sx={{ 
                  opacity: 0.9, 
                  lineHeight: 1.6, 
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  maxWidth: '500px',
                  mx: { xs: 'auto', md: '0' }
                }}>
                  La primera plataforma que combina gestión empresarial completa 
                  con inteligencia artificial predictiva para maximizar tus resultados.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ 
                  mb: 4,
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
                      px: { xs: 4, md: 5 },
                      py: 1.5,
                      borderRadius: '12px',
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      minWidth: { xs: '100%', sm: 'auto' },
                      '&:hover': { 
                        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(255,255,255,0.2)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Comenzar con IA
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayArrow />}
                    sx={{
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: 'white',
                      fontWeight: 600,
                      px: { xs: 4, md: 5 },
                      py: 1.5,
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      minWidth: { xs: '100%', sm: 'auto' },
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Ver Demo
                  </Button>
                </Stack>

                {/* Estadísticas rápidas */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: 3, md: 4 }, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  {[
                    { value: '24/7', label: 'Monitoreo IA' },
                    { value: '99.9%', label: 'Disponibilidad' },
                    { value: '5min', label: 'Configuración' }
                  ].map((stat, index) => (
                    <Box key={index} sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight={800} sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <DashboardPreview />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sección de Demo Interactivo con Swipe */}
      <Box sx={{ background: '#ffffff', py: { xs: 6, md: 10 } }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip 
              label="💫 EXPLORA LA PLATAFORMA" 
              sx={{ 
                mb: 3, 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                color: '#2563eb'
              }}
            />
            <Typography variant="h2" sx={{ 
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' }, 
              fontWeight: 800, 
              mb: 2,
              lineHeight: 1.2
            }}>
              Descubre el Futuro de la
              <Box component="span" color="#2563eb" sx={{ display: 'block' }}>
                Gestión Empresarial
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#6b7280', 
              maxWidth: '600px', 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6
            }}>
              Desliza para explorar nuestra interfaz intuitiva diseñada para resultados extraordinarios
            </Typography>
          </Box>

          {/* Indicador de swipe para móvil */}
          {isMobile && (
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="caption" sx={{ color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <ArrowForward sx={{ fontSize: 16 }} />
                Desliza para explorar
                <ArrowForward sx={{ fontSize: 16 }} />
              </Typography>
            </Box>
          )}

          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)} 
            centered 
            sx={{ mb: 6 }}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {demoScreens.map((screen, index) => (
              <Tab 
                key={index} 
                label={screen.title} 
                sx={{ 
                  fontWeight: 600, 
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  minWidth: 'auto',
                  px: { xs: 2, md: 3 },
                  textTransform: 'none'
                }}
              />
            ))}
          </Tabs>

          <Box sx={{ 
            overflow: isMobile ? 'auto' : 'visible',
            WebkitOverflowScrolling: 'touch',
            pb: isMobile ? 2 : 0
          }}>
            <Box sx={{ 
              minWidth: isMobile ? '800px' : 'auto',
              px: isMobile ? 2 : 0
            }}>
              {demoScreens[activeTab].component}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Resto de secciones similares mejoradas... */}

    </Box>
  );
};

export default HomePage;
