import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaVinculadoController } from './tipo-carisma-vinculado.controller';
import { TipoCarismaVinculadoService } from './tipo-carisma-vinculado.service';
import { PrismaService } from 'src/prisma.service';

describe('TipoCarismaVinculadoController', () => {
  let controller: TipoCarismaVinculadoController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCarismaVinculadoController],
      providers: [TipoCarismaVinculadoService, PrismaService],
    }).compile();

    controller = module.get<TipoCarismaVinculadoController>(TipoCarismaVinculadoController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should return all tipo carisma vinculado', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return a tipo carisma vinculado by id', async () => {
    const id = 1;
    const result = await controller.findOne(id.toString());
    expect(result).toBeDefined();
    expect(result.id).toBe(id);
  });

  it('should throw an error if tipo carisma vinculado not found', async () => {
    const id = 999; // Assuming this ID does not exist
    await expect(controller.findOne(id.toString())).rejects.toThrow();
  });
});
