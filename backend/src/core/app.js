// backend/src/core/app.js - VERSIÓN COMPLETA Y CORREGIDA
require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// ✅ MIDDLEWARES
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ✅ IMPORTAR RUTAS
const authRoutes = require('../routes/auth');
const salesRoutes = require('../routes/sales'); // ← NUEVA RUTA DE VENTAS

// ✅ MONTAR RUTAS
app.use('/auth', authRoutes);
app.use('/api', salesRoutes); // ← ESTA LÍNEA ES CLAVE

// ✅ HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    database: 'connected',
    version: '1.0.0'
  });
});

// ✅ ROOT ENDPOINT
app.get('/', (req, res) => {
  res.json({
    message: '🤖 Universal Bot Platform API',
    version: '1.0.0',
    status: 'active',
    endpoints: {
      auth: '/auth',
      sales: '/api/sales',
      health: '/health'
    }
  });
});

// ✅ 404 HANDLER MEJORADO
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method,
    available_routes: [
      'GET /',
      'GET /health', 
      'GET /api/debug',
      'GET /api/sales/sale-data',
      'POST /api/sales/quick-client',
      'POST /api/sales/new-sale',
      'POST /auth/login',
      'POST /auth/register'
    ],
    timestamp: new Date().toISOString()
  });
});

// ✅ CREAR SERVIDOR HTTP
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('🔌 Cliente conectado:', socket.id);
  socket.on('join-business', (businessId) => {
    socket.join(`business-${businessId}`);
    console.log(`📊 Cliente ${socket.id} unido a business-${businessId}`);
  });
  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

app.io = io;

async function startServer() {
  try {
    console.log('🔄 Iniciando Universal Bot Platform...');
    console.log('✅ Rutas cargadas:');
    console.log('   - GET  /api/debug');
    console.log('   - GET  /api/sales/sale-data');
    console.log('   - POST /api/sales/quick-client');
    console.log('   - POST /api/sales/new-sale');
    console.log('   - POST /auth/login');
    console.log('   - POST /auth/register');

    // Iniciar servidor HTTP
    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Servidor backend ejecutándose en puerto: ${PORT}`);
      console.log(`✅ Health check: https://universalbot-dsko.onrender.com/health`);
      console.log(`✅ Ventas: https://universalbot-dsko.onrender.com/api/sales/sale-data`);
    });

  } catch (error) {
    console.error('❌ Error iniciando el servidor:', error.message);
    process.exit(1);
  }
}

// Manejar cierre graceful
process.on('SIGINT', () => {
  console.log('\n🛑 Apagando servidor...');
  httpServer.close(() => {
    console.log('✅ Servidor HTTP cerrado');
    process.exit(0);
  });
});

// Iniciar la aplicación
startServer();

module.exports = app;
