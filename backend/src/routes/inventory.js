// src/routes/inventory.js
const express = require('express');
const router = express.Router();
const { Product, InventoryMovement, Business } = require('../models');
const auth = require('../middleware/auth');

// Obtener inventario completo de una empresa
router.get('/', auth, async (req, res) => {
  try {
    const { businessId } = req.user;
    const { page = 1, limit = 50, category, lowStock = false } = req.query;

    let whereClause = { businessId };
    
    if (category) {
      whereClause.category = category;
    }

    if (lowStock === 'true') {
      whereClause.stock = { [Op.lte]: { [Op.col]: 'minStock' } };
    }

    const products = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['name', 'ASC']]
    });

    res.json({
      products: products.rows,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      totalItems: products.count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo producto
router.post('/', auth, async (req, res) => {
  try {
    const { businessId } = req.user;
    const productData = { ...req.body, businessId };

    const product = await Product.create(productData);

    // Registrar movimiento inicial
    await InventoryMovement.create({
      productId: product.id,
      type: 'initial',
      quantity: productData.stock || 0,
      previousStock: 0,
      newStock: productData.stock || 0,
      businessId,
      userId: req.user.id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar producto
router.put('/:id', auth, async (req, res) => {
  try {
    const { businessId } = req.user;
    const product = await Product.findOne({
      where: { id: req.params.id, businessId }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const previousStock = product.stock;
    await product.update(req.body);

    // Registrar movimiento si cambió el stock
    if (req.body.stock !== undefined && req.body.stock !== previousStock) {
      await InventoryMovement.create({
        productId: product.id,
        type: 'adjustment',
        quantity: req.body.stock - previousStock,
        previousStock,
        newStock: req.body.stock,
        reason: req.body.adjustmentReason || 'Ajuste manual',
        businessId,
        userId: req.user.id
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener movimientos de inventario
router.get('/:id/movements', auth, async (req, res) => {
  try {
    const { businessId } = req.user;
    const { page = 1, limit = 20 } = req.query;

    const movements = await InventoryMovement.findAndCountAll({
      where: { productId: req.params.id, businessId },
      include: ['User'],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      movements: movements.rows,
      totalPages: Math.ceil(movements.count / limit),
      currentPage: parseInt(page),
      totalItems: movements.count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Alertas de stock bajo
router.get('/alerts/low-stock', auth, async (req, res) => {
  try {
    const { businessId } = req.user;
    
    const lowStockProducts = await Product.findAll({
      where: {
        businessId,
        stock: { [Op.lte]: { [Op.col]: 'minStock' } }
      },
      order: [['stock', 'ASC']]
    });

    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;