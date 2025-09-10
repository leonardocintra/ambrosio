import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ExternalCreatePessoaDto {

  @IsString()
  @MaxLength(150)
  nome: string;

  @IsString()
  @MaxLength(11)
  cpf: string;

  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  conhecidoPor?: string;

  @IsOptional()
  @IsDateString()
  dataNascimento?: Date;

  @IsOptional()
  @IsString()
  escolaridade?: string;

  @IsOptional()
  @IsString()
  estadoCivil?: string;

  @IsOptional()
  @IsString()
  nacionalidade?: string;

  @IsOptional()
  @IsString()
  sexo?: string;

  @IsOptional()
  @IsString()
  foto?: string;
}
