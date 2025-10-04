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

// ✅ AGREGAR IMPORTACIONES MONGODB
const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const Sale = require('../models/Sale');
const SaleProduct = require('../models/SaleProduct');

// Usar rutas existentes
router.use('/inventory', inventoryRoutes);
router.use('/accounts', accountsRoutes);
router.use('/financial', financialRoutes);
router.use('/auth', authRoutes);

// ✅ RUTAS MONGODB REALES PARA VENTAS

// Obtener datos para nueva venta - MONGODB REAL
router.get('/sales/sale-data', async (req, res) => {
  try {
    console.log('📋 Cargando datos de venta desde MongoDB...');
    
    // Usar businessId temporal para pruebas - reemplazar con req.user.businessId cuando el auth funcione
    const businessId = '000000000000000000000001';

    const [clients, products] = await Promise.all([
      Customer.find({ businessId }).lean(),
      Product.find({ businessId, active: true }).lean()
    ]);

    console.log(`✅ Datos cargados: ${clients.length} clientes, ${products.length} productos`);

    res.json({
      success: true,
      clients: clients.map(client => ({
        id: client._id,
        name: client.name,
        rif: client.rif,
        phone: client.phone,
        email: client.email,
        address: client.address,
        type: client.customerType || 'regular'
      })),
      products: products.map(product => ({
        id: product._id,
        name: product.name,
        code: product.code,
        price: product.price,
        cost: product.cost,
        stock: product.stock,
        category: product.category,
        tax: product.tax,
        barcode: product.barcode,
        supplier: product.supplier,
        minStock: product.minStock
      }))
    });

  } catch (error) {
    console.error('❌ Error en /sales/sale-data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar datos: ' + error.message 
    });
  }
});

// Crear nuevo cliente rápido - MONGODB REAL
router.post('/sales/quick-client', async (req, res) => {
  try {
    const { name, phone, rif } = req.body;

    console.log('👤 Creando cliente en MongoDB:', { name, phone, rif });

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del cliente es obligatorio'
      });
    }

    // Usar businessId temporal para pruebas
    const businessId = '000000000000000000000001';

    const client = new Customer({
      businessId,
      name: name.trim(),
      phone: phone?.trim() || null,
      rif: rif?.trim() || null,
      customerType: 'regular',
      status: 'active'
    });

    await client.save();

    console.log('✅ Cliente creado en MongoDB:', client._id);

    res.json({
      success: true,
      client: {
        id: client._id,
        name: client.name,
        rif: client.rif,
        phone: client.phone,
        email: client.email,
        address: client.address,
        type: 'regular'
      }
    });

  } catch (error) {
    console.error('❌ Error en /sales/quick-client:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear cliente: ' + error.message 
    });
  }
});

// Nueva venta - MONGODB REAL
router.post('/sales/new-sale', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { client, products, paymentMethod, currency, exchangeRate, discounts, notes, shipping } = req.body;

    console.log('💰 Procesando venta en MongoDB...');

    // Usar businessId y userId temporales
    const businessId = '000000000000000000000001';
    const userId = '000000000000000000000001';

    if (!products || !Array.isArray(products) || products.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'La venta debe contener al menos un producto'
      });
    }

    // Calcular totales
    const subtotal = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxes = products.reduce((sum, item) => sum + (item.price * item.quantity * ((item.tax || 16) / 100)), 0);
    const total = subtotal + taxes - (discounts || 0) + (shipping || 0);

    // Crear venta
    const sale = new Sale({
      businessId,
      customerId: client?.id || null,
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
      createdBy: userId
    });

    await sale.save({ session });

    // Crear productos de la venta
    for (const item of products) {
      const saleProduct = new SaleProduct({
        saleId: sale._id,
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity
      });

      await saleProduct.save({ session });

      // Actualizar stock
      await Product.findByIdAndUpdate(
        item.id,
        { $inc: { stock: -item.quantity } },
        { session }
      );
    }

    await session.commitTransaction();
    console.log('✅ Venta completada en MongoDB:', sale._id);

    res.json({ 
      success: true, 
      sale: {
        id: sale._id,
        totalAmount: sale.totalAmount,
        subtotalAmount: sale.subtotalAmount,
        taxAmount: sale.taxAmount,
        discountAmount: sale.discountAmount,
        shippingAmount: sale.shippingAmount,
        paymentMethod: sale.paymentMethod,
        currency: sale.currency,
        status: sale.status,
        notes: sale.notes,
        createdAt: sale.createdAt
      },
      message: 'Venta completada exitosamente' 
    });

  } catch (error) {
    await session.abortTransaction();
    console.error('❌ Error en /sales/new-sale:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la venta: ' + error.message 
    });
  } finally {
    session.endSession();
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
