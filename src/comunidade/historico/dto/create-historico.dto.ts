import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateHistoricoDto {
  @IsPositive()
  @IsNumber()
  comunidadeId: number;

  @IsPositive()
  @IsNumber()
  numeroComunidade: number;

  @IsString()
  @IsOptional()
  catequistas?: string;

  @IsString()
  @IsOptional()
  localConvivencia?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dataConvivencia?: Date;

  @IsOptional()
  @IsString()
  responsavel?: string;

  @IsOptional()
  @IsString()
  coResponsavel?: string;
}
