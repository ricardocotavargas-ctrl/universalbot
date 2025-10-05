// backend/src/scripts/migrateUsers.js - MIGRACIÓN DE EMERGENCIA
const mongoose = require('mongoose');
const User = require('../models/User');
const Business = require('../models/Business');

const migrateUsers = async () => {
  try {
    console.log('🚀 Iniciando migración de usuarios...');
    
    const users = await User.find({ businessId: { $exists: false } });
    console.log(`📋 Usuarios a migrar: ${users.length}`);
    
    for (const user of users) {
      // Crear business para usuario existente
      const business = new Business({
        name: user.businessName || `Negocio de ${user.name}`,
        rif: `J-${Date.now()}-${user._id}`,
        email: user.email,
        industry: 'general',
        status: 'active'
      });
      
      await business.save();
      
      // Asignar businessId al usuario
      user.businessId = business._id;
      await user.save();
      
      console.log(`✅ Usuario migrado: ${user.email} -> Business: ${business._id}`);
    }
    
    console.log('🎉 Migración completada exitosamente');
  } catch (error) {
    console.error('❌ Error en migración:', error);
  }
};

// Ejecutar migración
migrateUsers();
