import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class PessoasDaEquipeDto {
  @IsInt()
  @IsPositive()
  id: number;
}

export class CreateEquipeDto {
  @MaxLength(80)
  @IsString()
  descricao: string;

  @IsInt()
  @IsPositive()
  tipoEquipeId: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacao?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PessoasDaEquipeDto)
  pessoas: PessoasDaEquipeDto[];
}
