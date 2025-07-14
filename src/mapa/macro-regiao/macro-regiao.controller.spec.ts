import { Test, TestingModule } from '@nestjs/testing';
import { MacroRegiaoController } from './macro-regiao.controller';
import { MacroRegiaoService } from './macro-regiao.service';
import { PrismaService } from 'src/prisma.service';

describe('MacroRegiaoController', () => {
  let controller: MacroRegiaoController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MacroRegiaoController],
      providers: [MacroRegiaoService, PrismaService],
    }).compile();

    controller = module.get<MacroRegiaoController>(MacroRegiaoController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should return all macro-regioes', async () => {
    const macroRegioes = [
      { id: 1, descricao: 'Macro Região 1', ativo: true },
      { id: 2, descricao: 'Macro Região 2', ativo: false },
    ];
    jest.spyOn(prisma.macroRegiao, 'findMany').mockResolvedValue(macroRegioes);

    expect(await controller.findAll()).toEqual(macroRegioes);
  });

  it('should return a macro-regiao by id', async () => {
    const macroRegiao = { id: 1, descricao: 'Macro Região 1', ativo: true };
    jest.spyOn(prisma.macroRegiao, 'findUnique').mockResolvedValue(macroRegiao);

    expect(await controller.findOne('1')).toEqual(macroRegiao);
  });

  it('should return null for a non-existing macro-regiao', async () => {
    jest.spyOn(prisma.macroRegiao, 'findUnique').mockResolvedValue(null);

    expect(await controller.findOne('999')).toBeNull();
  });
});
