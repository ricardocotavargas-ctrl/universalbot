const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth');

const app = express();

// Configuración COMPLETA de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Lista de dominios permitidos
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://universalbot-frontend.vercel.app',
      'https://universalbot-g2s1y6fj4-ricardos-projects-bad6fbb4.vercel.app',
      'https://universalbot-backend.onrender.com',
      'https://universalbot-frontend.vercel.app'
    ];
    
    // Permitir requests sin origin (como Postman, curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS bloqueado para origen:', origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Manejar preflight requests
app.options('*', cors(corsOptions));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/universalbot')
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// --- RUTAS PRINCIPALES --- //

// Ruta de salud - DEBE estar antes de otras rutas
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'UniversalBot Backend está funcionando',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta de prueba protegida
app.get('/api/protected', require('./middleware/auth'), (req, res) => {
  res.json({ 
    message: 'Esta es una ruta protegida',
    user: req.user 
  });
});

// Ruta por defecto para API
app.get('/api', (req, res) => {
  res.json({ 
    message: 'UniversalBot Backend API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        verify: 'GET /api/auth/verify'
      },
      protected: 'GET /api/protected (requires auth)'
    }
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.redirect('/api');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  if (err.message === 'No permitido por CORS') {
    return res.status(403).json({ 
      message: 'Acceso no permitido',
      error: 'CORS policy violation'
    });
  }
  
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? {} : err.message 
  });
});

// Ruta no encontrada (DEBE ser la última)
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Ruta no encontrada',
    path: req.originalUrl,
    availableRoutes: [
      'GET /api',
      'GET /api/health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/verify',
      'GET /api/protected'
    ]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log(`🎯 CORS habilitado para múltiples dominios`);
});

module.exports = app;
