import { Test, TestingModule } from '@nestjs/testing';
import { EquipeService } from './equipe.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PrismaService } from 'src/prisma.service';
import { TipoEquipeService } from 'src/configuracoes/tipo-equipe/tipo-equipe.service';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service';
import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service';
import { HttpModule } from '@nestjs/axios';
import { SaoPedroAuthService } from 'src/external/sao-pedro/sao-pedro-auth.service';

describe('EquipeService', () => {
  let service: EquipeService;
  let prismaService: PrismaService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipeService,
        PrismaService,
        CaslAbilityService,
        TipoEquipeService,
        PessoaService,
        SaoPedroPessoaService,
        SaoPedroAuthService,
        SituacaoReligiosaService,
      ],
      imports: [HttpModule],
    }).compile();

    service = await module.resolve<EquipeService>(EquipeService);
    prismaService = module.get<PrismaService>(PrismaService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(abilityService).toBeDefined();
  });
});
