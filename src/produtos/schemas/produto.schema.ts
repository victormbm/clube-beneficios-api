import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProdutoDocument = Produto & Document;

@Schema({ timestamps: true })
export class Produto {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  preco: number;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
