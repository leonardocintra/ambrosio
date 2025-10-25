import { Test, TestingModule } from '@nestjs/testing';
import { DioceseService } from './diocese.service';
import { PrismaService } from 'src/prisma.service';
import { LocalidadeService } from 'src/localidade/localidade.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { TipoLocalidadeService } from 'src/configuracoes/tipo-localidade/tipo-localidade.service';
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service';
import { PaisService } from 'src/configuracoes/pais/pais.service';
import { EstadoService } from 'src/configuracoes/estado/estado.service';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service';
import { HttpModule } from '@nestjs/axios';

describe('DioceseService', () => {
  let service: DioceseService;
  let prismaService: PrismaService;
  let localidadeService: LocalidadeService;
  let tipoLocalidadeService: TipoLocalidadeService;
  let tipoDioceseService: TipoDioceseService;
  let enderecoService: EnderecoService;
  let paisService: PaisService;
  let estadoService: EstadoService;
  let cidadeService: CidadeService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        DioceseService,
        LocalidadeService,
        TipoLocalidadeService,
        TipoDioceseService,
        EnderecoService,
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
        }
      ],
    }).compile();

    service = module.get<DioceseService>(DioceseService);
    prismaService = module.get<PrismaService>(PrismaService);
    localidadeService = module.get<LocalidadeService>(LocalidadeService);
    tipoLocalidadeService = module.get<TipoLocalidadeService>(
      TipoLocalidadeService,
    );
    tipoDioceseService = module.get<TipoDioceseService>(TipoDioceseService);
    paisService = module.get<PaisService>(PaisService);
    estadoService = module.get<EstadoService>(EstadoService);
    cidadeService = module.get<CidadeService>(CidadeService);
    enderecoService = module.get<EnderecoService>(EnderecoService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(localidadeService).toBeDefined();
    expect(tipoLocalidadeService).toBeDefined();
    expect(paisService).toBeDefined();
    expect(estadoService).toBeDefined();
    expect(cidadeService).toBeDefined();
    expect(tipoDioceseService).toBeDefined();
    expect(enderecoService).toBeDefined();
    expect(abilityService).toBeDefined();
  });
});
