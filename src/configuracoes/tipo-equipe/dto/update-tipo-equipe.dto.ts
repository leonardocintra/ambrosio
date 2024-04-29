import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoEquipeDto } from './create-tipo-equipe.dto';

export class UpdateTipoEquipeDto extends PartialType(CreateTipoEquipeDto) {}
