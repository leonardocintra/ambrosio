import { IsString, MaxLength } from 'class-validator';

export class CreateRegioeDto {
  @MaxLength(50)
  @IsString()
  descricao: string;
}
