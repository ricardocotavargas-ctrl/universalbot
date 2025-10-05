const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  subtotalAmount: {
    type: Number,
    required: true
  },
  taxAmount: {
    type: Number,
    default: 0
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  shippingAmount: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['efectivo', 'transferencia', 'pago_movil', 'tarjeta_debito', 'tarjeta_credito', 'divisas'],
    required: true
  },
  currency: {
    type: String,
    enum: ['USD', 'VES', 'EUR'],
    default: 'USD'
  },
  exchangeRate: {
    type: Number
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'completed'
  },
  notes: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sale', saleSchema);
