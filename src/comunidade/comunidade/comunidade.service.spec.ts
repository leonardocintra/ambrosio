import { Test, TestingModule } from '@nestjs/testing';
import { ComunidadeService } from './comunidade.service';

describe('ComunidadeService', () => {
  let service: ComunidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComunidadeService],
    }).compile();

    service = module.get<ComunidadeService>(ComunidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
