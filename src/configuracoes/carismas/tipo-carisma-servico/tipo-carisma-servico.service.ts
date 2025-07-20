import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCarismaDto } from '../dto/create-carisma.dto';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

@Injectable()
export class TipoCarismaServicoService {
  constructor(
    private prisma: PrismaService,
    private abilityService: CaslAbilityService,
  ) {}

  findAll() {
    return this.prisma.tipoCarismaServico.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoCarismaServico.findUniqueOrThrow({
      where: { id },
    });
  }

  registerCarismaServicoPessoa(createCarismaDto: CreateCarismaDto) {
    const { ability } = this.abilityService;
    if (!ability.can('create', 'pessoaCarismaServico')) {
      throw new ForbiddenException(
        'Você não tem permissão para criar um carisma de serviço',
      );
    }
    const { pessoaId, carismas } = createCarismaDto;

    // Monta os dados para criação em massa
    const data = carismas.map((carisma) => ({
      pessoaId,
      tipoCarismaServicoId: carisma.id,
    }));

    return this.prisma.pessoaCarismaServico.createMany({
      data,
      skipDuplicates: true,
    });
  }
}
