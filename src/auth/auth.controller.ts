import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; senha: string },
  ): Promise<{ access_token: string }> {
    const { email, senha } = body;

    if (!email || !senha) {
      throw new UnauthorizedException('Email e senha são obrigatórios');
    }

    const cliente = await this.authService.validateCliente(email, senha);
    return this.authService.login(cliente);
  }
}
