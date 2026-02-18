import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserRole } from '../../est-depo/dtos/user.dto';

/**
 * Guard para verificar que el usuario sea ADMIN
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const isAdmin = user.rol === UserRole.ADMIN;

    if (!isAdmin) {
      throw new ForbiddenException(
        'Acceso denegado: Solo administradores pueden realizar esta acción',
      );
    }

    return true;
  }
}
