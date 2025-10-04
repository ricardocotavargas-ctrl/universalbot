const express = require('express');
const router = express.Router();

// Middleware temporal - ELIMINAR cuando tu auth funcione
const authMiddleware = (req, res, next) => {
  // Usuario temporal para pruebas
  req.user = { 
    id: 1, 
    businessId: 1  // ✅ businessId fijo para pruebas
  };
  next();
};

// Obtener datos para nueva venta
router.get('/sale-data', authMiddleware, async (req, res) => {
  try {
    console.log('📋 Cargando datos de venta...');
    
    // Datos de ejemplo - REEMPLAZAR con tu base de datos después
    const clients = [
      {
        id: 1,
        name: 'Cliente General',
        rif: 'V-00000000-0',
        phone: '0000000000',
        email: null,
        address: null,
        type: 'regular'
      }
    ];

    const products = [
      {
        id: 1,
        name: 'Producto Ejemplo 1',
        code: 'PROD-001',
        price: 10.00,
        cost: 5.00,
        stock: 100,
        category: 'General',
        tax: 16,
        barcode: '1234567890123',
        supplier: 'Proveedor Principal',
        minStock: 10
      },
      {
        id: 2,
        name: 'Producto Ejemplo 2',
        code: 'PROD-002',
        price: 15.50,
        cost: 8.00,
        stock: 50,
        category: 'General',
        tax: 16,
        barcode: '1234567890124',
        supplier: 'Proveedor Secundario',
        minStock: 5
      }
    ];

    res.json({
      success: true,
      clients,
      products
    });

  } catch (error) {
    console.error('Error en /sale-data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar datos' 
    });
  }
});

// Crear nuevo cliente rápido
router.post('/quick-client', authMiddleware, async (req, res) => {
  try {
    const { name, phone, rif } = req.body;

    console.log('👤 Creando cliente:', { name, phone, rif });

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del cliente es obligatorio'
      });
    }

    // ✅ CLIENTE TEMPORAL - REEMPLAZAR con tu modelo Customer después
    const newClient = {
      id: Date.now(), // ID temporal único
      name: name.trim(),
      phone: phone?.trim() || '0000000000',
      rif: rif?.trim() || 'V-00000000-0',
      email: null,
      address: null,
      type: 'regular'
    };

    console.log('✅ Cliente creado:', newClient);

    res.json({
      success: true,
      client: newClient
    });

  } catch (error) {
    console.error('Error en /quick-client:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear cliente' 
    });
  }
});

// Nueva venta
router.post('/new-sale', authMiddleware, async (req, res) => {
  try {
    const { client, products, paymentMethod, currency, exchangeRate, discounts, notes, shipping } = req.body;

    console.log('💰 Procesando venta:', {
      client: client?.name,
      products: products?.length,
      total: products?.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'La venta debe contener al menos un producto'
      });
    }

    // Calcular totales
    const subtotal = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxes = products.reduce((sum, item) => sum + (item.price * item.quantity * ((item.tax || 16) / 100)), 0);
    const total = subtotal + taxes - (discounts || 0) + (shipping || 0);

    // ✅ VENTA TEMPORAL - REEMPLAZAR con tu modelo Sale después
    const sale = {
      id: Date.now(),
      totalAmount: total,
      subtotalAmount: subtotal,
      taxAmount: taxes,
      discountAmount: discounts || 0,
      shippingAmount: shipping || 0,
      paymentMethod,
      currency,
      exchangeRate: currency === 'VES' ? exchangeRate : null,
      status: 'completed',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    console.log('✅ Venta completada:', sale.id);

    res.json({ 
      success: true, 
      sale,
      message: 'Venta completada exitosamente' 
    });

  } catch (error) {
    console.error('Error en /new-sale:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la venta' 
    });
  }
});

module.exports = router;
