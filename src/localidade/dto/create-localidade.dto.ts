import {
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateEnderecoDto } from 'src/endereco/dto/create-endereco.dto';

export class CreateLocalidadeDto {
  @MaxLength(80)
  @IsString()
  descricao: string;

  @IsOptional()
  @MaxLength(200)
  observacao: string;

  @IsObject()
  @ValidateNested({ each: true })
  endereco: CreateEnderecoDto;
}
