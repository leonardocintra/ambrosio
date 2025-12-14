import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateComunidadeDto {
  @IsOptional()
  @MaxLength(80)
  descricao: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @Max(30)
  @Min(1)
  numeroDaComunidade: number;

  @IsNumber()
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
  observacao: string;
}
