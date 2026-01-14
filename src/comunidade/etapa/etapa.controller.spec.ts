import { Test, TestingModule } from '@nestjs/testing';
import { EtapaController } from './etapa.controller';
import { EtapaService } from './etapa.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('EtapaController', () => {
  let controller: EtapaController;
  let prismaService: PrismaService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtapaController],
      providers: [EtapaService, CaslAbilityService, PrismaService, JwtService],
    }).compile();

    controller = await module.resolve<EtapaController>(EtapaController);
    prismaService = module.get<PrismaService>(PrismaService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
