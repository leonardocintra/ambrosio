import { CreateEnderecoDto } from './create-endereco.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateEnderecoDto extends CreateEnderecoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
