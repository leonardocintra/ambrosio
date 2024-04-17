import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoCivilDto } from './create-estado-civil.dto';

export class UpdateEstadoCivilDto extends PartialType(CreateEstadoCivilDto) {}
