import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CreateSetorDto } from './create-setor.dto';

export class UpdateSetorDto extends CreateSetorDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
}
