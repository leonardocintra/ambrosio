import { IsString, MaxLength } from 'class-validator';

export class CreateTipoEquipeDto {
  @IsString()
  @MaxLength(50)
  descricao: string;
}
