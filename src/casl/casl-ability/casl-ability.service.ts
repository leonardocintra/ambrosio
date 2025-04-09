import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { Injectable, Scope } from '@nestjs/common';
import { diocese, localidade, pessoa, user } from '@prisma/client';
import { ROLE_ENUM } from 'src/commons/enums/enums';

export type PermActions = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type PermissionResource =
  | Subjects<{
      pessoa: pessoa;
      user: user;
      diocese: diocese;
      localidade: localidade;
    }>
  | 'all';

export type AppAbility = PureAbility<
  [PermActions, PermissionResource],
  PrismaQuery
>;

export type DefinePermissions = (
  user,
  builder: AbilityBuilder<AppAbility>,
) => void;

// TODO: renomear essa funcao para algo comum que todos podem acessar
const grantReadPessoaDiocese: DefinePermissions = (user, { can }) => {
  can('read', 'pessoa');
  can('read', 'diocese');
};

const rolePermissionsMap: Record<ROLE_ENUM, DefinePermissions> = {
  ADMIN(user, { can }) {
    can('manage', 'all');
  },
  CATEQUISTA_NACIONAL: grantReadPessoaDiocese,
  CATEQUISTA_GRANDE_REGIAO: grantReadPessoaDiocese,
  CATEQUISTA_SETOR: grantReadPessoaDiocese,
  CATEQUISTA_REGIAO: grantReadPessoaDiocese,
  CATEQUISTA_PAROQUIA: grantReadPessoaDiocese,
  SECRETARIA_PAROQUIA: grantReadPessoaDiocese,
  SECRETARIA_CNC(user, { can }) {
    can('read', 'pessoa');
    can('read', 'diocese');
    can('read', 'localidade');
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
