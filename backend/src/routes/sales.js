const express = require('express');
const router = express.Router();
const { Sale, SaleProduct, Product, Customer, Business } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Nueva venta
router.post('/new-sale', authenticateToken, async (req, res) => {
  try {
    const { client, products, paymentMethod, currency, exchangeRate, discounts, notes, shipping } = req.body;
    
    // Calcular totales
    const subtotal = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxes = products.reduce((sum, item) => sum + (item.price * item.quantity * (item.tax / 100)), 0);
    const total = subtotal + taxes - discounts + shipping;

    // Crear venta
    const sale = await Sale.create({
      businessId: req.user.businessId,
      customerId: client?.id || null,
      totalAmount: total,
      subtotalAmount: subtotal,
      taxAmount: taxes,
      discountAmount: discounts,
      shippingAmount: shipping,
      paymentMethod,
      currency,
      exchangeRate: currency === 'VES' ? exchangeRate : null,
      status: 'completed',
      notes,
      createdBy: req.user.id
    });

    // Crear productos de la venta y actualizar stock
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
        await product.update({
          stock: product.stock - item.quantity
        });
      }
    }

    res.json({ 
      success: true, 
      sale,
      message: 'Venta completada exitosamente' 
    });
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la venta' 
    });
  }
});

// Obtener datos para nueva venta
router.get('/sale-data', authenticateToken, async (req, res) => {
  try {
    const { businessId } = req.user;

    const [clients, products] = await Promise.all([
      Customer.findAll({
        where: { businessId },
        attributes: ['id', 'name', 'rif', 'phone', 'email', 'address', 'customerType', 'loyaltyPoints']
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

module.exports = router;
