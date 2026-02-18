import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { SubscriptionService } from '../subscription.service';

/**
 * Guard de verificación de suscripción premium (1.9)
 * 
 * Uso:
 * @UseGuards(JwtAuthGuard, PremiumGuard)
 * @Get('premium-feature')
 * async premiumFeature() { ... }
 */
@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const userId = user.sub || user.id;
    const isPremium = await this.subscriptionService.isPremiumUser(userId);

    if (!isPremium) {
      throw new ForbiddenException(
        'Esta funcionalidad requiere una suscripción premium activa',
      );
    }

    return true;
  }
}
