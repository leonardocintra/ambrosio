import { IsEmail, IsEnum, IsMobilePhone, IsString } from 'class-validator';
import { ROLE_ENUM } from 'src/commons/enums/enums';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(ROLE_ENUM)
  role: ROLE_ENUM;

  @IsMobilePhone('pt-BR')
  whatsapp: string;
}
