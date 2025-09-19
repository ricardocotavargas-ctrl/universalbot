const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth');

const app = express();

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://universalbot-frontend.vercel.app',
    'https://universalbot-backend.onrender.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/universalbot')
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba protegida
app.get('/api/protected', require('./middleware/auth'), (req, res) => {
  res.json({ 
    message: 'Esta es una ruta protegida',
    user: req.user 
  });
});

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'UniversalBot Backend está funcionando',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta por defecto
app.get('/', (req, res) => {
  res.json({ 
    message: 'UniversalBot Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        verify: 'GET /api/auth/verify'
      }
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? {} : err.message 
  });
});

// Ruta no encontrada
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Ruta no encontrada',
    path: req.originalUrl 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
});

module.exports = app;
