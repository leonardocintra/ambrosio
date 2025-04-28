// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeEndereco(end: any) {
  const { endereco } = end;
  
  return {
    id: endereco.id,
    cep: endereco.cep,
    logradouro: endereco.logradouro,
    numero: endereco.numero,
    bairro: endereco.bairro,
    cidade: {
      id: endereco.cidadeId,
      nome: endereco.cidade.nome,
    },
    estado: {
      id: endereco.cidade.estadoId,
      sigla: endereco.cidade.estado.sigla,
      nome: endereco.cidade.estado.nome,
    },
    pais: {
      id: endereco.cidade.estado.paisId,
      nome: endereco.cidade.estado.pais.nome,
    },
    observacao: endereco.observacao,
  };
}
