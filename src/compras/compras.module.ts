import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { Compra, CompraSchema } from './schemas/compra.schema';
import { Cliente, ClienteSchema } from '../clientes/schemas/cliente.schema';
import { Produto, ProdutoSchema } from '../produtos/schemas/produto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Compra.name, schema: CompraSchema },
      { name: Cliente.name, schema: ClienteSchema },
      { name: Produto.name, schema: ProdutoSchema },
    ]),
  ],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}
