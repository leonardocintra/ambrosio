import { Test, TestingModule } from '@nestjs/testing';
import { LocalidadeController } from './localidade.controller';
import { LocalidadeService } from './localidade.service';
import { PrismaService } from 'src/prisma.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { ClientProxy } from '@nestjs/microservices';

describe('LocalidadeController', () => {
  let controller: LocalidadeController;
  let prismaService: PrismaService;
  let enderecoService: EnderecoService;
  let clientRabbit: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalidadeController],
      providers: [
        LocalidadeService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
        {
          provide: EnderecoService,
          useValue: {
            createByPessoaId: jest.fn(),
            create: jest.fn(),
            findAllByPessoaId: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
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

    controller = module.get<LocalidadeController>(LocalidadeController);
    prismaService = module.get<PrismaService>(PrismaService);
    enderecoService = module.get<EnderecoService>(EnderecoService);
    clientRabbit = module.get<ClientProxy>('LOCALIDADES_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(enderecoService).toBeDefined();
    expect(clientRabbit).toBeDefined();
  });
});
