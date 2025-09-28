import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  List, ListItem, ListItemIcon, Tabs, Tab, Paper,
  IconButton, Drawer, Divider, Fade, Zoom, Fab
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
  KeyboardArrowUp,
  LiveTv,
  EmojiEvents,
  GppGood,
  AccessTime,
  VerifiedUser
} from '@mui/icons-material';

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
    automation: 0,
    revenue: 0
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
        automation: prev.automation >= 92 ? 92 : prev.automation + 1,
        revenue: prev.revenue >= 245 ? 245 : prev.revenue + 3
      }));
    }, 50);

    return () => clearInterval(statsInterval);
  }, [isAuthenticated, navigate, companyCount]);

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
    setTimeout(() => {
      window.open('https://calendly.com/universalbot-ai/demo', '_blank');
    }, 500);
  };

  // Componente de Dashboard Preview - 100% Responsive
  const DashboardPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
      borderRadius: '16px',
      p: { xs: 2, sm: 3 },
      color: '#1f2937',
      minHeight: { xs: '380px', sm: '420px', md: '450px' },
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid #f1f5f9',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      mx: { xs: 0, sm: 0 }
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
            Panel de Control IA
          </Typography>
          <Typography variant="caption" sx={{ 
            color: '#6b7280', 
            fontSize: { xs: '0.65rem', sm: '0.75rem' } 
          }}>
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
            fontSize: { xs: '0.6rem', sm: '0.7rem' }
          }}
        />
      </Box>

      {/* KPIs Cards - Responsive */}
      <Grid container spacing={1.5} sx={{ mb: 3, position: 'relative', zIndex: 2 }}>
        {[
          { value: `$${animatedStats.revenue}K`, label: 'Ingresos IA', color: '#10b981', trend: '+12%' },
          { value: '1,847', label: 'Optimizaciones', color: '#3b82f6', trend: '+8%' },
          { value: `${animatedStats.efficiency}%`, label: 'Eficiencia', color: '#f59e0b', trend: '+5%' },
          { value: '24/7', label: 'Automatización', color: '#8b5cf6', trend: '100%' }
        ].map((kpi, index) => (
          <Grid item xs={6} key={index}>
            <Paper sx={{ 
              background: 'white', 
              p: { xs: 1, sm: 1.5 }, 
              borderRadius: '12px',
              border: '1px solid #f1f5f9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
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

      {/* Gráficos y Métricas IA */}
      <Grid container spacing={1.5} sx={{ position: 'relative', zIndex: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            background: 'white', 
            p: { xs: 1.5, sm: 2 }, 
            borderRadius: '12px',
            height: { xs: '140px', sm: '160px', md: '180px' },
            border: '1px solid #f1f5f9',
          }}>
            <Typography variant="body2" fontWeight={600} sx={{ 
              mb: 1, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              fontSize: { xs: '0.75rem', sm: '0.8rem' }
            }}>
              <TrendingUp sx={{ fontSize: { xs: 14, sm: 16 }, color: '#2563eb' }} />
              Predicción IA - Próximos 30 días
            </Typography>
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'end', 
              gap: 0.3, 
              height: '70%',
              padding: '4px 0'
            }}>
              {[40, 55, 70, 85, 95, 110, 130, 150, 140, 125, 145, 165].map((height, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    background: `linear-gradient(180deg, ${index >= 6 ? '#10b981' : '#3b82f6'} 0%, ${index >= 6 ? '#059669' : '#2563eb'} 100%)`,
                    height: `${Math.min(height / 2.5, 100)}%`,
                    borderRadius: '3px',
                    minHeight: '6px',
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
            p: { xs: 1.5, sm: 2 }, 
            borderRadius: '12px',
            height: { xs: '140px', sm: '160px', md: '180px' },
            border: '1px solid #f1f5f9',
          }}>
            <Typography variant="body2" fontWeight={600} sx={{ 
              mb: 1,
              fontSize: { xs: '0.75rem', sm: '0.8rem' }
            }}>
              Recomendaciones IA
            </Typography>
            <Stack spacing={0.8}>
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
                  borderRadius: '4px',
                  border: '1px solid rgba(34, 197, 94, 0.1)'
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
                    color={item.impact === 'Alto' ? 'success' : 'warning'}
                    sx={{ 
                      height: 16, 
                      fontSize: '0.5rem',
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

  // Componente de Vista de Ventas - Responsive
  const SalesPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
      borderRadius: '16px',
      border: '1px solid #f1f5f9',
      minHeight: { xs: '380px', sm: '420px' },
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    }}>
      <Box sx={{ 
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        color: 'white',
        p: 2,
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px'
      }}>
        <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
          Ventas Inteligentes
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Tendencias de Ventas IA
              </Typography>
              <Stack spacing={1}>
                {[
                  { producto: 'Producto Premium', crecimiento: '+45%', tendencia: '📈' },
                  { producto: 'Servicio Básico', crecimiento: '+23%', tendencia: '📈' },
                  { producto: 'Solución Empresa', crecimiento: '+67%', tendencia: '🚀' }
                ].map((venta, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1,
                    background: index % 2 === 0 ? '#f8fafc' : 'transparent',
                    borderRadius: '6px'
                  }}>
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                        {venta.producto}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                        {venta.tendencia} Crecimiento
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={600} color="#059669" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      {venta.crecimiento}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Eficiencia IA</Typography>
                <Typography variant="h5" color="#059669" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>+{animatedStats.efficiency}%</Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>Optimización ventas</Typography>
              </Paper>
              <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Clientes IA</Typography>
                <Typography variant="h5" color="#2563eb" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>+{Math.floor(animatedStats.growth / 10)}</Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>Recomendados este mes</Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  // Componente de Vista de Inventario - Responsive
  const InventoryPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
      borderRadius: '16px',
      border: '1px solid #f1f5f9',
      minHeight: { xs: '380px', sm: '420px' },
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    }}>
      <Box sx={{ 
        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        color: 'white',
        p: 2,
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px'
      }}>
        <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
          Inventario Inteligente
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Alertas Proactivas IA</Typography>
              <Stack spacing={1}>
                {[
                  { producto: 'Producto Estrella', stock: 'Óptimo', estado: '✅' },
                  { producto: 'Nuevo Lanzamiento', stock: 'En aumento', estado: '📦' },
                  { producto: 'Básico Esencial', stock: 'Estable', estado: '⚡' }
                ].map((item, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1,
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '6px',
                  }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{item.producto}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" sx={{ color: '#059669', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{item.stock}</Typography>
                      <span>{item.estado}</span>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Eficiencia IA</Typography>
              <Stack spacing={1}>
                {[
                  { tipo: 'Automatización', porcentaje: '95%', icon: '🤖' },
                  { tipo: 'Precisión', porcentaje: '99.8%', icon: '🎯' },
                  { tipo: 'Ahorro Tiempo', porcentaje: '87%', icon: '⏱️' }
                ].map((mov, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1,
                    background: index % 2 === 0 ? '#f8fafc' : 'transparent',
                    borderRadius: '6px'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{mov.icon}</span>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{mov.tipo}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={600} color="#2563eb" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{mov.porcentaje}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  // Componente de Vista de Reportes - Responsive
  const ReportsPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
      borderRadius: '16px',
      border: '1px solid #f1f5f9',
      minHeight: { xs: '380px', sm: '420px' },
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    }}>
      <Box sx={{ 
        background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
        color: 'white',
        p: 2,
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px'
      }}>
        <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
          Analítica Predictiva IA
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Predicciones IA</Typography>
              <Box sx={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%',
                background: 'conic-gradient(#3b82f6 0% 40%, #10b981 40% 70%, #f59e0b 70% 90%, #8b5cf6 90% 100%)',
                mx: 'auto',
                mb: 2,
                border: '4px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }} />
              <Stack spacing={1}>
                {[
                  { categoria: 'Crecimiento Alto', color: '#3b82f6', porcentaje: '40%' },
                  { categoria: 'Estabilidad', color: '#10b981', porcentaje: '30%' },
                  { categoria: 'Optimización', color: '#f59e0b', porcentaje: '20%' }
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{item.categoria}</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{item.porcentaje}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Reportes IA</Typography>
              <Stack spacing={1.5}>
                {[
                  { nombre: 'Análisis Predictivo', icon: '🔮', desc: 'Tendencias futuras' },
                  { nombre: 'Optimización IA', icon: '⚡', desc: 'Mejoras automáticas' },
                  { nombre: 'Clientes Ideales', icon: '🎯', desc: 'Segmentación inteligente' }
                ].map((reporte, index) => (
                  <Box key={index} sx={{ 
                    p: 1.5,
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: 'pointer',
                    '&:hover': { background: '#f8fafc', transform: 'translateX(4px)' },
                    transition: 'all 0.2s ease'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Box sx={{ fontSize: '20px' }}>{reporte.icon}</Box>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{reporte.nombre}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#6b7280', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{reporte.desc}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  const demoScreens = [
    { title: "Dashboard IA", component: <DashboardPreview /> },
    { title: "Ventas Inteligentes", component: <SalesPreview /> },
    { title: "Inventario IA", component: <InventoryPreview /> },
    { title: "Analítica Predictiva", component: <ReportsPreview /> }
  ];

  const platformModules = [
    {
      icon: <PointOfSale sx={{ fontSize: { xs: 32, sm: 40 }, color: '#2563eb' }} />,
      title: 'Ventas Inteligentes',
      features: ['IA predictiva de ventas', 'Automatización de procesos', 'Clientes recomendados por IA', 'Optimización en tiempo real'],
      description: 'Sistema de ventas impulsado por inteligencia artificial que anticipa tendencias'
    },
    {
      icon: <Inventory sx={{ fontSize: { xs: 32, sm: 40 }, color: '#059669' }} />,
      title: 'Inventario IA',
      features: ['Gestión predictiva de stock', 'Alertas automáticas IA', 'Optimización automática', 'Análisis de tendencias'],
      description: 'Control inteligente de inventario que previene faltantes y excesos'
    },
    {
      icon: <AccountBalance sx={{ fontSize: { xs: 32, sm: 40 }, color: '#dc2626' }} />,
      title: 'Finanzas Autónomas',
      features: ['IA contable automática', 'Detección de anomalías', 'Optimización fiscal IA', 'Reportes inteligentes'],
      description: 'Sistema financiero que se auto-optimiza y detecta oportunidades'
    },
    {
      icon: <Campaign sx={{ fontSize: { xs: 32, sm: 40 }, color: '#7c3aed' }} />,
      title: 'Marketing IA',
      features: ['Segmentación inteligente', 'Campañas automáticas', 'Análisis de ROI en tiempo real', 'Optimización continua'],
      description: 'Marketing que aprende y se adapta automáticamente a tu audiencia'
    }
  ];

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

  // Componente de testimonio
  const TestimonialCard = ({ name, company, role, content, avatar, rating }) => (
    <Card sx={{ 
      p: 3, 
      height: '100%',
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ 
          width: 40, 
          height: 40, 
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          mr: 2
        }}>
          {avatar}
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>{name}</Typography>
          <Typography variant="body2" color="#6b7280" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{role} • {company}</Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', mb: 2 }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} sx={{ 
            color: i < rating ? '#f59e0b' : '#e5e7eb',
            fontSize: '0.9rem'
          }} />
        ))}
      </Box>
      
      <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#4b5563', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
        "{content}"
      </Typography>
    </Card>
  );

  if (isAuthenticated) return null;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      overflowX: 'hidden'
    }}>
      
      {/* Header 100% Responsive */}
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
              <Chip 
                label="BETA" 
                size="small" 
                sx={{ 
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.6rem',
                  height: '20px'
                }}
              />
            </Box>

            {/* Desktop Menu */}
            {!isMobile ? (
              <Stack direction="row" spacing={1.5}>
                <Button 
                  startIcon={<LiveTv />}
                  onClick={handleDemoRequest}
                  sx={{ 
                    color: '#374151', 
                    fontWeight: 600,
                    borderRadius: '8px',
                    px: 2.5,
                    fontSize: '0.85rem',
                    minWidth: 'auto'
                  }}
                >
                  Demo en Vivo
                </Button>
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
                  Probar Gratis
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

      {/* Mobile Menu Drawer */}
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
          <Stack spacing={2}>
            <Button 
              fullWidth 
              startIcon={<LiveTv />}
              onClick={handleDemoRequest}
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              Demo en Vivo
            </Button>
            <Button 
              fullWidth 
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              Iniciar Sesión
            </Button>
            <Button 
              fullWidth 
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{ 
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                py: 1.5
              }}
            >
              Probar Gratis
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* Hero Section - Mejorada con elementos de conversión */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', 
        color: 'white', 
        py: { xs: 4, sm: 6, md: 8 },
        position: 'relative',
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                
                {/* Oferta Especial */}
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
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, 
                  fontWeight: 800, 
                  lineHeight: 1.1, 
                  mb: 2
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

                <Typography variant="h6" sx={{ 
                  opacity: 0.9, 
                  lineHeight: 1.5, 
                  mb: 3,
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                }}>
                  La primera plataforma de <strong>IA empresarial completa</strong> que 
                  automatiza ventas, marketing y operaciones mientras tú duermes.
                </Typography>

                {/* Social Proof Mejorada */}
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
                    onClick={handleDemoRequest}
                    startIcon={<PlayArrow />}
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
                    Ver Demo
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
                    borderRadius: '6px'
                  }}>
                    <VerifiedUser sx={{ fontSize: 16, color: '#22c55e' }} />
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                      Garantía de resultados 30 días
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

      {/* Sección de Estadísticas Animadas */}
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' }, 
              fontWeight: 800, 
              mb: 2 
            }}>
              Resultados que <Box component="span" color="#2563eb">Impulsan</Box> tu Negocio
            </Typography>
            <Typography variant="h6" color="#64748b" sx={{ mb: 3, lineHeight: 1.6, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              La inteligencia artificial transformando operaciones empresariales en tiempo real. 
              Más de {companyCount.toLocaleString()} empresas ya experimentaron el cambio.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<RocketLaunch />}
              sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                fontWeight: 700,
                px: 4,
                py: 1.25,
                borderRadius: '8px',
                fontSize: { xs: '0.85rem', sm: '0.9rem' }
              }}
            >
              Ver Casos de Éxito
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {[
                { value: `${animatedStats.efficiency}%`, label: 'Aumento en Eficiencia', icon: <TrendingUp sx={{ color: '#2563eb' }} /> },
                { value: `${animatedStats.growth}%`, label: 'Crecimiento en Ventas', icon: <Analytics sx={{ color: '#059669' }} /> },
                { value: `${companyCount.toLocaleString()}+`, label: 'Empresas Transformadas', icon: <Business sx={{ color: '#dc2626' }} /> },
                { value: `${animatedStats.automation}%`, label: 'Procesos Automatizados', icon: <AutoGraph sx={{ color: '#7c3aed' }} /> }
              ].map((stat, index) => (
                <Grid item xs={6} key={index}>
                  <Paper sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    border: '1px solid #e2e8f0',
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

      {/* Sección: El Problema vs La Solución */}
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
          <Chip 
            label="🚀 TRANSFORMACIÓN DIGITAL" 
            sx={{ 
              mb: 2, 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              color: '#2563eb',
              fontSize: { xs: '0.7rem', sm: '0.8rem' }
            }}
          />
          <Typography variant="h2" sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' }, 
            fontWeight: 800, 
            mb: 1 
          }}>
            ¿Sientes que tu negocio podría
            <Box component="span" color="#2563eb" sx={{ display: 'block' }}>
              rendir más?
            </Box>
          </Typography>
          <Typography variant="h6" sx={{ color: '#6b7280', fontSize: { xs: '0.85rem', sm: '1rem' } }}>
            Identificamos los principales desafíos que enfrentan las empresas
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
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
          ].map((point, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                p: 3,
                height: '100%',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.1)'
                }
              }}>
                <Typography variant="h6" fontWeight={700} color="#ef4444" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {point.problem}
                </Typography>
                <Typography variant="body1" fontWeight={600} color="#059669" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                  {point.solution}
                </Typography>
                <Box sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  px: 2,
                  py: 0.5,
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: { xs: '0.7rem', sm: '0.8rem' }
                }}>
                  {point.result}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sección de Demo Interactivo */}
      <Box sx={{ background: '#ffffff', py: { xs: 4, sm: 6, md: 8 } }}>
        <Container sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
            <Chip 
              label="💫 EXPLORA LA PLATAFORMA" 
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                color: '#2563eb',
                fontSize: { xs: '0.7rem', sm: '0.8rem' }
              }}
            />
            <Typography variant="h2" sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' }, 
              fontWeight: 800, 
              mb: 1
            }}>
              Descubre el Futuro de la
              <Box component="span" color="#2563eb" sx={{ display: 'block' }}>
                Gestión Empresarial
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#6b7280', 
              fontSize: { xs: '0.85rem', sm: '1rem' },
              lineHeight: 1.5
            }}>
              Interfaz diseñada para resultados extraordinarios
            </Typography>
          </Box>

          {/* Tabs Responsive */}
          <Box sx={{ mb: 4, overflow: 'auto' }}>
            <Tabs 
              value={activeTab} 
              onChange={(e, newValue) => setActiveTab(newValue)} 
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                '& .MuiTab-root': {
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  minWidth: 'auto',
                  px: { xs: 1.5, sm: 2 },
                  minHeight: '48px'
                }
              }}
            >
              {demoScreens.map((screen, index) => (
                <Tab 
                  key={index} 
                  label={screen.title}
                />
              ))}
            </Tabs>
          </Box>

          {/* Demo Content */}
          <Box>
            {demoScreens[activeTab].component}
          </Box>
        </Container>
      </Box>

      {/* Sección: Testimonios */}
      <Box sx={{ background: '#f8fafc', py: { xs: 4, sm: 6, md: 8 } }}>
        <Container sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
            <Typography variant="h2" sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' }, 
              fontWeight: 800, 
              mb: 1 
            }}>
              Lo que dicen nuestros
              <Box component="span" color="#2563eb" sx={{ display: 'block' }}>
                clientes satisfechos
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#6b7280', 
              fontSize: { xs: '0.85rem', sm: '1rem' }
            }}>
              Empresas que transformaron sus resultados con nuestra plataforma
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TestimonialCard {...testimonial} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Módulos de la Plataforma */}
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
          <Typography variant="h2" sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' }, 
            fontWeight: 700, 
            mb: 1 
          }}>
            Módulos Impulsados por IA
          </Typography>
          <Typography variant="h6" sx={{ 
            color: '#6b7280', 
            fontSize: { xs: '0.85rem', sm: '1rem' }
          }}>
            Soluciones inteligentes para cada área de tu empresa
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {platformModules.map((module, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                borderRadius: '12px',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                }
              }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Box sx={{ 
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                      borderRadius: '10px',
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {module.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" fontWeight={700} color="#1f2937" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                        {module.title}
                      </Typography>
                      <Typography variant="body2" color="#6b7280" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                        {module.description}
                      </Typography>
                      <List dense sx={{ py: 0 }}>
                        {module.features.map((feature, idx) => (
                          <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: '28px' }}>
                              <CheckCircle sx={{ color: '#10b981', fontSize: { xs: 16, sm: 18 } }} />
                            </ListItemIcon>
                            <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{feature}</Typography>
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

      {/* CTA Final Mejorado */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #374151 100%)', 
        color: 'white', 
        py: { xs: 6, sm: 8 },
        textAlign: 'center'
      }}>
        <Container sx={{ px: { xs: 2, sm: 3 } }}>
          
          {/* Oferta Especial */}
          <Box sx={{ 
            display: 'inline-flex', 
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '12px',
            px: 3,
            py: 1.5,
            mb: 3,
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
          }}>
            <Typography variant="h6" fontWeight={800} sx={{ mr: 2, color: 'white', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              🚀 OFERTA DE LANZAMIENTO
            </Typography>
            <Box sx={{ 
              background: 'white', 
              color: '#d97706',
              px: 2,
              py: 0.5,
              borderRadius: '6px',
              fontWeight: 900,
              fontSize: { xs: '0.8rem', sm: '0.9rem' }
            }}>
              75% OFF
            </Box>
          </Box>

          <Typography variant="h2" sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, 
            fontWeight: 800, 
            mb: 2 
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
            mb: 3,
            fontSize: { xs: '0.9rem', sm: '1.1rem' }
          }}>
            Únete a las <strong>{companyCount.toLocaleString()}+ empresas</strong> que ya 
            automatizaron sus operaciones
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              startIcon={<RocketLaunch />}
              sx={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white',
                fontWeight: 700,
                px: 4,
                py: 1.25,
                borderRadius: '8px',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                minWidth: { xs: '100%', sm: '200px' },
                boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
              }}
            >
              Comenzar Gratis
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleDemoRequest}
              startIcon={<LiveTv />}
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: 'white',
                fontWeight: 600,
                px: 4,
                py: 1.25,
                borderRadius: '8px',
                minWidth: { xs: '100%', sm: '200px' },
              }}
            >
              Demo Personalizado
            </Button>
          </Stack>

          {/* Garantías finales */}
          <Grid container spacing={3} sx={{ maxWidth: '600px', mx: 'auto' }}>
            {[
              { icon: <GppGood />, text: "Garantía 30 días" },
              { icon: <AccessTime />, text: "Configuración 5min" },
              { icon: <VerifiedUser />, text: "Soporte 24/7" },
              { icon: <EmojiEvents />, text: "ROI Comprobado" }
            ].map((item, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Box sx={{ color: '#22c55e' }}>
                    {item.icon}
                  </Box>
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                    {item.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ background: '#0f172a', color: 'white', py: 4 }}>
        <Container sx={{ textAlign: 'center', px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <SmartToy sx={{ color: '#60a5fa', fontSize: { xs: 24, sm: 28 } }} />
            <Typography variant="h6" fontWeight={800} sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              UniversalBot<span style={{ color: '#60a5fa' }}>AI</span>
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.7, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
            Transformando empresas con tecnología inteligente
          </Typography>
        </Container>
      </Box>

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
