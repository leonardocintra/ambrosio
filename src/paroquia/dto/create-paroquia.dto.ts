import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateEnderecoDto } from 'src/endereco/dto/create-endereco.dto';

class DioceseDto {
  @IsNumber()
  @IsPositive()
  id: number;
}

class SetorDto {
  @IsNumber()
  @IsPositive()
  id: number;
}

export class CreateParoquiaDto {
  @IsString()
  @MaxLength(50)
  descricao: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => DioceseDto)
  diocese: DioceseDto;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => SetorDto)
  setor: SetorDto;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;
}
