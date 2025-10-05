const Product = require('../models/Product');
const InventoryMovement = require('../models/InventoryMovement');
const Sale = require('../models/Sale');

class InventoryService {
  constructor(businessId) {
    this.businessId = businessId;
  }

  async updateStockFromSale(saleId, userId) {
    try {
      const sale = await Sale.findOne({
        _id: saleId,
        businessId: this.businessId
      }).populate('products.productId');

      if (!sale) {
        throw new Error('Venta no encontrada');
      }

      const movements = [];

      for (const item of sale.products) {
        const product = await Product.findOne({
          _id: item.productId,
          businessId: this.businessId
        });

        if (!product) {
          throw new Error(`Producto ${item.productId} no encontrado`);
        }

        const previousStock = product.stock;
        const newStock = previousStock - item.quantity;

        if (newStock < 0) {
          throw new Error(`Stock insuficiente para ${product.name}`);
        }

        // Actualizar stock del producto
        await Product.findByIdAndUpdate(product._id, { stock: newStock });

        // Registrar movimiento
        const movement = new InventoryMovement({
          productId: product._id,
          businessId: this.businessId,
          userId,
          type: 'sale',
          quantity: -item.quantity,
          previousStock,
          newStock,
          reference: `Venta #${saleId}`,
          reason: `Venta realizada - ${item.quantity} unidades`
        });
        await movement.save();

        movements.push(movement);

        // Verificar alerta de stock bajo
        if (newStock <= product.minStock) {
          await this.triggerLowStockAlert(product, newStock);
        }
      }

      return movements;
    } catch (error) {
      throw error;
    }
  }

  async adjustStock(productId, adjustment, reason, userId) {
    try {
      const product = await Product.findOne({
        _id: productId,
        businessId: this.businessId
      });

      if (!product) {
        throw new Error('Producto no encontrado');
      }

      const previousStock = product.stock;
      const newStock = previousStock + adjustment;

      if (newStock < 0) {
        throw new Error('Stock no puede ser negativo');
      }

      await Product.findByIdAndUpdate(productId, { stock: newStock });

      const movement = new InventoryMovement({
        productId,
        businessId: this.businessId,
        userId,
        type: 'adjustment',
        quantity: adjustment,
        previousStock,
        newStock,
        reason: reason || 'Ajuste manual'
      });
      await movement.save();

      // Verificar alerta de stock bajo
      if (newStock <= product.minStock) {
        await this.triggerLowStockAlert(product, newStock);
      }

      return movement;
    } catch (error) {
      throw error;
    }
  }

  async getLowStockAlerts() {
    try {
      const lowStockProducts = await Product.find({
        businessId: this.businessId,
        active: true,
        $expr: { $lte: ['$stock', '$minStock'] }
      }).sort({ stock: 1 });

      return lowStockProducts;
    } catch (error) {
      throw error;
    }
  }

  async getInventoryValue() {
    try {
      const products = await Product.find({
        businessId: this.businessId,
        active: true
      });

      const totalCost = products.reduce((sum, product) => {
        return sum + (product.stock * (product.cost || 0));
      }, 0);

      const totalRetail = products.reduce((sum, product) => {
        return sum + (product.stock * product.price);
      }, 0);

      return {
        totalCost,
        totalRetail,
        potentialProfit: totalRetail - totalCost,
        productCount: products.length,
        totalItems: products.reduce((sum, product) => sum + product.stock, 0)
      };
    } catch (error) {
      throw error;
    }
  }

  async triggerLowStockAlert(product, currentStock) {
    console.log(`🔴 ALERTA: Stock bajo para ${product.name} - ${currentStock} unidades (Mínimo: ${product.minStock})`);
    // Aquí integrarías con tu sistema de notificaciones
  }

  async getProductHistory(productId, days = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const movements = await InventoryMovement.find({
        productId,
        businessId: this.businessId,
        createdAt: { $gte: startDate }
      })
        .populate('userId', 'name email')
        .sort({ createdAt: -1 });

      return movements;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = InventoryService;
