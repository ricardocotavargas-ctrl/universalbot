// backend/src/app.js - CONFIGURACIÓN CORS COMPLETA
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CONFIGURACIÓN CORS PERMISIVA PARA PRODUCCIÓN
app.use(cors({
  origin: function (origin, callback) {
    // Lista de dominios permitidos (TODOS los posibles)
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://universalbot-frontend.vercel.app',
      'https://universalbot-c2j2rhx9u-ricardos-projects-bad6fbb4.vercel.app',
      'https://universalbot-backend.onrender.com',
      'https://universalbot-dsko.onrender.com',
      /\.vercel\.app$/,    // ✅ Todos los subdominios de Vercel
      /\.onrender\.com$/,  // ✅ Todos los subdominios de Render
    ];
    
    // ✅ Permitir requests sin origin (Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    // ✅ Verificar si el origen está permitido
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return origin === allowedOrigin;
      }
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('🚫 CORS bloqueado para origen:', origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'X-API-Key'
  ],
  exposedHeaders: [
    'Content-Range',
    'X-Content-Range',
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials'
  ],
  optionsSuccessStatus: 200,
  maxAge: 600, // 10 minutos
  preflightContinue: false
}));

// ✅ MANEJAR EXPLÍCITAMENTE LAS OPTIONS REQUESTS
app.options('*', cors()); // Habilitar pre-flight para todas las rutas

// ✅ MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ MANEJAR PREFLIGHT REQUESTS GLOBALMENTE
app.options('*', cors(corsOptions));

// ✅ CONEXIÓN A MONGODB CON RECONEXIÓN AUTOMÁTICA
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://universalbot-user:pruebadebot2025@cluster0.uoa5zyg.mongodb.net/universalbot?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB CONECTADO exitosamente');
  console.log('📊 Base de datos:', mongoose.connection.name);
})
.catch((error) => {
  console.error('❌ Error conectando a MongoDB:', error.message);
  console.log('🔄 Intentando reconectar en 5 segundos...');
  setTimeout(() => process.exit(1), 5000);
});

// ✅ EVENTOS DE CONEXIÓN DE MONGODB
mongoose.connection.on('error', (err) => {
  console.error('❌ Error de MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB desconectado');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconectado');
});

// ✅ MIDDLEWARE DE LOGGING
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - Origin: ${req.get('origin') || 'No origin'}`);
  next();
});

// ✅ RUTAS PRINCIPALES
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '✅ Backend funcionando PERFECTO',
    timestamp: new Date().toISOString(),
    service: 'Render',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 UniversalBot Backend API',
    version: '1.0.0',
    status: 'Operacional',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /health',
      api_docs: 'GET /api',
      auth: {
        login: 'POST /auth/login',
        register: 'POST /auth/register',
        verify: 'GET /auth/verify'
      },
      protected: 'GET /auth/protected'
    },
    cors: {
      enabled: true,
      allowed_origins: 'Vercel, Render, Localhost'
    }
  });
});

// ✅ RUTAS DE AUTENTICACIÓN
app.use('/auth', authRoutes);

// ✅ RUTA DE PRUEBA PROTEGIDA
app.get('/auth/protected', (req, res) => {
  // Simulación de ruta protegida para testing
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ 
      error: 'Token requerido',
      message: 'Esta ruta requiere autenticación'
    });
  }
  
  res.json({ 
    message: '✅ Ruta protegida - Acceso autorizado',
    user: { id: 'test-user', email: 'test@universalbot.com' },
    timestamp: new Date().toISOString()
  });
});

// ✅ RUTA DE INFORMACIÓN DE API
app.get('/api', (req, res) => {
  res.json({
    name: 'UniversalBot API',
    version: '1.0.0',
    description: 'Sistema de gestión empresarial completo',
    base_url: req.protocol + '://' + req.get('host'),
    endpoints: {
      root: {
        method: 'GET',
        path: '/',
        description: 'Información general de la API'
      },
      health: {
        method: 'GET',
        path: '/health',
        description: 'Estado del servidor y base de datos'
      },
      auth_login: {
        method: 'POST',
        path: '/auth/login',
        description: 'Iniciar sesión',
        body: { email: 'string', password: 'string' }
      },
      auth_register: {
        method: 'POST',
        path: '/auth/register',
        description: 'Registrar usuario',
        body: { email: 'string', password: 'string', name: 'string' }
      },
      auth_protected: {
        method: 'GET',
        path: '/auth/protected',
        description: 'Ruta protegida de prueba',
        headers: { Authorization: 'Bearer <token>' }
      }
    },
    cors: {
      enabled: true,
      allowed_origins: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://universalbot-frontend.vercel.app',
        'https://*.vercel.app',
        'https://*.onrender.com'
      ]
    }
  });
});

// ✅ MANEJO DE ERRORES CENTRALIZADO
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.message);
  
  if (err.message === 'No permitido por política CORS') {
    return res.status(403).json({
      error: 'CORS Error',
      message: 'Origen no permitido',
      your_origin: req.get('origin'),
      allowed_origins: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://universalbot-frontend.vercel.app',
        'https://*.vercel.app',
        'https://*.onrender.com'
      ]
    });
  }
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    timestamp: new Date().toISOString()
  });
});

// ✅ MANEJO DE RUTAS NO ENCONTRADAS
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method,
    available_routes: [
      'GET /',
      'GET /health',
      'GET /api',
      'POST /auth/login',
      'POST /auth/register',
      'GET /auth/protected'
    ],
    timestamp: new Date().toISOString()
  });
});

// ✅ INICIAR SERVIDOR
const PORT = process.env.PORT || 10000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log('='.repeat(60));
  console.log('🚀 UNIVERSALBOT BACKEND INICIADO CORRECTAMENTE');
  console.log('='.repeat(60));
  console.log(`📍 Servidor: http://${HOST}:${PORT}`);
  console.log(`🌐 Health:   http://${HOST}:${PORT}/health`);
  console.log(`🔐 Login:    POST http://${HOST}:${PORT}/auth/login`);
  console.log(`📊 MongoDB:  ${mongoose.connection.readyState === 1 ? '✅ Conectado' : '❌ Desconectado'}`);
  console.log(`🌍 Entorno:  ${process.env.NODE_ENV || 'development'}`);
  console.log(`🎯 CORS:     ✅ Habilitado para Vercel, Render y Localhost`);
  console.log('='.repeat(60));
  console.log('📋 Endpoints disponibles:');
  console.log('   GET  /              - Información general');
  console.log('   GET  /health        - Estado del sistema');
  console.log('   GET  /api           - Documentación API');
  console.log('   POST /auth/login    - Iniciar sesión');
  console.log('   POST /auth/register - Registrar usuario');
  console.log('   GET  /auth/protected - Ruta protegida');
  console.log('='.repeat(60));
});

// ✅ Manejo de cierre graceful
process.on('SIGINT', () => {
  console.log('\n🔻 Cerrando servidor gracefulmente...');
  mongoose.connection.close();
  process.exit(0);
});

module.exports = app;
