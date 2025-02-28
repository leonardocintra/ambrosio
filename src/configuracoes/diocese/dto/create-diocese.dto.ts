import { Type } from 'class-transformer';
import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateTipoDioceseDto } from 'src/configuracoes/tipo-diocese/dto/create-tipo-diocese.dto';
import { CreateEnderecoDto } from 'src/endereco/dto/create-endereco.dto';

export class CreateLocalidadeDioceseDto {
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;
}

export class CreateDioceseDto {
  @IsString()
  @MaxLength(50)
  descricao: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateTipoDioceseDto)
  tipoDiocese: CreateTipoDioceseDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLocalidadeDioceseDto)
  localidade: CreateLocalidadeDioceseDto[];

  @MaxLength(200)
  @IsOptional()
  observacao?: string;
}
