const express = require('express');
const router = express.Router();
const { Sale, SaleProduct, Product, Customer, Business, User } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Token requerido' });
    }

    // Verificación simple del token (en producción usar JWT proper)
    const user = await User.findOne({ where: { authToken: token } });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Token inválido' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ success: false, message: 'Error de autenticación' });
  }
};

// Obtener datos para nueva venta
router.get('/sale-data', authMiddleware, async (req, res) => {
  try {
    const businessId = req.user.businessId || req.user.id;

    console.log('📋 Cargando datos de venta para business:', businessId);

    const [clients, products] = await Promise.all([
      Customer.findAll({
        where: { businessId },
        attributes: ['id', 'name', 'rif', 'phone', 'email', 'address', 'customerType']
      }),
      Product.findAll({
        where: { businessId, active: true },
        attributes: ['id', 'name', 'code', 'price', 'cost', 'stock', 'category', 'tax', 'barcode', 'supplier', 'minStock']
      })
    ]);

    console.log(`✅ Clientes: ${clients.length}, Productos: ${products.length}`);

    res.json({
      success: true,
      clients: clients.map(client => ({
        ...client.toJSON(),
        type: client.customerType || 'regular'
      })),
      products: products.map(product => product.toJSON())
    });
  } catch (error) {
    console.error('❌ Error fetching sale data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar datos: ' + error.message 
    });
  }
});

// Crear nuevo cliente rápido
router.post('/quick-client', authMiddleware, async (req, res) => {
  try {
    const { name, phone, rif } = req.body;
    const businessId = req.user.businessId || req.user.id;

    console.log('👤 Creando cliente:', { name, phone, rif, businessId });

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del cliente es obligatorio'
      });
    }

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
        ...client.toJSON(),
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

// Nueva venta
router.post('/new-sale', authMiddleware, async (req, res) => {
  const transaction = await require('../models').sequelize.transaction();
  
  try {
    const { client, products, paymentMethod, currency, exchangeRate, discounts, notes, shipping } = req.body;
    const businessId = req.user.businessId || req.user.id;
    const userId = req.user.id;
    
    console.log('💰 Procesando venta para business:', businessId);

    // Validaciones
    if (!products || !Array.isArray(products) || products.length === 0) {
      await transaction.rollback();
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
    }, { transaction });

    console.log('✅ Venta creada:', sale.id);

    // Crear productos de la venta y actualizar stock
    for (const item of products) {
      await SaleProduct.create({
        saleId: sale.id,
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity
      }, { transaction });

      // Actualizar stock
      const product = await Product.findByPk(item.id, { transaction });
      if (product) {
        const newStock = product.stock - item.quantity;
        await product.update({
          stock: newStock < 0 ? 0 : newStock
        }, { transaction });
        console.log(`📦 Stock actualizado: ${product.name} - ${product.stock} → ${newStock}`);
      }
    }

    await transaction.commit();

    // Obtener venta completa con datos relacionados
    const completeSale = await Sale.findByPk(sale.id, {
      include: [
        { model: Customer, attributes: ['id', 'name', 'rif', 'phone', 'email'] },
        { 
          model: SaleProduct, 
          as: 'Products',
          include: [{ model: Product, attributes: ['id', 'name', 'code', 'price'] }]
        },
        { model: Business, attributes: ['id', 'name', 'rif', 'phone', 'address', 'logo'] }
      ]
    });

    console.log('🎉 Venta completada exitosamente:', sale.id);

    res.json({ 
      success: true, 
      sale: completeSale,
      message: 'Venta completada exitosamente' 
    });
  } catch (error) {
    await transaction.rollback();
    console.error('❌ Error creating sale:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la venta: ' + error.message 
    });
  }
});

// Generar comprobante PDF
router.get('/sale-receipt/:saleId', authMiddleware, async (req, res) => {
  try {
    const { saleId } = req.params;
    const businessId = req.user.businessId || req.user.id;

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

    if (sale.businessId !== businessId) {
      return res.status(403).json({ success: false, message: 'No autorizado' });
    }

    // Datos para el comprobante
    const receiptData = {
      sale: sale.toJSON(),
      business: sale.Business,
      customer: sale.Customer,
      products: sale.Products,
      // Información de la empresa para facturación
      companyInfo: {
        name: sale.Business.name,
        rif: sale.Business.rif,
        address: sale.Business.address,
        phone: sale.Business.phone,
        email: sale.Business.email,
        logo: sale.Business.logo
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
