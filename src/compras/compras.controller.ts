import { Body, Controller, Post } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { Compra } from './schemas/compra.schema';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  async create(@Body() dto: CreateCompraDto): Promise<Compra> {
    return this.comprasService.create(dto);
  }

   @Get()
  async findAll(@Query('cliente_id') clienteId?: string): Promise<Compra[]> {
    return this.comprasService.findAll(clienteId);
  }
}
