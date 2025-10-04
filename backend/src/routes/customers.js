const express = require('express');
const router = express.Router();
const { Customer } = require('../models');

// Middleware de autenticación simple
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Token requerido' });
    }
    
    // Aquí iría la verificación real del token
    // Por ahora asumimos que el token es válido
    req.user = { id: 1, businessId: 1 }; // Temporal - reemplazar con verificación real
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Error de autenticación' });
  }
};

// Obtener todos los clientes
router.get('/', authMiddleware, async (req, res) => {
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

// Crear nuevo cliente
router.post('/', authMiddleware, async (req, res) => {
  try {
    const businessId = req.user.businessId;
    const { name, rif, phone, email, address, customerType } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del cliente es obligatorio'
      });
    }

    const client = await Customer.create({
      businessId,
      name: name.trim(),
      rif: rif?.trim() || null,
      phone: phone?.trim() || null,
      email: email?.trim() || null,
      address: address?.trim() || null,
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
      message: 'Error al crear cliente: ' + error.message 
    });
  }
});

module.exports = router;
