// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientesService } from '../clientes/clientes.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private clientesService: ClientesService,
    private jwtService: JwtService,
  ) {}

  async validateCliente(email: string, senha: string): Promise<any> {
    const cliente = await this.clientesService.findByEmail(email);
    if (cliente && (await bcrypt.compare(senha, cliente.senha))) {
      const { senha, ...result } = cliente;
      return result;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  login(cliente: { _id: string; email: string }) {
    const payload = { sub: cliente._id, email: cliente.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
