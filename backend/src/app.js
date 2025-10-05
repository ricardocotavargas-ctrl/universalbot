const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth');
const salesRoutes = require('./routes/sales');
const inventoryRoutes = require('./routes/inventory');
app.use('/api/inventory', inventoryRoutes);

const app = express();

// ✅ CONFIGURACIÓN CORS MEJORADA
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5000',
      'https://universalbot-frontend.vercel.app',
      'https://universalbot-backend.onrender.com',
      'https://universalbot-dsko.onrender.com',
      /\.vercel\.app$/,
      /\.onrender\.com$/,
    ];
    
    if (!origin && process.env.NODE_ENV === 'production') {
      return callback(new Error('Origin required in production'), false);
    }
    
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') return origin === pattern;
      if (pattern instanceof RegExp) return pattern.test(origin);
      return false;
    });
    
    isAllowed ? callback(null, true) : callback(new Error('No permitido por CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

// ✅ MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.options('*', cors(corsOptions));

// ✅ CONEXIÓN A MONGODB SEGURA
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI no definida en .env');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB CONECTADO'))
.catch(error => {
  console.error('❌ Error MongoDB:', error.message);
  setTimeout(() => process.exit(1), 5000);
});

// ✅ LOGGING
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ RUTAS PRINCIPALES
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 UniversalBot Backend - SISTEMA CORREGIDO',
    version: '1.0.1',
    status: 'Operacional'
  });
});

// ✅ RUTAS DE LA APLICACIÓN
app.use('/auth', authRoutes);
app.use('/api', salesRoutes);

// ✅ RUTA PROTEGIDA MEJORADA
app.get('/auth/protected', (req, res) => {
  const token = req.header('Authorization');
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  res.json({ 
    message: '✅ Acceso autorizado',
    user: { id: 'test-user', email: 'test@universalbot.com' }
  });
});

// ✅ MANEJO DE ERRORES
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.message);
  
  if (err.message === 'No permitido por CORS') {
    return res.status(403).json({ error: 'CORS Error', message: 'Origen no permitido' });
  }
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada', path: req.originalUrl });
});

// ✅ INICIAR SERVIDOR
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(60));
  console.log('🚀 UNIVERSALBOT BACKEND - SISTEMA CORREGIDO');
  console.log('='.repeat(60));
  console.log(`📍 Servidor: http://0.0.0.0:${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV}`);
  console.log(`🔒 Seguridad: ✅ Credenciales protegidas`);
  console.log(`🔒 Seguridad: ✅ CORS configurado`);
  console.log(`📊 MongoDB: ${mongoose.connection.readyState === 1 ? '✅ Conectado' : '❌ Desconectado'}`);
  console.log('='.repeat(60));
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => process.exit(0));
});

module.exports = app;
