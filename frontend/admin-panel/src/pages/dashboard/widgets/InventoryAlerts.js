import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  alpha,
  useTheme
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  CheckCircle,
  Inventory,
  LocalShipping
} from '@mui/icons-material';
import UBButton from '../../../components/ui/UBButton';

const InventoryAlerts = () => {
  const theme = useTheme();

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Stock Crítico',
      product: 'Producto Premium',
      currentStock: 3,
      minStock: 10,
      message: 'Solo quedan 3 unidades en inventario',
      time: 'Hace 2 horas',
      icon: <Error />
    },
    {
      id: 2,
      type: 'warning',
      title: 'Stock Bajo',
      product: 'Servicio Básico',
      currentStock: 15,
      minStock: 25,
      message: 'Stock por debajo del mínimo recomendado',
      time: 'Hace 1 día',
      icon: <Warning />
    },
    {
      id: 3,
      type: 'info',
      title: 'Pedido en Camino',
      product: 'Kit Inicial',
      currentStock: 45,
      minStock: 50,
      message: 'Nuevo pedido llegará en 2 días',
      time: 'Hace 3 días',
      icon: <LocalShipping />
    },
    {
      id: 4,
      type: 'success',
      title: 'Stock Óptimo',
      product: 'Consulta Especial',
      currentStock: 89,
      minStock: 20,
      message: 'Inventario en niveles óptimos',
      time: 'Actualizado hoy',
      icon: <CheckCircle />
    }
  ];

  const inventorySummary = {
    totalProducts: 45,
    lowStock: 3,
    outOfStock: 0,
    optimalStock: 42
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      case 'success': return 'success';
      default: return 'primary';
    }
  };

  const getAlertStyle = (type) => {
    const color = getAlertColor(type);
    return {
      border: `2px solid ${alpha(theme.palette[color].main, 0.3)}`,
      background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
      '&:hover': {
        borderColor: alpha(theme.palette[color].main, 0.6),
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.15)} 0%, ${alpha(theme.palette[color].main, 0.08)} 100%)`
      }
    };
  };

  const AlertCard = ({ alert }) => (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        mb: 2,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        ...getAlertStyle(alert.type)
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ 
          color: `${getAlertColor(alert.type)}.main`,
          mt: 0.5
        }}>
          {alert.icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {alert.title}
            </Typography>
            <Chip
              label={alert.type === 'critical' ? 'Crítico' : 
                     alert.type === 'warning' ? 'Advertencia' : 
                     alert.type === 'info' ? 'Información' : 'Óptimo'}
              size="small"
              color={getAlertColor(alert.type)}
              sx={{ height: 20, fontSize: '0.6rem' }}
            />
          </Box>
          
          <Typography variant="body2" fontWeight={500} gutterBottom>
            {alert.product}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {alert.message}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Stock: <strong>{alert.currentStock}</strong> / Mín: {alert.minStock}
              </Typography>
              {alert.type === 'critical' && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'error.main',
                    animation: 'pulse 1.5s infinite'
                  }}
                />
              )}
            </Box>
            <Typography variant="caption" color="text.secondary">
              {alert.time}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const SummaryCard = ({ title, value, subtitle, color = 'primary' }) => (
    <Box sx={{ 
      p: 2, 
      border: `2px solid ${alpha(theme.palette[color].main, 0.2)}`,
      borderRadius: 2,
      background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
      textAlign: 'center',
      flex: 1
    }}>
      <Typography variant="h4" fontWeight={700} color={`${color}.dark`}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        {title}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Alertas de Inventario
      </Typography>

      {/* Resumen de Inventario */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <SummaryCard
          title="Total Productos"
          value={inventorySummary.totalProducts}
          subtitle="En inventario"
          color="primary"
        />
        <SummaryCard
          title="Stock Bajo"
          value={inventorySummary.lowStock}
          subtitle="Necesitan atención"
          color="warning"
        />
        <SummaryCard
          title="Sin Stock"
          value={inventorySummary.outOfStock}
          subtitle="Agotados"
          color="error"
        />
        <SummaryCard
          title="Óptimo"
          value={inventorySummary.optimalStock}
          subtitle="En buen estado"
          color="success"
        />
      </Box>

      {/* Lista de Alertas */}
      <Box sx={{ mb: 3 }}>
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </Box>

      {/* Acciones Rápidas */}
      <Box sx={{ 
        p: 2, 
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        background: alpha(theme.palette.background.paper, 0.5),
        textAlign: 'center'
      }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          ¿Necesitas gestionar tu inventario?
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <UBButton
            variant="contained"
            size="small"
            startIcon={<Inventory />}
          >
            Gestionar Inventario
          </UBButton>
          <UBButton
            variant="outlined"
            size="small"
            startIcon={<LocalShipping />}
          >
            Realizar Pedido
          </UBButton>
        </Box>
      </Box>

      {/* Estilos para animación de pulso */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </Box>
  );
};

export default InventoryAlerts;
