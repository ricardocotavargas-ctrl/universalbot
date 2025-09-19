// scripts/check-table.js
const { pool } = require('../src/core/database');

async function checkTableStructure() {
  try {
    console.log('🔍 Verificando estructura de la tabla customers...');
    
    const result = await pool.query(`
      SELECT column_name, data_type, character_maximum_length, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'customers'
      ORDER BY ordinal_position
    `);
    
    console.log('📊 Estructura actual de la tabla customers:');
    result.rows.forEach(col => {
      console.log(`   ${col.column_name}: ${col.data_type}${col.character_maximum_length ? `(${col.character_maximum_length})` : ''} ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error verificando tabla:', error);
    process.exit(1);
  }
}

checkTableStructure();