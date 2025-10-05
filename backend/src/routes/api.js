const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Business = require('../models/Business');
const User = require('../models/User');
const Product = require('../models/Product');
const Interaction = require('../models/Interaction');
const Customer = require('../models/Customer');
const Sale = require('../models/Sale');
const SaleProduct = require('../models/SaleProduct');

// Route modules
const inventoryRoutes = require('./inventory');
const accountsRoutes = require('./accounts'); 
const financialRoutes = require('./financial');
const authRoutes = require('./auth');

// Middleware temporal - reemplazar con autenticación real
router.use((req, res, next) => {
  req.businessId = '000000000000000000000001';
  req.userId = '000000000000000000000001';
  next();
});

// Usar rutas existentes
router.use('/inventory', inventoryRoutes);
router.use('/accounts', accountsRoutes);
router.use('/financial', financialRoutes);
router.use('/auth', authRoutes);

// ✅ RUTAS MONGODB MEJORADAS CON VALIDACIONES

// Obtener datos para nueva venta
router.get('/sales/sale-data', async (req, res) => {
  try {
    console.log('📋 Cargando datos de venta desde MongoDB...');
    
    const [clients, products] = await Promise.all([
      Customer.find({ businessId: req.businessId }).lean(),
      Product.find({ businessId: req.businessId, active: true }).lean()
    ]);

    console.log(`✅ Datos cargados: ${clients.length} clientes, ${products.length} productos`);

    res.json({
      success: true,
      clients: clients.map(client => ({
        id: client._id,
        name: client.name,
        rif: client.rif,
        documentNumber: client.documentNumber,
        documentType: client.documentType,
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

// Crear nuevo cliente rápido CON VALIDACIONES OBLIGATORIAS
router.post('/sales/quick-client', async (req, res) => {
  try {
    const { 
      name, 
      documentNumber, 
      documentType = 'V', 
      phone, 
      rif, 
      email, 
      address 
    } = req.body;

    console.log('👤 Creando cliente en MongoDB:', { 
      name, 
      documentNumber, 
      documentType, 
      phone 
    });

    // ✅ VALIDACIONES OBLIGATORIAS
    const errors = [];

    if (!name || !name.trim()) {
      errors.push('El nombre del cliente es obligatorio');
    }

    if (!documentNumber || !documentNumber.trim()) {
      errors.push('El número de documento es obligatorio');
    }

    if (!phone || !phone.trim()) {
      errors.push('El teléfono es obligatorio');
    }

    // Validar formato de teléfono (mínimo 10 caracteres)
    if (phone && phone.trim().length < 10) {
      errors.push('El teléfono debe tener al menos 10 caracteres');
    }

    // Validar tipo de documento
    const validDocumentTypes = ['V', 'E', 'J', 'G', 'P'];
    if (!validDocumentTypes.includes(documentType)) {
      errors.push('Tipo de documento inválido. Use: V, E, J, G, P');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors
      });
    }

    // Verificar si ya existe un cliente con el mismo documento
    const existingClient = await Customer.findOne({
      businessId: req.businessId,
      documentNumber: documentNumber.trim()
    });

    if (existingClient) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un cliente con este número de documento',
        existingClient: {
          id: existingClient._id,
          name: existingClient.name,
          documentNumber: existingClient.documentNumber
        }
      });
    }

    // Crear el cliente
    const client = new Customer({
      businessId: req.businessId,
      name: name.trim(),
      documentNumber: documentNumber.trim(),
      documentType: documentType,
      phone: phone.trim(),
      rif: rif?.trim() || null,
      email: email?.trim() || null,
      address: address?.trim() || null,
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
        documentNumber: client.documentNumber,
        documentType: client.documentType,
        rif: client.rif,
        phone: client.phone,
        email: client.email,
        address: client.address,
        type: 'regular'
      },
      message: 'Cliente creado exitosamente'
    });

  } catch (error) {
    console.error('❌ Error en /sales/quick-client:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear cliente: ' + error.message 
    });
  }
});

// Nueva venta con transacción y validación de cliente
router.post('/sales/new-sale', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { 
      client, 
      products, 
      paymentMethod, 
      currency, 
      exchangeRate, 
      discounts, 
      notes, 
      shipping 
    } = req.body;

    console.log('💰 Procesando venta en MongoDB...');

    // ✅ VALIDACIONES OBLIGATORIAS PARA CLIENTE
    if (!client || !client.id) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Se requiere un cliente para procesar la venta'
      });
    }

    // Verificar que el cliente existe y tiene datos obligatorios
    const customer = await Customer.findById(client.id).session(session);
    if (!customer) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }

    // Validar datos obligatorios del cliente
    if (!customer.name || !customer.documentNumber || !customer.phone) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'El cliente seleccionado no tiene todos los datos obligatorios (nombre, documento, teléfono)',
        missingFields: {
          name: !customer.name,
          documentNumber: !customer.documentNumber,
          phone: !customer.phone
        }
      });
    }

    // Validaciones de productos
    if (!products || !Array.isArray(products) || products.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'La venta debe contener al menos un producto'
      });
    }

    // Verificar stock antes de procesar
    for (const item of products) {
      const product = await Product.findById(item.id).session(session);
      if (!product) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: `Producto no encontrado: ${item.name}`
        });
      }
      if (product.stock < item.quantity) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente para: ${product.name}. Stock actual: ${product.stock}, solicitado: ${item.quantity}`
        });
      }
    }

    // Calcular totales
    const subtotal = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxes = products.reduce((sum, item) => sum + (item.price * item.quantity * ((item.tax || 16) / 100)), 0);
    const total = subtotal + taxes - (discounts || 0) + (shipping || 0);

    // Crear venta
    const sale = new Sale({
      businessId: req.businessId,
      customerId: client.id,
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
      createdBy: req.userId
    });

    await sale.save({ session });

    // Crear productos de la venta y actualizar stock
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
      client: {
        id: customer._id,
        name: customer.name,
        documentNumber: customer.documentNumber,
        documentType: customer.documentType,
        phone: customer.phone
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
    },
    requirements: {
      quick_client: {
        obligatorios: ['name', 'documentNumber', 'phone'],
        documentTypes: ['V (Venezolano)', 'E (Extranjero)', 'J (Jurídico)', 'G (Gobierno)', 'P (Pasaporte)'],
        phone_min_length: 10
      }
    }
  });
});

module.exports = router;
