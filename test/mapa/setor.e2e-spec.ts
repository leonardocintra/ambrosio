import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupTestModule } from '../test-setup';

describe('SetorController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupTestModule();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/setor (GET) - get setor sem autenticacao', () => {
    return request(app.getHttpServer())
      .get('/setor')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('server');
        expect(res.body).toHaveProperty('total', 12);
        expect(res.body).toHaveProperty('page', 1);
        expect(res.body).toHaveProperty('limit', 12);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data).toHaveLength(12);

        const expectedData = [
          {
            id: 1,
            descricao: 'Anhaguera - Setor 1',
            macroRegiaoId: 1,
            ativo: true,
            macroRegiao: {
              id: 1,
              descricao: 'Franca',
              ativo: true,
            },
          },
          {
            id: 2,
            descricao: 'Anhaguera - Setor 2',
            macroRegiaoId: 1,
            ativo: true,
            macroRegiao: {
              id: 1,
              descricao: 'Franca',
              ativo: true,
            },
          },
          {
            id: 3,
            descricao: 'Portinari - Setor 1',
            macroRegiaoId: 1,
            ativo: true,
            macroRegiao: {
              id: 1,
              descricao: 'Franca',
              ativo: true,
            },
          },
          {
            id: 4,
            descricao: 'Portinari - Setor 2',
            macroRegiaoId: 1,
            ativo: true,
            macroRegiao: {
              id: 1,
              descricao: 'Franca',
              ativo: true,
            },
          },
          {
            id: 5,
            descricao: 'Brasilia - Setor 1',
            macroRegiaoId: 2,
            ativo: true,
            macroRegiao: {
              id: 2,
              descricao: 'Brasília',
              ativo: true,
            },
          },
          {
            id: 6,
            descricao: 'Brasilia - Setor 2',
            macroRegiaoId: 2,
            ativo: true,
            macroRegiao: {
              id: 2,
              descricao: 'Brasília',
              ativo: true,
            },
          },
          {
            id: 7,
            descricao: 'Brasilia - Setor 3',
            macroRegiaoId: 2,
            ativo: true,
            macroRegiao: {
              id: 2,
              descricao: 'Brasília',
              ativo: true,
            },
          },
          {
            id: 8,
            descricao: 'Brasilia - Setor 4',
            macroRegiaoId: 2,
            ativo: true,
            macroRegiao: {
              id: 2,
              descricao: 'Brasília',
              ativo: true,
            },
          },
          {
            id: 9,
            descricao: 'Brasilia - Setor 5',
            macroRegiaoId: 2,
            ativo: true,
            macroRegiao: {
              id: 2,
              descricao: 'Brasília',
              ativo: true,
            },
          },
          {
            id: 10,
            descricao: 'Centro Oeste - GO 1',
            macroRegiaoId: 3,
            ativo: true,
            macroRegiao: {
              id: 3,
              descricao: 'Goiás',
              ativo: true,
            },
          },
          {
            id: 11,
            descricao: 'Centro Oeste - GO 2',
            macroRegiaoId: 3,
            ativo: true,
            macroRegiao: {
              id: 3,
              descricao: 'Goiás',
              ativo: true,
            },
          },
          {
            id: 12,
            descricao: 'Centro Oeste - GO 3',
            macroRegiaoId: 3,
            ativo: true,
            macroRegiao: {
              id: 3,
              descricao: 'Goiás',
              ativo: true,
            },
          },
        ];

        expect(res.body.data).toEqual(expectedData);
      });
  });

  it('/setor/3 (GET) - deve retornar Portinari - Setor 1', () => {
    return request(app.getHttpServer())
      .get('/setor/3')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual({
          id: 3,
          descricao: 'Portinari - Setor 1',
          macroRegiaoId: 1,
          ativo: true,
          macroRegiao: {
            id: 1,
            descricao: 'Franca',
            ativo: true,
          },
        });
      });
  });

  it('/setor?macroRegiaoId=1 (GET) - deve retornar setores da macroRegião Franca', () => {
    return request(app.getHttpServer())
      .get('/setor?macroRegiaoId=1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data).toHaveLength(4);

        const expectedData = [
          {
            id: 1,
            descricao: 'Anhaguera - Setor 1',
            macroRegiaoId: 1,
            ativo: true,
            macroRegiao: {
              id: 1,
              descricao: 'Franca',
              ativo: true,
            },
          },
          {
            id: 2,
            descricao: 'Anhaguera - Setor 2',
            macroRegiaoId: 1,
            ativo: true,
            macroRegiao: {
              id: 1,
              descricao: 'Franca',
              ativo: true,
            },
          },
          {
            id: 3,
            descricao: 'Portinari - Setor 1',
            macroRegiaoId: 1,
            ativo: true,
            macroRegiao: {
              id: 1,
              descricao: 'Franca',
              ativo: true,
            },
          },
          {
            id: 4,
            descricao: 'Portinari - Setor 2',
            macroRegiaoId: 1,
            ativo: true,
            macroRegiao: {
              id: 1,
              descricao: 'Franca',
              ativo: true,
            },
          },
        ];

        expect(res.body.data).toEqual(expectedData);
      });
  });
});
