import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { ROLE_ENUM } from 'src/commons/enums/enums';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  resetPasswordToken?: string;

  @IsOptional()
  resetPasswordExpires?: Date;

  @IsOptional()
  @IsBoolean({ message: 'O campo active deve ser um booleano' })
  active?: boolean;

  @IsOptional()
  @IsEnum(ROLE_ENUM, {
    message: `O campo role deve ser um dos seguintes valores: ${Object.values(ROLE_ENUM).join(', ')}`,
  })
  role?: ROLE_ENUM;
}
