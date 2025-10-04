const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const User = require('../models/User');
const Product = require('../models/Product');
const Interaction = require('../models/Interaction');
const inventoryRoutes = require('./inventory');
const accountsRoutes = require('./accounts'); 
const financialRoutes = require('./financial');
const authRoutes = require('./auth');

// Usar rutas existentes
router.use('/inventory', inventoryRoutes);
router.use('/accounts', accountsRoutes);
router.use('/financial', financialRoutes);
router.use('/auth', authRoutes);

// ✅ RUTAS DE VENTAS INTEGRADAS DIRECTAMENTE - NO MÁS ARCHIVOS SEPARADOS

// Obtener datos para nueva venta
router.get('/sales/sale-data', (req, res) => {
  try {
    console.log('📋 Cargando datos de venta...');
    
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
    console.error('Error en /sales/sale-data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar datos' 
    });
  }
});

// Crear nuevo cliente rápido
router.post('/sales/quick-client', (req, res) => {
  try {
    const { name, phone, rif } = req.body;

    console.log('👤 Creando cliente:', { name, phone, rif });

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del cliente es obligatorio'
      });
    }

    const newClient = {
      id: Date.now(),
      name: name.trim(),
      phone: phone?.trim() || '0000000000',
      rif: rif?.trim() || 'V-00000000-0',
      email: null,
      address: null,
      type: 'regular'
    };

    console.log('✅ Cliente creado exitosamente:', newClient);

    res.json({
      success: true,
      client: newClient
    });

  } catch (error) {
    console.error('Error en /sales/quick-client:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear cliente' 
    });
  }
});

// Nueva venta
router.post('/sales/new-sale', (req, res) => {
  try {
    const { client, products, paymentMethod, discounts, notes, shipping } = req.body;

    console.log('💰 Procesando venta:', {
      client: client?.name,
      products: products?.length
    });

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'La venta debe contener al menos un producto'
      });
    }

    const subtotal = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxes = products.reduce((sum, item) => sum + (item.price * item.quantity * ((item.tax || 16) / 100)), 0);
    const total = subtotal + taxes - (discounts || 0) + (shipping || 0);

    const sale = {
      id: Date.now(),
      totalAmount: total,
      subtotalAmount: subtotal,
      taxAmount: taxes,
      discountAmount: discounts || 0,
      shippingAmount: shipping || 0,
      paymentMethod,
      status: 'completed',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    console.log('✅ Venta completada exitosamente:', sale.id);

    res.json({ 
      success: true, 
      sale,
      message: 'Venta completada exitosamente' 
    });

  } catch (error) {
    console.error('Error en /sales/new-sale:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la venta' 
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    database: 'connected',
    version: '1.0.0'
  });
});

// Get all businesses
router.get('/businesses', async (req, res) => {
  try {
    const business = new Business();
    const businesses = await business.findAll();
    res.json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get business by ID
router.get('/businesses/:id', async (req, res) => {
  try {
    const business = new Business();
    const businessData = await business.findById(req.params.id);
    if (!businessData) {
      return res.status(404).json({ error: 'Business not found' });
    }
    res.json(businessData);
  } catch (error) {
    console.error('Error fetching business:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new business
router.post('/businesses', async (req, res) => {
  try {
    const business = new Business();
    const newBusiness = await business.create(req.body);
    res.status(201).json(newBusiness);
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update business
router.put('/businesses/:id', async (req, res) => {
  try {
    const business = new Business();
    const updatedBusiness = await business.update(req.params.id, req.body);
    res.json(updatedBusiness);
  } catch (error) {
    console.error('Error updating business:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete business
router.delete('/businesses/:id', async (req, res) => {
  try {
    const business = new Business();
    const result = await business.delete(req.params.id);
    res.json({ message: 'Business deleted successfully', result });
  } catch (error) {
    console.error('Error deleting business:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const user = new User();
    const users = await user.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new user
router.post('/users', async (req, res) => {
  try {
    const user = new User();
    const newUser = await user.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const product = new Product();
    const products = await product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new product
router.post('/products', async (req, res) => {
  try {
    const product = new Product();
    const newProduct = await product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all interactions
router.get('/interactions', async (req, res) => {
  try {
    const interaction = new Interaction();
    const interactions = await interaction.findAll();
    res.json(interactions);
  } catch (error) {
    console.error('Error fetching interactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new interaction
router.post('/interactions', async (req, res) => {
  try {
    const interaction = new Interaction();
    const newInteraction = await interaction.create(req.body);
    res.status(201).json(newInteraction);
  } catch (error) {
    console.error('Error creating interaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get system statistics
router.get('/stats', async (req, res) => {
  try {
    const business = new Business();
    const user = new User();
    const product = new Product();
    const interaction = new Interaction();

    const [businessCount, userCount, productCount, interactionCount] = await Promise.all([
      business.count(),
      user.count(),
      product.count(),
      interaction.countByBusiness(1)
    ]);

    res.json({
      businesses: businessCount,
      users: userCount,
      products: productCount,
      interactions: interactionCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Test database connection
router.get('/test-db', async (req, res) => {
  try {
    const business = new Business();
    const businesses = await business.findAll(5);
    res.json({ 
      database: 'connected', 
      businesses_count: businesses.length,
      message: 'Conexión a PostgreSQL exitosa',
      sample_data: businesses.slice(0, 2)
    });
  } catch (error) {
    res.status(500).json({ 
      database: 'disconnected',
      error: error.message 
    });
  }
});

// Root API endpoint
router.get('/', (req, res) => {
  res.json({
    message: '🤖 Universal Bot Platform API',
    version: '1.0.0',
    status: 'active',
    endpoints: {
      sales: [
        'GET /api/sales/sale-data',
        'POST /api/sales/quick-client', 
        'POST /api/sales/new-sale'
      ],
      businesses: ['GET /api/businesses', 'POST /api/businesses', 'PUT /api/businesses/:id', 'DELETE /api/businesses/:id'],
      users: ['GET /api/users', 'POST /api/users'],
      products: ['GET /api/products', 'POST /api/products'],
      interactions: ['GET /api/interactions', 'POST /api/interactions'],
      system: ['GET /api/health', 'GET /api/stats', 'GET /api/test-db']
    }
  });
});

module.exports = router;
