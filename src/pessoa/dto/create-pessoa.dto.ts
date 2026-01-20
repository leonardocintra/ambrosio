import { situacaoReligiosa } from 'src/prisma/generated-client';
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
import { EscolaridadeEnum, EstadoCivilEnum } from 'neocatecumenal';
import { SEXO_ENUM } from 'src/commons/enums/enums';

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

  @IsEnum(EstadoCivilEnum)
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

  @IsEnum(EscolaridadeEnum)
  @IsOptional()
  escolaridade: string;

  @IsNotEmpty()
  situacaoReligiosa: situacaoReligiosa;
}
