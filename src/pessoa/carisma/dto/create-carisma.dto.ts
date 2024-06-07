import { IsPositive } from 'class-validator';

export class CreateCarismaDto {
  @IsPositive()
  tipoCarismaId: number;

  @IsPositive()
  pessoaId: number;
}
