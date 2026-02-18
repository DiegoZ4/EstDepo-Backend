# 🌐 Configuración de Túneles Cloudflare

Este proyecto requiere exponer tanto el backend como el frontend públicamente para trabajar con Mercado Pago.

## 📋 Pasos de configuración

### 1. Iniciar los túneles

```bash
./start-tunnels.sh
```

Este script:
- ✅ Crea un túnel para el backend (puerto 3000)
- ✅ Crea un túnel para el frontend (puerto 5173)
- ✅ Muestra las URLs públicas generadas
- ✅ Te indica qué valores actualizar en el `.env`

### 2. Actualizar el archivo `.env`

El script te mostrará algo como:

```
PUBLIC_URL=https://abc-123.trycloudflare.com
FRONTEND_URL=https://xyz-456.trycloudflare.com
```

Copia esas líneas y actualiza tu archivo `.env` con esos valores.

### 3. Reiniciar el servidor backend

```bash
npm run start:dev
```

### 4. Configurar webhook en Mercado Pago

Ve a tu panel de Mercado Pago y configura el webhook:

```
https://abc-123.trycloudflare.com/webhooks/mercadopago
```

(Usa la URL del **backend** que te mostró el script)

### 5. Iniciar el frontend

Si tu frontend está en otra carpeta, ve allí y ejecuta:

```bash
npm run dev
```

El frontend ya estará accesible en la URL pública del frontend.

## 🛑 Detener los túneles

```bash
./stop-tunnels.sh
```

O simplemente presiona `Ctrl+C` en la terminal donde ejecutaste `start-tunnels.sh`.

## 📝 Notas importantes

- Las URLs de Cloudflare son **temporales** y cambian cada vez que reinicias los túneles
- Debes actualizar el `.env` cada vez que reinicies los túneles
- Debes reiniciar el servidor backend después de actualizar el `.env`
- El webhook en Mercado Pago debe actualizarse con la nueva URL del backend

## 🔍 Ver logs de los túneles

Si ejecutas `start-tunnels.sh` con `&` en background:

```bash
# Ver logs del backend
tail -f backend-tunnel.log

# Ver logs del frontend  
tail -f frontend-tunnel.log
```

## 🐛 Troubleshooting

### Los túneles no inician

Verifica que `cloudflared` esté instalado:

```bash
cloudflared --version
```

Si no está instalado, instálalo desde: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

### El frontend no conecta con el backend

Verifica que tu frontend esté configurado para usar la URL pública del backend, no `localhost:3000`.

### Mercado Pago no llama al webhook

1. Verifica que la URL del webhook esté bien configurada en el panel de MP
2. Verifica que el túnel del backend esté corriendo
3. Revisa los logs: `tail -f backend-tunnel.log`
