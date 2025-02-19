import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // Endpoint para login tradicional usando LocalAuthGuard
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
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
}
