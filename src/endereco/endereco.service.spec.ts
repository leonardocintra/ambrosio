import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoService } from './endereco.service';
import { PrismaService } from 'src/prisma.service';
import { PaisService } from 'src/configuracoes/pais/pais.service';
import { EstadoService } from 'src/configuracoes/estado/estado.service';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service';
import { HttpModule } from '@nestjs/axios';

describe('EnderecoService', () => {
  let service: EnderecoService;
  let prismaService: PrismaService;
  let paisService: PaisService;
  let estadoService: EstadoService;
  let cidadeService: CidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        EnderecoService,
        PaisService,
        EstadoService,
        CidadeService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EnderecoService>(EnderecoService);
    prismaService = module.get<PrismaService>(PrismaService);
    paisService = module.get<PaisService>(PaisService);
    estadoService = module.get<EstadoService>(EstadoService);
    cidadeService = module.get<CidadeService>(CidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(paisService).toBeDefined();
    expect(estadoService).toBeDefined();
    expect(cidadeService).toBeDefined();
  });
});
