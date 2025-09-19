// src/models/Plan.js
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  interval: {
    type: String,
    enum: ['month', 'year'],
    default: 'month'
  },
  planCode: {
    type: String,
    unique: true,
    required: true
  },
  features: {
    whatsapp: { type: Boolean, default: false },
    facebook: { type: Boolean, default: false },
    instagram: { type: Boolean, default: false },
    email: { type: Boolean, default: false },
    webchat: { type: Boolean, default: false },
    ai_responses: { type: Boolean, default: false },
    analytics_basic: { type: Boolean, default: false },
    analytics_advanced: { type: Boolean, default: false },
    multi_business: { type: Boolean, default: false },
    priority_support: { type: Boolean, default: false },
    custom_branding: { type: Boolean, default: false },
    api_access: { type: Boolean, default: false }
  },
  limits: {
    messages: { type: Number, default: 1000 },
    businesses: { type: Number, default: 1 },
    users: { type: Number, default: 2 },
    storage: { type: Number, default: 5 },
    contacts: { type: Number, default: 5000 }
  },
  industries: [{
    type: String,
    enum: ['automotive', 'restaurant', 'retail', 'healthcare', 'education', 'services', 'ecommerce']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Índices para búsqueda eficiente
planSchema.index({ name: 1 });
planSchema.index({ price: 1 });
planSchema.index({ isActive: 1 });
planSchema.index({ isPublic: 1 });
planSchema.index({ 'features.ai_responses': 1 });
planSchema.index({ createdAt: 1 });

// Método para verificar si el plan incluye una característica
planSchema.methods.hasFeature = function(feature) {
  return this.features[feature] === true;
};

// Método para verificar si el plan es adecuado para una industria
planSchema.methods.supportsIndustry = function(industry) {
  return this.industries.includes(industry);
};

// Método estático para obtener planes públicos
planSchema.statics.getPublicPlans = function() {
  return this.find({ isPublic: true, isActive: true })
    .sort({ price: 1 })
    .select('-createdBy -metadata');
};

// Transformación para JSON
planSchema.methods.toJSON = function() {
  const plan = this.toObject();
  delete plan.__v;
  return plan;
};

module.exports = mongoose.model('Plan', planSchema);