import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Compra, CompraDocument } from './schemas/compra.schema';
import { Cliente } from '../clientes/schemas/cliente.schema';
import { Produto } from '../produtos/schemas/produto.schema';
import { Model } from 'mongoose';
import { CreateCompraDto } from './dto/create-compra.dto';

@Injectable()
export class ComprasService {
  constructor(
    @InjectModel(Compra.name) private compraModel: Model<CompraDocument>,
    @InjectModel(Cliente.name) private clienteModel: Model<Cliente>,
    @InjectModel(Produto.name) private produtoModel: Model<Produto>,
  ) {}

  async create(dto: CreateCompraDto): Promise<Compra> {
    const cliente = await this.clienteModel.findById(dto.cliente_id);
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    const produto = await this.produtoModel.findById(dto.produto_id);
    if (!produto) throw new NotFoundException('Produto não encontrado');

    const compra = new this.compraModel({
      cliente_id: dto.cliente_id,
      produto_id: dto.produto_id,
    });

    return compra.save();
  }

  async findAll(clienteId?: string): Promise<Compra[]> {
    const filtro = clienteId ? { cliente_id: clienteId } : {};
    return this.compraModel
      .find(filtro)
      .populate('cliente_id', 'nome email')
      .populate('produto_id', 'nome preco');
 }

}
