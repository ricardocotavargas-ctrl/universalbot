module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Businesses',
        key: 'id'
      }
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Customers',
        key: 'id'
      }
    },
    totalAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    subtotalAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    taxAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0
    },
    discountAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0
    },
    shippingAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0
    },
    paymentMethod: {
      type: DataTypes.ENUM('efectivo', 'transferencia', 'pago_movil', 'tarjeta_debito', 'tarjeta_credito', 'divisas'),
      allowNull: false
    },
    currency: {
      type: DataTypes.ENUM('USD', 'VES', 'EUR'),
      allowNull: false,
      defaultValue: 'USD'
    },
    exchangeRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'completed'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    tableName: 'Sales',
    timestamps: true,
    indexes: [
      {
        fields: ['businessId']
      },
      {
        fields: ['customerId']
      },
      {
        fields: ['createdAt']
      }
    ]
  });

  Sale.associate = function(models) {
    Sale.belongsTo(models.Business, { foreignKey: 'businessId' });
    Sale.belongsTo(models.Customer, { foreignKey: 'customerId' });
    Sale.belongsTo(models.User, { foreignKey: 'createdBy', as: 'Creator' });
    Sale.hasMany(models.SaleProduct, { foreignKey: 'saleId', as: 'Products' });
    Sale.hasMany(models.Transaction, { foreignKey: 'saleId' });
  };

  return Sale;
};
