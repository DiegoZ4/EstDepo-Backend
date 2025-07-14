// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../est-depo/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { UserRole, CreateUserDto } from '../../est-depo/dtos/user.dto';
import { jwtConstants } from '../constants';

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


  // Genera los tokens JWT (access + refresh)
  async login(user: any) {
    const payload = {
      email: user.email,
      name: user.name,
      rol: user.rol,
      sub: user.id
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '7d', // Refresh token dura 7 días
    });

    // Hashear y guardar el refresh token en la base de datos
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
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

  // Valida y renueva tokens usando refresh token
  async refreshTokens(refreshToken: string): Promise<any> {
    try {
      // Verificar que el refresh token sea válido
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.secret,
      });

      // Obtener el usuario por ID
      const user = await this.usersService.findOne(payload.sub);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Refresh token inválido');
      }

      // Verificar que el refresh token coincida con el almacenado
      const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!refreshTokenMatches) {
        throw new UnauthorizedException('Refresh token inválido');
      }

      // Generar nuevos tokens
      return this.login(user);
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  // Logout - invalida el refresh token
  async logout(userId: string): Promise<void> {
    await this.usersService.updateRefreshToken(userId, null);
  }
}
