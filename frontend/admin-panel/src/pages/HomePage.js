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
  VerifiedUser,
  Chat,
  WhatsApp,
  Instagram,
  Facebook,
  Email
} from '@mui/icons-material';

// Hook personalizado para animaciones de entrada
const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
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
  const [heroRef, heroInView] = useInView(0.3);
  const [statsRef, statsInView] = useInView(0.2);

  // Animaciones más rápidas y optimizadas
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    let statsInterval;
    let companyInterval;

    // Animación contador de empresas - Más rápida
    if (companyCount < 16800) {
      companyInterval = setInterval(() => {
        setCompanyCount(prev => prev >= 16800 ? 16800 : prev + 20);
      }, 20);
    }

    // Animación estadísticas - Más rápida y suave
    if (statsInView) {
      const startTime = Date.now();
      const duration = 1800; // Reducido de 2500 a 1800
      
      statsInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
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

  // Componente de Gráfico de Barras Animado - MEJORADO con efectos inmediatos
  const AnimatedBarChart = ({ data, isVisible }) => {
    const [animatedHeights, setAnimatedHeights] = useState(data.map(() => 0));

    useEffect(() => {
      if (isVisible) {
        // Animación inmediata sin delay
        setAnimatedHeights(data.map(item => item.height));
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
                height: `${isVisible ? animatedHeights[index] : 0}%`,
                borderRadius: '4px 4px 0 0',
                minHeight: '8px',
                transition: `height 0.8s ease-out ${index * 0.05}s`, // Más rápido
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

  // Componente de Dashboard Preview - OPTIMIZADO para carga rápida
  const DashboardPreview = () => {
    const [ref, inView] = useInView(0.1); // Threshold más bajo para aparición más rápida
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
        opacity: 1, // Siempre visible, sin animación de entrada
        transform: 'translateY(0)'
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

        {/* KPIs Cards */}
        <Grid container spacing={1.5} sx={{ mb: 3 }}>
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
              <AnimatedBarChart data={chartData} isVisible={true} />
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

  // Componente de Vista de Ventas
  const SalesPreview = () => {
    const [ref, inView] = useInView(0.1);
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
        minHeight: { xs: '400px', sm: '450px' },
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        opacity: 1,
        transform: 'translateY(0)'
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
                height: '260px'
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

  // Componente de Vista de Inventario
  const InventoryPreview = () => {
    const [ref, inView] = useInView(0.1);
    
    return (
      <Box ref={ref} sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
        borderRadius: '16px',
        border: '1px solid #f1f5f9',
        minHeight: { xs: '400px', sm: '450px' },
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        opacity: 1,
        transform: 'translateY(0)'
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
                    { producto: 'Producto A', stock: 'Óptimo', estado: '✅', color: '#10b981' },
                    { producto: 'Producto B', stock: 'Bajo', estado: '⚠️', color: '#ef4444' },
                    { producto: 'Producto C', stock: 'Estable', estado: '✅', color: '#10b981' }
                  ].map((item, index) => (
                    <Box key={index} sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 1,
                      background: `${item.color}08`,
                      border: `1px solid ${item.color}20`,
                      borderRadius: '6px',
                    }}>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{item.producto}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" sx={{ 
                          color: item.color, 
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
  };

  // NUEVO COMPONENTE: Marketing con IA - Chatbot Automático
  const MarketingIAPreview = () => {
    const [ref, inView] = useInView(0.1);
    const [activeMessage, setActiveMessage] = useState(0);

    const messages = [
      { platform: 'WhatsApp', message: '¡Hola! ¿En qué puedo ayudarte hoy?', time: '10:30 AM', incoming: true },
      { platform: 'Instagram', message: 'Tu pedido está en camino 📦', time: '10:25 AM', incoming: false },
      { platform: 'Facebook', message: 'Consulta sobre nuestros nuevos productos', time: '10:15 AM', incoming: true },
      { platform: 'Email', message: 'Confirmación de tu compra #12345', time: '09:45 AM', incoming: false }
    ];

    useEffect(() => {
      if (inView) {
        const interval = setInterval(() => {
          setActiveMessage(prev => (prev + 1) % messages.length);
        }, 2000);
        return () => clearInterval(interval);
      }
    }, [inView, messages.length]);

    return (
      <Box ref={ref} sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
        borderRadius: '16px',
        border: '1px solid #f1f5f9',
        minHeight: { xs: '400px', sm: '450px' },
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        opacity: 1,
        transform: 'translateY(0)'
      }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
          color: 'white',
          p: 2,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px'
        }}>
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            Marketing IA - Chatbot Automático
          </Typography>
        </Box>

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', height: '100%' }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 3, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Chatbot Multiplataforma
                </Typography>
                
                {/* Simulación de Chat en Tiempo Real */}
                <Box sx={{ 
                  background: '#f8fafc', 
                  borderRadius: '12px', 
                  p: 2, 
                  height: '200px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {/* Mensajes del chat */}
                  <Stack spacing={1.5}>
                    {messages.map((msg, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: msg.incoming ? 'flex-start' : 'flex-end',
                          opacity: index === activeMessage ? 1 : 0.3,
                          transition: 'all 0.5s ease'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          {msg.platform === 'WhatsApp' && <WhatsApp sx={{ fontSize: 14, color: '#25D366' }} />}
                          {msg.platform === 'Instagram' && <Instagram sx={{ fontSize: 14, color: '#E4405F' }} />}
                          {msg.platform === 'Facebook' && <Facebook sx={{ fontSize: 14, color: '#1877F2' }} />}
                          {msg.platform === 'Email' && <Email sx={{ fontSize: 14, color: '#EA4335' }} />}
                          <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                            {msg.platform}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                            {msg.time}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            background: msg.incoming ? '#ffffff' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            color: msg.incoming ? '#374151' : 'white',
                            padding: '8px 12px',
                            borderRadius: msg.incoming ? '12px 12px 12px 4px' : '12px 12px 4px 12px',
                            maxWidth: '80%',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            border: msg.incoming ? '1px solid #e5e7eb' : 'none'
                          }}
                        >
                          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                            {msg.message}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>

                  {/* Indicador de escritura */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mt: 2,
                    opacity: activeMessage === messages.length - 1 ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      background: '#2563eb',
                      animation: 'pulse 1.5s infinite'
                    }} />
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      IA está escribiendo...
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                    Plataformas Conectadas
                  </Typography>
                  <Stack spacing={1}>
                    {[
                      { platform: 'WhatsApp', icon: <WhatsApp sx={{ color: '#25D366' }} />, status: 'Conectado' },
                      { platform: 'Instagram', icon: <Instagram sx={{ color: '#E4405F' }} />, status: 'Conectado' },
                      { platform: 'Facebook', icon: <Facebook sx={{ color: '#1877F2' }} />, status: 'Conectado' },
                      { platform: 'Email', icon: <Email sx={{ color: '#EA4335' }} />, status: 'Conectado' }
                    ].map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          {item.icon}
                          <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                            {item.platform}
                          </Typography>
                        </Box>
                        <Chip 
                          label={item.status} 
                          size="small" 
                          color="success"
                          sx={{ fontSize: '0.6rem', height: 20 }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Paper>

                <Paper sx={{ p: 2, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                    Métricas del Chatbot
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="h6" color="#2563eb" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                        24/7
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        Disponibilidad
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" color="#059669" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                        98%
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        Precisión
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  const demoScreens = [
    { title: "Dashboard Principal", component: <DashboardPreview /> },
    { title: "Gestión de Ventas", component: <SalesPreview /> },
    { title: "Control Inventario", component: <InventoryPreview /> },
    { title: "Marketing IA", component: <MarketingIAPreview /> }
  ];

  // Resto del código se mantiene igual pero con la corrección del CTA...

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      overflowX: 'hidden'
    }}>
      
      {/* Header y resto del código... */}

      {/* CTA Final - CORREGIDO el problema de color */}
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
            mb: 2,
            color: 'white' // Asegurar que el texto sea blanco
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
          
          {/* Resto del CTA... */}
        </Container>
      </Box>

      {/* Footer y botón scroll to top... */}
    </Box>
  );
};

export default HomePage;
