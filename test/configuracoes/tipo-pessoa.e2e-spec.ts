import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { setupTestModule } from '../test-setup';

describe('TipoPessoaController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupTestModule();  // Usando a configuração centralizada
  });

  afterAll(async () => {
    await app.close();
  });

  it('/tipo-pessoa (GET) | deve retornar os tipos de pessoa', () => {
    return request(app.getHttpServer())
      .get('/tipo-pessoa')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data).toContainEqual({ id: 2, descricao: 'Padre' });
      });
  });

  it('/tipo-pessoa (GET) | deve retornar os tipos de pessoa by id', () => {
    return request(app.getHttpServer())
      .get('/tipo-pessoa/2')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).not.toBeInstanceOf(Array);
        expect(res.body.data).toEqual({ id: 2, descricao: 'Padre' }); 
        expect(res.body.data.id).toEqual(2);
        expect(res.body.data.descricao).toEqual('Padre'); 
      });
  });

  it('/tipo-pessoa (POST) | cadastro de pessoa não é permitido', () => {
    return request(app.getHttpServer())
      .post('/tipo-pessoa')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('Cannot POST /tipo-pessoa')
        expect(res.body.error).toBe('Not Found')
        expect(res.body.statusCode).toBe(404)
      });
  });

  it('/tipo-pessoa (DELETE) | delete de pessoa não é permitido', () => {
    return request(app.getHttpServer())
      .delete('/tipo-pessoa')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('Cannot DELETE /tipo-pessoa')
        expect(res.body.error).toBe('Not Found')
        expect(res.body.statusCode).toBe(404)
      });
  });

  it('/tipo-pessoa (PATCH) | atualizacao patch de pessoa não é permitido', () => {
    return request(app.getHttpServer())
      .patch('/tipo-pessoa')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('Cannot PATCH /tipo-pessoa')
        expect(res.body.error).toBe('Not Found')
        expect(res.body.statusCode).toBe(404)
      });
  });

  it('/tipo-pessoa (PUT) | atualizacao put de pessoa não é permitido', () => {
    return request(app.getHttpServer())
      .put('/tipo-pessoa')
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('Cannot PUT /tipo-pessoa')
        expect(res.body.error).toBe('Not Found')
        expect(res.body.statusCode).toBe(404)
      });
  });
});

