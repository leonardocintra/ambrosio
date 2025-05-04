import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class FindAllParoquiasQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'dioceseId deve ser um número inteiro válido' })
  @Min(1, { message: 'dioceseId deve ser maior que zero' })
  dioceseId?: number;
}
