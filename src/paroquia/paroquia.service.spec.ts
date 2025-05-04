import { Test, TestingModule } from '@nestjs/testing';
import { ParoquiaService } from './paroquia.service';
import { PrismaService } from 'src/prisma.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { DioceseService } from 'src/diocese/diocese.service';
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service';
import { EstadoService } from 'src/configuracoes/estado/estado.service';
import { PaisService } from 'src/configuracoes/pais/pais.service';
import { HttpModule } from '@nestjs/axios';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

describe('ParoquiaService', () => {
  let service: ParoquiaService;
  let prismaService: PrismaService;
  let enderecoService: EnderecoService;
  let dioceseService: DioceseService;
  let tipoDioceseService: TipoDioceseService;
  let cidadeService: CidadeService;
  let estadoService: EstadoService;
  let paisService: PaisService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ParoquiaService,
        DioceseService,
        EnderecoService,
        TipoDioceseService,
        PaisService,
        EstadoService,
        CidadeService,
        CaslAbilityService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ParoquiaService>(ParoquiaService);
    enderecoService = module.get<EnderecoService>(EnderecoService);
    tipoDioceseService = module.get<TipoDioceseService>(TipoDioceseService);
    dioceseService = module.get<DioceseService>(DioceseService);
    cidadeService = module.get<CidadeService>(CidadeService);
    estadoService = module.get<EstadoService>(EstadoService);
    paisService = module.get<PaisService>(PaisService);
    prismaService = module.get<PrismaService>(PrismaService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(enderecoService).toBeDefined();
    expect(dioceseService).toBeDefined();
    expect(cidadeService).toBeDefined();
    expect(estadoService).toBeDefined();
    expect(paisService).toBeDefined();
    expect(tipoDioceseService).toBeDefined();
    expect(abilityService).toBeDefined();
  });
});
