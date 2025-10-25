import { Test, TestingModule } from '@nestjs/testing';
import { RegiaoController } from './regiao.controller';
import { RegiaoService } from './regiao.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PrismaService } from 'src/prisma.service';
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

    controller = module.get<RegiaoController>(RegiaoController);
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
