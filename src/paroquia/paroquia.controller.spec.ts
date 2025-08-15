import { Test, TestingModule } from '@nestjs/testing';
import { ParoquiaController } from './paroquia.controller';
import { ParoquiaService } from './paroquia.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { DioceseService } from 'src/diocese/diocese.service';
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service';
import { EstadoService } from 'src/configuracoes/estado/estado.service';
import { PaisService } from 'src/configuracoes/pais/pais.service';
import { HttpModule } from '@nestjs/axios';
import { SetorService } from 'src/mapa/setor/setor.service';

describe('ParoquiaController', () => {
  let controller: ParoquiaController;
  let prismaService: PrismaService;
  let enderecoService: EnderecoService;
  let dioceseService: DioceseService;
  let tipoDioceseService: TipoDioceseService;
  let cidadeService: CidadeService;
  let estadoService: EstadoService;
  let paisService: PaisService;
  let setorService: SetorService;
  let jwtService: JwtService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ParoquiaController],
      providers: [
        ParoquiaService,
        DioceseService,
        EnderecoService,
        TipoDioceseService,
        CidadeService,
        EstadoService,
        PaisService,
        SetorService,
        JwtService,
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

    controller = module.get<ParoquiaController>(ParoquiaController);
    prismaService = module.get<PrismaService>(PrismaService);
    enderecoService = module.get<EnderecoService>(EnderecoService);
    tipoDioceseService = module.get<TipoDioceseService>(TipoDioceseService);
    cidadeService = module.get<CidadeService>(CidadeService);
    estadoService = module.get<EstadoService>(EstadoService);
    paisService = module.get<PaisService>(PaisService);
    setorService = module.get<SetorService>(SetorService);
    dioceseService = module.get<DioceseService>(DioceseService);
    jwtService = module.get<JwtService>(JwtService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(dioceseService).toBeDefined();
    expect(enderecoService).toBeDefined();
    expect(tipoDioceseService).toBeDefined();
    expect(setorService).toBeDefined();
    expect(cidadeService).toBeDefined();
    expect(estadoService).toBeDefined();
    expect(paisService).toBeDefined();
  });
});
