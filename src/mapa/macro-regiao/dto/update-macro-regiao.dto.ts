import { PartialType } from '@nestjs/swagger';
import { CreateMacroRegiaoDto } from './create-macro-regiao.dto';

export class UpdateMacroRegiaoDto extends PartialType(CreateMacroRegiaoDto) {}
