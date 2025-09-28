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
  Fade,
  Zoom,
  Chip
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Security,
  Person,
  Lock,
  RocketLaunch,
  SmartToy
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

    // Validación básica
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Pequeño delay para mostrar éxito
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

  const handleQuickFill = (type) => {
    handleDemoLogin(type);
    // Auto-submit después de llenar
    setTimeout(() => {
      document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 100);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
      py: 4
    }}>
      {/* Elementos decorativos de fondo */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
      }} />

      <Container maxWidth="sm">
        <Zoom in={animate} timeout={800}>
          <Paper elevation={8} sx={{ 
            p: { xs: 3, sm: 4 },
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Elemento decorativo superior */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #2563eb, #7c3aed, #2563eb)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s ease-in-out infinite',
              '@keyframes shimmer': {
                '0%': { backgroundPosition: '-200% 0' },
                '100%': { backgroundPosition: '200% 0' }
              }
            }} />

            <Fade in={animate} timeout={1000}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  borderRadius: '16px',
                  width: 70,
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)'
                }}>
                  <SmartToy sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="800" sx={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #374151 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}>
                  Iniciar Sesión
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  Bienvenido de vuelta a UniversalBot AI
                </Typography>
              </Box>
            </Fade>
            
            {error && (
              <Fade in={!!error}>
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: '12px',
                    alignItems: 'center'
                  }}
                  onClose={() => setError('')}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Fade in={animate} timeout={1200}>
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
                        <Person sx={{ color: '#6b7280' }} />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="tu@empresa.com"
                />
              </Fade>

              <Fade in={animate} timeout={1400}>
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
                        <Lock sx={{ color: '#6b7280' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#6b7280' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="••••••••"
                />
              </Fade>
              
              <Fade in={animate} timeout={1600}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <Security /> : <RocketLaunch />}
                  sx={{ 
                    mb: 3,
                    py: 1.5,
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                      boxShadow: '0 12px 35px rgba(37, 99, 235, 0.4)',
                      transform: 'translateY(-2px)'
                    },
                    '&:disabled': {
                      background: '#9ca3af',
                      transform: 'none'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? 'Iniciando sesión...' : 'Acceder a la Plataforma'}
                </Button>
              </Fade>
              
              <Fade in={animate} timeout={1800}>
                <Box textAlign="center" sx={{ mb: 3 }}>
                  <Link 
                    component={RouterLink} 
                    to="/register" 
                    variant="body2"
                    sx={{ 
                      color: '#2563eb',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': { 
                        color: '#1d4ed8',
                        textDecoration: 'underline'
                      },
                      transition: 'color 0.3s ease'
                    }}
                  >
                    ¿No tienes cuenta? Regístrate aquí
                  </Link>
                </Box>
              </Fade>

              {/* Separador */}
              <Fade in={animate} timeout={2000}>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                  <Box sx={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
                  <Typography variant="body2" sx={{ mx: 2, color: '#6b7280', fontWeight: 600 }}>
                    Acceso Rápido
                  </Typography>
                  <Box sx={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
                </Box>
              </Fade>

              {/* Botones de demo mejorados */}
              <Fade in={animate} timeout={2200}>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="medium"
                    onClick={() => handleQuickFill('admin')}
                    disabled={loading}
                    sx={{ 
                      borderRadius: '10px',
                      py: 1.2,
                      borderColor: '#059669',
                      color: '#059669',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#059669',
                        color: 'white',
                        borderColor: '#059669',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Box sx={{ textAlign: 'left', flex: 1 }}>
                      <Typography variant="caption" display="block" fontWeight={700}>
                        Demo Admin
                      </Typography>
                      <Typography variant="caption" display="block" color="inherit" sx={{ opacity: 0.8 }}>
                        Acceso completo
                      </Typography>
                    </Box>
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    size="medium"
                    onClick={() => handleQuickFill('user')}
                    disabled={loading}
                    sx={{ 
                      borderRadius: '10px',
                      py: 1.2,
                      borderColor: '#7c3aed',
                      color: '#7c3aed',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        borderColor: '#7c3aed',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Box sx={{ textAlign: 'left', flex: 1 }}>
                      <Typography variant="caption" display="block" fontWeight={700}>
                        Demo Usuario
                      </Typography>
                      <Typography variant="caption" display="block" color="inherit" sx={{ opacity: 0.8 }}>
                        Acceso estándar
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              </Fade>

              {/* Credenciales de prueba mejoradas */}
              <Fade in={animate} timeout={2400}>
                <Box sx={{ 
                  p: 3, 
                  backgroundColor: '#f8fafc', 
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                }}>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: '#374151', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Security sx={{ fontSize: 18 }} />
                    Credenciales de Prueba
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip 
                        label="Admin" 
                        size="small" 
                        color="success"
                        sx={{ fontWeight: 600, minWidth: 60 }}
                      />
                      <Box>
                        <Typography variant="caption" fontWeight={600} display="block" color="#374151">
                          admin@universalbot.com
                        </Typography>
                        <Typography variant="caption" display="block" color="#6b7280">
                          Contraseña: admin123
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip 
                        label="Usuario" 
                        size="small" 
                        color="primary"
                        sx={{ fontWeight: 600, minWidth: 60 }}
                      />
                      <Box>
                        <Typography variant="caption" fontWeight={600} display="block" color="#374151">
                          usuario@empresa.com
                        </Typography>
                        <Typography variant="caption" display="block" color="#6b7280">
                          Contraseña: usuario123
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#ef4444', fontStyle: 'italic' }}>
                    ⚠️ Estas credenciales son de demostración
                  </Typography>
                </Box>
              </Fade>
            </Box>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default Login;
