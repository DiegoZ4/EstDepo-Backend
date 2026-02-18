import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { SubscriptionService } from './subscription.service';
import {
  CreateSubscriptionDto,
  CreatePreapprovalPlanDto,
  CancelSubscriptionDto,
} from './dtos/subscription.dto';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  /**
   * Endpoint para crear el plan de suscripción en MP (1.3)
   * Este endpoint debería protegerse y usarse solo una vez
   */
  @Post('plan')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear plan de suscripción en Mercado Pago' })
  @ApiResponse({ status: 201, description: 'Plan creado exitosamente' })
  async createPlan(@Body() planData: CreatePreapprovalPlanDto) {
    return this.subscriptionService.createPreapprovalPlan(planData);
  }

  /**
   * Endpoint POST /api/subscriptions/create (1.4)
   * Crea una suscripción para el usuario autenticado
   */
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear suscripción para el usuario' })
  @ApiResponse({ status: 201, description: 'Suscripción creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async createSubscription(
    @Req() req: any,
    @Body() subscriptionData: CreateSubscriptionDto,
  ) {
    console.log('📧 Datos recibidos en el backend:', JSON.stringify(subscriptionData));
    const userId = req.user.sub || req.user.id;
    return this.subscriptionService.createSubscription(userId, subscriptionData);
  }

  /**
   * Endpoint GET /api/subscriptions/status (1.5)
   * Consulta el estado de la suscripción del usuario autenticado
   */
  @Get('status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener estado de suscripción del usuario' })
  @ApiResponse({ status: 200, description: 'Estado de suscripción' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getStatus(@Req() req: any) {
    const userId = req.user.sub || req.user.id;
    return this.subscriptionService.getSubscriptionStatus(userId);
  }

  /**
   * Endpoint PUT /api/subscriptions/cancel (1.6)
   * Cancela o pausa la suscripción del usuario
   */
  @Put('cancel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancelar o pausar suscripción' })
  @ApiResponse({ status: 200, description: 'Suscripción cancelada/pausada' })
  @ApiResponse({ status: 400, description: 'No tiene suscripción activa' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async cancelSubscription(
    @Req() req: any,
    @Body() cancelData: CancelSubscriptionDto,
  ) {
    const userId = req.user.sub || req.user.id;
    return this.subscriptionService.cancelSubscription(userId, cancelData.status);
  }

  /**
   * Endpoint DELETE /api/subscriptions/admin/:userId
   * Permite a un admin revocar el premium de cualquier usuario
   */
  @Delete('admin/:userId')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revocar premium de un usuario (solo admins)' })
  @ApiResponse({ status: 200, description: 'Premium revocado exitosamente' })
  @ApiResponse({ status: 400, description: 'Usuario no tiene suscripción' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado: Solo admins' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async revokeUserPremium(@Req() req: any, @Param('userId') userId: string) {
    const adminId = req.user.sub || req.user.id;
    return this.subscriptionService.revokeUserPremium(userId, adminId);
  }
}
