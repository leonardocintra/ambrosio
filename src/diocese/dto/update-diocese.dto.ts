import { PartialType } from '@nestjs/mapped-types';
import { CreateDioceseDto } from './create-diocese.dto';

import { UpdateEnderecoDto } from 'src/endereco/dto/update-endereco.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDioceseDto extends PartialType(CreateDioceseDto) {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateEnderecoDto)
  endereco: UpdateEnderecoDto;
}
