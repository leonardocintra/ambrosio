import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupTestModule } from '../test-setup';

describe('PaisController (e2e)', () => {
  let app: INestApplication;
  const principal = 'pais';

  beforeAll(async () => {
    app = await setupTestModule();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/${principal} (GET) | deve retornar os paises cadastrados na base`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data[0]).toBeInstanceOf(Object);
        expect(typeof res.body.data[0].id).toBe('number');
        expect(typeof res.body.data[0].nome).toBe('string');
        expect(typeof res.body.data[0].capital).toBe('string');
        expect(typeof res.body.data[0].isoAlpha2).toBe('string');
        expect(typeof res.body.data[0].lingua).toBe('string');
        expect(typeof res.body.data[0].regiao).toBe('string');
        expect(typeof res.body.data[0].subRegiao).toBe('string');
        expect(typeof res.body.data[0].regiaoIntermediaria).toBe('string');
        expect(res.body.data[0].id).toBe(1);
        expect(res.body.data[0].nome).toBe('Brasil');
        expect(res.body.data[0].capital).toBe('Brasília');
        expect(res.body.data[0].isoAlpha2).toBe('BR');
        expect(res.body.data[0].lingua).toBe('portugues');
        expect(res.body.data[0].regiao).toBe('América');
        expect(res.body.data[0].subRegiao).toBe('América Latina e Caribe');
        expect(res.body.data[0].regiaoIntermediaria).toBe('América do sul');
      });
  });

  it(`/${principal} (GET) | deve retornar um pais  by id`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}/2`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.id).toBe(2);
        expect(res.body.data.nome).toBe('Peru');
        expect(res.body.data.capital).toBe('Lima');
        expect(res.body.data.isoAlpha2).toBe('PE');
        expect(res.body.data.lingua).toBe('aimará');
        expect(res.body.data.regiao).toBe('América');
        expect(res.body.data.subRegiao).toBe('América Latina e Caribe');
        expect(res.body.data.regiaoIntermediaria).toBe('América do sul');
      });
  });

  it(`/${principal} (GET) | deve retornar 404 um pais by id nao existente`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}/21858`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(
          `O registro de 'País' não foi encontrado.`,
        );
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal} (POST) | deve cadastrar um pais com sucesso`, () => {
    return request(app.getHttpServer())
      .post(`/${principal}`)
      .send({
        nome: 'Argentina',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.data.nome).toBe('Argentina');
        expect(res.body.data.capital).toBe('Buenos Aires');
        expect(res.body.data.isoAlpha2).toBe('AR');
        expect(res.body.data.lingua).toBe('espanhol');
        expect(res.body.data.regiao).toBe('América');
        expect(res.body.data.subRegiao).toBe('América Latina e Caribe');
        expect(res.body.data.regiaoIntermediaria).toBe('América do sul');
      });
  });

  it(`/${principal} (DELETE) | delete de pais não é permitido`, () => {
    return request(app.getHttpServer())
      .delete(`/${principal}/2`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot DELETE /${principal}/2`)
        expect(res.body.error).toBe('Not Found')
        expect(res.body.statusCode).toBe(404)
      });
  });

  it(`/${principal} (PATCH) | atualizacao patch de pais não é permitido`, () => {
    return request(app.getHttpServer())
      .patch(`/${principal}/3`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot PATCH /${principal}/3`)
        expect(res.body.error).toBe('Not Found')
        expect(res.body.statusCode).toBe(404)
      });
  });

  it(`/${principal} (PUT) | atualizacao put de pessoa não é permitido`, () => {
    return request(app.getHttpServer())
      .put(`/${principal}/2`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot PUT /${principal}/2`)
        expect(res.body.error).toBe('Not Found')
        expect(res.body.statusCode).toBe(404)
      });
  });
});
