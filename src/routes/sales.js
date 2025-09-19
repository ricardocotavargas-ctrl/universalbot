// backend/src/routes/sales.js
const express = require('express');
const router = express.Router();
const { Sale, SaleProduct, Product } = require('../models');
const auth = require('../middleware/auth');

// Crear nueva venta
router.post('/', auth, async (req, res) => {
  try {
    const { clientId, products, additionalCharges, paymentMethod, notes } = req.body;
    
    // Calcular total
    let totalAmount = 0;
    const productDetails = await Product.findAll({
      where: { id: products.map(p => p.productId) }
    });

    products.forEach(saleProduct => {
      const product = productDetails.find(p => p.id === saleProduct.productId);
      totalAmount += product.price * saleProduct.quantity;
    });

    // Agregar cargos adicionales
    additionalCharges.forEach(charge => {
      totalAmount += charge.amount;
    });

    // Crear venta
    const sale = await Sale.create({
      clientId,
      businessId: req.user.businessId,
      totalAmount,
      paymentMethod,
      additionalCharges,
      notes,
      userId: req.user.id
    });

    // Crear productos de la venta
    const saleProducts = products.map(product => ({
      saleId: sale.id,
      productId: product.productId,
      quantity: product.quantity,
      unitPrice: productDetails.find(p => p.id === product.productId).price
    }));

    await SaleProduct.bulkCreate(saleProducts);

    // Actualizar inventario
    for (const product of products) {
      await Product.decrement('stock', {
        by: product.quantity,
        where: { id: product.productId }
      });
    }

    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;