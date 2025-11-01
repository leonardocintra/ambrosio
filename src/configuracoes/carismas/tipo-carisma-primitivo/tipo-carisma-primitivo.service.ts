import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCarismaDto } from '../dto/create-carisma.dto';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import { BaseService } from 'src/commons/base.service';

@Injectable()
export class TipoCarismaPrimitivoService extends BaseService {
  constructor(
    private prisma: PrismaService,
    abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  findAll() {
    return this.prisma.tipoCarismaPrimitivo.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipoCarismaPrimitivo.findUniqueOrThrow({
      where: { id },
    });
  }

  registerCarismaPrimitivoPessoa(createCarismaDto: CreateCarismaDto) {
    this.validateCreateAbility('pessoaCarismaPrimitivo');
    const { pessoaId, carismas } = createCarismaDto;

    // Monta os dados para criação em massa
    const data = carismas.map((carisma) => ({
      pessoaId,
      tipoCarismaPrimitivoId: carisma.id,
    }));

    this.logger.log(
      `Registrando carismas primitivos para a pessoa ID: ${pessoaId}`,
    );
    return this.prisma.pessoaCarismaPrimitivo.createMany({
      data,
      skipDuplicates: true,
    });
  }
}
