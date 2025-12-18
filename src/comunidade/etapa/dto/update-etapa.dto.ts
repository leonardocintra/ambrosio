import { PartialType } from '@nestjs/swagger';
import { CreateEtapaDto } from './create-etapa.dto';

export class UpdateEtapaDto extends PartialType(CreateEtapaDto) {}
