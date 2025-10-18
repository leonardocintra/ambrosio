import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class FindAllSetorQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'regiaoId deve ser um número inteiro válido' })
  @Min(1, { message: 'regiaoId deve ser maior que zero' })
  regiaoId?: number;
}
