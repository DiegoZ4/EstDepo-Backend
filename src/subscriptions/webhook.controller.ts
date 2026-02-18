import { Controller, Post, Body, HttpCode, HttpStatus, Headers, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { SubscriptionService } from './subscription.service';
import { MercadoPagoWebhookDto } from './dtos/subscription.dto';

/**
 * Controlador de Webhooks de Mercado Pago (1.7)
 * 
 * Este controlador recibe las notificaciones de MP cuando cambia el estado
 * de una suscripción. Debes configurar la URL del webhook en el Panel de MP:
 * https://tudominio.com/webhooks/mercadopago
 */
@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhookController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  /**
   * Webhook POST /api/webhooks/mercadopago (1.7)
   * Recibe notificaciones de Mercado Pago
   */
  @Post('mercadopago')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Webhook de Mercado Pago para notificaciones' })
  @ApiResponse({ status: 200, description: 'Notificación procesada' })
  async handleMercadoPagoWebhook(
    @Body() webhookData: MercadoPagoWebhookDto,
    @Headers('x-signature') signature: string,
    @Res() res: Response,
  ) {
    try {
      // Log para debugging
      console.log('Webhook recibido:', JSON.stringify(webhookData));

      // Responder inmediatamente a MP (200 OK) para evitar reintentos
      res.status(HttpStatus.OK).json({ success: true, message: 'Webhook recibido' });

      // Procesar webhook de forma asíncrona (sin bloquear la respuesta)
      setImmediate(async () => {
        try {
          await this.subscriptionService.processWebhook(webhookData);
        } catch (error) {
          console.error('Error procesando webhook asíncronamente:', error.message);
        }
      });
    } catch (error) {
      console.error('Error manejando webhook:', error.message);
      // Si hay error antes de responder, enviar 200 para que MP no reintente
      if (!res.headersSent) {
        return res.status(HttpStatus.OK).json({
          success: false,
          message: error.message,
        });
      }
    }
  }
}
