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
  Zoom
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
  Preview
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
  const [widgetsConfig, setWidgetsConfig] = useState({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [organizeOpen, setOrganizeOpen] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState(null);

  // Configuración inicial de widgets
  const defaultWidgets = {
    communicationsCenter: { enabled: true, size: 'large', position: 1, title: '📊 Centro de Comunicaciones' },
    financialOverview: { enabled: true, size: 'medium', position: 2, title: '💰 Resumen Financiero' },
    quickActions: { enabled: true, size: 'medium', position: 3, title: '⚡ Acciones Rápidas' },
    performanceMetrics: { enabled: true, size: 'small', position: 4, title: '📈 Métricas de Rendimiento' },
    salesAnalytics: { enabled: true, size: 'medium', position: 5, title: '🛒 Análisis de Ventas' },
    customerInsights: { enabled: true, size: 'medium', position: 6, title: '👥 Información de Clientes' },
    inventoryAlerts: { enabled: true, size: 'small', position: 7, title: '📦 Alertas de Inventario' },
    recentActivity: { enabled: true, size: 'small', position: 8, title: '🔄 Actividad Reciente' }
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

  // Funciones para reorganizar widgets
  const moveWidget = (fromIndex, toIndex) => {
    const enabledWidgets = getEnabledWidgets();
    if (fromIndex === toIndex) return;

    const newConfig = { ...widgetsConfig };
    const movedWidget = enabledWidgets[fromIndex];
    
    enabledWidgets.forEach(([widgetId], index) => {
      if (index === fromIndex) {
        newConfig[widgetId].position = toIndex + 1;
      } else if (index >= toIndex && index < fromIndex) {
        newConfig[widgetId].position = index + 2;
      } else if (index <= toIndex && index > fromIndex) {
        newConfig[widgetId].position = index;
      } else {
        newConfig[widgetId].position = index + 1;
      }
    });

    saveWidgetsConfig(newConfig);
  };

  const handleDragStart = (e, widgetId) => {
    setDraggedWidget(widgetId);
    e.dataTransfer.setData('text/plain', widgetId);
  };

  const handleDragOver = (e, targetIndex) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (!draggedWidget) return;

    const enabledWidgets = getEnabledWidgets();
    const fromIndex = enabledWidgets.findIndex(([widgetId]) => widgetId === draggedWidget);
    
    if (fromIndex !== -1 && fromIndex !== targetIndex) {
      moveWidget(fromIndex, targetIndex);
    }
    
    setDraggedWidget(null);
  };

  // Componente de Vista Previa Miniatura
  const DashboardPreview = () => (
    <Box sx={{ 
      p: 2, 
      border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      borderRadius: 2,
      background: alpha(theme.palette.background.paper, 0.5),
      transform: 'scale(0.7)',
      transformOrigin: 'top center',
      maxHeight: 400,
      overflow: 'hidden'
    }}>
      <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        Vista Previa del Dashboard
      </Typography>
      
      <Grid container spacing={1}>
        {getEnabledWidgets().map(([widgetId, config]) => (
          <Grid item xs={getGridSize(config.size)} key={widgetId}>
            <Paper
              sx={{
                height: config.size === 'large' ? 80 : config.size === 'medium' ? 60 : 40,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1
              }}
            >
              <Typography 
                variant="caption" 
                fontWeight={500} 
                color="primary.main"
                sx={{ 
                  textAlign: 'center',
                  lineHeight: 1.2,
                  fontSize: config.size === 'large' ? '0.7rem' : '0.6rem'
                }}
              >
                {config.title.split(' ')[0]}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {getEnabledWidgets().length === 0 && (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Sin widgets activos
          </Typography>
        </Box>
      )}
    </Box>
  );

  const WidgetContainer = ({ children, widgetId, title, onToggle }) => (
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
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
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

  const WidgetPreview = ({ widgetId, config, index, onDragStart, onDragOver, onDrop }) => (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, widgetId)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
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
              width: 40,
              height: 40,
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
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {config.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Posición: {index + 1} • Tamaño: {config.size === 'large' ? 'Grande' : config.size === 'medium' ? 'Mediano' : 'Pequeño'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Chip 
              label={index + 1} 
              size="small" 
              color="primary" 
              variant="outlined"
              sx={{ minWidth: 30 }}
            />
            <Reorder sx={{ color: 'text.secondary', fontSize: 20 }} />
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
      {/* Header Principal */}
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

      {/* Diálogo de Organización con Vista Previa */}
      <Dialog 
        open={organizeOpen} 
        onClose={() => setOrganizeOpen(false)} 
        maxWidth="lg" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Preview />
            Organizar Dashboard - Vista Previa
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {/* Panel de Vista Previa */}
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'sticky', top: 0 }}>
                <DashboardPreview />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                  📱 Vista previa en tiempo real
                </Typography>
              </Box>
            </Grid>

            {/* Panel de Organización */}
            <Grid item xs={12} md={7}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Lista de Widgets Activos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Arrastra y suelta para reorganizar el orden
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {getEnabledWidgets().map(([widgetId, config], index) => (
                  <WidgetPreview
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

              {getEnabledWidgets().length === 0 && (
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4,
                  border: `2px dashed ${theme.palette.divider}`,
                  borderRadius: 2
                }}>
                  <ViewModule sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    No hay widgets activos
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Activa algunos widgets primero para poder organizarlos
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
            Aplicar Cambios
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
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {config.title}
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
