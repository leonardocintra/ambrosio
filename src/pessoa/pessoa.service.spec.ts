import { Test, TestingModule } from '@nestjs/testing';
import { PessoaService } from './pessoa.service';
import { PrismaService } from 'src/prisma.service';
import { EscolaridadeService } from 'src/configuracoes/escolaridade/escolaridade.service';
import { EstadoCivilService } from 'src/configuracoes/estado-civil/estado-civil.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service';

describe('PessoaService', () => {
  let service: PessoaService;
  let prismaService: PrismaService;
  let estadoCivilService: EstadoCivilService;
  let escolaridadeService: EscolaridadeService;
  let situacaoReligiosaService: SituacaoReligiosaService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoaService,
        CaslAbilityService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
        {
          provide: EstadoCivilService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: EscolaridadeService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: SituacaoReligiosaService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PessoaService>(PessoaService);
    prismaService = module.get<PrismaService>(PrismaService);
    estadoCivilService = module.get<EstadoCivilService>(EstadoCivilService);
    escolaridadeService = module.get<EscolaridadeService>(EscolaridadeService);
    situacaoReligiosaService = module.get<SituacaoReligiosaService>(
      SituacaoReligiosaService,
    );
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(estadoCivilService).toBeDefined();
    expect(escolaridadeService).toBeDefined();
    expect(situacaoReligiosaService).toBeDefined();
    expect(abilityService).toBeDefined();
  });
});
