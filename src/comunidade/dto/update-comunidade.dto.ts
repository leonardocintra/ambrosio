import { PartialType } from '@nestjs/swagger';
import { CreateComunidadeDto } from './create-comunidade.dto.js';
import { IsOptional, IsPositive } from 'class-validator';

export class UpdateComunidadeDto extends PartialType(CreateComunidadeDto) {
  @IsOptional()
  @IsPositive()
  etapaAtualId?: number;
}
