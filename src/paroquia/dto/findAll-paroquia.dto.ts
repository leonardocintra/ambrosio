import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class FindAllParoquiasQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'dioceseId deve ser um número inteiro válido' })
  @Min(1, { message: 'dioceseId deve ser maior que zero' })
  dioceseId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'cidadeId deve ser um número inteiro válido' })
  @Min(1, { message: 'cidadeId deve ser maior que zero' })
  cidadeId?: number;
}
