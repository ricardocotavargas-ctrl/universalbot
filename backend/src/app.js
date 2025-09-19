const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// ✅ CONFIGURACIÓN CORS PERMISIVA PARA PRODUCCIÓN
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());

// ✅ CONEXIÓN MONGODB CON RECONEXIÓN
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://universalbot-user:pruebadebot2025@cluster0.uoa5zyg.mongodb.net/universalbot?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB CONECTADO'))
  .catch(err => {
    console.error('❌ Error MongoDB:', err.message);
    process.exit(1);
  });

// ✅ MIDDLEWARE DE LOGGING
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ✅ RUTAS PRINCIPALES - SIN PREFIJO /api
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'UniversalBot Backend 🚀',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      login: 'POST /auth/login',
      register: 'POST /auth/register',
      verify: 'GET /auth/verify'
    }
  });
});

// ✅ RUTAS DE AUTH
app.use('/auth', authRoutes);

// ✅ MANEJO DE ERRORES
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ✅ INICIAR SERVIDOR
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`📍 Local: http://localhost:${PORT}`);
});
