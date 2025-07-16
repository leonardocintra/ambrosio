import {
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO para cada item de carisma
class CarismaItemDto {
  @IsInt()
  id: number;

  @IsString()
  nome: string;
}

// DTO para agrupar os tipos de carisma
class CarismasDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CarismaItemDto)
  primitivos?: CarismaItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CarismaItemDto)
  vinculados?: CarismaItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CarismaItemDto)
  servicos?: CarismaItemDto[];
}

// DTO principal
export class CreateCarismasDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CarismasDto)
  carismas: CarismasDto;
}
