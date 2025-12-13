import { PartialType } from '@nestjs/swagger';
import { CreateComunidadeDto } from './create-comunidade.dto';

export class UpdateComunidadeDto extends PartialType(CreateComunidadeDto) {}
