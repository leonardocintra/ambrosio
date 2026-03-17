import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EtapaEnum } from 'neocatecumenal';

export class UpdateEtapaDto {
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
  @IsDate()
  @Type(() => Date)
  dataFim?: Date;

  @IsOptional()
  @MaxLength(180)
  localConvivencia?: string;

  @IsOptional()
  @MaxLength(250)
  observacao?: string;
}
