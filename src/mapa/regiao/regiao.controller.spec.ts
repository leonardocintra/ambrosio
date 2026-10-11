import { Test, TestingModule } from '@nestjs/testing';
import { RegiaoController } from './regiao.controller.js';
import { RegiaoService } from './regiao.service.js';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service.js';
import { PrismaService } from 'src/prisma.service.js';
import { JwtService } from '@nestjs/jwt';

describe('RegiaoController', () => {
  let controller: RegiaoController;
  let prismaService: PrismaService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegiaoController],
      providers: [RegiaoService, CaslAbilityService, PrismaService, JwtService],
    }).compile();

    controller = await module.resolve<RegiaoController>(RegiaoController);
    prismaService = module.get<PrismaService>(PrismaService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
