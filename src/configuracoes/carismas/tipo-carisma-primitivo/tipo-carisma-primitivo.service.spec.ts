import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaPrimitivoService } from './tipo-carisma-primitivo.service';
import { PrismaService } from 'src/prisma.service';

describe('TipoCarismaPrimitivoService', () => {
  let service: TipoCarismaPrimitivoService;
  let prismaService: PrismaService;

  // Mock do PrismaService
  const mockPrismaService = {
    tipoCarismaPrimitivo: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipoCarismaPrimitivoService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TipoCarismaPrimitivoService>(
      TipoCarismaPrimitivoService,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    // Limpa os mocks após cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipoCarismaPrimitivoService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Substitui o PrismaService real pelo mock
        },
      ],
    }).compile();

    service = module.get<TipoCarismaPrimitivoService>(
      TipoCarismaPrimitivoService,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    // Limpa os mocks após cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
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
    const mockData = { id: 1, descricao: 'Tipo 1'};

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
});
