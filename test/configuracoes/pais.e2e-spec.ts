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
        expect(typeof res.body.data[0].regiaoIntermediaria).toBe('string')
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

  // it(`/${principal} (GET) | deve retornar os tipos de pessoa by id`, () => {
  //   return request(app.getHttpServer())
  //     .get(`/${principal}/2`)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.data).not.toBeInstanceOf(Array);
  //       expect(res.body.data).toEqual({ id: 2, descricao: 'Padre' });
  //       expect(res.body.data.id).toEqual(2);
  //       expect(res.body.data.descricao).toEqual('Padre');
  //     });
  // });

  // it(`/${principal} (POST) | cadastro de pessoa não é permitido`, () => {
  //   return request(app.getHttpServer())
  //     .post(`/${principal}`)
  //     .expect(404)
  //     .expect((res) => {
  //       expect(res.body.message).toBe(`Cannot POST /${principal}`)
  //       expect(res.body.error).toBe('Not Found')
  //       expect(res.body.statusCode).toBe(404)
  //     });
  // });

  // it(`/${principal} (DELETE) | delete de pessoa não é permitido`, () => {
  //   return request(app.getHttpServer())
  //     .delete(`/${principal}`)
  //     .expect(404)
  //     .expect((res) => {
  //       expect(res.body.message).toBe(`Cannot DELETE /${principal}`)
  //       expect(res.body.error).toBe('Not Found')
  //       expect(res.body.statusCode).toBe(404)
  //     });
  // });

  // it(`/${principal} (PATCH) | atualizacao patch de pessoa não é permitido`, () => {
  //   return request(app.getHttpServer())
  //     .patch(`/${principal}`)
  //     .expect(404)
  //     .expect((res) => {
  //       expect(res.body.message).toBe(`Cannot PATCH /${principal}`)
  //       expect(res.body.error).toBe('Not Found')
  //       expect(res.body.statusCode).toBe(404)
  //     });
  // });

  // it(`/${principal} (PUT) | atualizacao put de pessoa não é permitido`, () => {
  //   return request(app.getHttpServer())
  //     .put(`/${principal}`)
  //     .expect(404)
  //     .expect((res) => {
  //       expect(res.body.message).toBe(`Cannot PUT /${principal}`)
  //       expect(res.body.error).toBe('Not Found')
  //       expect(res.body.statusCode).toBe(404)
  //     });
  // });
});
