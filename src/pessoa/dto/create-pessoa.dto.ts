import { situacaoReligiosa } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  ESCOLARIDADE_ENUM,
  ESTADO_CIVIL_ENUM,
  SEXO_ENUM,
} from 'src/commons/enums/enums';

export class CreatePessoaDto {
  @IsNotEmpty()
  @MaxLength(150)
  @IsString()
  nome: string;

  @MaxLength(100)
  @IsString()
  @IsOptional()
  conhecidoPor: string;

  @MaxLength(11)
  @MinLength(11)
  @IsNumberString()
  @IsOptional()
  cpf: string;

  @MaxLength(50)
  @IsString()
  nacionalidade: string;

  @IsEnum(ESTADO_CIVIL_ENUM)
  @IsOptional()
  estadoCivil: string;

  @IsOptional()
  @IsDate({
    message:
      'A data de nascimento precisa estar no formato yyyy-mm-dd (Ex: 1994-05-15)',
  })
  @Type(() => Date)
  dataNascimento: Date;

  @IsOptional()
  foto: string;

  @IsEnum(SEXO_ENUM)
  @IsOptional()
  sexo: string;

  @IsEnum(ESCOLARIDADE_ENUM)
  @IsOptional()
  escolaridade: string;

  @IsNotEmpty()
  situacaoReligiosa: situacaoReligiosa;
}
