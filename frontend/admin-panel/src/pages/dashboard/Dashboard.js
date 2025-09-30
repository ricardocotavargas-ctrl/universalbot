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
  Tabs,
  Tab,
  Badge
} from '@mui/material';
import {
  Settings,
  Dashboard as DashboardIcon,
  AutoFixHigh,
  ViewCompact,
  ViewCozy,
  ViewComfy,
  Widgets,
  DragIndicator
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

// Layouts predefinidos profesionales
const LAYOUT_PRESETS = {
  executive: {
    name: 'Vista Ejecutiva',
    description: 'Enfoque en métricas clave y rendimiento',
    widgets: {
      communicationsCenter: { enabled: true, size: 'large' },
      financialOverview: { enabled: true, size: 'medium' },
      performanceMetrics: { enabled: true, size: 'medium' },
      salesAnalytics: { enabled: true, size: 'medium' },
      customerInsights: { enabled: true, size: 'medium' },
      quickActions: { enabled: false, size: 'small' },
      inventoryAlerts: { enabled: false, size: 'small' },
      recentActivity: { enabled: true, size: 'small' }
    }
  },
  operational: {
    name: 'Vista Operativa', 
    description: 'Gestión diaria y acciones rápidas',
    widgets: {
      quickActions: { enabled: true, size: 'large' },
      inventoryAlerts: { enabled: true, size: 'medium' },
      communicationsCenter: { enabled: true, size: 'medium' },
      recentActivity: { enabled: true, size: 'medium' },
      financialOverview: { enabled: true, size: 'small' },
      performanceMetrics: { enabled: false, size: 'small' },
      salesAnalytics: { enabled: false, size: 'small' },
      customerInsights: { enabled: true, size: 'small' }
    }
  },
  comprehensive: {
    name: 'Vista Completa',
    description: 'Todas las métricas y herramientas',
    widgets: {
      communicationsCenter: { enabled: true, size: 'large' },
      financialOverview: { enabled: true, size: 'medium' },
      quickActions: { enabled: true, size: 'medium' },
      performanceMetrics: { enabled: true, size: 'medium' },
      salesAnalytics: { enabled: true, size: 'medium' },
      customerInsights: { enabled: true, size: 'medium' },
      inventoryAlerts: { enabled: true, size: 'small' },
      recentActivity: { enabled: true, size: 'small' }
    }
  }
};

// Componente de Widget Profesional
const ProfessionalWidget = ({ 
  widgetId, 
  title, 
  children, 
  size = 'medium',
  layout = 'grid'
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getSizeConfig = () => {
    const configs = {
      small: { grid: 4, minHeight: 280 },
      medium: { grid: 6, minHeight: 350 },
      large: { grid: 12, minHeight: 420 }
    };
    return configs[size] || configs.medium;
  };

  const sizeConfig = getSizeConfig();

  return (
    <Paper
      sx={{
        height: '100%',
        minHeight: sizeConfig.minHeight,
        position: 'relative',
        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
        borderRadius: 2,
        overflow: 'hidden',
        background: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          borderColor: alpha(theme.palette.primary.main, 0.3)
        }
      }}
    >
      {/* Header Limpio y Profesional */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.main, 0.02)} 0%,
            ${alpha(theme.palette.primary.main, 0.01)} 100%
          )`
        }}
      >
        <Typography 
          variant="h6" 
          fontWeight={600}
          color="primary.main"
        >
          {title}
        </Typography>
        
        {/* Badge de Tamaño Sutil */}
        <Chip
          label={size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L'}
          size="small"
          variant="outlined"
          sx={{
            borderColor: alpha(theme.palette.primary.main, 0.3),
            color: theme.palette.primary.main,
            fontWeight: 500
          }}
        />
      </Box>

      {/* Contenido del Widget */}
      <Box sx={{ 
        p: 2,
        height: `calc(100% - 73px)`,
        overflow: 'auto'
      }}>
        {children}
      </Box>
    </Paper>
  );
};

// Componente principal del Dashboard Profesional
const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [widgetsConfig, setWidgetsConfig] = useState({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('executive');
  const [customizationMode, setCustomizationMode] = useState(false);

  // Configuración inicial con layout ejecutivo
  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardProfessionalConfig');
    if (savedConfig) {
      setWidgetsConfig(JSON.parse(savedConfig));
    } else {
      // Layout ejecutivo por defecto
      setWidgetsConfig(LAYOUT_PRESETS.executive.widgets);
    }
  }, []);

  const saveWidgetsConfig = (newConfig) => {
    setWidgetsConfig(newConfig);
    localStorage.setItem('dashboardProfessionalConfig', JSON.stringify(newConfig));
  };

  const applyLayout = (layoutKey) => {
    setWidgetsConfig(LAYOUT_PRESETS[layoutKey].widgets);
    setCurrentLayout(layoutKey);
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
      .filter(([_, config]) => config.enabled)
      .sort((a, b) => {
        // Ordenar por tamaño: large primero, luego medium, luego small
        const sizeOrder = { large: 1, medium: 2, small: 3 };
        return sizeOrder[a[1].size] - sizeOrder[b[1].size];
      });
  };

  const getGridSize = (size) => {
    if (isMobile) return 12;
    
    switch (size) {
      case 'small': return 4;
      case 'medium': return 6;
      case 'large': return 12;
      default: return 6;
    }
  };

  const renderWidget = (widgetId, config) => {
    const widgetProps = {
      key: widgetId,
      widgetId,
      title: getWidgetTitle(widgetId),
      size: config.size
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
      <ProfessionalWidget {...widgetProps}>
        {widgetComponents[widgetId]}
      </ProfessionalWidget>
    );
  };

  const getWidgetTitle = (widgetId) => {
    const titles = {
      communicationsCenter: 'Centro de Comunicaciones',
      financialOverview: 'Resumen Financiero',
      quickActions: 'Acciones Rápidas',
      performanceMetrics: 'Métricas de Rendimiento',
      salesAnalytics: 'Análisis de Ventas',
      customerInsights: 'Información de Clientes',
      inventoryAlerts: 'Alertas de Inventario',
      recentActivity: 'Actividad Reciente'
    };
    return titles[widgetId];
  };

  const getWidgetsBySize = () => {
    const enabled = getEnabledWidgets();
    return {
      large: enabled.filter(([_, config]) => config.size === 'large'),
      medium: enabled.filter(([_, config]) => config.size === 'medium'),
      small: enabled.filter(([_, config]) => config.size === 'small')
    };
  };

  const widgetsBySize = getWidgetsBySize();

  return (
    <Container maxWidth="xl" sx={{ pb: 6, px: isMobile ? 2 : 3 }}>
      {/* Header Profesional */}
      <Box sx={{ mb: 4, pt: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 3,
          mb: 3
        }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
              Panel de Control
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Bienvenido, {user?.business?.name || user?.first_name || 'Usuario'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                label={LAYOUT_PRESETS[currentLayout].name}
                color="primary"
                variant="outlined"
              />
              <Chip 
                label={`${getEnabledWidgets().length} widgets activos`}
                variant="outlined"
              />
              <Chip 
                label={new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                variant="outlined"
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {/* Selector de Layouts */}
            <Tabs 
              value={currentLayout}
              onChange={(_, newValue) => applyLayout(newValue)}
              sx={{ minHeight: 40 }}
            >
              <Tab 
                label="Ejecutivo" 
                value="executive"
                sx={{ minHeight: 40, fontSize: '0.8rem' }}
              />
              <Tab 
                label="Operativo" 
                value="operational"
                sx={{ minHeight: 40, fontSize: '0.8rem' }}
              />
              <Tab 
                label="Completo" 
                value="comprehensive" 
                sx={{ minHeight: 40, fontSize: '0.8rem' }}
              />
            </Tabs>

            <UBButton
              variant="outlined"
              startIcon={<Settings />}
              onClick={() => setSettingsOpen(true)}
              sx={{ ml: 1 }}
            >
              Personalizar
            </UBButton>
          </Box>
        </Box>

        {/* Descripción del Layout Actual */}
        <Box sx={{ 
          p: 2,
          background: alpha(theme.palette.primary.main, 0.02),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            <strong>{LAYOUT_PRESETS[currentLayout].name}:</strong> {LAYOUT_PRESETS[currentLayout].description}
          </Typography>
        </Box>
      </Box>

      {/* Grid de Widgets Organizado y Simétrico */}
      <Box sx={{ mb: 4 }}>
        {/* Widgets Large (Ocupan toda la fila) */}
        {widgetsBySize.large.length > 0 && (
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {widgetsBySize.large.map(([widgetId, config]) => (
              <Grid item xs={12} key={widgetId}>
                {renderWidget(widgetId, config)}
              </Grid>
            ))}
          </Grid>
        )}

        {/* Widgets Medium (2 por fila) */}
        {widgetsBySize.medium.length > 0 && (
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {widgetsBySize.medium.map(([widgetId, config]) => (
              <Grid item xs={12} md={6} key={widgetId}>
                {renderWidget(widgetId, config)}
              </Grid>
            ))}
          </Grid>
        )}

        {/* Widgets Small (3 por fila en desktop) */}
        {widgetsBySize.small.length > 0 && (
          <Grid container spacing={3}>
            {widgetsBySize.small.map(([widgetId, config]) => (
              <Grid item xs={12} md={4} key={widgetId}>
                {renderWidget(widgetId, config)}
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Diálogo de Personalización Profesional */}
      <Dialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
        maxWidth="lg" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Widgets />
            <Box>
              <Typography variant="h6">Personalizar Dashboard</Typography>
              <Typography variant="body2" color="text.secondary">
                Configura los widgets y su disposición
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {/* Layouts Predefinidos */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Vistas Predefinidas
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(LAYOUT_PRESETS).map(([key, layout]) => (
                <Grid item xs={12} md={4} key={key}>
                  <Card 
                    variant="outlined"
                    sx={{
                      border: `2px solid ${
                        currentLayout === key 
                          ? theme.palette.primary.main 
                          : theme.palette.divider
                      }`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: 2
                      }
                    }}
                    onClick={() => applyLayout(key)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 2 }}>
                      {key === 'executive' && <ViewCompact sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />}
                      {key === 'operational' && <ViewCozy sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />}
                      {key === 'comprehensive' && <ViewComfy sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />}
                      
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        {layout.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {layout.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Personalización Avanzada */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Personalización Avanzada
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Activa o desactiva widgets individualmente
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
                      opacity: config.enabled ? 1 : 0.7
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {getWidgetTitle(widgetId)}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip 
                              label={`Tamaño: ${config.size}`}
                              size="small"
                              variant="outlined"
                            />
                            <Chip 
                              label={config.enabled ? 'Activado' : 'Desactivado'}
                              size="small"
                              color={config.enabled ? 'success' : 'default'}
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
                      
                      {/* Selector de Tamaño */}
                      {config.enabled && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {['small', 'medium', 'large'].map((sizeOption) => (
                            <Button
                              key={sizeOption}
                              variant={config.size === sizeOption ? "contained" : "outlined"}
                              size="small"
                              onClick={() => resizeWidget(widgetId, sizeOption)}
                              sx={{ 
                                minWidth: 60,
                                fontSize: '0.75rem'
                              }}
                            >
                              {sizeOption === 'small' ? 'Pequeño' : 
                               sizeOption === 'medium' ? 'Mediano' : 'Grande'}
                            </Button>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
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

      {/* Estado Vacío */}
      {getEnabledWidgets().length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          border: `2px dashed ${theme.palette.divider}`,
          borderRadius: 3,
          background: alpha(theme.palette.background.paper, 0.5)
        }}>
          <DashboardIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            Dashboard Vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Selecciona una vista predefinida o personaliza tu dashboard
          </Typography>
          <UBButton
            variant="contained"
            onClick={() => setSettingsOpen(true)}
          >
            Configurar Dashboard
          </UBButton>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
