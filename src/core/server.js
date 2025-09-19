const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const uploadRoutes = require('../routes/upload');
const { tenantMiddleware } = require('../middleware/tenant');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');

const createServer = () => {
  const app = express();

   // Seguridad
  app.use(helmet());
  app.use(compression());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));
  
  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/upload', uploadRoutes);
  app.use('/uploads', express.static('uploads'));
  app.use('/api/tenant/:tenantId/*', tenantMiddleware);

  // Import routes
  const apiRoutes = require('../routes/api');
  const authRoutes = require('../routes/auth');
  const adminRoutes = require('../routes/admin');
  const webhookRoutes = require('../routes/webhook');
  const businessRoutes = require('../routes/business');

  // Use routes
  app.use('/api', apiRoutes);
  app.use('/auth', authRoutes);
  app.use('/admin', adminRoutes);
  app.use('/webhook', webhookRoutes);
  app.use('/api/business', businessRoutes);
  app.use('/uploads', express.static('uploads'));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      message: 'Server is running',
      timestamp: new Date().toISOString()
    });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });

  // Error handler
  app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
};

module.exports = createServer;