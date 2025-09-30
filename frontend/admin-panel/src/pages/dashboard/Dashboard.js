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
  useMediaQuery,
  Fab,
  Menu,
  MenuItem,
  ListItemIcon,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Settings,
  DragIndicator,
  Add,
  Visibility,
  VisibilityOff,
  Dashboard as DashboardIcon,
  Reorder,
  AspectRatio,
  Phone,
  Computer,
  ViewModule,
  GridView,
  ViewCompact,
  Save,
  Restore,
  Delete,
  Expand,
  Compress,
  Star,
  StarBorder,
  Palette,
  Widgets,
  AutoFixHigh
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

// Sistema de Grid Personalizable
const CustomGridWidget = ({ 
  widgetId, 
  title, 
  children, 
  onToggle, 
  onResize, 
  onMove,
  onRemove,
  onFavorite,
  size = 'medium',
  position = { x: 0, y: 0 },
  isFavorite = false,
  isEditing = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const widgetRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  const sizeConfig = {
    small: { grid: 4, minHeight: 200 },
    medium: { grid: 6, minHeight: 300 },
    large: { grid: 12, minHeight: 400 },
    custom: { grid: 8, minHeight: 350 }
  };

  const handleMouseDown = (e) => {
    if (!isEditing) return;
    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...position };

    const handleMouseMove = (moveEvent) => {
      if (!isDragging) return;
      
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      onMove(widgetId, {
        x: Math.max(0, startPos.x + deltaX),
        y: Math.max(0, startPos.y + deltaY)
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e) => {
    if (!isEditing) return;
    setShowControls(true);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu(
      contextMenu === null
        ? { mouseX: e.clientX - 2, mouseY: e.clientY - 4 }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleResize = (newSize) => {
    onResize(widgetId, newSize);
    handleCloseContextMenu();
  };

  const getSizeIcon = (size) => {
    const icons = {
      small: <Compress sx={{ fontSize: 16 }} />,
      medium: <ViewCompact sx={{ fontSize: 16 }} />,
      large: <Expand sx={{ fontSize: 16 }} />,
      custom: <AspectRatio sx={{ fontSize: 16 }} />
    };
    return icons[size] || icons.medium;
  };

  const getSizeLabel = (size) => {
    const labels = {
      small: 'Pequeño',
      medium: 'Mediano', 
      large: 'Grande',
      custom: 'Personalizado'
    };
    return labels[size] || labels.medium;
  };

  return (
    <Paper
      ref={widgetRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isEditing && setShowControls(false)}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      sx={{
        height: '100%',
        minHeight: sizeConfig[size].minHeight,
        position: 'relative',
        border: `3px solid ${
          isEditing 
            ? alpha(theme.palette.primary.main, 0.4)
            : alpha(theme.palette.primary.main, 0.1)
        }`,
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: isEditing ? (isDragging ? 'grabbing' : 'grab') : 'default',
        transform: isDragging ? 'scale(1.02) rotate(1deg)' : 'scale(1)',
        boxShadow: isEditing ? theme.shadows[8] : theme.shadows[2],
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.background.paper, 0.9)} 0%,
          ${alpha(theme.palette.background.paper, 0.7)} 100%
        )`,
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.6),
          boxShadow: theme.shadows[12],
          transform: isEditing ? 'scale(1.02)' : 'scale(1.01)'
        }
      }}
    >
      {/* Header del Widget con Controles */}
      <Box
        onMouseDown={handleMouseDown}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: isMobile ? 1.5 : 2,
          borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.main, 0.05)} 0%,
            ${alpha(theme.palette.primary.main, 0.02)} 100%
          )`,
          cursor: isEditing ? 'grab' : 'default',
          userSelect: 'none'
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
            fontWeight={700}
            sx={{
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {title}
          </Typography>
          
          {isFavorite && (
            <Star sx={{ fontSize: 16, color: 'gold' }} />
          )}
        </Box>

        {/* Controles del Widget */}
        {(showControls || isEditing) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {/* Botón Favorito */}
            <Tooltip title={isFavorite ? "Quitar de favoritos" : "Marcar como favorito"}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite(widgetId, !isFavorite);
                }}
                sx={{
                  color: isFavorite ? 'gold' : 'text.secondary',
                  background: alpha(isFavorite ? 'gold' : theme.palette.primary.main, 0.1)
                }}
              >
                {isFavorite ? <Star /> : <StarBorder />}
              </IconButton>
            </Tooltip>

            {/* Selector de Tamaño */}
            <Tooltip title={`Cambiar tamaño (${getSizeLabel(size)})`}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowControls(true);
                }}
                sx={{
                  color: 'primary.main',
                  background: alpha(theme.palette.primary.main, 0.1)
                }}
              >
                <AspectRatio />
              </IconButton>
            </Tooltip>

            {/* Botón Ocultar/Mostrar */}
            <Tooltip title="Ocultar widget">
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
                <VisibilityOff />
              </IconButton>
            </Tooltip>

            {isEditing && (
              <Tooltip title="Eliminar widget">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(widgetId);
                  }}
                  sx={{
                    color: 'error.main',
                    background: alpha(theme.palette.error.main, 0.1)
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </Box>

      {/* Contenido del Widget */}
      <Box sx={{ 
        p: isMobile ? 1.5 : 3,
        height: `calc(100% - ${isMobile ? 60 : 80}px)`,
        overflow: 'auto'
      }}>
        {children}
      </Box>

      {/* Indicadores de Estado */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 8, 
        right: 8,
        display: 'flex',
        gap: 1
      }}>
        {/* Indicador de Tamaño */}
        <Chip
          icon={getSizeIcon(size)}
          label={getSizeLabel(size)}
          size="small"
          variant="filled"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.6rem'
          }}
        />
        
        {/* Indicador de Favorito */}
        {isFavorite && (
          <Star sx={{ fontSize: 16, color: 'gold' }} />
        )}
      </Box>

      {/* Menú Contextual */}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={() => handleResize('small')}>
          <ListItemIcon><Compress fontSize="small" /></ListItemIcon>
          Tamaño Pequeño
        </MenuItem>
        <MenuItem onClick={() => handleResize('medium')}>
          <ListItemIcon><ViewCompact fontSize="small" /></ListItemIcon>
          Tamaño Mediano
        </MenuItem>
        <MenuItem onClick={() => handleResize('large')}>
          <ListItemIcon><Expand fontSize="small" /></ListItemIcon>
          Tamaño Grande
        </MenuItem>
        <MenuItem onClick={() => onFavorite(widgetId, !isFavorite)}>
          <ListItemIcon>
            {isFavorite ? <Star fontSize="small" /> : <StarBorder fontSize="small" />}
          </ListItemIcon>
          {isFavorite ? 'Quitar Favorito' : 'Marcar Favorito'}
        </MenuItem>
        <MenuItem onClick={() => onToggle(widgetId)}>
          <ListItemIcon><VisibilityOff fontSize="small" /></ListItemIcon>
          Ocultar Widget
        </MenuItem>
      </Menu>

      {/* Menú de Tamaños Flotante */}
      {showControls && isEditing && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            background: theme.palette.background.paper,
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: 2,
            boxShadow: theme.shadows[8],
            p: 1,
            zIndex: 1000
          }}
        >
          <Typography variant="caption" fontWeight={600} sx={{ mb: 1, display: 'block' }}>
            Tamaño:
          </Typography>
          {['small', 'medium', 'large', 'custom'].map((sizeOption) => (
            <Tooltip key={sizeOption} title={getSizeLabel(sizeOption)}>
              <IconButton
                size="small"
                onClick={() => handleResize(sizeOption)}
                sx={{
                  background: size === sizeOption ? 
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)` : 
                    'transparent',
                  color: size === sizeOption ? 'white' : 'text.primary',
                  mb: 0.5,
                  '&:hover': {
                    background: size === sizeOption ? 
                      `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)` : 
                      alpha(theme.palette.primary.main, 0.1)
                  }
                }}
              >
                {getSizeIcon(sizeOption)}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      )}
    </Paper>
  );
};

// Componente principal del Dashboard Premium
const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [widgetsConfig, setWidgetsConfig] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'free', 'compact'
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [layoutPresets, setLayoutPresets] = useState({});

  // Configuración premium de widgets
  const defaultWidgets = {
    communicationsCenter: { 
      enabled: true, 
      size: 'large', 
      position: { x: 0, y: 0 },
      isFavorite: true 
    },
    financialOverview: { 
      enabled: true, 
      size: 'medium', 
      position: { x: 6, y: 0 },
      isFavorite: false 
    },
    quickActions: { 
      enabled: true, 
      size: 'medium', 
      position: { x: 0, y: 1 },
      isFavorite: true 
    },
    performanceMetrics: { 
      enabled: true, 
      size: 'small', 
      position: { x: 6, y: 1 },
      isFavorite: false 
    },
    salesAnalytics: { 
      enabled: true, 
      size: 'medium', 
      position: { x: 0, y: 2 },
      isFavorite: false 
    },
    customerInsights: { 
      enabled: true, 
      size: 'medium', 
      position: { x: 6, y: 2 },
      isFavorite: true 
    },
    inventoryAlerts: { 
      enabled: true, 
      size: 'small', 
      position: { x: 0, y: 3 },
      isFavorite: false 
    },
    recentActivity: { 
      enabled: true, 
      size: 'small', 
      position: { x: 3, y: 3 },
      isFavorite: false 
    }
  };

  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardWidgetsPremium');
    const savedPresets = localStorage.getItem('dashboardPresets');
    
    if (savedConfig) {
      setWidgetsConfig(JSON.parse(savedConfig));
    } else {
      setWidgetsConfig(defaultWidgets);
    }

    if (savedPresets) {
      setLayoutPresets(JSON.parse(savedPresets));
    }
  }, []);

  const saveWidgetsConfig = (newConfig) => {
    setWidgetsConfig(newConfig);
    localStorage.setItem('dashboardWidgetsPremium', JSON.stringify(newConfig));
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

  const moveWidget = (widgetId, newPosition) => {
    const newConfig = {
      ...widgetsConfig,
      [widgetId]: {
        ...widgetsConfig[widgetId],
        position: newPosition
      }
    };
    saveWidgetsConfig(newConfig);
  };

  const removeWidget = (widgetId) => {
    const newConfig = {
      ...widgetsConfig,
      [widgetId]: {
        ...widgetsConfig[widgetId],
        enabled: false
      }
    };
    saveWidgetsConfig(newConfig);
    showSnackbar('Widget removido', 'warning');
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
        // Ordenar por favoritos primero, luego por posición
        if (a[1].isFavorite && !b[1].isFavorite) return -1;
        if (!a[1].isFavorite && b[1].isFavorite) return 1;
        return a[1].position.y - b[1].position.y || a[1].position.x - b[1].position.x;
      });
  };

  const getGridSize = (size) => {
    const sizes = {
      small: 4,
      medium: 6,
      large: 12,
      custom: 8
    };
    return sizes[size] || 6;
  };

  const renderWidget = (widgetId, config) => {
    const widgetProps = {
      key: widgetId,
      widgetId,
      title: getWidgetTitle(widgetId),
      onToggle: toggleWidget,
      onResize: resizeWidget,
      onMove: moveWidget,
      onRemove: removeWidget,
      onFavorite: toggleFavorite,
      size: config.size,
      position: config.position,
      isFavorite: config.isFavorite,
      isEditing: isEditing
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
      <CustomGridWidget {...widgetProps}>
        {widgetComponents[widgetId]}
      </CustomGridWidget>
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
    showSnackbar('Layout restablecido', 'info');
  };

  const saveCurrentLayout = (presetName = 'Mi Layout') => {
    const newPresets = {
      ...layoutPresets,
      [presetName]: widgetsConfig
    };
    setLayoutPresets(newPresets);
    localStorage.setItem('dashboardPresets', JSON.stringify(newPresets));
    showSnackbar(`Layout "${presetName}" guardado`, 'success');
  };

  const loadLayout = (presetName) => {
    if (layoutPresets[presetName]) {
      saveWidgetsConfig(layoutPresets[presetName]);
      showSnackbar(`Layout "${presetName}" cargado`, 'success');
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    showSnackbar(
      isEditing ? 'Modo visualización activado' : 'Modo edición activado - Arrastra y redimensiona',
      'info'
    );
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 4, px: isMobile ? 1 : 3, position: 'relative' }}>
      {/* Header Premium */}
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
              sx={{ 
                fontSize: isMobile ? '1.75rem' : '2.5rem',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              ¡Bienvenido, {user?.business?.name || user?.first_name || 'Usuario'}!
            </Typography>
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              color="text.secondary" 
              sx={{ mb: 2 }}
            >
              Tu dashboard personalizado - Organiza todo como prefieras
            </Typography>
          </Box>
          
          {/* Controles Premium */}
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            alignItems: 'center', 
            flexWrap: 'wrap',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-between' : 'flex-end'
          }}>
            {/* Modo Edición */}
            <UBButton
              variant={isEditing ? "contained" : "outlined"}
              startIcon={<AutoFixHigh />}
              onClick={toggleEditMode}
              color={isEditing ? "secondary" : "primary"}
            >
              {isEditing ? 'Guardar' : 'Editar'}
            </UBButton>

            {/* Vistas */}
            <UBButton
              variant="outlined"
              startIcon={<GridView />}
              onClick={() => setViewMode(viewMode === 'grid' ? 'free' : 'grid')}
            >
              {viewMode === 'grid' ? 'Libre' : 'Grid'}
            </UBButton>

            <UBButton
              variant="outlined"
              startIcon={<Settings />}
              onClick={() => setSettingsOpen(true)}
            >
              Config
            </UBButton>
          </Box>
        </Box>

        {/* Indicador de Estado */}
        {isEditing && (
          <Box sx={{ 
            mt: 2,
            p: 2,
            border: `2px solid ${theme.palette.warning.main}`,
            borderRadius: 2,
            background: alpha(theme.palette.warning.main, 0.05),
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap'
          }}>
            <AutoFixHigh sx={{ color: 'warning.main' }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={600} color="warning.main">
                Modo Edición Activo
              </Typography>
              <Typography variant="caption" color="text.secondary">
                • Arrastra los widgets para moverlos • Usa el menú contextual para más opciones
                • Cambia tamaños con los controles • Marca tus favoritos con la estrella
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Grid de Widgets Premium */}
      <Grid container spacing={3}>
        {getEnabledWidgets().map(([widgetId, config]) => (
          <Grid item xs={12} md={getGridSize(config.size)} key={widgetId}>
            {renderWidget(widgetId, config)}
          </Grid>
        ))}
      </Grid>

      {/* Botón Flotante para Acciones Rápidas */}
      {isEditing && (
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
          <Widgets />
        </Fab>
      )}

      {/* Diálogo de Configuración Premium */}
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
            Centro de Personalización
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* Presets Guardados */}
          {Object.keys(layoutPresets).length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Tus Layouts Guardados
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {Object.keys(layoutPresets).map((presetName) => (
                  <Chip
                    key={presetName}
                    label={presetName}
                    onClick={() => loadLayout(presetName)}
                    onDelete={() => {
                      const newPresets = { ...layoutPresets };
                      delete newPresets[presetName];
                      setLayoutPresets(newPresets);
                      localStorage.setItem('dashboardPresets', JSON.stringify(newPresets));
                    }}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}

          <Typography variant="h6" gutterBottom>
            Widgets Disponibles
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Personaliza completamente tu experiencia. Activa/desactiva widgets y ajusta su configuración.
          </Typography>

          <Grid container spacing={2}>
            {Object.entries(widgetsConfig).map(([widgetId, config]) => (
              <Grid item xs={12} md={6} lg={4} key={widgetId}>
                <Card 
                  variant="outlined"
                  sx={{
                    border: `3px solid ${
                      config.enabled 
                        ? config.isFavorite
                          ? alpha(theme.palette.warning.main, 0.5)
                          : alpha(theme.palette.primary.main, 0.3)
                        : theme.palette.divider
                    }`,
                    background: config.enabled 
                      ? config.isFavorite
                        ? alpha(theme.palette.warning.main, 0.05)
                        : alpha(theme.palette.primary.main, 0.05)
                      : 'transparent',
                    position: 'relative',
                    overflow: 'visible'
                  }}
                >
                  {config.isFavorite && (
                    <Star 
                      sx={{ 
                        position: 'absolute', 
                        top: -8, 
                        right: -8, 
                        color: 'gold',
                        fontSize: 24,
                        background: theme.palette.background.paper,
                        borderRadius: '50%'
                      }} 
                    />
                  )}
                  
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {getWidgetTitle(widgetId)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tamaño: {config.size} • {config.enabled ? 'Activado' : 'Desactivado'}
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
                    
                    {/* Controles Avanzados */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {['small', 'medium', 'large', 'custom'].map((sizeOption) => (
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
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Button onClick={resetLayout} startIcon={<Restore />}>
              Resetear
            </Button>
            <Button onClick={() => saveCurrentLayout()} startIcon={<Save />}>
              Guardar Layout
            </Button>
          </Box>
          <Button 
            variant="contained" 
            onClick={() => setSettingsOpen(false)}
            startIcon={<DashboardIcon />}
          >
            Aplicar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para Notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Mensaje para Dashboard Vacío */}
      {getEnabledWidgets().length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          border: `3px dashed ${theme.palette.primary.main}`,
          borderRadius: 3,
          mx: isMobile ? 1 : 0,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`
        }}>
          <Widgets sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="primary.main">
            Tu Canvas Vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Comienza agregando widgets para crear tu dashboard perfecto
          </Typography>
          <UBButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => setSettingsOpen(true)}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
            }}
          >
            Personalizar Dashboard
          </UBButton>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
