import { Test, TestingModule } from '@nestjs/testing';
import { CasalService } from './casal.service';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { HttpModule } from '@nestjs/axios';
import { SaoPedroAuthService } from 'src/external/sao-pedro/sao-pedro-auth.service';

describe('CasalService', () => {
  let service: CasalService;
  let prismaService: PrismaService;
  let saoPedroPessoaService: SaoPedroPessoaService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CasalService,
        PrismaService,
        SaoPedroPessoaService,
        SaoPedroAuthService,
        CaslAbilityService,
      ],
    }).compile();

    service = await module.resolve<CasalService>(CasalService);
    prismaService = module.get<PrismaService>(PrismaService);
    saoPedroPessoaService = await module.resolve<SaoPedroPessoaService>(
      SaoPedroPessoaService,
    );
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(saoPedroPessoaService).toBeDefined();
    expect(abilityService).toBeDefined();
  });
});
