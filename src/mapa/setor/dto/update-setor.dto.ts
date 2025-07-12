import { PartialType } from '@nestjs/swagger';
import { CreateSetorDto } from './create-setor.dto';

export class UpdateSetorDto extends PartialType(CreateSetorDto) {}
