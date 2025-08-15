import { PartialType } from '@nestjs/mapped-types';
import { CreateDioceseDto } from './create-diocese.dto';

import { UpdateEnderecoDto } from 'src/endereco/dto/update-endereco.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateSetorDto } from 'src/mapa/setor/dto/update-setor.dto';

export class UpdateDioceseDto extends PartialType(CreateDioceseDto) {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateEnderecoDto)
  endereco: UpdateEnderecoDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateSetorDto)
  setor: UpdateSetorDto;
}
