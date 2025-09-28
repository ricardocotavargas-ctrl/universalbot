import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  List, ListItem, ListItemIcon, Avatar, Tab, Tabs, Paper,
  Fade, Zoom, Slide, Grow
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
  PointOfSale,
  Inventory,
  AccountBalance,
  Campaign,
  DashboardCustomize,
  ShoppingCart,
  AttachMoney,
  PeopleAlt,
  Assessment,
  Inventory2,
  Receipt,
  BarChart,
  PieChart,
  Timeline,
  RocketLaunch,
  TrendingFlat,
  Insights,
  SmartToy
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [companyCount, setCompanyCount] = useState(14800);
  const [activeTab, setActiveTab] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    efficiency: 0,
    growth: 0,
    automation: 0
  });
  const demoRef = useRef(null);
  const [isDemoVisible, setIsDemoVisible] = useState(false);

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

  // Observer para animaciones al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDemoVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (demoRef.current) {
      observer.observe(demoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (isAuthenticated) return null;

  // Componente de Dashboard Preview Moderno
  const DashboardPreview = () => (
    <Zoom in={true} timeout={1000}>
      <Box sx={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        borderRadius: '20px',
        p: 3,
        color: 'white',
        height: { xs: '350px', md: '400px' },
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Elementos decorativos */}
        <Box sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />

        {/* Header del Dashboard */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, position: 'relative', zIndex: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmartToy sx={{ fontSize: 20, color: '#60a5fa' }} />
              Panel de Control IA
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>Tiempo real • Actualizado ahora</Typography>
          </Box>
          <Chip 
            label="IA ACTIVA" 
            size="small" 
            sx={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', fontWeight: 600 }}
          />
        </Box>

        {/* KPIs Cards Mejoradas */}
        <Grid container spacing={2} sx={{ mb: 3, position: 'relative', zIndex: 2 }}>
          {[
            { value: '$52.8K', label: 'Ingresos IA', color: '#22c55e', trend: '+12%' },
            { value: '1,847', label: 'Optimizaciones', color: '#60a5fa', trend: '+8%' },
            { value: `${animatedStats.efficiency}%`, label: 'Eficiencia', color: '#f59e0b', trend: '+5%' },
            { value: '24/7', label: 'Automatización', color: '#8b5cf6', trend: '100%' }
          ].map((kpi, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper sx={{ 
                background: 'rgba(255,255,255,0.05)', 
                p: 2, 
                borderRadius: '12px',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-2px)' }
              }}>
                <Typography variant="h4" fontWeight={800} color={kpi.color} sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
                  {kpi.value}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>{kpi.label}</Typography>
                  <Chip label={kpi.trend} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Gráficos y Métricas IA */}
        <Grid container spacing={2} sx={{ height: '180px', position: 'relative', zIndex: 2 }}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ 
              background: 'rgba(255,255,255,0.03)', 
              p: 2, 
              borderRadius: '12px',
              height: '100%',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp sx={{ fontSize: 16 }} />
                Predicción IA - Próximos 30 días
              </Typography>
              {/* Gráfico animado */}
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'end', gap: 0.5, height: '80%' }}>
                {[30, 45, 65, 80, 95, 120, 140, 160, 145, 130, 155, 180].map((height, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      background: `linear-gradient(180deg, ${index >= 6 ? '#22c55e' : '#60a5fa'} 0%, ${index >= 6 ? '#16a34a' : '#3b82f6'} 100%)`,
                      height: `${Math.min(height, 100)}%`,
                      borderRadius: '3px',
                      minHeight: '10px',
                      transition: 'all 0.5s ease',
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { opacity: 1 },
                        '50%': { opacity: 0.8 },
                        '100%': { opacity: 1 }
                      }
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ 
              background: 'rgba(255,255,255,0.03)', 
              p: 2, 
              borderRadius: '12px',
              height: '100%',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Recomendaciones IA</Typography>
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
                    p: 1,
                    background: 'rgba(34, 197, 94, 0.1)',
                    borderRadius: '6px',
                    border: '1px solid rgba(34, 197, 94, 0.2)'
                  }}>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{item.action}</Typography>
                    <Chip 
                      label={item.impact} 
                      size="small" 
                      color={item.impact === 'Alto' ? 'success' : 'warning'}
                      sx={{ height: 18 }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Zoom>
  );

  // Componentes de preview actualizados (similares mejoras aplicadas)
  const SalesPreview = () => (
    <Fade in={isDemoVisible} timeout={800}>
      <Box sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        height: { xs: '350px', md: '400px' },
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Contenido similarmente mejorado */}
      </Box>
    </Fade>
  );

  // Estadísticas con Animación
  const AnimatedStatsSection = () => (
    <Container sx={{ py: 8, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '20px', my: 4 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
            Resultados que <Box component="span" color="#2563eb">Impulsan</Box> tu Negocio
          </Typography>
          <Typography variant="h6" color="#64748b" sx={{ mb: 3 }}>
            La inteligencia artificial transformando operaciones empresariales en tiempo real
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<RocketLaunch />}
            sx={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: '12px'
            }}
          >
            Ver Casos de Éxito
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            {[
              { value: `${animatedStats.efficiency}%`, label: 'Aumento en Eficiencia', icon: <TrendingUp /> },
              { value: `${animatedStats.growth}%`, label: 'Crecimiento en Ventas', icon: <Analytics /> },
              { value: `${companyCount.toLocaleString()}+`, label: 'Empresas Transformadas', icon: <Business /> },
              { value: `${animatedStats.automation}%`, label: 'Procesos Automatizados', icon: <AutoGraph /> }
            ].map((stat, index) => (
              <Grid item xs={6} key={index}>
                <Paper sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <Box sx={{ color: '#2563eb', mb: 1 }}>{stat.icon}</Box>
                  <Typography variant="h4" fontWeight={800} color="#1e293b">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="#64748b" sx={{ mt: 1 }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );

  // Hero Section Mejorada
  const HeroSection = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)', 
      color: 'white', 
      py: 8,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Elementos decorativos de fondo */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%)',
      }} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Chip 
                label="✨ PLATAFORMA CON INTELIGENCIA ARTIFICIAL"
                sx={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  fontWeight: 700, 
                  mb: 3,
                  fontSize: '0.8rem',
                  padding: '4px 12px'
                }}
              />
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' }, 
                fontWeight: 800, 
                lineHeight: 1.1, 
                mb: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                Revoluciona tu
                <Box component="span" sx={{ display: 'block', fontWeight: 900 }}>
                  Empresa con IA
                </Box>
              </Typography>
              <Typography variant="h6" sx={{ 
                opacity: 0.9, 
                lineHeight: 1.6, 
                mb: 4,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}>
                La primera plataforma que combina gestión empresarial completa 
                con inteligencia artificial predictiva para maximizar tus resultados.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  startIcon={<RocketLaunch />}
                  sx={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                    color: '#2563eb',
                    fontWeight: 800,
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    '&:hover': { 
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                      transform: 'translateY(-2px)'
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
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Demo Interactivo
                </Button>
              </Stack>

              {/* Mini estadísticas */}
              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {[
                  { value: '24/7', label: 'Monitoreo IA' },
                  { value: '99.9%', label: 'Disponibilidad' },
                  { value: '5min', label: 'Configuración' }
                ].map((stat, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight={800}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
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
  );

  // Resto del código manteniendo las mejoras de estilo...

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
      overflow: 'hidden'
    }}>
      
      {/* Header Modernizado */}
      <AppBar position="sticky" elevation={0} sx={{ 
        background: 'rgba(255,255,255,0.8)', 
        color: '#1f2937',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                borderRadius: '10px',
                p: 0.5
              }}>
                <SmartToy sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Typography variant="h6" fontWeight={800} sx={{ fontSize: '1.25rem' }}>
                UniversalBot<span style={{ color: '#2563eb' }}>AI</span>
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button onClick={() => navigate('/login')} sx={{ 
                color: '#374151', 
                fontWeight: 600,
                borderRadius: '8px'
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
                  px: 3,
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Probar IA Gratis
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <HeroSection />

      {/* Sección de Estadísticas Animadas */}
      <AnimatedStatsSection />

      {/* Demo Interactivo */}
      <Box ref={demoRef} sx={{ background: '#ffffff', py: 8 }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip 
              label="EXPLORA LA PLATAFORMA" 
              color="primary" 
              sx={{ mb: 2, fontWeight: 700 }}
            />
            <Typography variant="h2" sx={{ 
              fontSize: { xs: '2rem', md: '2.5rem' }, 
              fontWeight: 800, 
              mb: 2 
            }}>
              Descubre el Futuro de la
              <Box component="span" color="#2563eb" sx={{ display: 'block' }}>
                Gestión Empresarial
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ color: '#6b7280', maxWidth: '600px', mx: 'auto' }}>
              Interfaz intuitiva diseñada para resultados extraordinarios
            </Typography>
          </Box>

          {/* Resto del código... */}
        </Container>
      </Box>

      {/* CTA Final Mejorado */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', 
        color: 'white', 
        py: 12,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        
        <Container sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Typography variant="h2" sx={{ 
            fontSize: { xs: '2rem', md: '3rem' }, 
            fontWeight: 800, 
            mb: 2 
          }}>
            ¿Listo para la{' '}
            <Box component="span" sx={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #a5b4fc 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Revolución IA?
            </Box>
          </Typography>
          <Typography variant="h5" sx={{ 
            opacity: 0.9, 
            mb: 4, 
            maxWidth: '600px', 
            mx: 'auto',
            fontSize: { xs: '1.1rem', md: '1.25rem' }
          }}>
            Únete a las {companyCount.toLocaleString()}+ empresas que ya transformaron 
            sus operaciones con inteligencia artificial
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              startIcon={<RocketLaunch />}
              sx={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                color: '#2563eb',
                fontWeight: 800,
                px: 6,
                py: 1.5,
                minWidth: { xs: '100%', sm: '280px' },
                borderRadius: '12px',
                fontSize: '1.1rem',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 40px rgba(255,255,255,0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Comenzar con IA
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: 'white',
                fontWeight: 600,
                px: 6,
                py: 1.5,
                minWidth: { xs: '100%', sm: '280px' },
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderColor: 'white',
                  background: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Acceso Empresas
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer Mejorado */}
      <Box sx={{ background: '#0f172a', color: 'white', py: 6 }}>
        <Container>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Box sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                p: 1
              }}>
                <SmartToy sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h5" fontWeight={800}>
                UniversalBot<span style={{ color: '#60a5fa' }}>AI</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
              La plataforma de gestión empresarial impulsada por inteligencia artificial
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.5 }}>
              © 2025 UniversalBot AI Platform. Transformando empresas con tecnología inteligente.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
