import { Test, TestingModule } from '@nestjs/testing';
import { LocalidadeService } from './localidade.service';

describe('LocalidadeService', () => {
  let service: LocalidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalidadeService],
    }).compile();

    service = module.get<LocalidadeService>(LocalidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
