import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Avatar,
  alpha,
  useTheme
} from '@mui/material';
import {
  Notifications,
  Chat,
  ShoppingCart,
  Person,
  Campaign,
  Inventory,
  Receipt,
  TrendingUp
} from '@mui/icons-material';

const RecentActivity = () => {
  const theme = useTheme();

  const activities = [
    {
      id: 1,
      type: 'sale',
      user: 'María González',
      action: 'realizó una compra',
      details: 'Producto Premium - $120',
      time: 'Hace 5 minutos',
      icon: <ShoppingCart />,
      color: 'success'
    },
    {
      id: 2,
      type: 'message',
      user: 'Carlos Rodríguez',
      action: 'envió un mensaje',
      details: 'Consulta sobre servicios',
      time: 'Hace 15 minutos',
      icon: <Chat />,
      color: 'primary'
    },
    {
      id: 3,
      type: 'campaign',
      user: 'Sistema',
      action: 'campaña enviada',
      details: 'Oferta de Verano 2024',
      time: 'Hace 1 hora',
      icon: <Campaign />,
      color: 'secondary'
    },
    {
      id: 4,
      type: 'inventory',
      user: 'Ana Martínez',
      action: 'actualizó inventario',
      details: '+50 unidades Kit Inicial',
      time: 'Hace 2 horas',
      icon: <Inventory />,
      color: 'warning'
    },
    {
      id: 5,
      type: 'invoice',
      user: 'Sistema',
      action: 'factura generada',
      details: 'Factura #INV-2024-0012',
      time: 'Hace 3 horas',
      icon: <Receipt />,
      color: 'info'
    },
    {
      id: 6,
      type: 'user',
      user: 'David López',
      action: 'se registró',
      details: 'Nuevo cliente',
      time: 'Hace 5 horas',
      icon: <Person />,
      color: 'success'
    }
  ];

  const stats = {
    today: 24,
    yesterday: 18,
    trend: '+33%'
  };

  const getActivityIcon = (activity) => {
    return React.cloneElement(activity.icon, {
      sx: { color: `${activity.color}.main`, fontSize: 20 }
    });
  };

  const ActivityItem = ({ activity }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        mb: 2,
        background: alpha(theme.palette.background.paper, 0.5),
        transition: 'all 0.3s ease',
        '&:hover': {
          background: alpha(theme.palette.primary.main, 0.02),
          borderColor: alpha(theme.palette.primary.main, 0.3),
          transform: 'translateX(4px)'
        }
      }}
    >
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: alpha(theme.palette[activity.color].main, 0.1)
        }}
      >
        {getActivityIcon(activity)}
      </Avatar>
      
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
            <strong>{activity.user}</strong> {activity.action}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {activity.time}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {activity.details}
        </Typography>

        <Chip
          label={activity.type === 'sale' ? 'Venta' :
                 activity.type === 'message' ? 'Mensaje' :
                 activity.type === 'campaign' ? 'Campaña' :
                 activity.type === 'inventory' ? 'Inventario' :
                 activity.type === 'invoice' ? 'Factura' : 'Usuario'}
          size="small"
          color={activity.color}
          variant="outlined"
          sx={{ height: 20, fontSize: '0.6rem' }}
        />
      </Box>
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">
          Actividad Reciente
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            icon={<TrendingUp sx={{ fontSize: 16 }} />}
            label={stats.trend}
            size="small"
            color="success"
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Resumen de Actividad */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3,
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        background: alpha(theme.palette.primary.main, 0.02)
      }}>
        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Typography variant="h4" fontWeight={700} color="primary.main">
            {stats.today}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Hoy
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Typography variant="h4" fontWeight={700} color="text.secondary">
            {stats.yesterday}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Ayer
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Typography variant="h4" fontWeight={700} color="success.main">
            {stats.trend}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Tendencia
          </Typography>
        </Box>
      </Box>

      {/* Lista de Actividades */}
      <Box sx={{ maxHeight: 400, overflowY: 'auto', pr: 1 }}>
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </Box>

      {/* Sin actividad reciente */}
      {activities.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 4,
          border: `2px dashed ${theme.palette.divider}`,
          borderRadius: 2
        }}>
          <Notifications sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="body1" color="text.secondary" gutterBottom>
            No hay actividad reciente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Las actividades recientes aparecerán aquí
          </Typography>
        </Box>
      )}

      {/* Estilos para scrollbar personalizado */}
      <style jsx>{`
        .activity-list::-webkit-scrollbar {
          width: 6px;
        }
        .activity-list::-webkit-scrollbar-track {
          background: ${theme.palette.background.default};
          border-radius: 3px;
        }
        .activity-list::-webkit-scrollbar-thumb {
          background: ${theme.palette.divider};
          border-radius: 3px;
        }
        .activity-list::-webkit-scrollbar-thumb:hover {
          background: ${theme.palette.text.secondary};
        }
      `}</style>
    </Box>
  );
};

export default RecentActivity;
