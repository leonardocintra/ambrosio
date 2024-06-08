import { IsArray, IsNumber, IsPositive } from 'class-validator';

export class CreateCarismaDto {
  
  @IsArray()
  @IsNumber({}, { each: true })
  carismas: number[];

  @IsPositive()
  pessoaId: number;
}
