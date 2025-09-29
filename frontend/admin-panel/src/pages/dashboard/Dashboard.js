// frontend/admin-panel/src/pages/dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
  Reorder
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

// Tipo para el sistema de drag & drop
const ItemTypes = {
  WIDGET: 'widget'
};

// Componente de Widget Draggable
const DraggableWidget = ({ widgetId, title, children, onToggle, onMoveWidget, size, index }) => {
  const theme = useTheme();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.WIDGET,
    item: { widgetId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [widgetId, index]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.WIDGET,
    drop: (item) => {
      if (item.widgetId !== widgetId) {
        onMoveWidget(item.index, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [widgetId, index, onMoveWidget]);

  return (
    <div ref={drop} style={{ height: '100%' }}>
      <Paper
        ref={drag}
        sx={{
          height: '100%',
          position: 'relative',
          border: `2px solid ${
            isOver 
              ? alpha(theme.palette.primary.main, 0.5)
              : isDragging
              ? alpha(theme.palette.primary.main, 0.3)
              : alpha(theme.palette.primary.main, 0.1)
          }`,
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          opacity: isDragging ? 0.6 : 1,
          transform: isDragging ? 'scale(0.98)' : 'scale(1)',
          cursor: isDragging ? 'grabbing' : 'grab',
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
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            background: alpha(theme.palette.primary.main, 0.02)
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DragIndicator 
              sx={{ 
                color: 'text.secondary',
                cursor: isDragging ? 'grabbing' : 'grab',
                '&:active': { cursor: 'grabbing' }
              }} 
            />
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            <Chip 
              label={size === 'large' ? 'Grande' : size === 'medium' ? 'Mediano' : 'Pequeño'} 
              size="small" 
              variant="outlined"
              sx={{ height: 20, fontSize: '0.6rem' }}
            />
          </Box>
          <Tooltip title={isDragging ? "Suelta para reordenar" : "Arrastra para reordenar"}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(widgetId);
              }}
              sx={{
                color: isDragging ? 'primary.main' : 'text.secondary'
              }}
            >
              {isDragging ? <Reorder /> : <Visibility />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Contenido del Widget */}
        <Box sx={{ p: 3 }}>
          {children}
        </Box>

        {/* Indicador de arrastre */}
        {isOver && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: `3px dashed ${theme.palette.primary.main}`,
              borderRadius: 3,
              background: alpha(theme.palette.primary.main, 0.05),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}
          >
            <Typography variant="body2" color="primary.main" fontWeight={600}>
              Soltar aquí
            </Typography>
          </Box>
        )}
      </Paper>
    </div>
  );
};

// Componente principal del Dashboard con Drag & Drop
const DashboardContent = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [widgetsConfig, setWidgetsConfig] = useState({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Configuración inicial de widgets
  const defaultWidgets = {
    communicationsCenter: { enabled: true, size: 'large', position: 1 },
    financialOverview: { enabled: true, size: 'medium', position: 2 },
    quickActions: { enabled: true, size: 'medium', position: 3 },
    performanceMetrics: { enabled: true, size: 'small', position: 4 },
    salesAnalytics: { enabled: true, size: 'medium', position: 5 },
    customerInsights: { enabled: true, size: 'medium', position: 6 },
    inventoryAlerts: { enabled: true, size: 'small', position: 7 },
    recentActivity: { enabled: true, size: 'small', position: 8 }
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

  // Función para mover widgets
  const moveWidget = (fromIndex, toIndex) => {
    const enabledWidgets = getEnabledWidgets();
    
    if (fromIndex === toIndex) return;

    const updatedWidgets = { ...widgetsConfig };
    const movedWidgetId = enabledWidgets[fromIndex][0];
    
    // Recalcular posiciones
    enabledWidgets.forEach(([widgetId], index) => {
      if (index === fromIndex) {
        // Este widget será movido, lo manejamos después
        return;
      }
      
      let newPosition;
      if (index < toIndex && index < fromIndex) {
        newPosition = index + 1;
      } else if (index >= toIndex && index > fromIndex) {
        newPosition = index - 1;
      } else {
        newPosition = index + 1;
      }
      
      updatedWidgets[widgetId] = {
        ...updatedWidgets[widgetId],
        position: newPosition
      };
    });

    // Posición para el widget movido
    updatedWidgets[movedWidgetId] = {
      ...updatedWidgets[movedWidgetId],
      position: toIndex + 1
    };

    saveWidgetsConfig(updatedWidgets);
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

  const renderWidget = (widgetId, config, index) => {
    const widgetProps = {
      key: widgetId,
      widgetId,
      title: getWidgetTitle(widgetId),
      onToggle: toggleWidget,
      onMoveWidget: moveWidget,
      size: config.size,
      index: index
    };

    switch (widgetId) {
      case 'communicationsCenter':
        return (
          <DraggableWidget {...widgetProps}>
            <CommunicationsCenter />
          </DraggableWidget>
        );
      case 'financialOverview':
        return (
          <DraggableWidget {...widgetProps}>
            <FinancialOverview />
          </DraggableWidget>
        );
      case 'quickActions':
        return (
          <DraggableWidget {...widgetProps}>
            <QuickActions />
          </DraggableWidget>
        );
      case 'performanceMetrics':
        return (
          <DraggableWidget {...widgetProps}>
            <PerformanceMetrics />
          </DraggableWidget>
        );
      case 'salesAnalytics':
        return (
          <DraggableWidget {...widgetProps}>
            <SalesAnalytics />
          </DraggableWidget>
        );
      case 'customerInsights':
        return (
          <DraggableWidget {...widgetProps}>
            <CustomerInsights />
          </DraggableWidget>
        );
      case 'inventoryAlerts':
        return (
          <DraggableWidget {...widgetProps}>
            <InventoryAlerts />
          </DraggableWidget>
        );
      case 'recentActivity':
        return (
          <DraggableWidget {...widgetProps}>
            <RecentActivity />
          </DraggableWidget>
        );
      default:
        return null;
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
    return titles[widgetId] || widgetId;
  };

  const resetLayout = () => {
    saveWidgetsConfig(defaultWidgets);
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
            
            {/* Estadísticas rápidas del header */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
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
              {isDragging && (
                <Chip 
                  icon={<Reorder />} 
                  label="Modo Reordenamiento Activo" 
                  color="info" 
                  variant="filled"
                  sx={{ animation: 'pulse 2s infinite' }}
                />
              )}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <UBButton
              variant="outlined"
              startIcon={<Settings />}
              onClick={() => setSettingsOpen(true)}
            >
              Personalizar
            </UBButton>
            <UBButton
              variant="outlined"
              startIcon={<DragIndicator />}
              onClick={resetLayout}
              color="secondary"
            >
              Resetear Layout
            </UBButton>
            <UBButton
              variant="contained"
              startIcon={<DashboardIcon />}
            >
              Vista Completa
            </UBButton>
          </Box>
        </Box>

        {/* Instrucciones de Drag & Drop */}
        <Box sx={{ 
          mt: 2,
          p: 2,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 2,
          background: alpha(theme.palette.primary.main, 0.03),
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap'
        }}>
          <DragIndicator sx={{ color: 'primary.main' }} />
          <Typography variant="body2" color="text.secondary">
            <strong>Tip:</strong> Arrastra los widgets para reordenarlos. Haz clic en el ícono de visibilidad para ocultar/mostrar.
          </Typography>
        </Box>
      </Box>

      {/* Grid de Widgets con Drag & Drop */}
      <Grid container spacing={3}>
        {getEnabledWidgets().map(([widgetId, config], index) => (
          <Grid item xs={12} md={getGridSize(config.size)} key={widgetId}>
            {renderWidget(widgetId, config, index)}
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de Configuración Mejorado */}
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
            Selecciona qué widgets quieres mostrar en tu dashboard. Puedes reordenarlos arrastrándolos directamente en el dashboard.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Widgets Disponibles
            </Typography>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={resetLayout}
              startIcon={<DragIndicator />}
            >
              Layout Predeterminado
            </Button>
          </Box>

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
                    opacity: config.enabled ? 1 : 0.7,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {getWidgetTitle(widgetId)}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            label={`Tamaño: ${config.size === 'large' ? 'Grande' : config.size === 'medium' ? 'Mediano' : 'Pequeño'}`}
                            size="small" 
                            variant="outlined"
                          />
                          <Chip 
                            label={`Posición: ${config.position}`}
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
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setSettingsOpen(false);
            }}
          >
            Guardar Cambios
          </Button>
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

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
      `}</style>
    </Container>
  );
};

// Componente principal que envuelve con DndProvider
const Dashboard = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DashboardContent />
    </DndProvider>
  );
};

export default Dashboard;
