# Universal Bot Platform Installation Script
Write-Host "🚀 Installing Universal Bot Platform..." -ForegroundColor Green

# Check if Node.js is installed
if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    Write-Host "📥 Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Node.js version: $(node --version)" -ForegroundColor Green

# Check if PostgreSQL is installed
if (-not (Get-Command "psql" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ PostgreSQL is not installed. Please install PostgreSQL first." -ForegroundColor Red
    Write-Host "📥 Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ PostgreSQL version: $(psql --version)" -ForegroundColor Green

# Create directory structure
Write-Host "📁 Creating directory structure..." -ForegroundColor Yellow
$directories = @(
    "src", "src/core", "src/services", "src/modules", "src/modules/ecommerce",
    "src/modules/healthcare", "src/modules/education", "src/modules/shared",
    "src/routes", "src/models", "src/utils", "src/middleware",
    "config", "database", "scripts", "storage", "storage/templates",
    "storage/uploads", "storage/logs", "frontend", "frontend/admin-panel",
    "frontend/client-portal", "docs"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

Write-Host "✅ Directory structure created" -ForegroundColor Green

# Initialize npm project
Write-Host "📦 Initializing npm project..." -ForegroundColor Yellow
npm init -y

# Install production dependencies
Write-Host "📦 Installing production dependencies..." -ForegroundColor Yellow
npm install express cors helmet morgan dotenv bcrypt jsonwebtoken axios twilio natural node-word2vec @tensorflow/tfjs-node pg crypto-js node-cron

# Install development dependencies
Write-Host "📦 Installing development dependencies..." -ForegroundColor Yellow
npm install --save-dev nodemon eslint @types/node typescript ts-node

# Create basic configuration files
Write-Host "⚙️ Creating configuration files..." -ForegroundColor Yellow

# Create .env file
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env" -ErrorAction SilentlyContinue
    Write-Host "✅ .env file created (please update with your values)" -ForegroundColor Green
}

# Create ecosystem.config.js for PM2
$ecosystemConfig = @"
module.exports = {
  apps: [{
    name: 'universal-bot',
    script: 'src/core/app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    watch: false,
    max_memory_restart: '1G',
    log_file: 'storage/logs/app.log',
    out_file: 'storage/logs/out.log',
    error_file: 'storage/logs/error.log',
    time: true,
    merge_logs: true,
    autorestart: true,
    restart_delay: 5000
  }]
};
"@
Set-Content -Path "ecosystem.config.js" -Value $ecosystemConfig

# Create package.json scripts
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
$packageJson.scripts = @{
    "start" = "node src/core/app.js";
    "dev" = "nodemon src/core/app.js";
    "setup-db" = "node scripts/setup-database.js";
    "migrate" = "node scripts/migrate.js";
    "backup" = "node scripts/backup.js";
    "test" = "jest";
    "lint" = "eslint src/**/*.js";
    "deploy" = "npm run migrate && pm2 reload ecosystem.config.js --env production"
}
$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"

Write-Host "✅ Configuration files created" -ForegroundColor Green

# Create setup database script
$setupScript = @"
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

async function setupDatabase() {
    try {
        const pool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'postgres' // Connect to default database first
        });

        console.log('🔗 Connecting to PostgreSQL...');
        
        // Check if database exists
        const dbCheck = await pool.query(
            'SELECT 1 FROM pg_database WHERE datname = $1',
            [process.env.DB_NAME]
        );

        if (dbCheck.rows.length === 0) {
            console.log('📦 Creating database...');
            await pool.query('CREATE DATABASE $1', [process.env.DB_NAME]);
            console.log('✅ Database created');
        } else {
            console.log('✅ Database already exists');
        }

        await pool.end();

        // Now connect to the target database and run setup script
        const targetPool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log('📋 Running setup script...');
        const setupSql = fs.readFileSync(path.join(__dirname, '../database/setup_database.sql'), 'utf8');
        await targetPool.query(setupSql);
        
        console.log('✅ Database setup completed successfully');
        await targetPool.end();
        
    } catch (error) {
        console.error('❌ Database setup failed:', error);
        process.exit(1);
    }
}

setupDatabase();
"@
Set-Content -Path "scripts/setup-database.js" -Value $setupScript

Write-Host "✅ Installation completed!" -ForegroundColor Green
Write-Host "`n📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Update .env file with your configuration" -ForegroundColor Yellow
Write-Host "2. Run: npm run setup-db" -ForegroundColor Yellow
Write-Host "3. Run: npm run dev" -ForegroundColor Yellow
Write-Host "4. Open: http://localhost:3000" -ForegroundColor Yellow
Write-Host "`n💡 Don't forget to configure your WhatsApp Business API!" -ForegroundColor Magenta