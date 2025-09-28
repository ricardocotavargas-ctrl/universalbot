import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon,
  Drawer, IconButton, Menu, MenuItem
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
  Close
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Características optimizadas para mobile
  const features = [
    {
      icon: <SmartToy sx={{ fontSize: isMobile ? 40 : 48, color: '#2563eb' }} />,
      title: 'IA Empresarial',
      description: 'Algoritmos predictivos que optimizan automáticamente tus operaciones',
      benefits: ['Predicción de demanda', 'Optimización de inventario', 'Automatización inteligente']
    },
    {
      icon: <DashboardCustomize sx={{ fontSize: isMobile ? 40 : 48, color: '#059669' }} />,
      title: 'Dashboards Ejecutivos',
      description: 'Vistas personalizadas para cada departamento y nivel directivo',
      benefits: ['KPIs en tiempo real', 'Reportes automatizados', 'Alertas proactivas']
    },
    {
      icon: <CorporateFare sx={{ fontSize: isMobile ? 40 : 48, color: '#dc2626' }} />,
      title: 'Gestión Multi-Empresa',
      description: 'Control centralizado para todas tus empresas y subsidiarias',
      benefits: ['Consolidación financiera', 'Gestión de permisos', 'Reportes consolidados']
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: isMobile ? 40 : 48, color: '#7c3aed' }} />,
      title: 'Integraciones',
      description: 'Conectores nativos para +500 aplicaciones empresariales',
      benefits: ['ERP/CRM nativos', 'APIs abiertas', 'Sincronización bidireccional']
    }
  ];

  // Testimonios optimizados para mobile
  const testimonials = [
    {
      name: "María González",
      position: "CEO, TechSolutions",
      content: "La plataforma revolucionó nuestro negocio. Redujimos costos en 60% e incrementamos productividad en 45%.",
      rating: 5
    },
    {
      name: "Carlos Rodríguez", 
      position: "Director de Operaciones",
      content: "Implementación impecable y soporte excepcional. La mejor inversión tecnológica del año.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      position: "CTO, InnovateCorp", 
      content: "La escalabilidad y seguridad del sistema superaron todas nuestras expectativas. Altamente recomendado.",
      rating: 5
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
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          color: 'white'
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={700}>UniversalBot</Typography>
        <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </Box>
      
      <Stack spacing={2} sx={{ p: 3 }}>
        <Button 
          fullWidth 
          sx={{ 
            color: 'white', 
            justifyContent: 'flex-start',
            fontSize: '1.1rem',
            py: 2
          }}
          onClick={() => {
            setMobileMenuOpen(false);
            // Scroll to features
          }}
        >
          Características
        </Button>
        <Button 
          fullWidth 
          sx={{ 
            color: 'white', 
            justifyContent: 'flex-start',
            fontSize: '1.1rem',
            py: 2
          }}
        >
          Precios
        </Button>
        <Button 
          fullWidth 
          sx={{ 
            color: 'white', 
            justifyContent: 'flex-start',
            fontSize: '1.1rem',
            py: 2
          }}
        >
          Casos de Éxito
        </Button>
        <Button 
          fullWidth 
          sx={{ 
            color: 'white', 
            justifyContent: 'flex-start',
            fontSize: '1.1rem',
            py: 2
          }}
        >
          Contacto
        </Button>
        
        <Box sx={{ pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <Button 
            fullWidth 
            variant="outlined"
            sx={{ 
              borderColor: 'white', 
              color: 'white',
              mb: 2,
              py: 1.5
            }}
            onClick={() => navigate('/login')}
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
              '&:hover': {
                background: '#f8fafc'
              }
            }}
            onClick={() => navigate('/register')}
          >
            Comenzar Gratis
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#ffffff',
      overflow: 'hidden'
    }}>
      
      {/* Header Optimizado para Mobile */}
      <AppBar 
        position="sticky"
        elevation={0}
        sx={{ 
          background: 'white', 
          color: '#1f2937',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar sx={{ 
            justifyContent: 'space-between', 
            py: 1,
            minHeight: '64px !important'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Business sx={{ 
                fontSize: { xs: 28, md: 32 }, 
                color: '#2563eb' 
              }} />
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
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
              <Typography variant="body1" fontWeight={600} sx={{ cursor: 'pointer', '&:hover': { color: '#2563eb' } }}>
                Características
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ cursor: 'pointer', '&:hover': { color: '#2563eb' } }}>
                Precios
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ cursor: 'pointer', '&:hover': { color: '#2563eb' } }}>
                Casos de Éxito
              </Typography>
              
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
                  px: 3,
                  '&:hover': {
                    background: '#1d4ed8'
                  }
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

      {/* Hero Section - Optimizada para Mobile */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3 }
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Chip 
                  icon={<Verified />}
                  label="PLATAFORMA ENTERPRISE"
                  sx={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 600,
                    mb: 3,
                    fontSize: { xs: '0.7rem', md: '0.8rem' }
                  }}
                />

                <Typography variant="h1" sx={{
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  mb: 3
                }}>
                  Gestión Empresarial
                  <Box component="span" sx={{ 
                    display: 'block', 
                    color: '#dbeafe', 
                    fontWeight: 600,
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
                  La plataforma todo-en-uno que optimiza operaciones, reduce costos 
                  y impulsa el crecimiento de tu empresa.
                </Typography>

                {/* Botones de Acción - Optimizados para Mobile */}
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
                    onClick={() => navigate('/register')}
                    sx={{
                      background: '#ffffff',
                      color: '#2563eb',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      px: { xs: 3, md: 4 },
                      py: 1.5,
                      fontWeight: 600,
                      minWidth: { xs: '100%', sm: 'auto' },
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
                    startIcon={<PlayArrow />}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      px: { xs: 3, md: 4 },
                      py: 1.5,
                      fontWeight: 600,
                      minWidth: { xs: '100%', sm: 'auto' },
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Ver Demo
                  </Button>
                </Stack>

                {/* Estadísticas - Optimizadas para Mobile */}
                <Grid container spacing={3}>
                  {[
                    { value: '15K+', label: 'Empresas' },
                    { value: '99.9%', label: 'Uptime' },
                    { value: '4.9/5', label: 'Rating' },
                    { value: '60%', label: 'Ahorro' }
                  ].map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight={700}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
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
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                p: { xs: 3, md: 4 },
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <Box sx={{
                  width: '100%',
                  height: { xs: '250px', md: '300px' },
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.5) 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 3
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <DashboardCustomize sx={{ 
                      fontSize: { xs: 60, md: 80 }, 
                      mb: 2 
                    }} />
                    <Typography variant="h5" fontWeight={600}>
                      Dashboard Ejecutivo
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Vista previa interactiva
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Optimizado para todos los dispositivos
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Características - Diseño Mobile First */}
      <Container maxWidth="lg" sx={{ 
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography variant="h2" sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#1f2937',
            mb: 2
          }}>
            Soluciones Completas
          </Typography>
          <Typography variant="h6" sx={{
            color: '#6b7280',
            maxWidth: '600px',
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.1rem' }
          }}>
            Diseñado para satisfacer las necesidades más exigentes del entorno empresarial moderno
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                height: '100%',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: { xs: 2, md: 3 },
                    flexDirection: { xs: 'column', sm: 'row' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}>
                    <Box sx={{ 
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                      borderRadius: '12px',
                      p: 2,
                      minWidth: '70px'
                    }}>
                      {feature.icon}
                    </Box>
                    
                    <Box>
                      <Typography variant="h5" fontWeight={600} color="#1f2937" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="#6b7280" sx={{ mb: 2, lineHeight: 1.5 }}>
                        {feature.description}
                      </Typography>
                      
                      <List dense sx={{ py: 0 }}>
                        {feature.benefits.map((benefit, idx) => (
                          <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: '30px' }}>
                              <CheckCircle sx={{ color: '#10b981', fontSize: 18 }} />
                            </ListItemIcon>
                            <Typography variant="body2">{benefit}</Typography>
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

      {/* Testimonios - Optimizados para Mobile */}
      <Box sx={{ background: '#f8fafc', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography variant="h2" sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#1f2937',
              mb: 2
            }}>
              Confiado por Líderes
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  border: '1px solid #e5e7eb'
                }}>
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: '#fbbf24', fontSize: 20 }} />
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
                    
                    <Box>
                      <Typography variant="h6" fontWeight={600} color="#1f2937">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="#6b7280">
                        {testimonial.position}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Final - Mobile Optimized */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        py: { xs: 6, md: 8 }
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
            opacity: 0.9, 
            mb: 4,
            fontSize: { xs: '1rem', md: '1.1rem' }
          }}>
            Únete a miles de empresas que ya optimizan sus operaciones
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
                color: '#2563eb',
                fontSize: { xs: '1rem', md: '1.1rem' },
                px: { xs: 3, md: 4 },
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
                fontSize: { xs: '1rem', md: '1.1rem' },
                px: { xs: 3, md: 4 },
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
            gap: { xs: 1, sm: 2 },
            flexWrap: 'wrap',
            opacity: 0.9
          }}>
            {[
              '14 días gratis',
              'Sin tarjeta', 
              'Soporte 24/7'
            ].map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ mr: 1, fontSize: 16 }} />
                <Typography variant="body2">{item}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer Mobile Optimized */}
      <Box sx={{ background: '#111827', color: 'white', py: 4 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
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
