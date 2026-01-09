import { Test, TestingModule } from '@nestjs/testing';
import { ComunidadeController } from './comunidade.controller';
import { ComunidadeService } from './comunidade.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { ParoquiaService } from 'src/paroquia/paroquia.service';
import { DioceseService } from 'src/diocese/diocese.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { SetorService } from 'src/mapa/setor/setor.service';
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service';
import { EstadoService } from 'src/configuracoes/estado/estado.service';
import { PaisService } from 'src/configuracoes/pais/pais.service';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { EtapaService } from '../etapa/etapa.service';

describe('ComunidadeController', () => {
  let controller: ComunidadeController;
  let prismaService: PrismaService;
  let enderecoService: EnderecoService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComunidadeController],
      imports: [HttpModule],
      providers: [
        ComunidadeService,
        PrismaService,
        CaslAbilityService,
        ParoquiaService,
        SetorService,
        EtapaService,
        DioceseService,
        EnderecoService,
        TipoDioceseService,
        CidadeService,
        EstadoService,
        PaisService,
        JwtService,
      ],
    }).compile();

    controller =
      await module.resolve<ComunidadeController>(ComunidadeController);
    prismaService = module.get<PrismaService>(PrismaService);
    enderecoService = module.get<EnderecoService>(EnderecoService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(enderecoService).toBeDefined();
  });
});
