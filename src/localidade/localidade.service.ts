import { Injectable } from '@nestjs/common';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { UpdateLocalidadeDto } from './dto/update-localidade.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LocalidadeService {
  constructor(private prisma: PrismaService) {}

  create(createLocalidadeDto: CreateLocalidadeDto) {
    return 'This action adds a new localidade';
  }

  findAll() {
    return `This action returns all localidade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} localidade`;
  }

  update(id: number, updateLocalidadeDto: UpdateLocalidadeDto) {
    return `This action updates a #${id} localidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} localidade`;
  }
}
