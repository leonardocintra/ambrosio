import { Test, TestingModule } from '@nestjs/testing';
import { ParoquiaController } from './paroquia.controller';
import { ParoquiaService } from './paroquia.service';
import { PrismaService } from 'src/prisma.service';

describe('ParoquiaController', () => {
  let controller: ParoquiaController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParoquiaController],
      providers: [
        ParoquiaService,
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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
