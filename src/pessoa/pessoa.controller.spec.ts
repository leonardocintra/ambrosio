import { Test, TestingModule } from '@nestjs/testing';
import { PessoaController } from './pessoa.controller';
import { PessoaService } from './pessoa.service';
import { PrismaService } from 'src/prisma.service';
import { EstadoCivilService } from 'src/configuracoes/estado-civil/estado-civil.service';
import { EscolaridadeService } from 'src/configuracoes/escolaridade/escolaridade.service';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service';
import { TipoCarismaVinculadoService } from 'src/configuracoes/carismas/tipo-carisma-vinculado/tipo-carisma-vinculado.service';
import { TipoCarismaServicoService } from 'src/configuracoes/carismas/tipo-carisma-servico/tipo-carisma-servico.service';
import { TipoCarismaPrimitivoService } from 'src/configuracoes/carismas/tipo-carisma-primitivo/tipo-carisma-primitivo.service';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service';

describe('PessoaController', () => {
  let controller: PessoaController;
  let prismaService: PrismaService;
  let estadoCivilService: EstadoCivilService;
  let escolaridadeService: EscolaridadeService;
  let situacaoReligiosaService: SituacaoReligiosaService;
  let tipoCarismaVinculadoService: TipoCarismaVinculadoService;
  let tipoCarismaServicoService: TipoCarismaServicoService;
  let tipoCarismaPrimitivoService: TipoCarismaPrimitivoService;
  let saoPedroPessoaService: SaoPedroPessoaService;
  let jwtService: JwtService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoaController],
      providers: [
        PessoaService,
        JwtService,
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
        {
          provide: TipoCarismaVinculadoService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            registerCarismaVinculadoPessoa: jest.fn(),
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
          provide: TipoCarismaPrimitivoService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            registerCarismaPrimitivoPessoa: jest.fn(),
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

    controller = module.get<PessoaController>(PessoaController);
    prismaService = module.get<PrismaService>(PrismaService);
    saoPedroPessoaService = module.get<SaoPedroPessoaService>(
      SaoPedroPessoaService,
    );
    estadoCivilService = module.get<EstadoCivilService>(EstadoCivilService);
    escolaridadeService = module.get<EscolaridadeService>(EscolaridadeService);
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
    jwtService = module.get<JwtService>(JwtService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(estadoCivilService).toBeDefined();
    expect(escolaridadeService).toBeDefined();
    expect(situacaoReligiosaService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(tipoCarismaVinculadoService).toBeDefined();
    expect(tipoCarismaServicoService).toBeDefined();
    expect(tipoCarismaPrimitivoService).toBeDefined();
    expect(saoPedroPessoaService).toBeDefined();
  });
});
