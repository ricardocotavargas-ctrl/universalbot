// frontend/admin-panel/src/pages/dashboard/Dashboard.js
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
  Dashboard as DashboardIcon
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

      {/* Contenido del Widget */}
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    </Paper>
  );

  const renderWidget = (widgetId, config) => {
    const widgetProps = {
      key: widgetId,
      widgetId,
      title: getWidgetTitle(widgetId),
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
                      : 'transparent'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
    </Container>
  );
};

export default Dashboard;
