export const ENDERECO_SELECT = {
  id: true,
  cep: true,
  logradouro: true,
  bairro: true,
  numero: true,
  observacao: true,
  cidade: {
    select: {
      id: true,
      nome: true,
      estado: {
        select: {
          id: true,
          sigla: true,
          nome: true,
          pais: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      },
    },
  },
};

export const SELECT_CIDADE = {
  id: true,
  nome: true,
  estado: {
    select: {
      sigla: true,
      nome: true,
      pais: {
        select: {
          nome: true,
          lingua: true,
        },
      },
    },
  },
};
