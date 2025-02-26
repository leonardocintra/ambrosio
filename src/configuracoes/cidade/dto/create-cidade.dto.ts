import { Type } from "class-transformer";
import { IsObject, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";

class EstadoDto {
  @IsString()
  @MaxLength(2)
  @MinLength(2)
  sigla: string;
}

export class CreateCidadeDto {
  @IsString()
  @MaxLength(100)
  @MinLength(2)
  nome: string;

  @IsObject()
  @ValidateNested()
  @Type(() => EstadoDto)
  estado: EstadoDto;
}
