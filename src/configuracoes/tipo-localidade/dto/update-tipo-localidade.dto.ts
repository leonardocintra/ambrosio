import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoLocalidadeDto } from './create-tipo-localidade.dto';

export class UpdateTipoLocalidadeDto extends PartialType(CreateTipoLocalidadeDto) {}
