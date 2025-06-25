import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Produto, ProdutoDocument } from './schemas/produto.schema';
import { Model } from 'mongoose';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectModel(Produto.name) private produtoModel: Model<ProdutoDocument>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const produto = new this.produtoModel(createProdutoDto);
    return produto.save();
  }
}
