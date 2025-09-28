import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Card, CardContent,
  Stack, useTheme, useMediaQuery, AppBar, Toolbar, Chip,
  List, ListItem, ListItemIcon, Avatar, Tab, Tabs, Paper
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
  Timeline
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

  // Componente de Dashboard Preview
  const DashboardPreview = () => (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', 
      borderRadius: '12px',
      p: 3,
      color: 'white',
      height: '400px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header del Dashboard */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={700}>Dashboard Principal</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></Box>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#6b7280' }}></Box>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#6b7280' }}></Box>
        </Box>
      </Box>

      {/* KPIs Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={3}>
          <Paper sx={{ 
            background: 'rgba(255,255,255,0.1)', 
            p: 2, 
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}>
            <Typography variant="h4" fontWeight={700} color="#10b981">$45.2K</Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>Ventas Hoy</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ 
            background: 'rgba(255,255,255,0.1)', 
            p: 2, 
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}>
            <Typography variant="h4" fontWeight={700} color="#3b82f6">1,234</Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>Productos</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ 
            background: 'rgba(255,255,255,0.1)', 
            p: 2, 
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}>
            <Typography variant="h4" fontWeight={700} color="#f59e0b">89%</Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>Eficiencia</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ 
            background: 'rgba(255,255,255,0.1)', 
            p: 2, 
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}>
            <Typography variant="h4" fontWeight={700} color="#ef4444">12</Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>Alertas</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos y Tablas Simuladas */}
      <Grid container spacing={2} sx={{ height: '200px' }}>
        <Grid item xs={8}>
          <Paper sx={{ 
            background: 'rgba(255,255,255,0.05)', 
            p: 2, 
            borderRadius: '8px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Ventas Mensuales</Typography>
            {/* Gráfico simulado */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'end', gap: 1 }}>
              {[40, 60, 75, 55, 80, 90, 65].map((height, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    background: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)',
                    height: `${height}%`,
                    borderRadius: '2px',
                    minHeight: '20px'
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ 
            background: 'rgba(255,255,255,0.05)', 
            p: 2, 
            borderRadius: '8px',
            height: '100%'
          }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>Top Productos</Typography>
            <Stack spacing={1}>
              {['Laptop Gamer', 'Mouse Inalámbrico', 'Teclado Mecánico', 'Monitor 4K'].map((product, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption">{product}</Typography>
                  <Typography variant="caption" color="#10b981">${(index + 1) * 250}</Typography>
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
      background: 'white', 
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      height: '400px',
      position: 'relative',
      overflow: 'hidden'
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
        <Typography variant="h6" fontWeight={700}>Módulo de Ventas</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ShoppingCart sx={{ fontSize: 20 }} />
          <AttachMoney sx={{ fontSize: 20 }} />
        </Box>
      </Box>

      {/* Contenido */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            {/* Lista de ventas recientes */}
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Ventas Recientes</Typography>
              <Stack spacing={1}>
                {[
                  { cliente: 'TechSolutions Inc.', monto: '$1,250.00', estado: 'Completado' },
                  { cliente: 'Global Corp', monto: '$3,450.00', estado: 'Pendiente' },
                  { cliente: 'Innovate Labs', monto: '$890.00', estado: 'Completado' }
                ].map((venta, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1,
                    background: index % 2 === 0 ? '#f8fafc' : 'transparent',
                    borderRadius: '4px'
                  }}>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{venta.cliente}</Typography>
                      <Typography variant="caption" color={venta.estado === 'Completado' ? '#10b981' : '#f59e0b'}>
                        {venta.estado}
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={600}>{venta.monto}</Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            {/* Estadísticas rápidas */}
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb', mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Hoy</Typography>
              <Typography variant="h5" color="#059669">$4,690.00</Typography>
              <Typography variant="caption">Total Ventas</Typography>
            </Paper>
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Clientes Nuevos</Typography>
              <Typography variant="h5" color="#3b82f6">12</Typography>
              <Typography variant="caption">Este mes</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  // Componente de Vista de Inventario
  const InventoryPreview = () => (
    <Box sx={{ 
      background: 'white', 
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      height: '400px',
      position: 'relative',
      overflow: 'hidden'
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
        <Typography variant="h6" fontWeight={700}>Control de Inventario</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Inventory2 sx={{ fontSize: 20 }} />
          <Assessment sx={{ fontSize: 20 }} />
        </Box>
      </Box>

      {/* Contenido */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            {/* Alertas de stock */}
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Alertas de Stock</Typography>
              <Stack spacing={1}>
                {[
                  { producto: 'Mouse Logitech', stock: 5, min: 10 },
                  { producto: 'Teclado Mecánico', stock: 3, min: 8 },
                  { producto: 'Monitor 27"', stock: 2, min: 5 }
                ].map((item, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1,
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '4px'
                  }}>
                    <Typography variant="body2" fontWeight={600}>{item.producto}</Typography>
                    <Chip 
                      label={`Stock: ${item.stock}`} 
                      size="small" 
                      color="error"
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            {/* Movimientos recientes */}
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Movimientos Recientes</Typography>
              <Stack spacing={1}>
                {[
                  { tipo: 'Entrada', producto: 'Laptop Dell', cantidad: 50 },
                  { tipo: 'Salida', producto: 'Mouse Inalámbrico', cantidad: 25 },
                  { tipo: 'Ajuste', producto: 'Teclados', cantidad: 10 }
                ].map((mov, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1,
                    background: index % 2 === 0 ? '#f8fafc' : 'transparent'
                  }}>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{mov.producto}</Typography>
                      <Chip 
                        label={mov.tipo} 
                        size="small" 
                        color={mov.tipo === 'Entrada' ? 'success' : mov.tipo === 'Salida' ? 'error' : 'warning'}
                      />
                    </Box>
                    <Typography variant="body1" fontWeight={600}>{mov.cantidad}</Typography>
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
      background: 'white', 
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      height: '400px',
      position: 'relative',
      overflow: 'hidden'
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
        <Typography variant="h6" fontWeight={700}>Reportes Financieros</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <BarChart sx={{ fontSize: 20 }} />
          <PieChart sx={{ fontSize: 20 }} />
        </Box>
      </Box>

      {/* Contenido */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} sx={{ height: '100%' }}>
          <Grid item xs={6}>
            {/* Gráfico de torta simulado */}
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb', height: '100%' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Distribución de Ventas</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%' }}>
                <Box sx={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%',
                  background: 'conic-gradient(#3b82f6 0% 40%, #10b981 40% 70%, #f59e0b 70% 90%, #ef4444 90% 100%)',
                  mb: 2
                }} />
                <Stack spacing={1}>
                  {[
                    { categoria: 'Tecnología', color: '#3b82f6', porcentaje: '40%' },
                    { categoria: 'Oficina', color: '#10b981', porcentaje: '30%' },
                    { categoria: 'Accesorios', color: '#f59e0b', porcentaje: '20%' },
                    { categoria: 'Otros', color: '#ef4444', porcentaje: '10%' }
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
          <Grid item xs={6}>
            {/* Reportes disponibles */}
            <Paper sx={{ p: 2, border: '1px solid #e5e7eb', height: '100%' }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Reportes Disponibles</Typography>
              <Stack spacing={2}>
                {[
                  { nombre: 'Estado de Resultados', icon: <Timeline /> },
                  { nombre: 'Balance General', icon: <Assessment /> },
                  { nombre: 'Flujo de Caja', icon: <AttachMoney /> },
                  { nombre: 'Ventas por Vendedor', icon: <PeopleAlt /> }
                ].map((reporte, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    p: 1,
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    '&:hover': { background: '#f8fafc' }
                  }}>
                    <Box sx={{ color: '#7c3aed' }}>{reporte.icon}</Box>
                    <Typography variant="body2" fontWeight={600}>{reporte.nombre}</Typography>
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
    { title: "Módulo de Ventas", component: <SalesPreview /> },
    { title: "Control de Inventario", component: <InventoryPreview /> },
    { title: "Reportes Financieros", component: <ReportsPreview /> }
  ];

  // Resto del código se mantiene igual...
  const platformModules = [
    {
      icon: <PointOfSale sx={{ fontSize: 40, color: '#2563eb' }} />,
      title: 'Sistema de Ventas',
      features: ['Facturación electrónica SUNAT', 'Múltiples puntos de venta', 'Control de inventario en tiempo real', 'Reportes de ventas por vendedor'],
      description: 'Gestión completa de ventas con integración fiscal'
    },
    {
      icon: <Inventory sx={{ fontSize: 40, color: '#059669' }} />,
      title: 'Control de Inventario',
      features: ['Gestión multi-almacén', 'Alertas de stock bajo', 'Kardex automático', 'Costos promedio y FIFO'],
      description: 'Control preciso de inventario y costos'
    },
    {
      icon: <AccountBalance sx={{ fontSize: 40, color: '#dc2626' }} />,
      title: 'Contabilidad Integral',
      features: ['Plan de cuentas personalizable', 'Libros contables automáticos', 'Conciliación bancaria', 'Estados financieros'],
      description: 'Sistema contable completo y automatizado'
    },
    {
      icon: <Campaign sx={{ fontSize: 40, color: '#7c3aed' }} />,
      title: 'Marketing Automatizado',
      features: ['Campañas WhatsApp', 'Email marketing', 'Segmentación de clientes', 'Análisis de ROI'],
      description: 'Herramientas de marketing integradas'
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
      overflow: 'hidden'
    }}>
      
      {/* Header */}
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

      {/* Hero Section */}
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
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <DashboardPreview />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Demo Interactivo */}
      <Box sx={{ background: '#f8fafc', py: 8 }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
              Explora Nuestra Plataforma
            </Typography>
            <Typography variant="h6" sx={{ color: '#6b7280' }}>
              Descubre todas las funcionalidades integradas
            </Typography>
          </Box>

          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)} 
            centered 
            sx={{ mb: 4 }}
          >
            {demoScreens.map((screen, index) => (
              <Tab key={index} label={screen.title} />
            ))}
          </Tabs>

          <Box>
            {demoScreens[activeTab].component}
          </Box>
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
