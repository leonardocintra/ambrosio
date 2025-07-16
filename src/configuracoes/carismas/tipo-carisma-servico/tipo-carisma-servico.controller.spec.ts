import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaServicoController } from './tipo-carisma-servico.controller';
import { TipoCarismaServicoService } from './tipo-carisma-servico.service';
import { PrismaService } from 'src/prisma.service';

describe('TipoCarismaServicoController', () => {
  let controller: TipoCarismaServicoController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCarismaServicoController],
      providers: [TipoCarismaServicoService, PrismaService],
    }).compile();

    controller = module.get<TipoCarismaServicoController>(
      TipoCarismaServicoController,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should return all tipo carisma servico', async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return a tipo carisma servico by id', async () => {
    const id = 1;
    const result = await controller.findOne(id.toString());
    expect(result).toBeDefined();
    expect(result.id).toBe(id);
  });

  it('should throw an error if tipo carisma servico not found', async () => {
    const id = 999; // Assuming this ID does not exist
    await expect(controller.findOne(id.toString())).rejects.toThrow();
  });
});
