import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  List, ListItem, ListItemIcon, Tabs, Tab, Paper,
  IconButton, Divider
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
  PeopleAlt
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
      minHeight: { xs: '320px', md: '420px' },
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid #f1f5f9',
      boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.08)',
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
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-2px)',
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
            height: { xs: '140px', md: '180px' },
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
            height: { xs: '140px', md: '180px' },
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

  // Componente de Vista de Ventas
  const SalesPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
      borderRadius: '24px',
      border: '1px solid #f1f5f9',
      minHeight: { xs: '320px', md: '420px' },
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.08)'
    }}>
      {/* Header */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        color: 'white',
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6" fontWeight={700}>Ventas Inteligentes</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ShoppingCart sx={{ fontSize: 20 }} />
          <Insights sx={{ fontSize: 20 }} />
        </Box>
      </Box>

      {/* Contenido */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb', background: 'white', borderRadius: '12px' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp sx={{ fontSize: 18, color: '#059669' }} />
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
                    p: 1.5,
                    background: index % 2 === 0 ? '#f8fafc' : 'transparent',
                    borderRadius: '8px'
                  }}>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{venta.producto}</Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        {venta.tendencia} Crecimiento
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={600} color="#059669">
                      {venta.crecimiento}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb', mb: 2, background: 'white', borderRadius: '12px' }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Eficiencia IA</Typography>
              <Typography variant="h5" color="#059669">+{animatedStats.efficiency}%</Typography>
              <Typography variant="caption" sx={{ color: '#6b7280' }}>Optimización ventas</Typography>
            </Paper>
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb', background: 'white', borderRadius: '12px' }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Clientes IA</Typography>
              <Typography variant="h5" color="#2563eb">+{Math.floor(animatedStats.growth / 10)}</Typography>
              <Typography variant="caption" sx={{ color: '#6b7280' }}>Recomendados este mes</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  // Componente de Vista de Inventario
  const InventoryPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
      borderRadius: '24px',
      border: '1px solid #f1f5f9',
      minHeight: { xs: '320px', md: '420px' },
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.08)'
    }}>
      {/* Header */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
        color: 'white',
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6" fontWeight={700}>Inventario Inteligente</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Inventory2 sx={{ fontSize: 20 }} />
          <AutoGraph sx={{ fontSize: 20 }} />
        </Box>
      </Box>

      {/* Contenido */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb', background: 'white', borderRadius: '12px' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Alertas Proactivas IA</Typography>
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
                    p: 1.5,
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '8px'
                  }}>
                    <Typography variant="body2" fontWeight={600}>{item.producto}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" sx={{ color: '#059669' }}>{item.stock}</Typography>
                      <span>{item.estado}</span>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb', background: 'white', borderRadius: '12px' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Eficiencia IA</Typography>
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
                    p: 1.5,
                    background: index % 2 === 0 ? '#f8fafc' : 'transparent',
                    borderRadius: '6px'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{mov.icon}</span>
                      <Typography variant="body2" fontWeight={600}>{mov.tipo}</Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={600} color="#2563eb">{mov.porcentaje}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  // Componente de Vista de Reportes
  const ReportsPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)', 
      borderRadius: '24px',
      border: '1px solid #f1f5f9',
      minHeight: { xs: '320px', md: '420px' },
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.08)'
    }}>
      {/* Header */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
        color: 'white',
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6" fontWeight={700}>Analítica Predictiva IA</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <BarChart sx={{ fontSize: 20 }} />
          <Insights sx={{ fontSize: 20 }} />
        </Box>
      </Box>

      {/* Contenido */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} sx={{ height: '100%' }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb', height: '100%', background: 'white', borderRadius: '12px' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Predicciones IA</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%' }}>
                <Box sx={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%',
                  background: 'conic-gradient(#3b82f6 0% 40%, #10b981 40% 70%, #f59e0b 70% 90%, #8b5cf6 90% 100%)',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }} />
                <Stack spacing={1}>
                  {[
                    { categoria: 'Crecimiento Alto', color: '#3b82f6', porcentaje: '40%' },
                    { categoria: 'Estabilidad', color: '#10b981', porcentaje: '30%' },
                    { categoria: 'Optimización', color: '#f59e0b', porcentaje: '20%' },
                    { categoria: 'Nuevas Oportunidades', color: '#8b5cf6', porcentaje: '10%' }
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '2px', background: item.color }} />
                      <Typography variant="body2">{item.categoria}</Typography>
                      <Typography variant="body2" fontWeight={600}>{item.porcentaje}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb', height: '100%', background: 'white', borderRadius: '12px' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Reportes IA</Typography>
              <Stack spacing={2}>
                {[
                  { nombre: 'Análisis Predictivo', icon: '🔮', desc: 'Tendencias futuras' },
                  { nombre: 'Optimización IA', icon: '⚡', desc: 'Mejoras automáticas' },
                  { nombre: 'Clientes Ideales', icon: '🎯', desc: 'Segmentación inteligente' },
                  { nombre: 'Eficiencia Maxima', icon: '🚀', desc: 'Automatización total' }
                ].map((reporte, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    p: 1.5,
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: 'white',
                    '&:hover': { background: '#f8fafc', transform: 'translateX(4px)' },
                    transition: 'all 0.2s ease'
                  }}>
                    <Box sx={{ fontSize: '24px' }}>{reporte.icon}</Box>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{reporte.nombre}</Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>{reporte.desc}</Typography>
                    </Box>
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
      icon: <PointOfSale sx={{ fontSize: 40, color: '#2563eb' }} />,
      title: 'Ventas Inteligentes',
      features: ['IA predictiva de ventas', 'Automatización de procesos', 'Clientes recomendados por IA', 'Optimización en tiempo real'],
      description: 'Sistema de ventas impulsado por inteligencia artificial que anticipa tendencias'
    },
    {
      icon: <Inventory sx={{ fontSize: 40, color: '#059669' }} />,
      title: 'Inventario IA',
      features: ['Gestión predictiva de stock', 'Alertas automáticas IA', 'Optimización automática', 'Análisis de tendencias'],
      description: 'Control inteligente de inventario que previene faltantes y excesos'
    },
    {
      icon: <AccountBalance sx={{ fontSize: 40, color: '#dc2626' }} />,
      title: 'Finanzas Autónomas',
      features: ['IA contable automática', 'Detección de anomalías', 'Optimización fiscal IA', 'Reportes inteligentes'],
      description: 'Sistema financiero que se auto-optimiza y detecta oportunidades'
    },
    {
      icon: <Campaign sx={{ fontSize: 40, color: '#7c3aed' }} />,
      title: 'Marketing IA',
      features: ['Segmentación inteligente', 'Campañas automáticas', 'Análisis de ROI en tiempo real', 'Optimización continua'],
      description: 'Marketing que aprende y se adapta automáticamente a tu audiencia'
    }
  ];

  const benefits = [
    {
      icon: '🚀',
      title: 'Implementación Rápida',
      description: 'Comienza en menos de 5 minutos sin configuración compleja'
    },
    {
      icon: '💰',
      title: 'ROI Garantizado',
      description: 'Aumenta tus ganancias desde el primer mes o te devolvemos tu dinero'
    },
    {
      icon: '🛡️',
      title: 'Seguridad Empresarial',
      description: 'Tus datos protegidos con encriptación bancaria nivel enterprise'
    },
    {
      icon: '📈',
      title: 'Escalabilidad Ilimitada',
      description: 'Crece sin límites, desde startup hasta corporación multinacional'
    }
  ];

  // Estadísticas con Animación
  const AnimatedStatsSection = () => (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Resultados que <Box component="span" color="#2563eb">Impulsan</Box> tu Negocio
          </Typography>
          <Typography variant="h6" color="#64748b" sx={{ mb: 3, lineHeight: 1.6 }}>
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
              py: 1.5,
              borderRadius: '12px',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)'
              },
              transition: 'all 0.3s ease'
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
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  '&:hover': { transform: 'translateY(-4px)' },
                  transition: 'transform 0.2s ease'
                }}>
                  <Box sx={{ color: '#2563eb', mb: 1 }}>{stat.icon}</Box>
                  <Typography variant="h4" fontWeight={800} color="#1e293b" sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' } }}>
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

      {/* Sección de Estadísticas Animadas */}
      <AnimatedStatsSection />

      {/* Sección de Beneficios */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
            ¿Por Qué Elegir <Box component="span" color="#2563eb">UniversalBot AI</Box>?
          </Typography>
          <Typography variant="h6" sx={{ color: '#6b7280', maxWidth: '600px', mx: 'auto' }}>
            No somos otro software de gestión. Somos tu partner en inteligencia artificial empresarial
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                borderRadius: '16px',
                '&:hover': { transform: 'translateY(-4px)' },
                transition: 'transform 0.2s ease'
              }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ fontSize: '3rem', mb: 2 }}>
                    {benefit.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={700} color="#1f2937" gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="#6b7280">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

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

      {/* Módulos de la Plataforma */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
            Módulos Impulsados por IA
          </Typography>
          <Typography variant="h6" sx={{ color: '#6b7280', maxWidth: '600px', mx: 'auto' }}>
            Soluciones inteligentes que transforman cada área de tu empresa
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {platformModules.map((module, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                borderRadius: '16px',
                '&:hover': { transform: 'translateY(-4px)' },
                transition: 'transform 0.2s ease'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
                    <Box sx={{ 
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                      borderRadius: '12px',
                      p: 2,
                      minWidth: '70px'
                    }}>
                      {module.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" fontWeight={700} color="#1f2937" gutterBottom>
                        {module.title}
                      </Typography>
                      <Typography variant="body1" color="#6b7280" sx={{ mb: 2 }}>
                        {module.description}
                      </Typography>
                      <List dense>
                        {module.features.map((feature, idx) => (
                          <ListItem key={idx} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: '30px' }}>
                              <CheckCircle sx={{ color: '#10b981', fontSize: 18 }} />
                            </ListItemIcon>
                            <Typography variant="body2">{feature}</Typography>
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
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', 
        color: 'white', 
        py: 12,
        position: 'relative',
        overflow: 'hidden'
      }}>
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

          {/* Garantía */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Security sx={{ color: '#22c55e' }} />
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Garantía de satisfacción 30 días • Soporte 24/7 • Seguridad enterprise
            </Typography>
          </Box>
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
