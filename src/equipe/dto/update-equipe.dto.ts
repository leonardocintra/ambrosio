import { PartialType } from '@nestjs/swagger';
import { CreateEquipeDto } from './create-equipe.dto.js';

export class UpdateEquipeDto extends PartialType(CreateEquipeDto) {}
