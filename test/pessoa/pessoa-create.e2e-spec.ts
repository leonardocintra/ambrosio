import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupTestModule } from '../test-setup';
import { pessoaMock } from './mock';

describe('PessoaCreateController (e2e)', () => {
  let app: INestApplication;
  const principal = 'pessoa';
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

  it(`/${principal} (GET) - 401 | nao pode ver pessoa se nao tiver autenticado`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}`)
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid or missing token');
        expect(res.body.error).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
      });
  });

  it(`/${principal} (POST) - 401 | não pode cadastrar pessoa se não tiver autenticado`, () => {
    return request(app.getHttpServer())
      .post(`/${principal}`)
      .send({
        nome: 'Pessoa Teste',
      })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid or missing token');
        expect(res.body.error).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
      });
  });

  it(`/${principal} (POST) - 403 | não pode cadastrar pessoa se não tiver permissão`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'ronaldinho@admin.com', password: 'admin' });

    const tokenNaoPermitido = response.body.data.access_token;

    return request(app.getHttpServer())
      .post(`/${principal}`)
      .set('Authorization', `Bearer ${tokenNaoPermitido}`)
      .send({
        ...pessoaMock,
      })
      .expect(403)
      .expect((res) => {
        expect(res.body.message).toBe(
          'Você não tem permissão para create pessoa',
        );
        expect(res.body.error).toBe('Forbidden');
        expect(res.body.statusCode).toBe(403);
      });
  });

  it(`/${principal} (POST) - 201 | deve cadastrar pessoa corretamente`, async () => {
    const response = await request(app.getHttpServer())
      .post(`/${principal}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...pessoaMock,
      })
      .expect(201);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('nome', pessoaMock.nome);
    expect(response.body.data).toHaveProperty('cpf', pessoaMock.cpf);
    // expect(response.body.data).toHaveProperty(
    //   'dataNascimento',
    //   pessoaMock.dataNascimento,
    // );
  });
});
