# Script de instalación específico para el frontend
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Green

# Check if Node.js is installed
if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    Write-Host "📥 Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Node.js version: $(node --version)" -ForegroundColor Green

# Navigate to frontend directory
$frontendPath = "frontend/admin-panel"
if (-not (Test-Path $frontendPath)) {
    Write-Host "❌ Frontend directory not found: $frontendPath" -ForegroundColor Red
    exit 1
}

Set-Location $frontendPath

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found in frontend directory" -ForegroundColor Red
    exit 1
}

# Create public directory if it doesn't exist
if (-not (Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" | Out-Null
    Write-Host "✅ Created public directory" -ForegroundColor Green
}

# Create src directory if it doesn't exist
if (-not (Test-Path "src")) {
    New-Item -ItemType Directory -Path "src" | Out-Null
    Write-Host "✅ Created src directory" -ForegroundColor Green
}

# Create essential files if they don't exist
$essentialFiles = @{
    "public/index.html" = @"
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Panel de administración para Universal Bot Platform"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <title>Universal Bot Admin</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
"@
    
    "public/manifest.json" = @"
{
  "short_name": "Universal Bot",
  "name": "Universal Bot Platform Admin",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
"@
    
    "src/index.js" = @"
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
"@
    
    "src/index.css" = @"
body {
  margin: 0;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

* {
  box-sizing: border-box;
}

#root {
  min-height: 100vh;
}
"@
}

foreach ($file in $essentialFiles.GetEnumerator()) {
    if (-not (Test-Path $file.Name)) {
        Set-Content -Path $file.Name -Value $file.Value
        Write-Host "✅ Created $($file.Name)" -ForegroundColor Green
    }
}

# Install dependencies
Write-Host "📦 Installing npm dependencies..." -ForegroundColor Yellow
npm install

# Check if react-scripts is installed
if (-not (Test-Path "node_modules/.bin/react-scripts")) {
    Write-Host "🔧 Installing react-scripts..." -ForegroundColor Yellow
    npm install react-scripts --save
}

Write-Host "✅ Frontend installation completed!" -ForegroundColor Green
Write-Host "`n🚀 To start the frontend development server:" -ForegroundColor Cyan
Write-Host "npm start" -ForegroundColor Yellow
Write-Host "`n📋 The frontend will be available at: http://localhost:3001" -ForegroundColor Cyan

Set-Location ../..