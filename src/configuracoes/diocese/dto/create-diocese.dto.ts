import { Type } from 'class-transformer';
import { IsObject, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CreateTipoDioceseDto } from 'src/configuracoes/tipo-diocese/dto/create-tipo-diocese.dto';
import { CreateEnderecoDto } from 'src/endereco/dto/create-endereco.dto';

export class CreateDioceseDto {
  @IsString()
  @MaxLength(50)
  descricao: string;

  @IsObject()
  @ValidateNested({ each: true })
  tipo: CreateTipoDioceseDto;
}
