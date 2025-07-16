import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaVinculadoController } from './tipo-carisma-vinculado.controller';
import { TipoCarismaVinculadoService } from './tipo-carisma-vinculado.service';

describe('TipoCarismaVinculadoController', () => {
  let controller: TipoCarismaVinculadoController;
  let service: TipoCarismaVinculadoService;

  // Mock do TipoCarismaVinculadoService
  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCarismaVinculadoController],
      providers: [
        {
          provide: TipoCarismaVinculadoService,
          useValue: mockService, // Substitui o service real pelo mock
        },
      ],
    }).compile();

    controller = module.get<TipoCarismaVinculadoController>(
      TipoCarismaVinculadoController,
    );
    service = module.get<TipoCarismaVinculadoService>(
      TipoCarismaVinculadoService,
    );
  });

  afterEach(() => {
    // Limpa os mocks após cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return all tipo carisma vinculado', async () => {
    // Mock dos dados que serão retornados
    const mockData = [
      { id: 1, nome: 'Vinculado 1', ativo: true },
      { id: 2, nome: 'Vinculado 2', ativo: true },
    ];

    // Configura o mock para retornar os dados mockados
    mockService.findAll.mockResolvedValue(mockData);

    const result = await controller.findAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockData);
    expect(mockService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return a tipo carisma vinculado by id', async () => {
    const id = 1;
    const mockData = { id: 1, nome: 'Vinculado 1', ativo: true };

    // Configura o mock para retornar o item específico
    mockService.findOne.mockResolvedValue(mockData);

    const result = await controller.findOne(id.toString());

    expect(result).toBeDefined();
    expect(result.id).toBe(id);
    expect(result).toEqual(mockData);
    expect(mockService.findOne).toHaveBeenCalledWith(id);
  });

  it('should throw an error if tipo carisma vinculado not found', async () => {
    const id = 999;

    // Configura o mock para lançar um erro
    mockService.findOne.mockRejectedValue(new Error('Record not found'));

    await expect(controller.findOne(id.toString())).rejects.toThrow();
    expect(mockService.findOne).toHaveBeenCalledWith(id);
  });
});
