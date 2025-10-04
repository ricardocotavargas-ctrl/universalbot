import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Grid, Card, CardContent,
  Button, TextField, Avatar, Divider, Alert, Snackbar,
  FormControl, InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import {
  Business, PhotoCamera, Save, Store, Email, Phone, LocationOn
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const BusinessSettings = () => {
  const { user } = useAuth();
  const [businessData, setBusinessData] = useState({
    name: '',
    rif: '',
    phone: '',
    email: '',
    address: '',
    logo: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadBusinessData();
  }, []);

  const loadBusinessData = async () => {
    try {
      // Cargar datos del negocio desde el backend
      const response = await api.get('/business/current');
      if (response.data.success) {
        setBusinessData(response.data.business);
      }
    } catch (error) {
      console.error('Error loading business data:', error);
      // Si falla, usar datos del usuario
      if (user?.business) {
        setBusinessData(user.business);
      }
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await api.put('/business/update', businessData);
      
      if (response.data.success) {
        setSnackbar({ 
          open: true, 
          message: '✅ Configuración guardada exitosamente', 
          severity: 'success' 
        });
      }
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: '❌ Error al guardar configuración', 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBusinessData(prev => ({
          ...prev,
          logo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 4 }}>
        <Business sx={{ mr: 2, verticalAlign: 'middle' }} />
        Configuración del Negocio
      </Typography>

      <Grid container spacing={4}>
        {/* Logo y Información Básica */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={businessData.logo}
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto',
                    bgcolor: 'primary.main',
                    fontSize: '2rem'
                  }}
                >
                  <Store />
                </Avatar>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="logo-upload"
                  type="file"
                  onChange={handleLogoChange}
                />
                <label htmlFor="logo-upload">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
              
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                {businessData.name || 'Mi Negocio'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                RIF: {businessData.rif || 'J-00000000-0'}
              </Typography>
              
              <Button
                variant="outlined"
                startIcon={<PhotoCamera />}
                sx={{ mt: 2 }}
                onClick={() => document.getElementById('logo-upload').click()}
              >
                Cambiar Logo
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Formulario de Configuración */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información de Facturación
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Esta información aparecerá en tus comprobantes y facturas
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Negocio *"
                    value={businessData.name}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, name: e.target.value }))}
                    InputProps={{
                      startAdornment: <Business sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="RIF *"
                    value={businessData.rif}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, rif: e.target.value }))}
                    placeholder="J-123456789-0"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    value={businessData.phone}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, phone: e.target.value }))}
                    InputProps={{
                      startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={businessData.email}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, email: e.target.value }))}
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    value={businessData.address}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, address: e.target.value }))}
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  disabled={loading || !businessData.name || !businessData.rif}
                >
                  {loading ? 'Guardando...' : 'Guardar Configuración'}
                </Button>
                <Button variant="outlined">
                  Ver Vista Previa
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BusinessSettings;
