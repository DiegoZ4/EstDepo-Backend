// auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../../est-depo/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
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

  // Envía un email con el link de recuperación de contraseña
  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // No revelamos si el email existe o no (seguridad)
      return { message: 'Si el email existe, se envió un link de recuperación' };
    }

    // Generar token único
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // Token válido por 1 hora

    // Guardar token en la DB
    await this.usersService.setResetPasswordToken(user.id, resetToken, expires);

    // Construir el link de recuperación
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Enviar el email
    await transporter.sendMail({
      from: `"EstDepo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Recuperación de contraseña - EstDepo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Recuperación de contraseña</h2>
          <p>Hola <strong>${user.name}</strong>,</p>
          <p>Recibimos una solicitud para restablecer tu contraseña. Hacé clic en el siguiente botón:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #4CAF50; color: white; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Restablecer contraseña
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">Este link expira en <strong>1 hora</strong>.</p>
          <p style="color: #666; font-size: 14px;">Si no solicitaste este cambio, ignorá este email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">EstDepo - Estadísticas Deportivas</p>
        </div>
      `,
    });

    return { message: 'Si el email existe, se envió un link de recuperación' };
  }

  // Restablece la contraseña usando el token
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.usersService.findByResetToken(token);

    if (!user) {
      throw new BadRequestException('Token inválido o expirado');
    }

    // Verificar que el token no haya expirado
    if (user.resetPasswordExpires && new Date() > new Date(user.resetPasswordExpires)) {
      throw new BadRequestException('Token expirado. Solicitá uno nuevo.');
    }

    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException('La contraseña debe tener al menos 6 caracteres');
    }

    // Actualizar la contraseña
    await this.usersService.resetPassword(user.id, newPassword);

    return { message: 'Contraseña actualizada correctamente' };
  }
}
