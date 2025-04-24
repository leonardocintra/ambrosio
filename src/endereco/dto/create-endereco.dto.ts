import {
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEnderecoDto {
  @IsNumberString()
  @MaxLength(8)
  @MinLength(8)
  cep: string;

  @MaxLength(50)
  logradouro: string;

  @MaxLength(5)
  numero: string;

  @MaxLength(50)
  @IsString()
  cidade: string;

  @MaxLength(50)
  @IsString()
  bairro: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  pais: string;

  @MaxLength(2)
  @MinLength(2)
  @IsString()
  @Matches(/^[A-Z]{2}$/i, { message: 'UF deve conter apenas letras' })
  UF: string;

  @MaxLength(250)
  @IsOptional()
  observacao: string;
}
