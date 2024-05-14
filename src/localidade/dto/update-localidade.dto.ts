import { PartialType } from '@nestjs/mapped-types';
import { CreateLocalidadeDto } from './create-localidade.dto';

export class UpdateLocalidadeDto extends PartialType(CreateLocalidadeDto) {}
