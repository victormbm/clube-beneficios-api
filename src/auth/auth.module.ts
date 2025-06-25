// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: 'jwt_secret_key', signOptions: { expiresIn: '1d' } }),
    ClientesModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
