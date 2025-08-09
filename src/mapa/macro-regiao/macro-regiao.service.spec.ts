import { Test, TestingModule } from '@nestjs/testing';
import { MacroRegiaoService } from './macro-regiao.service';
import { PrismaService } from 'src/prisma.service';

describe('MacroRegiaoService', () => {
  let service: MacroRegiaoService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MacroRegiaoService, PrismaService],
    }).compile();

    service = module.get<MacroRegiaoService>(MacroRegiaoService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should return all macro-regioes', async () => {
    const macroRegioes = [
      { id: 1, descricao: 'Macro Região 1', ativo: true },
      { id: 2, descricao: 'Macro Região 2', ativo: false },
    ];
    jest.spyOn(prisma.macroRegiao, 'findMany').mockResolvedValue(macroRegioes);

    expect(await service.findAll()).toEqual(macroRegioes);
  });

  it('should return a macro-regiao by id', async () => {
    const macroRegiao = { id: 1, descricao: 'Macro Região 1', ativo: true };
    jest.spyOn(prisma.macroRegiao, 'findUniqueOrThrow').mockResolvedValue(macroRegiao);

    expect(await service.findOne(1)).toEqual(macroRegiao);
  });

  it('should return undefined for a non-existing macro-regiao', async () => {
    jest.spyOn(prisma.macroRegiao, 'findUniqueOrThrow').mockResolvedValue(null);

    expect(await service.findOne(999)).toBeNull();
  });
});
