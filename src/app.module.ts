import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesModule } from './clientes/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ComprasModule } from './compras/compras.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/clube-beneficios'),
    ClientesModule,
    ProdutosModule,
    ComprasModule,
    AuthModule,
  ],
})
export class AppModule {}