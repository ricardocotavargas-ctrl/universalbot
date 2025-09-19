// src/core/app.js - Punto de entrada principal CORREGIDO
require('dotenv').config();
const { createServer } = require('http');
const { Server } = require('socket.io');
const createExpressServer = require('./server'); // ← Renombrado para evitar conflicto
const { pool, testConnection, initializeDatabase } = require('./database');

const app = createExpressServer(); // ← Usar el servidor Express
const httpServer = createServer(app); // ← Crear servidor HTTP
const io = new Server(httpServer, { // ← Configurar Socket.IO
  cors: {
    origin: "http://localhost:3001",
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
    
    // 1. Probar conexión a la base de datos
    console.log('🔄 Conectando a la base de datos...');
    const dbConnected = await testConnection();
    if (!dbConnected) {
      throw new Error('❌ No se pudo conectar a la base de datos');
    }
    console.log('✅ Base de datos conectada');

    // 2. Inicializar tablas si es necesario
    console.log('🔄 Inicializando base de datos...');
    const dbInitialized = await initializeDatabase();
    if (!dbInitialized) {
      console.warn('⚠️ La inicialización de la base de datos tuvo problemas');
    } else {
      console.log('✅ Base de datos inicializada');
    }

    // 3. Iniciar servidor HTTP (con WebSockets)
    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Servidor backend ejecutándose en: http://localhost:${PORT}`);
      console.log(`✅ Health check: http://localhost:${PORT}/health`);
      console.log(`✅ Webhook WhatsApp: http://localhost:${PORT}/webhook/whatsapp`);
      console.log(`✅ WebSockets habilitados en: ws://localhost:${PORT}`);
      console.log(`📊 Panel admin: http://localhost:3001 (Frontend React)`);
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
    pool.end(() => {
      console.log('✅ Conexiones de base de datos cerradas');
      process.exit(0);
    });
  });
});

// Iniciar la aplicación
startServer();

module.exports = app;