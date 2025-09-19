// frontend/admin-panel/src/components/SuperAdminControls/PlanManagement.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
  Alert,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  AttachMoney,
  People,
  Message,
  Storage,
  Analytics,
  Support,
  Api,
  Brush
} from '@mui/icons-material';
import { api } from '../../utils/api';

const PlanManagement = () => {
  const [plans, setPlans] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    interval: 'month',
    features: {
      whatsapp: false,
      facebook: false,
      instagram: false,
      email: false,
      webchat: false,
      ai_responses: false,
      analytics_basic: false,
      analytics_advanced: false,
      multi_business: false,
      priority_support: false,
      custom_branding: false,
      api_access: false
    },
    limits: {
      messages: 1000,
      businesses: 1,
      users: 2,
      storage: 5,
      contacts: 5000
    },
    industries: [],
    isActive: true,
    isPublic: true
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const data = await api.get('/api/plans/public');
      setPlans(data);
    } catch (error) {
      setError('Error loading plans');
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async () => {
    try {
      await api.post('/api/plans/create', formData);
      setCreateDialogOpen(false);
      resetForm();
      loadPlans();
    } catch (error) {
      setError('Error creating plan');
      console.error('Error creating plan:', error);
    }
  };

  const handleEditPlan = async () => {
    try {
      await api.put(`/api/plans/${currentPlan._id}`, formData);
      setEditDialogOpen(false);
      resetForm();
      loadPlans();
    } catch (error) {
      setError('Error updating plan');
      console.error('Error updating plan:', error);
    }
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este plan?')) {
      try {
        await api.delete(`/api/plans/${planId}`);
        loadPlans();
      } catch (error) {
        setError('Error deleting plan');
        console.error('Error deleting plan:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      interval: 'month',
      features: {
        whatsapp: false,
        facebook: false,
        instagram: false,
        email: false,
        webchat: false,
        ai_responses: false,
        analytics_basic: false,
        analytics_advanced: false,
        multi_business: false,
        priority_support: false,
        custom_branding: false,
        api_access: false
      },
      limits: {
        messages: 1000,
        businesses: 1,
        users: 2,
        storage: 5,
        contacts: 5000
      },
      industries: [],
      isActive: true,
      isPublic: true
    });
  };

  const openEditDialog = (plan) => {
    setCurrentPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      interval: plan.interval,
      features: { ...plan.features },
      limits: { ...plan.limits },
      industries: [...plan.industries],
      isActive: plan.isActive,
      isPublic: plan.isPublic
    });
    setEditDialogOpen(true);
  };

  const FeatureIcon = ({ feature }) => {
    const icons = {
      whatsapp: <Message />,
      facebook: <People />,
      instagram: <People />,
      email: <Message />,
      webchat: <Message />,
      ai_responses: <Analytics />,
      analytics_basic: <Analytics />,
      analytics_advanced: <Analytics />,
      multi_business: <People />,
      priority_support: <Support />,
      custom_branding: <Brush />,
      api_access: <Api />
    };
    return icons[feature] || <Analytics />;
  };

  const PlanCard = ({ plan }) => (
    <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            {plan.name}
          </Typography>
          <Chip 
            label={plan.isActive ? 'Activo' : 'Inactivo'} 
            color={plan.isActive ? 'success' : 'default'} 
            size="small" 
          />
        </Box>

        <Typography variant="h3" gutterBottom>
          ${plan.price}
          <Typography variant="body2" color="textSecondary" component="span">
            /{plan.interval}
          </Typography>
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Límites:</Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Message sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">{plan.limits.messages} mensajes</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <People sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">{plan.limits.users} usuarios</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Storage sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">{plan.limits.storage}GB</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <People sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">{plan.limits.contacts} contactos</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="h6" gutterBottom>Características:</Typography>
        <Grid container spacing={1}>
          {Object.entries(plan.features)
            .filter(([_, enabled]) => enabled)
            .map(([feature]) => (
              <Grid item xs={6} key={feature}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <FeatureIcon feature={feature} />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {feature.replace(/_/g, ' ')}
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => openEditDialog(plan)}
            fullWidth
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => handleDeletePlan(plan._id)}
            fullWidth
          >
            Eliminar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Cargando planes...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Planes
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreateDialogOpen(true)}
        >
          Crear Nuevo Plan
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Todos los Planes" />
        <Tab label="Planes Activos" />
        <Tab label="Planes Públicos" />
      </Tabs>

      <Grid container spacing={3}>
        {plans
          .filter(plan => {
            if (activeTab === 1) return plan.isActive;
            if (activeTab === 2) return plan.isPublic;
            return true;
          })
          .map((plan) => (
            <Grid item xs={12} md={6} lg={4} key={plan._id}>
              <PlanCard plan={plan} />
            </Grid>
          ))}
      </Grid>

      {/* Dialog para crear plan */}
      <CreateEditPlanDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreatePlan}
        formData={formData}
        setFormData={setFormData}
        title="Crear Nuevo Plan"
      />

      {/* Dialog para editar plan */}
      <CreateEditPlanDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={handleEditPlan}
        formData={formData}
        setFormData={setFormData}
        title="Editar Plan"
      />
    </Box>
  );
};

const CreateEditPlanDialog = ({ open, onClose, onSubmit, formData, setFormData, title }) => {
  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
  };

  const handleLimitChange = (limit, value) => {
    setFormData(prev => ({
      ...prev,
      limits: {
        ...prev.limits,
        [limit]: parseInt(value) || 0
      }
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre del Plan"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Precio"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
              InputProps={{
                startAdornment: <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Intervalo</InputLabel>
              <Select
                value={formData.interval}
                label="Intervalo"
                onChange={(e) => setFormData(prev => ({ ...prev, interval: e.target.value }))}
              >
                <MenuItem value="month">Mensual</MenuItem>
                <MenuItem value="year">Anual</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Límites</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Mensajes"
                  type="number"
                  value={formData.limits.messages}
                  onChange={(e) => handleLimitChange('messages', e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Usuarios"
                  type="number"
                  value={formData.limits.users}
                  onChange={(e) => handleLimitChange('users', e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Almacenamiento (GB)"
                  type="number"
                  value={formData.limits.storage}
                  onChange={(e) => handleLimitChange('storage', e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Contactos"
                  type="number"
                  value={formData.limits.contacts}
                  onChange={(e) => handleLimitChange('contacts', e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Características</Typography>
            <Grid container spacing={2}>
              {Object.entries(formData.features).map(([feature, enabled]) => (
                <Grid item xs={6} md={4} key={feature}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={enabled}
                        onChange={() => handleFeatureToggle(feature)}
                      />
                    }
                    label={feature.replace(/_/g, ' ')}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                />
              }
              label="Plan Activo"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isPublic}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                />
              }
              label="Plan Público"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} variant="contained">
          {title.includes('Crear') ? 'Crear' : 'Actualizar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlanManagement;