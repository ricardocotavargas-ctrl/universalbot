const express = require('express');
const router = express.Router();
const { Customer } = require('../models');

// ✅ USAR TU MIDDLEWARE DE AUTH EXISTENTE
const { authenticateToken } = require('../middleware/auth');

// Obtener todos los clientes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const businessId = req.user.businessId;
    
    const clients = await Customer.findAll({
      where: { businessId },
      attributes: ['id', 'name', 'rif', 'phone', 'email', 'address', 'customerType', 'createdAt'],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      clients
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar clientes' 
    });
  }
});

module.exports = router;
