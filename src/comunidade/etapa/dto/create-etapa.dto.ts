import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class CreateEtapaDto {
  @IsNumber()
  @IsPositive()
  comunidadeId: number;

  @IsNumber()
  @IsPositive()
  etapaId: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  equipeId?: number;

  @IsOptional()
  @IsDate()
  dataInicio?: Date;

  @IsOptional()
  @IsDate()
  dataFim?: Date;

  @IsOptional()
  @MaxLength(180)
  localConvivencia?: string;

  @IsOptional()
  @MaxLength(250)
  observacao?: string;
}
