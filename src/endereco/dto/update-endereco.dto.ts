import { CreateEnderecoDto } from './create-endereco.dto.js';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateEnderecoDto extends CreateEnderecoDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
}
