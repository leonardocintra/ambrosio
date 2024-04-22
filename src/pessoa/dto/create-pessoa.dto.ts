import { escolaridade, estadoCivil, tipoCarisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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

  escolaridade: escolaridade;

  tipoCarisma: tipoCarisma;
}
