import { IsString, MaxLength } from 'class-validator';

export class CreateSetorDto {
  @IsString()
  @MaxLength(50)
  descricao: string;
}
