import { Test, TestingModule } from '@nestjs/testing';
import { EstadoCivilService } from './estado-civil.service';

describe('EstadoCivilService', () => {
  let service: EstadoCivilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoCivilService],
    }).compile();

    service = module.get<EstadoCivilService>(EstadoCivilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
