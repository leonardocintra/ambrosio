import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupTestModule } from '../test-setup';
import { ROLE_ENUM } from 'src/commons/enums/enums';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const email = faker.internet.email();
  const name = faker.person.fullName();
  const password = faker.internet.password();
  const whatsapp = '16999999999';

  beforeAll(async () => {
    app = await setupTestModule();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET) - bloquear get users sem autenticacao', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid or missing token');
        expect(res.body.error).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
      });
  });

  it('/users/1 (GET) - bloquear get users by id sem autenticacao', () => {
    return request(app.getHttpServer())
      .get('/users/45')
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid or missing token');
        expect(res.body.error).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
      });
  });

  it('/users (POST) - Deve criar um usuário com sucesso', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email,
      password,
      name,
      whatsapp,
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      server: '127.0.0.1/users',
      page: 1,
      limit: 1,
      data: {
        email,
        name,
        role: ROLE_ENUM.NAO_IDENTIFICADO,
        whatsapp,
        verifiedWhatsapp: false,
        active: false,
      },
    });

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('password');
    expect(response.body.data).toHaveProperty('verifiedWhatsapp');
    expect(response.body.data).toHaveProperty('createdAt');
    expect(response.body.data).toHaveProperty('updatedAt');
    expect(typeof response.body.data.password).toBe('string');
    expect(typeof response.body.data.verifiedWhatsapp).toBe('boolean');
  });

  it('/users (POST) - Não deve permitir e-mail duplicado', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email,
      password: 'admin',
      name,
      whatsapp,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain(
      `O campo 'email' já existe cadastrado. Não permitimos duplicidade.`,
    );
  });

  it('/auth/login (POST) - Autenticar o usuario com sucesso', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@admin.com', password: 'admin' });

    expect(response.status).toBe(201);
    expect(response.body.data.access_token).toBeDefined();
    expect(response.body.data.access_token_type).toBeDefined();
  });
});
