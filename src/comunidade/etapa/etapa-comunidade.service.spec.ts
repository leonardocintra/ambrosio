import { Test, TestingModule } from '@nestjs/testing';
import { EtapaComunidadeService } from './etapa-comunidade.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { PrismaService } from 'src/prisma.service';
import { ComunidadeService } from '../comunidade.service';
import { ParoquiaService } from 'src/paroquia/paroquia.service';
import { EstadoService } from 'src/configuracoes/estado/estado.service';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service';
import { HistoricoService } from '../historico/historico.service';
import { DioceseService } from 'src/diocese/diocese.service';
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { PaisService } from 'src/configuracoes/pais/pais.service';
import { SetorService } from 'src/mapa/setor/setor.service';
import { HttpModule } from '@nestjs/axios';

describe('EtapaService', () => {
  let service: EtapaComunidadeService;
  let prismaService: PrismaService;
  let abilityService: CaslAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        EtapaComunidadeService,
        CaslAbilityService,
        PrismaService,
        ComunidadeService,
        EnderecoService,
        ParoquiaService,
        EstadoService,
        CidadeService,
        SetorService,
        HistoricoService,
        DioceseService,
        PaisService,
        TipoDioceseService
      ],
    }).compile();

    service = await module.resolve<EtapaComunidadeService>(EtapaComunidadeService);
    prismaService = module.get<PrismaService>(PrismaService);
    abilityService =
      await module.resolve<CaslAbilityService>(CaslAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(abilityService).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
