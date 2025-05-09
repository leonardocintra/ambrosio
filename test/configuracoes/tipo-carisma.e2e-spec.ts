import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupTestModule } from '../test-setup';

describe('CarismaController (e2e)', () => {
  let app: INestApplication;
  const principal = 'tipo-carisma';

  beforeAll(async () => {
    app = await setupTestModule();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/${principal} (GET) | deve retornar os tipos de carisma`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toContainEqual({
          id: 2,
          descricao: 'Família em Missão',
        });
      });
  });

  it(`/${principal}/:id (GET) | deve retornar os tipo de carisma by id`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}/2`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).not.toBeInstanceOf(Array);
        expect(res.body.data).toEqual({
          id: 2,
          descricao: 'Família em Missão',
        });
        expect(res.body.data.id).toEqual(2);
        expect(res.body.data.descricao).toEqual('Família em Missão');
      });
  });

  it(`/${principal}/:id (GET) - 404 | deve retornar tipo de carisma nao encontrado by id`, async () => {
    return request(app.getHttpServer())
      .get(`/${principal}/23424`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(
          `O registro de 'Tipo de Carisma' não foi encontrado.`,
        );
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal} (POST) | cadastro de tipo de carisma não é permitido`, () => {
    return request(app.getHttpServer())
      .post(`/${principal}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot POST /${principal}`);
        expect(res.body.error).toBe('Not Found');
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal} (DELETE) | delete de tipo de carisma não é permitido`, () => {
    return request(app.getHttpServer())
      .delete(`/${principal}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot DELETE /${principal}`);
        expect(res.body.error).toBe('Not Found');
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal} (PATCH) | atualizacao patch de tipo de carisma não é permitido`, () => {
    return request(app.getHttpServer())
      .patch(`/${principal}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot PATCH /${principal}`);
        expect(res.body.error).toBe('Not Found');
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal} (PUT) | atualizacao put de tipo de carisma não é permitido`, () => {
    return request(app.getHttpServer())
      .put(`/${principal}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot PUT /${principal}`);
        expect(res.body.error).toBe('Not Found');
        expect(res.body.statusCode).toBe(404);
      });
  });
});
