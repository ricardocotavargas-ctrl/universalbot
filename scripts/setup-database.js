const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

async function setupDatabase() {
    try {
        // First connect to default postgres database to create our database
        const adminPool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'postgres'
        });

        console.log('🔗 Connecting to PostgreSQL...');
        
        // Check if database exists
        const dbCheck = await adminPool.query(
            'SELECT 1 FROM pg_database WHERE datname = $1',
            [process.env.DB_NAME]
        );

        if (dbCheck.rows.length === 0) {
            console.log('📦 Creating database...');
            await adminPool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
            console.log('✅ Database created');
        } else {
            console.log('✅ Database already exists');
        }

        await adminPool.end();

        // Now connect to the target database and run setup script
        const targetPool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('📋 Running setup script...');
        
        // Read and execute the SQL setup file
        const setupSqlPath = path.join(__dirname, '../database/setup_database.sql');
        if (fs.existsSync(setupSqlPath)) {
            const setupSql = fs.readFileSync(setupSqlPath, 'utf8');
            await targetPool.query(setupSql);
            console.log('✅ Database setup completed successfully');
        } else {
            console.log('❌ Setup SQL file not found:', setupSqlPath);
        }
        
        await targetPool.end();
        
    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        process.exit(1);
    }
}

// Run the setup
setupDatabase();