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
  Tooltip
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
  DragHandle
} from '@mui/icons-material';
import UBCard from '../../components/ui/UBCard';
import UBButton from '../../components/ui/UBButton';
import { useAuth } from '../../contexts/AuthContext';

// Componentes de Widgets Mejorados
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
  const [widgetsConfig, setWidgetsConfig] = useState({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [organizeOpen, setOrganizeOpen] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState(null);
  const [previewWidgets, setPreviewWidgets] = useState([]);

  // Configuración inicial de widgets mejorados
  const defaultWidgets = {
    communicationsCenter: { 
      enabled: true, 
      size: 'large', 
      position: 1, 
      title: '📊 Centro de Comunicaciones',
      description: 'Gestión unificada de todos tus canales'
    },
    financialOverview: { 
      enabled: true, 
      size: 'medium', 
      position: 2, 
      title: '💰 Resumen Financiero',
      description: 'Estado de ingresos, gastos y utilidades'
    },
    quickActions: { 
      enabled: true, 
      size: 'medium', 
      position: 3, 
      title: '⚡ Acciones Rápidas',
      description: 'Tareas frecuentes y acceso directo'
    },
    performanceMetrics: { 
      enabled: true, 
      size: 'small', 
      position: 4, 
      title: '📈 Métricas Clave',
      description: 'Rendimiento del sistema y servicios'
    },
    salesAnalytics: { 
      enabled: true, 
      size: 'medium', 
      position: 5, 
      title: '🛒 Análisis de Ventas',
      description: 'Tendencias y canales de venta'
    },
    customerInsights: { 
      enabled: true, 
      size: 'medium', 
      position: 6, 
      title: '👥 Clientes',
      description: 'Segmentación y satisfacción'
    },
    inventoryAlerts: { 
      enabled: true, 
      size: 'small', 
      position: 7, 
      title: '📦 Inventario',
      description: 'Stock y alertas importantes'
    },
    recentActivity: { 
      enabled: true, 
      size: 'small', 
      position: 8, 
      title: '🔄 Actividad',
      description: 'Eventos recientes del sistema'
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

  const getEnabledWidgets = () => {
    return Object.entries(widgetsConfig)
      .filter(([_, config]) => config.enabled)
      .sort((a, b) => a[1].position - b[1].position);
  };

  const getGridSize = (size) => {
    switch (size) {
      case 'large': return 12;
      case 'medium': return 6;
      case 'small': return 4;
      default: return 6;
    }
  };

  // Sistema de arrastre mejorado
  const moveWidget = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;

    const newConfig = { ...widgetsConfig };
    const enabledWidgets = getEnabledWidgets();
    
    // Reasignar todas las posiciones
    enabledWidgets.forEach(([widgetId], index) => {
      let newPosition;
      if (index === fromIndex) {
        newPosition = toIndex + 1;
      } else if (fromIndex < toIndex) {
        // Moviendo hacia abajo
        if (index > fromIndex && index <= toIndex) {
          newPosition = index;
        } else if (index < fromIndex) {
          newPosition = index + 1;
        } else {
          newPosition = index + 1;
        }
      } else {
        // Moviendo hacia arriba
        if (index >= toIndex && index < fromIndex) {
          newPosition = index + 2;
        } else if (index > fromIndex) {
          newPosition = index + 1;
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
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex, inPreview = false) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (!data) return;

    const { widgetId, fromPreview } = JSON.parse(data);
    
    if (fromPreview !== inPreview) {
      // Movimiento entre vista previa y lista
      if (inPreview) {
        // Soltando en la vista previa
        const enabledWidgets = getEnabledWidgets();
        const currentIndex = enabledWidgets.findIndex(([id]) => id === widgetId);
        if (currentIndex !== -1) {
          moveWidget(currentIndex, targetIndex);
        }
      }
    } else {
      // Movimiento dentro del mismo panel
      const enabledWidgets = inPreview ? previewWidgets : getEnabledWidgets();
      const currentIndex = enabledWidgets.findIndex(([id]) => id === widgetId);
      if (currentIndex !== -1 && currentIndex !== targetIndex) {
        moveWidget(currentIndex, targetIndex);
      }
    }
    
    setDraggedWidget(null);
  };

  // Componente de Vista Previa Interactiva Mejorada
  const InteractiveDashboardPreview = () => {
    const [localWidgets, setLocalWidgets] = useState(previewWidgets);

    useEffect(() => {
      setLocalWidgets(previewWidgets);
    }, [previewWidgets]);

    const handlePreviewDragStart = (e, widgetId, index) => {
      handleDragStart(e, widgetId, true);
    };

    const handlePreviewDrop = (e, targetIndex) => {
      handleDrop(e, targetIndex, true);
    };

    const getPreviewGridSize = (size) => {
      switch (size) {
        case 'large': return 12;
        case 'medium': return 6;
        case 'small': return 4;
        default: return 6;
      }
    };

    const getPreviewHeight = (size) => {
      switch (size) {
        case 'large': return 120;
        case 'medium': return 100;
        case 'small': return 80;
        default: return 100;
      }
    };

    return (
      <Box sx={{ 
        p: 3, 
        border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        borderRadius: 3,
        background: alpha(theme.palette.background.paper, 0.8),
        minHeight: 400,
        transform: 'scale(0.85)',
        transformOrigin: 'top center'
      }}>
        <Typography variant="h6" fontWeight={600} color="primary.main" sx={{ mb: 2, textAlign: 'center' }}>
          Vista Previa Interactiva
        </Typography>
        
        <Grid container spacing={1.5}>
          {localWidgets.map(([widgetId, config], index) => (
            <Grid 
              item 
              xs={getPreviewGridSize(config.size)} 
              key={widgetId}
            >
              <Paper
                draggable
                onDragStart={(e) => handlePreviewDragStart(e, widgetId, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handlePreviewDrop(e, index)}
                sx={{
                  height: getPreviewHeight(config.size),
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
                  border: `2px solid ${alpha(theme.palette.primary.main, draggedWidget === widgetId ? 0.6 : 0.3)}`,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 1.5,
                  cursor: 'grab',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: alpha(theme.palette.primary.main, 0.6),
                    boxShadow: theme.shadows[2],
                    transform: 'translateY(-2px)'
                  },
                  '&:active': {
                    cursor: 'grabbing'
                  },
                  opacity: draggedWidget === widgetId ? 0.7 : 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography 
                      variant="subtitle2" 
                      fontWeight={600}
                      sx={{ fontSize: config.size === 'small' ? '0.75rem' : '0.8rem' }}
                    >
                      {config.title}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: '0.65rem',
                        display: config.size === 'small' ? 'none' : 'block'
                      }}
                    >
                      {config.description}
                    </Typography>
                  </Box>
                  <DragHandle 
                    sx={{ 
                      fontSize: 16, 
                      color: 'text.secondary',
                      opacity: 0.7
                    }} 
                  />
                </Box>
                
                {/* Contenido de preview según el tipo de widget */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-end'
                }}>
                  <Chip 
                    label={config.size === 'large' ? 'L' : config.size === 'medium' ? 'M' : 'S'} 
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ height: 20, fontSize: '0.6rem' }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    #{index + 1}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        {localWidgets.length === 0 && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 6,
            border: `2px dashed ${theme.palette.divider}`,
            borderRadius: 2
          }}>
            <GridView sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Arrastra widgets aquí
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Suelta widgets desde la lista para ver la vista previa
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  const WidgetContainer = ({ children, widgetId, title, description, onToggle }) => (
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: alpha(theme.palette.primary.main, 0.02)
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DragIndicator 
            sx={{ 
              color: 'text.secondary',
              cursor: 'grab',
              '&:active': { cursor: 'grabbing' }
            }} 
          />
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
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

      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    </Paper>
  );

  const WidgetListItem = ({ widgetId, config, index, onDragStart, onDragOver, onDrop }) => (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, widgetId, false)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index, false)}
      sx={{
        cursor: 'grab',
        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
          borderColor: alpha(theme.palette.primary.main, 0.5)
        },
        '&:active': {
          cursor: 'grabbing'
        },
        opacity: draggedWidget === widgetId ? 0.5 : 1
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main
            }}
          >
            <GridView fontSize="small" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {config.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {config.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
              <Chip 
                label={`Posición: ${index + 1}`} 
                size="small" 
                variant="outlined"
                sx={{ height: 20, fontSize: '0.6rem' }}
              />
              <Chip 
                label={config.size === 'large' ? 'Grande' : config.size === 'medium' ? 'Mediano' : 'Pequeño'} 
                size="small" 
                color="primary"
                variant="outlined"
                sx={{ height: 20, fontSize: '0.6rem' }}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DragHandle sx={{ color: 'text.secondary' }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderWidget = (widgetId, config) => {
    const widgetProps = {
      key: widgetId,
      widgetId,
      title: config.title,
      description: config.description,
      onToggle: toggleWidget
    };

    switch (widgetId) {
      case 'communicationsCenter':
        return (
          <WidgetContainer {...widgetProps}>
            <CommunicationsCenter />
          </WidgetContainer>
        );
      case 'financialOverview':
        return (
          <WidgetContainer {...widgetProps}>
            <FinancialOverview />
          </WidgetContainer>
        );
      case 'quickActions':
        return (
          <WidgetContainer {...widgetProps}>
            <QuickActions />
          </WidgetContainer>
        );
      case 'performanceMetrics':
        return (
          <WidgetContainer {...widgetProps}>
            <PerformanceMetrics />
          </WidgetContainer>
        );
      case 'salesAnalytics':
        return (
          <WidgetContainer {...widgetProps}>
            <SalesAnalytics />
          </WidgetContainer>
        );
      case 'customerInsights':
        return (
          <WidgetContainer {...widgetProps}>
            <CustomerInsights />
          </WidgetContainer>
        );
      case 'inventoryAlerts':
        return (
          <WidgetContainer {...widgetProps}>
            <InventoryAlerts />
          </WidgetContainer>
        );
      case 'recentActivity':
        return (
          <WidgetContainer {...widgetProps}>
            <RecentActivity />
          </WidgetContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 4 }}>
      {/* Header Principal Mejorado */}
      <Box sx={{ mb: 4, pt: 2 }}>
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
              <Chip 
                icon={<TrendingUp />} 
                label="Ventas del día: $2,340" 
                color="success" 
                variant="outlined" 
              />
              <Chip 
                icon={<People />} 
                label="12 nuevos clientes" 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                icon={<Chat />} 
                label="45 mensajes pendientes" 
                color="warning" 
                variant="outlined" 
              />
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

      {/* Grid de Widgets */}
      <Grid container spacing={3}>
        {getEnabledWidgets().map(([widgetId, config]) => (
          <Grid item xs={12} md={getGridSize(config.size)} key={widgetId}>
            {renderWidget(widgetId, config)}
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de Organización con Vista Previa Interactiva */}
      <Dialog 
        open={organizeOpen} 
        onClose={() => setOrganizeOpen(false)} 
        maxWidth="lg" 
        fullWidth
        sx={{ '& .MuiDialog-paper': { minHeight: '80vh' } }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Preview />
            Organizar Dashboard - Vista Previa Interactiva
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            {/* Panel de Vista Previa Interactiva */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ position: 'sticky', top: 0 }}>
                <InteractiveDashboardPreview />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                  🎯 Arrastra widgets directamente en la vista previa
                </Typography>
              </Box>
            </Grid>

            {/* Panel de Lista de Widgets */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Widgets Disponibles ({previewWidgets.length})
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Arrastra para reorganizar o soltar en la vista previa
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 2,
                  flex: 1,
                  overflow: 'auto',
                  maxHeight: 500
                }}>
                  {previewWidgets.map(([widgetId, config], index) => (
                    <WidgetListItem
                      key={widgetId}
                      widgetId={widgetId}
                      config={config}
                      index={index}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    />
                  ))}
                </Box>

                {previewWidgets.length === 0 && (
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 4,
                    border: `2px dashed ${theme.palette.divider}`,
                    borderRadius: 2,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <ViewModule sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      No hay widgets activos
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Activa algunos widgets para comenzar a organizar
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Settings />}
                      onClick={() => {
                        setOrganizeOpen(false);
                        setSettingsOpen(true);
                      }}
                    >
                      Activar Widgets
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrganizeOpen(false)}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setOrganizeOpen(false)}
          >
            Aplicar Organización
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Configuración */}
      <Dialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Settings />
            Personalizar Dashboard
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
                      transform: 'translateY(-2px)'
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
          <Button onClick={() => setSettingsOpen(false)}>
            Cancelar
          </Button>
          <UBButton
            variant="contained"
            startIcon={<Preview />}
            onClick={() => {
              setSettingsOpen(false);
              setOrganizeOpen(true);
            }}
          >
            Organizar Vista
          </UBButton>
        </DialogActions>
      </Dialog>

      {/* Mensaje si no hay widgets activos */}
      {getEnabledWidgets().length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          border: `2px dashed ${theme.palette.divider}`,
          borderRadius: 3
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
