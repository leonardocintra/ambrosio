import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCarismaDto } from '../dto/create-carisma.dto';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

@Injectable()
export class TipoCarismaVinculadoService {
  constructor(
    private prisma: PrismaService,
    private abilityService: CaslAbilityService,
  ) {}

  findAll() {
    return this.prisma.tipoCarismaVinculado.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoCarismaVinculado.findUniqueOrThrow({
      where: { id },
    });
  }

  registerCarismaVinculadoPessoa(createCarismaDto: CreateCarismaDto) {
    const { ability } = this.abilityService;
    if (!ability.can('create', 'pessoaCarismaVinculado')) {
      throw new ForbiddenException(
        'Você não tem permissão para criar um carisma vinculado',
      );
    }
    const { pessoaId, carismas } = createCarismaDto;

    // Monta os dados para criação em massa
    const data = carismas.map((carisma) => ({
      pessoaId,
      tipoCarismaVinculadoId: carisma.id,
    }));

    return this.prisma.pessoaCarismaVinculado.createMany({
      data,
      skipDuplicates: true,
    });
  }
}
