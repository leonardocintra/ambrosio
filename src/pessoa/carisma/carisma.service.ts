import { Injectable } from '@nestjs/common';
import { CreateCarismaDto } from './dto/create-carisma.dto';
import { UpdateCarismaDto } from './dto/update-carisma.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarismaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCarismaDto: CreateCarismaDto) {
    // deleta todos os carismas e add novamente
    await this.prisma.pessoaCarisma.deleteMany({
      where: {
        pessoaId: createCarismaDto.pessoaId,
      },
    });

    return await this.prisma.pessoaCarisma.createMany({
      skipDuplicates: true,
      data: createCarismaDto.carismas.map((carisma) => ({
        tipoCarismaId: carisma,
        pessoaId: createCarismaDto.pessoaId,
      })),
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
