import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaServicoService } from './tipo-carisma-servico.service';
import { PrismaService } from 'src/prisma.service';

describe('TipoCarismaServicoService', () => {
  let service: TipoCarismaServicoService;
  let prismaService: PrismaService;

  // Mock do PrismaService
  const mockPrismaService = {
    tipoCarismaServico: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipoCarismaServicoService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TipoCarismaServicoService>(TipoCarismaServicoService);
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

  it('should return all tipo carisma serviço', async () => {
    // Mock dos dados que serão retornados
    const mockData = [
      { id: 1, descricao: 'Tipo Serviço 1' },
      { id: 2, descricao: 'Tipo Serviço 2' },
    ];

    // Configura o mock para retornar os dados mockados
    mockPrismaService.tipoCarismaServico.findMany.mockResolvedValue(mockData);

    const result = await service.findAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockData);
    expect(mockPrismaService.tipoCarismaServico.findMany).toHaveBeenCalledTimes(
      1,
    );
  });

  it('should return a tipo carisma serviço by id', async () => {
    const id = 1;
    const mockData = { id: 1, descricao: 'Tipo Serviço 1' };

    // Configura o mock para retornar o item específico
    mockPrismaService.tipoCarismaServico.findUniqueOrThrow.mockResolvedValue(
      mockData,
    );

    const result = await service.findOne(id);

    expect(result).toBeDefined();
    expect(result.id).toBe(id);
    expect(result).toEqual(mockData);
    expect(
      mockPrismaService.tipoCarismaServico.findUniqueOrThrow,
    ).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('should throw an error if tipo carisma serviço not found', async () => {
    const id = 999;

    // Configura o mock para lançar um erro (comportamento do findUniqueOrThrow)
    mockPrismaService.tipoCarismaServico.findUniqueOrThrow.mockRejectedValue(
      new Error('Record not found'),
    );

    await expect(service.findOne(id)).rejects.toThrow();
    expect(
      mockPrismaService.tipoCarismaServico.findUniqueOrThrow,
    ).toHaveBeenCalledWith({
      where: { id },
    });
  });
});
