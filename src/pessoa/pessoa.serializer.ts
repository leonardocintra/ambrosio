/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pessoa } from 'neocatecumenal';
import { ESTADO_CIVIL_MAP, SEXO_ENUM } from 'src/commons/enums/enums';
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
    sexo: external.sexo === 'M' ? SEXO_ENUM.MASCULINO : SEXO_ENUM.FEMININO,
    nacionalidade: external.nacionalidade,
    estadoCivil: ESTADO_CIVIL_MAP[external.estadoCivil],
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

export function serializePessoasListResponse(
  pessoas: any[],
  externals: Pessoa[],
  conjugues?: any[],
): Pessoa[] {
  return pessoas
    .map((pessoa, index) => {
      const external = externals.find(
        (ext) => ext.externalId === pessoa.externalId,
      );
      const conjugue = conjugues?.[index];

      if (!external) {
        // Log ou tratamento quando não encontrar dados externos
        console.warn(
          `Dados externos não encontrados para pessoa ID: ${pessoa.id}`,
        );
        return null;
      }

      return serializePessoaResponse(pessoa, external, conjugue);
    })
    .filter(Boolean); // Remove os nulls do array
}
