# Script de instalación simplificado sin dependencias problemáticas
Write-Host "📦 Installing essential dependencies..." -ForegroundColor Green

# Install main dependencies
$dependencies = @(
    "express",
    "cors", 
    "helmet",
    "morgan",
    "dotenv",
    "bcrypt",
    "jsonwebtoken",
    "axios",
    "twilio",
    "natural",
    "pg",
    "crypto-js",
    "node-cron",
    "uuid"
)

foreach ($dep in $dependencies) {
    Write-Host "📦 Installing $dep..." -ForegroundColor Yellow
    npm install $dep
}

# Install dev dependencies
Write-Host "🔧 Installing development dependencies..." -ForegroundColor Yellow
npm install --save-dev nodemon eslint jest @types/node

Write-Host "✅ All dependencies installed successfully!" -ForegroundColor Green