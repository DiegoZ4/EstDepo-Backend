# ⚠️ CONFIGURACIÓN CRÍTICA: Webhook de Mercado Pago

## 🚨 Problema detectado

En los logs veo que `lastPaymentId: null` - esto significa que el webhook de pagos **NO está llegando** a tu backend.

Sin este webhook, **NO se pueden procesar reembolsos**.

---

## 📝 Cómo configurar el webhook en Mercado Pago

### 1. Ir al panel de Mercado Pago

Ve a: https://www.mercadopago.com.ar/developers/panel/app

### 2. Seleccionar tu aplicación

Busca la aplicación con las credenciales que estás usando (`APP_USR-2052760449608720-020911-...`)

### 3. Ir a "Webhooks" o "Notificaciones"

En el menú lateral, busca la sección de **Webhooks** o **Notificaciones IPN**

### 4. Agregar nueva URL de webhook

Configura la siguiente URL:

```
https://pas-gary-obituaries-altered.trycloudflare.com/webhooks/mercadopago
```

⚠️ **IMPORTANTE**: Esta URL cambia cada vez que reinicias los túneles de Cloudflare. Debes actualizarla cada vez.

### 5. Seleccionar eventos

Marca estos eventos:
- ✅ `subscription_preapproval` (cambios en suscripciones)
- ✅ `subscription_authorized_payment` (pagos recurrentes) **← CRÍTICO para reembolsos**
- ✅ `payment` (opcional, para más visibilidad)

### 6. Guardar y activar

Guarda la configuración y asegúrate de que el webhook esté **activo**.

---

## 🧪 Cómo verificar que funciona

### Después de configurar:

1. **Crea una nueva suscripción** desde tu frontend
2. **Completa el pago** en Mercado Pago
3. **Revisa los logs del backend**, deberías ver:

```
🔔 Webhook recibido:
   Type: subscription_authorized_payment
   Payment ID: 123456789
   Preapproval ID: abc123...
✅ Payment ID guardado: 123456789 para usuario: email@example.com
```

### Si NO ves ese log:

- ❌ El webhook NO está configurado correctamente
- ❌ La URL pública no es accesible
- ❌ Mercado Pago no puede comunicarse con tu servidor

---

## 🔍 Debugging

### Verificar que el túnel esté funcionando:

```bash
curl https://pas-gary-obituaries-altered.trycloudflare.com/webhooks/mercadopago
```

Deberías ver una respuesta (aunque sea un error), no "Cannot be reached"

### Ver logs en tiempo real:

```bash
# Terminal del backend
npm run start:dev

# Verás todos los webhooks que lleguen
```

---

## ⏰ Cambio realizado: Suscripción de 15 minutos

He cambiado la configuración a:
- **Frecuencia**: 15 minutos (antes: 1 mes)
- **Monto**: $100 ARS
- **Próximo cobro**: 15 minutos después de autorizar

### Para probarlo:

1. Crea una nueva suscripción
2. Completa el pago
3. **Espera 15 minutos**
4. Mercado Pago debería hacer el segundo cobro automáticamente
5. Recibirás otro webhook `subscription_authorized_payment`

---

## 📊 Timeline esperado:

```
Minuto 0:  Usuario se suscribe
Minuto 0:  Usuario paga → Webhook: subscription_preapproval (status=authorized)
Minuto 0:  Webhook: subscription_authorized_payment (payment_id se guarda) ← CRÍTICO
Minuto 15: MP cobra automáticamente de nuevo
Minuto 15: Webhook: subscription_authorized_payment (nuevo payment_id)
Minuto 30: MP cobra automáticamente de nuevo
...y así cada 15 minutos
```

---

## 🎯 Para volver a producción (1 mes):

En [subscription.service.ts](src/subscriptions/subscription.service.ts):

**Cambiar línea ~117:**
```typescript
frequency: 1,
frequency_type: 'months',
```

**Cambiar línea ~138:**
```typescript
endDate.setMonth(endDate.getMonth() + 1);
```

**Cambiar línea ~606:**
```typescript
calculatedEndDate.setMonth(calculatedEndDate.getMonth() + 1);
```

---

## ❓ ¿Necesitas ayuda?

Si después de configurar el webhook sigues sin ver logs de `subscription_authorized_payment`, hay un problema de conectividad o configuración en MP.

Puedes ver el historial de webhooks en el panel de MP para verificar si están llegando y cuál fue la respuesta.
