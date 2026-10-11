import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service.js';
import { ParoquiaService } from 'src/paroquia/paroquia.service.js';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service.js';
import { DioceseService } from 'src/diocese/diocese.service.js';
import { EnderecoService } from 'src/endereco/endereco.service.js';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service.js';
import { PaisService } from 'src/configuracoes/pais/pais.service.js';
import { SetorService } from 'src/mapa/setor/setor.service.js';
import { JwtService } from '@nestjs/jwt';
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service.js';
import { EstadoService } from 'src/configuracoes/estado/estado.service.js';
import { HttpModule } from '@nestjs/axios';
import { EtapaComunidadeService } from './etapa/etapa-comunidade.service.js';
import { HistoricoService } from './historico/historico.service.js';
import { ComunidadeService } from './comunidade.service.js';

describe('ComunidadeService', () => {
  let service: ComunidadeService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComunidadeService,
        PrismaService,
        ParoquiaService,
        CaslAbilityService,
        DioceseService,
        EnderecoService,
        CidadeService,
        PaisService,
        EtapaComunidadeService,
        EstadoService,
        SetorService,
        JwtService,
        TipoDioceseService,
        HistoricoService,
      ],
      imports: [HttpModule],
    }).compile();

    service = await module.resolve<ComunidadeService>(ComunidadeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
