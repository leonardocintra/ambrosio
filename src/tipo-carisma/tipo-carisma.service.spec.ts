import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarismaService } from './tipo-carisma.service';

describe('TipoCarismaService', () => {
  let service: TipoCarismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoCarismaService],
    }).compile();

    service = module.get<TipoCarismaService>(TipoCarismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
