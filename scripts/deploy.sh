#!/bin/bash
echo "🚀 Iniciando despliegue de Universal Bot Platform..."

# Parar servicios previos
docker-compose -f docker-compose.prod.yml down

# Build de nuevas imágenes
docker-compose -f docker-compose.prod.yml build

# Iniciar servicios
docker-compose -f docker-compose.prod.yml up -d

echo "✅ Despliegue completado!"
echo "📊 Backend: http://localhost:3000/health"
echo "🎨 Frontend: http://localhost"
echo "📈 Analytics: http://localhost/dashboard"