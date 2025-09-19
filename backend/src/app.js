const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CONFIGURACIÓN CORS COMPLETA
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'https://universalbot-frontend.vercel.app',
  'https://universalbot-backend.onrender.com',
  /\.vercel\.app$/,
  /\.onrender\.com$/
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') return origin === pattern;
      if (pattern instanceof RegExp) return pattern.test(origin);
      return false;
    });
    
    isAllowed ? callback(null, true) : callback(new Error('CORS not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
};

// ✅ MIDDLEWARES (EN ORDEN CORRECTO)
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CONEXIÓN MONGODB SIMPLIFICADA
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI no está definida en las variables de entorno');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => {
    console.error('❌ Error conectando MongoDB:', err.message);
    process.exit(1);
  });

// ✅ RUTAS SIMPLIFICADAS PERO FUNCIONALES

// Ruta de salud PRINCIPAL
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de API principal  
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API funcionando',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'UniversalBot Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api_health: '/api/health',
      api: '/api'
    }
  });
});

// ✅ RUTAS DE AUTH BASICAS PERO FUNCIONALES

// Registro de usuario
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name, businessName } = req.body;
    
    // Validación básica
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password y nombre son requeridos' });
    }

    // Simulación de usuario registrado (luego conectarás con MongoDB)
    const user = {
      id: '1',
      email,
      name,
      businessName: businessName || 'Mi Empresa',
      role: 'admin'
    };

    // Simulación de token
    const token = 'mock-jwt-token-' + Date.now();

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Login de usuario  
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y password son requeridos' });
    }

    // Simulación de usuario (luego conectarás con MongoDB)
    const user = {
      id: '1',
      email: 'admin@universalbot.com',
      name: 'Administrador',
      businessName: 'Mi Empresa',
      role: 'admin'
    };

    // Simulación de token
    const token = 'mock-jwt-token-' + Date.now();

    res.json({
      message: 'Login exitoso',
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Verificación de token
app.get('/auth/verify', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ valid: false, message: 'Token no proporcionado' });
  }

  // Simulación de verificación
  const user = {
    id: '1',
    email: 'admin@universalbot.com', 
    name: 'Administrador',
    businessName: 'Mi Empresa',
    role: 'admin'
  };

  res.json({ valid: true, user });
});

// ✅ MANEJO DE ERRORES
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// ✅ INICIAR SERVIDOR
const PORT = process.env.PORT || 10000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log('='.repeat(60));
  console.log('🚀 BACKEND INICIADO EXITOSAMENTE');
  console.log('='.repeat(60));
  console.log(`📍 Servidor: http://${HOST}:${PORT}`);
  console.log(`🌐 Health:   http://${HOST}:${PORT}/health`);
  console.log(`🔐 Login:    POST http://${HOST}:${PORT}/auth/login`);
  console.log('='.repeat(60));
});

module.exports = app;
