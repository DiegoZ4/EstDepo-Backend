#!/bin/bash

echo "🛑 Deteniendo túneles de Cloudflare..."

if [ -f .backend_tunnel.pid ]; then
    BACKEND_PID=$(cat .backend_tunnel.pid)
    kill $BACKEND_PID 2>/dev/null
    echo "✅ Backend tunnel detenido (PID: $BACKEND_PID)"
    rm -f .backend_tunnel.pid
else
    echo "⚠️  No se encontró el PID del backend tunnel"
fi

if [ -f .frontend_tunnel.pid ]; then
    FRONTEND_PID=$(cat .frontend_tunnel.pid)
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Frontend tunnel detenido (PID: $FRONTEND_PID)"
    rm -f .frontend_tunnel.pid
else
    echo "⚠️  No se encontró el PID del frontend tunnel"
fi

# Limpiar logs
rm -f backend-tunnel.log frontend-tunnel.log

echo ""
echo "🎉 Túneles detenidos correctamente"
