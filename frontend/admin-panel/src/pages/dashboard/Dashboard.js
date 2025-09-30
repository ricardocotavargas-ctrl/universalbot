import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Paper,
  alpha,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  Tooltip,
  Tabs,
  Tab,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  Instagram,
  Email,
  Chat,
  People,
  TrendingUp,
  Schedule,
  Business,
  AttachMoney,
  Analytics,
  Rocket,
  NotificationsActive,
  AutoAwesome,
  Settings,
  DragIndicator,
  Add,
  Visibility,
  VisibilityOff,
  Dashboard as DashboardIcon,
  Reorder,
  GridView,
  ViewModule,
  Preview,
  DragHandle,
  Smartphone,
  Tablet,
  DesktopWindows,
  Refresh,
  Download,
  Share,
  FilterList,
  Search,
  Menu as MenuIcon,
  Home,
  BarChart,
  Notifications,
  Person,
  ExitToApp,
  ArrowBack,
  MoreVert
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

// Componentes de Widgets Optimizados para Móvil
import CommunicationsCenter from './widgets/CommunicationsCenter';
import FinancialOverview from './widgets/FinancialOverview';
import QuickActions from './widgets/QuickActions';
import PerformanceMetrics from './widgets/PerformanceMetrics';
import SalesAnalytics from './widgets/SalesAnalytics';
import CustomerInsights from './widgets/CustomerInsights';
import InventoryAlerts from './widgets/InventoryAlerts';
import RecentActivity from './widgets/RecentActivity';

const Dashboard = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [widgetsConfig, setWidgetsConfig] = useState({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [organizeOpen, setOrganizeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Configuración optimizada para móvil
  const defaultWidgets = {
    communicationsCenter: { 
      enabled: true, 
      size: 'large', 
      position: 1, 
      title: '💬 Comunicaciones',
      description: 'Mensajes y canales',
      mobilePriority: 1,
      icon: '💬'
    },
    financialOverview: { 
      enabled: true, 
      size: 'medium', 
      position: 2, 
      title: '💰 Finanzas',
      description: 'Ingresos y gastos',
      mobilePriority: 2,
      icon: '💰'
    },
    quickActions: { 
      enabled: true, 
      size: 'medium', 
      position: 3, 
      title: '⚡ Acciones',
      description: 'Tareas rápidas',
      mobilePriority: 3,
      icon: '⚡'
    },
    salesAnalytics: { 
      enabled: true, 
      size: 'medium', 
      position: 4, 
      title: '📈 Ventas',
      description: 'Estadísticas de ventas',
      mobilePriority: 4,
      icon: '📈'
    }
  };

  // Cargar configuración
  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardWidgets');
    if (savedConfig) {
      setWidgetsConfig(JSON.parse(savedConfig));
    } else {
      setWidgetsConfig(defaultWidgets);
    }
  }, []);

  const saveWidgetsConfig = (newConfig) => {
    setWidgetsConfig(newConfig);
    localStorage.setItem('dashboardWidgets', JSON.stringify(newConfig));
  };

  // Funcionalidades básicas
  const toggleWidget = (widgetId) => {
    const newConfig = {
      ...widgetsConfig,
      [widgetId]: {
        ...widgetsConfig[widgetId],
        enabled: !widgetsConfig[widgetId]?.enabled
      }
    };
    saveWidgetsConfig(newConfig);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getEnabledWidgets = () => {
    return Object.entries(widgetsConfig)
      .filter(([_, config]) => config.enabled)
      .sort((a, b) => a[1].position - b[1].position);
  };

  // Sistema de grid responsivo mejorado
  const getGridSize = (size) => {
    if (isMobile) {
      return 12; // En móvil, todos los widgets ocupan ancho completo
    }
    switch (size) {
      case 'large': return 12;
      case 'medium': return 6;
      case 'small': return 4;
      default: return 12;
    }
  };

  // Widget Container optimizado para móvil
  const WidgetContainer = ({ children, widgetId, title, description, onToggle }) => (
    <Paper
      elevation={1}
      sx={{
        width: '100%',
        minHeight: isMobile ? 200 : 300,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 2,
        overflow: 'hidden',
        mb: isMobile ? 2 : 3,
        mx: 'auto',
        background: theme.palette.background.paper
      }}
    >
      {/* Header del Widget - Optimizado para touch */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: isMobile ? 1.5 : 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: alpha(theme.palette.primary.main, 0.02),
          minHeight: isMobile ? 56 : 64
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
          <Box
            sx={{
              width: isMobile ? 36 : 40,
              height: isMobile ? 36 : 40,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: alpha(theme.palette.primary.main, 0.1),
              fontSize: isMobile ? '1rem' : '1.2rem'
            }}
          >
            {widgetsConfig[widgetId]?.icon}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              fontWeight={600}
              sx={{ 
                fontSize: isMobile ? '1rem' : '1.25rem',
                lineHeight: 1.2
              }}
            >
              {title}
            </Typography>
            {!isMobile && (
              <Typography variant="caption" color="text.secondary" noWrap>
                {description}
              </Typography>
            )}
          </Box>
        </Box>
        
        <Tooltip title={widgetsConfig[widgetId]?.enabled ? "Ocultar" : "Mostrar"}>
          <IconButton
            size={isMobile ? "small" : "medium"}
            onClick={() => onToggle(widgetId)}
            sx={{
              color: widgetsConfig[widgetId]?.enabled ? 'primary.main' : 'text.disabled'
            }}
          >
            {widgetsConfig[widgetId]?.enabled ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Contenido del Widget - Espaciado optimizado para móvil */}
      <Box sx={{ 
        p: isMobile ? 2 : 3,
        '& > *': {
          maxWidth: '100%',
          overflow: 'hidden'
        }
      }}>
        {children}
      </Box>
    </Paper>
  );

  // Renderizado de widgets específicos
  const renderWidget = (widgetId, config) => {
    const widgetProps = {
      key: widgetId,
      widgetId,
      title: config.title,
      description: config.description,
      onToggle: toggleWidget
    };

    const widgetComponents = {
      communicationsCenter: <CommunicationsCenter isMobile={isMobile} />,
      financialOverview: <FinancialOverview isMobile={isMobile} />,
      quickActions: <QuickActions isMobile={isMobile} />,
      salesAnalytics: <SalesAnalytics isMobile={isMobile} />
    };

    return (
      <WidgetContainer {...widgetProps}>
        {widgetComponents[widgetId]}
      </WidgetContainer>
    );
  };

  // Header móvil simplificado
  const MobileHeader = () => (
    <AppBar 
      position="static" 
      elevation={1}
      sx={{ 
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Toolbar sx={{ minHeight: '56px!important', px: 2 }}>
        <IconButton
          edge="start"
          onClick={() => setMobileMenuOpen(true)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" sx={{ flex: 1, fontSize: '1.1rem', fontWeight: 600 }}>
          Dashboard
        </Typography>
        
        <IconButton onClick={handleRefresh} disabled={refreshing}>
          <Refresh />
        </IconButton>
      </Toolbar>

      {/* Tabs de navegación móvil */}
      <Tabs
        value={activeMobileTab}
        onChange={(e, newValue) => setActiveMobileTab(newValue)}
        variant="fullWidth"
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          '& .MuiTab-root': {
            minHeight: 48,
            fontSize: '0.75rem'
          }
        }}
      >
        <Tab label="Resumen" icon={<Home />} iconPosition="start" />
        <Tab label="Ventas" icon={<BarChart />} iconPosition="start" />
        <Tab label="Alertas" icon={<Notifications />} iconPosition="start" />
      </Tabs>
    </AppBar>
  );

  // Menú lateral móvil
  const MobileMenu = () => (
    <Dialog
      fullScreen
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      sx={{
        '& .MuiDialog-paper': {
          background: theme.palette.background.paper
        }
      }}
    >
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setMobileMenuOpen(false)}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Menú
          </Typography>
        </Toolbar>
      </AppBar>

      <List sx={{ pt: 1 }}>
        <ListItem button onClick={() => { setSettingsOpen(true); setMobileMenuOpen(false); }}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Personalizar Dashboard" />
        </ListItem>
        
        <ListItem button onClick={() => { setOrganizeOpen(true); setMobileMenuOpen(false); }}>
          <ListItemIcon>
            <Reorder />
          </ListItemIcon>
          <ListItemText primary="Organizar Widgets" />
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <ListItem button>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Mi Perfil" />
        </ListItem>

        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </Dialog>
  );

  // Diálogo de configuración móvil
  const MobileSettingsDialog = () => (
    <Dialog
      fullScreen
      open={settingsOpen}
      onClose={() => setSettingsOpen(false)}
      sx={{
        '& .MuiDialog-paper': {
          background: theme.palette.background.paper
        }
      }}
    >
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setSettingsOpen(false)}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Personalizar Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Activa o desactiva los widgets para tu dashboard
        </Typography>

        <List sx={{ width: '100%' }}>
          {Object.entries(widgetsConfig).map(([widgetId, config]) => (
            <ListItem key={widgetId} sx={{ px: 0 }}>
              <Card sx={{ width: '100%' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: alpha(theme.palette.primary.main, 0.1),
                          fontSize: '1.2rem'
                        }}
                      >
                        {config.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {config.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {config.description}
                        </Typography>
                      </Box>
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.enabled}
                          onChange={() => toggleWidget(widgetId)}
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </Box>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>
    </Dialog>
  );

  // Contenido principal móvil
  const MobileContent = () => {
    switch (activeMobileTab) {
      case 0: // Resumen
        return (
          <Box sx={{ p: 2 }}>
            {/* Widgets en orden de prioridad móvil */}
            {getEnabledWidgets()
              .sort((a, b) => a[1].mobilePriority - b[1].mobilePriority)
              .map(([widgetId, config]) => (
                <Box key={widgetId} sx={{ width: '100%' }}>
                  {renderWidget(widgetId, config)}
                </Box>
              ))}
          </Box>
        );
      
      case 1: // Ventas
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Resumen de Ventas
            </Typography>
            {/* Contenido simplificado para pestaña de ventas */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" gutterBottom>
                  $2,340
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ventas de hoy
                </Typography>
              </Paper>
              
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Productos Más Vendidos
                </Typography>
                <List>
                  {['Producto A', 'Producto B', 'Producto C'].map((product, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText 
                        primary={product} 
                        secondary={`${(index + 1) * 15} ventas`} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>
          </Box>
        );
      
      case 2: // Alertas
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Alertas y Notificaciones
            </Typography>
            <List>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <Notifications color="warning" />
                </ListItemIcon>
                <ListItemText 
                  primary="Stock bajo en Producto X" 
                  secondary="Hace 2 horas" 
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <Chat color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="15 mensajes sin responder" 
                  secondary="Hace 30 minutos" 
                />
              </ListItem>
            </List>
          </Box>
        );
      
      default:
        return null;
    }
  };

  // Vista de escritorio
  const DesktopView = () => (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          ¡Bienvenido, {user?.first_name || 'Usuario'}!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Resumen de tu negocio
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Chip icon={<TrendingUp />} label="Ventas: $2,340" color="success" variant="outlined" />
          <Chip icon={<People />} label="12 clientes" color="primary" variant="outlined" />
          <Chip icon={<Chat />} label="15 mensajes" color="warning" variant="outlined" />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Settings />}
            onClick={() => setSettingsOpen(true)}
          >
            Personalizar
          </Button>
          <Button
            variant="outlined"
            startIcon={<Reorder />}
            onClick={() => setOrganizeOpen(true)}
          >
            Organizar
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {getEnabledWidgets().map(([widgetId, config]) => (
          <Grid item xs={12} md={getGridSize(config.size)} key={widgetId}>
            {renderWidget(widgetId, config)}
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  return (
    <>
      {isMobile ? (
        // VISTA MÓVIL - Simplificada y optimizada
        <Box sx={{ 
          minHeight: '100vh', 
          background: theme.palette.background.default,
          pb: 7 // Espacio para la navegación inferior
        }}>
          <MobileHeader />
          <MobileContent />
          <MobileMenu />
          <MobileSettingsDialog />
          
          {/* Navegación inferior móvil */}
          <BottomNavigation
            value={activeMobileTab}
            onChange={(event, newValue) => setActiveMobileTab(newValue)}
            showLabels
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              background: theme.palette.background.paper,
              borderTop: `1px solid ${theme.palette.divider}`,
              zIndex: 1000
            }}
          >
            <BottomNavigationAction label="Inicio" icon={<Home />} />
            <BottomNavigationAction label="Ventas" icon={<BarChart />} />
            <BottomNavigationAction label="Alertas" icon={<Notifications />} />
          </BottomNavigation>

          {/* Botón flotante para acciones */}
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 80,
              right: 16,
              zIndex: 1000
            }}
            onClick={() => setSettingsOpen(true)}
          >
            <Settings />
          </Fab>
        </Box>
      ) : (
        // VISTA ESCRITORIO
        <DesktopView />
      )}

      {/* Estado vacío */}
      {getEnabledWidgets().length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          px: 2
        }}>
          <DashboardIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            Configura tu Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Activa algunos widgets para comenzar
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setSettingsOpen(true)}
            size={isMobile ? "large" : "medium"}
          >
            Personalizar
          </Button>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
