import { Test, TestingModule } from '@nestjs/testing';
import { PessoaController } from './pessoa.controller';
import { PessoaService } from './pessoa.service';
import { PrismaService } from 'src/prisma.service';
import { EstadoCivilService } from 'src/configuracoes/estado-civil/estado-civil.service';
import { EscolaridadeService } from 'src/configuracoes/escolaridade/escolaridade.service';
import { TipoPessoaService } from 'src/configuracoes/tipo-pessoa/tipo-pessoa.service';
import { JwtService } from '@nestjs/jwt';

describe('PessoaController', () => {
  let controller: PessoaController;
  let prismaService: PrismaService;
  let estadoCivilService: EstadoCivilService;
  let escolaridadeService: EscolaridadeService;
  let tipoPessoaService: TipoPessoaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoaController],
      providers: [
        PessoaService,
        JwtService,
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
          provide: TipoPessoaService,
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

    controller = module.get<PessoaController>(PessoaController);
    prismaService = module.get<PrismaService>(PrismaService);
    estadoCivilService = module.get<EstadoCivilService>(EstadoCivilService);
    escolaridadeService = module.get<EscolaridadeService>(EscolaridadeService);
    tipoPessoaService = module.get<TipoPessoaService>(TipoPessoaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(estadoCivilService).toBeDefined();
    expect(escolaridadeService).toBeDefined();
    expect(tipoPessoaService).toBeDefined();
    expect(jwtService).toBeDefined();
  });
});
