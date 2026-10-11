import { PartialType } from '@nestjs/swagger';
import { CreateHistoricoDto } from './create-historico.dto.js';

export class UpdateHistoricoDto extends PartialType(CreateHistoricoDto) {}
