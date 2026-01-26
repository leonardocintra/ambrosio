import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoService } from './historico.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

describe('HistoricoService', () => {
  let service: HistoricoService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricoService, PrismaService, CaslAbilityService],
    }).compile();

    service = await module.resolve<HistoricoService>(HistoricoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
