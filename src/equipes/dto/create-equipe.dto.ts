import { IsString, MaxLength } from "class-validator";

export class CreateEquipeDto {

  @IsString()
  @MaxLength(50)
  descricao: string;
}
