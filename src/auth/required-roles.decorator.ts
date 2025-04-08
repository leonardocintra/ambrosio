import { SetMetadata } from '@nestjs/common';
import { ROLE_ENUM } from 'src/commons/enums/enums';

export const RequiredRoles = (...roles: ROLE_ENUM[]) =>
  SetMetadata('roles', roles);
