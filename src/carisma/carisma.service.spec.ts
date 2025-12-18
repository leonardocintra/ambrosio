import { Test, TestingModule } from '@nestjs/testing';
import { CarismaService } from './carisma.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PessoaService } from 'src/pessoa/pessoa.service';
import { SaoPedroAuthService } from 'src/external/sao-pedro/sao-pedro-auth.service';
import { SaoPedroPessoaService } from 'src/external/sao-pedro/sao-pedro-pessoa.service';
import { SituacaoReligiosaService } from 'src/configuracoes/situacao-religiosa/situacao-religiosa.service';
import { HttpModule } from '@nestjs/axios';

describe('CarismaService', () => {
  let service: CarismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarismaService,
        PrismaService,
        CaslAbilityService,
        PessoaService,
        SituacaoReligiosaService,
        SaoPedroAuthService,
        SaoPedroPessoaService,
      ],
      imports: [HttpModule],
    }).compile();

    service = await module.resolve<CarismaService>(CarismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
