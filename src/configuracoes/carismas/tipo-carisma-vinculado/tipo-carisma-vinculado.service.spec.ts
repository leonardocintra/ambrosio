import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaVinculadoService } from './tipo-carisma-vinculado.service';
import { PrismaService } from 'src/prisma.service';

describe('TipoCarismaVinculadoService', () => {
  let service: TipoCarismaVinculadoService;
  let prismaService: PrismaService;

  // Mock do PrismaService
  const mockPrismaService = {
    tipoCarismaVinculado: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipoCarismaVinculadoService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TipoCarismaVinculadoService>(
      TipoCarismaVinculadoService,
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
});
