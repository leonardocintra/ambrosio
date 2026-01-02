import { DIOCESE_SELECT } from './diocese.select';
import { ENDERECO_SELECT } from './endereco.select';

export const PAROQUIA_SELECT = {
  id: true,
  descricao: true,
  endereco: {
    select: ENDERECO_SELECT,
  },
  diocese: {
    select: DIOCESE_SELECT,
  },
  comunidades: true,
  setor: true,
};
