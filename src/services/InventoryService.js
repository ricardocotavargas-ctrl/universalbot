// src/services/InventoryService.js
const { Product, InventoryMovement, Sale, SaleProduct } = require('../models');
const { Op } = require('sequelize');

class InventoryService {
  constructor(businessId) {
    this.businessId = businessId;
  }

  async updateStockFromSale(saleId, userId) {
    try {
      const sale = await Sale.findOne({
        where: { id: saleId, businessId: this.businessId },
        include: [{
          model: SaleProduct,
          as: 'products'
        }]
      });

      if (!sale) {
        throw new Error('Venta no encontrada');
      }

      const movements = [];

      for (const saleProduct of sale.products) {
        const product = await Product.findOne({
          where: { id: saleProduct.productId, businessId: this.businessId }
        });

        if (!product) {
          throw new Error(`Producto ${saleProduct.productId} no encontrado`);
        }

        const previousStock = product.stock;
        const newStock = previousStock - saleProduct.quantity;

        if (newStock < 0) {
          throw new Error(`Stock insuficiente para ${product.name}`);
        }

        // Actualizar stock del producto
        await product.update({ stock: newStock });

        // Registrar movimiento
        const movement = await InventoryMovement.create({
          productId: product.id,
          businessId: this.businessId,
          userId,
          type: 'sale',
          quantity: -saleProduct.quantity,
          previousStock,
          newStock,
          reference: `Venta #${saleId}`,
          reason: `Venta realizada - ${saleProduct.quantity} unidades`
        });

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
        where: { id: productId, businessId: this.businessId }
      });

      if (!product) {
        throw new Error('Producto no encontrado');
      }

      const previousStock = product.stock;
      const newStock = previousStock + adjustment;

      if (newStock < 0) {
        throw new Error('Stock no puede ser negativo');
      }

      await product.update({ stock: newStock });

      const movement = await InventoryMovement.create({
        productId,
        businessId: this.businessId,
        userId,
        type: 'adjustment',
        quantity: adjustment,
        previousStock,
        newStock,
        reason: reason || 'Ajuste manual'
      });

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
      const lowStockProducts = await Product.findAll({
        where: {
          businessId: this.businessId,
          stock: { [Op.lte]: { [Op.col]: 'minStock' } },
          status: 'active'
        },
        order: [['stock', 'ASC']]
      });

      return lowStockProducts;
    } catch (error) {
      throw error;
    }
  }

  async getInventoryValue() {
    try {
      const products = await Product.findAll({
        where: {
          businessId: this.businessId,
          status: 'active'
        },
        attributes: ['id', 'name', 'stock', 'cost', 'price']
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
    // Aquí implementarías la lógica de notificación
    // Email, WhatsApp, notificación en dashboard, etc.
    console.log(`ALERTA: Stock bajo para ${product.name} - ${currentStock} unidades restantes`);
    
    // Ejemplo: Integración con servicio de notificaciones
    // await NotificationService.sendLowStockAlert(product, currentStock);
  }

  async getProductHistory(productId, days = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const movements = await InventoryMovement.findAll({
        where: {
          productId,
          businessId: this.businessId,
          createdAt: { [Op.gte]: startDate }
        },
        include: ['User'],
        order: [['createdAt', 'DESC']]
      });

      return movements;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = InventoryService;