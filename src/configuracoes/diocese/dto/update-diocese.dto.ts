import { PartialType } from '@nestjs/mapped-types';
import { CreateDioceseDto } from './create-diocese.dto';

export class UpdateDioceseDto extends PartialType(CreateDioceseDto) {}
