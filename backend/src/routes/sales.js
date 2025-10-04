const express = require('express');
const router = express.Router();
const { Sale, SaleProduct, Product, Customer, Business } = require('../models');

// Middleware de autenticación simple (temporal)
const authMiddleware = async (req, res, next) => {
  try {
    // Por ahora permitimos todo sin autenticación
    req.user = { 
      id: 1, 
      businessId: 1,
      name: 'Usuario Demo'
    };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Error de autenticación' });
  }
};

// ✅ ENDPOINT: Obtener datos para nueva venta
router.get('/sale-data', authMiddleware, async (req, res) => {
  try {
    const businessId = req.user.businessId;

    console.log('📋 Cargando datos de venta para business:', businessId);

    // Obtener clientes y productos de la base de datos
    const [clients, products] = await Promise.all([
      Customer.findAll({
        where: { businessId },
        attributes: ['id', 'name', 'rif', 'phone', 'email', 'address', 'customerType']
      }),
      Product.findAll({
        where: { businessId },
        attributes: ['id', 'name', 'code', 'price', 'cost', 'stock', 'category', 'tax', 'barcode', 'supplier', 'minStock']
      })
    ]);

    console.log(`✅ Clientes: ${clients.length}, Productos: ${products.length}`);

    res.json({
      success: true,
      clients: clients.map(client => ({
        id: client.id,
        name: client.name,
        rif: client.rif,
        phone: client.phone,
        email: client.email,
        address: client.address,
        type: client.customerType || 'regular'
      })),
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        code: product.code,
        price: parseFloat(product.price) || 0,
        cost: parseFloat(product.cost) || 0,
        stock: product.stock || 0,
        category: product.category,
        tax: product.tax || 16,
        barcode: product.barcode,
        supplier: product.supplier,
        minStock: product.minStock || 5
      }))
    });

  } catch (error) {
    console.error('❌ Error fetching sale data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar datos: ' + error.message,
      clients: [],
      products: []
    });
  }
});

// ✅ ENDPOINT: Crear nuevo cliente rápido
router.post('/quick-client', authMiddleware, async (req, res) => {
  try {
    const { name, phone, rif } = req.body;
    const businessId = req.user.businessId;

    console.log('👤 Creando cliente:', { name, phone, rif, businessId });

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del cliente es obligatorio'
      });
    }

    // Crear cliente en la base de datos
    const client = await Customer.create({
      businessId,
      name: name.trim(),
      phone: phone?.trim() || null,
      rif: rif?.trim() || null,
      customerType: 'regular',
      status: 'active'
    });

    console.log('✅ Cliente creado:', client.id);

    res.json({
      success: true,
      client: {
        id: client.id,
        name: client.name,
        phone: client.phone,
        rif: client.rif,
        type: 'regular'
      }
    });

  } catch (error) {
    console.error('❌ Error creating client:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear cliente: ' + error.message 
    });
  }
});

// ✅ ENDPOINT: Nueva venta
router.post('/new-sale', authMiddleware, async (req, res) => {
  try {
    const { client, products, paymentMethod, currency, exchangeRate, discounts, notes, shipping } = req.body;
    const businessId = req.user.businessId;
    const userId = req.user.id;
    
    console.log('💰 Procesando venta para business:', businessId);

    // Validaciones básicas
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

    // Crear venta en la base de datos
    const sale = await Sale.create({
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

    console.log('✅ Venta creada:', sale.id);

    // Crear productos de la venta
    for (const item of products) {
      await SaleProduct.create({
        saleId: sale.id,
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity
      });

      // Actualizar stock
      const product = await Product.findByPk(item.id);
      if (product) {
        const newStock = Math.max(0, product.stock - item.quantity);
        await product.update({ stock: newStock });
        console.log(`📦 Stock actualizado: ${product.name} - ${product.stock} → ${newStock}`);
      }
    }

    // Obtener venta completa con relaciones
    const completeSale = await Sale.findByPk(sale.id, {
      include: [
        { model: Customer, attributes: ['id', 'name', 'rif', 'phone', 'email'] },
        { 
          model: SaleProduct, 
          as: 'Products',
          include: [{ model: Product, attributes: ['id', 'name', 'code', 'price'] }]
        }
      ]
    });

    console.log('🎉 Venta completada exitosamente:', sale.id);

    res.json({ 
      success: true, 
      sale: completeSale,
      message: 'Venta completada exitosamente' 
    });

  } catch (error) {
    console.error('❌ Error creating sale:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la venta: ' + error.message 
    });
  }
});

// ✅ ENDPOINT: Generar comprobante
router.get('/sale-receipt/:saleId', authMiddleware, async (req, res) => {
  try {
    const { saleId } = req.params;
    const businessId = req.user.businessId;

    console.log('🧾 Generando comprobante para venta:', saleId);

    const sale = await Sale.findByPk(saleId, {
      include: [
        { model: Customer, attributes: ['id', 'name', 'rif', 'phone'] },
        { 
          model: SaleProduct, 
          as: 'Products',
          include: [{ model: Product, attributes: ['id', 'name', 'code', 'price'] }]
        },
        { model: Business, attributes: ['id', 'name', 'rif', 'phone', 'address', 'logo', 'email'] }
      ]
    });

    if (!sale) {
      return res.status(404).json({ success: false, message: 'Venta no encontrada' });
    }

    // Datos para el comprobante
    const receiptData = {
      sale: sale.toJSON(),
      business: sale.Business,
      customer: sale.Customer,
      products: sale.Products,
      companyInfo: {
        name: sale.Business?.name || 'Mi Negocio',
        rif: sale.Business?.rif || 'J-000000000',
        address: sale.Business?.address || 'Dirección no configurada',
        phone: sale.Business?.phone || 'Sin teléfono',
        email: sale.Business?.email || 'Sin email',
        logo: sale.Business?.logo || null
      }
    };

    console.log('✅ Comprobante generado para venta:', saleId);

    res.json({
      success: true,
      receipt: receiptData
    });

  } catch (error) {
    console.error('❌ Error generating receipt:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al generar comprobante: ' + error.message 
    });
  }
});

module.exports = router;
