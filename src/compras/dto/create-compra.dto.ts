import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateCompraDto {
  @IsNotEmpty()
  @IsMongoId()
  cliente_id: string;

  @IsNotEmpty()
  @IsMongoId()
  produto_id: string;
}
