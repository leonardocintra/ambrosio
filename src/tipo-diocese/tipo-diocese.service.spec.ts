import { Test, TestingModule } from '@nestjs/testing';
import { TipoDioceseService } from './tipo-diocese.service';

describe('TipoDioceseService', () => {
  let service: TipoDioceseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoDioceseService],
    }).compile();

    service = module.get<TipoDioceseService>(TipoDioceseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
