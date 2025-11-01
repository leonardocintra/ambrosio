import { SituacaoReligiosa } from 'neocatecumenal';

export class ExternalResponsePessoaDto {
  id: number;
  uuid: string;
  nome: string;
  cpf: string;
  ativo: boolean;
  escolaridade: string;
  conhecidoPor?: string;
  dataNascimento?: Date;
  estadoCivil?: string;
  nacionalidade?: string;
  situacaoReligiosa?: SituacaoReligiosa;
  sexo?: string;
  foto?: string;
}
