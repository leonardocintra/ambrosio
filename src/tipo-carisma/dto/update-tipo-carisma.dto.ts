import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoCarismaDto } from './create-tipo-carisma.dto';

export class UpdateTipoCarismaDto extends PartialType(CreateTipoCarismaDto) {}
