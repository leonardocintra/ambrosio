import { Pessoa } from "neocatecumenal";
import { serializeEndereco } from "src/commons/utils/serializers/serializerEndereco";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializePessoaResponse(pessoa: any, conjugue?: any): Pessoa {
  return {
    id: pessoa.id,
    nome: pessoa.nome,
    conhecidoPor: pessoa.conhecidoPor,
    cpf: pessoa.cpf,
    sexo: pessoa.sexo,
    nacionalidade: pessoa.nacionalidade,
    estadoCivil: pessoa.estadoCivil,
    dataNascimento: pessoa.dataNascimento,
    conjugue,
    foto: pessoa.foto,
    ativo: pessoa.ativo,
    escolaridade: pessoa.escolaridade,
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
