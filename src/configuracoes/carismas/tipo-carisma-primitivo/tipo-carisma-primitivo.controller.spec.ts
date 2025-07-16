import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaPrimitivoController } from './tipo-carisma-primitivo.controller';
import { TipoCarismaPrimitivoService } from './tipo-carisma-primitivo.service';
import { PrismaService } from 'src/prisma.service';

describe('TipoCarismaPrimitivoController', () => {
  let controller: TipoCarismaPrimitivoController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCarismaPrimitivoController],
      providers: [TipoCarismaPrimitivoService, PrismaService],
    }).compile();

    controller = module.get<TipoCarismaPrimitivoController>(TipoCarismaPrimitivoController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should return all tipo carisma primitivo', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return a tipo carisma primitivo by id', async () => {
    const id = 1;
    const result = await controller.findOne(id.toString());
    expect(result).toBeDefined();
    expect(result.id).toBe(id);
  });

  it('should throw an error if tipo carisma primitivo not found', async () => {
    const id = 999; // Assuming this ID does not exist
    await expect(controller.findOne(id.toString())).rejects.toThrow();
  });
});
