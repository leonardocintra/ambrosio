import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaServicoController } from './tipo-carisma-servico.controller';
import { TipoCarismaServicoService } from './tipo-carisma-servico.service';

describe('TipoCarismaServicoController', () => {
  let controller: TipoCarismaServicoController;
  let service: TipoCarismaServicoService;

  // Mock do TipoCarismaServicoService
  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCarismaServicoController],
      providers: [
        {
          provide: TipoCarismaServicoService,
          useValue: mockService, // Substitui o service real pelo mock
        },
      ],
    }).compile();

    controller = module.get<TipoCarismaServicoController>(
      TipoCarismaServicoController,
    );
    service = module.get<TipoCarismaServicoService>(TipoCarismaServicoService);
  });

  afterEach(() => {
    // Limpa os mocks após cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return all tipo carisma servico', async () => {
    // Mock dos dados que serão retornados
    const mockData = [
      { id: 1, nome: 'Servico 1', ativo: true },
      { id: 2, nome: 'Servico 2', ativo: true },
    ];

    // Configura o mock para retornar os dados mockados
    mockService.findAll.mockResolvedValue(mockData);

    const result = await controller.findAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockData);
    expect(mockService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return a tipo carisma servico by id', async () => {
    const id = 1;
    const mockData = { id: 1, nome: 'Servico 1', ativo: true };

    // Configura o mock para retornar o item específico
    mockService.findOne.mockResolvedValue(mockData);

    const result = await controller.findOne(id.toString());

    expect(result).toBeDefined();
    expect(result.id).toBe(id);
    expect(result).toEqual(mockData);
    expect(mockService.findOne).toHaveBeenCalledWith(id);
  });

  it('should throw an error if tipo carisma servico not found', async () => {
    const id = 999;

    // Configura o mock para lançar um erro
    mockService.findOne.mockRejectedValue(new Error('Record not found'));

    await expect(controller.findOne(id.toString())).rejects.toThrow();
    expect(mockService.findOne).toHaveBeenCalledWith(id);
  });
});
