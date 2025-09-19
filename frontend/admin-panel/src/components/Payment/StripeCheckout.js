// frontend/admin-panel/src/components/Payment/StripeCheckout.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardContent,
  Alert,
  Divider
} from '@mui/material';
import {
  AttachMoney,
  CreditCard,
  CheckCircle,
  Security
} from '@mui/icons-material';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { api } from '../../utils/api';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const steps = ['Seleccionar Plan', 'Información de Pago', 'Confirmación'];

const PlanSelection = ({ plans, selectedPlan, onSelectPlan }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Selecciona tu Plan
      </Typography>
      <Grid container spacing={2}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan._id}>
            <Card
              sx={{
                cursor: 'pointer',
                border: selectedPlan?._id === plan._id ? 2 : 1,
                borderColor: selectedPlan?._id === plan._id ? 'primary.main' : 'divider',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
              onClick={() => onSelectPlan(plan)}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom color="primary">
                  {plan.name}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  ${plan.price}
                  <Typography variant="body2" color="textSecondary">
                    /{plan.interval}
                  </Typography>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ textAlign: 'left' }}>
                  {Object.entries(plan.features)
                    .filter(([_, enabled]) => enabled)
                    .map(([feature]) => (
                      <Box key={feature} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">
                          {feature.replace(/_/g, ' ')}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const PaymentForm = ({ plan, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message);
        setProcessing(false);
        return;
      }

      // Crear método de pago
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message);
        setProcessing(false);
        return;
      }

      // Asignar plan al negocio
      const response = await api.post('/api/plans/assign', {
        planId: plan._id,
        paymentMethodId: paymentMethod.id
      });

      if (response.success) {
        // Confirmar pago si es necesario
        if (response.clientSecret) {
          const { error: confirmError } = await stripe.confirmCardPayment(
            response.clientSecret
          );

          if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
            return;
          }
        }

        onPaymentSuccess(response.subscriptionId);
      } else {
        setError('Error al procesar el pago');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Información de Pago
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        <Security sx={{ mr: 1 }} />
        Tus datos de pago están protegidos con encriptación de grado bancario
      </Alert>
      
      <form onSubmit={handleSubmit}>
        <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </Card>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Button
          type="submit"
          variant="contained"
          disabled={!stripe || processing}
          fullWidth
          size="large"
        >
          {processing ? 'Procesando...' : `Pagar $${plan.price}/${plan.interval}`}
        </Button>
      </form>
    </Box>
  );
};

const Confirmation = ({ plan, subscriptionId }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        ¡Pago Exitoso!
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Tu suscripción al plan {plan.name} ha sido activada correctamente.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        ID de Suscripción: {subscriptionId}
      </Typography>
    </Box>
  );
};

const StripeCheckout = ({ open, onClose, business }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (open) {
      loadPlans();
    }
  }, [open]);

  const loadPlans = async () => {
    try {
      const response = await api.get('/api/plans/public');
      setPlans(response);
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    handleNext();
  };

  const handlePaymentSuccess = (subId) => {
    setSubscriptionId(subId);
    handleNext();
  };

  const handleClose = () => {
    setActiveStep(0);
    setSelectedPlan(null);
    setSubscriptionId(null);
    onClose();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PlanSelection
            plans={plans}
            selectedPlan={selectedPlan}
            onSelectPlan={handlePlanSelect}
          />
        );
      case 1:
        return (
          <Elements stripe={stripePromise}>
            <PaymentForm
              plan={selectedPlan}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </Elements>
        );
      case 2:
        return (
          <Confirmation
            plan={selectedPlan}
            subscriptionId={subscriptionId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AttachMoney sx={{ mr: 1 }} />
          Suscripción a Plan Premium
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}
      </DialogContent>

      <DialogActions>
        {activeStep > 0 && activeStep < 2 && (
          <Button onClick={handleBack}>
            Atrás
          </Button>
        )}
        {activeStep === 2 && (
          <Button onClick={handleClose} variant="contained">
            Completar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default StripeCheckout;