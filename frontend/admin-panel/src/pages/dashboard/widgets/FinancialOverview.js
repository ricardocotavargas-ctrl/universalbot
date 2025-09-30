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
import UBCard from '../../components/ui/UBCard';
import UBButton from '../../components/ui/UBButton';
import { useAuth } from '../../contexts/AuthContext';

// Componentes de Widgets
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
  const [draggedWidget, setDraggedWidget] = useState(null);

  // Configuración completa para ambos dispositivos
  const defaultWidgets = {
    communicationsCenter: { 
      enabled: true, 
      size: 'large', 
      position: 1, 
      title: '📊 Centro de Comunicaciones',
      description: 'Gestión unificada de todos tus canales',
      mobilePriority: 1
    },
    financialOverview: { 
      enabled: true, 
      size: 'medium', 
      position: 2, 
      title: '💰 Resumen Financiero',
      description: 'Estado de ingresos, gastos y utilidades',
      mobilePriority: 2
    },
    quickActions: { 
      enabled: true, 
      size: 'medium', 
      position: 3, 
      title: '⚡ Acciones Rápidas',
      description: 'Tareas frecuentes y acceso directo',
      mobilePriority: 3
    },
    performanceMetrics: { 
      enabled: true, 
      size: 'small', 
      position: 4, 
      title: '📈 Métricas Clave',
      description: 'Rendimiento del sistema y servicios',
      mobilePriority: 6
    },
    salesAnalytics: { 
      enabled: true, 
      size: 'medium', 
      position: 5, 
      title: '🛒 Análisis de Ventas',
      description: 'Tendencias y canales de venta',
      mobilePriority: 4
    },
    customerInsights: { 
      enabled: true, 
      size: 'medium', 
      position: 6, 
      title: '👥 Información de Clientes',
      description: 'Segmentación y satisfacción',
      mobilePriority: 5
    },
    inventoryAlerts: { 
      enabled: true, 
      size: 'small', 
      position: 7, 
      title: '📦 Alertas de Inventario',
      description: 'Stock y alertas importantes',
      mobilePriority: 7
    },
    recentActivity: { 
      enabled: true, 
      size: 'small', 
      position: 8, 
      title: '🔄 Actividad Reciente',
      description: 'Eventos recientes del sistema',
      mobilePriority: 8
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

  // Funcionalidades COMPLETAS que funcionan en ambos
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

  const resetToDefault = () => {
    if (window.confirm('¿Restablecer a la configuración predeterminada?')) {
      saveWidgetsConfig(defaultWidgets);
    }
  };

  const exportConfiguration = () => {
    const configStr = JSON.stringify(widgetsConfig, null, 2);
    const blob = new Blob([configStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importConfiguration = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          saveWidgetsConfig(config);
          setSettingsOpen(false);
        } catch (error) {
          alert('Error: Archivo de configuración inválido');
        }
      };
      reader.readAsText(file);
    }
  };

  const shareDashboard = async () => {
    const config = btoa(JSON.stringify(widgetsConfig));
    const shareUrl = `${window.location.origin}${window.location.pathname}?config=${config}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Configuración de Dashboard',
          text: 'Mira mi configuración personalizada del dashboard',
          url: shareUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('¡Enlace copiado al portapapeles! Comparte este enlace para replicar tu configuración.');
      });
    }
  };

  const getEnabledWidgets = () => {
    return Object.entries(widgetsConfig)
      .filter(([_, config]) => config.enabled)
      .sort((a, b) => a[1].position - b[1].position);
  };

  const getGridSize = (size) => {
    if (isMobile) {
      return 12;
    }
    switch (size) {
      case 'large': return 12;
      case 'medium': return 6;
      case 'small': return 4;
      default: return 6;
    }
  };

  // Sistema de arrastre para escritorio
  const moveWidget = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;

    const newConfig = { ...widgetsConfig };
    const enabledWidgets = getEnabledWidgets();
    
    enabledWidgets.forEach(([widgetId], index) => {
      let newPosition;
      if (index === fromIndex) {
        newPosition = toIndex + 1;
      } else if (fromIndex < toIndex) {
        if (index > fromIndex && index <= toIndex) {
          newPosition = index;
        } else {
          newPosition = index + 1;
        }
      } else {
        if (index >= toIndex && index < fromIndex) {
          newPosition = index + 2;
        } else {
          newPosition = index + 1;
        }
      }
      newConfig[widgetId].position = newPosition;
    });

    saveWidgetsConfig(newConfig);
  };

  const handleDragStart = (e, widgetId) => {
    setDraggedWidget(widgetId);
    e.dataTransfer.setData('text/plain', widgetId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (!draggedWidget) return;

    const enabledWidgets = getEnabledWidgets();
    const currentIndex = enabledWidgets.findIndex(([id]) => id === draggedWidget);
    
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      moveWidget(currentIndex, targetIndex);
    }
    
    setDraggedWidget(null);
  };

  // Widget Container que funciona en AMBOS
  const WidgetContainer = ({ children, widgetId, title, description, onToggle }) => (
    <Paper
      sx={{
        height: '100%',
        position: 'relative',
        border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: isMobile ? 2 : 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': !isMobile ? {
          borderColor: alpha(theme.palette.primary.main, 0.3),
          boxShadow: theme.shadows[4]
        } : {}
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: isMobile ? 1.5 : 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: alpha(theme.palette.primary.main, 0.02)
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          {!isMobile && (
            <DragIndicator 
              sx={{ 
                color: 'text.secondary',
                cursor: 'grab',
                '&:active': { cursor: 'grabbing' }
              }} 
            />
          )}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              fontWeight={600}
              sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
            >
              {title}
            </Typography>
            {!isMobile && (
              <Typography variant="caption" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>
        </Box>
        <Tooltip title={widgetsConfig[widgetId]?.enabled ? "Ocultar widget" : "Mostrar widget"}>
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

      <Box sx={{ p: isMobile ? 2 : 3 }}>
        {children}
      </Box>
    </Paper>
  );

  // Renderizado de widgets
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
      performanceMetrics: <PerformanceMetrics isMobile={isMobile} />,
      salesAnalytics: <SalesAnalytics isMobile={isMobile} />,
      customerInsights: <CustomerInsights isMobile={isMobile} />,
      inventoryAlerts: <InventoryAlerts isMobile={isMobile} />,
      recentActivity: <RecentActivity isMobile={isMobile} />
    };

    return (
      <WidgetContainer {...widgetProps}>
        {widgetComponents[widgetId]}
      </WidgetContainer>
    );
  };

  // ==================== VISTA MÓVIL ====================
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

  const MobileMenu = () => (
    <Dialog
      fullScreen
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
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

  const MobileContent = () => {
    switch (activeMobileTab) {
      case 0:
        return (
          <Box sx={{ p: 2 }}>
            {getEnabledWidgets()
              .sort((a, b) => a[1].mobilePriority - b[1].mobilePriority)
              .map(([widgetId, config]) => (
                <Box key={widgetId} sx={{ mb: 2 }}>
                  {renderWidget(widgetId, config)}
                </Box>
              ))}
          </Box>
        );
      case 1:
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Ventas</Typography>
            {/* Contenido simplificado para móvil */}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Alertas</Typography>
            {/* Contenido simplificado para móvil */}
          </Box>
        );
      default:
        return null;
    }
  };

  const MobileView = () => (
    <Box sx={{ pb: 7 }}>
      <MobileHeader />
      <MobileContent />
      <MobileMenu />

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
        }}
      >
        <BottomNavigationAction label="Inicio" icon={<Home />} />
        <BottomNavigationAction label="Ventas" icon={<BarChart />} />
        <BottomNavigationAction label="Alertas" icon={<Notifications />} />
      </BottomNavigation>

      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
        onClick={() => setSettingsOpen(true)}
      >
        <Settings />
      </Fab>
    </Box>
  );

  // ==================== VISTA ESCRITORIO ====================
  const DesktopView = () => (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Desktop Completo */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              ¡Bienvenido, {user?.business?.name || user?.first_name || 'Usuario'}!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Resumen completo de tu negocio - {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Chip icon={<TrendingUp />} label="Ventas del día: $2,340" color="success" variant="outlined" />
              <Chip icon={<People />} label="12 nuevos clientes" color="primary" variant="outlined" />
              <Chip icon={<Chat />} label="45 mensajes pendientes" color="warning" variant="outlined" />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <UBButton
              variant="outlined"
              startIcon={<Reorder />}
              onClick={() => setOrganizeOpen(true)}
            >
              Organizar
            </UBButton>
            <UBButton
              variant="outlined"
              startIcon={<Settings />}
              onClick={() => setSettingsOpen(true)}
            >
              Personalizar
            </UBButton>
            <UBButton
              variant="contained"
              startIcon={<DashboardIcon />}
            >
              Vista Completa
            </UBButton>
          </Box>
        </Box>
      </Box>

      {/* Grid de Widgets Desktop */}
      <Grid container spacing={3}>
        {getEnabledWidgets().map(([widgetId, config]) => (
          <Grid item xs={12} md={getGridSize(config.size)} key={widgetId}>
            {renderWidget(widgetId, config)}
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  // ==================== DIÁLOGOS COMPARTIDOS ====================
  const OrganizationDialog = () => (
    <Dialog 
      open={organizeOpen} 
      onClose={() => setOrganizeOpen(false)} 
      maxWidth="lg" 
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Preview />
          Organizar Dashboard
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Arrastra y suelta para reorganizar el orden de los widgets
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {getEnabledWidgets().map(([widgetId, config], index) => (
            <Card
              key={widgetId}
              draggable={!isMobile}
              onDragStart={(e) => handleDragStart(e, widgetId)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              sx={{
                cursor: isMobile ? 'default' : 'grab',
                border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                transition: 'all 0.2s ease',
                '&:hover': !isMobile ? {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4],
                } : {},
                opacity: draggedWidget === widgetId ? 0.5 : 1
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {config.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {config.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip label={`#${index + 1}`} size="small" />
                    {!isMobile && <DragHandle sx={{ color: 'text.secondary' }} />}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetToDefault}>
          Restablecer
        </Button>
        <Button onClick={() => setOrganizeOpen(false)}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={() => setOrganizeOpen(false)}>
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  );

  const SettingsDialog = () => (
    <Dialog 
      open={settingsOpen} 
      onClose={() => setSettingsOpen(false)} 
      maxWidth="md" 
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Settings />
            Personalizar Dashboard
          </Box>
          <input
            type="file"
            accept=".json"
            onChange={importConfiguration}
            style={{ display: 'none' }}
            id="import-config"
          />
          <label htmlFor="import-config">
            <Button component="span" variant="outlined" size="small">
              Importar
            </Button>
          </label>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Selecciona qué widgets quieres mostrar en tu dashboard
        </Typography>
        
        <Grid container spacing={2}>
          {Object.entries(widgetsConfig).map(([widgetId, config]) => (
            <Grid item xs={12} md={6} key={widgetId}>
              <Card 
                variant="outlined"
                sx={{
                  border: `2px solid ${
                    config.enabled 
                      ? alpha(theme.palette.primary.main, 0.3)
                      : theme.palette.divider
                  }`,
                  background: config.enabled 
                    ? alpha(theme.palette.primary.main, 0.05)
                    : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: alpha(theme.palette.primary.main, 0.5),
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {config.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {config.description}
                      </Typography>
                      <Chip 
                        label={`Tamaño: ${config.size === 'large' ? 'Grande' : config.size === 'medium' ? 'Mediano' : 'Pequeño'}`} 
                        size="small" 
                        variant="outlined"
                      />
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
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetToDefault}>
          Restablecer
        </Button>
        <Button onClick={exportConfiguration}>
          Exportar
        </Button>
        <Button onClick={() => setSettingsOpen(false)}>
          Cancelar
        </Button>
        <UBButton
          variant="contained"
          onClick={() => {
            setSettingsOpen(false);
            setOrganizeOpen(true);
          }}
        >
          Organizar Vista
        </UBButton>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {isMobile ? <MobileView /> : <DesktopView />}
      
      {/* Diálogos compartidos */}
      <OrganizationDialog />
      <SettingsDialog />

      {/* Estado vacío */}
      {getEnabledWidgets().length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          px: 2
        }}>
          <DashboardIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            Dashboard Personalizable
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Activa los widgets que necesitas para comenzar
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setSettingsOpen(true)}
            size={isMobile ? "large" : "medium"}
          >
            Configurar Mi Dashboard
          </Button>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
