import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
  await prisma.tipoEquipe.create({ data: { descricao: 'Vocacional - Moças' } });
  await prisma.tipoEquipe.create({ data: { descricao: 'Vocacional - Moços' } });
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
