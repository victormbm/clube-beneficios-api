import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesModule } from './clientes/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ComprasModule } from './compras/compras.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/clube-beneficios'),
    ClientesModule,
    ProdutosModule,
    ComprasModule,
  ],
})
export class AppModule {}