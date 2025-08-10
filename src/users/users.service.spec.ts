import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { EstadoCivilService } from 'src/configuracoes/estado-civil/estado-civil.service';
import { EscolaridadeService } from 'src/configuracoes/escolaridade/escolaridade.service';
import { TipoCarismaPrimitivoService } from 'src/configuracoes/carismas/tipo-carisma-primitivo/tipo-carisma-primitivo.service';
import { TipoCarismaVinculadoService } from 'src/configuracoes/carismas/tipo-carisma-vinculado/tipo-carisma-vinculado.service';
import { TipoCarismaServicoService } from 'src/configuracoes/carismas/tipo-carisma-servico/tipo-carisma-servico.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;
  let abilityService: CaslAbilityService;
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
            create: jest.fn(),
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
          provide: TipoCarismaPrimitivoService,
          useValue: {},
        },
        {
          provide: TipoCarismaVinculadoService,
          useValue: {},
        },
        {
          provide: TipoCarismaServicoService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    pessoaService = module.get<PessoaService>(PessoaService);
    prismaService = module.get<PrismaService>(PrismaService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(pessoaService).toBeDefined();
  });
});
