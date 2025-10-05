const mongoose = require('mongoose');

const inventoryMovementSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['purchase', 'sale', 'adjustment', 'transfer', 'initial', 'return', 'damage'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  previousStock: {
    type: Number,
    required: true
  },
  newStock: {
    type: Number,
    required: true
  },
  reference: {
    type: String
  },
  reason: {
    type: String
  },
  cost: {
    type: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('InventoryMovement', inventoryMovementSchema);
