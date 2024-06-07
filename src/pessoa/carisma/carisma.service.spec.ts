import { Test, TestingModule } from '@nestjs/testing';
import { CarismaService } from './carisma.service';

describe('CarismaService', () => {
  let service: CarismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarismaService],
    }).compile();

    service = module.get<CarismaService>(CarismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
