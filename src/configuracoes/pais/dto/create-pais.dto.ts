import { IsString, MaxLength } from "class-validator";

export class CreatePaisDto {
  @IsString()
  @MaxLength(100)
  nome: string;
}
