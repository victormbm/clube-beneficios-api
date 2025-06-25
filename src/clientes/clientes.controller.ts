import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './schemas/cliente.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clientesService.create(createClienteDto);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Cliente[]> {
    return this.clientesService.findAll();
  }
}
