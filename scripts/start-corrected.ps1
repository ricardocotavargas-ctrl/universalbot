# Universal Bot Platform - Corrected Startup Script
Write-Host "🚀 Starting Universal Bot Platform..." -ForegroundColor Green

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found. Please create it from .env.example" -ForegroundColor Red
    exit 1
}

# Check if node_modules exists for backend
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if database is set up
Write-Host "🔍 Checking database setup..." -ForegroundColor Yellow
try {
    # Simple connection test
    $env:PGPASSWORD = (Get-Content .env | Select-String "DB_PASSWORD=(.+)").Matches.Groups[1].Value
    $dbCheck = node -e "
        const { Pool } = require('pg');
        require('dotenv').config();
        
        const pool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        
        pool.query('SELECT 1')
            .then(() => {
                console.log('✅ Database connection successful');
                process.exit(0);
            })
            .catch(error => {
                console.error('❌ Database connection failed:', error.message);
                process.exit(1);
            });
    "
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Database not set up. Running setup..." -ForegroundColor Yellow
        npm run setup-db
    }
} catch {
    Write-Host "❌ Database check failed" -ForegroundColor Red
    exit 1
} finally {
    $env:PGPASSWORD = ""
}

# Start the backend server
Write-Host "🌐 Starting backend server on port 3000..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev"

# Wait for backend to start
Write-Host "⏳ Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Check if frontend exists and install/setup if needed
if (Test-Path "frontend/admin-panel") {
    Write-Host "⚛️ Setting up React admin panel..." -ForegroundColor Yellow
    Set-Location "frontend/admin-panel"
    
    # Check if frontend node_modules exists
    if (-not (Test-Path "node_modules")) {
        Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
        npm install
    }
    
    # Check if essential files exist
    if (-not (Test-Path "public/index.html") -or -not (Test-Path "src/index.js")) {
        Write-Host "🔧 Creating missing frontend files..." -ForegroundColor Yellow
        # Run the frontend install script
        Invoke-Expression "..\..\scripts\install-frontend.ps1"
    }
    
    Write-Host "🚀 Starting frontend development server on port 3001..." -ForegroundColor Yellow
    Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "start"
    Set-Location "../.."
} else {
    Write-Host "⚠️ Frontend admin panel not found. Skipping..." -ForegroundColor Yellow
}

Write-Host "✅ Universal Bot Platform is starting up!" -ForegroundColor Green
Write-Host "`n📋 Access URLs:" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Admin Panel: http://localhost:3001" -ForegroundColor Yellow
Write-Host "Health Check: http://localhost:3000/health" -ForegroundColor Yellow
Write-Host "`n🎯 Next steps:" -ForegroundColor Cyan
Write-Host "1. Wait for both servers to start" -ForegroundColor Yellow
Write-Host "2. Open http://localhost:3001" -ForegroundColor Yellow
Write-Host "3. Login with your credentials" -ForegroundColor Yellow
Write-Host "4. Configure your first business" -ForegroundColor Yellow

Write-Host "`n⏳ Waiting for servers to start..." -ForegroundColor Magenta