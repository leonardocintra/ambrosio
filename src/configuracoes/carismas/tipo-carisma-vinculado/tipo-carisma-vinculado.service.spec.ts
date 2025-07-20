import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaVinculadoService } from './tipo-carisma-vinculado.service';
import { PrismaService } from 'src/prisma.service';
import { CreateCarismaDto } from '../dto/create-carisma.dto';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

describe('TipoCarismaVinculadoService', () => {
  let service: TipoCarismaVinculadoService;
  let prismaService: PrismaService;
  let abilityService: CaslAbilityService;

  // Mock do PrismaService
  const mockPrismaService = {
    tipoCarismaVinculado: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
    },
    pessoaCarismaVinculado: {
      createMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipoCarismaVinculadoService,
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

    service = module.get<TipoCarismaVinculadoService>(
      TipoCarismaVinculadoService,
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

  it('should return all tipo carisma vinculado', async () => {
    // Mock dos dados que serão retornados
    const mockData = [
      { id: 1, descricao: 'Tipo Vinculado 1' },
      { id: 2, descricao: 'Tipo Vinculado 2' },
    ];

    // Configura o mock para retornar os dados mockados
    mockPrismaService.tipoCarismaVinculado.findMany.mockResolvedValue(mockData);

    const result = await service.findAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockData);
    expect(
      mockPrismaService.tipoCarismaVinculado.findMany,
    ).toHaveBeenCalledTimes(1);
  });

  it('should return a tipo carisma vinculado by id', async () => {
    const id = 1;
    const mockData = { id: 1, descricao: 'Tipo Vinculado 1' };

    // Configura o mock para retornar o item específico
    mockPrismaService.tipoCarismaVinculado.findUniqueOrThrow.mockResolvedValue(
      mockData,
    );

    const result = await service.findOne(id);

    expect(result).toBeDefined();
    expect(result.id).toBe(id);
    expect(result).toEqual(mockData);
    expect(
      mockPrismaService.tipoCarismaVinculado.findUniqueOrThrow,
    ).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('should throw an error if tipo carisma vinculado not found', async () => {
    const id = 999;

    // Configura o mock para lançar um erro (comportamento do findUniqueOrThrow)
    mockPrismaService.tipoCarismaVinculado.findUniqueOrThrow.mockRejectedValue(
      new Error('Record not found'),
    );

    await expect(service.findOne(id)).rejects.toThrow();
    expect(
      mockPrismaService.tipoCarismaVinculado.findUniqueOrThrow,
    ).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('should register carisma vinculado pessoa with correct data', async () => {
    // Mock do método createMany
    mockPrismaService.pessoaCarismaVinculado = {
      createMany: jest.fn().mockResolvedValue({ count: 2 }),
    };

    const createCarismaDto: CreateCarismaDto = {
      pessoaId: 10,
      carismas: [
        { id: 1, descricao: 'Vinculado 1' },
        { id: 2, descricao: 'Vinculado 2' },
      ],
    };

    const expectedData = [
      { pessoaId: 10, tipoCarismaVinculadoId: 1 },
      { pessoaId: 10, tipoCarismaVinculadoId: 2 },
    ];

    const result =
      await service.registerCarismaVinculadoPessoa(createCarismaDto);

    expect(
      mockPrismaService.pessoaCarismaVinculado.createMany,
    ).toHaveBeenCalledWith({
      data: expectedData,
      skipDuplicates: true,
    });
    expect(result).toEqual({ count: 2 });
  });

  it('should handle empty carismas array in registerCarismaVinculadoPessoa', async () => {
    mockPrismaService.pessoaCarismaVinculado = {
      createMany: jest.fn().mockResolvedValue({ count: 0 }),
    };

    const createCarismaDto = {
      pessoaId: 20,
      carismas: [],
    };

    const result =
      await service.registerCarismaVinculadoPessoa(createCarismaDto);

    expect(
      mockPrismaService.pessoaCarismaVinculado.createMany,
    ).toHaveBeenCalledWith({
      data: [],
      skipDuplicates: true,
    });
    expect(result).toEqual({ count: 0 });
  });
});
