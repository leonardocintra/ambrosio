import {
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTipoDioceseDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @MaxLength(50)
  descricao: string;
}
