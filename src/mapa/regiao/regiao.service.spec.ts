import { Test, TestingModule } from '@nestjs/testing';
import { RegiaoService } from './regiao.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PrismaService } from 'src/prisma.service';

describe('RegiaoService', () => {
  let service: RegiaoService;
  let prismaService: PrismaService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegiaoService, CaslAbilityService, PrismaService],
    }).compile();

    service = await module.resolve<RegiaoService>(RegiaoService);
    prismaService = module.get<PrismaService>(PrismaService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
