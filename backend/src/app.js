const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// ✅ CORS SUPER PERMISIVO
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// ✅ RUTAS BASICAS QUE FUNCIONAN SI O SI
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '✅ Backend FUNCIONANDO',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 UniversalBot Backend ACTIVO',
    version: '1.0.0',
    endpoints: ['/health', '/auth/login', '/auth/register']
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '✅ API Health Check',
    timestamp: new Date().toISOString()
  });
});

// ✅ AUTH BASICO PERO FUNCIONAL
app.post('/auth/login', (req, res) => {
  console.log('📧 Login attempt received');
  res.json({
    message: '✅ Login exitoso',
    token: 'jwt-token-simulado-' + Date.now(),
    user: {
      id: '1',
      email: 'admin@universalbot.com',
      name: 'Administrador',
      role: 'admin'
    }
  });
});

app.post('/auth/register', (req, res) => {
  res.json({
    message: '✅ Registro exitoso',
    token: 'jwt-token-simulado-' + Date.now(),
    user: {
      id: '2',
      email: req.body.email || 'user@example.com',
      name: req.body.name || 'Usuario',
      role: 'user'
    }
  });
});

// ✅ INICIAR SERVIDOR
app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(60));
  console.log('🚀 BACKEND INICIADO EXITOSAMENTE');
  console.log('='.repeat(60));
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`🌐 Health: http://localhost:${PORT}/health`);
  console.log('✅ CORS: HABILITADO PARA TODOS LOS DOMINIOS');
  console.log('='.repeat(60));
});

module.exports = app;
