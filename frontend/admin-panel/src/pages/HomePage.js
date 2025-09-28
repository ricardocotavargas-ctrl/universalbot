import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  List, ListItem, ListItemIcon, Avatar, Tab, Tabs
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
  DashboardCustomize
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [companyCount, setCompanyCount] = useState(14800);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
      return;
    }

    if (companyCount < 15000) {
      const interval = setInterval(() => {
        setCompanyCount(prev => prev >= 15000 ? 15000 : prev + 10);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, navigate, companyCount]);

  if (isAuthenticated) return null;

  // Módulos de la plataforma con iconos específicos
  const platformModules = [
    {
      icon: <PointOfSale sx={{ fontSize: 40, color: '#2563eb' }} />,
      title: 'Sistema de Ventas',
      features: [
        'Múltiples puntos de venta',
        'Control de inventario en tiempo real',
        'Reportes de ventas por vendedor'
      ],
      description: 'Gestión completa de ventas con integración fiscal'
    },
    {
      icon: <Inventory sx={{ fontSize: 40, color: '#059669' }} />,
      title: 'Control de Inventario',
      features: [
        'Gestión multi-almacén',
        'Alertas de stock bajo',
        'Kardex automático',
        'Costos promedio y FIFO'
      ],
      description: 'Control preciso de inventario y costos'
    },
    {
      icon: <AccountBalance sx={{ fontSize: 40, color: '#dc2626' }} />,
      title: 'Contabilidad Integral',
      features: [
        'Plan de cuentas personalizable',
        'Libros contables automáticos',
        'Conciliación bancaria',
        'Estados financieros'
      ],
      description: 'Sistema contable completo y automatizado'
    },
    {
      icon: <Campaign sx={{ fontSize: 40, color: '#7c3aed' }} />,
      title: 'Marketing Automatizado',
      features: [
        'Campañas WhatsApp',
        'Email marketing',
        'Segmentación de clientes',
        'Análisis de ROI'
      ],
      description: 'Herramientas de marketing integradas'
    }
  ];

  // Características técnicas
  const technicalFeatures = [
    {
      icon: <Psychology sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: 'IA Predictiva',
      description: 'Algoritmos que anticipan tendencias de ventas y optimizan inventario',
      metrics: ['95% precisión en predicciones', 'Optimización automática de stock']
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: '#059669' }} />,
      title: 'Analytics en Tiempo Real',
      description: 'Dashboards ejecutivos con métricas actualizadas al instante',
      metrics: ['KPIs personalizados', 'Reportes automatizados']
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#dc2626' }} />,
      title: 'Seguridad Enterprise',
      description: 'Infraestructura con certificaciones y compliance completo',
      metrics: ['SOC 2 Type II', 'GDPR Compliance']
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: 40, color: '#2563eb' }} />,
      title: 'Integraciones',
      description: 'Conectores para +500 aplicaciones empresariales',
      metrics: ['APIs documentadas', 'Sincronización bidireccional']
    }
  ];

  // Testimonios reales
  const testimonials = [
    {
      name: "María González",
      position: "CEO, TechSolutions Inc.",
      results: "62% reducción costos • 47% más eficiencia",
      content: "Automatizamos toda nuestra operación con UniversalBot. La integración con SUNAT fue impecable y el soporte excepcional.",
      avatar: "MG",
      industry: "Tecnología"
    },
    {
      name: "Carlos Rodríguez",
      position: "Gerente, Distribuidora Global",
      results: "18 sistemas unificados • 3 nuevos mercados",
      content: "Pasamos de usar 18 sistemas diferentes a una sola plataforma. La migración fue perfecta y ahora tenemos control total.",
      avatar: "CR",
      industry: "Distribución"
    }
  ];

  // Métricas de impacto
  const metrics = [
    { value: `${companyCount.toLocaleString()}+`, label: 'Empresas', description: 'En Latinoamérica' },
    { value: '99.99%', label: 'Uptime', description: 'Garantizado' },
    { value: '4.9/5', label: 'Rating', description: 'Clientes satisfechos' },
    { value: '60%', label: 'Ahorro', description: 'En costos operativos' }
  ];

  // Demo screens del dashboard
  const demoScreens = [
    {
      title: "Dashboard Ejecutivo",
      description: "Vista general de tu negocio con KPIs clave",
      color: "#2563eb"
    },
    {
      title: "Módulo de Ventas", 
      description: "Gestión completa de facturación y clientes",
      color: "#059669"
    },
    {
      title: "Control de Inventario",
      description: "Gestión multi-almacén en tiempo real",
      color: "#dc2626"
    },
    {
      title: "Reportes Financieros",
      description: "Estados contables y análisis",
      color: "#7c3aed"
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
      overflow: 'hidden'
    }}>
      
      {/* Header Profesional */}
      <AppBar position="sticky" elevation={1} sx={{ background: 'white', color: '#1f2937' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Business sx={{ color: '#2563eb', fontSize: 32 }} />
              <Typography variant="h6" fontWeight={700}>UniversalBot</Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button onClick={() => navigate('/login')} sx={{ color: '#374151', fontWeight: 600 }}>
                Iniciar Sesión
              </Button>
              <Button 
                variant="contained" 
                onClick={() => navigate('/register')}
                sx={{ 
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  fontWeight: 600 
                }}
              >
                Probar Gratis
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section - Enfocada en el Producto */}
      <Box sx={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Chip 
                  label="PLATAFORMA TODO-EN-UNO"
                  sx={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, mb: 3 }}
                />
                <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, lineHeight: 1.1, mb: 3 }}>
                  Gestión Empresarial
                  <Box component="span" sx={{ display: 'block', color: '#dbeafe', fontWeight: 700 }}>
                    Completamente Integrada
                  </Box>
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.6, mb: 4 }}>
                  La única plataforma que unifica ventas, inventario, contabilidad y marketing 
                  en un solo sistema con IA predictiva.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      background: '#ffffff',
                      color: '#2563eb',
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      '&:hover': { background: '#f8fafc' }
                    }}
                  >
                    Probar 7 Días Gratis
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayArrow />}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5
                    }}
                  >
                    Ver Demo Interactivo
                  </Button>
                </Stack>
                <Grid container spacing={3}>
                  {metrics.map((metric, index) => (
                    <Grid item xs={6} key={index}>
                      <Box>
                        <Typography variant="h4" fontWeight={800}>{metric.value}</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 600 }}>{metric.label}</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>{metric.description}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ background: 'rgba(255,255,255,0.1)', borderRadius: '16px', p: 4, backdropFilter: 'blur(20px)' }}>
                <Box sx={{ 
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(37,99,235,0.5) 100%)',
                  borderRadius: '12px',
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 3,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Simulación de Dashboard */}
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    left: 16, 
                    background: 'rgba(255,255,255,0.2)', 
                    borderRadius: '8px', 
                    p: 1,
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Typography variant="body2" fontWeight={600}>Dashboard Principal</Typography>
                  </Box>
                  
                  {/* Elementos del Dashboard Simulado */}
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, p: 3, width: '100%' }}>
                    <Box sx={{ background: 'rgba(255,255,255,0.2)', borderRadius: '8px', p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" fontWeight={700}>$45,230</Typography>
                      <Typography variant="caption">Ventas Hoy</Typography>
                    </Box>
                    <Box sx={{ background: 'rgba(255,255,255,0.2)', borderRadius: '8px', p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" fontWeight={700}>1,234</Typography>
                      <Typography variant="caption">Productos</Typography>
                    </Box>
                    <Box sx={{ background: 'rgba(255,255,255,0.2)', borderRadius: '8px', p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" fontWeight={700}>89%</Typography>
                      <Typography variant="caption">Eficiencia</Typography>
                    </Box>
                    <Box sx={{ background: 'rgba(255,255,255,0.2)', borderRadius: '8px', p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" fontWeight={700}>$12.5K</Typography>
                      <Typography variant="caption">Meta Mensual</Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="h6" fontWeight={600} align="center">Dashboard Ejecutivo UniversalBot</Typography>
                <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
                  Vista previa del panel de control principal
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Módulos de la Plataforma */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
            Módulos Integrados
          </Typography>
          <Typography variant="h6" sx={{ color: '#6b7280', maxWidth: '600px', mx: 'auto' }}>
            Todas las herramientas que tu empresa necesita en una sola plataforma
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {platformModules.map((module, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
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

      {/* Demo Interactivo - Vista Previa de Módulos */}
      <Box sx={{ background: '#f8fafc', py: 8 }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
              Vista Previa de la Plataforma
            </Typography>
            <Typography variant="h6" sx={{ color: '#6b7280' }}>
              Explora las diferentes secciones de UniversalBot
            </Typography>
          </Box>

          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered sx={{ mb: 4 }}>
            {demoScreens.map((screen, index) => (
              <Tab key={index} label={screen.title} />
            ))}
          </Tabs>

          <Box sx={{ background: 'white', borderRadius: '12px', p: 4, border: '1px solid #e5e7eb' }}>
            <Box sx={{ 
              background: demoScreens[activeTab].color,
              borderRadius: '8px',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              mb: 3,
              position: 'relative'
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <DashboardCustomize sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h4" fontWeight={700}>
                  {demoScreens[activeTab].title}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {demoScreens[activeTab].description}
                </Typography>
              </Box>
              
              {/* Elementos de UI simulados */}
              <Box sx={{ 
                position: 'absolute', 
                bottom: 16, 
                right: 16, 
                background: 'rgba(255,255,255,0.2)', 
                borderRadius: '6px', 
                p: 1 
              }}>
                <Typography variant="caption" fontWeight={600}>Vista Previa</Typography>
              </Box>
            </Box>
            
            <Typography variant="body2" color="#6b7280" align="center">
              Esta es una simulación del módulo {demoScreens[activeTab].title.toLowerCase()}. 
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {' '}En la versión real podrás interactuar con todos los datos.
              </Box>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Características Técnicas */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
            Tecnología Avanzada
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {technicalFeatures.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ border: '1px solid #e5e7eb', height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                  <Typography variant="h5" fontWeight={700} color="#1f2937" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="#6b7280" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {feature.metrics.map((metric, idx) => (
                      <Chip key={idx} label={metric} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonios */}
      <Box sx={{ background: '#f8fafc', py: 8 }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
              Casos de Éxito
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ border: '1px solid #e5e7eb' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ bgcolor: '#2563eb', mr: 2, width: 50, height: 50 }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={700} color="#1f2937">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="#6b7280">
                          {testimonial.position}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Chip 
                      label={testimonial.results}
                      size="small"
                      sx={{ 
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        fontWeight: 600,
                        mb: 3
                      }}
                    />
                    
                    <Typography variant="body1" sx={{ color: '#4b5563', fontStyle: 'italic', lineHeight: 1.6, mb: 2 }}>
                      "{testimonial.content}"
                    </Typography>
                    
                    <Chip label={testimonial.industry} size="small" variant="outlined" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Final */}
      <Box sx={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', color: 'white', py: 8 }}>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
            ¿Listo para Transformar tu Empresa?
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, mb: 4, maxWidth: '600px', mx: 'auto' }}>
            Únete a las {companyCount.toLocaleString()}+ empresas que ya automatizaron sus operaciones
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                background: '#ffffff',
                color: '#2563eb',
                fontWeight: 700,
                px: 6,
                py: 1.5,
                minWidth: { xs: '100%', sm: '250px' }
              }}
            >
              Comenzar Prueba Gratuita
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 600,
                px: 6,
                py: 1.5,
                minWidth: { xs: '100%', sm: '250px' }
              }}
            >
              Iniciar Sesión
            </Button>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
            {['14 días gratis', 'Sin tarjeta', 'Soporte incluido'].map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ mr: 1 }} />
                <Typography variant="body2">{item}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ background: '#111827', color: 'white', py: 4 }}>
        <Container sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Business sx={{ color: '#2563eb' }} />
            <Typography variant="h6" fontWeight={700}>UniversalBot</Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2025 UniversalBot Platform. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
