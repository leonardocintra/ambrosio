import {
  IsEmail,
  IsMobilePhone,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsMobilePhone('pt-BR')
  @MaxLength(13)
  whatsapp: string;

  @MaxLength(11)
  @MinLength(11)
  @IsNumberString()
  cpf: string;
}
