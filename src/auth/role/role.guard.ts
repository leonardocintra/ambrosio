import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_ENUM } from 'src/commons/enums/enums';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<ROLE_ENUM[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authUser = request.user;
    if (!authUser) {
      return false;
    }

    return (
      authUser!.role === ROLE_ENUM.ADMIN ||
      requiredRoles.includes(authUser!.role)
    );
  }
}
