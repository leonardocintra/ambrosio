import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaPrimitivoService } from './tipo-carisma-primitivo.service';
import { PrismaService } from 'src/prisma.service';

describe('TipoCarismaPrimitivoService', () => {
  let service: TipoCarismaPrimitivoService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoCarismaPrimitivoService, PrismaService],
    }).compile();

    service = module.get<TipoCarismaPrimitivoService>(TipoCarismaPrimitivoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should return all tipo carisma primitivo', async () => {
    const result = await service.findAll();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return a tipo carisma primitivo by id', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).toBeDefined();
    expect(result.id).toBe(id);
  });

  it('should throw an error if tipo carisma primitivo not found', async () => {
    const id = 999; // Assuming this ID does not exist
    await expect(service.findOne(id)).rejects.toThrow();
  });
});
