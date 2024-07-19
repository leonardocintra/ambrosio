import { Test, TestingModule } from '@nestjs/testing';
import { RegioesController } from './regioes.controller';
import { RegioesService } from './regioes.service';
import { PrismaService } from 'src/prisma.service';

describe('RegioesController', () => {
  let controller: RegioesController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegioesController],
      providers: [
        RegioesService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findFirstOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RegioesController>(RegioesController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
