import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateComunidadeDto {
  @IsOptional()
  @MaxLength(80)
  @IsString()
  descricao: string;

  @IsInt()
  @IsPositive()
  @Max(30)
  @Min(1)
  numeroDaComunidade: number;

  @IsInt()
  @IsPositive()
  @Max(80)
  @Min(5)
  quantidadeMembros: number;

  @IsNumber()
  @IsPositive()
  @IsInt()
  paroquiaId: number;

  @IsOptional()
  @MaxLength(250)
  @IsString()
  observacao: string;
}
