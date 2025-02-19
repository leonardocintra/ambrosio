import { PartialType } from '@nestjs/swagger';
import { CreatePaisDto } from './create-pais.dto';

export class UpdatePaisDto extends PartialType(CreatePaisDto) {}
