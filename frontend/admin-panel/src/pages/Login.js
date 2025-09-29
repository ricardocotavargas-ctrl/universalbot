// frontend/admin-panel/src/pages/Login.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  IconButton,
  InputAdornment,
  Fade
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Business,
  VpnKey,
  Security
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        setError(result.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (type) => {
    setError('');
    if (type === 'admin') {
      setFormData({
        email: 'admin@universalbot.com',
        password: 'admin123'
      });
    } else if (type === 'user') {
      setFormData({
        email: 'usuario@empresa.com',
        password: 'usuario123'
      });
    }
  };

  // Función para navegar al home
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Fade in={animate} timeout={600}>
          <Paper elevation={3} sx={{ 
            p: 4,
            borderRadius: '12px',
            background: '#ffffff',
            border: '1px solid #e2e8f0'
          }}>
            {/* Logo/Header profesional con navegación */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box 
                onClick={handleLogoClick}
                sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  borderRadius: '10px',
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  margin: '0 auto 16px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.3)'
                  }
                }}
              >
                UB
              </Box>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="700" color="#1e293b">
                Iniciar Sesión
              </Typography>
              <Typography variant="body1" color="#64748b">
                Accede a tu cuenta de Universal Bot Platform
              </Typography>
            </Box>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }} onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Correo electrónico"
                type="email"
                margin="normal"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business sx={{ color: '#64748b', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="admin@empresa.com"
              />

              <TextField
                fullWidth
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey sx={{ color: '#64748b', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#64748b' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="••••••••"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ 
                  mb: 2,
                  py: 1.5,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: '#2563eb',
                  '&:hover': {
                    backgroundColor: '#1d4ed8'
                  },
                  '&:disabled': {
                    backgroundColor: '#9ca3af'
                  }
                }}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
              
              <Box textAlign="center" sx={{ mb: 3 }}>
                <Link 
                  component={RouterLink} 
                  to="/register" 
                  variant="body2"
                  sx={{ 
                    color: '#2563eb',
                    fontWeight: 500,
                    '&:hover': { color: '#1d4ed8' }
                  }}
                >
                  ¿No tienes cuenta? Regístrate aquí
                </Link>
              </Box>

              {/* Demo Access Section */}
              <Box sx={{ 
                p: 2, 
                backgroundColor: '#f8fafc', 
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2, color: '#374151', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security sx={{ fontSize: 18, color: '#2563eb' }} />
                  Acceso de Demostración
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    onClick={() => handleDemoLogin('admin')}
                    disabled={loading}
                    sx={{ 
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      py: 0.75,
                      borderColor: '#059669',
                      color: '#059669',
                      '&:hover': {
                        backgroundColor: '#059669',
                        color: 'white',
                        borderColor: '#059669'
                      }
                    }}
                  >
                    Admin Demo
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    onClick={() => handleDemoLogin('user')}
                    disabled={loading}
                    sx={{ 
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      py: 0.75,
                      borderColor: '#7c3aed',
                      color: '#7c3aed',
                      '&:hover': {
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        borderColor: '#7c3aed'
                      }
                    }}
                  >
                    Usuario Demo
                  </Button>
                </Box>

                <Typography variant="caption" component="div" sx={{ display: 'block', color: '#6b7280', mb: 0.5, fontWeight: 500 }}>
                  <strong>Admin:</strong> admin@universalbot.com
                </Typography>
                <Typography variant="caption" component="div" sx={{ display: 'block', color: '#6b7280', fontWeight: 500 }}>
                  <strong>Usuario:</strong> usuario@empresa.com
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#ef4444', fontStyle: 'italic' }}>
                  Contraseña: admin123 / usuario123
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;
