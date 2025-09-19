# Universal Bot Platform - Startup Script
Write-Host "Starting Universal Bot Platform..." -ForegroundColor Green

if (-not (Test-Path ".env")) {
    Write-Host "ERROR: .env file not found" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "Setting up database..." -ForegroundColor Yellow
npm run setup-db

Write-Host "Starting backend server..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev"

if (Test-Path "frontend/admin-panel") {
    Write-Host "Starting frontend..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
    Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "start" -WorkingDirectory "frontend/admin-panel"
}

Write-Host "System started successfully!" -ForegroundColor Green