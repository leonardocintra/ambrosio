import { IsString, MaxLength } from "class-validator";

export class CreatePaisDto {
  @IsString()
  @MaxLength(50)
  nome: string;
}
