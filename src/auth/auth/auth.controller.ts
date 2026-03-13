import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../local-auth.guard';
import { CreateUserDto } from 'src/est-depo/dtos/user.dto';
import { UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // Endpoint para login tradicional usando LocalAuthGuard



  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const token = await this.authService.register(createUserDto);
    return { message: 'Registro exitoso', access_token: token };
  }


  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    console.log(loginDto);
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  // Endpoint para login o registro con Google
  @Post('google/login')
  async googleLogin(@Body() body: { token: string }) {
    const result = await this.authService.registerOrLoginWithGoogle(body.token);
    // Devuelve el JWT
    return { access_token: result.access_token };
  }

  @Post('google/register')
  async googleRegister(@Body() body: { token: string }) {
    const result = await this.authService.registerOrLoginWithGoogle(body.token);
    // Devuelve el JWT
    return { access_token: result.access_token };
  }

  // Endpoint para renovar tokens usando refresh token
  @Post('refresh')
  async refreshTokens(@Body() body: { refresh_token: string }) {
    return this.authService.refreshTokens(body.refresh_token);
  }

  // Endpoint para logout
  @Post('logout')
  async logout(@Body() body: { userId: string }) {
    await this.authService.logout(body.userId);
    return { message: 'Logout exitoso' };
  }

  // Endpoint para solicitar recuperación de contraseña
  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }

  // Endpoint para restablecer la contraseña con el token
  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }
}
