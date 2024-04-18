import { PartialType } from '@nestjs/mapped-types';
import { CreateEscolaridadeDto } from './create-escolaridade.dto';

export class UpdateEscolaridadeDto extends PartialType(CreateEscolaridadeDto) {}
