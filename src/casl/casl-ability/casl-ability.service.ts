import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { pessoa, user } from '@prisma/client';
import { ROLE_ENUM } from 'src/commons/enums/enums';

// para entende melhor: https://youtu.be/_ZyX4Vcofek?t=7648
export type PermActions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type PermissionResource =
  | Subjects<{ Pessoa: pessoa; User: user }>
  | 'all';
export type AppAbility = PureAbility<[PermActions, PermissionResource]>;
export type DefinePermissions = (
  user,
  builder: AbilityBuilder<AppAbility>,
) => void;

const rolePermissionsMap: Record<ROLE_ENUM, DefinePermissions> = {
  ADMIN(user, { can }) {
    can('manage', 'all');
  },
  CATEQUISTA_GRANDE_REGIAO(user, { can }) {
    can('read', 'Pessoa');
  },
  CATEQUISTA_NACIONAL(user, { can }) {
    can('read', 'Pessoa');
  },
  CATEQUISTA_PAROQUIA(user, { can }) {
    can('read', 'Pessoa');
  },
  CATEQUISTA_REGIAO(user, { can }) {
    can('read', 'Pessoa');
  },
  CATEQUISTA_SETOR(user, { can }) {
    can('read', 'Pessoa');
  },
  SECRETARIA_PAROQUIA(user, { can }) {
    can('read', 'Pessoa');
  },
  SECRETARIA_CNC(user, { can }) {
    can('read', 'Pessoa');
  },
};


// PAREI https://youtu.be/_ZyX4Vcofek?t=7990

@Injectable()
export class CaslAbilityService {
  ability: AppAbility;

  createForUser(user: user) {
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
    rolePermissionsMap[user.role](user, builder);
    this.ability = builder.build();

    return this.ability;
  }
}
