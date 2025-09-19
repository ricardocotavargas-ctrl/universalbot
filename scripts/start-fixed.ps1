# Universal Bot Platform - Startup Script
Write-Host "???? Starting Universal Bot Platform..." -ForegroundColor Green

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "??? .env file not found" -ForegroundColor Red
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "???? Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Setup database
Write-Host "??????? Setting up database..." -ForegroundColor Yellow
npm run setup-db

# Start backend
Write-Host "???? Starting backend server..." -ForegroundColor Yellow
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev"

# Start frontend if exists
if (Test-Path "frontend/admin-panel") {
    Write-Host "?????? Starting frontend..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "start" -WorkingDirectory "frontend/admin-panel"
}

Write-Host "??? System is starting up!" -ForegroundColor Green
Write-Host "Backend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3001" -ForegroundColor Yellow
