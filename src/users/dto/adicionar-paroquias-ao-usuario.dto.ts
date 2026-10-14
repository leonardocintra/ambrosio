import { ArrayUnique, IsArray, IsInt, IsPositive } from 'class-validator';

export class AdicionarParoquiasAoUsuarioDto {
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  paroquiaIds: number[];
}
