// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../est-depo/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { UserRole, CreateUserDto } from '../../est-depo/dtos/user.dto';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {
    this.googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
  }

  // Valida las credenciales del usuario
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log('Input:', { email, password });
    console.log('User:', user);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('¿Coinciden las contraseñas?', isMatch);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }


  // Genera el token JWT
  async login(user: any) {
    const payload = { email: user.email, name: user.name, rol: user.rol, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Registro tradicional: crea el usuario, hashea la contraseña y retorna el token
  async register(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    if (userExists) {
      throw new UnauthorizedException('El usuario ya existe');
    }
    // Pasa la contraseña sin hashear, ya que el hook lo hará
    const newUser = await this.usersService.create(createUserDto);
    return this.login(newUser);
  }


  // Verifica el token de Google y retorna el payload
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
    const { email, name } = payload;
    let user = await this.usersService.findByEmail(email);
    if (!user) {
      // Puedes generar una contraseña aleatoria o dejarla vacía, según tu lógica
      user = await this.usersService.create({
        email,
        name,
        password: '',
        rol: UserRole.FREE_USER,
      });
    }
    return this.login(user);
  }
}
