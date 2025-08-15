import { Injectable, ForbiddenException } from '@nestjs/common';
import {
  CaslAbilityService,
  PermActions,
  PermissionResource,
} from 'src/casl/casl-ability/casl-ability.service';

@Injectable()
export abstract class BaseService {
  constructor(protected readonly abilityService: CaslAbilityService) {}

  protected validateAbility(
    action: PermActions,
    resource: PermissionResource,
    customMessage?: string,
  ) {
    const { ability } = this.abilityService;
    if (!ability.can(action, resource)) {
      const message =
        customMessage || `Você não tem permissão para ${action} ${resource}`;
      throw new ForbiddenException(message);
    }
  }

  protected validateCreateAbility(
    resource: PermissionResource,
    customMessage?: string,
  ) {
    this.validateAbility('create', resource, customMessage);
  }

  protected validateUpdateAbility(
    resource: PermissionResource,
    customMessage?: string,
  ) {
    this.validateAbility('update', resource, customMessage);
  }

  protected validateDeleteAbility(
    resource: PermissionResource,
    customMessage?: string,
  ) {
    this.validateAbility('delete', resource, customMessage);
  }

  protected validateReadAbility(
    resource: PermissionResource,
    customMessage?: string,
  ) {
    this.validateAbility('read', resource, customMessage);
  }
}
