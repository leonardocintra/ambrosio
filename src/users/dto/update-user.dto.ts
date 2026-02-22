import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { UserRoleEnum } from 'neocatecumenal';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  resetPasswordToken?: string;

  @IsOptional()
  resetPasswordExpires?: Date;

  @IsOptional()
  @IsBoolean({ message: 'O campo active deve ser um booleano' })
  active?: boolean;

  @IsOptional()
  @IsEnum(UserRoleEnum, {
    message: `O campo role deve ser um dos seguintes valores: ${Object.values(UserRoleEnum).join(', ')}`,
  })
  role?: UserRoleEnum;
}
