const express = require('express');
const router = express.Router();

// Middleware temporal
const authMiddleware = (req, res, next) => {
  req.user = { id: 1, businessId: 1 };
  next();
};

// Obtener todos los clientes
router.get('/', authMiddleware, async (req, res) => {
  try {
    const clients = [
      {
        id: 1,
        name: 'Cliente General',
        rif: 'V-00000000-0',
        phone: '0000000000',
        email: null,
        address: null,
        customerType: 'regular',
        createdAt: new Date().toISOString()
      }
    ];

    res.json({
      success: true,
      clients
    });

  } catch (error) {
    console.error('Error en /customers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar clientes' 
    });
  }
});

module.exports = router;
