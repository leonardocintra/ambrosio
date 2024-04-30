import { IsString, MaxLength } from 'class-validator';

export class CreateTipoPessoaDto {
  @IsString()
  @MaxLength(50)
  descricao: string;
}
