import { faker } from '@faker-js/faker/locale/pt_BR';

export const pessoaMock = {
  nome: faker.person.fullName(),
  conhecidoPor: faker.person.fullName(),
  nacionalidade: 'brasileira',
  cpf: faker.string.numeric(11),
  sexo: faker.helpers.arrayElement(['MASCULINO', 'FEMININO']),
  dataNascimento: faker.date
    .birthdate({ min: 1950, max: 2010, mode: 'year' })
    .toISOString()
    .slice(0, 10),
  estadoCivil: {
    id: 2,
    descricao: 'Casado',
  },
  situacaoReligiosa: {
    id: 2,
    descricao: 'LEIGO',
  },
};
