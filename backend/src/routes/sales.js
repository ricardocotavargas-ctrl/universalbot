// backend/src/routes/sales.js - VERSIÓN COMPLETA Y CORREGIDA
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Importar modelos
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Sale = require('../models/Sale');
const SaleProduct = require('../models/SaleProduct');

// ✅ RUTA PARA OBTENER DATOS DE VENTA DESDE MONGODB
router.get('/sales/sale-data', async (req, res) => {
  try {
    console.log('📋 Cargando datos REALES desde MongoDB...');
    
    const businessId = '000000000000000000000001'; // Temporal - luego del usuario autenticado

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
      message: 'Error al cargar datos: ' + error.message,
      code: 'SALE_DATA_ERROR'
    });
  }
});

// ✅ RUTA PARA CREAR CLIENTE EN MONGODB CON VALIDACIONES
router.post('/sales/quick-client', async (req, res) => {
  try {
    const { name, phone, rif, email, address } = req.body;

    console.log('👤 Creando cliente REAL en MongoDB:', { name, phone: phone ? '***' : 'missing' });

    // ✅ VALIDACIONES MEJORADAS
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del cliente es obligatorio',
        code: 'MISSING_NAME'
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: 'El teléfono es obligatorio',
        code: 'MISSING_PHONE'
      });
    }

    // Validar formato básico de teléfono
    const phoneRegex = /^[0-9+-\s()]{10,}$/;
    if (!phoneRegex.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Formato de teléfono inválido',
        code: 'INVALID_PHONE_FORMAT'
      });
    }

    // Validar email si se proporciona
    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          message: 'Formato de email inválido',
          code: 'INVALID_EMAIL_FORMAT'
        });
      }
    }

    // Business ID temporal (luego vendrá del usuario autenticado)
    const businessId = '000000000000000000000001';

    // Verificar si ya existe un cliente con el mismo teléfono
    const existingClient = await Customer.findOne({
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
        },
        code: 'DUPLICATE_PHONE'
      });
    }

    // Crear el cliente en la base de datos
    const client = new Customer({
      businessId,
      name: name.trim(),
      phone: phone.trim(),
      rif: rif?.trim() || null,
      email: email?.trim() || null,
      address: address?.trim() || null,
      customerType: 'regular',
      status: 'active'
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
      message: 'Cliente creado exitosamente',
      code: 'CLIENT_CREATED'
    });

  } catch (error) {
    console.error('❌ Error al crear cliente:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear cliente: ' + error.message,
      code: 'CLIENT_CREATION_ERROR'
    });
  }
});

// ✅ RUTA PARA PROCESAR VENTA EN MONGODB CON TRANSACCIÓN
router.post('/sales/new-sale', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { client, products, paymentMethod, currency, exchangeRate, discounts, notes, shipping } = req.body;

    console.log('💰 Procesando venta REAL en MongoDB...');

    const businessId = '000000000000000000000001';
    const userId = '000000000000000000000001'; // Temporal

    // ✅ VALIDACIONES MEJORADAS
    if (!products || !Array.isArray(products) || products.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'La venta debe contener al menos un producto',
        code: 'NO_PRODUCTS'
      });
    }

    if (!paymentMethod) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Método de pago es requerido',
        code: 'MISSING_PAYMENT_METHOD'
      });
    }

    // Verificar stock antes de procesar
    for (const item of products) {
      const product = await Product.findById(item.id).session(session);
      if (!product) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: `Producto no encontrado: ${item.name}`,
          code: 'PRODUCT_NOT_FOUND'
        });
      }
      if (product.stock < item.quantity) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente para: ${product.name}. Stock actual: ${product.stock}, solicitado: ${item.quantity}`,
          code: 'INSUFFICIENT_STOCK'
        });
      }
    }

    // Calcular totales
    const subtotal = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxes = products.reduce((sum, item) => sum + (item.price * item.quantity * ((item.tax || 16) / 100)), 0);
    const total = subtotal + taxes - (discounts || 0) + (shipping || 0);

    // Crear venta en la base de datos
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
      message: 'Venta completada exitosamente',
      code: 'SALE_COMPLETED'
    });

  } catch (error) {
    await session.abortTransaction();
    console.error('❌ Error en /sales/new-sale:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la venta: ' + error.message,
      code: 'SALE_PROCESSING_ERROR'
    });
  } finally {
    session.endSession();
  }
});

// ✅ RUTA PARA VER TODOS LOS CLIENTES
router.get('/sales/all-clients', async (req, res) => {
  try {
    const businessId = '000000000000000000000001';
    
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
        type: client.customerType,
        status: client.status,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt
      })),
      total: clients.length,
      code: 'CLIENTS_RETRIEVED'
    });
  } catch (error) {
    console.error('❌ Error al obtener clientes:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener clientes: ' + error.message,
      code: 'CLIENTS_RETRIEVAL_ERROR'
    });
  }
});

// ✅ RUTA PARA VER TODAS LAS VENTAS
router.get('/sales/all-sales', async (req, res) => {
  try {
    const businessId = '000000000000000000000001';
    
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
        } : { name: 'Cliente General' },
        totalAmount: sale.totalAmount,
        subtotalAmount: sale.subtotalAmount,
        taxAmount: sale.taxAmount,
        discountAmount: sale.discountAmount,
        paymentMethod: sale.paymentMethod,
        currency: sale.currency,
        status: sale.status,
        createdAt: sale.createdAt
      })),
      total: sales.length,
      code: 'SALES_RETRIEVED'
    });
  } catch (error) {
    console.error('❌ Error al obtener ventas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener ventas: ' + error.message,
      code: 'SALES_RETRIEVAL_ERROR'
    });
  }
});

// ✅ RUTA DE DEBUG
router.get('/debug', (req, res) => {
  res.json({ 
    message: '✅ RUTAS DE VENTAS FUNCIONANDO CORRECTAMENTE',
    version: '1.0.1',
    timestamp: new Date().toISOString(),
    status: 'Operacional y Seguro'
  });
});

module.exports = router;
