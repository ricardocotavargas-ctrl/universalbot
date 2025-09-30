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
  useMediaQuery,
  Fab,
  Snackbar,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import {
  Settings,
  Add,
  Visibility,
  VisibilityOff,
  Dashboard as DashboardIcon,
  AspectRatio,
  Star,
  StarBorder,
  Save,
  Restore,
  Palette,
  AutoAwesome,
  AdminPanelSettings,
  Campaign,
  PointOfSale,
  AccountBalance,
  Inventory,
  Groups
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import UBButton from '../../components/ui/UBButton';
import { useAuth } from '../../contexts/AuthContext';

// Importar todos los widgets
import CommunicationsCenter from './widgets/CommunicationsCenter';
import FinancialOverview from './widgets/FinancialOverview';
import QuickActions from './widgets/QuickActions';
import PerformanceMetrics from './widgets/PerformanceMetrics';
import SalesAnalytics from './widgets/SalesAnalytics';
import CustomerInsights from './widgets/CustomerInsights';
import InventoryAlerts from './widgets/InventoryAlerts';
import RecentActivity from './widgets/RecentActivity';

// Configuración de widgets por rol de usuario
const WIDGETS_BY_ROLE = {
  admin: {
    communicationsCenter: { enabled: true, size: 'large', category: 'marketing', essential: true },
    financialOverview: { enabled: true, size: 'medium', category: 'finance', essential: true },
    quickActions: { enabled: true, size: 'medium', category: 'general', essential: true },
    performanceMetrics: { enabled: true, size: 'small', category: 'general', essential: true },
    salesAnalytics: { enabled: true, size: 'medium', category: 'sales', essential: true },
    customerInsights: { enabled: true, size: 'medium', category: 'marketing', essential: false },
    inventoryAlerts: { enabled: true, size: 'small', category: 'operations', essential: false },
    recentActivity: { enabled: true, size: 'small', category: 'general', essential: false }
  },
  marketing: {
    communicationsCenter: { enabled: true, size: 'large', category: 'marketing', essential: true },
    customerInsights: { enabled: true, size: 'large', category: 'marketing', essential: true },
    salesAnalytics: { enabled: true, size: 'medium', category: 'sales', essential: false },
    quickActions: { enabled: true, size: 'medium', category: 'general', essential: true },
    recentActivity: { enabled: true, size: 'small', category: 'general', essential: false },
    performanceMetrics: { enabled: false, size: 'small', category: 'general', essential: false },
    financialOverview: { enabled: false, size: 'medium', category: 'finance', essential: false },
    inventoryAlerts: { enabled: false, size: 'small', category: 'operations', essential: false }
  },
  sales: {
    salesAnalytics: { enabled: true, size: 'large', category: 'sales', essential: true },
    customerInsights: { enabled: true, size: 'medium', category: 'marketing', essential: true },
    communicationsCenter: { enabled: true, size: 'medium', category: 'marketing', essential: true },
    quickActions: { enabled: true, size: 'medium', category: 'general', essential: true },
    recentActivity: { enabled: true, size: 'small', category: 'general', essential: false },
    performanceMetrics: { enabled: false, size: 'small', category: 'general', essential: false },
    financialOverview: { enabled: false, size: 'medium', category: 'finance', essential: false },
    inventoryAlerts: { enabled: false, size: 'small', category: 'operations', essential: false }
  },
  finance: {
    financialOverview: { enabled: true, size: 'large', category: 'finance', essential: true },
    salesAnalytics: { enabled: true, size: 'medium', category: 'sales', essential: true },
    performanceMetrics: { enabled: true, size: 'small', category: 'general', essential: false },
    quickActions: { enabled: true, size: 'medium', category: 'general', essential: true },
    recentActivity: { enabled: true, size: 'small', category: 'general', essential: false },
    communicationsCenter: { enabled: false, size: 'large', category: 'marketing', essential: false },
    customerInsights: { enabled: false, size: 'medium', category: 'marketing', essential: false },
    inventoryAlerts: { enabled: false, size: 'small', category: 'operations', essential: false }
  },
  operations: {
    inventoryAlerts: { enabled: true, size: 'large', category: 'operations', essential: true },
    performanceMetrics: { enabled: true, size: 'medium', category: 'general', essential: true },
    quickActions: { enabled: true, size: 'medium', category: 'general', essential: true },
    recentActivity: { enabled: true, size: 'small', category: 'general', essential: false },
    salesAnalytics: { enabled: false, size: 'medium', category: 'sales', essential: false },
    financialOverview: { enabled: false, size: 'medium', category: 'finance', essential: false },
    communicationsCenter: { enabled: false, size: 'large', category: 'marketing', essential: false },
    customerInsights: { enabled: false, size: 'medium', category: 'marketing', essential: false }
  }
};

// Componente de Widget Premium
const PremiumWidget = ({ widgetId, title, children, onToggle, onResize, size, isFavorite, onFavorite, category }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const categoryColors = {
    marketing: '#E4405F',
    sales: '#25D366',
    finance: '#FF6B35',
    operations: '#4A6CF7',
    general: '#6B7280'
  };

  const getCategoryIcon = (cat) => {
    const icons = {
      marketing: <Campaign sx={{ fontSize: 16 }} />,
      sales: <PointOfSale sx={{ fontSize: 16 }} />,
      finance: <AccountBalance sx={{ fontSize: 16 }} />,
      operations: <Inventory sx={{ fontSize: 16 }} />,
      general: <Groups sx={{ fontSize: 16 }} />
    };
    return icons[cat] || icons.general;
  };

  return (
    <Paper
      sx={{
        height: '100%',
        minHeight: 280,
        position: 'relative',
        border: `3px solid ${alpha(categoryColors[category] || theme.palette.primary.main, 0.2)}`,
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        background: `linear-gradient(135deg, 
          ${alpha(categoryColors[category] || theme.palette.primary.main, 0.05)} 0%,
          ${alpha(theme.palette.background.paper, 0.8)} 100%
        )`,
        '&:hover': {
          borderColor: alpha(categoryColors[category] || theme.palette.primary.main, 0.4),
          boxShadow: `0 8px 32px ${alpha(categoryColors[category] || theme.palette.primary.main, 0.15)}`,
          transform: 'translateY(-2px)'
        }
      }}
    >
      {/* Header Premium */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: isMobile ? 1.5 : 2,
          borderBottom: `2px solid ${alpha(categoryColors[category] || theme.palette.primary.main, 0.1)}`,
          background: `linear-gradient(135deg, 
            ${alpha(categoryColors[category] || theme.palette.primary.main, 0.08)} 0%,
            ${alpha(categoryColors[category] || theme.palette.primary.main, 0.03)} 100%
          )`
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: categoryColors[category] || theme.palette.primary.main
          }}>
            {getCategoryIcon(category)}
            <Chip
              label={category}
              size="small"
              sx={{
                background: alpha(categoryColors[category] || theme.palette.primary.main, 0.1),
                color: categoryColors[category] || theme.palette.primary.main,
                fontWeight: 600,
                fontSize: '0.6rem',
                height: 20
              }}
            />
          </Box>
          <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight={700}>
            {title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Favorito */}
          <Tooltip title={isFavorite ? "Quitar de favoritos" : "Marcar como favorito"}>
            <IconButton
              size="small"
              onClick={() => onFavorite(widgetId, !isFavorite)}
              sx={{
                color: isFavorite ? 'gold' : alpha(categoryColors[category] || theme.palette.primary.main, 0.6),
                background: alpha(isFavorite ? 'gold' : categoryColors[category] || theme.palette.primary.main, 0.1)
              }}
            >
              {isFavorite ? <Star /> : <StarBorder />}
            </IconButton>
          </Tooltip>

          {/* Tamaño */}
          <Tooltip title={`Cambiar tamaño (${size})`}>
            <IconButton
              size="small"
              onClick={() => {
                const sizes = ['small', 'medium', 'large'];
                const currentIndex = sizes.indexOf(size);
                const nextSize = sizes[(currentIndex + 1) % sizes.length];
                onResize(widgetId, nextSize);
              }}
              sx={{
                color: categoryColors[category] || theme.palette.primary.main,
                background: alpha(categoryColors[category] || theme.palette.primary.main, 0.1)
              }}
            >
              <AspectRatio />
            </IconButton>
          </Tooltip>

          {/* Ocultar */}
          <Tooltip title="Ocultar widget">
            <IconButton
              size="small"
              onClick={() => onToggle(widgetId)}
              sx={{
                color: 'text.secondary'
              }}
            >
              <VisibilityOff />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Contenido */}
      <Box sx={{ 
        p: isMobile ? 1.5 : 3,
        height: `calc(100% - ${isMobile ? 60 : 80}px)`,
        overflow: 'auto'
      }}>
        {children}
      </Box>

      {/* Footer con Info */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 8, 
        left: 8,
        right: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Chip
          icon={getCategoryIcon(category)}
          label={size}
          size="small"
          variant="outlined"
          sx={{
            fontSize: '0.6rem',
            fontWeight: 'bold',
            background: alpha(categoryColors[category] || theme.palette.primary.main, 0.1)
          }}
        />
        
        {isFavorite && (
          <Star sx={{ fontSize: 16, color: 'gold' }} />
        )}
      </Box>
    </Paper>
  );
};

// Componente principal del Dashboard Premium
const Dashboard = () => {
  const theme = useTheme();
  const { user, updateUserPreferences } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [widgetsConfig, setWidgetsConfig] = useState({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [activeTab, setActiveTab] = useState(0);

  // Obtener configuración inicial basada en el rol del usuario
  const getInitialConfig = () => {
    const userRole = user?.role || 'admin';
    const roleConfig = WIDGETS_BY_ROLE[userRole] || WIDGETS_BY_ROLE.admin;
    
    // Convertir a formato interno agregando propiedades de estado
    const configWithState = {};
    Object.keys(roleConfig).forEach(widgetId => {
      configWithState[widgetId] = {
        ...roleConfig[widgetId],
        isFavorite: roleConfig[widgetId].essential || false,
        enabled: roleConfig[widgetId].enabled
      };
    });
    
    return configWithState;
  };

  useEffect(() => {
    const savedConfig = localStorage.getItem(`dashboardConfig_${user?.id}`);
    if (savedConfig) {
      setWidgetsConfig(JSON.parse(savedConfig));
    } else {
      setWidgetsConfig(getInitialConfig());
    }
  }, [user]);

  const saveWidgetsConfig = (newConfig) => {
    setWidgetsConfig(newConfig);
    localStorage.setItem(`dashboardConfig_${user?.id}`, JSON.stringify(newConfig));
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const toggleWidget = (widgetId) => {
    const newConfig = {
      ...widgetsConfig,
      [widgetId]: {
        ...widgetsConfig[widgetId],
        enabled: !widgetsConfig[widgetId]?.enabled
      }
    };
    saveWidgetsConfig(newConfig);
    showSnackbar(`Widget ${widgetsConfig[widgetId]?.enabled ? 'oculto' : 'mostrado'}`, 'info');
  };

  const resizeWidget = (widgetId, newSize) => {
    const newConfig = {
      ...widgetsConfig,
      [widgetId]: {
        ...widgetsConfig[widgetId],
        size: newSize
      }
    };
    saveWidgetsConfig(newConfig);
    showSnackbar(`Tamaño cambiado a ${newSize}`, 'success');
  };

  const toggleFavorite = (widgetId, isFavorite) => {
    const newConfig = {
      ...widgetsConfig,
      [widgetId]: {
        ...widgetsConfig[widgetId],
        isFavorite
      }
    };
    saveWidgetsConfig(newConfig);
    showSnackbar(isFavorite ? 'Agregado a favoritos' : 'Removido de favoritos', 'success');
  };

  const getEnabledWidgets = () => {
    return Object.entries(widgetsConfig)
      .filter(([_, config]) => config.enabled)
      .sort((a, b) => {
        // Ordenar por favoritos primero, luego por categoría
        if (a[1].isFavorite && !b[1].isFavorite) return -1;
        if (!a[1].isFavorite && b[1].isFavorite) return 1;
        return a[1].category.localeCompare(b[1].category);
      });
  };

  const getGridSize = (size) => {
    if (isMobile) return 12;
    switch (size) {
      case 'large': return 12;
      case 'medium': return 6;
      case 'small': return 4;
      default: return 6;
    }
  };

  const getWidgetTitle = (widgetId) => {
    const titles = {
      communicationsCenter: '📊 Centro de Comunicaciones',
      financialOverview: '💰 Resumen Financiero',
      quickActions: '⚡ Acciones Rápidas',
      performanceMetrics: '📈 Métricas de Rendimiento',
      salesAnalytics: '🛒 Análisis de Ventas',
      customerInsights: '👥 Información de Clientes',
      inventoryAlerts: '📦 Alertas de Inventario',
      recentActivity: '🔄 Actividad Reciente'
    };
    return titles[widgetId];
  };

  const getRoleDisplayName = (role) => {
    const names = {
      admin: 'Administrador',
      marketing: 'Marketing',
      sales: 'Ventas',
      finance: 'Finanzas',
      operations: 'Operaciones'
    };
    return names[role] || 'Usuario';
  };

  const resetToRoleDefault = () => {
    saveWidgetsConfig(getInitialConfig());
    showSnackbar(`Configuración restablecida para ${getRoleDisplayName(user?.role)}`, 'info');
  };

  const saveAsDefault = () => {
    updateUserPreferences({ dashboard_layout: 'custom' });
    showSnackbar('Configuración guardada como predeterminada', 'success');
  };

  const renderWidget = (widgetId, config) => {
    const widgetProps = {
      key: widgetId,
      widgetId,
      title: getWidgetTitle(widgetId),
      onToggle: toggleWidget,
      onResize: resizeWidget,
      onFavorite: toggleFavorite,
      size: config.size,
      isFavorite: config.isFavorite,
      category: config.category
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
      <PremiumWidget {...widgetProps}>
        {widgetComponents[widgetId]}
      </PremiumWidget>
    );
  };

  const getWidgetsByCategory = () => {
    const categories = {};
    Object.entries(widgetsConfig).forEach(([widgetId, config]) => {
      if (!categories[config.category]) {
        categories[config.category] = [];
      }
      categories[config.category].push({ widgetId, ...config });
    });
    return categories;
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 4, px: isMobile ? 1 : 3 }}>
      {/* Header Premium */}
      <Box sx={{ mb: 4, pt: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              fontWeight={700} 
              gutterBottom
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              ¡Bienvenido, {user?.first_name || 'Usuario'}!
            </Typography>
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              color="text.secondary" 
              sx={{ mb: 2 }}
            >
              Dashboard {getRoleDisplayName(user?.role)} • {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>

            {/* Info del Rol */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <Chip 
                icon={<AdminPanelSettings />}
                label={`Rol: ${getRoleDisplayName(user?.role)}`}
                color="primary"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              />
              <Chip 
                label={`${getEnabledWidgets().length} widgets activos`}
                color="success"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              />
              <Chip 
                label="Experiencia Premium"
                color="secondary"
                variant="filled"
                size={isMobile ? "small" : "medium"}
              />
            </Box>
          </Box>
          
          {/* Controles Premium */}
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <UBButton
              variant="outlined"
              startIcon={<Palette />}
              onClick={() => setSettingsOpen(true)}
              size={isMobile ? "small" : "medium"}
            >
              Personalizar
            </UBButton>
            <UBButton
              variant="contained"
              startIcon={<AutoAwesome />}
              size={isMobile ? "small" : "medium"}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
              }}
            >
              Vista Premium
            </UBButton>
          </Box>
        </Box>
      </Box>

      {/* Grid de Widgets Premium */}
      <Grid container spacing={isMobile ? 2 : 3}>
        {getEnabledWidgets().map(([widgetId, config]) => (
          <Grid item xs={12} md={getGridSize(config.size)} key={widgetId}>
            {renderWidget(widgetId, config)}
          </Grid>
        ))}
      </Grid>

      {/* Botón Flotante */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
        }}
        onClick={() => setSettingsOpen(true)}
      >
        <Settings />
      </Fab>

      {/* Diálogo de Personalización Premium */}
      <Dialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
        maxWidth="lg" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Palette />
            Centro de Personalización - {getRoleDisplayName(user?.role)}
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
            <Tab label="Todos los Widgets" />
            <Tab label="Por Categoría" />
            <Tab label="Configuración" />
          </Tabs>

          {activeTab === 0 && (
            <Grid container spacing={2}>
              {Object.entries(widgetsConfig).map(([widgetId, config]) => (
                <Grid item xs={12} md={6} key={widgetId}>
                  <Card 
                    variant="outlined"
                    sx={{
                      border: `3px solid ${
                        config.enabled 
                          ? alpha(theme.palette.primary.main, 0.3)
                          : theme.palette.divider
                      }`,
                      background: config.enabled 
                        ? alpha(theme.palette.primary.main, 0.05)
                        : 'transparent'
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {getWidgetTitle(widgetId)}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                            <Chip
                              label={config.category}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              label={config.size}
                              size="small"
                              color="primary"
                            />
                            {config.essential && (
                              <Chip
                                label="Esencial"
                                size="small"
                                color="success"
                              />
                            )}
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
                      
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {['small', 'medium', 'large'].map((sizeOption) => (
                          <Chip
                            key={sizeOption}
                            label={sizeOption}
                            onClick={() => resizeWidget(widgetId, sizeOption)}
                            color={config.size === sizeOption ? 'primary' : 'default'}
                            variant={config.size === sizeOption ? 'filled' : 'outlined'}
                            size="small"
                          />
                        ))}
                        <IconButton
                          size="small"
                          onClick={() => toggleFavorite(widgetId, !config.isFavorite)}
                          sx={{
                            color: config.isFavorite ? 'gold' : 'text.secondary'
                          }}
                        >
                          {config.isFavorite ? <Star /> : <StarBorder />}
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 1 && (
            <Box>
              {Object.entries(getWidgetsByCategory()).map(([category, widgets]) => (
                <Box key={category} sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    textTransform: 'capitalize',
                    color: theme.palette.primary.main
                  }}>
                    {category}
                  </Typography>
                  <Grid container spacing={2}>
                    {widgets.map(({ widgetId, ...config }) => (
                      <Grid item xs={12} md={6} key={widgetId}>
                        <Card variant="outlined">
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography variant="subtitle1">
                                {getWidgetTitle(widgetId)}
                              </Typography>
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
                </Box>
              ))}
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Configuración del Dashboard
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Restore />}
                  onClick={resetToRoleDefault}
                  fullWidth
                >
                  Restablecer para Rol {getRoleDisplayName(user?.role)}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Save />}
                  onClick={saveAsDefault}
                  fullWidth
                >
                  Guardar como Mi Configuración Predeterminada
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>
            Cerrar
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setSettingsOpen(false)}
          >
            Aplicar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Estado Vacío */}
      {getEnabledWidgets().length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          border: `3px dashed ${theme.palette.primary.main}`,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 100%)`
        }}>
          <AutoAwesome sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="primary.main">
            Personaliza tu Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Comienza activando algunos widgets para crear tu espacio de trabajo ideal
          </Typography>
          <UBButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => setSettingsOpen(true)}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
            }}
          >
            Configurar Widgets
          </UBButton>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
