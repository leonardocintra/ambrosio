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
      descricao: 'LEIGO(A)',
    },
  });

  await prisma.tipoCarisma.create({
    data: {
      descricao: 'VOCACIONADO(A)',
    },
  });

  await prisma.tipoCarisma.create({
    data: {
      descricao: 'SEMINARISTA(A)',
    },
  });

  await prisma.tipoCarisma.create({
    data: {
      descricao: 'SALMISTA',
    },
  });

  await prisma.tipoCarisma.create({
    data: {
      descricao: 'SEMINARISTA',
    },
  });

  await prisma.tipoCarisma.create({
    data: {
      descricao: 'PADRE',
    },
  });

  await prisma.tipoCarisma.create({
    data: {
      descricao: 'BISPO',
    },
  });

  console.log('---------------------------------');
  console.log('Tipo de carisma preenchido com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
