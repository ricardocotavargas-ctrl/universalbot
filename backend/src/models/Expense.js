// src/models/Expense.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('Expense', {
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
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'USD'
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'transfer', 'card', 'check', 'other'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
    defaultValue: 'paid'
  },
  expenseDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  receiptNumber: {
    type: DataTypes.STRING
  },
  supplier: {
    type: DataTypes.STRING
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
      fields: ['businessId', 'expenseDate']
    },
    {
      fields: ['businessId', 'category']
    },
    {
      fields: ['businessId', 'status']
    }
  ]
});

// Relaciones
Expense.belongsTo(require('./Business'), { foreignKey: 'businessId' });

module.exports = Expense;