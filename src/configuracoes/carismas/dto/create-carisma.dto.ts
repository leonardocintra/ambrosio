import {
  IsArray,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

class CarismaItemDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  descricao: string;
}

export class CreateCarismaDto {
  @IsNumber()
  @IsPositive()
  pessoaId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CarismaItemDto)
  carismas: CarismaItemDto[];
}
