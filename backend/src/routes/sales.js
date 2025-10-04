const express = require('express');
const router = express.Router();
const { Sale, SaleProduct, Product, Customer, Business } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Obtener datos para nueva venta
router.get('/sale-data', authenticateToken, async (req, res) => {
  try {
    const { businessId } = req.user;

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

    res.json({
      success: true,
      clients: clients.map(client => ({
        ...client.toJSON(),
        type: client.customerType || 'regular'
      })),
      products: products.map(product => product.toJSON())
    });
  } catch (error) {
    console.error('Error fetching sale data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al cargar datos' 
    });
  }
});

// Crear nuevo cliente rápido
router.post('/quick-client', authenticateToken, async (req, res) => {
  try {
    const { name, phone, rif } = req.body;
    const { businessId } = req.user;

    const client = await Customer.create({
      businessId,
      name,
      phone,
      rif: rif || null,
      customerType: 'regular',
      status: 'active'
    });

    res.json({
      success: true,
      client: {
        ...client.toJSON(),
        type: 'regular'
      }
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al crear cliente' 
    });
  }
});

// Nueva venta
router.post('/new-sale', authenticateToken, async (req, res) => {
  const transaction = await require('../models').sequelize.transaction();
  
  try {
    const { client, products, paymentMethod, currency, exchangeRate, discounts, notes, shipping } = req.body;
    const { businessId, id: userId } = req.user;
    
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
        }
      ]
    });

    res.json({ 
      success: true, 
      sale: completeSale,
      message: 'Venta completada exitosamente' 
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating sale:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la venta' 
    });
  }
});

// Generar comprobante PDF
router.get('/sale-receipt/:saleId', authenticateToken, async (req, res) => {
  try {
    const { saleId } = req.params;
    const { businessId } = req.user;

    const sale = await Sale.findByPk(saleId, {
      include: [
        { model: Customer, attributes: ['id', 'name', 'rif', 'phone'] },
        { 
          model: SaleProduct, 
          as: 'Products',
          include: [{ model: Product, attributes: ['id', 'name', 'code', 'price'] }]
        },
        { model: Business, attributes: ['id', 'name', 'rif', 'phone', 'address'] }
      ]
    });

    if (!sale || sale.businessId !== businessId) {
      return res.status(404).json({ success: false, message: 'Venta no encontrada' });
    }

    // Aquí integrarías con tu servicio de PDF
    // Por ahora devolvemos los datos para generar el PDF en el frontend
    res.json({
      success: true,
      receipt: {
        sale: sale.toJSON(),
        business: sale.Business,
        customer: sale.Customer,
        products: sale.Products
      }
    });
  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al generar comprobante' 
    });
  }
});

module.exports = router;
