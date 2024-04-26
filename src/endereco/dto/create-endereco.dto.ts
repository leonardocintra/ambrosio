import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEnderecoDto {
  @IsNumber()
  pessoaId: number;

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

  @MaxLength(20)
  @IsString()
  @IsOptional()
  pais: string;

  @MaxLength(2)
  @MinLength(2)
  @IsString()
  UF: string;
}
