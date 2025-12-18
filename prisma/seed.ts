import { faker } from '@faker-js/faker';
import { PrismaClient, Sexo, tipoCarismaEnum } from '@prisma/client';

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
  await carismas();
  await tipoDiocese();
  await tipoLocalidade();
  await tipoEquipe();
  await etapa();
  await diocese();
  await paroquia();
  await admin();
  await pessoas();

  async function admin() {
    await prisma.user.create({
      data: {
        email: 'admin@admin.com',
        password:
          '$2b$10$.TT7jgY.IqTW/3qg9RXw4.y20H4ROVqfj0TIjBi5l9ks2fb5ueQsC',
        role: 'ADMIN',
        whatsapp: '16999739999',
      },
    });

    await prisma.user.create({
      data: {
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
      data: { descricao: 'Franca', macroRegiaoId: 1 },
    });

    await prisma.regiao.create({
      data: { descricao: 'Ceará', macroRegiaoId: 2 },
    });

    await prisma.regiao.create({
      data: { descricao: 'Piauí', macroRegiaoId: 3 },
    });

    await prisma.regiao.create({
      data: { descricao: 'Campo Limpo', macroRegiaoId: 1 },
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

  async function carismas() {
    const carismas = [
      { descricao: 'Vocacionado(a)', tipo: 'PRIMITIVO' },
      { descricao: 'Religioso(a)', tipo: 'PRIMITIVO' },
      { descricao: 'Familia em Missão', tipo: 'PRIMITIVO' },
      {
        descricao: 'Irmãos/Irmãs em Missão',
        tipo: 'PRIMITIVO',
      },
      {
        descricao: 'Irmãos/Irmãs Itinerantes',
        tipo: 'PRIMITIVO',
      },
      { descricao: 'Familia Itinerante', tipo: 'PRIMITIVO' },
      { descricao: 'Pós Crisma', tipo: 'PRIMITIVO' },
      { descricao: 'Presbítero', tipo: 'PRIMITIVO' },
      { descricao: 'Freira', tipo: 'PRIMITIVO' },
      { descricao: 'Responsável', tipo: 'VINCULADO', casalAndaJunto: true },
      { descricao: 'Co-Responsável', tipo: 'VINCULADO', casalAndaJunto: true },
      { descricao: 'Salmista', tipo: 'VINCULADO' },
      { descricao: 'Catequistas', tipo: 'VINCULADO', casalAndaJunto: true },
      { descricao: 'Leitores', tipo: 'VINCULADO' },
      { descricao: 'Ostiário', tipo: 'VINCULADO' },
      { descricao: 'Mestre', tipo: 'VINCULADO' },
      { descricao: 'Padeiro', tipo: 'VINCULADO' },
      { descricao: 'Secretário', tipo: 'SERVICO' },
      { descricao: 'Voluntário', tipo: 'SERVICO' },
      { descricao: 'Convidado', tipo: 'SERVICO' },
    ];

    for (const carisma of carismas) {
      await prisma.carisma.create({
        data: {
          descricao: carisma.descricao,
          tipo: carisma.tipo as tipoCarismaEnum,
          casalAndaJunto: carisma.casalAndaJunto || false,
        },
      });
    }

    console.log('---------------------------------');
    console.log('Carismas preenchidos com sucesso!');
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

  async function pessoas() {
    await prisma.pessoa.create({
      data: {
        externalId: 'id-usuario-teste-e2e-1',
        situacaoReligiosaId: 1,
      },
    });

    await prisma.pessoa.create({
      data: {
        externalId: 'id-usuario-cpf-duplicado-e2e-2',
        situacaoReligiosaId: 1,
      },
    });

    console.log('---------------------------------');
    console.log('Pessoas preenchidas com sucesso!');
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
