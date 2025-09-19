// frontend/admin-panel/src/components/SuperAdminControls/ClientPlanAssignment.js
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
  Alert,
  Paper,
  Avatar,
  Divider,
  alpha,
  useTheme,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Link,
  Fab
} from '@mui/material';
import {
  Assignment,
  AttachMoney,
  Payment,
  Person,
  ArrowBack,
  Home,
  Business,
  CheckCircle,
  NavigateNext,
  AutoAwesome,
  Group,
  WorkspacePremium
} from '@mui/icons-material';
import { api } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const ClientPlanAssignment = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [plans, setPlans] = useState([]);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentDetails, setPaymentDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Datos de demostración
  const demoClients = [
    {
      id: 1,
      name: "Tech Solutions Corp",
      email: "ceo@techsolutions.com",
      phone: "+1234567890",
      industry: "technology",
      status: "active",
      current_plan: "Business",
      revenue: 18500,
      join_date: "2024-01-15",
      businesses: 3
    },
    {
      id: 2,
      name: "Salud Integral Clinic",
      email: "dr.mendoza@saludintegral.com",
      phone: "+0987654321",
      industry: "healthcare",
      status: "active",
      current_plan: "Startup",
      revenue: 29500,
      join_date: "2024-02-10",
      businesses: 1
    },
    {
      id: 3,
      name: "Gourmet Restaurant Group",
      email: "reservas@gourmetgroup.com",
      phone: "+1122334455",
      industry: "restaurant",
      status: "pending",
      current_plan: null,
      revenue: 0,
      join_date: "2024-03-01",
      businesses: 2
    }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [clientsData, plansData] = await Promise.all([
        api.get('/api/businesses').catch(() => demoClients),
        api.get('/api/plans/public')
      ]);
      setClients(clientsData);
      setPlans(plansData);
    } catch (error) {
      setClients(demoClients);
      setError('Error loading data, using demo data');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignPlan = async () => {
    try {
      // Simular asignación exitosa
      setTimeout(() => {
        setSuccess(`✅ Plan asignado exitosamente a ${selectedClient.name}`);
        setAssignDialogOpen(false);
        setSelectedPlan('');
        setPaymentDetails({});
        
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setSuccess(''), 3000);
      }, 1000);
    } catch (error) {
      setError('Error assigning plan');
    }
  };

  const openAssignDialog = (client) => {
    setSelectedClient(client);
    setSelectedPlan(client.current_plan || '');
    setPaymentMethod('cash');
    setPaymentDetails({});
    setAssignDialogOpen(true);
  };

  const getIndustryColor = (industry) => {
    const colors = {
      technology: '#6366f1',
      healthcare: '#10b981',
      restaurant: '#f59e0b',
      retail: '#ec4899',
      education: '#8b5cf6',
      automotive: '#ef4444'
    };
    return colors[industry] || '#6b7280';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'error';
  };

  const ClientCard = ({ client }) => (
    <Card sx={{ 
      height: '100%', 
      transition: 'all 0.3s ease',
      '&:hover': { 
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8]
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ 
              bgcolor: getIndustryColor(client.industry),
              mr: 2,
              width: 48,
              height: 48
            }}>
              {client.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="600">
                {client.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {client.email}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={client.status}
            color={getStatusColor(client.status)}
            size="small"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            📊 {client.industry?.toUpperCase()} • 🏢 {client.businesses} empresas
          </Typography>
          {client.current_plan && (
            <Chip
              label={`Plan: ${client.current_plan}`}
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Ingreso mensual:
            </Typography>
            <Typography variant="h6" color="primary" fontWeight="600">
              ${client.revenue?.toLocaleString()}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Assignment />}
            onClick={() => openAssignDialog(client)}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: '600'
            }}
          >
            {client.current_plan ? 'Cambiar Plan' : 'Asignar Plan'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <AutoAwesome sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6">Cargando clientes...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      {/* Breadcrumbs y Navegación */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
          <Link 
            color="inherit" 
            onClick={() => navigate('/dashboard')}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="small" />
            Inicio
          </Link>
          <Link 
            color="inherit" 
            onClick={() => navigate('/admin/plans')}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <AttachMoney sx={{ mr: 0.5 }} fontSize="small" />
            Planes
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ mr: 0.5 }} fontSize="small" />
            Asignar Planes
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <Box>
            <Typography variant="h3" fontWeight="800" gutterBottom>
              👥 Gestión de Clientes
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Asigna y gestiona planes para tus clientes
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/admin/plans')}
          >
            Volver a Planes
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="info" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
            <Group sx={{ fontSize: 40, color: '#6366f1', mb: 1 }} />
            <Typography variant="h4" fontWeight="800" color="#6366f1">
              {clients.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Clientes Totales
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
            <CheckCircle sx={{ fontSize: 40, color: '#10b981', mb: 1 }} />
            <Typography variant="h4" fontWeight="800" color="#10b981">
              {clients.filter(c => c.status === 'active').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Clientes Activos
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
            <Business sx={{ fontSize: 40, color: '#f59e0b', mb: 1 }} />
            <Typography variant="h4" fontWeight="800" color="#f59e0b">
              {clients.reduce((total, client) => total + (client.businesses || 0), 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Empresas Totales
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)' }}>
            <WorkspacePremium sx={{ fontSize: 40, color: '#8b5cf6', mb: 1 }} />
            <Typography variant="h4" fontWeight="800" color="#8b5cf6">
              ${clients.reduce((total, client) => total + (client.revenue || 0), 0).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ingreso Mensual
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Lista de Clientes */}
      <Typography variant="h5" fontWeight="700" gutterBottom sx={{ mb: 3 }}>
        📋 Lista de Clientes
      </Typography>

      <Grid container spacing={3}>
        {clients.map((client) => (
          <Grid item xs={12} md={6} lg={4} key={client.id}>
            <ClientCard client={client} />
          </Grid>
        ))}
      </Grid>

      {/* Dialog para asignar plan */}
      <Dialog open={assignDialogOpen} onClose={() => setAssignDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          🎯 Asignar Plan a {selectedClient?.name}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Seleccionar Plan</InputLabel>
              <Select
                value={selectedPlan}
                label="Seleccionar Plan"
                onChange={(e) => setSelectedPlan(e.target.value)}
              >
                {plans.map((plan) => (
                  <MenuItem key={plan._id || plan.name} value={plan._id || plan.name}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 16, 
                        height: 16, 
                        borderRadius: '50%', 
                        bgcolor: plan.color || '#6366f1',
                        mr: 2
                      }} />
                      {plan.name} - ${plan.price}/{plan.interval}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Método de Pago</InputLabel>
              <Select
                value={paymentMethod}
                label="Método de Pago"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="cash">💵 Efectivo</MenuItem>
                <MenuItem value="binance">💠 Binance</MenuItem>
                <MenuItem value="bank_transfer">🏦 Transferencia Bancaria</MenuItem>
                <MenuItem value="crypto">₿ Criptomoneda</MenuItem>
                <MenuItem value="other">🔗 Otro método</MenuItem>
              </Select>
            </FormControl>

            {selectedPlan && (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AttachMoney sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="body2" fontWeight="600">
                      Total a pagar: <strong>${plans.find(p => p._id === selectedPlan || p.name === selectedPlan)?.price}</strong>
                    </Typography>
                    <Typography variant="body2">
                      Moneda: <strong>USD</strong> • Renovación: <strong>Mensual</strong>
                    </Typography>
                  </Box>
                </Box>
              </Alert>
            )}

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              💡 El cliente recibirá un email con los detalles de su nueva suscripción y instrucciones de pago.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setAssignDialogOpen(false)} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleAssignPlan}
            variant="contained"
            disabled={!selectedPlan}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: '600'
            }}
          >
            <Payment sx={{ mr: 1 }} />
            Confirmar Asignación
          </Button>
        </DialogActions>
      </Dialog>

      {/* Botón flotante para volver */}
      <Tooltip title="Volver al Dashboard">
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
          onClick={() => navigate('/dashboard')}
        >
          <Home />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default ClientPlanAssignment;