import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ROLE_ENUM } from 'src/commons/enums/enums';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { setupTestModule } from '../test-setup';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service';
import { mockSaoPedroPessoaService } from '../../test/mocks/sao-pedro-api-mock';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const email = 'carmem@neocatecumenal.com.es';
  const cpf = '11122233345';
  const password = faker.internet.password();
  const whatsapp = '16999999999';

  beforeAll(async () => {
    app = await setupTestModule([
      {
        provider: SaoPedroPessoaService,
        value: mockSaoPedroPessoaService,
      },
    ]);
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
      cpf,
      password,
      whatsapp,
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      server: '127.0.0.1/users',
      page: 1,
      limit: 1,
      data: {
        email,
        whatsapp,
        verifiedWhatsapp: false,
      },
    });

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('password');
    expect(response.body.data).toHaveProperty('verifiedWhatsapp');
    expect(response.body.data).toHaveProperty('role', ROLE_ENUM.NAO_IDENTIFICADO);
    expect(response.body.data).toHaveProperty('active', false);
    expect(response.body.data).toHaveProperty('createdAt');
    expect(response.body.data).toHaveProperty('updatedAt');
    expect(typeof response.body.data.password).toBe('string');
    expect(typeof response.body.data.verifiedWhatsapp).toBe('boolean');
  });

  it('/users (POST) - Não deve permitir e-mail duplicado', async () => {
    // Mock específico para esse teste
    jest
      .spyOn(mockSaoPedroPessoaService, 'getExternalPessoaByCpf')
      .mockResolvedValueOnce({
        id: 3,
        externalId: 'id-usuario-cpf-duplicado-e2e-2',
        nome: 'Outra Pessoa Mock',
        cpf: '74147855632',
        ativo: true,
      });

    const response = await request(app.getHttpServer()).post('/users').send({
      email,
      cpf: '74147855632',
      password: 'admin',
      whatsapp,
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toContain(
      `O campo 'email' já existe cadastrado. Não permitimos duplicidade.`,
    );
  });

  it('/users (POST) - Não deve permitir CPF duplicado', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email,
      cpf,
      password: 'admin',
      whatsapp,
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toContain(
      `Já tem um usuario com esse ID: 1 - Email: carmem@neocatecumenal.com.es`,
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
