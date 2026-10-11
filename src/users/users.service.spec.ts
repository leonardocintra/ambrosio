import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service.js';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service.js';
import { PrismaService } from 'src/prisma.service.js';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service.js';
import { PessoaService } from 'src/pessoa/pessoa.service.js';
import { EstadoCivilService } from 'src/configuracoes/estado-civil/estado-civil.service.js';
import { EscolaridadeService } from 'src/configuracoes/escolaridade/escolaridade.service.js';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service.js';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;
  let abilityService: CaslAbilityService;
  let saoPedroPessoaService: SaoPedroPessoaService;
  let pessoaService: PessoaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        PessoaService,
        CaslAbilityService,
        {
          provide: PrismaService,
          useValue: {
            create: vi.fn(),
          },
        },
        {
          provide: EstadoCivilService,
          useValue: {},
        },
        {
          provide: EscolaridadeService,
          useValue: {},
        },
        {
          provide: SituacaoReligiosaService,
          useValue: {},
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

    service = await module.resolve<UsersService>(UsersService);
    pessoaService = await module.resolve<PessoaService>(PessoaService);
    saoPedroPessoaService = await module.resolve<SaoPedroPessoaService>(
      SaoPedroPessoaService,
    );
    prismaService = await module.resolve<PrismaService>(PrismaService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(pessoaService).toBeDefined();
    expect(saoPedroPessoaService).toBeDefined();
  });
});
