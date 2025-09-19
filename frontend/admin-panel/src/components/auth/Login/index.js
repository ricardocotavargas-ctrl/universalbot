// frontend/admin-panel/src/components/auth/Login/index.js
import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Lock, Business, Person } from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'client' // Valor por defecto
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(credentials);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const demoAccounts = [
    { email: 'demo@universalbot.com', password: 'demo123', role: 'demo', label: 'Cuenta Demo' },
    { email: 'admin@universalbot.com', password: 'admin123', role: 'superadmin', label: 'Super Admin' },
    { email: 'cliente@empresa.com', password: 'cliente123', role: 'client', label: 'Cliente Regular' }
  ];

  const handleDemoLogin = (demoAccount) => {
    setCredentials({
      email: demoAccount.email,
      password: demoAccount.password,
      role: demoAccount.role
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Lock sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography component="h1" variant="h4" sx={{ mt: 1 }}>
              Universal Bot
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sistema de Gestión Multi-Tenant
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tipo de Cuenta</InputLabel>
              <Select
                name="role"
                value={credentials.role}
                label="Tipo de Cuenta"
                onChange={handleChange}
              >
                <MenuItem value="client">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ mr: 1 }} />
                    Cliente
                  </Box>
                </MenuItem>
                <MenuItem value="superadmin">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Business sx={{ mr: 1 }} />
                    Super Administrador
                  </Box>
                </MenuItem>
                <MenuItem value="demo">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Business sx={{ mr: 1 }} />
                    Modo Demo
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cuentas de Demostración:
            </Typography>
            {demoAccounts.map((account, index) => (
              <Button
                key={index}
                fullWidth
                variant="outlined"
                sx={{ mb: 1 }}
                onClick={() => handleDemoLogin(account)}
                startIcon={<Business />}
              >
                {account.label}
              </Button>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;