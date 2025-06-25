import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cliente, ClienteDocument } from './schemas/cliente.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectModel(Cliente.name) private clienteModel: Model<ClienteDocument>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const { email, senha, nome } = createClienteDto;

    const existing = await this.clienteModel.findOne({ email });
    if (existing) throw new ConflictException('E-mail já cadastrado.');

    const hashedPassword = await bcrypt.hash(senha, 10);

    const cliente = new this.clienteModel({
      nome,
      email,
      senha: hashedPassword,
    });

    return cliente.save();
  }
}
