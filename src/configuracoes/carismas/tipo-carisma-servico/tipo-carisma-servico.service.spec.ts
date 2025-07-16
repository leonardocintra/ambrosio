import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaServicoService } from './tipo-carisma-servico.service';
import { PrismaService } from 'src/prisma.service';

describe('TipoCarismaServicoService', () => {
  let service: TipoCarismaServicoService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoCarismaServicoService, PrismaService],
    }).compile();

    service = module.get<TipoCarismaServicoService>(TipoCarismaServicoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should return all tipo carisma servico', async () => {
    const result = await service.findAll();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return a tipo carisma servico by id', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).toBeDefined();
    expect(result.id).toBe(id);
  });

  it('should throw an error if tipo carisma servico not found', async () => {
    const id = 999; // Assuming this ID does not exist
    await expect(service.findOne(id)).rejects.toThrow();
  });
});
