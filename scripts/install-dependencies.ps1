# Script de instalación de dependencias completas
Write-Host "📦 Installing all dependencies..." -ForegroundColor Green

# Install backend dependencies
Write-Host "🔧 Installing backend dependencies..." -ForegroundColor Yellow
npm install

# Install dev dependencies
Write-Host "🔧 Installing development dependencies..." -ForegroundColor Yellow
npm install --save-dev nodemon eslint jest @types/node

# Install frontend dependencies if exists
if (Test-Path "frontend/admin-panel") {
    Write-Host "⚛️ Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location "frontend/admin-panel"
    npm install
    Set-Location "../.."
}

Write-Host "✅ All dependencies installed successfully!" -ForegroundColor Green
Write-Host "🚀 You can now run: npm run dev" -ForegroundColor Cyan