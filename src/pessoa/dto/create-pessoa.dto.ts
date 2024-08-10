import { escolaridade, estadoCivil, tipoPessoa } from '@prisma/client';
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
import { Sexo } from 'src/commons/enums/enums';

export class CreatePessoaDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  nome: string;

  @MaxLength(11)
  @MinLength(11)
  @IsNumberString()
  @IsOptional()
  cpf: string;

  @MaxLength(50)
  @IsString()
  nacionalidade: string;

  @IsNotEmpty()
  estadoCivil: estadoCivil;

  @IsOptional()
  @IsDate({ message: "A data de nascimento precisa estar no formato yyyy-mm-dd (Ex: 1994-05-15)" })
  @Type(() => Date)
  dataNascimento: Date;

  @IsOptional()
  foto: string;

  @IsEnum(Sexo)
  @IsOptional()
  sexo: string;

  @IsNotEmpty()
  escolaridade: escolaridade;

  @IsNotEmpty()
  tipoPessoa: tipoPessoa;
}
