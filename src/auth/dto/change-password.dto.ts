import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(6, { message: 'A nova senha deve ter no mínimo 6 caracteres' })
  newPassword: string;
}
