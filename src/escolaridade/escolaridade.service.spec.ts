import { Test, TestingModule } from '@nestjs/testing';
import { EscolaridadeService } from './escolaridade.service';

describe('EscolaridadeService', () => {
  let service: EscolaridadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EscolaridadeService],
    }).compile();

    service = module.get<EscolaridadeService>(EscolaridadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
