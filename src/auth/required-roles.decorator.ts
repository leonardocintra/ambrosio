import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from 'neocatecumenal';

export const RequiredRoles = (...roles: UserRoleEnum[]) =>
  SetMetadata('roles', roles);
