// scripts/recreate-customers-table.js
const { pool } = require('../src/core/database');

async function recreateCustomersTable() {
  try {
    console.log('🔄 Recreando tabla customers desde cero...');
    
    // 1. Hacer backup de datos existentes (si los hay)
    const existingData = await pool.query('SELECT * FROM customers');
    console.log(`📦 Datos existentes: ${existingData.rows.length} registros`);
    
    // 2. Eliminar tabla existente
    await pool.query('DROP TABLE IF EXISTS customers CASCADE');
    console.log('✅ Tabla antigua eliminada');
    
    // 3. Crear nueva tabla con estructura correcta
    await pool.query(`
      CREATE TABLE customers (
        id SERIAL PRIMARY KEY,
        business_id INTEGER NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        name VARCHAR(100),
        email VARCHAR(255),
        platform VARCHAR(50) DEFAULT 'whatsapp',
        last_interaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (business_id) REFERENCES businesses(id),
        UNIQUE (business_id, phone_number)
      )
    `);
    console.log('✅ Nueva tabla customers creada');
    
    // 4. Crear índices
    await pool.query('CREATE INDEX idx_customers_business ON customers(business_id)');
    await pool.query('CREATE INDEX idx_customers_phone ON customers(phone_number)');
    await pool.query('CREATE INDEX idx_customers_interaction ON customers(last_interaction)');
    console.log('✅ Índices creados');
    
    // 5. Reinsertar datos existentes (opcional)
    if (existingData.rows.length > 0) {
      for (const row of existingData.rows) {
        await pool.query(
          'INSERT INTO customers (business_id, phone_number, name, email, platform, last_interaction) VALUES ($1, $2, $3, $4, $5, $6)',
          [row.business_id, row.phone_number, row.name, row.email, row.platform, row.last_interaction]
        );
      }
      console.log(`✅ ${existingData.rows.length} registros reinsertados`);
    }
    
    console.log('🎉 Tabla customers recreada exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error recreando tabla:', error);
    process.exit(1);
  }
}

recreateCustomersTable();