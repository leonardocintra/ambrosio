/* eslint-disable @typescript-eslint/no-explicit-any */
import { Equipe, Pessoa } from 'neocatecumenal';

export function serializeEquipeResponse(
  equipe: any,
  pessoas: Pessoa[],
): Equipe {
  return {
    id: equipe.id,
    descricao: equipe.descricao,
    tipoEquipe: equipe.tipoEquipe,
    pessoas,
    observacao: equipe.observacao,
    createdAt: equipe.createdAt,
    updatedAt: equipe.updatedAt,
  };
}

export function serializeEquipeResponseList(equipes: any[]): Equipe[] {
  return equipes.map((equipe) =>
    serializeEquipeResponse(
      equipe,
      equipe.equipePessoas?.map((ep: any) => ep.pessoa) || [],
    ),
  );
}
