import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CreateSetorDto } from './create-setor.dto.js';

export class UpdateSetorDto extends CreateSetorDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
}
