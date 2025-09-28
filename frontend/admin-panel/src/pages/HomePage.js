import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  List, ListItem, ListItemIcon, Tabs, Tab, Paper,
  IconButton, Drawer, Divider
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
  Menu as MenuIcon,
  Close as CloseIcon,
  People
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
      {/* Header del Dashboard */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mb: 3, 
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 0 }
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
      <Grid container spacing={1.5} sx={{ mb: 3 }}>
        {[
          { value: '$52.8K', label: 'Ingresos IA', color: '#10b981', trend: '+12%' },
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
              height: '100%'
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
      <Grid container spacing={1.5}>
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
              Predicción IA
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
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Tendencias de Ventas IA
              </Typography>
              <Stack spacing={1}>
                {[
                  { producto: 'Producto Premium', crecimiento: '+45%' },
                  { producto: 'Servicio Básico', crecimiento: '+23%' },
                  { producto: 'Solución Empresa', crecimiento: '+67%' }
                ].map((venta, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1,
                    background: index % 2 === 0 ? '#f8fafc' : 'transparent',
                    borderRadius: '6px'
                  }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      {venta.producto}
                    </Typography>
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
              <Paper sx={{ p: 2, background: 'white', borderRadius: '8px' }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Eficiencia IA</Typography>
                <Typography variant="h5" color="#059669" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>+{animatedStats.efficiency}%</Typography>
              </Paper>
              <Paper sx={{ p: 2, background: 'white', borderRadius: '8px' }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Clientes IA</Typography>
                <Typography variant="h5" color="#2563eb" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>+{Math.floor(animatedStats.growth / 10)}</Typography>
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
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Alertas Proactivas</Typography>
              <Stack spacing={1}>
                {[
                  { producto: 'Producto Estrella', stock: 'Óptimo' },
                  { producto: 'Nuevo Lanzamiento', stock: 'En aumento' },
                  { producto: 'Básico Esencial', stock: 'Estable' }
                ].map((item, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1,
                    background: '#f0fdf4',
                    borderRadius: '6px',
                  }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{item.producto}</Typography>
                    <Typography variant="caption" sx={{ color: '#059669', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{item.stock}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Eficiencia IA</Typography>
              <Stack spacing={1}>
                {[
                  { tipo: 'Automatización', porcentaje: '95%' },
                  { tipo: 'Precisión', porcentaje: '99.8%' },
                  { tipo: 'Ahorro Tiempo', porcentaje: '87%' }
                ].map((mov, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1,
                    background: index % 2 === 0 ? '#f8fafc' : 'transparent',
                    borderRadius: '6px'
                  }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{mov.tipo}</Typography>
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
          Analítica Predictiva
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Predicciones IA</Typography>
              <Box sx={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%',
                background: 'conic-gradient(#3b82f6 0% 40%, #10b981 40% 70%, #f59e0b 70% 90%, #8b5cf6 90% 100%)',
                mx: 'auto',
                mb: 2
              }} />
              <Stack spacing={1}>
                {[
                  { categoria: 'Crecimiento Alto', color: '#3b82f6' },
                  { categoria: 'Estabilidad', color: '#10b981' },
                  { categoria: 'Optimización', color: '#f59e0b' }
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{item.categoria}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Reportes IA</Typography>
              <Stack spacing={1.5}>
                {[
                  { nombre: 'Análisis Predictivo', desc: 'Tendencias futuras' },
                  { nombre: 'Optimización IA', desc: 'Mejoras automáticas' },
                  { nombre: 'Clientes Ideales', desc: 'Segmentación inteligente' }
                ].map((reporte, index) => (
                  <Box key={index} sx={{ 
                    p: 1.5,
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'white',
                  }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{reporte.nombre}</Typography>
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
    { title: "Ventas", component: <SalesPreview /> },
    { title: "Inventario", component: <InventoryPreview /> },
    { title: "Analítica", component: <ReportsPreview /> }
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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

            {/* Desktop Menu */}
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
                    whiteSpace: 'nowrap'
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

      {/* Hero Section - 100% Responsive */}
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
                <Chip 
                  label="🚀 PLATAFORMA IA"
                  sx={{ 
                    background: 'rgba(255,255,255,0.15)', 
                    color: 'white', 
                    fontWeight: 700, 
                    mb: 3,
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                    padding: '4px 12px',
                  }}
                />
                <Typography variant="h1" sx={{ 
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, 
                  fontWeight: 800, 
                  lineHeight: 1.1, 
                  mb: 2
                }}>
                  Revoluciona tu
                  <Box component="span" sx={{ 
                    display: 'block', 
                    fontWeight: 900,
                  }}>
                    Empresa con IA
                  </Box>
                </Typography>
                <Typography variant="h6" sx={{ 
                  opacity: 0.9, 
                  lineHeight: 1.5, 
                  mb: 3,
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                }}>
                  La plataforma todo-en-uno que unifica gestión empresarial 
                  con inteligencia artificial predictiva.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ 
                  mb: 3,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                      color: '#2563eb',
                      fontWeight: 700,
                      px: { xs: 3, sm: 4 },
                      py: 1.25,
                      borderRadius: '8px',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      minWidth: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    Comenzar Gratis
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
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

                {/* Estadísticas rápidas */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: 2, sm: 3 }, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  {[
                    { value: '24/7', label: 'Monitoreo' },
                    { value: '99.9%', label: 'Disponibilidad' },
                    { value: '5min', label: 'Configuración' }
                  ].map((stat, index) => (
                    <Box key={index} sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" fontWeight={800} sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mt: { xs: 3, md: 0 } }}>
              <DashboardPreview />
            </Grid>
          </Grid>
        </Container>
      </Box>

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
              Descubre el Futuro
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
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                borderRadius: '12px',
                height: '100%'
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

      {/* CTA Final */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', 
        color: 'white', 
        py: { xs: 6, sm: 8 },
        textAlign: 'center'
      }}>
        <Container sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography variant="h2" sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, 
            fontWeight: 800, 
            mb: 2 
          }}>
            ¿Listo para Comenzar?
          </Typography>
          <Typography variant="h5" sx={{ 
            opacity: 0.9, 
            mb: 3,
            fontSize: { xs: '0.9rem', sm: '1.1rem' }
          }}>
            Únete a {companyCount.toLocaleString()}+ empresas transformadas
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                color: '#2563eb',
                fontWeight: 700,
                px: 4,
                py: 1.25,
                borderRadius: '8px',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                minWidth: { xs: '100%', sm: '200px' },
              }}
            >
              Comenzar Gratis
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
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
              Iniciar Sesión
            </Button>
          </Stack>
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
    </Box>
  );
};

export default HomePage;
