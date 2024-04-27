import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRegiaoDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  id: number;

  @MaxLength(50)
  @IsString()
  descricao: string;
}
