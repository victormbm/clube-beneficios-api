import { Body, Controller, Post } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ClientesService } from './clientes.service';
import { Cliente } from './schemas/cliente.schema';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clientesService.create(createClienteDto);
  }
}