// frontend/admin-panel/src/pages/PlanManagement.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  TextField,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  AttachMoney,
  CheckCircle,
  Star,
  Business,
  Diamond,
  Settings
} from '@mui/icons-material';
import UBCard from '../components/ui/UBCard';

const PlanManagement = () => {
  const theme = useTheme();
  const [plans, setPlans] = useState([
    {
      id: 'starter',
      name: 'Starter',
      price: 49,
      currency: 'USD',
      features: [
        'Hasta 100 clientes',
        'WhatsApp básico',
        'Soporte por email',
        '100 mensajes/mes',
        '1 usuario'
      ],
      active: true,
      color: 'primary'
    },
    {
      id: 'business', 
      name: 'Business',
      price: 99,
      currency: 'USD',
      features: [
        'Clientes ilimitados',
        'WhatsApp + Facebook',
        'Soporte prioritario',
        '1000 mensajes/mes', 
        '3 usuarios',
        'Reportes básicos'
      ],
      active: true,
      color: 'secondary'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 199,
      currency: 'USD',
      features: [
        'Clientes ilimitados',
        'Todos los canales',
        'Soporte 24/7',
        'Mensajes ilimitados',
        'Usuarios ilimitados',
        'Reportes avanzados',
        'IA Avanzada',
        'Personalización'
      ],
      active: true,
      color: 'info'
    }
  ]);

  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanToggle = (planId) => {
    setPlans(plans.map(plan => 
      plan.id === planId ? { ...plan, active: !plan.active } : plan
    ));
  };

  const handlePriceChange = (planId, newPrice) => {
    setPlans(plans.map(plan =>
      plan.id === planId ? { ...plan, price: newPrice } : plan
    ));
  };

  const handleConfigurePlan = (plan) => {
    setSelectedPlan(plan);
    setConfigDialogOpen(true);
  };

  const handleSaveConfiguration = () => {
    // Aquí iría la lógica para guardar la configuración
    console.log('Configuración guardada para:', selectedPlan?.name);
    setConfigDialogOpen(false);
  };

  const PlanCard = ({ plan }) => (
    <Card sx={{ 
      height: '100%',
      border: `2px solid ${plan.active ? theme.palette[plan.color]?.main || theme.palette.primary.main : '#e2e8f0'}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8]
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mb: 2
          }}>
            {plan.id === 'premium' && <Diamond sx={{ fontSize: 32, color: 'info.main', mr: 1 }} />}
            {plan.id === 'business' && <Business sx={{ fontSize: 32, color: 'secondary.main', mr: 1 }} />}
            {plan.id === 'starter' && <Star sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />}
            
            <Typography variant="h4" fontWeight={700}>
              {plan.name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', mb: 2 }}>
            <Typography variant="h3" fontWeight={800} color={plan.active ? (plan.color + '.main') : 'text.secondary'}>
              ${plan.price}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ ml: 1 }}>
              /mes
            </Typography>
          </Box>

          <TextField
            size="small"
            type="number"
            value={plan.price}
            onChange={(e) => handlePriceChange(plan.id, parseInt(e.target.value))}
            sx={{ width: 100, mb: 2 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={plan.active}
                onChange={() => handlePlanToggle(plan.id)}
                color={plan.color}
              />
            }
            label={plan.active ? 'Activo' : 'Inactivo'}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <List dense>
          {plan.features.map((feature, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          color={plan.color}
          disabled={!plan.active}
          onClick={() => handleConfigurePlan(plan)}
        >
          {plan.active ? 'Configurar Plan' : 'Plan Desactivado'}
        </Button>
      </CardContent>
    </Card>
  );

  const PlanConfigDialog = () => (
    <Dialog open={configDialogOpen} onClose={() => setConfigDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>
        Configurar Plan {selectedPlan?.name}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Nombre del Plan"
            defaultValue={selectedPlan?.name || ''}
            fullWidth
          />
          
          <TextField
            label="Precio mensual"
            type="number"
            defaultValue={selectedPlan?.price || ''}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            fullWidth
          />
          
          <FormControl fullWidth>
            <InputLabel>Moneda</InputLabel>
            <Select
              defaultValue={selectedPlan?.currency || 'USD'}
              label="Moneda"
            >
              <MenuItem value="USD">Dólares (USD)</MenuItem>
              <MenuItem value="EUR">Euros (EUR)</MenuItem>
              <MenuItem value="VES">Bolívares (VES)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Límite de mensajes/mes"
            type="number"
            defaultValue={
              selectedPlan?.features?.find(f => f.includes('ilimitados')) ? 0 : 
              selectedPlan?.id === 'starter' ? 100 :
              selectedPlan?.id === 'business' ? 1000 : 0
            }
            fullWidth
            helperText="0 = Ilimitado"
          />

          <TextField
            label="Límite de usuarios"
            type="number"
            defaultValue={
              selectedPlan?.features?.find(f => f.includes('ilimitados')) ? 0 : 
              selectedPlan?.id === 'starter' ? 1 :
              selectedPlan?.id === 'business' ? 3 : 0
            }
            fullWidth
            helperText="0 = Ilimitado"
          />

          <FormControlLabel
            control={<Switch defaultChecked={selectedPlan?.active || true} />}
            label="Plan activo para nuevos clientes"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfigDialogOpen(false)}>Cancelar</Button>
        <Button onClick={handleSaveConfiguration} variant="contained">
          Guardar Configuración
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Gestión de Planes
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Configura y personaliza los planes de suscripción
          </Typography>
        </Box>

        {/* Planes */}
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.id}>
              <PlanCard plan={plan} />
            </Grid>
          ))}
        </Grid>

        {/* Configuración Avanzada */}
        <UBCard title="Configuración Global" sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Configuración general del sistema de facturación
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Periodo de facturación (días)"
                type="number"
                defaultValue={30}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Impuestos (%)"
                type="number"
                defaultValue={16}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Términos y condiciones de suscripción"
                multiline
                rows={3}
                defaultValue="Los planes se renuevan automáticamente cada mes. Puede cancelar en cualquier momento."
                fullWidth
              />
            </Grid>
          </Grid>

          <Button variant="contained" sx={{ mt: 3 }}>
            <Settings sx={{ mr: 1 }} />
            Guardar Configuración Global
          </Button>
        </UBCard>

        {/* Modal de Configuración */}
        <PlanConfigDialog />
      </Box>
    </Container>
  );
};

export default PlanManagement;