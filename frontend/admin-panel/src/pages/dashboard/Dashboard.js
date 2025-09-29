import React, { useState, useEffect, useRef } from 'react';
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
  AspectRatio,
  Phone,
  Computer
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

// Componente de Widget Draggable y Redimensionable
const DraggableWidget = ({ widgetId, title, children, onToggle, onMoveWidget, onResizeWidget, size, index }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const widgetRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [showSizeOptions, setShowSizeOptions] = useState(false);

  const handleDragStart = (e) => {
    if (isMobile) {
      // En móvil, usamos un sistema diferente
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', index.toString());
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    if (isMobile) return;
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (e) => {
    if (isMobile) return;
    if (!widgetRef.current?.contains(e.relatedTarget)) {
      setIsOver(false);
    }
  };

  const handleDrop = (e) => {
    if (isMobile) return;
    e.preventDefault();
    setIsOver(false);
    
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (draggedIndex !== index) {
      onMoveWidget(draggedIndex, index);
    }
  };

  const handleTouchStart = (e) => {
    // En móvil, mostramos opciones en lugar de arrastrar
    e.preventDefault();
    setShowSizeOptions(true);
  };

  const handleResize = (newSize) => {
    onResizeWidget(widgetId, newSize);
    setShowSizeOptions(false);
  };

  const getSizeIcon = (size) => {
    switch (size) {
      case 'small': return 'S';
      case 'medium': return 'M';
      case 'large': return 'L';
      default: return 'M';
    }
  };

  const getSizeLabel = (size) => {
    switch (size) {
      case 'small': return 'Pequeño';
      case 'medium': return 'Mediano';
      case 'large': return 'Grande';
      default: return 'Mediano';
    }
  };

  return (
    <Paper
      ref={widgetRef}
      draggable={!isMobile}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onTouchStart={handleTouchStart}
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
        cursor: isMobile ? 'pointer' : isDragging ? 'grabbing' : 'grab',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.3),
          boxShadow: theme.shadows[4]
        },
        // Mejoras específicas para móvil
        ...(isMobile && {
          minHeight: 200,
          marginBottom: 2
        })
      }}
    >
      {/* Header del Widget Mejorado */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: isMobile ? 1.5 : 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: alpha(theme.palette.primary.main, 0.02),
          minHeight: isMobile ? 60 : 'auto'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          {!isMobile && (
            <DragIndicator 
              sx={{ 
                color: 'text.secondary',
                cursor: isDragging ? 'grabbing' : 'grab',
              }} 
            />
          )}
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            fontWeight={600}
            sx={{
              fontSize: isMobile ? '0.9rem' : '1.1rem'
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
          {/* Selector de Tamaño */}
          <Tooltip title={`Cambiar tamaño (Actual: ${getSizeLabel(size)})`}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setShowSizeOptions(!showSizeOptions);
              }}
              sx={{
                color: 'primary.main',
                background: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <AspectRatio fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Tooltip>

          {/* Botón Ocultar/Mostrar */}
          <Tooltip title={isMobile ? "Toque largo para opciones" : "Arrastra para reordenar"}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(widgetId);
              }}
              sx={{
                color: 'text.secondary'
              }}
            >
              {isMobile ? <Reorder /> : <Visibility />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Menú de Opciones de Tamaño */}
      {showSizeOptions && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 1000,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            boxShadow: theme.shadows[8],
            p: 1,
            minWidth: 120
          }}
        >
          <Typography variant="caption" fontWeight={600} sx={{ px: 1, py: 0.5 }}>
            Tamaño del Widget:
          </Typography>
          {['small', 'medium', 'large'].map((sizeOption) => (
            <Button
              key={sizeOption}
              fullWidth
              size="small"
              startIcon={<span style={{ fontWeight: 'bold' }}>{getSizeIcon(sizeOption)}</span>}
              onClick={() => handleResize(sizeOption)}
              sx={{
                justifyContent: 'flex-start',
                background: size === sizeOption ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                color: size === sizeOption ? 'primary.main' : 'text.primary',
                fontWeight: size === sizeOption ? 600 : 400,
                mb: 0.5
              }}
            >
              {getSizeLabel(sizeOption)}
            </Button>
          ))}
        </Box>
      )}

      {/* Contenido del Widget Adaptativo */}
      <Box sx={{ 
        p: isMobile ? 1.5 : 3,
        height: isMobile ? 'calc(100% - 60px)' : 'calc(100% - 80px)',
        overflow: 'auto'
      }}>
        {children}
      </Box>

      {/* Indicador de Tamaño Actual */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          background: alpha(theme.palette.primary.main, 0.8),
          color: 'white',
          borderRadius: '50%',
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.7rem',
          fontWeight: 'bold'
        }}
      >
        {getSizeIcon(size)}
      </Box>

      {/* Indicador de arrastre para desktop */}
      {isOver && !isMobile && (
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
  );
};

// Componente principal del Dashboard
const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [widgetsConfig, setWidgetsConfig] = useState({});
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Configuración inicial de widgets optimizada para móvil
  const defaultWidgets = {
    communicationsCenter: { enabled: true, size: isMobile ? 'medium' : 'large', position: 1 },
    financialOverview: { enabled: true, size: isMobile ? 'medium' : 'medium', position: 2 },
    quickActions: { enabled: true, size: isMobile ? 'large' : 'medium', position: 3 },
    performanceMetrics: { enabled: true, size: 'small', position: 4 },
    salesAnalytics: { enabled: true, size: isMobile ? 'large' : 'medium', position: 5 },
    customerInsights: { enabled: true, size: isMobile ? 'large' : 'medium', position: 6 },
    inventoryAlerts: { enabled: true, size: 'small', position: 7 },
    recentActivity: { enabled: true, size: 'small', position: 8 }
  };

  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardWidgets');
    if (savedConfig) {
      setWidgetsConfig(JSON.parse(savedConfig));
    } else {
      setWidgetsConfig(defaultWidgets);
    }
  }, [isMobile]);

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

  const moveWidget = (fromIndex, toIndex) => {
    if (isMobile) return; // Deshabilitar reordenamiento en móvil por ahora
    
    const enabledWidgets = getEnabledWidgets();
    if (fromIndex === toIndex) return;

    const updatedWidgets = { ...widgetsConfig };
    const movedWidgetId = enabledWidgets[fromIndex][0];
    
    enabledWidgets.forEach(([widgetId], index) => {
      if (index === fromIndex) return;
      
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
    if (isMobile) {
      // En móvil, todos los widgets ocupan todo el ancho
      return 12;
    }
    
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
      onResizeWidget: resizeWidget,
      size: config.size,
      index: index
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
      <DraggableWidget {...widgetProps}>
        {widgetComponents[widgetId]}
      </DraggableWidget>
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

  const optimizeForMobile = () => {
    const mobileOptimized = Object.keys(widgetsConfig).reduce((acc, widgetId) => {
      acc[widgetId] = {
        ...widgetsConfig[widgetId],
        size: defaultWidgets[widgetId].size
      };
      return acc;
    }, {});
    saveWidgetsConfig(mobileOptimized);
  };

  const optimizeForDesktop = () => {
    const desktopOptimized = Object.keys(widgetsConfig).reduce((acc, widgetId) => {
      acc[widgetId] = {
        ...widgetsConfig[widgetId],
        size: widgetId === 'communicationsCenter' ? 'large' : 
              ['quickActions', 'salesAnalytics', 'customerInsights'].includes(widgetId) ? 'medium' : 'small'
      };
      return acc;
    }, {});
    saveWidgetsConfig(desktopOptimized);
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 4, px: isMobile ? 1 : 3 }}>
      {/* Header Principal Adaptativo */}
      <Box sx={{ mb: 4, pt: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box sx={{ flex: 1, minWidth: isMobile ? '100%' : 'auto' }}>
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              fontWeight={700} 
              gutterBottom
              sx={{ fontSize: isMobile ? '1.75rem' : '2.5rem' }}
            >
              ¡Bienvenido, {user?.business?.name || user?.first_name || 'Usuario'}!
            </Typography>
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              color="text.secondary" 
              sx={{ mb: 2 }}
            >
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <Chip 
                icon={<TrendingUp />} 
                label={isMobile ? "$2,340" : "Ventas: $2,340"} 
                color="success" 
                variant="outlined" 
                size={isMobile ? "small" : "medium"}
              />
              <Chip 
                icon={<People />} 
                label={isMobile ? "12 nuevos" : "12 clientes"} 
                color="primary" 
                variant="outlined" 
                size={isMobile ? "small" : "medium"}
              />
              {!isMobile && (
                <Chip 
                  icon={<Chat />} 
                  label="45 mensajes" 
                  color="warning" 
                  variant="outlined" 
                />
              )}
            </Box>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            alignItems: 'center', 
            flexWrap: 'wrap',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-between' : 'flex-end'
          }}>
            {!isMobile && (
              <>
                <UBButton
                  variant="outlined"
                  startIcon={<Phone />}
                  onClick={optimizeForMobile}
                  size="small"
                >
                  Móvil
                </UBButton>
                <UBButton
                  variant="outlined"
                  startIcon={<Computer />}
                  onClick={optimizeForDesktop}
                  size="small"
                >
                  Escritorio
                </UBButton>
              </>
            )}
            <UBButton
              variant="outlined"
              startIcon={<Settings />}
              onClick={() => setSettingsOpen(true)}
              size={isMobile ? "small" : "medium"}
            >
              {isMobile ? "Config" : "Personalizar"}
            </UBButton>
            <UBButton
              variant="contained"
              startIcon={<DashboardIcon />}
              size={isMobile ? "small" : "medium"}
            >
              {isMobile ? "Vista" : "Completa"}
            </UBButton>
          </Box>
        </Box>

        {/* Instrucciones Adaptativas */}
        <Box sx={{ 
          mt: 2,
          p: isMobile ? 1 : 2,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 2,
          background: alpha(theme.palette.primary.main, 0.03),
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap'
        }}>
          <DragIndicator sx={{ 
            color: 'primary.main',
            fontSize: isMobile ? '1rem' : '1.25rem'
          }} />
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
          >
            <strong>Tip:</strong> {isMobile 
              ? "Toque largo en un widget para cambiar su tamaño" 
              : "Arrastra los widgets para reordenarlos. Haz clic en el ícono de tamaño para redimensionar."
            }
          </Typography>
        </Box>
      </Box>

      {/* Grid de Widgets Adaptativo */}
      <Grid container spacing={isMobile ? 1 : 3}>
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
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Settings />
            Personalizar Dashboard
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Configura los widgets y sus tamaños para optimizar tu experiencia
            {isMobile && " en móvil."}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Widgets Disponibles
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={optimizeForMobile}
                startIcon={<Phone />}
              >
                Móvil
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={optimizeForDesktop}
                startIcon={<Computer />}
              >
                Escritorio
              </Button>
            </Box>
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
                    
                    {/* Selector de tamaño en el diálogo */}
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
          <DashboardIcon sx={{ 
            fontSize: isMobile ? 48 : 64, 
            color: 'text.secondary', 
            mb: 2 
          }} />
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            gutterBottom 
            color="text.secondary"
          >
            No hay widgets activos
          </Typography>
          <UBButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => setSettingsOpen(true)}
            size={isMobile ? "small" : "medium"}
          >
            Personalizar Dashboard
          </UBButton>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
