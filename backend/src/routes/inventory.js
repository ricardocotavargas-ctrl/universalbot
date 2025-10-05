const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const InventoryMovement = require('../models/InventoryMovement');
const auth = require('../middleware/auth');
const businessMiddleware = require('../middleware/business');

// Aplicar middleware a todas las rutas
router.use(auth);
router.use(businessMiddleware);

// Obtener inventario completo
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 50, category, lowStock = false } = req.query;
    const businessId = req.businessId;

    let query = { businessId, active: true };
    
    if (category) {
      query.category = category;
    }

    if (lowStock === 'true') {
      query.$expr = { $lte: ['$stock', '$minStock'] };
    }

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ name: 1 });

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalItems: total
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Crear nuevo producto
router.post('/', async (req, res) => {
  try {
    const businessId = req.businessId;
    const productData = { ...req.body, businessId };

    const product = new Product(productData);
    await product.save();

    // Registrar movimiento inicial
    const movement = new InventoryMovement({
      productId: product._id,
      businessId,
      userId: req.user._id,
      type: 'initial',
      quantity: productData.stock || 0,
      previousStock: 0,
      newStock: productData.stock || 0,
      reason: 'Creación de producto'
    });
    await movement.save();

    res.status(201).json({
      success: true,
      product,
      message: 'Producto creado exitosamente'
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  try {
    const businessId = req.businessId;
    const product = await Product.findOne({
      _id: req.params.id,
      businessId
    });

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado' 
      });
    }

    const previousStock = product.stock;
    const updateData = { ...req.body };

    // Si cambió el stock, registrar movimiento
    if (req.body.stock !== undefined && req.body.stock !== previousStock) {
      const movement = new InventoryMovement({
        productId: product._id,
        businessId,
        userId: req.user._id,
        type: 'adjustment',
        quantity: req.body.stock - previousStock,
        previousStock,
        newStock: req.body.stock,
        reason: req.body.adjustmentReason || 'Ajuste manual'
      });
      await movement.save();
    }

    await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json({
      success: true,
      product: await Product.findById(req.params.id),
      message: 'Producto actualizado exitosamente'
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Obtener producto específico
router.get('/:id', async (req, res) => {
  try {
    const businessId = req.businessId;
    const product = await Product.findOne({
      _id: req.params.id,
      businessId
    });

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado' 
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Eliminar producto (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const businessId = req.businessId;
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, businessId },
      { active: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado' 
      });
    }

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Obtener movimientos de inventario
router.get('/:id/movements', async (req, res) => {
  try {
    const businessId = req.businessId;
    const { page = 1, limit = 20 } = req.query;

    const movements = await InventoryMovement.find({
      productId: req.params.id,
      businessId
    })
      .populate('userId', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await InventoryMovement.countDocuments({
      productId: req.params.id,
      businessId
    });

    res.json({
      success: true,
      movements,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalItems: total
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Alertas de stock bajo
router.get('/alerts/low-stock', async (req, res) => {
  try {
    const businessId = req.businessId;
    
    const lowStockProducts = await Product.find({
      businessId,
      active: true,
      $expr: { $lte: ['$stock', '$minStock'] }
    }).sort({ stock: 1 });

    res.json({
      success: true,
      products: lowStockProducts,
      total: lowStockProducts.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Valor del inventario
router.get('/analytics/value', async (req, res) => {
  try {
    const businessId = req.businessId;
    
    const products = await Product.find({
      businessId,
      active: true
    });

    const totalCost = products.reduce((sum, product) => {
      return sum + (product.stock * (product.cost || 0));
    }, 0);

    const totalRetail = products.reduce((sum, product) => {
      return sum + (product.stock * product.price);
    }, 0);

    res.json({
      success: true,
      analytics: {
        totalCost,
        totalRetail,
        potentialProfit: totalRetail - totalCost,
        productCount: products.length,
        totalItems: products.reduce((sum, product) => sum + product.stock, 0),
        lowStockCount: products.filter(p => p.stock <= p.minStock).length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
