import { Type } from "class-transformer";
import { IsNumber, IsObject, IsOptional, IsPositive, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";

class PaisDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  nome: string;
}

export class CreateEstadoDto {
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  nome: string;

  @IsString()
  @MaxLength(2)
  @MinLength(2)
  sigla: string;

  @IsObject()
  @ValidateNested()
  @Type(() => PaisDto)
  pais: PaisDto;
}


