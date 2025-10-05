const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ✅ LOGIN MEJORADO
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validaciones mejoradas
    if (!email || !email.trim() || !password) {
      return res.status(400).json({ 
        error: 'Email y password requeridos',
        code: 'MISSING_CREDENTIALS'
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ 
        error: 'Credenciales inválidas',
        code: 'INVALID_CREDENTIALS'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ 
        error: 'Credenciales inválidas',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // JWT seguro
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      code: 'LOGIN_SUCCESS'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Error en el servidor',
      code: 'SERVER_ERROR'
    });
  }
});

// ✅ REGISTRO MEJORADO
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !email.trim() || !password || !name || !name.trim()) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos',
        code: 'MISSING_FIELDS'
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ 
        error: 'Formato de email inválido',
        code: 'INVALID_EMAIL'
      });
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'El usuario ya existe',
        code: 'USER_EXISTS'
      });
    }

    const user = new User({ 
      email: email.trim().toLowerCase(), 
      password, 
      name: name.trim() 
    });
    await user.save();

    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      code: 'REGISTER_SUCCESS'
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      error: 'Error en el servidor',
      code: 'SERVER_ERROR'
    });
  }
});

// ✅ RUTA DE VERIFICACIÓN DE TOKEN
router.get('/verify', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token requerido',
        code: 'TOKEN_REQUIRED'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Usuario no encontrado',
        code: 'USER_NOT_FOUND'
      });
    }

    res.json({
      valid: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      code: 'TOKEN_VALID'
    });

  } catch (error) {
    res.status(401).json({ 
      error: 'Token inválido',
      code: 'INVALID_TOKEN'
    });
  }
});

module.exports = router;
