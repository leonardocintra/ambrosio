import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
} from 'class-validator';
import { EtapaEnum } from 'neocatecumenal';

export class CreateEtapaDto {
  @IsNumber()
  @IsPositive()
  comunidadeId: number;

  @IsEnum(EtapaEnum)
  etapa: EtapaEnum;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  equipeId?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dataInicio?: Date;

  @IsOptional()
  @MaxLength(180)
  localConvivencia?: string;

  @IsOptional()
  @MaxLength(250)
  observacao?: string;
}
