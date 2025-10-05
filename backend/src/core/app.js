// backend/src/core/app.js - VERSIÓN COMPLETA Y CORREGIDA
require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// ✅ MIDDLEWARES DIRECTAMENTE AQUÍ
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ✅ IMPORTAR Y MONTAR RUTAS DIRECTAMENTE
const apiRoutes = require('../routes/api');
const authRoutes = require('../routes/auth');
const adminRoutes = require('../routes/admin');
const webhookRoutes = require('../routes/webhook');
const businessRoutes = require('../routes/business');
const uploadRoutes = require('../routes/upload');

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/webhook', webhookRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));

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
      api: '/api',
      auth: '/auth',
      admin: '/admin', 
      webhook: '/webhook',
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
      'GET /api',
      'GET /api/debug',
      'GET /api/sales/sale-data',
      'POST /api/sales/quick-client',
      'POST /api/sales/new-sale',
      'POST /auth/login',
      'POST /auth/register',
      'GET /auth/protected'
    ],
    timestamp: new Date().toISOString()
  });
});

// ✅ CREAR SERVIDOR HTTP CON LA APP EXPRESS
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

// Exporta io para usarlo en otras partes
app.io = io;

async function startServer() {
  try {
    console.log('🔄 Iniciando Universal Bot Platform...');
    console.log('✅ Rutas cargadas:');
    console.log('   - GET  /api/sales/sale-data');
    console.log('   - POST /api/sales/quick-client');
    console.log('   - POST /api/sales/new-sale');
    console.log('   - GET  /api/debug');

    // Iniciar servidor HTTP (con WebSockets)
    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Servidor backend ejecutándose en: http://localhost:${PORT}`);
      console.log(`✅ Health check: http://localhost:${PORT}/health`);
      console.log(`✅ Debug: http://localhost:${PORT}/api/debug`);
      console.log(`✅ Ventas: http://localhost:${PORT}/api/sales/sale-data`);
      console.log(`✅ WebSockets habilitados en: ws://localhost:${PORT}`);
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
