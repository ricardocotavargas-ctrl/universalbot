# Universal Bot Platform - Complete Startup Script
Write-Host "🚀 Starting Universal Bot Platform..." -ForegroundColor Green
Write-Host "📅 $(Get-Date)" -ForegroundColor Gray

# Function to check command availability
function Test-Command {
    param($command)
    try {
        Get-Command $command -ErrorAction Stop > $null
        return $true
    } catch {
        return $false
    }
}

# Check required commands
Write-Host "🔍 Checking system requirements..." -ForegroundColor Yellow
$requirements = @{
    "Node.js" = Test-Command "node"
    "npm" = Test-Command "npm" 
    "PostgreSQL" = Test-Command "psql"
}

foreach ($req in $requirements.GetEnumerator()) {
    if ($req.Value) {
        Write-Host "✅ $($req.Key) is installed" -ForegroundColor Green
    } else {
        Write-Host "❌ $($req.Key) is NOT installed" -ForegroundColor Red
    }
}

if (-not $requirements["Node.js"] -or -not $requirements["npm"]) {
    Write-Host "❌ Please install Node.js and npm first" -ForegroundColor Red
    exit 1
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✅ .env file created. Please update with your values." -ForegroundColor Green
    } else {
        Write-Host "❌ .env.example also not found. Please create .env file manually." -ForegroundColor Red
        exit 1
    }
}

# Load environment variables
$envContent = Get-Content ".env" -Raw
$dbHost = ($envContent | Select-String "DB_HOST=(.+)$").Matches.Groups[1].Value
$dbPort = ($envContent | Select-String "DB_PORT=(.+)$").Matches.Groups[1].Value
$dbName = ($envContent | Select-String "DB_NAME=(.+)$").Matches.Groups[1].Value
$dbUser = ($envContent | Select-String "DB_USER=(.+)$").Matches.Groups[1].Value
$dbPass = ($envContent | Select-String "DB_PASSWORD=(.+)$").Matches.Groups[1].Value

# Check database connection
Write-Host "🔍 Testing database connection..." -ForegroundColor Yellow
try {
    $env:PGPASSWORD = $dbPass
    $dbTest = psql -h $dbHost -p $dbPort -U $dbUser -d $dbName -c "SELECT 1" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database connection successful" -ForegroundColor Green
    } else {
        Write-Host "❌ Database connection failed. Setting up database..." -ForegroundColor Yellow
        node scripts/setup-database.js
    }
} catch {
    Write-Host "❌ Database error: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    $env:PGPASSWORD = ""
}

# Install backend dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
        exit 1
    }
}

# Setup frontend
$frontendPath = "frontend/admin-panel"
if (Test-Path $frontendPath) {
    Write-Host "⚛️ Setting up frontend..." -ForegroundColor Yellow
    Set-Location $frontendPath
    
    # Create essential directories
    $directories = @("public", "src")
    foreach ($dir in $directories) {
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir | Out-Null
            Write-Host "✅ Created $dir directory" -ForegroundColor Green
        }
    }
    
    # Create essential files
    $essentialFiles = @{
        "public/index.html" = @'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Universal Bot Admin</title>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
</html>
'@
        "src/index.js" = @'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
'@
        "src/index.css" = @'
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
'@
    }

    foreach ($file in $essentialFiles.GetEnumerator()) {
        if (-not (Test-Path $file.Name)) {
            Set-Content -Path $file.Name -Value $file.Value
            Write-Host "✅ Created $($file.Name)" -ForegroundColor Green
        }
    }

    # Install frontend dependencies
    if (-not (Test-Path "node_modules")) {
        Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
            Set-Location ../..
            exit 1
        }
    }
    
    Set-Location ../..
} else {
    Write-Host "⚠️ Frontend directory not found. Skipping frontend setup." -ForegroundColor Yellow
}

# Start backend server
Write-Host "🌐 Starting backend server on port 3000..." -ForegroundColor Yellow
$backendProcess = Start-Process -PassThru -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev"

# Wait for backend to start
Write-Host "⏳ Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start frontend if available
if (Test-Path $frontendPath) {
    Write-Host "⚛️ Starting frontend server on port 3001..." -ForegroundColor Yellow
    $frontendProcess = Start-Process -PassThru -NoNewWindow -FilePath "npm" -ArgumentList "start" -WorkingDirectory $frontendPath
}

Write-Host "✅ Universal Bot Platform is starting up!" -ForegroundColor Green
Write-Host "`n📋 Access URLs:" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Admin Panel: http://localhost:3001" -ForegroundColor Yellow
Write-Host "Health Check: http://localhost:3000/health" -ForegroundColor Yellow

Write-Host "`n🎯 Next steps:" -ForegroundColor Cyan
Write-Host "1. Wait for servers to start completely" -ForegroundColor Yellow
Write-Host "2. Open http://localhost:3001 in your browser" -ForegroundColor Yellow
Write-Host "3. Login with default credentials or register" -ForegroundColor Yellow

Write-Host "`n⏳ Servers are starting... (Press Ctrl+C to stop)" -ForegroundColor Magenta

# Handle graceful shutdown
try {
    # Keep script running
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host "`n🛑 Shutting down servers..." -ForegroundColor Yellow
    if ($backendProcess) { 
        try { Stop-Process -Id $backendProcess.Id -Force -ErrorAction SilentlyContinue } 
        catch { Write-Host "⚠️ Could not stop backend process" -ForegroundColor Yellow }
    }
    if ($frontendProcess) { 
        try { Stop-Process -Id $frontendProcess.Id -Force -ErrorAction SilentlyContinue } 
        catch { Write-Host "⚠️ Could not stop frontend process" -ForegroundColor Yellow }
    }
    Write-Host "✅ Servers stopped" -ForegroundColor Green
}