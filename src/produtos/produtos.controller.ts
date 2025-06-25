import { Body, Controller, Post } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { Produto } from './schemas/produto.schema';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  async create(@Body() dto: CreateProdutoDto): Promise<Produto> {
    return this.produtosService.create(dto);
  }
}
