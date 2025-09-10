import { Escolaridade, EstadoCivil, SituacaoReligiosa } from 'neocatecumenal';

export class ExternalResponsePessoaDto {
  id: number;
  uuid: string;
  nome: string;
  cpf: string;
  ativo: boolean;
  escolaridade?: Escolaridade;
  conhecidoPor?: string;
  dataNascimento?: Date;
  estadoCivil?: EstadoCivil;
  nacionalidade?: string;
  situacaoReligiosa?: SituacaoReligiosa;
  sexo?: string;
  foto?: string;
}
