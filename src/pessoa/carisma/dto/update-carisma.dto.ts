import { PartialType } from '@nestjs/swagger';
import { CreateCarismaDto } from './create-carisma.dto';

export class UpdateCarismaDto extends PartialType(CreateCarismaDto) {}
