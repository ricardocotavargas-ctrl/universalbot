// src/pages/dashboard/Dashboard.js
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
  AutoFixHigh
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import UBButton from '../../components/ui/UBButton';
import { useAuth } from '../../contexts/AuthContext';

// Componentes de Widgets - TUS VERSIONES EXACTAS
import CommunicationsCenter from './widgets/CommunicationsCenter';
import FinancialOverview from './widgets/FinancialOverview';
import QuickActions from './widgets/QuickActions';
import PerformanceMetrics from './widgets/PerformanceMetrics';
import SalesAnalytics from './widgets/SalesAnalytics';
import CustomerInsights from './widgets/CustomerInsights';
import InventoryAlerts from './widgets/InventoryAlerts';
import RecentActivity from './widgets/RecentActivity';

// Componente de Widget Redimensionable
const ResizableWidget = ({ 
  widgetId, 
  title, 
  children, 
  onToggle, 
  onResize, 
  size, 
  isEditing = false 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleResize = (newSize) => {
    onResize(widgetId, newSize);
  };

  const getSizeLabel = (size) => {
    switch (size) {
      case 'small': return 'S';
      case 'medium': return 'M';
      case 'large': return 'L';
      case 'xlarge': return 'XL';
      default: return 'M';
    }
  };

  return (
    <Paper
      sx={{
        height: '100%',
        position: 'relative',
        border: `2px solid ${
          isEditing 
            ? alpha(theme.palette.primary.main, 0.3)
            : alpha(theme.palette.primary.main, 0.1)
        }`,
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          {isEditing && (
            <DragIndicator 
              sx={{ 
                color: 'primary.main',
                cursor: 'grab'
              }} 
            />
          )}
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            fontWeight={600}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Selector de Tamaño */}
          {isEditing && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1 }}>
              {['small', 'medium', 'large', 'xlarge'].map((sizeOption) => (
                <Tooltip key={sizeOption} title={`Tamaño ${getSizeLabel(sizeOption)}`}>
                  <IconButton
                    size="small"
                    onClick={() => handleResize(sizeOption)}
                    sx={{
                      width: 28,
                      height: 28,
                      background: size === sizeOption ? 
                        alpha(theme.palette.primary.main, 0.2) : 'transparent',
                      color: size === sizeOption ? 'primary.main' : 'text.secondary',
                      border: size === sizeOption ? `1px solid ${theme.palette.primary.main}` : 'none'
                    }}
                  >
                    <Typography variant="caption" fontWeight={600}>
                      {getSizeLabel(sizeOption)}
                    </Typography>
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          )}

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

      {/* Contenido del Widget - SIN MODIFICACIONES, se pasa isMobile automáticamente */}
      <Box sx={{ 
        p: isMobile ? 1.5 : 3,
        height: `calc(100% - ${isMobile ? 60 : 80}px)`,
        overflow: 'auto'
      }}>
        {React.cloneElement(children, { isMobile })}
      </Box>

      {/* Indicador de Tamaño */}
      {isEditing && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            background: alpha(theme.palette.primary.main, 0.9),
            color: 'white',
            borderRadius: 1,
            px: 1,
            py: 0.5
          }}
        >
          <Typography variant="caption" fontWeight={600}>
            {getSizeLabel(size)}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

// Componente principal del Dashboard
const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [widgetsConfig, setWidgetsConfig] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Configuración inicial
  const defaultWidgets = {
    communicationsCenter: { enabled: true, size: 'large' },
    financialOverview: { enabled: true, size: 'medium' },
    quickActions: { enabled: true, size: 'medium' },
    performanceMetrics: { enabled: true, size: 'small' },
    salesAnalytics: { enabled: true, size: 'medium' },
    customerInsights: { enabled: true, size: 'medium' },
    inventoryAlerts: { enabled: true, size: 'small' },
    recentActivity: { enabled: true, size: 'small' }
  };

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

  const getEnabledWidgets = () => {
    return Object.entries(widgetsConfig)
      .filter(([_, config]) => config.enabled);
  };

  const getGridSize = (size) => {
    if (isMobile) {
      return 12;
    }
    
    switch (size) {
      case 'small': return 4;
      case 'medium': return 6;
      case 'large': return 8;
      case 'xlarge': return 12;
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
      size: config.size,
      isEditing: isEditing
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
      <ResizableWidget {...widgetProps}>
        {widgetComponents[widgetId]}
      </ResizableWidget>
    );
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
            <Typography variant="h4" fontWeight={700} gutterBottom>
              ¡Bienvenido, {user?.business?.name || user?.first_name || 'Usuario'}!
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <UBButton
              variant={isEditing ? "contained" : "outlined"}
              startIcon={<AutoFixHigh />}
              onClick={() => setIsEditing(!isEditing)}
              color={isEditing ? "secondary" : "primary"}
            >
              {isEditing ? 'Listo' : 'Personalizar'}
            </UBButton>

            <UBButton
              variant="outlined"
              startIcon={<Settings />}
              onClick={() => setSettingsOpen(true)}
            >
              Configurar
            </UBButton>
          </Box>
        </Box>

        {isEditing && (
          <Box sx={{ 
            mt: 2,
            p: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 2,
            background: alpha(theme.palette.primary.main, 0.03)
          }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Modo edición activo:</strong> Usa los botones S/M/L/XL en cada widget para cambiar su tamaño.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Grid de Widgets */}
      <Grid container spacing={3}>
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
      >
        <DialogTitle>
          Configurar Dashboard
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
                    }`
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {getWidgetTitle(widgetId)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tamaño: {config.size}
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetLayout}>
            Restablecer
          </Button>
          <Button onClick={() => setSettingsOpen(false)}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {getEnabledWidgets().length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          border: `2px dashed ${theme.palette.divider}`,
          borderRadius: 3
        }}>
          <DashboardIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            No hay widgets activos
          </Typography>
          <UBButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => setSettingsOpen(true)}
          >
            Configurar Widgets
          </UBButton>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
