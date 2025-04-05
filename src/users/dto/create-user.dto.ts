import { ROLE_ENUM } from 'src/commons/enums/enums';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: ROLE_ENUM;
}
