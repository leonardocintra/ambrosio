import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoDioceseDto } from './create-tipo-diocese.dto';

export class UpdateTipoDioceseDto extends PartialType(CreateTipoDioceseDto) {}
