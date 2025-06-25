import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { Compra } from './schemas/compra.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateCompraDto): Promise<Compra> {
    return this.comprasService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query('cliente_id') clienteId?: string): Promise<Compra[]> {
    return this.comprasService.findAll(clienteId);
  }
}
