const express = require('express');
const router = express.Router();
const { Customer } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Obtener todos los clientes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const businessId = req.user.businessId;
    
    console.log('🔍 Obteniendo clientes para business:', businessId);

    const clients = await Customer.findAll({
      where: { businessId },
      attributes: ['id', 'name', 'rif', 'phone', 'email', 'address', 'customerType', 'createdAt'],
      order: [['name', 'ASC']]
    });

    console.log(`✅ Clientes obtenidos: ${clients.length}`);

    res.json({
      success: true,
      clients
    });

  } catch (error) {
    console.error('❌ Error en /customers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar clientes: ' + error.message 
    });
  }
});

module.exports = router;
