import { PartialType } from '@nestjs/mapped-types';
import { CreateParoquiaDto } from './create-paroquia.dto';

export class UpdateParoquiaDto extends PartialType(CreateParoquiaDto) {}
