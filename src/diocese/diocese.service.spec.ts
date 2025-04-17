import { Test, TestingModule } from '@nestjs/testing';
import { DioceseService } from './diocese.service';
import { PrismaService } from 'src/prisma.service';
import { LocalidadeService } from 'src/localidade/localidade.service';
import { TipoLocalidadeService } from '../tipo-localidade/tipo-localidade.service';
import { TipoDioceseService } from '../tipo-diocese/tipo-diocese.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

describe('DioceseService', () => {
  let service: DioceseService;
  let prismaService: PrismaService;
  let localidadeService: LocalidadeService;
  let tipoLocalidadeService: TipoLocalidadeService;
  let tipoDioceseService: TipoDioceseService;
  let enderecoService: EnderecoService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DioceseService,
        LocalidadeService,
        TipoLocalidadeService,
        TipoDioceseService,
        EnderecoService,
        CaslAbilityService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
        {
          provide: 'LOCALIDADES_SERVICE',
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DioceseService>(DioceseService);
    prismaService = module.get<PrismaService>(PrismaService);
    localidadeService = module.get<LocalidadeService>(LocalidadeService);
    tipoLocalidadeService = module.get<TipoLocalidadeService>(
      TipoLocalidadeService,
    );
    tipoDioceseService = module.get<TipoDioceseService>(TipoDioceseService);
    enderecoService = module.get<EnderecoService>(EnderecoService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(localidadeService).toBeDefined();
    expect(tipoLocalidadeService).toBeDefined();
    expect(tipoDioceseService).toBeDefined();
    expect(enderecoService).toBeDefined();
    expect(abilityService).toBeDefined();
  });
});
