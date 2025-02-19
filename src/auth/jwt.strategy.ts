import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Para que se rechace si el token expiró
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // El objeto retornado estará disponible en req.user
    return { id: payload.sub, email: payload.email, rol: payload.rol };
  }
}
