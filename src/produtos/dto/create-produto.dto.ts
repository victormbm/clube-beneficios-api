import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  preco: number;
}
