import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateTipoLocalidadeDto } from 'src/configuracoes/tipo-localidade/dto/create-tipo-localidade.dto';
import { CreateEnderecoDto } from 'src/endereco/dto/create-endereco.dto';

class DioceseDto {
  @IsPositive()
  @IsNumber()
  id: number;

  @IsString()
  @MaxLength(50)
  descricao: string;
}

export class CreateLocalidadeDto {
  @MaxLength(80)
  @IsString()
  descricao: string;

  @IsObject()
  @ValidateNested({ each: true })
  tipoLocalidade: CreateTipoLocalidadeDto;

  @IsOptional()
  @MaxLength(200)
  observacao: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => DioceseDto)
  diocese: DioceseDto;
}
