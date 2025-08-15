import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSetorDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  id: number;

  @IsString()
  @MaxLength(50)
  descricao: string;
}
