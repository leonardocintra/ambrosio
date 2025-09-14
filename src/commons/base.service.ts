import { Injectable, ForbiddenException, Logger } from '@nestjs/common';
import {
  CaslAbilityService,
  PermActions,
  PermissionResource,
} from 'src/casl/casl-ability/casl-ability.service';
import * as rTracer from 'cls-rtracer';

@Injectable()
export abstract class BaseService {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(protected readonly abilityService: CaslAbilityService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected log(message: string, data?: any) {
    this.logger.log({
      message,
      context: this.constructor.name,
      requestId: rTracer.id(), // pega o id da requisição atual
      ...data,
    });
  }

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
