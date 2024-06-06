import { IsNumber, IsPositive } from 'class-validator';

export class CreateCasalDto {
  @IsPositive()
  @IsNumber()
  pessoaId: number;

  @IsPositive()
  @IsNumber()
  conjugueId: number;
}
