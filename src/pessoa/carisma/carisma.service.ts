import { Injectable } from '@nestjs/common';
import { CreateCarismaDto } from './dto/create-carisma.dto';
import { UpdateCarismaDto } from './dto/update-carisma.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarismaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCarismaDto: CreateCarismaDto) {
    return this.prisma.pessoaCarisma.create({
      data: {
        tipoCarismaId: createCarismaDto.tipoCarismaId,
        pessoaId: createCarismaDto.pessoaId,
      },
    });
  }

  findAll() {
    return `This action returns all carisma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carisma`;
  }

  update(id: number, updateCarismaDto: UpdateCarismaDto) {
    return `This action updates a #${id} carisma`;
  }

  remove(id: number) {
    return `This action removes a #${id} carisma`;
  }
}
