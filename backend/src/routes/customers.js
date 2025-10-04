const express = require('express');
const router = express.Router();
const { Customer } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Obtener todos los clientes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { businessId } = req.user;
    
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

// Crear nuevo cliente
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { businessId } = req.user;
    const { name, rif, phone, email, address, customerType } = req.body;

    const client = await Customer.create({
      businessId,
      name,
      rif,
      phone,
      email: email || null,
      address: address || null,
      customerType: customerType || 'regular',
      status: 'active'
    });

    res.json({
      success: true,
      client: {
        ...client.toJSON(),
        type: client.customerType
      }
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear cliente' 
    });
  }
});

module.exports = router;
