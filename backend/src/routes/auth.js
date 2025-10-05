// backend/src/routes/auth.js - VERSIÓN CORREGIDA
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Business = require('../models/Business');

const router = express.Router();

// ✅ REGISTRO CORREGIDO - CREA BUSINESS AUTOMÁTICAMENTE
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, businessName, rif, phone, industry } = req.body;
    
    // Validaciones mejoradas
    if (!email || !email.trim() || !password || !name || !name.trim()) {
      return res.status(400).json({ 
        success: false,
        error: 'Email, password y nombre son requeridos',
        code: 'MISSING_REQUIRED_FIELDS'
      });
    }

    if (!businessName || !businessName.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Nombre del negocio es requerido',
        code: 'MISSING_BUSINESS_NAME'
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: 'El usuario ya existe',
        code: 'USER_ALREADY_EXISTS'
      });
    }

    // ✅ CREAR BUSINESS PRIMERO
    const business = new Business({
      name: businessName.trim(),
      rif: rif?.trim() || `J-${Date.now()}`,
      phone: phone?.trim() || '',
      email: email.trim().toLowerCase(),
      industry: industry?.trim() || 'general',
      status: 'active'
    });

    await business.save();
    console.log('✅ Negocio creado:', business._id);

    // ✅ CREAR USER CON BUSINESS ID REAL
    const user = new User({ 
      email: email.trim().toLowerCase(), 
      password, 
      name: name.trim(),
      businessId: business._id,  // ✅ ASIGNAR BUSINESS ID REAL
      role: 'admin'  // Primer usuario es admin
    });

    await user.save();
    console.log('✅ Usuario creado con businessId:', user.businessId);

    // Generar token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuario y negocio registrados exitosamente',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        businessId: user.businessId
      },
      business: {
        id: business._id,
        name: business.name,
        rif: business.rif
      },
      code: 'REGISTER_SUCCESS'
    });

  } catch (error) {
    console.error('❌ Error en registro:', error);
    
    // Limpiar business creado si falla el usuario
    if (business && business._id) {
      await Business.findByIdAndDelete(business._id);
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Error en el servidor al registrar usuario',
      code: 'REGISTRATION_ERROR'
    });
  }
});

// ✅ LOGIN CORREGIDO
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !email.trim() || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email y password requeridos',
        code: 'MISSING_CREDENTIALS'
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        error: 'Credenciales inválidas',
        code: 'INVALID_CREDENTIALS'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        error: 'Credenciales inválidas',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // ✅ VERIFICAR QUE TENGA BUSINESS ID
    if (!user.businessId) {
      return res.status(403).json({
        success: false,
        error: 'Usuario no asociado a un negocio',
        code: 'NO_BUSINESS_ASSOCIATED'
      });
    }

    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        businessId: user.businessId
      },
      code: 'LOGIN_SUCCESS'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error en el servidor',
      code: 'SERVER_ERROR'
    });
  }
});

module.exports = router;
