import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoController } from './endereco.controller.js';
import { EnderecoService } from './endereco.service.js';
import { PrismaService } from 'src/prisma.service.js';
import { PaisService } from 'src/configuracoes/pais/pais.service.js';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service.js';
import { EstadoService } from 'src/configuracoes/estado/estado.service.js';
import { HttpModule } from '@nestjs/axios';

describe('EnderecoController', () => {
  let controller: EnderecoController;
  let prismaService: PrismaService;
  let paisService: PaisService;
  let estadoService: EstadoService;
  let cidadeService: CidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnderecoController],
      imports: [HttpModule],
      providers: [
        EnderecoService,
        PaisService,
        EstadoService,
        CidadeService,
        {
          provide: PrismaService,
          useValue: {
            create: vi.fn(),
            findFirstOrThrow: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EnderecoController>(EnderecoController);
    prismaService = module.get<PrismaService>(PrismaService);
    paisService = module.get<PaisService>(PaisService);
    estadoService = module.get<EstadoService>(EstadoService);
    cidadeService = module.get<CidadeService>(CidadeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(paisService).toBeDefined();
    expect(estadoService).toBeDefined();
    expect(cidadeService).toBeDefined();
  });
});
