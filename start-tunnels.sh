#!/bin/bash

echo "🚀 Iniciando túneles de Cloudflare..."
echo ""
echo "📡 Backend (puerto 3000) y Frontend (puerto 5173)"
echo "=================================================="
echo ""

# Iniciar túnel del backend en background
echo "🔵 Iniciando túnel del BACKEND (puerto 3000)..."
cloudflared tunnel --url http://localhost:3000 > backend-tunnel.log 2>&1 &
BACKEND_PID=$!

# Esperar a que se genere la URL del backend
sleep 3
BACKEND_URL=$(grep -oP 'https://[^\s]+\.trycloudflare\.com' backend-tunnel.log | head -1)

echo "✅ Backend URL: $BACKEND_URL"
echo ""

# Iniciar túnel del frontend en background
echo "🟢 Iniciando túnel del FRONTEND (puerto 5173)..."
cloudflared tunnel --url http://localhost:5173 > frontend-tunnel.log 2>&1 &
FRONTEND_PID=$!

# Esperar a que se genere la URL del frontend
sleep 3
FRONTEND_URL=$(grep -oP 'https://[^\s]+\.trycloudflare\.com' frontend-tunnel.log | head -1)

echo "✅ Frontend URL: $FRONTEND_URL"
echo ""
echo "=================================================="
echo "📝 IMPORTANTE: Actualiza tu archivo .env con:"
echo ""
echo "PUBLIC_URL=$BACKEND_URL"
echo "FRONTEND_URL=$FRONTEND_URL"
echo ""
echo "=================================================="
echo "🎯 Configura el webhook en Mercado Pago:"
echo "$BACKEND_URL/webhooks/mercadopago"
echo ""
echo "=================================================="
echo "⚠️  PIDs de los procesos:"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Para detener los túneles ejecuta:"
echo "kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "O ejecuta: ./stop-tunnels.sh"
echo ""
echo "Presiona Ctrl+C para detener ambos túneles..."

# Guardar PIDs para el script de stop
echo $BACKEND_PID > .backend_tunnel.pid
echo $FRONTEND_PID > .frontend_tunnel.pid

# Esperar a que se presione Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; rm -f .backend_tunnel.pid .frontend_tunnel.pid backend-tunnel.log frontend-tunnel.log; echo ''; echo '🛑 Túneles detenidos'; exit 0" INT

# Mantener el script corriendo y mostrar logs en tiempo real
tail -f backend-tunnel.log frontend-tunnel.log
