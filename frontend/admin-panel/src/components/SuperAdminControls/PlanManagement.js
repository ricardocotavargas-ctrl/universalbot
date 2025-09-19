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
  Paper,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fab,
  Tooltip,
  Divider,
  alpha,
  useTheme
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
  Brush,
  Security,
  Speed,
  CheckCircle,
  ExpandMore,
  Rocket,
  Star,
  Diamond,
  TrendingUp,
  WorkspacePremium,
  AutoAwesome
} from '@mui/icons-material';
import { api } from '../../utils/api';

const PlanManagement = () => {
  const theme = useTheme();
  const [plans, setPlans] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [step, setStep] = useState(0);

  // Planes predeterminados
  const defaultPlans = [
    {
      name: 'Startup',
      price: 49,
      interval: 'month',
      color: '#6366f1',
      icon: <Rocket />,
      features: {
        whatsapp: true,
        ai_responses: true,
        analytics_basic: true,
        webchat: true
      },
      limits: {
        messages: 2000,
        businesses: 2,
        users: 3,
        storage: 10,
        contacts: 2000
      },
      description: 'Perfecto para emprendedores y pequeñas empresas',
      popular: false
    },
    {
      name: 'Business',
      price: 99,
      interval: 'month',
      color: '#10b981',
      icon: <TrendingUp />,
      features: {
        whatsapp: true,
        facebook: true,
        ai_responses: true,
        analytics_basic: true,
        analytics_advanced: false,
        multi_business: true,
        priority_support: true
      },
      limits: {
        messages: 5000,
        businesses: 5,
        users: 5,
        storage: 20,
        contacts: 5000
      },
      description: 'Ideal para empresas en crecimiento',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 199,
      interval: 'month',
      color: '#8b5cf6',
      icon: <Diamond />,
      features: {
        whatsapp: true,
        facebook: true,
        instagram: true,
        email: true,
        ai_responses: true,
        analytics_advanced: true,
        multi_business: true,
        priority_support: true,
        custom_branding: true,
        api_access: true
      },
      limits: {
        messages: 20000,
        businesses: 20,
        users: 10,
        storage: 50,
        contacts: 20000
      },
      description: 'Solución completa para grandes empresas',
      popular: false
    }
  ];

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const data = await api.get('/api/plans/public');
      setPlans(data.length > 0 ? data : defaultPlans);
    } catch (error) {
      setPlans(defaultPlans);
      setError('Error loading plans, using demo data');
    } finally {
      setLoading(false);
    }
  };

  const FeatureCard = ({ icon, title, description }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      <Box sx={{ color: 'primary.main', mr: 2, mt: 0.5 }}>{icon}</Box>
      <Box>
        <Typography variant="subtitle2" fontWeight="600">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </Box>
    </Box>
  );

  const PlanCard = ({ plan }) => (
    <Card sx={{ 
      height: '100%', 
      transition: 'all 0.3s ease',
      border: plan.popular ? `2px solid ${plan.color}` : '1px solid',
      borderColor: plan.popular ? plan.color : 'divider',
      background: plan.popular ? 
        `linear-gradient(135deg, ${alpha(plan.color, 0.05)} 0%, ${alpha(plan.color, 0.1)} 100%)` :
        'background.paper',
      '&:hover': { 
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[8],
        borderColor: plan.color
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        {plan.popular && (
          <Chip 
            label="MÁS POPULAR" 
            size="small"
            sx={{ 
              background: `linear-gradient(135deg, ${plan.color} 0%, ${alpha(plan.color, 0.8)} 100%)`,
              color: 'white',
              fontWeight: 'bold',
              mb: 2,
              fontSize: '0.75rem'
            }}
          />
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            color: plan.color, 
            mr: 2,
            display: 'flex',
            alignItems: 'center'
          }}>
            {plan.icon}
          </Box>
          <Typography variant="h4" fontWeight="800" color={plan.color}>
            {plan.name}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {plan.description}
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h2" fontWeight="800" sx={{ color: plan.color }}>
            ${plan.price}
            <Typography variant="h6" component="span" color="text.secondary">
              /{plan.interval}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="600" gutterBottom>
            🚀 Características Principales
          </Typography>
          {Object.entries(plan.features).filter(([_, enabled]) => enabled).slice(0, 4).map(([feature]) => (
            <Box key={feature} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CheckCircle sx={{ color: plan.color, fontSize: 18, mr: 1 }} />
              <Typography variant="body2">
                {feature.replace(/_/g, ' ').toUpperCase()}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="600" gutterBottom>
            📊 Límites Incluidos
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Message sx={{ fontSize: 16, mr: 1, color: plan.color }} />
                <Typography variant="body2">{plan.limits.messages} mensajes</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <People sx={{ fontSize: 16, mr: 1, color: plan.color }} />
                <Typography variant="body2">{plan.limits.users} usuarios</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Storage sx={{ fontSize: 16, mr: 1, color: plan.color }} />
                <Typography variant="body2">{plan.limits.storage}GB</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <People sx={{ fontSize: 16, mr: 1, color: plan.color }} />
                <Typography variant="body2">{plan.limits.contacts} contactos</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Button
          variant={plan.popular ? "contained" : "outlined"}
          fullWidth
          sx={{
            background: plan.popular ? 
              `linear-gradient(135deg, ${plan.color} 0%, ${alpha(plan.color, 0.8)} 100%)` :
              'transparent',
            borderColor: plan.color,
            color: plan.popular ? 'white' : plan.color,
            fontWeight: 'bold',
            py: 1.5,
            '&:hover': {
              background: plan.popular ? 
                `linear-gradient(135deg, ${alpha(plan.color, 0.9)} 0%, ${alpha(plan.color, 0.7)} 100%)` :
                alpha(plan.color, 0.1)
            }
          }}
        >
          {plan.popular ? 'CONTRATAR AHORA' : 'SELECCIONAR'}
        </Button>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <AutoAwesome sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6">Cargando planes...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" fontWeight="800" gutterBottom sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Planes de Suscripción
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, margin: '0 auto' }}>
          Elige el plan perfecto para impulsar tu negocio. Todos incluyen soporte 24/7 y actualizaciones gratuitas.
        </Typography>
      </Box>

      {error && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Planes Grid */}
      <Grid container spacing={4}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <PlanCard plan={plan} />
          </Grid>
        ))}
      </Grid>

      {/* Características Detalladas */}
      <Paper sx={{ p: 4, mt: 6, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        <Typography variant="h4" fontWeight="800" textAlign="center" gutterBottom>
          💎 Características Premium
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
          Todas las características que necesitas para hacer crecer tu negocio
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FeatureCard
              icon={<Message sx={{ color: '#6366f1' }} />}
              title="WhatsApp Business API"
              description="Integración completa con WhatsApp Business para comunicación automatizada"
            />
            <FeatureCard
              icon={<Analytics sx={{ color: '#10b981' }} />}
              title="Analytics Avanzados"
              description="Métricas detalladas y reportes personalizados de rendimiento"
            />
            <FeatureCard
              icon={<Speed sx={{ color: '#f59e0b' }} />}
              title="Respuestas IA"
              description="Inteligencia artificial para respuestas automáticas inteligentes"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureCard
              icon={<Support sx={{ color: '#8b5cf6' }} />}
              title="Soporte Prioritario"
              description="Atención personalizada 24/7 con tiempos de respuesta rápidos"
            />
            <FeatureCard
              icon={<Security sx={{ color: '#ef4444' }} />}
              title="Seguridad Enterprise"
              description="Encriptación de grado bancario y cumplimiento de normativas"
            />
            <FeatureCard
              icon={<Api sx={{ color: '#ec4899' }} />}
              title="API Access"
              description="Integraciones personalizadas y desarrollo de aplicaciones"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Comparación de Planes */}
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="800" gutterBottom>
          📊 Comparación de Planes
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '16px' }}>Característica</th>
                {plans.map((plan, index) => (
                  <th key={index} style={{ textAlign: 'center', padding: '16px' }}>
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Mensajes/mes', key: 'messages' },
                { feature: 'Usuarios', key: 'users' },
                { feature: 'Almacenamiento (GB)', key: 'storage' },
                { feature: 'Contactos', key: 'contacts' },
                { feature: 'Soporte 24/7', key: 'priority_support' },
                { feature: 'WhatsApp Business', key: 'whatsapp' },
                { feature: 'Facebook/Instagram', key: 'facebook' },
                { feature: 'Email Marketing', key: 'email' },
                { feature: 'API Access', key: 'api_access' },
                { feature: 'Branding Personalizado', key: 'custom_branding' }
              ].map((row, rowIndex) => (
                <tr key={rowIndex} style={{ 
                  backgroundColor: rowIndex % 2 === 0 ? '#f8fafc' : 'white' 
                }}>
                  <td style={{ padding: '12px 16px', fontWeight: '600' }}>{row.feature}</td>
                  {plans.map((plan, planIndex) => (
                    <td key={planIndex} style={{ textAlign: 'center', padding: '12px 16px' }}>
                      {typeof plan.limits[row.key] !== 'undefined' ? 
                        plan.limits[row.key] :
                        plan.features[row.key] ? '✅' : '❌'
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Paper>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', mt: 6, p: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 2 }}>
        <WorkspacePremium sx={{ fontSize: 48, color: 'white', mb: 2 }} />
        <Typography variant="h4" fontWeight="800" color="white" gutterBottom>
          ¿Listo para comenzar?
        </Typography>
        <Typography variant="body1" color="rgba(255,255,255,0.9)" sx={{ mb: 3 }}>
          Únete a miles de empresas que ya están transformando su comunicación
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'white',
            color: '#667eea',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            '&:hover': {
              background: 'rgba(255,255,255,0.9)'
            }
          }}
        >
          COMENZAR PRUEBA GRATIS
        </Button>
      </Box>

      {/* Botón flotante para crear planes */}
      <Tooltip title="Crear Nuevo Plan">
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
          onClick={() => setCreateDialogOpen(true)}
        >
          <Add />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default PlanManagement;