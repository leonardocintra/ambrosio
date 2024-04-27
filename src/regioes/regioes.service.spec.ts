import { Test, TestingModule } from '@nestjs/testing';
import { RegioesService } from './regioes.service';

describe('RegioesService', () => {
  let service: RegioesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegioesService],
    }).compile();

    service = module.get<RegioesService>(RegioesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
