import { Test, TestingModule } from '@nestjs/testing';
import { SetorController } from './setor.controller';
import { SetorService } from './setor.service';
import { PrismaService } from 'src/prisma.service';

describe('SetorController', () => {
  let controller: SetorController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetorController],
      providers: [
        SetorService,
        {
          provide: PrismaService,
          useValue: {
            setor: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SetorController>(SetorController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should return all setores', async () => {
    const setores = [
      { id: 1, descricao: 'Setor 1', ativo: true },
      { id: 2, descricao: 'Setor 2', ativo: false },
    ];
    jest.spyOn(prisma.setor, 'findMany').mockResolvedValue(setores);

    expect(await controller.findAll()).toEqual(setores);
  });

  it('should return a setor by id', async () => {
    const setor = { id: 1, descricao: 'Setor 1', ativo: true };
    jest.spyOn(prisma.setor, 'findUnique').mockResolvedValue(setor);

    expect(await controller.findOne('1')).toEqual(setor);
  });

  it('should return undefined for a non-existing setor', async () => {
    jest.spyOn(prisma.setor, 'findUnique').mockResolvedValue(null);

    expect(await controller.findOne('999')).toBeNull();
  });
});
