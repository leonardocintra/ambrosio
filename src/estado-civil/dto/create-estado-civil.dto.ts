import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateEstadoCivilDto {
  @IsNotEmpty()
  @MaxLength(20)
  descricao: string;
}
