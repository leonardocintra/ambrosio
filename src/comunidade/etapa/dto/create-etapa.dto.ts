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

  @IsOptional()
  @IsDate()
  dataInicio?: Date;

  @IsOptional()
  @IsDate()
  dataFim?: Date;

  @IsOptional()
  @MaxLength(250)
  observacao?: string;
}
