const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'universal_bot_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Manejo de errores de conexión
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    
    // Test query to verify everything works
    const result = await client.query('SELECT COUNT(*) as count FROM businesses');
    console.log(`📊 Businesses in database: ${result.rows[0].count}`);
    
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Función para inicializar la base de datos
const initializeDatabase = async () => {
  try {
    const connected = await testConnection();
    if (!connected) {
      throw new Error('Database connection failed');
    }

    // Verify essential tables exist
    const tables = ['businesses', 'users', 'products', 'interactions'];
    for (const table of tables) {
      try {
        const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`✅ Table ${table}: ${result.rows[0].count} records`);
      } catch (error) {
        console.error(`❌ Table ${table} error:`, error.message);
        return false;
      }
    }

    console.log('✅ Database initialization completed');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
};

// Función para obtener estadísticas
const getDatabaseStats = async () => {
  try {
    const queries = {
      businesses: 'SELECT COUNT(*) FROM businesses WHERE status = $1',
      users: 'SELECT COUNT(*) FROM users WHERE status = $1',
      products: 'SELECT COUNT(*) FROM products WHERE status = $1',
      interactions: 'SELECT COUNT(*) FROM interactions'
    };

    const stats = {};
    for (const [key, query] of Object.entries(queries)) {
      const result = await pool.query(query, key === 'interactions' ? [] : ['active']);
      stats[key] = parseInt(result.rows[0].count);
    }

    return stats;
  } catch (error) {
    console.error('Error getting database stats:', error);
    throw error;
  }
};

module.exports = {
  pool,
  testConnection,
  initializeDatabase,
  getDatabaseStats
};