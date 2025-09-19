# Universal Bot Platform - Backup Script
Write-Host "📦 Starting Backup Process..." -ForegroundColor Green

# Load environment variables
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found" -ForegroundColor Red
    exit 1
}

# Read database configuration from .env
$envContent = Get-Content ".env" -Raw
$dbHost = ($envContent | Select-String "DB_HOST=(.+)$").Matches.Groups[1].Value
$dbPort = ($envContent | Select-String "DB_PORT=(.+)$").Matches.Groups[1].Value
$dbName = ($envContent | Select-String "DB_NAME=(.+)$").Matches.Groups[1].Value
$dbUser = ($envContent | Select-String "DB_USER=(.+)$").Matches.Groups[1].Value
$dbPass = ($envContent | Select-String "DB_PASSWORD=(.+)$").Matches.Groups[1].Value

# Create backup directory
$backupDir = ".\backups"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

# Generate backup filename with timestamp
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = "$backupDir\${dbName}_backup_$timestamp.sql"
$backupZip = "$backupFile.gz"

Write-Host "🔍 Database: $dbName" -ForegroundColor Yellow
Write-Host "📁 Backup file: $backupZip" -ForegroundColor Yellow

# Set PostgreSQL password environment variable
$env:PGPASSWORD = $dbPass

try {
    # Create database backup
    Write-Host "💾 Creating database backup..." -ForegroundColor Yellow
    & pg_dump -h $dbHost -p $dbPort -U $dbUser -d $dbName -F c -b -v -f $backupFile
    
    # Compress backup
    Write-Host "🗜️ Compressing backup file..." -ForegroundColor Yellow
    & gzip -f $backupFile
    
    # Verify backup was created
    if (Test-Path $backupZip) {
        $fileSize = (Get-Item $backupZip).Length / 1MB
        Write-Host "✅ Backup completed successfully!" -ForegroundColor Green
        Write-Host "📊 File size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
    } else {
        throw "Backup file was not created"
    }
    
    # Clean up old backups (keep only last 7 days)
    Write-Host "🧹 Cleaning up old backups..." -ForegroundColor Yellow
    Get-ChildItem $backupDir -Filter "*.gz" | Where-Object {
        $_.LastWriteTime -lt (Get-Date).AddDays(-7)
    } | ForEach-Object {
        Write-Host "Removing old backup: $($_.Name)"
        Remove-Item $_.FullName
    }
    
} catch {
    Write-Host "❌ Backup failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} finally {
    # Clear password from environment
    $env:PGPASSWORD = ""
}

Write-Host "🎉 Backup process completed!" -ForegroundColor Green
Write-Host "📦 Backup stored at: $backupZip" -ForegroundColor Cyan

# Optional: Upload to cloud storage
$uploadToCloud = Read-Host "Do you want to upload to cloud storage? (y/N)"
if ($uploadToCloud -eq 'y') {
    Write-Host "☁️ Uploading to cloud storage..." -ForegroundColor Yellow
    # Add your cloud storage upload logic here
}