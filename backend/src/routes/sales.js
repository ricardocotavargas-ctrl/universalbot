// backend/src/routes/sales.js - ARCHIVO NUEVO
const express = require('express');
const router = express.Router();

// ✅ RUTAS DE VENTAS
router.get('/debug', (req, res) => {
  res.json({ 
    message: '✅ RUTAS DE VENTAS FUNCIONANDO',
    timestamp: new Date().toISOString()
  });
});

router.get('/sales/sale-data', (req, res) => {
  console.log('✅ Ruta /api/sales/sale-data llamada');
  res.json({
    success: true,
    clients: [
      { id: 1, name: 'Cliente General', rif: 'V-00000000', phone: '0000000000', type: 'regular' }
    ],
    products: [
      { id: 1, name: 'Producto Ejemplo', code: 'PROD-001', price: 10.00, stock: 100, category: 'General', tax: 16 }
    ]
  });
});

router.post('/sales/quick-client', (req, res) => {
  console.log('✅ Ruta /api/sales/quick-client llamada:', req.body);
  res.json({
    success: true,
    client: { 
      id: Date.now(), 
      name: req.body.name, 
      phone: req.body.phone || '0000000000', 
      rif: req.body.rif || 'V-00000000',
      type: 'regular'
    }
  });
});

router.post('/sales/new-sale', (req, res) => {
  console.log('✅ Ruta /api/sales/new-sale llamada:', req.body);
  res.json({
    success: true,
    sale: { id: Date.now(), totalAmount: 100 },
    message: 'Venta completada exitosamente'
  });
});

module.exports = router;
