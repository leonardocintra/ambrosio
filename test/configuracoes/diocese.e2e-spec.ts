import { INestApplication } from '@nestjs/common';
import { setupTestModule } from '../test-setup';
import request from 'supertest';
import { faker } from '@faker-js/faker/.';
import { of } from 'rxjs';

describe('DioceseController (e2e)', () => {
  let app: INestApplication;
  const principal = 'diocese';
  let token = '';

  beforeAll(async () => {
    app = await setupTestModule();
    const clientRabbit = app.get('PAIS_UF_CIDADE_SERVICE');
    jest.spyOn(clientRabbit, 'emit').mockReturnValue(of(true));

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@admin.com', password: 'admin' });

    token = response.body.data.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/${principal} (GET) - nao pode ver diocese se nao tiver autenticado`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}`)
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid or missing token');
        expect(res.body.error).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
      });
  });

  it(`/${principal} (GET) - nao pode ver diocese se nao tiver permissao`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'ronaldinho@admin.com', password: 'admin' });

    const tokenNaoPermitido = response.body.data.access_token;

    return request(app.getHttpServer())
      .get(`/${principal}`)
      .set('Authorization', `Bearer ${tokenNaoPermitido}`)
      .expect(403)
      .expect((res) => {
        expect(res.body.message).toBe(
          'Você não tem permissão para listar dioceses',
        );
        expect(res.body.error).toBe('Forbidden');
        expect(res.body.statusCode).toBe(403);
      });
  });

  it(`/${principal} (GET) | deve retornar dioceses com campos obrigatórios preenchidos`, () => {
    return request(app.getHttpServer())
      .get(`/${principal}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        const diocese = res.body.data[0]; // Pega a primeira diocese da lista

        // Verifica se a estrutura básica está correta
        expect(res.body).toHaveProperty('server');
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('page');
        expect(res.body).toHaveProperty('limit');
        expect(res.body.data).toBeInstanceOf(Array);

        // Valida campos obrigatórios da diocese
        expect(diocese).toHaveProperty('id');
        expect(diocese).toHaveProperty('tipoDioceseId');
        expect(diocese).toHaveProperty('descricao');
        expect(diocese).toHaveProperty('enderecoId');

        // Valida se 'tipoDiocese' está preenchido corretamente
        expect(diocese.tipoDiocese).toBeDefined();
        expect(diocese.tipoDiocese).toHaveProperty('id');
        expect(diocese.tipoDiocese).toHaveProperty('descricao');

        // Valida se 'endereco' está preenchido corretamente
        expect(diocese.endereco).toBeDefined();
        expect(diocese.endereco).toHaveProperty('id');
        expect(diocese.endereco).toHaveProperty('cep');
        expect(diocese.endereco).toHaveProperty('logradouro');
        expect(diocese.endereco).toHaveProperty('cidade');
        expect(diocese.endereco).toHaveProperty('bairro');
        expect(diocese.endereco).toHaveProperty('numero');
        expect(diocese.endereco).toHaveProperty('UF');
        expect(diocese.endereco).toHaveProperty('pais');
        expect(diocese.endereco).toHaveProperty('observacao');
      });
  });

  it(`/${principal} (POST) | deve criar uma diocese com campos válidos`, async () => {
    const dioceseData = {
      descricao: 'Jenkins, Mosciski and Marvin',
      tipoDiocese: { id: 2, descricao: 'Diocese' },
      endereco: {
        cep: '14403269',
        logradouro: 'Dave Groves',
        numero: '32',
        bairro: 'Granite Refined Cotton Keyboard',
        UF: 'SP',
        cidade: 'São Paulo',
      },
    };

    const response = await request(app.getHttpServer())
      .post(`/${principal}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(dioceseData)
      .expect(201);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.descricao).toBe(dioceseData.descricao);
    expect(response.body.data.tipoDiocese.id).toBe(dioceseData.tipoDiocese.id);
    expect(response.body.data.endereco.cep).toBe(dioceseData.endereco.cep);
    // Verifica se o método `emit` foi chamado com os parâmetros esperados
    const clientRabbit = app.get('PAIS_UF_CIDADE_SERVICE');
    expect(clientRabbit.emit).toHaveBeenCalledWith(
      expect.any(String), // RABBIT_PATTERN_PAIS_UF_CIDADE_CREATED
      expect.objectContaining({ enderecoId: expect.any(Number) }),
    );
  });

  it(`/${principal} (POST) | deve falhar sem autenticação`, async () => {
    await request(app.getHttpServer())
      .post(`/${principal}`)
      .send({ descricao: 'Diocese sem token' })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid or missing token');
        expect(res.body.error).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
      });
  });

  it(`/${principal}/1 (PATCH) | deve falhar sem autenticação`, async () => {
    await request(app.getHttpServer())
      .patch(`/${principal}/1`)
      .send({ descricao: 'Diocese sem token' })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid or missing token');
        expect(res.body.error).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
      });
  });

  it(`/${principal} (PATCH) | deve atualizar uma diocese com campos válidos`, async () => {
    const dioceseData = {
      descricao: faker.company.name(),
      tipoDiocese: { id: 2, descricao: 'Diocese' },
      endereco: {
        cep: faker.location.zipCode('########'),
        logradouro: 'Dave Groves',
        numero: '32',
        bairro: 'Granite Refined Cotton Keyboard',
        UF: 'SP',
        cidade: 'São Paulo',
      },
    };

    const response = await request(app.getHttpServer())
      .patch(`/${principal}/1`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(dioceseData)
      .expect(200);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.descricao).toBe(dioceseData.descricao);
    expect(response.body.data.tipoDiocese.id).toBe(dioceseData.tipoDiocese.id);
    expect(response.body.data.endereco.cep).toBe(dioceseData.endereco.cep);
    expect(response.body.data.endereco.bairro).toBe(
      dioceseData.endereco.bairro,
    );
    expect(response.body.data.endereco.numero).toBe(
      dioceseData.endereco.numero,
    );
    expect(response.body.data.endereco.logradouro).toBe(
      dioceseData.endereco.logradouro,
    );
    expect(response.body.data.endereco.cidade).toBe(
      dioceseData.endereco.cidade,
    );
    expect(response.body.data.endereco.UF).toBe(dioceseData.endereco.UF);
  });
});
