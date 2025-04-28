import { Endereco } from 'neocatecumenal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeEndereco(end: any): Endereco {
  return {
    id: end.id,
    cep: end.cep,
    logradouro: end.logradouro,
    numero: end.numero,
    bairro: end.bairro,
    complemento: end.complemento,
    observacao: end.observacao,
    cidade: {
      id: end.cidadeId,
      nome: end.cidade.nome,
      estado: {
        id: end.cidade.estadoId,
        sigla: end.cidade.estado.sigla,
        nome: end.cidade.estado.nome,
        pais: {
          id: end.cidade.estado.paisId,
          nome: end.cidade.estado.pais.nome,
        },
      },
    },
  };
}
