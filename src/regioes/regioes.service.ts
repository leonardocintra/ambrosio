import { Injectable } from '@nestjs/common';
import { CreateRegiaoDto } from './dto/create-regioe.dto';
import { UpdateRegioeDto } from './dto/update-regioe.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RegioesService {
  constructor(private prisma: PrismaService) {}

  create(createRegioeDto: CreateRegiaoDto) {
    return this.prisma.regiao.create({
      data: createRegioeDto,
    });
  }

  findAll() {
    return this.prisma.regiao.findMany();
  }

  findOne(id: number) {
    return this.prisma.regiao.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updateRegioeDto: UpdateRegioeDto) {
    return `This action updates a #${id} regioe`;
  }

  remove(id: number) {
    return `This action removes a #${id} regioe`;
  }
}
