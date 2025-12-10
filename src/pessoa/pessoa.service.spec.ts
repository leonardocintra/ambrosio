import { Test, TestingModule } from '@nestjs/testing';
import { PessoaService } from './pessoa.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service';
import { TipoCarismaPrimitivoService } from 'src/configuracoes/carismas/tipo-carisma-primitivo/tipo-carisma-primitivo.service';
import { TipoCarismaServicoService } from 'src/configuracoes/carismas/tipo-carisma-servico/tipo-carisma-servico.service';
import { TipoCarismaVinculadoService } from 'src/configuracoes/carismas/tipo-carisma-vinculado/tipo-carisma-vinculado.service';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service';

describe('PessoaService', () => {
  let service: PessoaService;
  let prismaService: PrismaService;
  let situacaoReligiosaService: SituacaoReligiosaService;
  let tipoCarismaVinculadoService: TipoCarismaVinculadoService;
  let tipoCarismaServicoService: TipoCarismaServicoService;
  let tipoCarismaPrimitivoService: TipoCarismaPrimitivoService;
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
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
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
        {
          provide: TipoCarismaVinculadoService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            registerCarismaVinculadoPessoa: jest.fn(),
          },
        },
        {
          provide: TipoCarismaPrimitivoService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            registerCarismaPrimitivoPessoa: jest.fn(),
          },
        },
        {
          provide: TipoCarismaServicoService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            registerCarismaServicoPessoa: jest.fn(),
          },
        },
        {
          provide: SaoPedroPessoaService,
          useValue: {
            getPessoas: jest.fn().mockResolvedValue([]),
            postExternalPessoa: jest
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
    tipoCarismaVinculadoService = module.get<TipoCarismaVinculadoService>(
      TipoCarismaVinculadoService,
    );
    tipoCarismaServicoService = module.get<TipoCarismaServicoService>(
      TipoCarismaServicoService,
    );
    tipoCarismaPrimitivoService = module.get<TipoCarismaPrimitivoService>(
      TipoCarismaPrimitivoService,
    );
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(situacaoReligiosaService).toBeDefined();
    expect(tipoCarismaVinculadoService).toBeDefined();
    expect(tipoCarismaServicoService).toBeDefined();
    expect(tipoCarismaPrimitivoService).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(saoPedroPessoaService).toBeDefined();
  });
});
