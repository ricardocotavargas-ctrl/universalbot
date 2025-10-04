const express = require('express');
const router = express.Router();
const { Sale, SaleProduct, Product, Customer, Business } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Obtener datos para nueva venta
router.get('/sale-data', authenticateToken, async (req, res) => {
  try {
    console.log('🔍 Usuario:', req.user);
    
    // ✅ SOLUCIÓN: Si no hay businessId, usar el primer negocio o crear uno
    let businessId = req.user.businessId;
    
    if (!businessId) {
      console.log('⚠️ Usuario sin businessId, buscando negocios...');
      
      // Buscar el primer negocio disponible
      const firstBusiness = await Business.findOne();
      if (firstBusiness) {
        businessId = firstBusiness.id;
        console.log('✅ Usando negocio existente:', businessId);
      } else {
        // Crear un negocio por defecto
        const newBusiness = await Business.create({
          name: 'Mi Negocio',
          rif: 'J-00000000-0',
          phone: '0000000000',
          industry: 'general',
          status: 'active'
        });
        businessId = newBusiness.id;
        console.log('✅ Negocio creado por defecto:', businessId);
      }
    }

    console.log('📋 Cargando datos para business:', businessId);

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

    console.log(`✅ Datos obtenidos: ${clients.length} clientes, ${products.length} productos`);

    res.json({
      success: true,
      clients: clients.map(client => ({
        ...client.toJSON(),
        type: client.customerType || 'regular'
      })),
      products: products.map(product => product.toJSON())
    });

  } catch (error) {
    console.error('❌ Error en /sale-data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar datos: ' + error.message 
    });
  }
});

// Crear nuevo cliente rápido
router.post('/quick-client', authenticateToken, async (req, res) => {
  try {
    const { name, phone, rif } = req.body;
    
    // ✅ SOLUCIÓN: Mismo businessId que en sale-data
    let businessId = req.user.businessId;
    
    if (!businessId) {
      const firstBusiness = await Business.findOne();
      businessId = firstBusiness?.id;
      
      if (!businessId) {
        return res.status(400).json({
          success: false,
          message: 'No se pudo determinar el negocio para el cliente'
        });
      }
    }

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

    console.log('✅ Cliente creado exitosamente:', client.id);

    res.json({
      success: true,
      client: {
        ...client.toJSON(),
        type: 'regular'
      }
    });

  } catch (error) {
    console.error('❌ Error en /quick-client:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear cliente: ' + error.message 
    });
  }
});

// Nueva venta
router.post('/new-sale', authenticateToken, async (req, res) => {
  const transaction = await require('../models').sequelize.transaction();
  
  try {
    const { client, products, paymentMethod, currency, exchangeRate, discounts, notes, shipping } = req.body;
    
    // ✅ SOLUCIÓN: Mismo businessId
    let businessId = req.user.businessId;
    const userId = req.user.id;

    if (!businessId) {
      const firstBusiness = await Business.findOne();
      businessId = firstBusiness?.id;
      
      if (!businessId) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: 'No se pudo determinar el negocio para la venta'
        });
      }
    }

    console.log('💰 Procesando venta para business:', businessId);

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

    // Crear productos de la venta
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
      }
    }

    await transaction.commit();

    res.json({ 
      success: true, 
      sale,
      message: 'Venta completada exitosamente' 
    });

  } catch (error) {
    await transaction.rollback();
    console.error('❌ Error en /new-sale:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la venta: ' + error.message 
    });
  }
});

module.exports = router;
