import { PartialType } from '@nestjs/mapped-types';
import { CreateRegiaoDto } from './create-regioe.dto';

export class UpdateRegioeDto extends PartialType(CreateRegiaoDto) {}
