import { Injectable } from '@nestjs/common';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import { BaseService } from 'src/commons/base.service';
import { PrismaService } from 'src/prisma.service';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

@Injectable()
export class ComunidadeService extends BaseService {
  constructor(
    private prisma: PrismaService,
    protected readonly abilityService: CaslAbilityService,
  ) {
    super(abilityService);
  }

  create(createComunidadeDto: CreateComunidadeDto) {
    return 'This action adds a new comunidade' + createComunidadeDto.toString();
  }

  findAll() {
    return `This action returns all comunidade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comunidade`;
  }

  update(id: number, updateComunidadeDto: UpdateComunidadeDto) {
    return `This action updates a #${id} comunidade` + updateComunidadeDto.toString();
  }

  remove(id: number) {
    return `This action removes a #${id} comunidade`;
  }
}
