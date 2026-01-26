import { Test, TestingModule } from '@nestjs/testing';
import { ComunidadeService } from './comunidade.service';
import { PrismaService } from 'src/prisma.service';
import { ParoquiaService } from 'src/paroquia/paroquia.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { DioceseService } from 'src/diocese/diocese.service';
import { EnderecoService } from 'src/endereco/endereco.service';
import { CidadeService } from 'src/configuracoes/cidade/cidade.service';
import { PaisService } from 'src/configuracoes/pais/pais.service';
import { SetorService } from 'src/mapa/setor/setor.service';
import { JwtService } from '@nestjs/jwt';
import { TipoDioceseService } from 'src/configuracoes/tipo-diocese/tipo-diocese.service';
import { EstadoService } from 'src/configuracoes/estado/estado.service';
import { HttpModule } from '@nestjs/axios';
import { EtapaService } from '../etapa/etapa.service';
import { HistoricoService } from '../historico/historico.service';

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
        EtapaService,
        EstadoService,
        SetorService,
        JwtService,
        TipoDioceseService,
        HistoricoService
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
