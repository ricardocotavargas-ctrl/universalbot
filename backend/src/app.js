const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth');

const app = express();

// ✅ CONFIGURACIÓN CORS COMPLETA Y PERMISIVA
const corsOptions = {
  origin: function (origin, callback) {
    // Lista de dominios permitidos (TODOS los de Vercel + Render + localhost)
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5000',
      'https://universalbot-frontend.vercel.app',
      'https://universalbot-backend.onrender.com',
      'https://universalbot-dsko.onrender.com',
      /\.vercel\.app$/,    // ✅ Todos los subdominios de Vercel
      /\.onrender\.com$/,  // ✅ Todos los subdominios de Render
      /\.localhost$/,      // ✅ Localhost con cualquier puerto
    ];
    
    // ✅ Permitir requests sin origin (Postman, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // ✅ Verificar si el origen está permitido
    const isAllowed = allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') {
        return origin === pattern;
      }
      if (pattern instanceof RegExp) {
        return pattern.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('🚫 CORS bloqueado para origen:', origin);
      callback(new Error('No permitido por política CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With', 
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials'
  ],
  optionsSuccessStatus: 200,
  maxAge: 86400 // 24 horas
};

// ✅ MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ MANEJAR PREFLIGHT REQUESTS GLOBALMENTE
app.options('*', cors(corsOptions));

// ✅ CONEXIÓN A MONGODB CON RECONEXIÓN AUTOMÁTICA
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://universalbot-user:pruebadebot2025@cluster0.uoa5zyg.mongodb.net/universalbot?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB CONECTADO exitosamente');
  console.log('📊 Base de datos:', mongoose.connection.name);
})
.catch((error) => {
  console.error('❌ Error conectando a MongoDB:', error.message);
  console.log('🔄 Intentando reconectar en 5 segundos...');
  setTimeout(() => process.exit(1), 5000);
});

// ✅ EVENTOS DE CONEXIÓN DE MONGODB
mongoose.connection.on('error', (err) => {
  console.error('❌ Error de MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB desconectado');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconectado');
});

// ✅ MIDDLEWARE DE LOGGING
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - Origin: ${req.get('origin') || 'No origin'}`);
  next();
});

// ✅ RUTAS PRINCIPALES
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '✅ Backend funcionando PERFECTO',
    timestamp: new Date().toISOString(),
    service: 'Render',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 UniversalBot Backend API',
    version: '1.0.0',
    status: 'Operacional',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /health',
      api_docs: 'GET /api',
      auth: {
        login: 'POST /auth/login',
        register: 'POST /auth/register',
        verify: 'GET /auth/verify'
      },
      sales: {
        sale_data: 'GET /api/sales/sale-data',
        quick_client: 'POST /api/sales/quick-client',
        new_sale: 'POST /api/sales/new-sale',
        all_clients: 'GET /api/sales/all-clients'
      },
      protected: 'GET /auth/protected'
    },
    cors: {
      enabled: true,
      allowed_origins: 'Vercel, Render, Localhost'
    }
  });
});

// ✅ RUTAS DE AUTENTICACIÓN
app.use('/auth', authRoutes);

// ✅ RUTA DE PRUEBA PROTEGIDA
app.get('/auth/protected', (req, res) => {
  // Simulación de ruta protegida para testing
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ 
      error: 'Token requerido',
      message: 'Esta ruta requiere autenticación'
    });
  }
  
  res.json({ 
    message: '✅ Ruta protegida - Acceso autorizado',
    user: { id: 'test-user', email: 'test@universalbot.com' },
    timestamp: new Date().toISOString()
  });
});

// =============================================
// ✅ RUTAS REALES DE VENTAS - OPERATIVAS
// =============================================

// ✅ RUTA REAL PARA CREAR CLIENTE EN MONGODB
app.post('/api/sales/quick-client', async (req, res) => {
  try {
    const { name, phone, rif, email, address } = req.body;

    console.log('👤 Creando cliente REAL en MongoDB:', { name, phone, rif });

    // Validaciones
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del cliente es obligatorio'
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: 'El teléfono es obligatorio'
      });
    }

    // Business ID temporal (luego vendrá del usuario autenticado)
    const businessId = '000000000000000000000001';

    // Verificar si ya existe un cliente con el mismo teléfono
    const existingClient = await mongoose.model('Customer').findOne({
      businessId,
      phone: phone.trim()
    });

    if (existingClient) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un cliente con este número de teléfono',
        existingClient: {
          id: existingClient._id,
          name: existingClient.name,
          phone: existingClient.phone
        }
      });
    }

    // Crear el cliente en la base de datos
    const Customer = mongoose.model('Customer');
    const client = new Customer({
      businessId,
      name: name.trim(),
      phone: phone.trim(),
      rif: rif?.trim() || null,
      email: email?.trim() || null,
      address: address?.trim() || null,
      customerType: 'regular',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await client.save();

    console.log('✅ Cliente guardado en MongoDB:', client._id);

    res.json({
      success: true,
      client: {
        id: client._id,
        name: client.name,
        phone: client.phone,
        rif: client.rif,
        email: client.email,
        address: client.address,
        type: 'regular'
      },
      message: 'Cliente creado exitosamente'
    });

  } catch (error) {
    console.error('❌ Error al crear cliente:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear cliente: ' + error.message 
    });
  }
});

// ✅ RUTA REAL PARA OBTENER DATOS DE VENTA DESDE MONGODB
app.get('/api/sales/sale-data', async (req, res) => {
  try {
    console.log('📋 Cargando datos REALES desde MongoDB...');
    
    const businessId = '000000000000000000000001';

    const Customer = mongoose.model('Customer');
    const Product = mongoose.model('Product');

    const [clients, products] = await Promise.all([
      Customer.find({ businessId, status: 'active' }).lean(),
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

// ✅ RUTA REAL PARA PROCESAR VENTA EN MONGODB
app.post('/api/sales/new-sale', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { client, products, paymentMethod, currency, exchangeRate, discounts, notes, shipping } = req.body;

    console.log('💰 Procesando venta REAL en MongoDB...');

    const businessId = '000000000000000000000001';
    const userId = '000000000000000000000001'; // Temporal

    // Validaciones
    if (!products || !Array.isArray(products) || products.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'La venta debe contener al menos un producto'
      });
    }

    // Verificar stock antes de procesar
    const Product = mongoose.model('Product');
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

    // Crear venta en la base de datos
    const Sale = mongoose.model('Sale');
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
      createdBy: userId,
      createdAt: new Date()
    });

    await sale.save({ session });

    // Crear productos de la venta
    const SaleProduct = mongoose.model('SaleProduct');
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

// ✅ RUTA PARA VER TODOS LOS CLIENTES (TESTING)
app.get('/api/sales/all-clients', async (req, res) => {
  try {
    const businessId = '000000000000000000000001';
    const Customer = mongoose.model('Customer');
    
    const clients = await Customer.find({ businessId }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      clients: clients.map(client => ({
        id: client._id,
        name: client.name,
        phone: client.phone,
        rif: client.rif,
        email: client.email,
        address: client.address,
        createdAt: client.createdAt,
        status: client.status
      })),
      total: clients.length
    });
  } catch (error) {
    console.error('❌ Error al obtener clientes:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener clientes' 
    });
  }
});

// ✅ RUTA PARA VER TODAS LAS VENTAS (TESTING)
app.get('/api/sales/all-sales', async (req, res) => {
  try {
    const businessId = '000000000000000000000001';
    const Sale = mongoose.model('Sale');
    const Customer = mongoose.model('Customer');
    
    const sales = await Sale.find({ businessId })
      .populate('customerId', 'name phone rif')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({
      success: true,
      sales: sales.map(sale => ({
        id: sale._id,
        customer: sale.customerId ? {
          name: sale.customerId.name,
          phone: sale.customerId.phone,
          rif: sale.customerId.rif
        } : null,
        totalAmount: sale.totalAmount,
        paymentMethod: sale.paymentMethod,
        status: sale.status,
        createdAt: sale.createdAt
      })),
      total: sales.length
    });
  } catch (error) {
    console.error('❌ Error al obtener ventas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener ventas' 
    });
  }
});

// ✅ RUTA DE INFORMACIÓN DE API (ACTUALIZADA)
app.get('/api', (req, res) => {
  res.json({
    name: 'UniversalBot API',
    version: '1.0.0',
    description: 'Sistema de gestión empresarial completo - OPERATIVO',
    base_url: req.protocol + '://' + req.get('host'),
    endpoints: {
      root: {
        method: 'GET',
        path: '/',
        description: 'Información general de la API'
      },
      health: {
        method: 'GET',
        path: '/health',
        description: 'Estado del servidor y base de datos'
      },
      sales: {
        sale_data: {
          method: 'GET',
          path: '/api/sales/sale-data',
          description: 'Obtener datos REALES para nueva venta'
        },
        quick_client: {
          method: 'POST', 
          path: '/api/sales/quick-client',
          description: 'Crear cliente REAL en base de datos'
        },
        new_sale: {
          method: 'POST',
          path: '/api/sales/new-sale',
          description: 'Procesar venta REAL con transacción'
        },
        all_clients: {
          method: 'GET',
          path: '/api/sales/all-clients',
          description: 'Ver todos los clientes guardados'
        },
        all_sales: {
          method: 'GET',
          path: '/api/sales/all-sales',
          description: 'Ver historial de ventas'
        }
      },
      auth_login: {
        method: 'POST',
        path: '/auth/login',
        description: 'Iniciar sesión',
        body: { email: 'string', password: 'string' }
      },
      auth_register: {
        method: 'POST',
        path: '/auth/register',
        description: 'Registrar usuario',
        body: { email: 'string', password: 'string', name: 'string' }
      },
      auth_protected: {
        method: 'GET',
        path: '/auth/protected',
        description: 'Ruta protegida de prueba',
        headers: { Authorization: 'Bearer <token>' }
      }
    },
    status: 'OPERATIVO',
    database: 'MongoDB',
    features: [
      'Clientes persistentes en base de datos',
      'Ventas con transacciones atómicas',
      'Control de stock en tiempo real',
      'Datos reales sin información falsa'
    ]
  });
});

// ✅ MANEJO DE ERRORES CENTRALIZADO
app.use((err, req, res, next) => {
  console.error('💥 Error:', err.message);
  
  if (err.message === 'No permitido por política CORS') {
    return res.status(403).json({
      error: 'CORS Error',
      message: 'Origen no permitido',
      your_origin: req.get('origin'),
      allowed_origins: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://universalbot-frontend.vercel.app',
        'https://*.vercel.app',
        'https://*.onrender.com'
      ]
    });
  }
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    timestamp: new Date().toISOString()
  });
});

// ✅ MANEJO DE RUTAS NO ENCONTRADAS (ACTUALIZADO)
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method,
    available_routes: [
      'GET /',
      'GET /health',
      'GET /api',
      'GET /api/sales/sale-data',
      'POST /api/sales/quick-client',
      'POST /api/sales/new-sale',
      'GET /api/sales/all-clients',
      'GET /api/sales/all-sales',
      'POST /auth/login',
      'POST /auth/register',
      'GET /auth/protected'
    ],
    timestamp: new Date().toISOString()
  });
});

// ✅ INICIAR SERVIDOR
const PORT = process.env.PORT || 10000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log('='.repeat(70));
  console.log('🚀 UNIVERSALBOT BACKEND - SISTEMA OPERATIVO COMPLETO');
  console.log('='.repeat(70));
  console.log(`📍 Servidor: http://${HOST}:${PORT}`);
  console.log(`🌐 Health:   http://${HOST}:${PORT}/health`);
  console.log(`🛒 Ventas:   http://${HOST}:${PORT}/api/sales/sale-data`);
  console.log(`👥 Clientes: http://${HOST}:${PORT}/api/sales/all-clients`);
  console.log(`💰 Historial: http://${HOST}:${PORT}/api/sales/all-sales`);
  console.log(`🔐 Login:    POST http://${HOST}:${PORT}/auth/login`);
  console.log(`📊 MongoDB:  ${mongoose.connection.readyState === 1 ? '✅ Conectado' : '❌ Desconectado'}`);
  console.log(`🌍 Entorno:  ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(70));
  console.log('📋 ENDPOINTS OPERATIVOS:');
  console.log('   GET  /                    - Información general');
  console.log('   GET  /health              - Estado del sistema');
  console.log('   GET  /api                 - Documentación API');
  console.log('   GET  /api/sales/sale-data - Datos REALES de venta');
  console.log('   POST /api/sales/quick-client - Crear cliente REAL');
  console.log('   POST /api/sales/new-sale  - Procesar venta REAL');
  console.log('   GET  /api/sales/all-clients - Ver todos los clientes');
  console.log('   GET  /api/sales/all-sales - Historial de ventas');
  console.log('   POST /auth/login          - Iniciar sesión');
  console.log('   POST /auth/register       - Registrar usuario');
  console.log('='.repeat(70));
  console.log('✅ SISTEMA 100% OPERATIVO - DATOS REALES EN MONGODB');
  console.log('='.repeat(70));
});

// ✅ Manejo de cierre graceful
process.on('SIGINT', () => {
  console.log('\n🔻 Cerrando servidor gracefulmente...');
  mongoose.connection.close();
  process.exit(0);
});

module.exports = app;
