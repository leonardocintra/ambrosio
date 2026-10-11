import { PartialType } from '@nestjs/mapped-types';
import { CreateParoquiaDto } from './create-paroquia.dto.js';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateEnderecoDto } from 'src/endereco/dto/update-endereco.dto.js';

export class UpdateParoquiaDto extends PartialType(CreateParoquiaDto) {
  @ValidateNested({ each: true })
  @Type(() => UpdateEnderecoDto)
  endereco: UpdateEnderecoDto;
}
