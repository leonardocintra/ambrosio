import { Test, TestingModule } from '@nestjs/testing';
import { EtapaComunidadeController } from './etapa-comunidade.controller';
import { EtapaComunidadeService } from './etapa-comunidade.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ComunidadeService } from '../comunidade.service';
import { ParoquiaService } from 'src/paroquia/paroquia.service';
import { HistoricoService } from '../historico/historico.service';
import { DioceseService } from 'src/diocese/diocese.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { SetorService } from 'src/mapa/setor/setor.service';
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service';
import { EstadoService } from 'src/configuracoes/estado/estado.service';
import { PaisService } from 'src/configuracoes/pais/pais.service';
import { HttpModule } from '@nestjs/axios';

describe('EtapaController', () => {
  let controller: EtapaComunidadeController;
  let prismaService: PrismaService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [EtapaComunidadeController],
      providers: [
        EtapaComunidadeService,
        CaslAbilityService,
        PrismaService,
        JwtService,
        ComunidadeService,
        ParoquiaService,
        HistoricoService,
        DioceseService,
        EnderecoService,
        SetorService,
        TipoDioceseService,
        CidadeService,
        EstadoService,
        PaisService
      ],
    }).compile();

    controller = await module.resolve<EtapaComunidadeController>(EtapaComunidadeController);
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
