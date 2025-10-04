const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  cost: {
    type: Number,
    min: 0
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  category: {
    type: String,
    trim: true
  },
  tax: {
    type: Number,
    default: 16
  },
  barcode: {
    type: String,
    trim: true
  },
  supplier: {
    type: String,
    trim: true
  },
  minStock: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

productSchema.index({ businessId: 1, code: 1 });
productSchema.index({ businessId: 1, name: 1 });

module.exports = mongoose.model('Product', productSchema);
