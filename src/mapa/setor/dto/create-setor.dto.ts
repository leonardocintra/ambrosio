import { IsString, MaxLength } from 'class-validator';

export class CreateSetorDto {
  id: number;

  @IsString()
  @MaxLength(50)
  descricao: string;
}
