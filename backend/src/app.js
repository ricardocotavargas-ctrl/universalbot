const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth');

const app = express();

// Configuración COMPLETA de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Lista de dominios permitidos (todos los posibles)
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5000',
      'https://universalbot-frontend.vercel.app',
      'https://universalbot-g2s1y6fj4-ricardos-projects-bad6fbb4.vercel.app',
      'https://universalbot-backend.onrender.com',
      /\.vercel\.app$/,
      /\.render\.com$/
    ];
    
    // Permitir requests sin origin (como Postman, curl) y requests de dominios permitidos
    if (!origin || allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') return origin === pattern;
      if (pattern instanceof RegExp) return pattern.test(origin);
      return false;
    })) {
      callback(null, true);
    } else {
      console.log('CORS bloqueado para origen:', origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Manejar preflight requests para todas las rutas
app.options('*', cors(corsOptions));

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/universalbot', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

connectDB();

// --- MIDDLEWARE DE LOGGING --- //
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// --- RUTAS PRINCIPALES --- //

// Ruta de salud - PRIMERA RUTA
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'UniversalBot Backend está funcionando',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    baseUrl: req.protocol + '://' + req.get('host')
  });
});

// Ruta principal de API
app.get('/api', (req, res) => {
  res.json({ 
    message: 'UniversalBot Backend API 🚀',
    version: '1.0.0',
    baseUrl: req.protocol + '://' + req.get('host') + '/api',
    endpoints: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        verify: 'GET /api/auth/verify'
      },
      protected: 'GET /api/protected (requires auth)'
    },
    documentation: 'Visita /api para esta información'
  });
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta de prueba protegida
app.get('/api/protected', require('./middleware/auth'), (req, res) => {
  res.json({ 
    message: '✅ Esta es una ruta protegida',
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name
    },
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz - redireccionar a /api
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a UniversalBot Backend',
    redirect: 'Visita /api para la documentación completa',
    endpoints: {
      api: '/api',
      health: '/api/health',
      auth: '/api/auth'
    }
  });
});

// --- MANEJO DE ERRORES --- //

// Manejo de errores de CORS
app.use((err, req, res, next) => {
  if (err.message === 'No permitido por CORS') {
    return res.status(403).json({ 
      message: 'Acceso no permitido por política CORS',
      error: 'Origin not allowed',
      yourOrigin: req.get('origin'),
      allowedOrigins: [
        'http://localhost:3000',
        'http://localhost:3001', 
        'https://universalbot-frontend.vercel.app',
        'https://universalbot-backend.onrender.com'
      ]
    });
  }
  next(err);
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? {} : err.message,
    path: req.originalUrl
  });
});

// Ruta no encontrada (DEBE ser la última)
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: '🔍 Ruta no encontrada',
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      'GET /',
      'GET /api',
      'GET /api/health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/verify',
      'GET /api/protected'
    ],
    tip: 'Visita /api para ver todos los endpoints disponibles'
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(50));
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Local: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log('='.repeat(50));
  
  // Log de las rutas disponibles
  console.log('📋 Endpoints disponibles:');
  console.log('   GET  /              - Página de inicio');
  console.log('   GET  /api           - Documentación API');
  console.log('   GET  /api/health    - Health check');
  console.log('   POST /api/auth/login - Login de usuario');
  console.log('   POST /api/auth/register - Registro de usuario');
  console.log('   GET  /api/protected  - Ruta protegida (necesita auth)');
});

module.exports = app;
