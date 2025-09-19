import React, { useState } from 'react';
import {
  Paper, Typography, Box, Chip, Avatar, Button,
  Grid, Divider, Tabs, Tab, List, ListItem,
  ListItemText, ListItemIcon, IconButton, Tooltip,
  useTheme, Card, CardContent, LinearProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem
} from '@mui/material';
import {
  Phone, Email, WhatsApp, CalendarToday,
  History, AttachMoney, Business, LocationOn,
  Edit, Delete, Message, Star, StarBorder,
  Timeline, ShoppingCart, Person, Work,
  Category, Payment, LocalOffer, TrendingUp
} from '@mui/icons-material';

const CustomerCard = ({ 
  customer, 
  businesses,
  onEdit,
  onDelete,
  onMessage,
  onCall,
  onViewHistory 
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState(customer);

  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      pending: 'warning',
      inactive: 'error',
      premium: 'primary',
      new: 'info'
    };
    return colors[status] || 'default';
  };

  const getBusinessInfo = (businessId) => {
    return businesses.find(b => b.id === businessId) || {};
  };

  const mockInteractions = [
    { id: 1, type: 'whatsapp', message: 'Consulta sobre servicios', date: '2024-01-15 10:30', duration: '5:23', status: 'completed' },
    { id: 2, type: 'purchase', message: 'Compra servicio Premium', date: '2024-01-10 14:15', amount: 1500, status: 'completed' },
    { id: 3, type: 'email', message: 'Seguimiento de satisfacción', date: '2024-01-08 09:45', status: 'pending' },
    { id: 4, type: 'whatsapp', message: 'Solicitud de información', date: '2024-01-05 16:20', duration: '8:12', status: 'completed' }
  ];

  const mockOrders = [
    { id: 1, product: 'Consultoría Premium', amount: 2500, date: '2024-01-10', status: 'completed' },
    { id: 2, product: 'Plan Básico', amount: 800, date: '2023-12-15', status: 'completed' },
    { id: 3, product: 'Soporte Técnico', amount: 1200, date: '2023-11-20', status: 'completed' }
  ];

  const TabPanel = ({ children, value, index, ...other }) => (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );

  const InteractionItem = ({ interaction }) => (
    <ListItem sx={{ 
      borderLeft: `3px solid ${theme.palette[getStatusColor(interaction.status)]?.main || theme.palette.grey[400]}`,
      mb: 1,
      borderRadius: 1
    }}>
      <ListItemIcon>
        {interaction.type === 'whatsapp' ? <WhatsApp color="success" /> :
         interaction.type === 'email' ? <Email color="primary" /> :
         interaction.type === 'purchase' ? <ShoppingCart color="secondary" /> :
         <Message color="info" />}
      </ListItemIcon>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" fontWeight="medium">
              {interaction.message}
            </Typography>
            {interaction.amount && (
              <Chip 
                label={`$${interaction.amount}`} 
                size="small" 
                color="success"
                variant="outlined"
              />
            )}
          </Box>
        }
        secondary={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="textSecondary">
              <CalendarToday sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
              {interaction.date}
            </Typography>
            {interaction.duration && (
              <Typography variant="caption" color="textSecondary">
                {interaction.duration}
              </Typography>
            )}
          </Box>
        }
      />
    </ListItem>
  );

  const OrderItem = ({ order }) => (
    <ListItem sx={{ 
      borderLeft: `3px solid ${theme.palette[getStatusColor(order.status)]?.main}`,
      mb: 1,
      borderRadius: 1
    }}>
      <ListItemIcon>
        <ShoppingCart color="primary" />
      </ListItemIcon>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" fontWeight="medium">
              {order.product}
            </Typography>
            <Chip 
              label={`$${order.amount}`} 
              size="small" 
              color="success"
              variant="filled"
            />
          </Box>
        }
        secondary={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="textSecondary">
              <CalendarToday sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
              {order.date}
            </Typography>
            <Chip 
              label={order.status} 
              size="small" 
              color={getStatusColor(order.status)}
            />
          </Box>
        }
      />
    </ListItem>
  );

  return (
    <>
      <Paper sx={{ p: 3 }}>
        {/* Header con información del cliente */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ 
              width: 60, 
              height: 60, 
              bgcolor: theme.palette.primary.main,
              fontSize: 24
            }}>
              {customer.name?.charAt(0)?.toUpperCase() || 'C'}
            </Avatar>
            
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {customer.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Chip 
                  label={customer.status} 
                  size="small" 
                  color={getStatusColor(customer.status)}
                />
                
                <Chip 
                  icon={<Business />}
                  label={getBusinessInfo(customer.business_id)?.name || 'Sin empresa'} 
                  size="small" 
                  variant="outlined"
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} sx={{ 
                      fontSize: 16, 
                      color: star <= 4 ? theme.palette.warning.main : theme.palette.grey[300] 
                    }} />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Acciones rápidas */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Enviar mensaje">
              <IconButton color="primary" onClick={() => onMessage?.(customer)}>
                <Message />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Llamar">
              <IconButton color="secondary" onClick={() => onCall?.(customer)}>
                <Phone />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Editar">
              <IconButton color="info" onClick={() => setOpenEditDialog(true)}>
                <Edit />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Eliminar">
              <IconButton color="error" onClick={() => onDelete?.(customer.id)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Información de contacto */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ fontSize: 16, mr: 1 }} />
                  Contacto
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2">
                    <strong>Teléfono:</strong> {customer.phone || 'No especificado'}
                  </Typography>
                  
                  <Typography variant="body2">
                    <strong>Email:</strong> {customer.email || 'No especificado'}
                  </Typography>
                  
                  <Typography variant="body2">
                    <strong>Última interacción:</strong> {customer.last_interaction ? 
                      new Date(customer.last_interaction).toLocaleDateString() : 'Nunca'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Business sx={{ fontSize: 16, mr: 1 }} />
                  Información de Empresa
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2">
                    <strong>Empresa:</strong> {getBusinessInfo(customer.business_id)?.name || 'No asignada'}
                  </Typography>
                  
                  <Typography variant="body2">
                    <strong>Industria:</strong> {getBusinessInfo(customer.business_id)?.industry || 'No especificada'}
                  </Typography>
                  
                  <Typography variant="body2">
                    <strong>Estado:</strong> 
                    <Chip 
                      label={getBusinessInfo(customer.business_id)?.status || 'unknown'} 
                      size="small" 
                      color={getStatusColor(getBusinessInfo(customer.business_id)?.status)}
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Pestañas de información */}
        <Paper variant="outlined">
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} variant="fullWidth">
            <Tab icon={<History />} label="Interacciones" />
            <Tab icon={<ShoppingCart />} label="Compras" />
            <Tab icon={<Timeline />} label="Estadísticas" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6" gutterBottom>
              📋 Historial de Interacciones
            </Typography>
            
            <List>
              {mockInteractions.map(interaction => (
                <InteractionItem key={interaction.id} interaction={interaction} />
              ))}
            </List>
            
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<History />}
              onClick={() => onViewHistory?.(customer)}
              sx={{ mt: 2 }}
            >
              Ver historial completo
            </Button>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              🛒 Historial de Compras
            </Typography>
            
            <List>
              {mockOrders.map(order => (
                <OrderItem key={order.id} order={order} />
              ))}
            </List>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="h6" color="primary">
                Total gastado: $4,500
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Valor de cliente lifetime
              </Typography>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>
              📊 Estadísticas del Cliente
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Tasa de Conversión
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <TrendingUp color="success" />
                      <Typography variant="h4" color="success.main">
                        68%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={68} 
                      color="success"
                      sx={{ mt: 1, height: 8, borderRadius: 4 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Frecuencia de Compra
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarToday color="primary" />
                      <Typography variant="h4" color="primary.main">
                        15 días
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="textSecondary">
                      Promedio entre compras
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>
      </Paper>

      {/* Dialog de edición */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={editData.name || ''}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={editData.phone || ''}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Estado"
                  value={editData.status || 'active'}
                  onChange={(e) => setEditData({...editData, status: e.target.value})}
                >
                  <MenuItem value="active">Activo</MenuItem>
                  <MenuItem value="pending">Pendiente</MenuItem>
                  <MenuItem value="inactive">Inactivo</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Empresa"
                  value={editData.business_id || ''}
                  onChange={(e) => setEditData({...editData, business_id: e.target.value})}
                >
                  {businesses.map(business => (
                    <MenuItem key={business.id} value={business.id}>
                      {business.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              onEdit?.(editData);
              setOpenEditDialog(false);
            }}
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomerCard;