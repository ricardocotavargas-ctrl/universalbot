// backend/src/models/User.js - VERSIÓN CORREGIDA
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  // ✅ CORREGIDO: businessId para relación REAL con Business
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true  // ✅ OBLIGATORIO - cada usuario pertenece a un negocio
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'seller'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Encriptar password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Comparar passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
