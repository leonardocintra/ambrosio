import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupTestModule } from '../test-setup';

describe('PessoaCarismaController (e2e)', () => {
  let app: INestApplication;
  const principal = 'pessoa';
  let token = '';
  let pessoaId: number;

  beforeAll(async () => {
    app = await setupTestModule();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@admin.com', password: 'admin' });

    token = response.body.data.access_token;

    // Busca uma pessoa existente para usar nos testes
    const pessoaResponse = await request(app.getHttpServer())
      .get('/pessoa')
      .set('Authorization', `Bearer ${token}`);

    pessoaId = pessoaResponse.body.data[0].id;
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

  it(`/${principal}/:id/carisma (POST) - 401 | não pode cadastrar carisma se não tiver autenticado`, () => {
    return request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .send({
        carismas: {
          primitivos: [{ id: 1, descricao: 'Carisma 1' }],
        },
      })
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Invalid or missing token');
        expect(res.body.error).toBe('Unauthorized');
        expect(res.body.statusCode).toBe(401);
      });
  });

  it(`/${principal}/:id/carisma (POST) - 403 | não pode cadastrar carisma se não tiver permissão`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'ronaldinho@admin.com', password: 'admin' });

    const tokenNaoPermitido = response.body.data.access_token;

    return request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .set('Authorization', `Bearer ${tokenNaoPermitido}`)
      .send({
        carismas: {
          primitivos: [{ id: 1, descricao: 'Carisma 1' }],
        },
      })
      .expect(403)
      .expect((res) => {
        expect(res.body.message).toBe(
          'Você não tem permissão para criar um carisma primitivo',
        );
        expect(res.body.error).toBe('Forbidden');
        expect(res.body.statusCode).toBe(403);
      });
  });

  it(`/${principal}/9999/carisma (POST) - 404 | deve retornar erro quando pessoa não for encontrada`, () => {
    return request(app.getHttpServer())
      .post(`/${principal}/9999/carisma`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        carismas: {
          primitivos: [{ id: 1, descricao: 'Carisma 1' }],
        },
      })
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(
          `O registro de 'Pessoa' não foi encontrado.`,
        );
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal}/:id/carisma (POST) - 400 | deve retornar erro quando payload inválido`, () => {
    return request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        carismas: {
          primitivos: [{ descricao: 'Carisma sem ID' }],
        },
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBe('Bad Request');
        expect(res.body.statusCode).toBe(400);
      });
  });

  it(`/${principal}/:id/carisma (POST) - 404 | deve retornar erro quando carisma primitivo não existir`, () => {
    return request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        carismas: {
          primitivos: [{ id: 9999, descricao: 'Carisma Inexistente' }],
        },
      })
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`ID informado não encontrado.`);
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal}/:id/carisma (POST) - 404 | deve retornar erro quando carisma vinculado não existir`, () => {
    return request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        carismas: {
          vinculados: [
            { id: 9999, descricao: 'Carisma Vinculado Inexistente' },
          ],
        },
      })
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`ID informado não encontrado.`);
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal}/:id/carisma (POST) - 404 | deve retornar erro quando carisma serviço não existir`, () => {
    return request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        carismas: {
          servicos: [{ id: 9999, descricao: 'Serviço Inexistente' }],
        },
      })
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`ID informado não encontrado.`);
        expect(res.body.statusCode).toBe(404);
      });
  });

  it(`/${principal}/:id/carisma (POST) - 201 | deve cadastrar carismas primitivos com sucesso`, async () => {
    const carismaData = {
      carismas: {
        primitivos: [
          { id: 1, descricao: 'Vocacionado' },
          { id: 2, descricao: 'Vocacionada' },
        ],
      },
    };

    const response = await request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(carismaData)
      .expect(201);

    expect(response.body.data.carismas).toHaveProperty('primitivos');
    expect(response.body.data.carismas.primitivos.count).toBe(2);
  });

  it(`/${principal}/:id/carisma (POST) - 201 | deve cadastrar carismas vinculados com sucesso`, async () => {
    const carismaData = {
      carismas: {
        vinculados: [
          { id: 1, descricao: 'Responsável' },
          { id: 2, descricao: 'Co-Responsável' },
        ],
      },
    };

    const response = await request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(carismaData)
      .expect(201);

    expect(response.body.data.carismas).toHaveProperty('vinculados');
    expect(response.body.data.carismas.vinculados.count).toBe(2);
  });

  it(`/${principal}/:id/carisma (POST) - 201 | deve cadastrar carismas de serviço com sucesso`, async () => {
    const carismaData = {
      carismas: {
        servicos: [
          { id: 1, descricao: 'Secretário' },
          { id: 2, descricao: 'Voluntário' },
        ],
      },
    };

    const response = await request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(carismaData)
      .expect(201);

    expect(response.body.data.carismas).toHaveProperty('servicos');
    expect(response.body.data.carismas.servicos.count).toBe(2);
  });

  it(`/${principal}/:id/carisma (POST) - 201 | deve cadastrar todos os tipos de carisma em uma única requisição`, async () => {
    const carismaData = {
      carismas: {
        primitivos: [{ id: 3, descricao: 'Religioso(a)' }],
        vinculados: [{ id: 3, descricao: 'Salmista' }],
        servicos: [{ id: 3, descricao: 'Convidado' }],
      },
    };

    const response = await request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(carismaData)
      .expect(201);

    expect(response.body.data.carismas).toHaveProperty('primitivos');
    expect(response.body.data.carismas).toHaveProperty('vinculados');
    expect(response.body.data.carismas).toHaveProperty('servicos');
    expect(response.body.data.carismas.primitivos.count).toBe(1);
    expect(response.body.data.carismas.vinculados.count).toBe(1);
    expect(response.body.data.carismas.servicos.count).toBe(1);
  });

  it(`/${principal}/:id/carisma (POST) - 200 | deve ignorar carismas duplicados (skipDuplicates)`, async () => {
    const carismaData = {
      carismas: {
        primitivos: [
          { id: 1, descricao: 'Vocacionado' }, // Já cadastrado anteriormente
        ],
      },
    };

    const response = await request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(carismaData)
      .expect(201);

    expect(response.body.data.carismas.primitivos.count).toBe(0); // Nenhum registro criado (duplicado)
  });

  it(`/${principal}/:id/carisma (POST) - 400 | deve retornar erro quando não enviar nenhum carisma`, () => {
    return request(app.getHttpServer())
      .post(`/${principal}/${pessoaId}/carisma`)
      .set('Authorization', `Bearer ${token}`)
      .send({ carismas: {} })
      .expect(400)
      .expect((res) => {
        expect(res.body.message[0]).toBe(
          'Pelo menos um tipo de carisma deve ser informado',
        );
        expect(res.body.error).toBe('Bad Request');
        expect(res.body.statusCode).toBe(400);
      });
  });
});
