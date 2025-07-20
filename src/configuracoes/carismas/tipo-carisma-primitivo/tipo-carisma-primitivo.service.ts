import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCarismaDto } from '../dto/create-carisma.dto';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

@Injectable()
export class TipoCarismaPrimitivoService {
  constructor(
    private prisma: PrismaService,
    private abilityService: CaslAbilityService,
  ) {}

  findAll() {
    return this.prisma.tipoCarismaPrimitivo.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoCarismaPrimitivo.findUniqueOrThrow({
      where: { id },
    });
  }

  registerCarismaPrimitivoPessoa(createCarismaDto: CreateCarismaDto) {
    const { ability } = this.abilityService;
    if (!ability.can('create', 'pessoaCarismaPrimitivo')) {
      throw new ForbiddenException(
        'Você não tem permissão para criar um carisma primitivo',
      );
    }
    const { pessoaId, carismas } = createCarismaDto;

    // Monta os dados para criação em massa
    const data = carismas.map((carisma) => ({
      pessoaId,
      tipoCarismaPrimitivoId: carisma.id,
    }));

    return this.prisma.pessoaCarismaPrimitivo.createMany({
      data,
      skipDuplicates: true,
    });
  }
}
