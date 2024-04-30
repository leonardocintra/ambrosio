import {
  escolaridade,
  estadoCivil,
  tipoCarisma,
  tipoPessoa,
} from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Sexo } from 'src/commons/enums/enums';

export class CreatePessoaDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  nome: string;

  @MaxLength(50)
  @IsString()
  nacionalidade: string;

  @IsNotEmpty()
  estadoCivil: estadoCivil;

  @IsOptional()
  foto: string;

  @IsEnum(Sexo)
  @IsOptional()
  sexo: string;

  @IsNotEmpty()
  escolaridade: escolaridade;

  @IsNotEmpty()
  tipoCarisma: tipoCarisma;

  @IsNotEmpty()
  tipoPessoa: tipoPessoa;
}
