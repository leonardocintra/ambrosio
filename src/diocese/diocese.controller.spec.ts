import { Test, TestingModule } from '@nestjs/testing';
import { DioceseController } from './diocese.controller';
import { DioceseService } from './diocese.service';
import { PrismaService } from 'src/prisma.service';
import { LocalidadeService } from 'src/localidade/localidade.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { ClientProxy } from '@nestjs/microservices';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { JwtService } from '@nestjs/jwt';
import { TipoLocalidadeService } from 'src/configuracoes/tipo-localidade/tipo-localidade.service';
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service';

describe('DioceseController', () => {
  let controller: DioceseController;
  let prismaService: PrismaService;
  let localidadeService: LocalidadeService;
  let tipoLocalidadeService: TipoLocalidadeService;
  let tipoDioceseService: TipoDioceseService;
  let enderecoService: EnderecoService
  let clientRabbit: ClientProxy;
  let abilityService: CaslAbilityService;
  let jwtService: JwtService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DioceseController],
      providers: [
        DioceseService,
        LocalidadeService,
        TipoLocalidadeService,
        TipoDioceseService,
        EnderecoService,
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
          provide: 'PAIS_UF_CIDADE_SERVICE',
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DioceseController>(DioceseController);
    prismaService = module.get<PrismaService>(PrismaService);
    localidadeService = module.get<LocalidadeService>(LocalidadeService);
    tipoLocalidadeService = module.get<TipoLocalidadeService>(TipoLocalidadeService);
    tipoDioceseService = module.get<TipoDioceseService>(TipoDioceseService);
    enderecoService = module.get<EnderecoService>(EnderecoService);
    clientRabbit = module.get<ClientProxy>('PAIS_UF_CIDADE_SERVICE');
    abilityService = await module.resolve<CaslAbilityService>(CaslAbilityService);
    jwtService = module.get<JwtService>(JwtService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(localidadeService).toBeDefined();
    expect(tipoLocalidadeService).toBeDefined();
    expect(tipoDioceseService).toBeDefined();
    expect(enderecoService).toBeDefined();
    expect(clientRabbit).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(jwtService).toBeDefined();
  });
});
