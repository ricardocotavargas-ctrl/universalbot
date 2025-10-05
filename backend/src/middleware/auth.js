// backend/src/middleware/auth.js - VERSIÓN CORREGIDA
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Acceso denegado. Token no proporcionado.',
        code: 'MISSING_TOKEN'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Token inválido. Usuario no encontrado.',
        code: 'USER_NOT_FOUND'
      });
    }

    // ✅ VERIFICACIÓN CRÍTICA: User DEBE tener businessId
    if (!user.businessId) {
      return res.status(403).json({
        success: false,
        message: 'Usuario no asociado a un negocio. Contacte al administrador.',
        code: 'NO_BUSINESS_ASSOCIATED'
      });
    }

    // ✅ INYECTAR user COMPLETO con businessId
    req.user = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      businessId: user.businessId,  // ✅ BUSINESS ID REAL
      isActive: user.isActive
    };

    console.log('🔐 Usuario autenticado:', {
      userId: user._id,
      businessId: user.businessId,
      email: user.email,
      role: user.role
    });

    next();
  } catch (error) {
    console.error('❌ Error en autenticación:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido.',
        code: 'INVALID_TOKEN'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado.',
        code: 'TOKEN_EXPIRED'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error en autenticación.',
      code: 'AUTH_ERROR'
    });
  }
};

module.exports = authMiddleware;
