/* eslint-disable @typescript-eslint/no-explicit-any */
import { Comunidade, EtapaEnum } from 'neocatecumenal';

export default function serializeComunidadeResponse(
  comunidade: any,
): Comunidade {
  return {
    id: comunidade.id,
    descricao: comunidade.descricao,
    numeroDaComunidade: comunidade.numeroDaComunidade,
    quantidadeMembros: comunidade.quantidadeMembros,
    observacao: comunidade.observacao,
    comunidadeEtapas: comunidade.comunidadeEtapas.map((etapa) => ({
      id: etapa.id,
      etapaId: etapa.etapaId,
      etapa: Object.values(EtapaEnum)[etapa.etapaId - 1],
      comunidadeId: etapa.comunidadeId,
      dataInicio: etapa.dataInicio,
      dataFim: etapa.dataFim,
      equipe: etapa.equipe
        ? {
            id: etapa.equipe.id,
            descricao: etapa.equipe.descricao,
            tipoEquipeId: etapa.equipe.tipoEquipeId,
            observacao: etapa.equipe.observacao,
            createdAt: etapa.equipe.createdAt,
            updatedAt: etapa.equipe.updatedAt,
            tipoEquipe: null,
            pessoas: [],
          }
        : null,
      observacao: etapa.observacao,
    })),
    paroquia: {
      id: comunidade.paroquia.id,
      descricao: comunidade.paroquia.descricao,
      endereco: null,
      setor: null,
      diocese: {
        id: comunidade.paroquia.diocese.id,
        descricao: comunidade.paroquia.diocese.descricao,
        tipoDiocese: {
          id: comunidade.paroquia.diocese.tipoDiocese.id,
          descricao: comunidade.paroquia.diocese.tipoDiocese.descricao,
        },
        endereco: comunidade.paroquia.diocese.endereco,
      },
    },
  };
}
