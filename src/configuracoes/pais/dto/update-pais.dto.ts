import { PartialType } from '@nestjs/swagger';
import { CreatePaisDto } from './create-pais.dto.js';

export class UpdatePaisDto extends PartialType(CreatePaisDto) {}
