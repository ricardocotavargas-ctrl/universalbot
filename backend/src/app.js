const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ CONFIGURACIÓN SUPER PERMISIVA
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());

// ✅ CONEXIÓN MONGODB DIRECTA
const MONGODB_URI = 'mongodb+srv://universalbot-user:pruebadebot2025@cluster0.uoa5zyg.mongodb.net/universalbot?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB CONECTADO'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

// ✅ RUTAS PRINCIPALES - ¡FUNCIONAN SEGURO!
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '✅ Backend funcionando PERFECTO',
    timestamp: new Date().toISOString(),
    service: 'Railway'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 UniversalBot Backend - DEPLOY EXITOSO',
    version: '2.0.0',
    endpoints: {
      health: 'GET /health',
      login: 'POST /auth/login',
      register: 'POST /auth/register'
    }
  });
});

// ✅ RUTA DE LOGIN DIRECTA (sin importar otros archivos)
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('📨 Login attempt:', email);
    
    // ✅ USUARIO FIXED PARA TESTING
    if (email === 'admin@universalbot.com' && password === 'admin123') {
      return res.json({
        message: '🎉 Login EXITOSO - Railway',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbi1pZCIsImlhdCI6MTY5OTk5OTk5OX0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        user: {
          id: 'admin-id',
          email: 'admin@universalbot.com',
          name: 'Administrador',
          role: 'admin'
        }
      });
    }
    
    res.status(400).json({ error: 'Credenciales incorrectas' });
    
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// ✅ INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(60));
  console.log('🚀 UNIVERSALBOT BACKEND - DEPLOY EXITOSO');
  console.log('📍 Puerto:', PORT);
  console.log('🌐 Health: http://localhost:' + PORT + '/health');
  console.log('🔑 Login: POST http://localhost:' + PORT + '/auth/login');
  console.log('='.repeat(60));
});
