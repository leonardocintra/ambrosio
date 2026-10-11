import { PartialType } from '@nestjs/swagger';
import { CreateCarismaDto } from './create-carisma.dto.js';

export class UpdateCarismaDto extends PartialType(CreateCarismaDto) {}
