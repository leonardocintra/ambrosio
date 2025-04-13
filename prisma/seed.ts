import { faker, fakerPT_BR } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await pais();
  await estado();
  await estadoCivil();
  await escolaridade();
  await tipoPessoa();
  await tipoCarisma();
  await tipoDiocese();
  await tipoLocalidade();
  await regiao();
  await tipoEquipe();
  await etapa();
  await diocese();
  await admin();

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

    console.log('---------------------------------');
    console.log('Usuario padrao preenchido com sucesso!');
  }

  async function tipoLocalidade() {
    await prisma.tipoLocalidade.create({
      data: {
        descricao: 'Paróquia',
      },
    });

    await prisma.tipoLocalidade.create({
      data: {
        descricao: 'Centro Neocatecumenal',
      },
    });

    await prisma.tipoLocalidade.create({
      data: {
        descricao: 'Seminário',
      },
    });

    await prisma.tipoLocalidade.create({
      data: {
        descricao: 'Convento',
      },
    });

    await prisma.tipoLocalidade.create({
      data: {
        descricao: 'Casa de Convivência',
      },
    });

    await prisma.tipoLocalidade.create({
      data: {
        descricao: 'Arquidiocese',
      },
    });

    await prisma.tipoLocalidade.create({
      data: {
        descricao: 'Diocese',
      },
    });

    await prisma.tipoLocalidade.create({
      data: {
        descricao: 'Prelazia',
      },
    });

    console.log('---------------------------------');
    console.log('Tipo localidade preenchidas com sucesso!');
  }

  async function tipoPessoa() {
    await prisma.tipoPessoa.create({
      data: {
        descricao: 'Leigo',
      },
    });

    await prisma.tipoPessoa.create({
      data: {
        descricao: 'Padre',
      },
    });

    await prisma.tipoPessoa.create({
      data: {
        descricao: 'Bispo',
      },
    });

    await prisma.tipoPessoa.create({
      data: {
        descricao: 'Arcebispo',
      },
    });

    await prisma.tipoPessoa.create({
      data: {
        descricao: 'Seminarista',
      },
    });

    await prisma.tipoPessoa.create({
      data: {
        descricao: 'Diácono',
      },
    });

    await prisma.tipoPessoa.create({
      data: {
        descricao: 'Diácono Permanente',
      },
    });

    await prisma.tipoPessoa.create({
      data: {
        descricao: 'Religioso(a)',
      },
    });

    console.log('---------------------------------');
    console.log('Tipo pessoa preenchidas com sucesso!');
  }

  async function etapa() {
    await prisma.etapa.create({
      data: {
        descricao: 'pre-catecumenato',
      },
    });

    await prisma.etapa.create({
      data: {
        descricao: '1º escrutinio',
      },
    });

    await prisma.etapa.create({
      data: {
        descricao: 'Shemá Israel',
      },
    });

    await prisma.etapa.create({
      data: {
        descricao: '2º escrutinio',
      },
    });

    await prisma.etapa.create({
      data: {
        descricao: 'Iniciação a Oração',
      },
    });

    await prisma.etapa.create({
      data: {
        descricao: 'Tradditio Symboli',
      },
    });

    await prisma.etapa.create({
      data: {
        descricao: 'Redditio Symboli',
      },
    });

    await prisma.etapa.create({
      data: {
        descricao: 'Pai Nosso I',
      },
    });

    await prisma.etapa.create({
      data: {
        descricao: 'Pai Nosso II',
      },
    });
    await prisma.etapa.create({
      data: {
        descricao: 'Pai Nosso III',
      },
    });

    await prisma.etapa.create({
      data: {
        descricao: 'Pai Nosso III',
      },
    });

    await prisma.etapa.create({
      data: {
        descricao: '3º escrutinio',
      },
    });

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

  async function tipoEquipe() {
    await prisma.tipoEquipe.create({ data: { descricao: 'Catequista' } });
    await prisma.tipoEquipe.create({
      data: { descricao: 'Secretários Centro Neocatecumenal' },
    });
    await prisma.tipoEquipe.create({
      data: { descricao: 'Peregrinações Jovens' },
    });
    await prisma.tipoEquipe.create({
      data: { descricao: 'Catequista Regional' },
    });
    await prisma.tipoEquipe.create({
      data: { descricao: 'Catequista Itinerante' },
    });
    await prisma.tipoEquipe.create({
      data: { descricao: 'Vocacional - Moças' },
    });
    await prisma.tipoEquipe.create({
      data: { descricao: 'Vocacional - Moços' },
    });
    await prisma.tipoEquipe.create({
      data: { descricao: 'Responsável GRANDE REGIAO' },
    });
    await prisma.tipoEquipe.create({
      data: { descricao: 'Perscrutação Jovens' },
    });
    await prisma.tipoEquipe.create({ data: { descricao: 'Pós-Crisma' } });

    console.log('---------------------------------');
    console.log('Tipo de equipes preenchido com sucesso!');
  }

  async function regiao() {
    await prisma.regiao.create({
      data: {
        descricao: 'Amazonas/Pará',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Bahia',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Brasília',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Ceará',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Franca',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Goiás',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Grande São Paulo',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Maranhão',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Maranhão / Piauí',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'MG / RJ',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'MS / MT',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Paraná',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'PE - PB - AL - SE',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Piauí',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Rio de Janeiro',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'RS / SC',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'São Paulo (Cidade - Capital)',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'São Paulo (Interior - Padre Joaquim)',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'São Paulo (Oeste)',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Tocantins',
      },
    });

    await prisma.regiao.create({
      data: {
        descricao: 'Umuarama',
      },
    });

    console.log('---------------------------------');
    console.log('Região do caminho preenchido com sucesso!');
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

  async function tipoCarisma() {
    await prisma.tipoCarisma.create({
      data: {
        descricao: 'Seminarista',
      },
    });

    await prisma.tipoCarisma.create({
      data: {
        descricao: 'Família em Missão',
      },
    });

    await prisma.tipoCarisma.create({
      data: {
        descricao: 'Vida Religiosa',
      },
    });

    await prisma.tipoCarisma.create({
      data: {
        descricao: 'Presbítero',
      },
    });

    await prisma.tipoCarisma.create({
      data: {
        descricao: 'Catequista Itinerante',
      },
    });

    await prisma.tipoCarisma.create({
      data: {
        descricao: 'Vocacionado',
      },
    });

    await prisma.tipoCarisma.create({
      data: {
        descricao: 'Pós Crisma',
      },
    });

    await prisma.tipoCarisma.create({
      data: {
        descricao: 'Catequista',
      },
    });

    await prisma.tipoCarisma.create({
      data: {
        descricao: 'Rapaz / Moça levantado Missão',
      },
    });

    await prisma.tipoCarisma.create({
      data: {
        descricao: 'Casal itinerante',
      },
    });

    console.log('---------------------------------');
    console.log('Tipo de carisma preenchido com sucesso!');
  }

  async function escolaridade() {
    await prisma.escolaridade.create({
      data: {
        descricao: 'Analfabeto',
      },
    });

    await prisma.escolaridade.create({
      data: {
        descricao: 'Ensino Fundamental',
      },
    });

    await prisma.escolaridade.create({
      data: {
        descricao: 'Ensino Fundamental Incompleto',
      },
    });

    await prisma.escolaridade.create({
      data: {
        descricao: 'Ensino Médio',
      },
    });

    await prisma.escolaridade.create({
      data: {
        descricao: 'Ensino Médio Incompleto',
      },
    });

    await prisma.escolaridade.create({
      data: {
        descricao: 'Ensino Superior',
      },
    });

    await prisma.escolaridade.create({
      data: {
        descricao: 'Ensino Superior Incompleto',
      },
    });

    await prisma.escolaridade.create({
      data: {
        descricao: 'Pos Graduação',
      },
    });

    await prisma.escolaridade.create({
      data: {
        descricao: 'Mestrado',
      },
    });

    await prisma.escolaridade.create({
      data: {
        descricao: 'Douturado',
      },
    });

    await prisma.escolaridade.create({
      data: {
        descricao: 'Pos Doutorado',
      },
    });

    console.log('---------------------------------');
    console.log('Escolaridade preenchido com sucesso!');
  }

  async function estadoCivil() {
    await prisma.estadoCivil.create({
      data: {
        descricao: 'SOLTEIRO(A)',
      },
    });

    await prisma.estadoCivil.create({
      data: {
        descricao: 'CASADO(A)',
      },
    });

    await prisma.estadoCivil.create({
      data: {
        descricao: 'VIUVO(A)',
      },
    });

    await prisma.estadoCivil.create({
      data: {
        descricao: 'DIVORCIADO(A)',
      },
    });

    console.log('---------------------------------');
    console.log('Estado Civil preenchido com sucesso!');
  }

  async function diocese() {
    const endereco = await prisma.endereco.create({
      data: {
        bairro: faker.location.street(),
        cep: faker.location.zipCode('########'),
        cidade: faker.location.city(),
        logradouro: faker.location.street(),
        numero: faker.number.int({ min: 1, max: 9000 }).toString(),
        UF: fakerPT_BR.location.state({ abbreviated: true }),
        observacao: faker.location.streetAddress(),
      },
    });

    await prisma.diocese.create({
      data: {
        descricao: 'Diocese de teste Se Catedral',
        tipoDioceseId: 1,
        enderecoId: endereco.id,
      },
    });

    console.log('---------------------------------');
    console.log('Diocese preenchido com sucesso!');
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
