import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import { Check, Whatshot, Star } from '@mui/icons-material';

const PricingPlans = ({ currentPlan, onUpgrade }) => {
  const plans = [
    {
      name: 'Starter',
      price: 29,
      description: 'Perfecto para comenzar',
      features: ['1 Empresa', '500 mensajes/mes', 'Soporte básico', 'WhatsApp only'],
      popular: false,
      recommended: false
    },
    {
      name: 'Professional',
      price: 79,
      description: 'Para negocios en crecimiento',
      features: ['5 Empresas', '2000 mensajes/mes', 'Soporte prioritario', 'Multi-plataforma'],
      popular: true,
      recommended: false
    },
    {
      name: 'Enterprise',
      price: 199,
      description: 'Para grandes empresas',
      features: ['Empresas ilimitadas', 'Mensajes ilimitados', 'Soporte 24/7', 'Todas las plataformas'],
      popular: false,
      recommended: true
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
        💎 Planes y Precios
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper sx={{ 
              p: 3, 
              height: '100%',
              position: 'relative',
              border: plan.recommended ? '2px solid' : '1px solid',
              borderColor: plan.recommended ? 'primary.main' : 'divider'
            }}>
              {plan.popular && (
                <Chip icon={<Whatshot />} label="Popular" color="primary" sx={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)' }} />
              )}
              
              <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
                {plan.name}
              </Typography>
              
              <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom textAlign="center">
                ${plan.price}
                <Typography variant="body2" component="span" color="text.secondary">
                  /mes
                </Typography>
              </Typography>
              
              <Typography variant="body2" color="text.secondary" textAlign="center" gutterBottom>
                {plan.description}
              </Typography>
              
              <List>
                {plan.features.map((feature, idx) => (
                  <ListItem key={idx} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
              
              <Button
                fullWidth
                variant={plan.recommended ? 'contained' : 'outlined'}
                onClick={() => onUpgrade(plan.name)}
              >
                {currentPlan === plan.name ? 'Plan Actual' : 'Seleccionar'}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PricingPlans;