import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupTestModule } from '../test-setup';

describe('CidadeController (e2e)', () => {
  let app: INestApplication;
  const principal = 'cidade';

  beforeAll(async () => {
    app = await setupTestModule();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/${principal} (GET) - 200 | deve retornar as cidades cadastradas na base`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);

        const cidade = res.body.data[0];
        expect(typeof cidade.id).toBe('number');
        expect(typeof cidade.nome).toBe('string');

        const estado = cidade.estado;
        expect(estado).toBeInstanceOf(Object);
        expect(typeof estado.sigla).toBe('string');
        expect(typeof estado.nome).toBe('string');

        const pais = estado.pais;
        expect(pais).toBeInstanceOf(Object);
        expect(typeof pais.nome).toBe('string');
        expect(typeof pais.lingua).toBe('string');
      });
  });

  it(`/${principal}/1 (GET) - 200 | deve retornar uma cidade por id`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}/1`)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.id).toBe(1);
        expect(res.body.data.nome).toBe('Ibiraci');

        const estado = res.body.data.estado;
        expect(estado.sigla).toBe('MG');
        expect(estado.nome).toBe('Minas Gerais');

        const pais = estado.pais;
        expect(pais.nome).toBe('Brasil');
        expect(pais.lingua).toBe('portugues');
      });
  });

  it(`/${principal}/9999 (GET) - 404 | deve retornar 404 para cidade inexistente`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}/9999`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(
          `O registro de 'Cidade' não foi encontrado.`,
        );
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal} (POST) - 404 | cadastro de cidade não é permitido`, () => {
    return request(app.getHttpServer())
      .post(`/${principal}`)
      .send({ nome: 'Cidade Nova' })
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot POST /${principal}`);
        expect(res.body.error).toBe('Not Found');
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal}/1 (PUT) - 404 | atualização de cidade não é permitida`, () => {
    return request(app.getHttpServer())
      .put(`/${principal}/1`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot PUT /${principal}/1`);
        expect(res.body.error).toBe('Not Found');
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal}/1 (DELETE) - 404 | exclusão de cidade não é permitida`, () => {
    return request(app.getHttpServer())
      .delete(`/${principal}/1`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`Cannot DELETE /${principal}/1`);
        expect(res.body.error).toBe('Not Found');
        expect(res.body.statusCode).toBe(404);
      });
  });
});
