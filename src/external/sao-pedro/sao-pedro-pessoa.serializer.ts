import { Pessoa } from 'neocatecumenal';
import { ExternalResponsePessoaDto } from './dto/external-response-pessoa.dto';

export function serializeExternalPessoaResponse(
  data: ExternalResponsePessoaDto,
): Pessoa {
  return {
    id: data.id,
    externalId: data.uuid,
    nome: data.nome,
    cpf: data.cpf,
    ativo: data.ativo,
    conhecidoPor: data.conhecidoPor,
    dataNascimento: data.dataNascimento,
    escolaridade: data.escolaridade,
    estadoCivil: data.estadoCivil,
    nacionalidade: data.nacionalidade,
    sexo: data.sexo,
    situacaoReligiosa: data.situacaoReligiosa,
    foto: data.foto,
  };
}

export function serializeExternalPessoasResponse(
  dataArray: ExternalResponsePessoaDto[],
): Pessoa[] {
  return dataArray.map((data) => serializeExternalPessoaResponse(data));
}
