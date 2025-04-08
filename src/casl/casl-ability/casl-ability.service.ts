import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { Injectable, Scope } from '@nestjs/common';
import { diocese, pessoa, user } from '@prisma/client';
import { ROLE_ENUM } from 'src/commons/enums/enums';

export type PermActions = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type PermissionResource =
  | Subjects<{ pessoa: pessoa; user: user; diocese: diocese }>
  | 'all';

export type AppAbility = PureAbility<
  [PermActions, PermissionResource],
  PrismaQuery
>;

export type DefinePermissions = (
  user,
  builder: AbilityBuilder<AppAbility>,
) => void;

const rolePermissionsMap: Record<ROLE_ENUM, DefinePermissions> = {
  ADMIN(user, { can }) {
    can('manage', 'all');
  },
  CATEQUISTA_NACIONAL(user, { can }) {
    can('read', 'pessoa');
    can('read', 'diocese');
  },
  CATEQUISTA_GRANDE_REGIAO(user, { can }) {
    can('read', 'pessoa');
    can('read', 'diocese');
  },
  CATEQUISTA_SETOR(user, { can }) {
    can('read', 'pessoa');
    can('read', 'diocese');
  },
  CATEQUISTA_REGIAO(user, { can }) {
    can('read', 'pessoa');
    can('read', 'diocese');
  },
  CATEQUISTA_PAROQUIA(user, { can }) {
    can('read', 'pessoa');
    can('read', 'diocese');
  },
  SECRETARIA_PAROQUIA(user, { can }) {
    can('read', 'pessoa');
    can('read', 'diocese');
  },
  SECRETARIA_CNC(user, { can }) {
    can('read', 'pessoa');
    can('read', 'diocese');
  },
};

@Injectable({ scope: Scope.REQUEST })
export class CaslAbilityService {
  ability: AppAbility;

  createForUser(user: user) {
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
    rolePermissionsMap[user.role](user, builder);
    this.ability = builder.build();

    return this.ability;
  }
}
