import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip, useTheme } from '@mui/material';
import { 
  AttachMoney, ChatBubble, People, Inventory,
  TrendingUp, AccountCircle, LocalShipping, Analytics
} from '@mui/icons-material';
import { useBusiness } from '../../../contexts/BusinessContext';

const StatsCards = ({ stats, onCardClick, businessConfig }) => {
   const { selectedBusiness } = useBusiness();
  const theme = useTheme();
  
  const cards = [
    {
      title: '💰 Ingresos',
      value: `$${stats.revenue?.toLocaleString() || '0'}`,
      icon: <AttachMoney sx={{ fontSize: 32 }} />,
      subtitle: `${stats.orders || 0} servicios`,
      growth: stats.monthlyGrowth,
      onClick: () => onCardClick?.(5),
      color: selectedBusiness?.colors?.primary || theme.palette.primary.main
    },
    {
      title: '💬 Interacciones',
      value: stats.interactions || 0,
      icon: <ChatBubble sx={{ fontSize: 32 }} />,
      subtitle: `${stats.activeChats || 0} activas`,
      growth: stats.conversionRate,
      onClick: () => onCardClick?.(4),
      color: businessConfig?.colors?.secondary || theme.palette.secondary.main
    },
    {
      title: '👥 Clientes',
      value: stats.customers || 0,
      icon: <People sx={{ fontSize: 32 }} />,
      subtitle: `${stats.satisfactionRate} satisfacción`,
      growth: stats.responseTime,
      onClick: () => onCardClick?.(2),
      color: theme.palette.success.main
    },
    {
      title: '📦 Servicios',
      value: stats.products || 0,
      icon: <Inventory sx={{ fontSize: 32 }} />,
      subtitle: 'Disponibles',
      onClick: () => onCardClick?.(3),
      color: theme.palette.warning.main
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} md={6} lg={3} key={index}>
          <Card 
            sx={{ 
              background: `linear-gradient(135deg, ${card.color} 0%, ${theme.palette.primary.dark} 100%)`,
              color: 'white', 
              height: '100%', 
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8]
              } 
            }}
            onClick={card.onClick}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
                {card.icon}
              </Box>
              
              <Typography variant="h3" sx={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                {card.value}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mt: 2,
                borderTop: '1px solid rgba(255,255,255,0.2)',
                pt: 1
              }}>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', opacity: 0.9 }}>
                  {card.subtitle}
                </Typography>
                
                {card.growth && (
                  <Chip 
                    label={card.growth} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }} 
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;