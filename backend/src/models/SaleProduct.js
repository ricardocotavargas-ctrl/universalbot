// src/models/SaleProduct.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SaleProduct = sequelize.define('SaleProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  saleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sales',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  notes: {
    type: DataTypes.TEXT
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  indexes: [
    {
      fields: ['saleId', 'productId'],
      unique: true
    }
  ],
  hooks: {
    beforeSave: (saleProduct) => {
      // Calcular total automáticamente
      saleProduct.total = saleProduct.quantity * saleProduct.unitPrice - saleProduct.discount;
    }
  }
});

// Relaciones
SaleProduct.belongsTo(require('./Sale'), { foreignKey: 'saleId' });
SaleProduct.belongsTo(require('./Product'), { foreignKey: 'productId' });

module.exports = SaleProduct;