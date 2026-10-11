import { PartialType } from '@nestjs/mapped-types';
import { CreateLocalidadeDto } from './create-localidade.dto.js';

export class UpdateLocalidadeDto extends PartialType(CreateLocalidadeDto) {}
