// src/models/Account.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Account = sequelize.define('Account', {
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
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'customers',
      key: 'id'
    }
  },
  invoiceId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'invoices',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('receivable', 'payable'),
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
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'cancelled', 'overdue'),
    defaultValue: 'pending'
  },
  issueDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'transfer', 'card', 'check', 'other'),
    allowNull: true
  },
  reference: {
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
      fields: ['businessId', 'type', 'status']
    },
    {
      fields: ['businessId', 'dueDate']
    },
    {
      fields: ['businessId', 'customerId']
    },
    {
      fields: ['businessId', 'invoiceId']
    }
  ]
});

// Relaciones
Account.belongsTo(require('./Customer'), { foreignKey: 'customerId', as: 'customer' });
Account.belongsTo(require('./Invoice'), { foreignKey: 'invoiceId', as: 'invoice' });
Account.belongsTo(require('./Business'), { foreignKey: 'businessId' });

module.exports = Account;