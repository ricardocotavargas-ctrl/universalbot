const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// REGISTRO DE USUARIOS
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, businessName } = req.body;

    // Validaciones básicas
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password y nombre son requeridos' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'La password debe tener al menos 6 caracteres' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    const user = new User({ email, password, name, businessName });
    await user.save();

    // Generar token JWT
    const token = jwt.sign(
      { userId: user._id },
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
        businessName: user.businessName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// LOGIN DE USUARIOS
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y password son requeridos' });
    }

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user._id },
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
        businessName: user.businessName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// VERIFICAR TOKEN
router.get('/verify', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ valid: false, message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ valid: false, message: 'Usuario no encontrado' });
    }

    res.json({ valid: true, user });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Token inválido' });
  }
});

module.exports = router;
