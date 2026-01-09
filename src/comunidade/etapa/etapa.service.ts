import { Injectable } from '@nestjs/common';
import { CreateEtapaDto } from './dto/create-etapa.dto';
import { UpdateEtapaDto } from './dto/update-etapa.dto';
import { BaseService } from 'src/commons/base.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

@Injectable()
export class EtapaService extends BaseService {
  constructor(
    private prisma: PrismaService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  create(createEtapaDto: CreateEtapaDto) {
    this.logger.log(`Creating etapa for comunidade ${createEtapaDto.comunidadeId}`);
    return this.prisma.comunidadeEtapa.create({ data: createEtapaDto });
  }

  findAll() {
    return `This action returns all etapa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} etapa`;
  }

  update(id: number, updateEtapaDto: UpdateEtapaDto) {
    return `This action updates a #${id} etapa da comunidade ${updateEtapaDto.comunidadeId}`;
  }

  remove(id: number) {
    return `This action removes a #${id} etapa`;
  }
}
