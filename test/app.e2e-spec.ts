import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { setupTestModule } from './test-setup';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupTestModule();  // Usando a configuração centralizada
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBe('Hello World! Bem vindo ao Caminho Neocatecumenal')
      });
  });
});
