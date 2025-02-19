import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../est-depo/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { UserRole } from '../../est-depo/dtos/user.dto';


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Configurado en .env

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {
    this.googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
  }

  // Lógica de login tradicional
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // Puedes ajustar el payload según tus necesidades
    const payload = { email: user.email, name: user.name, rol: user.rol, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Lógica para Google: verifica el token y retorna los datos
  async verifyGoogleToken(token: string): Promise<any> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Token de Google inválido');
    }
    return payload;
  }

  // Registro o login con Google
  async registerOrLoginWithGoogle(token: string): Promise<any> {
    const payload = await this.verifyGoogleToken(token);
    // Por ejemplo, extrae email y nombre
    const { email, name, picture } = payload;
    // Busca el usuario en tu base de datos
    let user = await this.usersService.findByEmail(email);
    if (!user) {
      // Si no existe, crea un usuario nuevo (puedes ajustar los campos y la lógica)
      user = await this.usersService.create({
        email,
        name,
        password: '', // O una contraseña generada aleatoriamente, ya que se usa Google
        rol: UserRole.FREE_USER,
        // Otros campos necesarios...
      });
    }
    return this.login(user);
  }
}
