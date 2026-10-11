import { Test, TestingModule } from '@nestjs/testing';
import { LocalidadeController } from './localidade.controller.js';
import { LocalidadeService } from './localidade.service.js';
import { PrismaService } from 'src/prisma.service.js';
import { EnderecoService } from 'src/endereco/endereco.service.js';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service.js';

describe('LocalidadeController', () => {
  let controller: LocalidadeController;
  let prismaService: PrismaService;
  let enderecoService: EnderecoService;
  let jwtService: JwtService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalidadeController],
      providers: [
        LocalidadeService,
        JwtService,
        CaslAbilityService,
        {
          provide: PrismaService,
          useValue: {
            create: vi.fn(),
            findFirstOrThrow: vi.fn(),
          },
        },
        {
          provide: EnderecoService,
          useValue: {
            createByPessoaId: vi.fn(),
            create: vi.fn(),
            findAllByPessoaId: vi.fn(),
            findOne: vi.fn(),
            update: vi.fn(),
            remove: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = await module.resolve<LocalidadeController>(LocalidadeController);
    prismaService = module.get<PrismaService>(PrismaService);
    enderecoService = module.get<EnderecoService>(EnderecoService);
    jwtService = module.get<JwtService>(JwtService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(enderecoService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(abilityService).toBeDefined();
  });
});
