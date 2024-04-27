import { Injectable } from '@nestjs/common';
import { CreateRegioeDto } from './dto/create-regioe.dto';
import { UpdateRegioeDto } from './dto/update-regioe.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RegioesService {
  constructor(private prisma: PrismaService) {}

  create(createRegioeDto: CreateRegioeDto) {
    return this.prisma.regioesCaminho.create({
      data: createRegioeDto,
    });
  }

  findAll() {
    return this.prisma.regioesCaminho.findMany();
  }

  findOne(id: number) {
    return this.prisma.regioesCaminho.findUniqueOrThrow({
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
