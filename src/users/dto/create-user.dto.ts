import { IsEmail, IsMobilePhone, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsMobilePhone('pt-BR')
  @MaxLength(13)
  whatsapp: string;
}
