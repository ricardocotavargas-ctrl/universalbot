const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const uploadRoutes = require('../routes/upload');
const { tenantMiddleware } = require('../middleware/tenant');

const createServer = () => {
  const app = express();

  // ✅ CORREGIDO: Eliminar helmet duplicado
  // Seguridad
  app.use(helmet());
  app.use(compression());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));
  
  // Middleware
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // ✅ CORREGIDO: Montar rutas estáticas primero
  app.use('/uploads', express.static('uploads'));

  // ✅ CORREGIDO: Importar y montar todas las rutas
  const apiRoutes = require('../routes/api');
  const authRoutes = require('../routes/auth');
  const adminRoutes = require('../routes/admin');
  const webhookRoutes = require('../routes/webhook');
  const businessRoutes = require('../routes/business');

  // ✅ CORREGIDO: Montar rutas en el orden correcto
  app.use('/api', apiRoutes);        // ← Esto hace que /api/sales funcione
  app.use('/auth', authRoutes);
  app.use('/admin', adminRoutes);
  app.use('/webhook', webhookRoutes);
  app.use('/api/business', businessRoutes);
  app.use('/api/upload', uploadRoutes);
  
  // Middleware de tenant para rutas específicas
  app.use('/api/tenant/:tenantId/*', tenantMiddleware);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: '1.0.0'
    });
  });

  // Root endpoint
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

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ 
      error: 'Ruta no encontrada',
      path: req.originalUrl,
      method: req.method,
      available_routes: [
        'GET /',
        'GET /health', 
        'GET /api',
        'POST /auth/login',
        'POST /auth/register',
        'GET /auth/protected',
        'GET /api/sales/sale-data',
        'POST /api/sales/quick-client',
        'POST /api/sales/new-sale'
      ],
      timestamp: new Date().toISOString()
    });
  });

  // Error handler
  app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  });

  return app;
};

module.exports = createServer;
