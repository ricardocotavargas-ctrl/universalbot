const mongoose = require('mongoose');

// Conexión a MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/universalbot', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    return false;
  }
};

// Verificar conexión
const testConnection = async () => {
  try {
    const connected = mongoose.connection.readyState === 1;
    if (connected) {
      console.log('✅ MongoDB is connected');
      
      // Verificar colecciones básicas
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('📊 Collections:', collections.map(c => c.name));
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ MongoDB test failed:', error);
    return false;
  }
};

module.exports = {
  connectDB,
  testConnection,
  mongoose
};
