const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅✅✅ CORS COMPLETAMENTE PERMISIVO (PARA PRUEBAS)
app.use(cors({
  origin: '*', // ✅ PERMITE TODOS LOS ORIGENS
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
  allowedHeaders: ['*'], // ✅ PERMITE TODOS LOS HEADERS
  exposedHeaders: ['*'],
  optionsSuccessStatus: 200
}));

// ✅ MANEJO EXPLÍCITO DE OPTIONS (PREFLIGHT)
app.options('*', cors()); // ✅ RESPONDE A TODAS LAS PREFLIGHT REQUESTS

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ CONEXIÓN MONGODB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI no está definida');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => {
    console.error('❌ Error conectando MongoDB:', err.message);
    process.exit(1);
  });

// ✅ MIDDLEWARE DE LOGGING DETALLADO
app.use((req, res, next) => {
  console.log('=== 📨 NUEVA REQUEST ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Origin:', req.headers.origin || 'No origin');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// ✅ RUTA DE SALUD (DEBE FUNCIONAR SI O SI)
app.get('/health', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.json({ 
    status: 'OK', 
    message: '✅ Backend funcionando',
    timestamp: new Date().toISOString(),
    cors: 'HABILITADO PARA TODOS LOS DOMINIOS'
  });
});

app.get('/api/health', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ 
    status: 'OK', 
    message: '✅ API funcionando',
    timestamp: new Date().toISOString()
  });
});

// ✅ RUTA RAIZ
app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ 
    message: '🚀 UniversalBot Backend API - CORS HABILITADO',
    version: '1.0.0',
    cors: 'PERMITIENDO TODOS LOS ORIGENS (*)'
  });
});

// ✅ RUTAS DE AUTH CON HEADERS MANUALES
app.post('/auth/login', (req, res) => {
  try {
    // ✅ HEADERS CORS MANUALES
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    const { email, password } = req.body;
    console.log('📧 Login attempt:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y password requeridos' });
    }

    // ✅ USUARIO DE PRUEBA
    const user = {
      id: '1',
      email: 'admin@universalbot.com',
      name: 'Administrador',
      businessName: 'Mi Empresa',
      role: 'admin'
    };

    // ✅ TOKEN SIMULADO
    const token = 'jwt-token-simulado-' + Date.now();

    console.log('✅ Login exitoso para:', email);
    
    res.json({
      message: 'Login exitoso',
      token,
      user
    });

  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/auth/register', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // ... lógica de registro ...
  res.json({ message: 'Registro exitoso' });
});

app.get('/auth/verify', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // ... lógica de verificación ...
  res.json({ valid: true, user: { id: '1', email: 'admin@universalbot.com' } });
});

// ✅ MANEJO DE ERRORES
app.use((err, req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.error('💥 Error:', err.message);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.use('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// ✅ INICIAR SERVIDOR
const PORT = process.env.PORT || 10000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log('='.repeat(70));
  console.log('🚀 UNIVERSALBOT BACKEND INICIADO CON CORS PERMISIVO');
  console.log('='.repeat(70));
  console.log(`📍 Servidor: http://${HOST}:${PORT}`);
  console.log(`🌐 Health:   http://${HOST}:${PORT}/health`);
  console.log(`🔐 Login:    POST http://${HOST}:${PORT}/auth/login`);
  console.log('🎯 CORS:     ✅ PERMITIENDO TODOS LOS ORIGENS (*)');
  console.log('='.repeat(70));
});

module.exports = app;
