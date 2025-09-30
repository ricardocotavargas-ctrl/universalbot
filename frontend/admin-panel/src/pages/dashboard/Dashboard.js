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
  BottomNavigation,
  BottomNavigationAction
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
  ViewCarousel,
  Smartphone,
  Tablet,
  DesktopWindows,
  Refresh,
  Download,
  Share,
  FilterList,
  Search,
  Menu as MenuIcon
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
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [widgetsConfig, setWidgetsConfig] = useState({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [organizeOpen, setOrganizeOpen] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState(null);
  const [previewWidgets, setPreviewWidgets] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [mobileView, setMobileView] = useState('dashboard');

  // Configuración inicial mejorada
  const defaultWidgets = {
    communicationsCenter: { 
      enabled: true, 
      size: 'large', 
      position: 1, 
      title: '📊 Comunicaciones',
      description: 'Todos tus canales de mensajería',
      mobilePriority: 1
    },
    financialOverview: { 
      enabled: true, 
      size: 'medium', 
      position: 2, 
      title: '💰 Finanzas',
      description: 'Ingresos, gastos y utilidades',
      mobilePriority: 2
    },
    quickActions: { 
      enabled: true, 
      size: 'medium', 
      position: 3, 
      title: '⚡ Acciones',
      description: 'Tareas rápidas y acceso directo',
      mobilePriority: 3
    },
    performanceMetrics: { 
      enabled: true, 
      size: 'small', 
      position: 4, 
      title: '📈 Métricas',
      description: 'Rendimiento del sistema',
      mobilePriority: 6
    },
    salesAnalytics: { 
      enabled: true, 
      size: 'medium', 
      position: 5, 
      title: '🛒 Ventas',
      description: 'Tendencias y análisis',
      mobilePriority: 4
    },
    customerInsights: { 
      enabled: true, 
      size: 'medium', 
      position: 6, 
      title: '👥 Clientes',
      description: 'Segmentación y satisfacción',
      mobilePriority: 5
    },
    inventoryAlerts: { 
      enabled: true, 
      size: 'small', 
      position: 7, 
      title: '📦 Stock',
      description: 'Inventario y alertas',
      mobilePriority: 7
    },
    recentActivity: { 
      enabled: true, 
      size: 'small', 
      position: 8, 
      title: '🔄 Actividad',
      description: 'Eventos recientes',
      mobilePriority: 8
    }
  };

  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardWidgets');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setWidgetsConfig(config);
      updatePreviewWidgets(config);
    } else {
      setWidgetsConfig(defaultWidgets);
      updatePreviewWidgets(defaultWidgets);
    }
  }, []);

  const updatePreviewWidgets = (config) => {
    const enabled = Object.entries(config)
      .filter(([_, widget]) => widget.enabled)
      .sort((a, b) => a[1].position - b[1].position);
    setPreviewWidgets(enabled);
  };

  const saveWidgetsConfig = (newConfig) => {
    setWidgetsConfig(newConfig);
    updatePreviewWidgets(newConfig);
    localStorage.setItem('dashboardWidgets', JSON.stringify(newConfig));
  };

  // Funcionalidades completas implementadas
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

  const getGridSize = (size, device = 'desktop') => {
    if (device === 'mobile') {
      switch (size) {
        case 'large': return 12;
        case 'medium': return 12;
        case 'small': return 12;
        default: return 12;
      }
    }
    
    switch (size) {
      case 'large': return 12;
      case 'medium': return isMobile ? 12 : 6;
      case 'small': return isMobile ? 12 : isTablet ? 6 : 4;
      default: return 6;
    }
  };

  // Sistema de arrastre mejorado para touch
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

  const handleDragStart = (e, widgetId, fromPreview = false) => {
    setDraggedWidget(widgetId);
    e.dataTransfer.setData('text/plain', JSON.stringify({ widgetId, fromPreview }));
    
    // Para dispositivos táctiles
    if (isMobile) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isMobile) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e, targetIndex, inPreview = false) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (!data) return;

    const { widgetId, fromPreview } = JSON.parse(data);
    
    const enabledWidgets = inPreview ? previewWidgets : getEnabledWidgets();
    const currentIndex = enabledWidgets.findIndex(([id]) => id === widgetId);
    
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      moveWidget(currentIndex, targetIndex);
    }
    
    setDraggedWidget(null);
  };

  // Componente de Vista Previa Responsive
  const ResponsiveDashboardPreview = () => {
    const [previewDevice, setPreviewDevice] = useState('desktop');

    const getPreviewScale = () => {
      switch (previewDevice) {
        case 'mobile': return 0.4;
        case 'tablet': return 0.6;
        case 'desktop': return 0.8;
        default: return 0.8;
      }
    };

    const getPreviewWidth = () => {
      switch (previewDevice) {
        case 'mobile': return 320;
        case 'tablet': return 768;
        case 'desktop': return 1024;
        default: return 1024;
      }
    };

    return (
      <Box>
        {/* Selector de dispositivo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, gap: 1 }}>
          {['mobile', 'tablet', 'desktop'].map((device) => (
            <IconButton
              key={device}
              onClick={() => setPreviewDevice(device)}
              sx={{
                bgcolor: previewDevice === device ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                border: `2px solid ${previewDevice === device ? theme.palette.primary.main : theme.palette.divider}`
              }}
            >
              {device === 'mobile' && <Smartphone />}
              {device === 'tablet' && <Tablet />}
              {device === 'desktop' && <DesktopWindows />}
            </IconButton>
          ))}
        </Box>

        <Box sx={{ 
          p: 3, 
          border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 3,
          background: alpha(theme.palette.background.paper, 0.9),
          minHeight: 300,
          transform: `scale(${getPreviewScale()})`,
          transformOrigin: 'top center',
          width: getPreviewWidth(),
          mx: 'auto',
          overflow: 'hidden'
        }}>
          <Typography variant="subtitle2" fontWeight={600} color="primary.main" sx={{ mb: 2, textAlign: 'center' }}>
            Vista Previa - {previewDevice === 'mobile' ? 'Móvil' : previewDevice === 'tablet' ? 'Tablet' : 'Escritorio'}
          </Typography>
          
          <Grid container spacing={1}>
            {previewWidgets.map(([widgetId, config], index) => (
              <Grid 
                item 
                xs={getGridSize(config.size, previewDevice)} 
                key={widgetId}
              >
                <Paper
                  draggable
                  onDragStart={(e) => handleDragStart(e, widgetId, true)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index, true)}
                  sx={{
                    height: config.size === 'large' ? 80 : config.size === 'medium' ? 60 : 40,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
                    border: `2px solid ${alpha(theme.palette.primary.main, draggedWidget === widgetId ? 0.6 : 0.3)}`,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1,
                    cursor: 'grab',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: alpha(theme.palette.primary.main, 0.6),
                    },
                    '&:active': {
                      cursor: 'grabbing'
                    },
                    opacity: draggedWidget === widgetId ? 0.7 : 1
                  }}
                >
                  <Typography 
                    variant="caption" 
                    fontWeight={500}
                    sx={{ fontSize: previewDevice === 'mobile' ? '0.6rem' : '0.7rem' }}
                  >
                    {config.title}
                  </Typography>
                  <DragHandle sx={{ fontSize: 14, color: 'text.secondary' }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  };

  // Widget Container Responsive
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
              noWrap={isMobile}
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
            size="small"
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

  // Navegación móvil mejorada
  const MobileNavigation = () => (
    <BottomNavigation
      value={mobileView}
      onChange={(event, newValue) => setMobileView(newValue)}
      showLabels
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: `1px solid ${theme.palette.divider}`
      }}
    >
      <BottomNavigationAction 
        label="Dashboard" 
        value="dashboard" 
        icon={<DashboardIcon />} 
      />
      <BottomNavigationAction 
        label="Acciones" 
        value="actions" 
        icon={<Rocket />} 
      />
      <BottomNavigationAction 
        label="Configurar" 
        value="settings" 
        icon={<Settings />} 
        onClick={() => setSettingsOpen(true)}
      />
    </BottomNavigation>
  );

  // Renderizado condicional por vista móvil
  const renderMobileView = () => {
    switch (mobileView) {
      case 'dashboard':
        return (
          <Grid container spacing={2}>
            {getEnabledWidgets()
              .sort((a, b) => a[1].mobilePriority - b[1].mobilePriority)
              .slice(0, 4) // Mostrar solo 4 widgets en móvil para mejor rendimiento
              .map(([widgetId, config]) => (
              <Grid item xs={12} key={widgetId}>
                {renderWidget(widgetId, config)}
              </Grid>
            ))}
          </Grid>
        );
      case 'actions':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Acciones Rápidas</Typography>
            <Grid container spacing={2}>
              {[
                { icon: <Refresh />, label: 'Actualizar', action: () => window.location.reload() },
                { icon: <Download />, label: 'Exportar', action: exportConfiguration },
                { icon: <Share />, label: 'Compartir', action: shareDashboard },
                { icon: <FilterList />, label: 'Filtrar', action: () => {} }
              ].map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={item.icon}
                    onClick={item.action}
                    sx={{ height: 80, flexDirection: 'column' }}
                  >
                    {item.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  const renderWidget = (widgetId, config) => {
    const widgetProps = {
      key: widgetId,
      widgetId,
      title: config.title,
      description: config.description,
      onToggle: toggleWidget
    };

    const widgetComponents = {
      communicationsCenter: <CommunicationsCenter />,
      financialOverview: <FinancialOverview />,
      quickActions: <QuickActions />,
      performanceMetrics: <PerformanceMetrics />,
      salesAnalytics: <SalesAnalytics />,
      customerInsights: <CustomerInsights />,
      inventoryAlerts: <InventoryAlerts />,
      recentActivity: <RecentActivity />
    };

    return (
      <WidgetContainer {...widgetProps}>
        {widgetComponents[widgetId]}
      </WidgetContainer>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ pb: isMobile ? 8 : 4, px: isMobile ? 1 : 2 }}>
      {/* Header Responsive */}
      <Box sx={{ mb: 3, pt: isMobile ? 1 : 2 }}>
        {isMobile ? (
          // Header Mobile
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5" fontWeight={700} noWrap sx={{ flex: 1 }}>
                Hola, {user?.first_name?.split(' ')[0] || 'Usuario'}!
              </Typography>
              <IconButton onClick={() => setSettingsOpen(true)}>
                <Settings />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
              {['Hoy', 'Semana', 'Mes'].map((period) => (
                <Chip 
                  key={period}
                  label={period} 
                  variant={period === 'Hoy' ? 'filled' : 'outlined'}
                  size="small"
                />
              ))}
            </Box>
          </Box>
        ) : (
          // Header Desktop
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                ¡Bienvenido, {user?.business?.name || user?.first_name || 'Usuario'}!
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Resumen de tu negocio - {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip icon={<TrendingUp />} label="Ventas: $2,340" color="success" variant="outlined" />
                <Chip icon={<People />} label="12 clientes" color="primary" variant="outlined" />
                <Chip icon={<Chat />} label="45 mensajes" color="warning" variant="outlined" />
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <UBButton
                variant="outlined"
                startIcon={<Reorder />}
                onClick={() => setOrganizeOpen(true)}
                size={isMobile ? "small" : "medium"}
              >
                Organizar
              </UBButton>
              <UBButton
                variant="outlined"
                startIcon={<Settings />}
                onClick={() => setSettingsOpen(true)}
                size={isMobile ? "small" : "medium"}
              >
                Personalizar
              </UBButton>
              <UBButton
                variant="contained"
                startIcon={<DashboardIcon />}
                size={isMobile ? "small" : "medium"}
              >
                Vista Completa
              </UBButton>
            </Box>
          </Box>
        )}
      </Box>

      {/* Contenido Principal */}
      {isMobile ? (
        renderMobileView()
      ) : (
        <Grid container spacing={3}>
          {getEnabledWidgets().map(([widgetId, config]) => (
            <Grid item xs={12} md={getGridSize(config.size)} key={widgetId}>
              {renderWidget(widgetId, config)}
            </Grid>
          ))}
        </Grid>
      )}

      {/* Diálogo de Organización Mejorado */}
      <Dialog 
        open={organizeOpen} 
        onClose={() => setOrganizeOpen(false)} 
        maxWidth="lg" 
        fullWidth
        sx={{ 
          '& .MuiDialog-paper': { 
            minHeight: '80vh',
            ...(isMobile && { margin: 1, width: 'calc(100% - 16px)' })
          } 
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Preview />
              Organizar Dashboard
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Exportar configuración">
                <IconButton onClick={exportConfiguration} size="small">
                  <Download />
                </IconButton>
              </Tooltip>
              <Tooltip title="Compartir dashboard">
                <IconButton onClick={shareDashboard} size="small">
                  <Share />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            centered={!isMobile}
            variant={isMobile ? "fullWidth" : "standard"}
          >
            <Tab label="Vista Previa" />
            <Tab label="Lista de Widgets" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {activeTab === 0 ? (
              <ResponsiveDashboardPreview />
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {previewWidgets.map(([widgetId, config], index) => (
                  <Card
                    key={widgetId}
                    draggable
                    onDragStart={(e) => handleDragStart(e, widgetId, false)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index, false)}
                    sx={{
                      cursor: 'grab',
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4],
                      },
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
                          <DragHandle sx={{ color: 'text.secondary' }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetToDefault}>
            Restablecer
          </Button>
          <Button onClick={() => setOrganizeOpen(false)}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setOrganizeOpen(false)}
          >
            Aplicar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Configuración Mejorado */}
      <Dialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
        maxWidth="md" 
        fullWidth
        sx={{ 
          '& .MuiDialog-paper': isMobile ? { margin: 1, width: 'calc(100% - 16px)' } : {}
        }}
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
            Activa o desactiva los widgets que quieres mostrar
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
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                          {config.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {config.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            label={`${config.size === 'large' ? 'Grande' : config.size === 'medium' ? 'Mediano' : 'Pequeño'}`} 
                            size="small" 
                            variant="outlined"
                          />
                          <Chip 
                            label={`Prioridad: ${config.mobilePriority}`} 
                            size="small" 
                            variant="outlined"
                          />
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
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ flexWrap: 'wrap', gap: 1 }}>
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

      {/* Navegación Móvil */}
      {isMobile && <MobileNavigation />}

      {/* Floating Action Button para Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            zIndex: 1000
          }}
          onClick={() => setOrganizeOpen(true)}
        >
          <Reorder />
        </Fab>
      )}

      {/* Estado vacío */}
      {getEnabledWidgets().length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          border: `2px dashed ${theme.palette.divider}`,
          borderRadius: 2
        }}>
          <DashboardIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            Dashboard Personalizable
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Activa los widgets que necesitas para comenzar
          </Typography>
          <UBButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => setSettingsOpen(true)}
          >
            Configurar Mi Dashboard
          </UBButton>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
