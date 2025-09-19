import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button
} from '@mui/material';
import {
  ArrowBack,
  Phone,
  Email,
  LocationOn,
  CalendarToday,
  Person,
  Chat
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/layout/Breadcrumbs';

const CompanyDetail = () => {
  const { id } = useParams();
  
  // Datos de ejemplo
  const company = {
    id: 1,
    name: "Tech Solutions SA",
    plan: "Enterprise",
    status: "active",
    employees: 45,
    revenue: "$1.2M",
    joinDate: "2024-01-15",
    contacts: [
      { name: "Maria García", role: "CEO", email: "maria@techsolutions.com", phone: "+1 (555) 123-4567" },
      { name: "Carlos Rodríguez", role: "CTO", email: "carlos@techsolutions.com", phone: "+1 (555) 987-6543" }
    ],
    recentActivity: [
      { action: "Nuevo lead", description: "Cliente potencial agregado", time: "Hace 2 horas" },
      { action: "Mensaje enviado", description: "Campaign de marketing", time: "Hace 5 horas" },
      { action: "Pago procesado", description: "Suscripción mensual", time: "Hace 1 día" }
    ]
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 3 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs />
        
        {/* Header con botón de volver */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            component={Link}
            to="/dashboard"
            startIcon={<ArrowBack />}
            sx={{ mr: 2 }}
          >
            Volver
          </Button>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {company.name}
          </Typography>
          <Chip
            label={company.status}
            color={company.status === 'active' ? 'success' : 'error'}
            sx={{ ml: 2 }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Información de la empresa */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  📋 Información de la Empresa
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Business sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Plan
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {company.plan}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <People sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Empleados
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {company.employees}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AttachMoney sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Ingresos
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {company.revenue}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CalendarToday sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Fecha de ingreso
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {company.joinDate}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Actividad reciente */}
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  📈 Actividad Reciente
                </Typography>
                <List>
                  {company.recentActivity.map((activity, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemIcon>
                          <Chat color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.action}
                          secondary={`${activity.description} • ${activity.time}`}
                        />
                      </ListItem>
                      {index < company.recentActivity.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Contactos */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  👥 Contactos
                </Typography>
                <List>
                  {company.contacts.map((contact, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {contact.name.charAt(0)}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={contact.name}
                          secondary={
                            <Box>
                              <Typography variant="body2">{contact.role}</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <Email sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="caption">{contact.email}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <Phone sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="caption">{contact.phone}</Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < company.contacts.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CompanyDetail;