import { Test, TestingModule } from '@nestjs/testing';
import { SetorService } from './setor.service';
import { PrismaService } from 'src/prisma.service';

describe('SetorService', () => {
  let service: SetorService;
  let prisma: PrismaService;

  const mockSetorArray = [
    { id: 1, name: 'Portinari I', regiao: { id: 1, name: 'Região 1' } },
    { id: 2, name: 'Anhaguera', regiao: { id: 2, name: 'Região 2' } },
  ];
  const mockSetor = {
    id: 1,
    name: 'Portinari I',
    regiao: { id: 1, name: 'Região 1' },
  };

  const prismaMock = {
    setor: {
      findMany: jest.fn().mockResolvedValue(mockSetorArray),
      findUniqueOrThrow: jest
        .fn()
        .mockImplementation(({ where: { id } }) =>
          Promise.resolve(mockSetorArray.find((setor) => setor.id === id)),
        ),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetorService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<SetorService>(SetorService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of setores', async () => {
      const result = await service.findAll();
      expect(prisma.setor.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockSetorArray);
    });
  });

  describe('findOne', () => {
    it('should return a setor by id', async () => {
      const result = await service.findOne(1);
      expect(prisma.setor.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { regiao: true },
      });
      expect(result).toEqual(mockSetor);
    });

    it('should return undefined if setor not found', async () => {
      const result = await service.findOne(999);
      expect(prisma.setor.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 999 },
        include: { regiao: true },
      });
      expect(result).toBeUndefined();
    });
  });
});
