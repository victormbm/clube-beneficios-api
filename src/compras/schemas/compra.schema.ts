import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompraDocument = Compra & Document;

@Schema({ timestamps: true })
export class Compra {
  @Prop({ type: Types.ObjectId, ref: 'Cliente', required: true })
  cliente_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Produto', required: true })
  produto_id: Types.ObjectId;
}

export const CompraSchema = SchemaFactory.createForClass(Compra);
