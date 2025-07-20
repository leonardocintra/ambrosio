import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaPrimitivoService } from './tipo-carisma-primitivo.service';
import { PrismaService } from 'src/prisma.service';
import { CreateCarismaDto } from '../dto/create-carisma.dto';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

describe('TipoCarismaPrimitivoService', () => {
  let service: TipoCarismaPrimitivoService;
  let prismaService: PrismaService;
  let abilityService: CaslAbilityService;

  // Mock do PrismaService
  const mockPrismaService = {
    tipoCarismaPrimitivo: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
    },
    pessoaCarismaPrimitivo: {
      createMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipoCarismaPrimitivoService,
        { provide: PrismaService, useValue: mockPrismaService },
        {
          provide: CaslAbilityService,
          useValue: {
            ability: {
              can: jest.fn().mockReturnValue(true),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TipoCarismaPrimitivoService>(
      TipoCarismaPrimitivoService,
    );
    prismaService = module.get<PrismaService>(PrismaService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  afterEach(() => {
    // Limpa os mocks após cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(abilityService).toBeDefined();
  });

  it('should return all tipo carisma primitivo', async () => {
    // Mock dos dados que serão retornados
    const mockData = [
      { id: 1, descricao: 'Tipo 1' },
      { id: 2, descricao: 'Tipo 2' },
    ];

    // Configura o mock para retornar os dados mockados
    mockPrismaService.tipoCarismaPrimitivo.findMany.mockResolvedValue(mockData);

    const result = await service.findAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockData);
    expect(
      mockPrismaService.tipoCarismaPrimitivo.findMany,
    ).toHaveBeenCalledTimes(1);
  });

  it('should return a tipo carisma primitivo by id', async () => {
    const id = 1;
    const mockData = { id: 1, descricao: 'Tipo 1' };

    // Configura o mock para retornar o item específico
    mockPrismaService.tipoCarismaPrimitivo.findUniqueOrThrow.mockResolvedValue(
      mockData,
    );

    const result = await service.findOne(id);

    expect(result).toBeDefined();
    expect(result.id).toBe(id);
    expect(result).toEqual(mockData);
    expect(
      mockPrismaService.tipoCarismaPrimitivo.findUniqueOrThrow,
    ).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('should throw an error if tipo carisma primitivo not found', async () => {
    const id = 999;

    // Configura o mock para lançar um erro (comportamento do findUniqueOrThrow)
    mockPrismaService.tipoCarismaPrimitivo.findUniqueOrThrow.mockRejectedValue(
      new Error('Record not found'),
    );

    await expect(service.findOne(id)).rejects.toThrow();
    expect(
      mockPrismaService.tipoCarismaPrimitivo.findUniqueOrThrow,
    ).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('should register carisma primitivo for pessoa', async () => {
    const createCarismaDto: CreateCarismaDto = {
      pessoaId: 10,
      carismas: [
        { id: 1, descricao: 'Carisma 1' },
        { id: 2, descricao: 'Carisma 2' },
      ],
    };

    // Mock do método createMany
    mockPrismaService.pessoaCarismaPrimitivo = {
      createMany: jest.fn().mockResolvedValue({ count: 2 }),
    };

    const expectedData = [
      { pessoaId: 10, tipoCarismaPrimitivoId: 1 },
      { pessoaId: 10, tipoCarismaPrimitivoId: 2 },
    ];

    const result =
      await service.registerCarismaPrimitivoPessoa(createCarismaDto);

    expect(
      mockPrismaService.pessoaCarismaPrimitivo.createMany,
    ).toHaveBeenCalledWith({
      data: expectedData,
      skipDuplicates: true,
    });
    expect(result).toEqual({ count: 2 });
  });

  it('should handle empty carismas array in registerCarismaPrimitivoPessoa', async () => {
    const createCarismaDto = {
      pessoaId: 20,
      carismas: [],
    };

    mockPrismaService.pessoaCarismaPrimitivo = {
      createMany: jest.fn().mockResolvedValue({ count: 0 }),
    };

    const result =
      await service.registerCarismaPrimitivoPessoa(createCarismaDto);

    expect(
      mockPrismaService.pessoaCarismaPrimitivo.createMany,
    ).toHaveBeenCalledWith({
      data: [],
      skipDuplicates: true,
    });
    expect(result).toEqual({ count: 0 });
  });
});
