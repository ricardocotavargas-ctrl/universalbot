// src/middleware/security.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});

// Security headers
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      fontSrc: ["'self'", "https:", "data:"],
      scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:"],
      frameSrc: ["'self'", "https:"]
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginResourcePolicy: { policy: "cross-origin" }
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:3001'
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// SQL injection protection
const sqlInjectionProtection = (req, res, next) => {
  const sqlKeywords = [
    'SELECT', 'INSERT', 'DELETE', 'UPDATE', 'DROP', 'UNION', 'OR', 'AND',
    'WHERE', 'FROM', 'TABLE', 'DATABASE', 'SCRIPT', 'ALTER', 'CREATE'
  ];
  
  const checkObject = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        checkObject(obj[key]);
      } else if (typeof obj[key] === 'string') {
        const value = obj[key].toUpperCase();
        if (sqlKeywords.some(keyword => value.includes(keyword))) {
          throw new Error('Potential SQL injection detected');
        }
      }
    }
  };

  try {
    checkObject(req.body);
    checkObject(req.query);
    checkObject(req.params);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

// Request logging for security monitoring
const securityLogger = (req, res, next) => {
  const securityEvents = [];
  
  // Check for suspicious activity
  if (req.body.password || req.body.token) {
    securityEvents.push('SENSITIVE_DATA_IN_BODY');
  }
  
  if (req.headers['user-agent'] && req.headers['user-agent'].length > 255) {
    securityEvents.push('SUSPICIOUS_USER_AGENT');
  }
  
  if (securityEvents.length > 0) {
    console.warn('Security events detected:', {
      ip: req.ip,
      url: req.originalUrl,
      events: securityEvents,
      timestamp: new Date().toISOString()
    });
  }
  
  next();
};

module.exports = {
  limiter,
  securityHeaders,
  corsOptions,
  xss: xss(),
  hpp: hpp(),
  sqlInjectionProtection,
  securityLogger,
  cors: cors(corsOptions)
};