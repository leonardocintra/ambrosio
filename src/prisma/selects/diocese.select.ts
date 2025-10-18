import { ENDERECO_SELECT } from './endereco.select';

export const DIOCESE_SELECT = {
  id: true,
  descricao: true,
  endereco: {
    select: ENDERECO_SELECT,
  },
  tipoDiocese: {
    select: {
      id: true,
      descricao: true,
    },
  },
};
