import { IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateTipoLocalidadeDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @MaxLength(80)
  descricao: string;
}
