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
  useMediaQuery
} from '@mui/material';
import {
  Settings,
  DragIndicator,
  Add,
  Visibility,
  VisibilityOff,
  Dashboard as DashboardIcon,
  AspectRatio,
  Star,
  StarBorder
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

// Componente de Widget Simple
const Widget = ({ widgetId, title, children, onToggle, onResize, size, isFavorite, onFavorite }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Paper
      sx={{
        height: '100%',
        position: 'relative',
        border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.3),
          boxShadow: theme.shadows[4]
        }
      }}
    >
      {/* Header del Widget */}
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight={600}>
            {title}
          </Typography>
          {isFavorite && (
            <Star sx={{ fontSize: 16, color: 'gold' }} />
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Botón Favorito */}
          <Tooltip title={isFavorite ? "Quitar de favoritos" : "Marcar como favorito"}>
            <IconButton
              size="small"
              onClick={() => onFavorite(widgetId, !isFavorite)}
              sx={{
                color: isFavorite ? 'gold' : 'text.secondary'
              }}
            >
              {isFavorite ? <Star /> : <StarBorder />}
            </IconButton>
          </Tooltip>

          {/* Selector de Tamaño */}
          <Tooltip title="Cambiar tamaño">
            <IconButton
              size="small"
              onClick={() => {
                const sizes = ['small', 'medium', 'large'];
                const currentIndex = sizes.indexOf(size);
                const nextSize = sizes[(currentIndex + 1) % sizes.length];
                onResize(widgetId, nextSize);
              }}
              sx={{
                color: 'primary.main'
              }}
            >
              <AspectRatio />
            </IconButton>
          </Tooltip>

          {/* Botón Ocultar/Mostrar */}
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

      {/* Contenido del Widget */}
      <Box sx={{ p: isMobile ? 1.5 : 3 }}>
        {children}
      </Box>

      {/* Indicador de Tamaño */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
        }}
      >
        <Chip
          label={size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L'}
          size="small"
          variant="outlined"
          sx={{ fontSize: '0.6rem', fontWeight: 'bold' }}
        />
      </Box>
    </Paper>
  );
};

// Componente principal del Dashboard
const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [widgetsConfig, setWidgetsConfig] = useState({});
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Configuración inicial de widgets
  const defaultWidgets = {
    communicationsCenter: { 
      enabled: true, 
      size: isMobile ? 'medium' : 'large', 
      isFavorite: true 
    },
    financialOverview: { 
      enabled: true, 
      size: 'medium', 
      isFavorite: false 
    },
    quickActions: { 
      enabled: true, 
      size: 'medium', 
      isFavorite: true 
    },
    performanceMetrics: { 
      enabled: true, 
      size: 'small', 
      isFavorite: false 
    },
    salesAnalytics: { 
      enabled: true, 
      size: 'medium', 
      isFavorite: false 
    },
    customerInsights: { 
      enabled: true, 
      size: 'medium', 
      isFavorite: false 
    },
    inventoryAlerts: { 
      enabled: true, 
      size: 'small', 
      isFavorite: false 
    },
    recentActivity: { 
      enabled: true, 
      size: 'small', 
      isFavorite: false 
    }
  };

  useEffect(() => {
    // Cargar configuración desde localStorage o usar defaults
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

  const resizeWidget = (widgetId, newSize) => {
    const newConfig = {
      ...widgetsConfig,
      [widgetId]: {
        ...widgetsConfig[widgetId],
        size: newSize
      }
    };
    saveWidgetsConfig(newConfig);
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
  };

  const getEnabledWidgets = () => {
    return Object.entries(widgetsConfig)
      .filter(([_, config]) => config.enabled)
      .sort((a, b) => {
        // Ordenar por favoritos primero
        if (a[1].isFavorite && !b[1].isFavorite) return -1;
        if (!a[1].isFavorite && b[1].isFavorite) return 1;
        return 0;
      });
  };

  const getGridSize = (size) => {
    if (isMobile) {
      return 12; // En móvil, todos ocupan todo el ancho
    }
    
    switch (size) {
      case 'large': return 12;
      case 'medium': return 6;
      case 'small': return 4;
      default: return 6;
    }
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
      isFavorite: config.isFavorite
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
      <Widget {...widgetProps}>
        {widgetComponents[widgetId]}
      </Widget>
    );
  };

  const getWidgetTitle = (widgetId) => {
    const titles = {
      communicationsCenter: '📊 Comunicaciones',
      financialOverview: '💰 Finanzas',
      quickActions: '⚡ Acciones',
      performanceMetrics: '📈 Rendimiento',
      salesAnalytics: '🛒 Ventas',
      customerInsights: '👥 Clientes',
      inventoryAlerts: '📦 Inventario',
      recentActivity: '🔄 Actividad'
    };
    return isMobile ? titles[widgetId] : {
      communicationsCenter: '📊 Centro de Comunicaciones',
      financialOverview: '💰 Resumen Financiero',
      quickActions: '⚡ Acciones Rápidas',
      performanceMetrics: '📈 Métricas de Rendimiento',
      salesAnalytics: '🛒 Análisis de Ventas',
      customerInsights: '👥 Información de Clientes',
      inventoryAlerts: '📦 Alertas de Inventario',
      recentActivity: '🔄 Actividad Reciente'
    }[widgetId];
  };

  const resetLayout = () => {
    saveWidgetsConfig(defaultWidgets);
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 4, px: isMobile ? 1 : 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, pt: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              fontWeight={700} 
              gutterBottom
            >
              ¡Bienvenido, {user?.business?.name || user?.first_name || 'Usuario'}!
            </Typography>
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              color="text.secondary" 
              sx={{ mb: 2 }}
            >
              Tu dashboard personalizado - {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
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

        {/* Instrucciones */}
        <Box sx={{ 
          mt: 2,
          p: isMobile ? 1 : 2,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 2,
          background: alpha(theme.palette.primary.main, 0.03)
        }}>
          <Typography variant="body2" color="text.secondary">
            💡 <strong>Personaliza tu espacio:</strong> Cambia tamaños, marca favoritos y organiza como prefieras
          </Typography>
        </Box>
      </Box>

      {/* Grid de Widgets */}
      <Grid container spacing={isMobile ? 2 : 3}>
        {getEnabledWidgets().map(([widgetId, config]) => (
          <Grid item xs={12} md={getGridSize(config.size)} key={widgetId}>
            {renderWidget(widgetId, config)}
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de Configuración */}
      <Dialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          Personalizar Dashboard
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Configura los widgets y su disposición
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
                      : 'transparent'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {getWidgetTitle(widgetId)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tamaño: {config.size === 'large' ? 'Grande' : config.size === 'medium' ? 'Mediano' : 'Pequeño'}
                        </Typography>
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
                    
                    {/* Controles de Widget */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {['small', 'medium', 'large'].map((sizeOption) => (
                        <Chip
                          key={sizeOption}
                          label={sizeOption === 'small' ? 'S' : sizeOption === 'medium' ? 'M' : 'L'}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={resetLayout}>
            Resetear
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setSettingsOpen(false)}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mensaje si no hay widgets activos */}
      {getEnabledWidgets().length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          border: `2px dashed ${theme.palette.divider}`,
          borderRadius: 3,
          mx: isMobile ? 1 : 0
        }}>
          <DashboardIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            No hay widgets activos
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Personaliza tu dashboard activando algunos widgets
          </Typography>
          <UBButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => setSettingsOpen(true)}
          >
            Personalizar Dashboard
          </UBButton>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
