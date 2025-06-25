import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/clube-beneficios'),
    ClientesModule,
  ],
})
export class AppModule {}