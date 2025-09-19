// frontend/admin-panel/src/pages/Login.js
import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: 'admin@universalbot.com', 
    password: 'admin123' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
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
        <Paper elevation={3} sx={{ 
          p: 4,
          borderRadius: '16px',
          background: '#ffffff'
        }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '12px',
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              margin: '0 auto 16px'
            }}>
              UB
            </Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Iniciar Sesión
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Accede a tu cuenta de Universal Bot Platform
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Correo electrónico"
              type="email"
              margin="normal"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              margin="normal"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              sx={{ mb: 3 }}
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
                backgroundColor: '#2563eb',
                '&:hover': {
                  backgroundColor: '#1d4ed8'
                }
              }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
            
            <Box textAlign="center">
              <Link 
                component={RouterLink} 
                to="/register" 
                variant="body2"
                sx={{ 
                  color: '#2563eb',
                  '&:hover': { color: '#1d4ed8' }
                }}
              >
                ¿No tienes cuenta? Regístrate aquí
              </Link>
            </Box>

            {/* Botones de demo */}
            <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('admin')}
                sx={{ 
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  py: 0.5
                }}
              >
                Demo Admin
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('user')}
                sx={{ 
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  py: 0.5
                }}
              >
                Demo Usuario
              </Button>
            </Box>

            {/* Credenciales de prueba */}
            <Box sx={{ 
              mt: 3, 
              p: 2, 
              backgroundColor: '#f8fafc', 
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 1, color: '#374151' }}>
                Credenciales de prueba:
              </Typography>
              <Typography variant="caption" component="div" sx={{ display: 'block', color: '#6b7280', mb: 0.5 }}>
                <strong>Admin:</strong> admin@universalbot.com / admin123
              </Typography>
              <Typography variant="caption" component="div" sx={{ display: 'block', color: '#6b7280' }}>
                <strong>Usuario:</strong> usuario@empresa.com / usuario123
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;