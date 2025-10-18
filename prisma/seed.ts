import { faker } from '@faker-js/faker';
import { PrismaClient, Sexo } from '@prisma/client';
import { Escolaridade, EstadoCivil, SituacaoReligiosa } from 'neocatecumenal';

const prisma = new PrismaClient();

async function main() {
  await pais();
  await estado();
  await cidade();
  await macroRegiao();
  await regiao();
  await setor();
  await estadoCivil();
  await escolaridade();
  await situacaoReligiosa();
  await tipoCarismaServico();
  await tipoCarismaVinculado();
  await tipoCarismaPrimitivo();
  await tipoDiocese();
  await tipoLocalidade();
  await tipoEquipe();
  await etapa();
  await diocese();
  await paroquia();
  await admin();
  await pessoas(5);

  async function admin() {
    await prisma.user.create({
      data: {
        name: 'Admin Geral',
        email: 'admin@admin.com',
        password:
          '$2b$10$.TT7jgY.IqTW/3qg9RXw4.y20H4ROVqfj0TIjBi5l9ks2fb5ueQsC',
        role: 'ADMIN',
        whatsapp: '16999739999',
      },
    });

    await prisma.user.create({
      data: {
        name: 'Ronaldinho Gaucho',
        email: 'ronaldinho@admin.com',
        password:
          '$2b$10$.TT7jgY.IqTW/3qg9RXw4.y20H4ROVqfj0TIjBi5l9ks2fb5ueQsC',
        role: 'NAO_IDENTIFICADO',
        whatsapp: '16999139999',
      },
    });

    console.log('---------------------------------');
    console.log('Usuario padrao preenchido com sucesso!');
  }

  async function tipoLocalidade() {
    const tiposLocalidades = [
      'Centro Neocatecumenal',
      'Seminário',
      'Convento',
      'Casa de Convivência',
      'Prelazia',
    ];

    for (const tipo of tiposLocalidades) {
      await prisma.tipoLocalidade.create({
        data: {
          descricao: tipo,
        },
      });
    }

    console.log('---------------------------------');
    console.log('Tipo localidade preenchidas com sucesso!');
  }

  async function situacaoReligiosa() {
    const situacaoReligiosas = [
      { descricao: 'Leigo', sexoUnico: null },
      { descricao: 'Seminarista', sexoUnico: Sexo.MASCULINO },
      { descricao: 'Religioso(a)', sexoUnico: null },
      { descricao: 'Diácono', sexoUnico: Sexo.MASCULINO },
      { descricao: 'Diácono Permanente', sexoUnico: Sexo.MASCULINO },
      { descricao: 'Presbítero', sexoUnico: Sexo.MASCULINO },
      { descricao: 'Bispo', sexoUnico: Sexo.MASCULINO },
      { descricao: 'Arcebispo', sexoUnico: Sexo.MASCULINO },
      { descricao: 'Cardeal', sexoUnico: Sexo.MASCULINO },
      { descricao: 'Papa', sexoUnico: Sexo.MASCULINO },
    ];

    for (const situacao of situacaoReligiosas) {
      await prisma.situacaoReligiosa.create({
        data: {
          descricao: situacao.descricao,
          sexoUnico: situacao.sexoUnico || null,
        },
      });
    }

    console.log('---------------------------------');
    console.log('Situação Religiosa preenchidas com sucesso!');
  }

  async function etapa() {
    const etapas = [
      'pre-catecumenato',
      '1º escrutinio',
      'Shemá Israel',
      '2º escrutinio',
      'Iniciação a Oração',
      'Tradditio Symboli',
      'Redditio Symboli',
      'Pai Nosso I',
      'Pai Nosso II',
      'Pai Nosso III',
      '3º escrutinio',
    ];

    for (const descricao of etapas) {
      await prisma.etapa.create({
        data: { descricao },
      });
    }

    console.log('---------------------------------');
    console.log('Etapas preenchidas com sucesso!');
  }

  async function pais() {
    await prisma.pais.create({
      data: {
        capital: 'Brasília',
        nome: 'Brasil',
        lingua: 'portugues',
        regiao: 'América',
        subRegiao: 'América Latina e Caribe',
        regiaoIntermediaria: 'América do sul',
        isoAlpha2: 'BR',
      },
    });

    await prisma.pais.create({
      data: {
        capital: 'Lima',
        nome: 'Peru',
        lingua: 'aimará',
        regiao: 'América',
        subRegiao: 'América Latina e Caribe',
        regiaoIntermediaria: 'América do sul',
        isoAlpha2: 'PE',
      },
    });

    console.log('---------------------------------');
    console.log('Paises preenchido com sucesso!');
  }

  async function estado() {
    const paisId = (await prisma.pais.findFirst({ where: { nome: 'Brasil' } }))
      .id;
    await prisma.estado.create({
      data: {
        nome: 'Minas Gerais',
        sigla: 'MG',
        paisId,
      },
    });

    await prisma.estado.create({
      data: {
        nome: 'Tocantins',
        sigla: 'TO',
        paisId,
      },
    });

    await prisma.estado.create({
      data: {
        nome: 'São Paulo',
        sigla: 'SP',
        paisId,
      },
    });

    await prisma.estado.create({
      data: {
        nome: 'Goiás',
        sigla: 'GO',
        paisId,
      },
    });

    console.log('---------------------------------');
    console.log('Estados (UF) preenchido com sucesso!');
  }

  async function macroRegiao() {
    const macrosRegiao = ['Franca', 'Brasília', 'Goiás'];

    for (const macro of macrosRegiao) {
      await prisma.macroRegiao.create({
        data: {
          descricao: macro,
        },
      });
    }

    console.log('---------------------------------');
    console.log('Macro Regiões preenchidas com sucesso!');
  }

  async function regiao() {
    await prisma.regiao.create({
      data: { descricao: 'Centro-Oeste', macroRegiaoId: 1 },
    });

    await prisma.regiao.create({
      data: { descricao: 'Nordeste', macroRegiaoId: 2 },
    });

    await prisma.regiao.create({
      data: { descricao: 'Norte', macroRegiaoId: 3 },
    });

    await prisma.regiao.create({
      data: { descricao: 'Sudeste', macroRegiaoId: 1 },
    });

    console.log('---------------------------------');
    console.log('Regiões preenchidas com sucesso!');
  }

  async function setor() {
    const setores = [
      {
        regiaoId: 1,
        descricao: 'Anhaguera - Setor 1',
      },
      {
        regiaoId: 1,
        descricao: 'Anhaguera - Setor 2',
      },
      {
        regiaoId: 1,
        descricao: 'Portinari - Setor 1',
      },
      {
        regiaoId: 1,
        descricao: 'Portinari - Setor 2',
      },
      {
        regiaoId: 2,
        descricao: 'Brasilia - Setor 1',
      },
      {
        regiaoId: 2,
        descricao: 'Brasilia - Setor 2',
      },
      {
        regiaoId: 2,
        descricao: 'Brasilia - Setor 3',
      },
      {
        regiaoId: 2,
        descricao: 'Brasilia - Setor 4',
      },
      {
        regiaoId: 2,
        descricao: 'Brasilia - Setor 5',
      },
      {
        regiaoId: 3,
        descricao: 'Centro Oeste - GO 1',
      },
      {
        regiaoId: 3,
        descricao: 'Centro Oeste - GO 2',
      },
      {
        regiaoId: 3,
        descricao: 'Centro Oeste - GO 3',
      },
    ];

    for (const setor of setores) {
      await prisma.setor.create({
        data: {
          descricao: setor.descricao,
          regiaoId: setor.regiaoId,
        },
      });
    }

    console.log('---------------------------------');
    console.log('Setores preenchidos com sucesso!');
  }

  async function cidade() {
    const estado = await prisma.estado.findFirst();
    const estadoId = estado.id;

    await prisma.cidade.create({
      data: {
        nome: 'Ibiraci',
        estadoId,
      },
    });

    await prisma.cidade.create({
      data: {
        nome: 'Claraval',
        estadoId,
      },
    });

    await prisma.cidade.create({
      data: {
        nome: 'Cássia',
        estadoId,
      },
    });

    await prisma.cidade.create({
      data: {
        nome: 'Belo Horizonte',
        estadoId,
      },
    });

    console.log('---------------------------------');
    console.log('Cidades preenchidas com sucesso!');
  }

  async function tipoEquipe() {
    const tiposEquipe = [
      'Catequista',
      'Secretários Centro Neocatecumenal',
      'Peregrinações Jovens',
      'Catequista Regional',
      'Catequista Itinerante',
      'Vocacional - Moças',
      'Vocacional - Moços',
      'Responsável GRANDE REGIAO',
      'Perscrutação Jovens',
      'Pós-Crisma',
    ];

    for (const descricao of tiposEquipe) {
      await prisma.tipoEquipe.create({ data: { descricao } });
    }

    console.log('---------------------------------');
    console.log('Tipo de equipes preenchido com sucesso!');
  }

  async function tipoDiocese() {
    await prisma.tipoDiocese.create({
      data: {
        descricao: 'Arquidiocese',
      },
    });

    await prisma.tipoDiocese.create({
      data: {
        descricao: 'Diocese',
      },
    });

    await prisma.tipoDiocese.create({
      data: {
        descricao: 'Prelazia',
      },
    });

    console.log('---------------------------------');
    console.log('Tipo de diocese preenchido com sucesso!');
  }

  async function tipoCarismaServico() {
    const tiposCarisma = ['Secretário', 'Voluntário', 'Convidado'];

    for (const descricao of tiposCarisma) {
      await prisma.tipoCarismaServico.create({
        data: { descricao },
      });
    }

    console.log('---------------------------------');
    console.log('Tipo de carisma serviço preenchido com sucesso!');
  }

  async function tipoCarismaVinculado() {
    const tiposCarisma = [
      'Responsável',
      'Co-Responsável',
      'Salmista',
      'Catequistas',
      'Leitores',
      'Ostiário',
      'Mestre',
      'Padeiro',
    ];

    for (const descricao of tiposCarisma) {
      await prisma.tipoCarismaVinculado.create({
        data: { descricao },
      });
    }

    console.log('---------------------------------');
    console.log('Tipo de carisma vinculado preenchido com sucesso!');
  }

  async function tipoCarismaPrimitivo() {
    const tiposCarisma = [
      'Vocacionado(a)',
      'Religioso(a)',
      'Familia em Missão',
      'Irmãos/Irmãs em Missão',
      'Irmãos/Irmãs Itinerantes',
      'Familia Itinerante',
      'Pós Crisma',
      'Presbítero',
      'Freira',
    ];

    for (const descricao of tiposCarisma) {
      await prisma.tipoCarismaPrimitivo.create({
        data: { descricao },
      });
    }

    console.log('---------------------------------');
    console.log('Tipo de carisma primitivo preenchido com sucesso!');
  }

  async function escolaridade() {
    const escolaridades = [
      'Analfabeto',
      'Ensino Fundamental',
      'Ensino Fundamental Incompleto',
      'Ensino Médio',
      'Ensino Médio Incompleto',
      'Ensino Superior',
      'Ensino Superior Incompleto',
      'Pos Graduação',
      'Mestrado',
      'Douturado',
      'Pos Doutorado',
    ];

    for (const descricao of escolaridades) {
      await prisma.escolaridade.create({
        data: { descricao },
      });
    }

    console.log('---------------------------------');
    console.log('Escolaridade preenchido com sucesso!');
  }

  async function estadoCivil() {
    const estadosCivis = [
      'SOLTEIRO(A)',
      'CASADO(A)',
      'VIUVO(A)',
      'DIVORCIADO(A)',
    ];

    for (const descricao of estadosCivis) {
      await prisma.estadoCivil.create({
        data: { descricao },
      });
    }

    console.log('---------------------------------');
    console.log('Estado Civil preenchido com sucesso!');
  }

  async function diocese() {
    const cidade = await prisma.cidade.findFirst();
    const endereco = await prisma.endereco.create({
      data: {
        bairro: faker.location.street(),
        cep: '86060340',
        logradouro: 'Rua Dom Bosco',
        numero: '145',
        observacao: faker.location.streetAddress(),
        cidadeId: cidade.id,
      },
    });

    await prisma.diocese.create({
      data: {
        descricao: 'Diocese de Londrina',
        tipoDioceseId: 1,
        enderecoId: endereco.id,
      },
    });

    console.log('---------------------------------');
    console.log('Diocese preenchido com sucesso!');
  }

  async function paroquia() {
    const cidade = await prisma.cidade.findFirst();
    const endereco = await prisma.endereco.create({
      data: {
        bairro: faker.location.street(),
        cep: faker.location.zipCode('########'),
        logradouro: faker.location.street(),
        numero: faker.number.int({ min: 1, max: 9000 }).toString(),
        observacao: faker.location.streetAddress(),
        cidadeId: cidade.id,
      },
    });

    await prisma.paroquia.create({
      data: {
        descricao: 'Paroquia Nossa Senhora Aparecida (Seed)',
        dioceseId: 1,
        enderecoId: endereco.id,
        setorId: 1,
      },
    });

    console.log('---------------------------------');
    console.log('Paroquia preenchida com sucesso!');
  }

  async function pessoas(quantidade: number) {
    const [estadosCivis, escolaridades, situacoesReligiosas] =
      await Promise.all([
        prisma.estadoCivil.findMany(),
        prisma.escolaridade.findMany(),
        prisma.situacaoReligiosa.findMany(),
      ]);

    const payloads = Array.from({ length: quantidade }, (_, i) =>
      _buildPessoaPayload(i, estadosCivis, escolaridades, situacoesReligiosas),
    );

    await prisma.pessoa.createMany({ data: payloads });
    await prisma.pessoa.create({
      data: {
        nome: 'João da Silva',
        externalId: 'external-123-468488',
        conhecidoPor: 'João usuario do sistema teste',
        nacionalidade: 'brasileira',
        cpf: '14147855632',
        sexo: 'MASCULINO',
        dataNascimento: new Date('1990-01-01'),
        estadoCivilId: estadosCivis[0].id,
        escolaridadeId: escolaridades[4].id,
        situacaoReligiosaId: situacoesReligiosas[0].id,
      },
    });
    await prisma.pessoa.create({
      data: {
        nome: faker.person.fullName(),
        externalId: 'external-789-468488',
        conhecidoPor: 'Maria usuario do sistema teste',
        nacionalidade: 'brasileira',
        cpf: '74147855632',
        sexo: 'FEMININO',
        dataNascimento: new Date('1990-01-01'),
        estadoCivilId: estadosCivis[0].id,
        escolaridadeId: escolaridades[4].id,
        situacaoReligiosaId: situacoesReligiosas[0].id,
      },
    });
    console.log(`Criadas ${quantidade + 2} pessoas com sucesso!`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

function _buildPessoaPayload(
  index: number,
  estadosCivis: EstadoCivil[],
  escolaridades: Escolaridade[],
  situacoes: SituacaoReligiosa[],
) {
  const sexo = faker.helpers.arrayElement(['MASCULINO', 'FEMININO']);
  const nome = faker.person.fullName({
    sex: sexo === 'MASCULINO' ? 'male' : 'female',
  });
  return {
    nome,
    conhecidoPor: faker.person.firstName(
      sexo === 'MASCULINO' ? 'male' : 'female',
    ),
    nacionalidade: 'brasileira',
    cpf: String(index).padStart(11, '0'),
    sexo,
    dataNascimento: faker.date.birthdate({
      min: 1950,
      max: 2010,
      mode: 'year',
    }),
    estadoCivilId: faker.helpers.arrayElement(estadosCivis).id,
    escolaridadeId: faker.helpers.arrayElement(escolaridades).id,
    situacaoReligiosaId: faker.helpers.arrayElement(situacoes).id,
  };
}
