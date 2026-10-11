import { Test, TestingModule } from '@nestjs/testing';
import { PessoaService } from './pessoa.service.js';
import { PrismaService } from 'src/prisma.service.js';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service.js';
import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service.js';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service.js';

describe('PessoaService', () => {
  let service: PessoaService;
  let prismaService: PrismaService;
  let situacaoReligiosaService: SituacaoReligiosaService;
  let saoPedroPessoaService: SaoPedroPessoaService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoaService,
        CaslAbilityService,
        {
          provide: PrismaService,
          useValue: {
            create: vi.fn(),
            findFirstOrThrow: vi.fn(),
          },
        },
        {
          provide: SituacaoReligiosaService,
          useValue: {
            create: vi.fn(),
            findAll: vi.fn(),
            findOne: vi.fn(),
            update: vi.fn(),
            remove: vi.fn(),
          },
        },
        {
          provide: SaoPedroPessoaService,
          useValue: {
            getPessoas: vi.fn().mockResolvedValue([]),
            postExternalPessoa: vi
              .fn()
              .mockResolvedValue({ id: 1, nome: 'João' }),
          },
        },
      ],
    }).compile();

    service = await module.resolve<PessoaService>(PessoaService);
    prismaService = module.get<PrismaService>(PrismaService);
    saoPedroPessoaService = module.get<SaoPedroPessoaService>(
      SaoPedroPessoaService,
    );
    situacaoReligiosaService = module.get<SituacaoReligiosaService>(
      SituacaoReligiosaService,
    );
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(situacaoReligiosaService).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(saoPedroPessoaService).toBeDefined();
  });
});
