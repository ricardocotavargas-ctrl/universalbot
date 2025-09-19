// src/models/Inventory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'businesses',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2)
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  minStock: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    allowNull: false
  },
  maxStock: {
    type: DataTypes.INTEGER
  },
  unit: {
    type: DataTypes.STRING,
    defaultValue: 'unidad'
  },
  location: {
    type: DataTypes.STRING
  },
  supplier: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'discontinued'),
    defaultValue: 'active'
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  indexes: [
    {
      fields: ['businessId', 'sku'],
      unique: true
    },
    {
      fields: ['businessId', 'category']
    },
    {
      fields: ['businessId', 'status']
    }
  ]
});

const InventoryMovement = sequelize.define('InventoryMovement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'businesses',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM(
      'purchase', 
      'sale', 
      'adjustment', 
      'transfer', 
      'initial',
      'return',
      'damage'
    ),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  previousStock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  newStock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reference: {
    type: DataTypes.STRING
  },
  reason: {
    type: DataTypes.TEXT
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2)
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  indexes: [
    {
      fields: ['productId', 'createdAt']
    },
    {
      fields: ['businessId', 'type']
    }
  ]
});

// Relaciones
Product.hasMany(InventoryMovement, { foreignKey: 'productId' });
InventoryMovement.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { Product, InventoryMovement };