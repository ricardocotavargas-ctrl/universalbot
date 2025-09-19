// src/models/Invoice.js
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  invoiceNumber: {
    type: String,
    unique: true,
    required: true,
    default: function() {
      return 'INV-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    }
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'binance', 'bank_transfer', 'paypal', 'crypto', 'other'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDetails: {
    type: Map,
    of: String
  },
  transactionId: {
    type: String
  },
  dueDate: {
    type: Date,
    required: true
  },
  paidAt: {
    type: Date
  },
  periodStart: {
    type: Date,
    required: true
  },
  periodEnd: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    maxlength: 500
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Índices para búsqueda eficiente
invoiceSchema.index({ businessId: 1 });
invoiceSchema.index({ paymentStatus: 1 });
invoiceSchema.index({ dueDate: 1 });
invoiceSchema.index({ invoiceNumber: 1 });
invoiceSchema.index({ createdAt: 1 });
invoiceSchema.index({ businessId: 1, paymentStatus: 1 });

// Virtual para verificar si el invoice está vencido
invoiceSchema.virtual('isOverdue').get(function() {
  return this.paymentStatus === 'pending' && new Date() > this.dueDate;
});

// Virtual para días hasta el vencimiento
invoiceSchema.virtual('daysUntilDue').get(function() {
  const now = new Date();
  const due = new Date(this.dueDate);
  const diffTime = due - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Método para generar PDF (placeholder)
invoiceSchema.methods.generatePDF = function() {
  return {
    url: `/api/invoices/${this._id}/pdf`,
    filename: `Invoice_${this.invoiceNumber}.pdf`
  };
};

// Transformación para JSON
invoiceSchema.methods.toJSON = function() {
  const invoice = this.toObject();
  invoice.isOverdue = this.isOverdue;
  invoice.daysUntilDue = this.daysUntilDue;
  delete invoice.__v;
  return invoice;
};

module.exports = mongoose.model('Invoice', invoiceSchema);