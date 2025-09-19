import React, { useState } from 'react';
import {
  Paper, Typography, Box, Grid, Card, CardContent,
  IconButton, Tooltip, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, MenuItem,
  Chip, useTheme, Divider, Stepper, Step, StepLabel,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
  Add, Edit, Delete, PlayArrow, Settings,
  SmartToy, Message, QuestionAnswer, ExpandMore,
  ContentCopy, DragHandle, Timeline
} from '@mui/icons-material';

const ConversationFlow = ({ flows = [], onSaveFlow, onTestFlow }) => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentFlow, setCurrentFlow] = useState(null);
  const [selectedStep, setSelectedStep] = useState(0);

  const defaultFlow = {
    id: null,
    name: '',
    description: '',
    industry: '',
    steps: [
      {
        id: 1,
        type: 'greeting',
        message: '¡Hola! 👋 Bienvenido a nuestra empresa. ¿En qué puedo ayudarte hoy?',
        triggers: [],
        responses: ['Servicios', 'Precios', 'Contacto']
      }
    ]
  };

  const stepTypes = [
    { value: 'greeting', label: 'Saludo inicial', icon: '👋' },
    { value: 'question', label: 'Pregunta', icon: '❓' },
    { value: 'option', label: 'Opciones', icon: '📋' },
    { value: 'information', label: 'Información', icon: 'ℹ️' },
    { value: 'qualification', label: 'Calificación', icon: '⭐' },
    { value: 'transfer', label: 'Transferir a humano', icon: '👨‍💼' },
    { value: 'closing', label: 'Cierre', icon: '✅' }
  ];

  const industryFlows = {
    ecommerce: [
      { step: 1, type: 'greeting', message: '¡Hola! 🛍️ Bienvenido a nuestra tienda. ¿Qué producto te interesa?' },
      { step: 2, type: 'option', message: 'Tenemos estas categorías disponibles:', responses: ['Tecnología', 'Ropa', 'Hogar', 'Deportes'] },
      { step: 3, type: 'information', message: 'Excelente elección. ¿Te gustaría ver los productos más vendidos?' },
      { step: 4, type: 'closing', message: '¡Gracias por tu compra! 🎉 ¿Necesitas algo más?' }
    ],
    healthcare: [
      { step: 1, type: 'greeting', message: '¡Hola! 🏥 Bienvenido a nuestra clínica. ¿Necesitas agendar una cita?' },
      { step: 2, type: 'option', message: '¿Qué tipo de especialidad necesitas?', responses: ['Medicina general', 'Odontología', 'Pediatría', 'Dermatología'] },
      { step: 3, type: 'information', message: 'Perfecto. ¿Prefieres horario matutino o vespertino?' },
      { step: 4, type: 'closing', message: '✅ Cita agendada. Te esperamos.' }
    ],
    education: [
      { step: 1, type: 'greeting', message: '¡Hola! 🎓 Bienvenido a nuestra institución. ¿Te interesa algún curso?' },
      { step: 2, type: 'option', message: 'Tenemos estos programas:', responses: ['Diplomados', 'Cursos técnicos', 'Talleres', 'Asesorías'] },
      { step: 3, type: 'information', message: 'Excelente elección. ¿Necesitas información sobre costos?' },
      { step: 4, type: 'closing', message: '📚 ¡Te esperamos en clases!' }
    ]
  };

  const handleCreateFlow = () => {
    setCurrentFlow(defaultFlow);
    setOpenDialog(true);
  };

  const handleEditFlow = (flow) => {
    setCurrentFlow(flow);
    setOpenDialog(true);
  };

  const handleIndustrySelect = (industry) => {
    if (industry && industryFlows[industry]) {
      setCurrentFlow(prev => ({
        ...prev,
        industry,
        steps: industryFlows[industry]
      }));
    }
  };

  const addStep = () => {
    setCurrentFlow(prev => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          id: prev.steps.length + 1,
          type: 'question',
          message: 'Nuevo mensaje...',
          triggers: [],
          responses: []
        }
      ]
    }));
  };

  const removeStep = (stepId) => {
    setCurrentFlow(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
  };

  const updateStep = (stepId, field, value) => {
    setCurrentFlow(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === stepId ? { ...step, [field]: value } : step
      )
    }));
  };

  const FlowStepCard = ({ step, index }) => (
    <Card sx={{ 
      mb: 2, 
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateX(4px)',
        boxShadow: theme.shadows[4]
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip 
              label={`Paso ${step.id}`} 
              color="primary" 
              size="small"
            />
            <Chip 
              label={stepTypes.find(t => t.value === step.type)?.label || step.type} 
              variant="outlined" 
              size="small"
            />
          </Box>
          
          <Box>
            <Tooltip title="Editar paso">
              <IconButton size="small" onClick={() => setSelectedStep(index)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar paso">
              <IconButton size="small" onClick={() => removeStep(step.id)} color="error">
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ mb: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
          {step.message}
        </Typography>

        {step.responses && step.responses.length > 0 && (
          <Box>
            <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
              Opciones de respuesta:
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {step.responses.map((response, idx) => (
                <Chip key={idx} label={response} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            <SmartToy sx={{ mr: 1, color: 'primary.main' }} />
            Flujos Conversacionales
          </Typography>
          
          <Button variant="contained" startIcon={<Add />} onClick={handleCreateFlow}>
            Nuevo Flujo
          </Button>
        </Box>

        {flows.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <SmartToy sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No hay flujos configurados
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Crea tu primer flujo conversacional para automatizar las interacciones con tus clientes
            </Typography>
            <Button variant="contained" size="large" onClick={handleCreateFlow}>
              Crear Primer Flujo
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Flujos Disponibles
              </Typography>
              
              {flows.map(flow => (
                <Card key={flow.id} sx={{ mb: 2, cursor: 'pointer' }} onClick={() => handleEditFlow(flow)}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {flow.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {flow.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip label={flow.industry} size="small" variant="outlined" />
                      <Chip label={`${flow.steps.length} pasos`} size="small" />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Vista Previa del Flujo
              </Typography>
              
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stepper activeStep={selectedStep} orientation="vertical">
                  {flows[0]?.steps.map((step, index) => (
                    <Step key={step.id}>
                      <StepLabel onClick={() => setSelectedStep(index)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{stepTypes.find(t => t.value === step.type)?.icon}</span>
                          <Typography variant="body2">{step.message.substring(0, 50)}...</Typography>
                        </Box>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                
                <Button 
                  variant="outlined" 
                  startIcon={<PlayArrow />} 
                  sx={{ mt: 2 }}
                  onClick={() => onTestFlow?.(flows[0])}
                >
                  Probar este Flujo
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Paper>

      {/* Dialog para crear/editar flujo */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentFlow?.id ? 'Editar Flujo' : 'Crear Nuevo Flujo'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Flujo"
                  value={currentFlow?.name || ''}
                  onChange={(e) => setCurrentFlow({...currentFlow, name: e.target.value})}
                  placeholder="Ej: Flujo de Ventas Ecommerce"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  multiline
                  rows={2}
                  value={currentFlow?.description || ''}
                  onChange={(e) => setCurrentFlow({...currentFlow, description: e.target.value})}
                  placeholder="Describe el propósito de este flujo conversacional"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Industria"
                  value={currentFlow?.industry || ''}
                  onChange={(e) => handleIndustrySelect(e.target.value)}
                >
                  <MenuItem value="">Seleccionar industria...</MenuItem>
                  <MenuItem value="ecommerce">E-commerce</MenuItem>
                  <MenuItem value="healthcare">Salud</MenuItem>
                  <MenuItem value="education">Educación</MenuItem>
                  <MenuItem value="services">Servicios</MenuItem>
                  <MenuItem value="other">Otra</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Pasos del Flujo
            </Typography>
            
            {currentFlow?.steps.map((step, index) => (
              <Accordion key={step.id} defaultExpanded={index === 0}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip label={`Paso ${step.id}`} size="small" />
                    <Typography variant="subtitle2">
                      {stepTypes.find(t => t.value === step.type)?.label}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        select
                        label="Tipo de Paso"
                        value={step.type}
                        onChange={(e) => updateStep(step.id, 'type', e.target.value)}
                      >
                        {stepTypes.map(type => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Mensaje"
                        value={step.message}
                        onChange={(e) => updateStep(step.id, 'message', e.target.value)}
                        placeholder="Escribe el mensaje que enviará el bot..."
                      />
                    </Grid>
                    
                    {step.type === 'option' && (
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          label="Opciones de Respuesta"
                          value={step.responses.join(', ')}
                          onChange={(e) => updateStep(step.id, 'responses', e.target.value.split(',').map(r => r.trim()))}
                          placeholder="Separar opciones con comas. Ej: Sí, No, Más información"
                          helperText="Las opciones aparecerán como botones para el usuario"
                        />
                      </Grid>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
            
            <Button 
              variant="outlined" 
              startIcon={<Add />} 
              onClick={addStep}
              sx={{ mt: 2 }}
            >
              Agregar Paso
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              onSaveFlow?.(currentFlow);
              setOpenDialog(false);
            }}
          >
            {currentFlow?.id ? 'Actualizar' : 'Crear'} Flujo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConversationFlow;