import React, { useState, useEffect } from 'react';
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

  // Animaciones sincronizadas y realistas
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    let statsInterval;
    let companyInterval;

    // Animación contador de empresas (más lento y realista)
    if (companyCount < 15200) {
      companyInterval = setInterval(() => {
        setCompanyCount(prev => prev >= 15200 ? 15200 : prev + 10);
      }, 40);
    }

    // Animación estadísticas (todas empiezan y terminan al mismo tiempo)
    const startTime = Date.now();
    const duration = 3000; // 3 segundos para todas las animaciones
    
    statsInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimatedStats({
        efficiency: Math.floor(75 * progress),
        growth: Math.floor(42 * progress),
        automation: Math.floor(88 * progress)
      });

      if (progress >= 1) {
        clearInterval(statsInterval);
      }
    }, 16);

    return () => {
      clearInterval(companyInterval);
      clearInterval(statsInterval);
    };
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

  // Componente de Dashboard Preview - Mejorado y realista
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

      {/* KPIs Cards - Más realistas */}
      <Grid container spacing={1.5} sx={{ mb: 3 }}>
        {[
          { value: `$${Math.floor(animatedStats.growth * 100)}`, label: 'Ingresos Mensuales', color: '#10b981', trend: '+12%' },
          { value: `${animatedStats.efficiency}%`, label: 'Eficiencia', color: '#3b82f6', trend: '+8%' },
          { value: `${animatedStats.automation}%`, label: 'Automatización', color: '#f59e0b', trend: '+15%' },
          { value: '24/7', label: 'Disponibilidad', color: '#8b5cf6', trend: '100%' }
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

      {/* Gráficos y Métricas IA - Mejorados */}
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
              Tendencias - Próximos 30 días
            </Typography>
            {/* Gráfico de barras mejorado */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'end', 
              gap: 0.5, 
              height: '70%',
              padding: '4px 0',
              justifyContent: 'space-between'
            }}>
              {[
                { height: 40, label: 'Lun', color: '#3b82f6' },
                { height: 65, label: 'Mar', color: '#3b82f6' },
                { height: 80, label: 'Mié', color: '#3b82f6' },
                { height: 95, label: 'Jue', color: '#3b82f6' },
                { height: 110, label: 'Vie', color: '#3b82f6' },
                { height: 130, label: 'Sáb', color: '#10b981' },
                { height: 150, label: 'Dom', color: '#10b981' }
              ].map((bar, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <Box
                    sx={{
                      width: '80%',
                      background: `linear-gradient(180deg, ${bar.color} 0%, ${bar.color}99 100%)`,
                      height: `${Math.min(bar.height / 2.5, 100)}%`,
                      borderRadius: '4px 4px 0 0',
                      minHeight: '8px',
                      transition: 'all 0.5s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Typography variant="caption" sx={{ 
                    color: '#6b7280', 
                    fontSize: '0.6rem',
                    mt: 0.5
                  }}>
                    {bar.label}
                  </Typography>
                </Box>
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
              Alertas del Sistema
            </Typography>
            <Stack spacing={0.8}>
              {[
                { action: 'Stock bajo producto A', impact: 'Alta' },
                { action: 'Oportunidad cliente B', impact: 'Media' },
                { action: 'Optimización sugerida', impact: 'Alta' }
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
                    color={item.impact === 'Alta' ? 'success' : 'warning'}
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

  // Componente de Vista de Ventas - Mejorado
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
          Gestión de Ventas
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Métricas de Ventas
              </Typography>
              <Stack spacing={1}>
                {[
                  { producto: 'Ventas Online', crecimiento: '+28%', tendencia: '📈' },
                  { producto: 'Ventas Presenciales', crecimiento: '+15%', tendencia: '📈' },
                  { producto: 'Clientes Recurrentes', crecimiento: '+42%', tendencia: '🚀' }
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
                        {venta.tendencia} Tendencia
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
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Conversión</Typography>
                <Typography variant="h5" color="#059669" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>+{animatedStats.efficiency}%</Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>Mejora mensual</Typography>
              </Paper>
              <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>Nuevos Clientes</Typography>
                <Typography variant="h5" color="#2563eb" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>+{Math.floor(animatedStats.growth / 2)}</Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>Este mes</Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  // Componente de Vista de Inventario - Mejorado
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
          Control de Inventario
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Estado de Stock</Typography>
              <Stack spacing={1}>
                {[
                  { producto: 'Producto A', stock: 'Óptimo', estado: '✅' },
                  { producto: 'Producto B', stock: 'Bajo', estado: '⚠️' },
                  { producto: 'Producto C', stock: 'Estable', estado: '✅' }
                ].map((item, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1,
                    background: item.stock === 'Bajo' ? '#fef2f2' : '#f0fdf4',
                    border: item.stock === 'Bajo' ? '1px solid #fecaca' : '1px solid #bbf7d0',
                    borderRadius: '6px',
                  }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{item.producto}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" sx={{ 
                        color: item.stock === 'Bajo' ? '#dc2626' : '#059669', 
                        fontSize: { xs: '0.7rem', sm: '0.8rem' } 
                      }}>
                        {item.stock}
                      </Typography>
                      <span>{item.estado}</span>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Eficiencia</Typography>
              <Stack spacing={1}>
                {[
                  { tipo: 'Rotación Stock', porcentaje: '92%', icon: '🔄' },
                  { tipo: 'Precisión', porcentaje: '98.5%', icon: '🎯' },
                  { tipo: 'Ahorro Tiempo', porcentaje: '85%', icon: '⏱️' }
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

  // Componente de Vista de Reportes - Mejorado sin gráfica de torta
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
          Análisis y Reportes
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', height: '100%' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Métricas Clave</Typography>
              <Stack spacing={2}>
                {[
                  { nombre: 'Crecimiento Mensual', valor: `+${animatedStats.growth}%`, icon: '📊', color: '#10b981' },
                  { nombre: 'Eficiencia Operativa', valor: `${animatedStats.efficiency}%`, icon: '⚡', color: '#3b82f6' },
                  { nombre: 'Automatización', valor: `${animatedStats.automation}%`, icon: '🤖', color: '#f59e0b' }
                ].map((metrica, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 1.5,
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'white',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ fontSize: '20px' }}>{metrica.icon}</Box>
                      <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{metrica.nombre}</Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Actualizado</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" fontWeight={700} color={metrica.color} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      {metrica.valor}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Reportes Disponibles</Typography>
              <Stack spacing={1.5}>
                {[
                  { nombre: 'Análisis de Ventas', desc: 'Tendencias y patrones' },
                  { nombre: 'Optimización Stock', desc: 'Sugerencias inteligentes' },
                  { nombre: 'Clientes Ideales', desc: 'Segmentación avanzada' }
                ].map((reporte, index) => (
                  <Box key={index} sx={{ 
                    p: 1.5,
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: 'pointer',
                    '&:hover': { background: '#f8fafc' },
                    transition: 'all 0.2s ease'
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
    { title: "Dashboard Principal", component: <DashboardPreview /> },
    { title: "Gestión de Ventas", component: <SalesPreview /> },
    { title: "Control Inventario", component: <InventoryPreview /> },
    { title: "Análisis y Reportes", component: <ReportsPreview /> }
  ];

  const platformModules = [
    {
      icon: <PointOfSale sx={{ fontSize: { xs: 32, sm: 40 }, color: '#2563eb' }} />,
      title: 'Ventas Inteligentes',
      features: ['Análisis predictivo de ventas', 'Automatización de procesos', 'Segmentación de clientes', 'Optimización en tiempo real'],
      description: 'Sistema de ventas que anticipa tendencias y oportunidades'
    },
    {
      icon: <Inventory sx={{ fontSize: { xs: 32, sm: 40 }, color: '#059669' }} />,
      title: 'Gestión de Inventario',
      features: ['Control predictivo de stock', 'Alertas automáticas', 'Optimización de espacio', 'Análisis de rotación'],
      description: 'Control inteligente que previene faltantes y optimiza recursos'
    },
    {
      icon: <AccountBalance sx={{ fontSize: { xs: 32, sm: 40 }, color: '#dc2626' }} />,
      title: 'Análisis Financiero',
      features: ['Reportes automáticos', 'Detección de anomalías', 'Análisis de rentabilidad', 'Proyecciones realistas'],
      description: 'Sistema que analiza y optimiza el rendimiento financiero'
    },
    {
      icon: <Campaign sx={{ fontSize: { xs: 32, sm: 40 }, color: '#7c3aed' }} />,
      title: 'Marketing Eficiente',
      features: ['Segmentación inteligente', 'Campañas optimizadas', 'Análisis de ROI', 'Automatización estratégica'],
      description: 'Herramientas que maximizan el impacto de tus campañas'
    }
  ];

  // Datos para testimonios realistas
  const testimonials = [
    {
      name: "María González",
      company: "Tienda Moderna",
      role: "Propietaria",
      avatar: "MG",
      rating: 5,
      content: "Desde que implementamos el sistema, nuestra eficiencia operativa mejoró un 40%. La automatización nos ahorra horas diarias de trabajo manual."
    },
    {
      name: "Carlos Rodríguez",
      company: "Distribuidora Norte",
      role: "Gerente",
      avatar: "CR",
      rating: 5,
      content: "El control de inventario predictivo eliminó nuestros problemas de stock. Ahora tenemos siempre lo necesario sin excesos."
    },
    {
      name: "Ana Martínez",
      company: "Boutique Elegante", 
      role: "Directora",
      avatar: "AM",
      rating: 4,
      content: "Las herramientas de análisis nos han permitido entender mejor a nuestros clientes y personalizar nuestras estrategias."
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

      {/* Hero Section - Más profesional y creíble */}
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

      {/* Sección de Estadísticas Animadas - Realistas y sincronizadas */}
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
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

      {/* Sección: Desafíos Comunes */}
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
          <Typography variant="h2" sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' }, 
            fontWeight: 800, 
            mb: 1 
          }}>
            Desafíos que <Box component="span" color="#2563eb">Resolvemos</Box>
          </Typography>
          <Typography variant="h6" sx={{ color: '#6b7280', fontSize: { xs: '0.85rem', sm: '1rem' } }}>
            Problemas comunes que enfrentan las empresas y cómo los abordamos
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            {
              problem: "Gestión manual del inventario",
              solution: "Control automático y predictivo",
              result: "95% precisión"
            },
            {
              problem: "Pérdida de oportunidades de venta", 
              solution: "Análisis inteligente de clientes",
              result: "+28% conversiones"
            },
            {
              problem: "Tiempo en reportes manuales",
              solution: "Reportes automáticos en tiempo real",
              result: "-12 horas/semana"
            },
            {
              problem: "Decisiones sin datos precisos",
              solution: "Análisis con inteligencia artificial", 
              result: "Decisiones informadas"
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
              }}>
                <Typography variant="h6" fontWeight={700} color="#374151" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {point.problem}
                </Typography>
                <Typography variant="body1" fontWeight={600} color="#059669" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                  {point.solution}
                </Typography>
                <Box sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#f0fdf4',
                  color: '#059669',
                  px: 2,
                  py: 0.5,
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  border: '1px solid #bbf7d0'
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
            <Typography variant="h2" sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' }, 
              fontWeight: 800, 
              mb: 1
            }}>
              Conoce Nuestra
              <Box component="span" color="#2563eb" sx={{ display: 'block' }}>
                Plataforma
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#6b7280', 
              fontSize: { xs: '0.85rem', sm: '1rem' },
              lineHeight: 1.5
            }}>
              Explora las herramientas que transformarán tu forma de trabajar
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
                clientes
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#6b7280', 
              fontSize: { xs: '0.85rem', sm: '1rem' }
            }}>
              Experiencias reales de empresas que usan nuestra plataforma
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
            Funcionalidades <Box component="span" color="#2563eb">Principales</Box>
          </Typography>
          <Typography variant="h6" sx={{ 
            color: '#6b7280', 
            fontSize: { xs: '0.85rem', sm: '1rem' }
          }}>
            Herramientas diseñadas para optimizar cada área de tu empresa
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {platformModules.map((module, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
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

      {/* CTA Final - Más profesional */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #374151 100%)', 
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
            ¿Listo para Optimizar tu
            <Box component="span" sx={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #a5b4fc 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              display: 'block'
            }}>
              Negocio?
            </Box>
          </Typography>
          
          <Typography variant="h5" sx={{ 
            opacity: 0.9, 
            mb: 3,
            fontSize: { xs: '0.9rem', sm: '1.1rem' }
          }}>
            Únete a las <strong>{companyCount.toLocaleString()}+ empresas</strong> que ya 
            están transformando sus operaciones
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
              Acceso Clientes
            </Button>
          </Stack>

          {/* Beneficios realistas */}
          <Grid container spacing={3} sx={{ maxWidth: '600px', mx: 'auto' }}>
            {[
              { icon: <GppGood />, text: "Seguro y Confiable" },
              { icon: <AccessTime />, text: "Configuración Rápida" },
              { icon: <VerifiedUser />, text: "Soporte Dedicado" }
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
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
            Herramientas inteligentes para empresas modernas
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
