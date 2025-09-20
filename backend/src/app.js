const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅✅✅ CORS CONFIGURADO CORRECTAMENTE
app.use(cors({
  origin: '*', // Permitir todos los orígenes
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Manejar preflight requests
app.options('*', cors());

app.use(express.json());

// ✅ CONEXIÓN MONGODB
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/universalbot')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de MongoDB:', err));

// ✅✅✅ RUTAS PRINCIPALES (ACCESIBLES DESDE LA RAIZ)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API健康检查成功',
    timestamp: new Date().toISOString()
  });
});

// ✅✅✅ RUTAS DE AUTENTICACIÓN
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simulación de login exitoso - MÁS ADELANTE CONECTAREMOS CON MONGODB
    const user = {
      id: '1',
      email: 'admin@universalbot.com',
      name: 'Administrador',
      role: 'admin',
      businessName: 'Mi Empresa'
    };

    const token = 'jwt-simulado-' + Date.now();

    res.json({
      message: '✅ Login exitoso',
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name, businessName } = req.body;

    // Simulación de registro exitoso
    const user = {
      id: '2',
      email: email,
      name: name,
      role: 'user',
      businessName: businessName || 'Mi Empresa'
    };

    const token = 'jwt-simulado-' + Date.now();

    res.status(201).json({
      message: '✅ Usuario registrado exitosamente',
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// ✅✅✅ RUTA DE VERIFICACIÓN
app.get('/auth/verify', (req, res) => {
  res.json({ 
    valid: true, 
    user: {
      id: '1',
      email: 'admin@universalbot.com',
      name: 'Administrador',
      role: 'admin'
    }
  });
});

// ✅✅✅ INICIAR SERVIDOR
const PORT = process.env.PORT || 10000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log('='.repeat(60));
  console.log('🚀 BACKEND UNIVERSALBOT INICIADO');
  console.log('='.repeat(60));
  console.log(`📍 Servidor: http://${HOST}:${PORT}`);
  console.log(`🌐 Health:   http://${HOST}:${PORT}/health`);
  console.log(`🔐 Login:    POST http://${HOST}:${PORT}/auth/login`);
  console.log(`📊 MongoDB:  ${mongoose.connection.readyState === 1 ? '✅ Conectado' : '❌ Desconectado'}`);
  console.log('='.repeat(60));
});

module.exports = app;
