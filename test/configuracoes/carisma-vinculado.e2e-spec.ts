import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupTestModule } from '../test-setup';

describe('CarismaVinculadoController (e2e)', () => {
  let app: INestApplication;
  const principal = 'carisma/vinculado';

  beforeAll(async () => {
    app = await setupTestModule();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/${principal} (GET) | deve retornar os carismas vinculados cadastrados na base`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data[0]).toBeInstanceOf(Object);
        expect(typeof res.body.data[0].id).toBe('number');
        expect(typeof res.body.data[0].descricao).toBe('string');
      });
  });

  it(`/${principal} (GET) | deve retornar um carisma vinculado by id`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}/2`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.id).toBe(2);
        expect(res.body.data.descricao).toBe('Co-Responsável');
      });
  });

  it(`/${principal} (GET) - 404 | deve retornar 404 um carisma vinculado by id nao existente`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}/21858`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(
          `O registro de 'Tipo de Carisma Vinculado' não foi encontrado.`,
        );
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal}/:id (DELETE) | delete de carisma vinculado não é permitido`, () => {
    return request(app.getHttpServer())
      .delete(`/${principal}/2`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot DELETE /${principal}/2`);
        expect(res.body.error).toBe('Not Found');
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal}/:id (PATCH) | atualizacao patch de carisma vinculado não é permitido`, () => {
    return request(app.getHttpServer())
      .patch(`/${principal}/3`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot PATCH /${principal}/3`);
        expect(res.body.error).toBe('Not Found');
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal}/:id (PUT) | atualizacao put de carisma vinculado não é permitido`, () => {
    return request(app.getHttpServer())
      .put(`/${principal}/2`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot PUT /${principal}/2`);
        expect(res.body.error).toBe('Not Found');
        expect(res.body.statusCode).toBe(404);
      });
  });
});
