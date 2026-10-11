import { COMUNIDADE_SELECT } from './comunidade.select.js';
import { DIOCESE_SELECT } from './diocese.select.js';
import { ENDERECO_SELECT } from './endereco.select.js';

export const PAROQUIA_SELECT = {
  id: true,
  descricao: true,
  endereco: {
    select: ENDERECO_SELECT,
  },
  diocese: {
    select: DIOCESE_SELECT,
  },
  comunidades: {
    select: COMUNIDADE_SELECT,
  },
  setor: true,
};
