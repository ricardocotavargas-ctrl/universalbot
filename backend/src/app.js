const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth');

const app = express();

// ✅ CONFIGURACIÓN CORS COMPLETA Y PERMISIVA
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://universalbot-frontend.vercel.app',
  'https://universalbot-backend.onrender.com',
  'https://universalbot-dsko.onrender.com',
  /\.vercel\.app$/,
  /\.onrender\.com$/
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Verificar si el origen está permitido
    const isAllowed = allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') {
        return origin === pattern;
      }
      if (pattern instanceof RegExp) {
        return pattern.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('🚫 CORS bloqueado para origen:', origin);
      callback(new Error('No permitido por política CORS'));
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
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials'
  ],
  optionsSuccessStatus: 200,
  maxAge: 86400, // 24 horas
  preflightContinue: false
};

// ✅ MIDDLEWARES ESENCIALES
app.use(cors(corsOptions)); // ✅ CORS debe ir PRIMERO

// Manejar preflight requests para TODAS las rutas
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ CONEXIÓN A MONGODB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://universalbot-user:pruebadebot2025@cluster0.uoa5zyg.mongodb.net/universalbot?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB CONECTADO exitosamente');
})
.catch((error) => {
  console.error('❌ Error conectando a MongoDB:', error.message);
});

// ✅ MIDDLEWARE DE LOGGING
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Origin: ${req.get('origin') || 'No origin'}`);
  next();
});

// ✅ RUTAS
app.use('/auth', authRoutes);

// ✅ RUTA DE SALUD
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '✅ Backend funcionando PERFECTO',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'
  });
});

// ✅ RUTA PRINCIPAL
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 UniversalBot Backend API',
    version: '1.0.0',
    status: 'Operacional',
    cors: {
      enabled: true,
      allowed_origins: allowedOrigins
    }
  });
});

// ✅ MANEJO DE ERRORES CORS
app.use((err, req, res, next) => {
  if (err.message === 'No permitido por política CORS') {
    return res.status(403).json({
      error: 'CORS Error',
      message: 'Origen no permitido',
      your_origin: req.get('origin'),
      allowed_origins: allowedOrigins
    });
  }
  next(err);
});

// ✅ MANEJO DE ERRORES GENERALES
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong'
  });
});

// ✅ RUTA NO ENCONTRADA
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
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
  console.log(`🎯 CORS:     ✅ Habilitado para Vercel y Render`);
  console.log('='.repeat(60));
});

module.exports = app;
