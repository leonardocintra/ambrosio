import { faker } from 'node_modules/@faker-js/faker/dist/locale/pt_BR.cjs';
import { PrismaClient } from '../../../generated/client';

export async function seedComunidade(prisma: PrismaClient) {
  const paroquiaIds = [1, 2, 3, 4, 5];

  for (const paroquiaId of paroquiaIds) {
    const data = Array.from({ length: 10 }, (_, i) => ({
      numeroDaComunidade: i + 1,
      quantidadeMembros: faker.number.int({ min: 15, max: 120 }),
      paroquiaId,
    }));

    await prisma.comunidade.createMany({ data });
  }

  console.log('---------------------------------');
  console.log('Comunidades preenchidas com sucesso!');
}
