import { PartialType } from '@nestjs/mapped-types';
import { CreateRegioeDto } from './create-regioe.dto';

export class UpdateRegioeDto extends PartialType(CreateRegioeDto) {}
