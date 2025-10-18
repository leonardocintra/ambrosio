import { INestApplication } from '@nestjs/common';
import { setupTestModule } from './test-setup';
import request from 'supertest';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('ParoquiaController (e2e)', () => {
  let app: INestApplication;
  const principal = 'paroquia';
  let token = '';

  beforeAll(async () => {
    app = await setupTestModule();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@admin.com', password: 'admin' });

    token = response.body.data.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/${principal} (GET) - 401 | nao pode ver paroquia se nao tiver autenticado`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}`)
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid or missing token');
        expect(res.body.error).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
      });
  });

  it(`/${principal} (GET) - 403 | nao pode ver paroquia se nao tiver permissao`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'ronaldinho@admin.com', password: 'admin' });

    const tokenNaoPermitido = response.body.data.access_token;

    return request(app.getHttpServer())
      .get(`/${principal}`)
      .set('Authorization', `Bearer ${tokenNaoPermitido}`)
      .expect(403)
      .expect((res) => {
        expect(res.body.message).toBe(
          'Você não tem permissão para listar paroquias',
        );
        expect(res.body.error).toBe('Forbidden');
        expect(res.body.statusCode).toBe(403);
      });
  });

  it(`/${principal} (GET) - 403 | nao pode ver paroquia by id se nao tiver permissao`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'ronaldinho@admin.com', password: 'admin' });

    const tokenNaoPermitido = response.body.data.access_token;

    return request(app.getHttpServer())
      .get(`/${principal}/1`)
      .set('Authorization', `Bearer ${tokenNaoPermitido}`)
      .expect(403)
      .expect((res) => {
        expect(res.body.message).toBe(
          'Você não tem permissão para listar paroquias',
        );
        expect(res.body.error).toBe('Forbidden');
        expect(res.body.statusCode).toBe(403);
      });
  });

  it(`/${principal} (GET) - 404 | deve retornar paroquia nao encontrada by id`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}/4324`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(
          `O registro de 'Paroquia' não foi encontrado.`,
        );
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal} (GET) - 200 | deve retornar paroquias com campos obrigatórios preenchidos`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        const paroquia = res.body.data[0];

        // Verifica se a estrutura básica está correta
        expect(res.body).toHaveProperty('server');
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('page');
        expect(res.body).toHaveProperty('limit');
        expect(res.body.data).toBeInstanceOf(Array);

        // Valida campos obrigatórios da paroquia
        expect(paroquia).toHaveProperty('id');
        expect(paroquia).toHaveProperty('descricao');

        // Valida se 'endereco' está preenchido corretamente
        expect(paroquia.endereco).toBeDefined();
        expect(paroquia.endereco).toHaveProperty('id');
        expect(paroquia.endereco).toHaveProperty('cep');
        expect(paroquia.endereco).toHaveProperty('logradouro');
        expect(paroquia.endereco).toHaveProperty('cidade');
        expect(paroquia.endereco.cidade).toHaveProperty('estado');
        expect(paroquia.endereco.cidade.estado).toHaveProperty('pais');
        expect(paroquia.endereco).toHaveProperty('bairro');
        expect(paroquia.endereco).toHaveProperty('numero');
        expect(paroquia.endereco).toHaveProperty('observacao');

        // Valida se diocese esta no response
        expect(paroquia.diocese).toHaveProperty('id');
        expect(paroquia.diocese).toHaveProperty('descricao');
        expect(paroquia.diocese.endereco).toBeDefined();
        expect(paroquia.diocese.endereco).toHaveProperty('id');
        expect(paroquia.diocese.endereco).toHaveProperty('cep');
        expect(paroquia.diocese.endereco).toHaveProperty('logradouro');
        expect(paroquia.diocese.endereco).toHaveProperty('cidade');
        expect(paroquia.diocese.endereco.cidade).toHaveProperty('estado');
        expect(paroquia.diocese.endereco.cidade.estado).toHaveProperty('pais');
        expect(paroquia.diocese.endereco).toHaveProperty('bairro');
        expect(paroquia.diocese.endereco).toHaveProperty('numero');
        expect(paroquia.diocese.endereco).toHaveProperty('observacao');
        // Valida se 'tipoDiocese' está preenchido corretamente
        expect(paroquia.diocese.tipoDiocese).toBeDefined();
        expect(paroquia.diocese.tipoDiocese).toHaveProperty('id');
        expect(paroquia.diocese.tipoDiocese).toHaveProperty('descricao');
        expect(paroquia.setor).toHaveProperty('id');
      });
  });

  it(`/${principal}/:id (GET) - 200 | deve retornar uma única paróquia com todos os campos obrigatórios`, async () => {
    const res = await request(app.getHttpServer())
      .get(`/${principal}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const paroquia = res.body.data[0];
    const id = paroquia.id;

    const singleRes = await request(app.getHttpServer())
      .get(`/${principal}/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const item = singleRes.body.data;

    expect(item).toHaveProperty('id', id);
    expect(item).toHaveProperty('descricao');
    expect(item.endereco).toBeDefined();
    expect(item.endereco).toHaveProperty('id');
    expect(item.diocese).toBeDefined();
    expect(item.diocese).toHaveProperty('id');
  });

  it(`/${principal}?dioceseId=1 (GET) - 200 | deve retornar paróquias filtradas pela diocese`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}?dioceseId=1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.length).toBeGreaterThan(0);
        res.body.data.forEach((paroquia) => {
          expect(paroquia.diocese).toBeDefined();
          expect(paroquia.diocese.id).toBe(1);
        });
      });
  });

  it(`/${principal}?dioceseId=999 (GET) - 200 | deve retornar lista vazia se diocese não for encontrada`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}?dioceseId=999`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBe(0);
      });
  });

  it(`/${principal} (POST) - 201 | deve criar uma paroquia com campos válidos`, async () => {
    const paroquiaData = {
      descricao: faker.company.name(),
      diocese: { id: 1 },
      setor: { id: 1 },
      endereco: {
        cep: faker.location.zipCode('########'),
        logradouro: faker.location.streetAddress(),
        numero: '32',
        bairro: faker.location.secondaryAddress(),
        UF: faker.location.state({ abbreviated: true }),
        cidade: faker.location.city(),
      },
    };

    const response = await request(app.getHttpServer())
      .post(`/${principal}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(paroquiaData)
      .expect(201);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.descricao).toBe(paroquiaData.descricao);
    expect(response.body.data.diocese.id).toBe(paroquiaData.diocese.id);
    expect(response.body.data.endereco.cep).toBe(paroquiaData.endereco.cep);
    expect(response.body.data.endereco.bairro).toBe(
      paroquiaData.endereco.bairro,
    );
    expect(response.body.data.endereco.logradouro).toBe(
      paroquiaData.endereco.logradouro,
    );
    expect(response.body.data.endereco.numero).toBe(
      paroquiaData.endereco.numero,
    );
    expect(response.body.data.endereco.cidade.nome).toBe(
      paroquiaData.endereco.cidade,
    );
    expect(response.body.data.endereco.cidade.estado.sigla).toBe(
      paroquiaData.endereco.UF,
    );
    expect(response.body.data.endereco.cidade.estado.pais.nome).toBe('Brasil');
    expect(response.body.data.endereco.observacao).toBeDefined();
    expect(response.body.data.setor.id).toBe(1);
  });

  it(`/${principal} (POST) - 404 | nao deve criar uma paroquia quando diocese invalida`, async () => {
    const dioceseData = {
      descricao: faker.company.name(),
      diocese: { id: 489 },
      setor: { id: 1 },
      endereco: {
        cep: faker.location.zipCode('########'),
        logradouro: faker.location.streetAddress(),
        numero: '32',
        bairro: faker.location.secondaryAddress(),
        UF: 'SP',
        cidade: 'Nuporanga',
      },
    };

    await request(app.getHttpServer())
      .post(`/${principal}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(dioceseData)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(
          `O registro de 'Diocese' não foi encontrado.`,
        );
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal} (POST) - 404 | nao deve criar uma paroquia quando setor nao existe`, async () => {
    const dioceseData = {
      descricao: faker.company.name(),
      diocese: { id: 1 },
      setor: { id: 516 },
      endereco: {
        cep: faker.location.zipCode('########'),
        logradouro: faker.location.streetAddress(),
        numero: '32',
        bairro: faker.location.secondaryAddress(),
        UF: 'SP',
        cidade: 'Nuporanga',
      },
    };

    await request(app.getHttpServer())
      .post(`/${principal}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(dioceseData)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(
          `O registro de 'Setor' não foi encontrado.`,
        );
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal} (POST) - 400 | nao deve criar uma paroquia quando diocese null`, async () => {
    const dioceseData = {
      descricao: faker.company.name(),
      endereco: {
        cep: faker.location.zipCode('########'),
        logradouro: faker.location.streetAddress(),
        numero: '32',
        bairro: faker.location.secondaryAddress(),
        UF: 'SP',
        cidade: 'Nuporanga',
      },
    };

    await request(app.getHttpServer())
      .post(`/${principal}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(dioceseData)
      .expect(400)
      .expect((res) => {
        expect(res.body.message[0]).toBe(`diocese must be an object`);
        expect(res.body.error).toBe('Bad Request');
        expect(res.body.statusCode).toBe(400);
      });
  });

  it(`/${principal} (POST) - 401 | deve falhar sem autenticação`, async () => {
    await request(app.getHttpServer())
      .post(`/${principal}`)
      .send({ descricao: 'Diocese sem token' })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid or missing token');
        expect(res.body.error).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
      });
  });

  it(`/${principal}/1 (PATCH) - 401 | deve falhar sem autenticação by id`, async () => {
    await request(app.getHttpServer())
      .patch(`/${principal}/1`)
      .send({ descricao: 'Diocese sem token' })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid or missing token');
        expect(res.body.error).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
      });
  });

  it(`/${principal}/4848 (PATCH) - 404 | deve falhar quando diocese nao existe`, async () => {
    await request(app.getHttpServer())
      .patch(`/${principal}/4848`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ descricao: 'Diocese sem token' })
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(
          "O registro de 'Paroquia' não foi encontrado.",
        );
      });
  });

  it(`/${principal} (PATCH) - 200 | deve atualizar uma paroquia com campos válidos`, async () => {
    const dioceseData = {
      descricao: faker.company.name(),
      diocese: { id: 1 },
      endereco: {
        id: 2,
        cep: faker.location.zipCode('########'),
        logradouro: faker.location.streetAddress(),
        numero: '4848',
        bairro: faker.location.secondaryAddress(),
        cidade: faker.location.city(),
        UF: 'MG',
      },
    };

    const response = await request(app.getHttpServer())
      .patch(`/${principal}/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(dioceseData)
      .expect(200);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.descricao).toBe(dioceseData.descricao);
    expect(response.body.data.diocese.id).toBe(dioceseData.diocese.id);
    expect(response.body.data.endereco.cep).toBe(dioceseData.endereco.cep);
    expect(response.body.data.endereco.bairro).toBe(
      dioceseData.endereco.bairro,
    );
    expect(response.body.data.endereco.numero).toBe(
      dioceseData.endereco.numero,
    );
    expect(response.body.data.endereco.logradouro).toBe(
      dioceseData.endereco.logradouro,
    );
    expect(response.body.data.endereco.cidade.nome).toBe(
      dioceseData.endereco.cidade,
    );
    expect(response.body.data.endereco.cidade.estado.sigla).toBe(
      dioceseData.endereco.UF,
    );
  });

  it(`/${principal} (PATCH) - 404 | não deve atualizar uma paroquia com id endereco que nao pertence a ela mesma`, async () => {
    const dioceseData = {
      descricao: faker.company.name(),
      diocese: { id: 1 },
      endereco: {
        id: 9874,
        cep: faker.location.zipCode('########'),
        logradouro: faker.location.streetAddress(),
        numero: '1226',
        bairro: faker.location.secondaryAddress(),
        cidade: faker.location.city(),
        UF: 'SP',
      },
    };

    await request(app.getHttpServer())
      .patch(`/${principal}/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(dioceseData)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(
          'Endereço id 9874 não encontrada para essa paroquia.',
        );
        expect(res.body.error).toBe('Not Found');
        expect(res.body.statusCode).toBe(404);
      });
  });
});
