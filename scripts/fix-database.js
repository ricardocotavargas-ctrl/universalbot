const { pool } = require('../src/core/database');

async function fixCustomersTable() {
  try {
    console.log('🔄 Arreglando tabla customers...');
    
    // Agregar columnas faltantes y modificar existentes
    const fixQueries = [
      `ALTER TABLE customers ALTER COLUMN platform TYPE VARCHAR(50)`,
      `ALTER TABLE customers ADD COLUMN IF NOT EXISTS name VARCHAR(100)`,
      `ALTER TABLE customers ADD COLUMN IF NOT EXISTS email VARCHAR(255)`
    ];

    for (const query of fixQueries) {
      await pool.query(query);
      console.log(`✅ Ejecutado: ${query}`);
    }

    console.log('✅ Tabla customers arreglada exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error arreglando tabla:', error);
    process.exit(1);
  }
}

fixCustomersTable();