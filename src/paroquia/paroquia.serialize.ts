import { Paroquia } from 'neocatecumenal';
import { serializeEndereco } from 'src/commons/utils/serializers/serializerEndereco';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeParoquia(paroquia: any): Paroquia {
  return {
    id: paroquia.id,
    descricao: paroquia.descricao,
    endereco: serializeEndereco(paroquia.endereco),
    setor: {
      id: paroquia.setor.id,
      descricao: paroquia.setor.descricao,
      ativo: paroquia.setor.ativo,
      regiao: null,
    },
    diocese: {
      id: paroquia.diocese.id,
      descricao: paroquia.diocese.descricao,
      endereco: serializeEndereco(paroquia.diocese.endereco),
      tipoDiocese: {
        id: paroquia.diocese.tipoDiocese.id,
        descricao: paroquia.diocese.tipoDiocese.descricao,
      },
    },
    comunidades: paroquia.comunidades.map((comunidade) => ({
      id: comunidade.id,
      numeroDaComunidade: comunidade.numeroDaComunidade,
      quantidadeMembros: comunidade.quantidadeMembros,
      observacao: comunidade.observacao,
      etapaAtual: comunidade.etapa,
    })),
  };
}
