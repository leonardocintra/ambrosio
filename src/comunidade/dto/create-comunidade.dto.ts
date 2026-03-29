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
  @IsInt()
  @IsPositive()
  @Max(30)
  @Min(1)
  numeroDaComunidade: number;

  @IsInt()
  @IsPositive()
  @Max(120, { message: 'A comunidade deve ter no máximo 120 membros.' })
  @Min(5, { message: 'A comunidade deve ter no mínimo 5 membros.' })
  quantidadeMembros: number;

  @IsNumber()
  @IsPositive()
  @IsInt()
  paroquiaId: number;

  @IsOptional()
  @MaxLength(250)
  @IsString()
  observacao?: string;
}
