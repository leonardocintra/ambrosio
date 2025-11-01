/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pessoa } from 'neocatecumenal';
import { serializeEndereco } from 'src/commons/utils/serializers/serializerEndereco';

export function serializePessoaResponse(
  pessoa: any,
  external: Pessoa,
  conjugue?: any,
): Pessoa {
  return {
    id: pessoa.id,
    externalId: external.externalId,
    nome: external.nome,
    conhecidoPor: external.conhecidoPor,
    cpf: external.cpf,
    sexo: external.sexo,
    nacionalidade: external.nacionalidade,
    estadoCivil: external.estadoCivil,
    dataNascimento: external.dataNascimento,
    conjugue,
    foto: external.foto,
    ativo: pessoa.ativo,
    escolaridade: external.escolaridade,
    situacaoReligiosa: pessoa.situacaoReligiosa,
    carismas: {
      primitivos: pessoa.carismasPrimitivo?.map((carisma) => ({
        id: carisma.tipoCarismaPrimitivo.id,
        descricao: carisma.tipoCarismaPrimitivo.descricao,
      })),
      servicos: pessoa.carismasServico?.map((carisma) => ({
        id: carisma.tipoCarismaServico.id,
        descricao: carisma.tipoCarismaServico.descricao,
      })),
      vinculados: pessoa.carismasVinculado?.map((carisma) => ({
        id: carisma.tipoCarismaVinculado.id,
        descricao: carisma.tipoCarismaVinculado.descricao,
      })),
    },
    enderecos: pessoa.enderecos?.map(({ endereco }) =>
      serializeEndereco(endereco),
    ),
  };
}
